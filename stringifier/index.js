
// Returns a stringified version of input,
// behaving in exactly the same way as JSON.stringify()
function stringifier (input) {
  if (typeof input === 'object') {
    if (input === null) {
        return 'null';
    }
     else if (Array.isArray(input)) {
        let result_Array = [];

        for (let i of input) {
        result_Array.push(stringifier(i) || 'null');
        }
        return '[' + result_Array.join(',') + ']';
    }
     else {
        let result_Object = [];

        for (let key of Object.keys(input)) {
        if (input[key] === undefined || typeof input[key] === 'function') {
            continue; 
        }                           // Exclude undefined and functionsa
        result_Object.push('"' + key + '":' + stringifier(input[key]));
        }
        return '{' + result_Object.join(',') + '}';
    }
}

 else if (typeof input === 'number' || typeof input === 'boolean') {
return input.toString();
}

else if (typeof input === 'string') {
    return '"' + input + '"';
}
 else if (typeof input === 'undefined' || typeof input === 'function') {
return undefined; 
}
 else {
return undefined; 
}
}

// Allow tests to run on the server (leave at the bottom)
if (typeof window === 'undefined') {
  module.exports = stringifier;
}
