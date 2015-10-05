/* globals Symbol, Array, Map, Object */

export function iteratorDone() {
	return {
		done: true,
		value: undefined
	};
}

export function iteratorValue(value) {
	return {
		done: false,
		value: value
	};
}

export function iteratorNext(next) {
	return {
		next: next
	};
}

export function softSet(prototype, property, value) {

	if (!prototype[property]) {
		prototype[property] = value;
	}

}

export function getIterator(iterable) {

	let generator = iterable[Symbol.iterator];

	if (!generator || typeof(generator) !== 'function') {
		throw new TypeError('Provided [ ' + protoChain(iterable) + ' ] is not iterable!');
	}

	let iterator = generator();

	if (!iterator || typeof(iterator) != 'object') {
		throw new TypeError('Generated iterator is invalid!')
	}

	return iterator;
}

export function protoChain(object = this) {

	if (!object) {
		return '';
	}

	if (typeof(object) !== 'object') {
		throw new TypeError(typeof(object) + ' is not an object');
	}

	let constructor = object.constructor;
	let parent = protoChain(constructor.prototype.__proto__);

	return parent
		? parent + ' :: ' + constructor.name
		: constructor.name;

}

softSet(Object.prototype, 'protoChain', protoChain);

/**
 * @param {Function} callback A callback function transforms values from the iterable.
 * @param {Object|Map|Array} [iterable] The iterable item to transform values for.
 * @returns {{}} An iterator for the transformed values.
 */
export function collect(callback, iterable = this) {
	let iterator = getIterator(iterable);
	return iteratorNext(function() {

		let nextValue = iterator.next();

		if (nextValue.done) {
			return iteratorDone()
		}

		let result = callback.apply(null, nextValue.value);

		return iteratorValue(result);

	});
}

softSet(Object.prototype, 'collect', filter);

/**
 * @param callback A predicate that is passed each item in the iterable, and returns true or false.
 * @param {Object|Map|Array} [iterable] The iterable item to filter values on.
 * @returns {Function} An iterator that filters unwanted results.
 */
export function filter(callback, iterable = this) {
	let iterator = getIterator(iterable);
	return iteratorNext(function next() {

		let nextValue = iterator.next();

		if (nextValue.done) {
			return iteratorDone();
		}

		let nextCheck = callback.apply(null, nextValue);
		return nextCheck
			? iteratorValue(nextValue)
			: next();

	});
}

softSet(Object.prototype, 'filter', filter);
