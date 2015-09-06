
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

/**
 *
 * @param {Object|Map|Array} iterable The iterable item to transform values for.
 * @param {Function} callback A callback function transforms values from the iterable.
 * @returns {{}} An iterator for the transformed values.
 */
export function collect(iterable, callback) {
	let iterator = iterable[Symbol.iterator]();
	return {
		next: function() {

			let nextValue = iterator.next();

			if (nextValue.done) {
				return iteratorDone()
			}

			let result = callback.apply(null, nextValue.value);

			return iteratorValue(result);

		}
	};
}

Array.prototype.collect = collect;
Map.prototype.collect = collect;
Object.prototype.collect = collect;

/**
 *
 * @param {Object|Map|Array} iterable
 * @param callback A predicate that is passed each item in the iterable, and returns true or false.
 * @returns {Function} An iterator that filters unwanted results.
 */
export function filter(iterable, callback) {
	let iterator = iterable[Symbol.iterator]();
	return function next() {

		let nextValue = iterator.next();

		if (nextValue.done) {
			return iteratorDone();
		}

		let nextCheck = callback.apply(null, nextValue);
		return nextCheck
			? iteratorValue(nextValue)
			: next();

	};

}

Array.prototype.filter = filter;
Map.prototype.filter = filter;
Object.prototype.filter = filter;
