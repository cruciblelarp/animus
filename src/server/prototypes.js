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
