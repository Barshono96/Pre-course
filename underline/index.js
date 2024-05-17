
var _ = {};

// ARRAYS

// _.first(array, [n])
// Returns an array with the first n elements of an array.
// If n is not provided it returns an array with just the first element.

_.first = function(array, n) {
  if (typeof array === 'object' && array !== null && 'length' in array && !Array.isArray(array)) {
    array = Array.from(array);
  }

  //chk array is not an array or is empty
  if (!Array.isArray(array) || array.length === 0) {
    return [];
  }
  
  // chk n is not a positive number
  if (typeof n !== 'number' || n <= 0) {
    return [array[0]];
  }
  
  // Chk if n is greater than array length
  if (n > array.length) {
    return array.slice();
  }
  
  // Otherwise, return the first n elements of array
  return array.slice(0, n);
};





// _.last(array, [n])
// Returns an array with the last n elements of an array.
// If n is not provided it returns an array with just the last element.
_.last = function (array, n) {
  if (typeof array === 'object' && array !== null && 'length' in array && !Array.isArray(array)) {
    array = Array.from(array);
  }

  //chk array is not an array or is empty
  if (!Array.isArray(array) || array.length === 0) {
    return [];
  }
  
  // chk n is not a positive number
  if (typeof n !== 'number' || n <= 0) {
    return [array[array.length-1]];
  }
  
  // Chk if n is greater than array length
  if (n >= array.length) {
    return array.slice();
  }
  
  // Otherwise, return the first n elements of array
  return array.slice(array.length-n);
};


// _.uniq(array)
// Produces a duplicate-free version of the array, using === to test equality.
// In particular only the first occurrence of each value is kept.

_.uniq = function(array) {
  var uniqArray = [];

  for (var i = 0; i < array.length; i++) {

    if (uniqArray.indexOf(array[i]) === -1) {
      console.log(uniqArray.indexOf(array[i]));
      uniqArray.push(array[i]);
    }
  }

  return uniqArray;
};



// OBJECTS

// _.extend(destination, source)
// Copies all the own enumerable properties in the source object over
// to the destination object, and returns it (without using `Object.assign`).
// _.extend = function (destination, source) {
//   for(let key in source){
//     destination[key] = source[key] ;
//   }

//    return destination;

// };

_.extend = function(destination, source) {
  for (let key in source) {

    if (source.hasOwnProperty(key)) {
      destination[key] = source[key];
    }
  }
  // Return the updated destination object
  return destination;
};


// _.defaults(destination, source)
// Fills in undefined properties in the destination object
// with own enumerable properties present in the source object,
// and returns the destination object.
_.defaults = function(destination, source) {
  for (let key in source) {
  
    if (source.hasOwnProperty(key)) {
      
      if (destination[key] === undefined) {
        destination[key] = source[key];
      }
    }
  }
  return destination;
};


// COLLECTIONS

// _.each(collection, iteratee, [context])
// Iterates over a collection of elements (i.e. array or object),
// yielding each in turn to an iteratee function, that is called with three arguments:
// (element, index|key, collection), and bound to the context if one is passed.
// Returns the collection for chaining.
_.each = function (collection, iteratee, context) {
  if (Array.isArray(collection)) {
    for (let i = 0; i < collection.length; i++) {
      iteratee.call(context, collection[i], i, collection);
    }
  } else {
    for (let key in collection) {
      if (collection.hasOwnProperty(key)) {
        iteratee.call(context, collection[key], key, collection);
      }
    }
  }
  return collection;
};
  

// _.contains(collection, value)
// Returns an array of indexes / keys where value can be found in the collection.
// TIP: here's a demo of how you can re-use already implemented methods in clever ways.
_.contains = function (collection, value) {
  var res = [];
  _.each(collection, function (el, key) {
    el === value && res.push(key);
  });
  return res;
};


// _.map(collection, iteratee, [context])
// Returns a new array of values by mapping each value in collection through iteratee.
// Each invocation of iteratee is called with three arguments:
// (element, index|key, collection), and bound to the context if one is passed.
_.map = function (collection, iteratee, context) {
  // If a context is provided, bind the iteratee to the context.
  if (context) {
    iteratee = iteratee.bind(context);
  }

  // If the collection is an array, use Array.prototype.map.
  if (Array.isArray(collection)) {
    return collection.map((element, index) => iteratee(element, index, collection));
  }

  // If the collection is an object, use Object.keys to get an array of keys,
  // then map over those keys.
  return Object.keys(collection).map((key) => iteratee(collection[key], key, collection));
};


// _.reduce(collection, iteratee, [accumulator], [context])
// Reduce boils down a collection of values into a single value.
// Accumulator is the initial state of the reduction,
// and each successive step of it should be returned by iteratee.
// Iteratee is passed four arguments: (accumulator, element, index|key, collection),
// and bound to the context if one is passed. If no accumulator is passed
// to the initial invocation of reduce, iteratee is not invoked on the first element,
// and the first element is instead passed as accumulator for the next invocation.
_.reduce = function (collection, iteratee, accumulator, context) {
  if (context) iteratee = iteratee.bind(context);

  const keys = !Array.isArray(collection) && Object.keys(collection);
  const length = (keys || collection).length;
  let index = 0;

  if (accumulator === undefined) {
    accumulator = collection[keys ? keys[index++] : index++];
  }

  for (; index < length; index++) {
    const currentKey = keys ? keys[index] : index;
    accumulator = iteratee(accumulator, collection[currentKey], currentKey, collection);
  }

  return accumulator;
};


// _.filter(collection, predicate, [context])
// Looks through each value in the collection, returning an array of all the values
// that pass a truth test (predicate). Predicate is called with three arguments:
// (element, index|key, collection), and bound to the context if one is passed.
_.filter = function (collection, predicate, context) {
  // If context is provided, bind the predicate function to the context
  const boundPredicate = context ? predicate.bind(context) : predicate;

  // Initialize an empty array to hold the filtered results
  const results = [];

  // Iterate over each element in the collection
  for (const [key, value] of Object.entries(collection)) {
    // Call the predicate function with the element, key/index, and collection
    if (boundPredicate(value, key, collection)) {
      // If the predicate returns true, add the element to the results
      results.push(value);
    }
  }

  // Return the array of filtered results
  return results;
};


// _.reject(collection, predicate, [context])
// Looks through each value in the collection, returning an array of all the values
// that don't pass a truth test (predicate). Predicate is called with three arguments:
// (element, index|key, collection), and bound to the context if one is passed.
// TIP: can you reuse _.filter()?
_.reject = function (collection, predicate, context) {
  const rejectedItems = [];

  for (const key in collection) {
    if (collection.hasOwnProperty(key)) {
      const value = collection[key];
      if (!predicate.call(context, value, key, collection)) {
        rejectedItems.push(value);
      }
    }
  }

  return rejectedItems;
};


// _.every(collection, [predicate], [context])
// Returns true if all values in the collection pass the predicate truth test.
// Predicate is called with three arguments:
// (element, index|key, collection), and bound to the context if one is passed.
// Short-circuits and stops traversing the list if a false element is found.
// TIP: without the short-circuiting you could reuse _.reduce(). Can you figure how?
// Because of the short-circuiting though, you need to implement it in a similar way as you did at _.each.
_.every = function (collection, predicate, context) {
  const bindPredicate = context ? predicate.bind(context) : predicate;

  for (const key in collection) {
    if (collection.hasOwnProperty(key) && !bindPredicate(collection[key], key, collection)) {
      return false;
    }
  }

  return true;
};


// _.some(collection, [predicate], [context])
// Returns true if any value in the collection passes the predicate truth test.
// Predicate is called with three arguments:
// (element, index|key, collection), and bound to the context if one is passed.
// Short-circuits and stops traversing the list if a true element is found.
// TIP: what method that you have already implemented can be reused here?
_.some = function (collection, predicate, context) {
  const boundPredicate = context ? predicate.bind(context) : predicate;

  for (const key in collection) {
    if (collection.hasOwnProperty(key) && boundPredicate(collection[key], key, collection)) {
      return true;
    }
  }

  return false;
};


// _.invoke(collection, methodName, *arguments)
// Returns an array with the results of calling the method
// indicated by methodName on each value in the collection.
// Any extra arguments passed to invoke will be forwarded on to the method invocation.
_.invoke = function (collection, methodName) {
  var method = Object.prototype[methodName];
  var isArray = Array.isArray(collection);
  var result = [];
  var argsForMethod = Array.prototype.slice.call(arguments, 2);

  for (let key in collection) {
    if (collection.hasOwnProperty(key)) {
      var methodResult = method.call(collection[key], ...argsForMethod);
      result.push(methodResult);
    }
  }
  
  return result;
};


// _.pluck(collection, propertyName)
// A convenient version of what is perhaps the most common use-case for map:
// given an array of objects (collection), iterates over each element
// in the collection, and returns an array with all the values
// corresponding to the property indicated by propertyName.
_.pluck = function (collection, propertyName) {
  const results = [];

  for (let i = 0; i < collection.length; i++) {
    results.push(collection[i][propertyName]);
  }
  return results;
};


// FUNCTIONS

// _.once(func)
// Creates a version of the function that can only be called one time
// (with any arguments). Repeated calls to the modified function
// will have no effect, returning the value from the original call.
// Useful for initialization functions, instead of having to set
// a boolean flag and then check it later.

_.once = function (func) {
  let Call = false; //Initial a boolean_flag
  let result;

  return function (args) {
    if (!Call) {
      result = func(args);
      Call = true;
    }
    return result;
  };
}



// _.memoize(func)
// Memoizes a given function by caching the computed result.
// Useful for speeding up slow-running computations.
// You may assume that the memoized function takes only one argument
// and that it is a primitive. Memoize should return a function that when called,
// will check if it has already computed the result for the given argument
// and return that value instead of recomputing it.
_.memoize = function (func) {
  let memo = {};
  return function (arg) {
    if (memo[arg] === undefined) {
      memo[arg] = func(arg);
    }
    return memo[arg];
  };
};

// _.delay(function, wait, *arguments)
// Much like setTimeout(), invokes function after waiting milliseconds.
// If you pass the optional arguments, they will be forwarded
// on to the function when it is invoked.

_.delay = function (func, wait, args) {
  setTimeout(() => func(args), wait);
};


// _.throttle(function, wait)
// Returns a new, throttled version of the passed function that,
// when invoked repeatedly (with any arguments), calls the original function
// at most once every wait milliseconds, and otherwise just returns
// the last computed result. Useful for rate-limiting events
// that occur faster than you can keep up with.
_.throttle = function (func, wait) {
  let lastCalled = 0;
  let lastResult;
  return function () {
    let now = Date.now();
    if (now - lastCalled >= wait) {
      lastCalled = now;
      lastResult = func.apply(this, arguments);
    }
    return lastResult;
  };
};

// Allow tests to run on the server (leave at the bottom)
if (typeof window === 'undefined') {
  module.exports = _;
}
   