/*!
 * jQuery JavaScript Library v2.1.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-05-01T17:11Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var arr = [];

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	version = "2.1.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		return !jQuery.isArray( obj ) && obj - parseFloat( obj ) >= 0;
	},

	isPlainObject: function( obj ) {
		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		if ( obj.constructor &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
			return false;
		}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		// Support: Android < 4.0, iOS < 6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {
			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf("use strict") === 1 ) {
				script = document.createElement("script");
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {
			// Otherwise, avoid the DOM node creation, insertion
			// and removal by using an indirect global eval
				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v1.10.19
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-04-18
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== strundefined && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare,
		doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", function() {
				setDocument();
			}, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", function() {
				setDocument();
			});
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select msallowclip=''><option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowclip^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[0] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter(function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.unique( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed, false );
	window.removeEventListener( "load", completed, false );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[0], key ) : emptyGet;
};


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( owner ) {
	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};


function Data() {
	// Support: Android < 4,
	// Old WebKit does not have Object.preventExtensions/freeze method,
	// return new empty object instead with no [[set]] accessor
	Object.defineProperty( this.cache = {}, 0, {
		get: function() {
			return {};
		}
	});

	this.expando = jQuery.expando + Math.random();
}

Data.uid = 1;
Data.accepts = jQuery.acceptData;

Data.prototype = {
	key: function( owner ) {
		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return the key for a frozen object.
		if ( !Data.accepts( owner ) ) {
			return 0;
		}

		var descriptor = {},
			// Check if the owner object already has a cache key
			unlock = owner[ this.expando ];

		// If not, create one
		if ( !unlock ) {
			unlock = Data.uid++;

			// Secure it in a non-enumerable, non-writable property
			try {
				descriptor[ this.expando ] = { value: unlock };
				Object.defineProperties( owner, descriptor );

			// Support: Android < 4
			// Fallback to a less secure definition
			} catch ( e ) {
				descriptor[ this.expando ] = unlock;
				jQuery.extend( owner, descriptor );
			}
		}

		// Ensure the cache object
		if ( !this.cache[ unlock ] ) {
			this.cache[ unlock ] = {};
		}

		return unlock;
	},
	set: function( owner, data, value ) {
		var prop,
			// There may be an unlock assigned to this node,
			// if there is no entry for this "owner", create one inline
			// and set the unlock as though an owner entry had always existed
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {
			// Fresh assignments by object are shallow copied
			if ( jQuery.isEmptyObject( cache ) ) {
				jQuery.extend( this.cache[ unlock ], data );
			// Otherwise, copy the properties one-by-one to the cache object
			} else {
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		// Either a valid cache is found, or will be created.
		// New caches will be created and the unlock returned,
		// allowing direct access to the newly created
		// empty data object. A valid owner object must be provided.
		var cache = this.cache[ this.key( owner ) ];

		return key === undefined ?
			cache : cache[ key ];
	},
	access: function( owner, key, value ) {
		var stored;
		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				((key && typeof key === "string") && value === undefined) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase(key) );
		}

		// [*]When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		if ( key === undefined ) {
			this.cache[ unlock ] = {};

		} else {
			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );
				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {
					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;
			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}
	},
	hasData: function( owner ) {
		return !jQuery.isEmptyObject(
			this.cache[ owner[ this.expando ] ] || {}
		);
	},
	discard: function( owner ) {
		if ( owner[ this.expando ] ) {
			delete this.cache[ owner[ this.expando ] ];
		}
	}
};
var data_priv = new Data();

var data_user = new Data();



/*
	Implementation Summary

	1. Enforce API surface and semantic compatibility with 1.9.x branch
	2. Improve the module's maintainability by reducing the storage
		paths to a single mechanism.
	3. Use the same single mechanism to support "private" and "user" data.
	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	5. Avoid exposing implementation details on user objects (eg. expando properties)
	6. Provide a clear path for implementation upgrade to WeakMap in 2014
*/
var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			data_user.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend({
	hasData: function( elem ) {
		return data_user.hasData( elem ) || data_priv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return data_user.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		data_user.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to data_priv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return data_priv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		data_priv.remove( elem, name );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = data_user.get( elem );

				if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					data_priv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				data_user.set( this, key );
			});
		}

		return access( this, function( value ) {
			var data,
				camelKey = jQuery.camelCase( key );

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {
				// Attempt to get data from the cache
				// with the key as-is
				data = data_user.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to get data from the cache
				// with the key camelized
				data = data_user.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each(function() {
				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = data_user.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				data_user.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf("-") !== -1 && data !== undefined ) {
					data_user.set( this, key, value );
				}
			});
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each(function() {
			data_user.remove( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = data_priv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = data_priv.access( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return data_priv.get( elem, key ) || data_priv.access( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				data_priv.remove( elem, [ type + "queue", key ] );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = data_priv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};

var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// #11217 - WebKit loses check when the name is after the checked attribute
	// Support: Windows Web Apps (WWA)
	// `name` and `type` need .setAttribute for WWA
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE9-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
})();
var strundefined = typeof undefined;



support.focusinBubbles = "onfocusin" in window;


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.hasData( elem ) && data_priv.get( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;
			data_priv.remove( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.disabled !== true || event.type !== "click" ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome < 28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle, false );
	}
};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && e.preventDefault ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && e.stopPropagation ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// Support: Chrome 15+
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// Create "bubbling" focus and blur events
// Support: Firefox, Chrome, Safari
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				data_priv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					data_priv.remove( doc, fix );

				} else {
					data_priv.access( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {

		// Support: IE 9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

// Support: IE 9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: 1.x compatibility
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute("type");
	}

	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		data_priv.set(
			elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
		);
	}
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( data_priv.hasData( src ) ) {
		pdataOld = data_priv.access( src );
		pdataCur = data_priv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( data_user.hasData( src ) ) {
		udataOld = data_user.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		data_user.set( dest, udataCur );
	}
}

function getAll( context, tag ) {
	var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
			context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}

// Support: IE >= 9
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Support: IE >= 9
		// Fix Cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					// Support: QtWebKit
					// jQuery.merge because push.apply(_, arraylike) throws
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: QtWebKit
					// jQuery.merge because push.apply(_, arraylike) throws
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Fixes #12346
					// Support: Webkit, IE
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	},

	cleanData: function( elems ) {
		var data, elem, type, key,
			special = jQuery.event.special,
			i = 0;

		for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
			if ( jQuery.acceptData( elem ) ) {
				key = elem[ data_priv.expando ];

				if ( key && (data = data_priv.cache[ key ]) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}
					if ( data_priv.cache[ key ] ) {
						// Discard any remaining `private` data
						delete data_priv.cache[ key ];
					}
				}
			}
			// Discard any remaining `user` data
			delete data_user.cache[ elem[ data_user.expando ] ];
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each(function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				});
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							// Support: QtWebKit
							// jQuery.merge because push.apply(_, arraylike) throws
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {
		return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
	};



function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') in IE9, see #12537
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];
	}

	if ( computed ) {

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// Support: iOS < 6
		// A tribute to the "awesome hack by Dean Edwards"
		// iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
		// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
		if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?
		// Support: IE
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	var pixelPositionVal, boxSizingReliableVal,
		docElem = document.documentElement,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	if ( !div.style ) {
		return;
	}

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" +
		"position:absolute";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computePixelPositionAndBoxSizingReliable() {
		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";
		div.innerHTML = "";
		docElem.appendChild( container );

		var divStyle = window.getComputedStyle( div, null );
		pixelPositionVal = divStyle.top !== "1%";
		boxSizingReliableVal = divStyle.width === "4px";

		docElem.removeChild( container );
	}

	// Support: node.js jsdom
	// Don't assume that getComputedStyle is a property of the global object
	if ( window.getComputedStyle ) {
		jQuery.extend( support, {
			pixelPosition: function() {
				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computePixelPositionAndBoxSizingReliable();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				if ( boxSizingReliableVal == null ) {
					computePixelPositionAndBoxSizingReliable();
				}
				return boxSizingReliableVal;
			},
			reliableMarginRight: function() {
				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
					marginDiv = div.appendChild( document.createElement( "div" ) );

				// Reset CSS: box-sizing; display; margin; border; padding
				marginDiv.style.cssText = div.style.cssText =
					// Support: Firefox<29, Android 2.3
					// Vendor-prefix box-sizing
					"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
					"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				docElem.appendChild( container );

				ret = !parseFloat( window.getComputedStyle( marginDiv, null ).marginRight );

				docElem.removeChild( container );

				return ret;
			}
		});
	}
})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name[0].toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = data_priv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = data_priv.access( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display !== "none" || !hidden ) {
				data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifying setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
				style[ name ] = value;
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = data_priv.get( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			data_priv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always(function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		});
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = data_priv.access( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;

			data_priv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || data_priv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = data_priv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = data_priv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS 5.1, Android 4.x, Android 2.3
	// Check the default checkbox/radio value ("" on old WebKit; "on" elsewhere)
	support.checkOn = input.value !== "";

	// Must access the parent to make an option select properly
	// Support: IE9, IE10
	support.optSelected = opt.selected;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Check if an input maintains its value after becoming a radio
	// Support: IE9, IE10
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
})();


var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle;
		if ( !isXML ) {
			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ name ];
			attrHandle[ name ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				name.toLowerCase() :
				null;
			attrHandle[ name ] = handle;
		}
		return ret;
	};
});




var rfocusable = /^(?:input|select|textarea|button)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each(function() {
			delete this[ jQuery.propFix[ name ] || name ];
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
					elem.tabIndex :
					-1;
			}
		}
	}
});

// Support: IE9+
// Selectedness for an option in an optgroup can be inaccurate
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = arguments.length === 0 || typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					data_priv.set( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE6-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( (option.selected = jQuery.inArray( option.value, values ) >= 0) ) {
						optionSet = true;
					}
				}

				// force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
	return JSON.parse( data + "" );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE9
	try {
		tmp = new DOMParser();
		xml = tmp.parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,
			// URL without anti-cache param
			cacheURL,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapAll( html.call(this, i) );
			});
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
};
jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


jQuery.ajaxSettings.xhr = function() {
	try {
		return new XMLHttpRequest();
	} catch( e ) {}
};

var xhrId = 0,
	xhrCallbacks = {},
	xhrSuccessStatus = {
		// file protocol always yields status code 0, assume 200
		0: 200,
		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE9
// Open requests must be manually aborted on unload (#5280)
if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]();
		}
	});
}

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport(function( options ) {
	var callback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr(),
					id = ++xhrId;

				xhr.open( options.type, options.url, options.async, options.username, options.password );

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers["X-Requested-With"] ) {
					headers["X-Requested-With"] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							delete xhrCallbacks[ id ];
							callback = xhr.onload = xhr.onerror = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {
								complete(
									// file: protocol always yields status 0; see #8605, #14207
									xhr.status,
									xhr.statusText
								);
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,
									// Support: IE9
									// Accessing binary-data responseText throws an exception
									// (#11426)
									typeof xhr.responseText === "string" ? {
										text: xhr.responseText
									} : undefined,
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				xhr.onerror = callback("error");

				// Create the abort callback
				callback = xhrCallbacks[ id ] = callback("abort");

				try {
					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {
					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {
	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery("<script>").prop({
					async: true,
					charset: s.scriptCharset,
					src: s.url
				}).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};




var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf("auto") > -1;

		// Need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			elem = this[ 0 ],
			box = { top: 0, left: 0 },
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// We assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : window.pageXOffset,
					top ? val : window.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
;/*!
 * Bootstrap v3.2.0 (http://getbootstrap.com)
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

if (typeof jQuery === 'undefined') { throw new Error('Bootstrap\'s JavaScript requires jQuery') }

/* ========================================================================
 * Bootstrap: transition.js v3.2.0
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.2.0
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.2.0'

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.hasClass('alert') ? $this : $this.parent()
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(150) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.2.0
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.2.0'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state = state + 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    $el[val](data[state] == null ? this.options[state] : data[state])

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked') && this.$element.hasClass('active')) changed = false
        else $parent.find('.active').removeClass('active')
      }
      if (changed) $input.prop('checked', !this.$element.hasClass('active')).trigger('change')
    }

    if (changed) this.$element.toggleClass('active')
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document).on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
    var $btn = $(e.target)
    if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
    Plugin.call($btn, 'toggle')
    e.preventDefault()
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.2.0
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element).on('keydown.bs.carousel', $.proxy(this.keydown, this))
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      =
    this.sliding     =
    this.interval    =
    this.$active     =
    this.$items      = null

    this.options.pause == 'hover' && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.2.0'

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true
  }

  Carousel.prototype.keydown = function (e) {
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || $active[type]()
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var fallback  = type == 'next' ? 'first' : 'last'
    var that      = this

    if (!$next.length) {
      if (!this.options.wrap) return
      $next = this.$element.find('.item')[fallback]()
    }

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd($active.css('transition-duration').slice(0, -1) * 1000)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  $(document).on('click.bs.carousel.data-api', '[data-slide], [data-slide-to]', function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  })

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.2.0
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.transitioning = null

    if (this.options.parent) this.$parent = $(this.options.parent)
    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.2.0'

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var actives = this.$parent && this.$parent.find('> .panel > .in')

    if (actives && actives.length) {
      var hasData = actives.data('bs.collapse')
      if (hasData && hasData.transitioning) return
      Plugin.call(actives, 'hide')
      hasData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(350)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse')
      .removeClass('in')

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .trigger('hidden.bs.collapse')
        .removeClass('collapsing')
        .addClass('collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(350)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && option == 'show') option = !option
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var href
    var $this   = $(this)
    var target  = $this.attr('data-target')
        || e.preventDefault()
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7
    var $target = $(target)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()
    var parent  = $this.attr('data-parent')
    var $parent = parent && $(parent)

    if (!data || !data.transitioning) {
      if ($parent) $parent.find('[data-toggle="collapse"][data-parent="' + parent + '"]').not($this).addClass('collapsed')
      $this[$target.hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
    }

    Plugin.call($target, option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.2.0
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.2.0'

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.trigger('focus')

      $parent
        .toggleClass('open')
        .trigger('shown.bs.dropdown', relatedTarget)
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27)/.test(e.keyCode)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive || (isActive && e.keyCode == 27)) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.divider):visible a'
    var $items = $parent.find('[role="menu"]' + desc + ', [role="listbox"]' + desc)

    if (!$items.length) return

    var index = $items.index($items.filter(':focus'))

    if (e.keyCode == 38 && index > 0)                 index--                        // up
    if (e.keyCode == 40 && index < $items.length - 1) index++                        // down
    if (!~index)                                      index = 0

    $items.eq(index).trigger('focus')
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $parent = getParent($(this))
      var relatedTarget = { relatedTarget: this }
      if (!$parent.hasClass('open')) return
      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))
      if (e.isDefaultPrevented()) return
      $parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget)
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle + ', [role="menu"], [role="listbox"]', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.2.0
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options        = options
    this.$body          = $(document.body)
    this.$element       = $(element)
    this.$backdrop      =
    this.isShown        = null
    this.scrollbarWidth = 0

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.2.0'

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.$body.addClass('modal-open')

    this.setScrollbar()
    this.escape()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element
        .addClass('in')
        .attr('aria-hidden', false)

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$element.find('.modal-dialog') // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(300) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.$body.removeClass('modal-open')

    this.resetScrollbar()
    this.escape()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .attr('aria-hidden', true)
      .off('click.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(300) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keyup.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keyup.dismiss.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus.call(this.$element[0])
          : this.hide.call(this)
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(150) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  Modal.prototype.checkScrollbar = function () {
    if (document.body.clientWidth >= window.innerWidth) return
    this.scrollbarWidth = this.scrollbarWidth || this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    if (this.scrollbarWidth) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', '')
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.2.0
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       =
    this.options    =
    this.enabled    =
    this.timeout    =
    this.hoverState =
    this.$element   = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.2.0'

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $(this.options.viewport.selector || this.options.viewport)

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(document.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var $parent      = this.$element.parent()
        var parentDim    = this.getPosition($parent)

        placement = placement == 'bottom' && pos.top   + pos.height       + actualHeight - parentDim.scroll > parentDim.height ? 'top'    :
                    placement == 'top'    && pos.top   - parentDim.scroll - actualHeight < 0                                   ? 'bottom' :
                    placement == 'right'  && pos.right + actualWidth      > parentDim.width                                    ? 'left'   :
                    placement == 'left'   && pos.left  - actualWidth      < parentDim.left                                     ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(150) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  = offset.top  + marginTop
    offset.left = offset.left + marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var arrowDelta          = delta.left ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowPosition       = delta.left ? 'left'        : 'top'
    var arrowOffsetPosition = delta.left ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], arrowPosition)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, position) {
    this.arrow().css(position, delta ? (50 * (1 - delta / dimension) + '%') : '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function () {
    var that = this
    var $tip = this.tip()
    var e    = $.Event('hide.bs.' + this.type)

    this.$element.removeAttr('aria-describedby')

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      that.$element.trigger('hidden.bs.' + that.type)
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && this.$tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(150) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof ($e.attr('data-original-title')) != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element
    var el     = $element[0]
    var isBody = el.tagName == 'BODY'
    return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : null, {
      scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop(),
      width:  isBody ? $(window).width()  : $element.outerWidth(),
      height: isBody ? $(window).height() : $element.outerHeight()
    }, isBody ? { top: 0, left: 0 } : $element.offset())
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width   }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.width) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    return (this.$tip = this.$tip || $(this.options.template))
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.validate = function () {
    if (!this.$element[0].parentNode) {
      this.hide()
      this.$element = null
      this.options  = null
    }
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
  }

  Tooltip.prototype.destroy = function () {
    clearTimeout(this.timeout)
    this.hide().$element.off('.' + this.type).removeData('bs.' + this.type)
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && option == 'destroy') return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.2.0
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.2.0'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').empty()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }

  Popover.prototype.tip = function () {
    if (!this.$tip) this.$tip = $(this.options.template)
    return this.$tip
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && option == 'destroy') return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.2.0
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    var process  = $.proxy(this.process, this)

    this.$body          = $('body')
    this.$scrollElement = $(element).is('body') ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', process)
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.2.0'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var offsetMethod = 'offset'
    var offsetBase   = 0

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.offsets = []
    this.targets = []
    this.scrollHeight = this.getScrollHeight()

    var self     = this

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        self.offsets.push(this[0])
        self.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop <= offsets[0]) {
      return activeTarget != (i = targets[0]) && this.activate(i)
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')

    var selector = this.selector +
        '[data-target="' + target + '"],' +
        this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.2.0
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    this.element = $(element)
  }

  Tab.VERSION = '3.2.0'

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var previous = $ul.find('.active:last a')[0]
    var e        = $.Event('show.bs.tab', {
      relatedTarget: previous
    })

    $this.trigger(e)

    if (e.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: previous
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && $active.hasClass('fade')

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
        .removeClass('active')

      element.addClass('active')

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu')) {
        element.closest('li.dropdown').addClass('active')
      }

      callback && callback()
    }

    transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(150) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  $(document).on('click.bs.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.2.0
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      =
    this.unpin        =
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.2.0'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var scrollHeight = $(document).height()
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.unpin   != null && (scrollTop + this.unpin <= position.top) ? false :
                offsetBottom != null && (position.top + this.$element.height() >= scrollHeight - offsetBottom) ? 'bottom' :
                offsetTop    != null && (scrollTop <= offsetTop) ? 'top' : false

    if (this.affixed === affix) return
    if (this.unpin != null) this.$element.css('top', '')

    var affixType = 'affix' + (affix ? '-' + affix : '')
    var e         = $.Event(affixType + '.bs.affix')

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    this.affixed = affix
    this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

    this.$element
      .removeClass(Affix.RESET)
      .addClass(affixType)
      .trigger($.Event(affixType.replace('affix', 'affixed')))

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - this.$element.height() - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom) data.offset.bottom = data.offsetBottom
      if (data.offsetTop)    data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);
;// created by Minh Nguyen;
// version 1.04;

(function($) {
    
    // for zeptojs;
    $.isNumeric == null && ($.isNumeric = function(src) {
        return src != null && src.constructor === Number;
    });

    $.isFunction == null && ($.isFunction = function(src) {
        return src != null && src instanceof Function;
    });

    var $W = $(window);
    var $D = $(document);
    
    var layoutManager = {
        // default setting;
        defaultConfig: {
            animate: false,
            cache: true, // cache the size of blocks for performance;
            cellW: 100, // function(container) {return 100;}
            cellH: 100, // function(container) {return 100;}
            delay: 0, // slowdown active block;
            engine: 'giot', // 'giot' is a person name;
            fixSize: null, // resize + adjust = fill gap;
            //fixSize: 0, allow adjust size = no fill gap;
            //fixSize: 1, no resize + no adjust = no fill gap;
            gutterX: 15, // width spacing between blocks;
            gutterY: 15, // height spacing between blocks;
            selector: '> div',
            draggable: false,
            rightToLeft: false,
            bottomToTop: false,
            onGapFound: function() {},
            onComplete: function() {},
            onResize: function() {},
            onBlockReady: function() {},
            onBlockFinish: function() {},
            onBlockActive: function() {}
        },
        plugin: {},
        totalGrid: 1,
        transition: false,
        loadBlock: function(item, setting) {
            var runtime = setting.runtime;
            var gutterX = runtime.gutterX;
            var gutterY = runtime.gutterY;
            var cellH = runtime.cellH;
            var cellW = runtime.cellW;
            var block = null;
            var $item = $(item);
            var active = $item.data("active");
            var fixPos = $item.attr('data-position');
            var fixSize = parseInt($item.attr('data-fixSize'));
            var blockId = runtime.lastId++ + '-' + runtime.totalGrid;
            
            //ignore dragging block;
            if ($item.hasClass('fw-float')) return;
            $item.attr({id: blockId, 'data-delay': item.index});

            //remove animation for speed render;
            if (setting.animate && this.transition) {
                this.setTransition(item, "");
            }

            isNaN(fixSize) && (fixSize = null);
            (fixSize == null) && (fixSize = setting.fixSize);
            var makeRound = (fixSize == 1) ? "ceil" : "round";
            // store original size;
           
            $item.attr('data-height') == null && $item.attr('data-height', $item.height());
            $item.attr('data-width') == null && $item.attr('data-width', $item.width());
            var height = 1 * $item.attr('data-height');
            var width = 1 * $item.attr('data-width');
            
            if (!setting.cache) {
                item.style.width = "";
                width = $item.width();

                item.style.height = "";
                height = $item.height();
            }

            var col = !width ? 0 : Math[makeRound]((width + gutterX) / cellW);
            var row = !height ? 0 : Math[makeRound]((height + gutterY) / cellH);

            // estimate size;
            if (!fixSize && setting.cellH == 'auto') {
                $item.width(cellW * col - gutterX);
                item.style.height = "";
                height = $item.height();
                row = !height ? 0 : Math.round((height + gutterY) / cellH);
            }

            if (!fixSize && setting.cellW == 'auto') {
                $item.height(cellH * row - gutterY);
                item.style.width = "";
                width = $item.width();
                col = !width ? 0 : Math.round((width + gutterX) / cellW);
            }
            
            // for none resize block;
            if ((fixSize != null) && (col > runtime.limitCol || row > runtime.limitRow)) {
                block = null;
            } else {
                // get smallest width and smallest height of block;
                // using for image runtime;
                row && row < runtime.minHoB && (runtime.minHoB = row);
                col && col < runtime.minWoB && (runtime.minWoB = col);

                // get biggest width and biggest height of block;
                row > runtime.maxHoB && (runtime.maxHoB = row);
                col > runtime.maxWoB && (runtime.maxWoB = col);

                width == 0 && (col = 0);
                height == 0 && (row = 0);

                block = {
                    id: blockId,
                    width: col,
                    height: row,
                    fixSize: fixSize
                };

                // for fix position;
                if (fixPos) {
                    fixPos = fixPos.split("-");
                    block.y = 1 * fixPos[0];
                    block.x = 1 * fixPos[1];
                    block.width = fixSize != null ? col : Math.min(col, runtime.limitCol - block.x);
                    block.height = fixSize != null ? row : Math.min(row, runtime.limitRow - block.y);
                    var holeId = block.y + "-" + block.x + "-" + block.width + "-" + block.height;
                    if (active) {
                        runtime.holes[holeId] = {
                            id: block.id,
                            top: block.y,
                            left: block.x,
                            width: block.width,
                            height: block.height
                        };
                        this.setBlock(block, setting);
                    } else {
                        delete runtime.holes[holeId];
                    }
                    
                }
            }

            // for css animation;
            if ($item.attr("data-state") == null) {
                $item.attr("data-state", "init");
            } else {
                $item.attr("data-state", "move");
            }

            setting.onBlockReady.call(item, block, setting);

            return (fixPos && active) ? null : block;
        },
        setBlock: function(block, setting) {
            var runtime = setting.runtime;
            var gutterX = runtime.gutterX;
            var gutterY = runtime.gutterY;
            var height = block.height;
            var width = block.width;
            var cellH = runtime.cellH;
            var cellW = runtime.cellW;
            var x = block.x;
            var y = block.y;

            if (setting.rightToLeft) {
                x = runtime.limitCol - x - width;
            }
            if (setting.bottomToTop) {
                y = runtime.limitRow - y - height;
            }

            var realBlock = {
                fixSize: block.fixSize,
                top: y * cellH,
                left: x  * cellW,
                width: cellW * width - gutterX,
                height: cellH * height - gutterY
            };
            
            realBlock.top = 1 * realBlock.top.toFixed(2);
            realBlock.left = 1 * realBlock.left.toFixed(2);
            realBlock.width = 1 * realBlock.width.toFixed(2);
            realBlock.height = 1 * realBlock.height.toFixed(2);

            //runtime.length += 1;
            block.id && (runtime.blocks[block.id] = realBlock);

            // for append feature;
            return realBlock;
        },
        showBlock: function(item, setting) {
            var runtime = setting.runtime;
            var method = setting.animate && !this.transition ? 'animate' : 'css';
            var block = runtime.blocks[item.id];
            var $item = $(item);
            var self = this;
            var start = $item.attr("data-state") != "move";
            var trans = start ? "width 0.5s, height 0.5s" : "top 0.5s, left 0.5s, width 0.5s, height 0.5s, opacity 0.5s";
            
            item.delay && clearTimeout(item.delay);
            //ignore dragging block;
            if ($item.hasClass('fw-float')) return;
            
            // kill the old transition;
            self.setTransition(item, "");
            item.style.position = "absolute";
            setting.onBlockActive.call(item, block, setting);
            
            function action() {
                // start to arrange;
                start && $item.attr("data-state", "start");
                // add animation by using css3 transition;
                if (setting.animate && self.transition) {
                    self.setTransition(item, trans);
                }

                // for hidden block;
                if (!block) {
                    //var position = $item.position(); <= make speed so slow;
                    var height = parseInt(item.style.height) || 0;
                    var width = parseInt(item.style.width) || 0;
                    var left = parseInt(item.style.left) || 0;
                    var top = parseInt(item.style.top) || 0;
                    $item[method]({
                        left: left + width / 2,
                        top: top + height / 2,
                        width: 0,
                        height: 0,
                        opacity: 0
                    });
                } else {
                    if (block.fixSize) {
                        block.height = 1 * $item.attr("data-height");
                        block.width = 1 * $item.attr("data-width");
                    }

                    $item["css"]({
                        opacity: 1,
                        width: block.width,
                        height: block.height
                    });

                    // for animating by javascript;
                    $item[method]({
                        top: block.top,
                        left: block.left
                    });

                    if ($item.attr('data-nested') != null) {
                        self.nestedGrid(item, setting);
                    }
                }

                runtime.length -= 1;

                setting.onBlockFinish.call(item, block, setting);

                runtime.length == 0 && setting.onComplete.call(item, block, setting);
            }

            setting.delay > 0 ? (item.delay = setTimeout(action, setting.delay * $item.attr("data-delay"))) : action(); 
        },
        nestedGrid: function(item, setting) {
            var innerWall, $item = $(item), runtime = setting.runtime;
            var gutterX = $item.attr("data-gutterX") || setting.gutterX;
            var gutterY = $item.attr("data-gutterY") || setting.gutterY;
            var method = $item.attr("data-method") || "fitZone";
            var nested = $item.attr('data-nested') || "> div";
            var cellH = $item.attr("data-cellH") || setting.cellH;
            var cellW = $item.attr("data-cellW") || setting.cellW;
            var block = runtime.blocks[item.id];
            
            if (block) {
                innerWall = new freewall($item);
                innerWall.reset({
                    cellH: cellH,
                    cellW: cellW,
                    gutterX: 1 * gutterX,
                    gutterY: 1 * gutterY,
                    selector: nested
                });

                switch (method) {
                    case "fitHeight":
                        innerWall[method](block.height);
                        break;
                    case "fitWidth":
                        innerWall[method](block.width);
                        break;
                    case "fitZone":
                        innerWall[method](block.width, block.height);
                        break;
                }
            }
        },
        adjustBlock: function(block, setting) {
            var runtime = setting.runtime;
            var gutterX = runtime.gutterX;
            var gutterY = runtime.gutterY;
            var $item = $("#" + block.id);
            var cellH = runtime.cellH;
            var cellW = runtime.cellW;

            if (setting.cellH == 'auto') {
                $item.width(block.width * cellW - gutterX);
                $item[0].style.height = "";
                block.height = Math.round(($item.height() + gutterY) / cellH);
            }
        },
        adjustUnit: function(width, height, setting) {
            var gutterX = setting.gutterX;
            var gutterY = setting.gutterY;
            var runtime = setting.runtime;
            var cellW = setting.cellW;
            var cellH = setting.cellH;

            $.isFunction(cellW) && (cellW = cellW(width));
            cellW = 1 * cellW;
            !$.isNumeric(cellW) && (cellW = 1);
            
            $.isFunction(cellH) && (cellH = cellH(height));
            cellH = 1 * cellH;
            !$.isNumeric(cellH) && (cellH = 1);

            if ($.isNumeric(width)) {
                // adjust cell width via container;
                cellW < 1 && (cellW = cellW * width);

                // estimate total columns;
                var limitCol = Math.max(1, Math.floor(width / cellW));

                // adjust unit size for fit width;
                if (!$.isNumeric(gutterX)) {
                    gutterX = (width - limitCol * cellW) / Math.max(1, (limitCol - 1));
                    gutterX = Math.max(0, gutterX);
                }

                limitCol = Math.floor((width + gutterX) / cellW);
                runtime.cellW = (width + gutterX) / Math.max(limitCol, 1);
                runtime.cellS = runtime.cellW / cellW;
                runtime.gutterX = gutterX;
                runtime.limitCol = limitCol;
            } 

            if ($.isNumeric(height)) {
                // adjust cell height via container;
                cellH < 1 && (cellH = cellH * height);

                // estimate total rows;
                var limitRow = Math.max(1, Math.floor(height / cellH));

                // adjust size unit for fit height;
                if (!$.isNumeric(gutterY)) {
                    gutterY = (height - limitRow * cellH) / Math.max(1, (limitRow - 1));
                    gutterY = Math.max(0, gutterY);
                }

                limitRow = Math.floor((height + gutterY) / cellH);
                runtime.cellH = (height + gutterY) / Math.max(limitRow, 1);
                runtime.cellS = runtime.cellH / cellH;
                runtime.gutterY = gutterY;
                runtime.limitRow = limitRow;
            } 

            if (!$.isNumeric(width)) {
                // adjust cell width via cell height;
                cellW < 1 && (cellW = runtime.cellH);
                runtime.cellW = cellW != 1 ? cellW * runtime.cellS : 1;
                runtime.gutterX = gutterX;
                runtime.limitCol = 666666;
            }

            if (!$.isNumeric(height)) {
                // adjust cell height via cell width;
                cellH < 1 && (cellH = runtime.cellW);
                runtime.cellH = cellH != 1 ? cellH * runtime.cellS : 1;
                runtime.gutterY = gutterY;
                runtime.limitRow = 666666;
            }
        },
        resetGrid: function(runtime) {
            runtime.blocks = {};
            runtime.length = 0;
            runtime.cellH = 0;
            runtime.cellW = 0;
            runtime.lastId = 1;
            runtime.matrix = {};
            runtime.totalCol = 0;
            runtime.totalRow = 0;
        },
        setDraggable: function(item, option) {
            var isTouch = false;
            var config = {
                startX: 0, //start clientX;
                startY: 0, 
                top: 0,
                left: 0,
                handle: null,
                onDrop: function() {},
                onDrag: function() {},
                onStart: function() {}
            };

            $(item).each(function() {
                var setting = $.extend({}, config, option);
                var handle = setting.handle || this;
                var ele = this;
                var $E = $(ele);
                var $H = $(handle);

                var posStyle = $E.css("position");
                posStyle != "absolute" && $E.css("position", "relative");
                

                function mouseDown(evt) {
                    evt.stopPropagation();
                    evt = evt.originalEvent;

                    if (evt.touches) {
                        isTouch = true;
                        evt = evt.changedTouches[0];
                    }

                    if (evt.button != 2 && evt.which != 3) {
                        setting.onStart.call(ele, evt);
                        
                        setting.startX = evt.clientX;
                        setting.startY = evt.clientY;
                        setting.top = parseInt($E.css("top")) || 0;
                        setting.left = parseInt($E.css("left")) || 0;
                        
                        $D.bind("mouseup touchend", mouseUp);
                        $D.bind("mousemove touchmove", mouseMove); 
                    }

                    return false;
                };
                
                        
                function mouseMove(evt) {
                    evt = evt.originalEvent;
                    isTouch && (evt = evt.changedTouches[0]);
                    
                    $E.css({
                        top: setting.top - (setting.startY - evt.clientY),
                        left: setting.left - (setting.startX - evt.clientX)
                    });
                    
                    setting.onDrag.call(ele, evt);
                };
                
                function mouseUp(evt) {
                    evt = evt.originalEvent;
                    isTouch && (evt = evt.changedTouches[0]);
        
                    setting.onDrop.call(ele, evt);

                    $D.unbind("mouseup touchend", mouseUp);
                    $D.unbind("mousemove touchmove", mouseMove);
                };

                // ignore drag drop on text field;
                $E.find("iframe, form, input, textarea, .ignore-drag")
                .each(function() {
                    $(this).on("touchstart mousedown", function(evt) {
                        evt.stopPropagation();
                    });
                });
                
                $D.unbind("mouseup touchend", mouseUp);
                $D.unbind("mousemove touchmove", mouseMove);
                $H.unbind("mousedown touchstart").bind("mousedown touchstart", mouseDown);

            });
        },
        setTransition: function(item, trans) {
            var style = item.style;
            var $item = $(item);
                
            // remove animation;
            if (!this.transition && $item.stop) {
                $item.stop();
            } else if (style.webkitTransition != null) {
                style.webkitTransition = trans;
            } else if (style.MozTransition != null) {
                style.MozTransition = trans;
            } else if (style.msTransition != null) {
                style.msTransition = trans;
            } else if (style.OTransition != null) {
                style.OTransition = trans;
            } else {
                style.transition = trans;
            }
        },
        getFreeArea: function(t, l, runtime) {
            var maxY = Math.min(t + runtime.maxHoB, runtime.limitRow);
            var maxX = Math.min(l + runtime.maxWoB, runtime.limitCol);
            var minX = maxX;
            var minY = maxY;
            var matrix = runtime.matrix;
            
            // find limit zone by horizon;
            for (var y = t; y < minY; ++y) {
                for (var x = l; x < maxX; ++x) {
                    if (matrix[y + '-' + x]) {
                        (l < x && x < minX) && (minX = x);
                    }
                }
            }
            
            // find limit zone by vertical;
            for (var y = t; y < maxY; ++y) {
                for (var x = l; x < minX; ++x) {
                    if (matrix[y + '-' + x]) {
                        (t < y && y < minY) && (minY = y);
                    }
                }
            }

            return {
                top: t,
                left: l,
                width: minX - l,
                height: minY - t
            };

        },
        setWallSize: function(runtime, container) {
            var totalRow = runtime.totalRow;
            var totalCol = runtime.totalCol;
            var gutterY = runtime.gutterY;
            var gutterX = runtime.gutterX;
            var cellH = runtime.cellH;
            var cellW = runtime.cellW;
            var totalWidth = Math.max(0, cellW * totalCol - gutterX);
            var totalHeight = Math.max(0, cellH * totalRow - gutterY);
            
            container.attr({
                'data-total-col': totalCol,
                'data-total-row': totalRow,
                'data-wall-width': Math.ceil(totalWidth),
                'data-wall-height': Math.ceil(totalHeight)
            });

            if (runtime.limitCol < runtime.limitRow) {
                // do not set height with nesting grid;
                !container.attr("data-height") && container.height(Math.ceil(totalHeight));
            }
        }
    };

    

    var engine = {
        // Giot just a person name;
        giot: function(items, setting) {
            var runtime = setting.runtime,
                row = runtime.limitRow,
                col = runtime.limitCol,
                x = 0,
                y = 0,
                maxX = runtime.totalCol,
                maxY = runtime.totalRow,
                wall = {},
                holes = runtime.holes,
                block = null,
                matrix = runtime.matrix,
                bigLoop = Math.max(col, row),
                freeArea = null,
                misBlock = null,
                fitWidth = col < row ? 1 : 0,
                lastBlock = null,
                smallLoop = Math.min(col, row);

            // fill area with top, left, width, height;
            function fillMatrix(id, t, l, w, h) {
                for (var y = t; y < t + h;) {
                    for (var x = l; x < l + w;) {
                        matrix[y + '-' + x] = id;
                        ++x > maxX && (maxX = x);
                    }
                    ++y > maxY && (maxY = y);
                }
            }
            
            // set a hole on the wall;
            for (var i in holes) {
                if (holes.hasOwnProperty(i)) {
                    fillMatrix(holes[i]["id"] || true, holes[i]['top'], holes[i]['left'], holes[i]['width'], holes[i]['height']);
                }
            }
            

            for (var b = 0; b < bigLoop; ++b) {
                if (!items.length) break;
                fitWidth ? (y = b) : (x = b);
                lastBlock = null;

                for (var s = 0; s < smallLoop; ++s) {
                    if (!items.length) break;
                    fitWidth ? (x = s) : (y = s);
                    if (runtime.matrix[y + '-' + x]) continue;
                    freeArea = layoutManager.getFreeArea(y, x, runtime);
                    block = null;
                    for (var i = 0; i < items.length; ++i) {
                        if (items[i].height > freeArea.height) continue;
                        if (items[i].width > freeArea.width) continue;
                        block = items.splice(i, 1)[0];
                        break;
                    }

                    // trying resize the other block to fit gap;
                    if (block == null && setting.fixSize == null) {
                        // resize near block to fill gap;
                        if (lastBlock && !fitWidth && runtime.minHoB > freeArea.height) {
                            lastBlock.height += freeArea.height;
                            fillMatrix(lastBlock.id, lastBlock.y, lastBlock.x, lastBlock.width, lastBlock.height);
                            layoutManager.setBlock(lastBlock, setting);
                            continue;
                        } else if (lastBlock && fitWidth && runtime.minWoB > freeArea.width) {
                            lastBlock.width += freeArea.width;
                            fillMatrix(lastBlock.id, lastBlock.y, lastBlock.x, lastBlock.width, lastBlock.height);
                            layoutManager.setBlock(lastBlock, setting);
                            continue;
                        } else {
                            // get other block fill to gap;
                            for (var i = 0; i < items.length; ++i) {
                                if (items[i]['fixSize'] != null) continue;
                                block = items.splice(i, 1)[0];
                                if (fitWidth) {
                                    block.width = freeArea.width;
                                    if (setting.cellH == 'auto') {
                                        layoutManager.adjustBlock(block, setting);
                                    }
                                    // for fitZone;
                                    block.height = Math.min(block.height, freeArea.height);
                                } else {
                                    block.height = freeArea.height;
                                    // for fitZone;
                                    block.width = Math.min(block.width, freeArea.width);
                                }
                                break;
                            }
                        }
                    }
                    
                    if (block != null) {
                        wall[block.id] = {
                            id: block.id,
                            x: x,
                            y: y,
                            width: block.width,
                            height: block.height,
                            fixSize: block.fixSize
                        };
                        
                        // keep success block for next round;
                        lastBlock = wall[block.id];

                        fillMatrix(lastBlock.id, lastBlock.y, lastBlock.x, lastBlock.width, lastBlock.height);
                        layoutManager.setBlock(lastBlock, setting);
                    } else {
                        // get expect area;
                        var misBlock = {
                            x: x,
                            y: y,
                            fixSize: 0
                        };
                        if (fitWidth) {
                            misBlock.width = freeArea.width;
                            misBlock.height = 0;
                            var lastX = x - 1;
                            var lastY = y;
                            
                            while (matrix[lastY + '-' + lastX]) {
                                matrix[lastY + '-' + x] = true;
                                misBlock.height += 1;
                                lastY += 1;
                            }
                        } else {
                            misBlock.height = freeArea.height;
                            misBlock.width = 0;
                            var lastY = y - 1;
                            var lastX = x;
                            
                            while (matrix[lastY + '-' + lastX]) {
                                matrix[y + '-' + lastX] = true;
                                misBlock.width += 1;
                                lastX += 1;
                            }
                        }
                        setting.onGapFound(layoutManager.setBlock(misBlock, setting), setting);
                    }
                }

            }

            runtime.matrix = matrix;
            runtime.totalRow = maxY;
            runtime.totalCol = maxX;
        }
    };



    window.freewall = function(selector) {
        
        var container = $(selector);
        if (container.css('position') == 'static') {
            container.css('position', 'relative');
        }
        var MAX = Number.MAX_VALUE;
        var klass = this;
        // increase the instance index;
        layoutManager.totalGrid += 1;

        var setting = $.extend({}, layoutManager.defaultConfig);
        var runtime = {
            blocks: {}, // store all items;
            events: {}, // store custome events;
            matrix: {},
            holes: {}, // forbidden zone;
            
            cellW: 0,
            cellH: 0, // unit adjust;
            cellS: 1, // unit scale;
            
            filter: '', // filter selector;
            
            lastId: 0,
            length: 0,

            maxWoB: 0, // max width of block;
            maxHoB: 0,
            minWoB: MAX, 
            minHoB: MAX, // min height of block;

            running: 0, // flag to check layout arranging;

            gutterX: 15, 
            gutterY: 15,

            totalCol: 0,
            totalRow: 0,

            limitCol: 666666, // maximum column; 
            limitRow: 666666,
            
            currentMethod: null,
            currentArguments: []
        };
        setting.runtime = runtime;
        runtime.totalGrid = layoutManager.totalGrid;
        
        // check browser support transition;
        var bodyStyle = document.body.style;
        if (!layoutManager.transition) {
            (bodyStyle.webkitTransition != null ||
            bodyStyle.MozTransition != null ||
            bodyStyle.msTransition != null ||
            bodyStyle.OTransition != null ||
            bodyStyle.transition != null) &&
            (layoutManager.transition = true);
        }
        

        function setDraggable(item) {
            
            var gutterX = runtime.gutterX;
            var gutterY = runtime.gutterY;
            var cellH = runtime.cellH;
            var cellW = runtime.cellW;
            var $item = $(item);
            var handle = $item.find($item.attr("data-handle"));
            layoutManager.setDraggable(item, {
                handle: handle[0],
                onStart: function(event) {
                    if (setting.animate && layoutManager.transition) {
                        layoutManager.setTransition(this, "");
                    }
                    $item.css('z-index', 9999).addClass('fw-float');
                },
                onDrag: function(evt, tracker) {
                    var position = $item.position();
                    var top = Math.round(position.top / cellH);
                    var left = Math.round(position.left / cellW);
                    var width = Math.round($item.width() / cellW);
                    var height = Math.round($item.height() / cellH);
                    top = Math.min(Math.max(0, top), runtime.limitRow - height);
                    left = Math.min(Math.max(0, left), runtime.limitCol - width);
                    klass.setHoles({top: top, left: left, width: width, height: height});
                    klass.refresh();
                },
                onDrop: function() {
                    var position = $item.position();
                    var top = Math.round(position.top / cellH);
                    var left = Math.round(position.left / cellW);
                    var width = Math.round($item.width() / cellW);
                    var height = Math.round($item.height() / cellH);
                    top = Math.min(Math.max(0, top), runtime.limitRow - height);
                    left = Math.min(Math.max(0, left), runtime.limitCol - width);

                    $item.removeClass('fw-float');
                    $item.css({
                        zIndex: "auto",
                        top: top * cellH,
                        left: left * cellW
                    });
                    
                    //check old drag element;
                    var x, y, key, oldDropId;
                    for (y = 0; y < height; ++y) {
                        for (x = 0; x < width; ++x) {
                            key = (y + top) + "-" + (x + left);
                            oldDropId = runtime.matrix[key];
                            if (oldDropId && oldDropId != true) {
                                $("#" + oldDropId).removeAttr("data-position");
                            }
                        }
                    }
                    
                    runtime.holes = {};
                    
                    $item.attr({
                        "data-width": $item.width(),
                        "data-height": $item.height(),
                        "data-position": top + "-" + left
                    });

                    klass.refresh();
                }
            });
        }
        

        $.extend(klass, {
            
            addCustomEvent: function(name, func) {
                var events = runtime.events;
                name = name.toLowerCase();
                !events[name] && (events[name] = []);
                func.eid = events[name].length;
                events[name].push(func);
                return this;
            },

            appendBlock: function(items) {
                var allBlock = $(items).appendTo(container);
                var block = null;
                var activeBlock = [];
                
                if (runtime.currentMethod) {
                    allBlock.each(function(index, item) {
                        item.index = ++index;
                        if (block = layoutManager.loadBlock(item, setting)) {
                            activeBlock.push(block);
                        }
                    });
                
                    engine[setting.engine](activeBlock, setting);
                    
                    layoutManager.setWallSize(runtime, container);
                    
                    runtime.length = allBlock.length;

                    allBlock.each(function(index, item) {
                        layoutManager.showBlock(item, setting);
                        if (setting.draggable || item.getAttribute('data-draggable')) {
                            setDraggable(item);
                        }
                    });
                }
            },
            /*
            add one or more blank area (hole) on layout;
            example:
                
                wall.appendHoles({
                    top: 10,
                    left: 36,
                    width: 2,
                    height: 6
                });

                wall.appendHoles([
                    {
                        top: 16,
                        left: 16,
                        width: 8,
                        height: 2
                    },
                    {
                        top: 10,
                        left: 36,
                        width: 2,
                        height: 6
                    }
                ]);

            */
            appendHoles: function(holes) {
                var newHoles = [].concat(holes), h = {}, i;
                for (i = 0; i < newHoles.length; ++i) {
                    h = newHoles[i];
                    runtime.holes[h.top + "-" + h.left + "-" + h.width + "-" + h.height] = h;
                }
                return this;
            },

            container: container,

            destroy: function() {
                var allBlock = container.find(setting.selector).removeAttr('id'),
                    block = null,
                    activeBlock = [];

                allBlock.each(function(index, item) {
                    $item = $(item);
                    var width = 1 * $item.attr('data-width') || "";
                    var height = 1 * $item.attr('data-height') || "";
                    $item.width(width).height(height).css({
                        position: 'static'
                    });
                });
            },

            fillHoles: function(holes) {
                if (arguments.length == 0) {
                    runtime.holes = {};
                } else {
                    var newHoles = [].concat(holes), h = {}, i;
                    for (i = 0; i < newHoles.length; ++i) {
                        h = newHoles[i];
                        delete runtime.holes[h.top + "-" + h.left + "-" + h.width + "-" + h.height];
                    }
                }
                return this;
            },

            filter: function(filter) {
                runtime.filter = filter;
                runtime.currentMethod && this.refresh();
                return this;
            },

            fireEvent: function(name, object, setting) {
                var events = runtime.events;
                name = name.toLowerCase();
                if (events[name] && events[name].length) {
                    for (var i = 0; i < events[name].length; ++i) {
                        events[name][i].call(this, object, setting);
                    }
                }
                return this;
            },

            fitHeight: function(height) {
                var allBlock = container.find(setting.selector).removeAttr('id'),
                    block = null,
                    activeBlock = [];

                height = height ? height : container.height() || $W.height();
                
                runtime.currentMethod = arguments.callee;
                runtime.currentArguments = arguments;
                
                layoutManager.resetGrid(runtime);
                layoutManager.adjustUnit('auto', height, setting);
                
                if (runtime.filter) {
                    allBlock.data('active', 0);
                    allBlock.filter(runtime.filter).data('active', 1);
                } else {
                    allBlock.data('active', 1);
                }

                allBlock.each(function(index, item) {
                    var $item = $(item);
                    item.index = ++index;
                    if (block = layoutManager.loadBlock(item, setting)) {
                        $item.data("active") && activeBlock.push(block);
                    }
                });
                
                klass.fireEvent('onGridReady', container, setting);

                engine[setting.engine](activeBlock, setting);
                
                layoutManager.setWallSize(runtime, container);

                klass.fireEvent('onGridArrange', container, setting);

                runtime.length = allBlock.length;

                allBlock.each(function(index, item) {
                    layoutManager.showBlock(item, setting);
                    if (setting.draggable || item.getAttribute('data-draggable')) {
                        setDraggable(item);
                    }
                });
            },

            fitWidth: function(width) {
                var allBlock = container.find(setting.selector).removeAttr('id'),
                    block = null,
                    activeBlock = [];

                width = width ? width : container.width() || $W.width();

                runtime.currentMethod = arguments.callee;
                runtime.currentArguments = arguments;
                
                layoutManager.resetGrid(runtime);
                layoutManager.adjustUnit(width, 'auto', setting);
                
                if (runtime.filter) {
                    allBlock.data('active', 0);
                    allBlock.filter(runtime.filter).data('active', 1);
                } else {
                    allBlock.data('active', 1);
                }
                
                allBlock.each(function(index, item) {
                    var $item = $(item);
                    item.index = ++index;
                    if (block = layoutManager.loadBlock(item, setting)) {
                        $item.data("active") && activeBlock.push(block);
                    }
                });
                
                klass.fireEvent('onGridReady', container, setting);
                
                engine[setting.engine](activeBlock, setting);

                layoutManager.setWallSize(runtime, container);
                
                klass.fireEvent('onGridArrange', container, setting);

                runtime.length = allBlock.length;

                allBlock.each(function(index, item) {
                    layoutManager.showBlock(item, setting);
                    if (setting.draggable || item.getAttribute('data-draggable')) {
                        setDraggable(item);
                    }
                });
            },

            fitZone: function(width, height) {
                var allBlock = container.find(setting.selector).removeAttr('id'),
                    block = null,
                    activeBlock = [];

                height = height ? height : container.height() || $W.height();
                width = width ? width : container.width() || $W.width();
                
                runtime.currentMethod = arguments.callee;
                runtime.currentArguments = arguments;
                
                layoutManager.resetGrid(runtime);
                layoutManager.adjustUnit(width, height, setting);

                if (runtime.filter) {
                    allBlock.data('active', 0);
                    allBlock.filter(runtime.filter).data('active', 1);
                } else {
                    allBlock.data('active', 1);
                }
                
                allBlock.each(function(index, item) {
                    var $item = $(item);
                    item.index = ++index;
                    if (block = layoutManager.loadBlock(item, setting)) {
                        $item.data("active") && activeBlock.push(block);
                    }
                });

                klass.fireEvent('onGridReady', container, setting);

                engine[setting.engine](activeBlock, setting);
                
                layoutManager.setWallSize(runtime, container);
                
                klass.fireEvent('onGridArrange', container, setting);

                runtime.length = allBlock.length;
               
                allBlock.each(function(index, item) {
                    layoutManager.showBlock(item, setting);
                    if (setting.draggable || item.getAttribute('data-draggable')) {
                        setDraggable(item);
                    }
                });
            },

            /*
            set block with special position, the top and left are multiple of unit width/height;
            example:

                wall.fixPos({
                    top: 0,
                    left: 0,
                    block: $('.free')
                });
            */
            fixPos: function(option) {
                $(option.block).attr({'data-position': option.top + "-" + option.left});
                return this;
            },

            /*
            set block with special size, the width and height are multiple of unit width/height;
            example:

                wall.fixSize({
                    height: 5,
                    width: 2,
                    block: $('.free')
                });
            */
            fixSize: function(option) {
                option.height != null && $(option.block).attr({'data-height': option.height});
                option.width != null && $(option.block).attr({'data-width': option.width});
                return this;
            },

            prepend: function(items) {
                container.prepend(items);
                runtime.currentMethod && this.refresh();
                return this;
            },

            refresh: function() {
                var params = arguments.length ? arguments : runtime.currentArguments;
                runtime.currentMethod == null && (runtime.currentMethod = this.fitWidth);
                runtime.currentMethod.apply(this, Array.prototype.slice.call(params, 0));
                return this;
            },

            /*
            custom layout setting;
            example:

                wall.reset({
                    selector: '.brick',
                    animate: true,
                    cellW: 160,
                    cellH: 160,
                    delay: 50,
                    onResize: function() {
                        wall.fitWidth();
                    }
                });
            */
            reset: function(option) {
                $.extend(setting, option);
                return this;
            },
            
            /*
            create one or more blank area (hole) on layout;
            example:
                
                wall.setHoles({
                    top: 2,
                    left: 2,
                    width: 2,
                    height: 2
                });
            */
            
            setHoles: function(holes) {
                var newHoles = [].concat(holes), h = {}, i;
                runtime.holes = {};
                for (i = 0; i < newHoles.length; ++i) {
                    h = newHoles[i];
                    runtime.holes[h.top + "-" + h.left + "-" + h.width + "-" + h.height] = h;
                }
                return this;
            },

            unFilter: function() {
                delete runtime.filter;
                this.refresh();
                return this;
            }
        });
        
        container.attr('data-min-width', Math.floor($W.width() / 80) * 80);
        // execute plugins;
        for (var i in layoutManager.plugin) {
            if (layoutManager.plugin.hasOwnProperty(i)) {
                layoutManager.plugin[i].call(klass, setting, container);
            }
        }

        // setup resize event;
        $W.resize(function() {
            if (runtime.running) return;
            runtime.running = 1;
            setTimeout(function() {
                runtime.running = 0;
                setting.onResize.call(klass, container);
            }, 122);
            container.attr('data-min-width', Math.floor($W.width() / 80) * 80);
        });
    };

    /*
    add default setting;
    example:

        freewall.addConfig({
            offsetLeft: 0
        });
    */
    freewall.addConfig = function(newConfig) {
        // add default setting;
        $.extend(layoutManager.defaultConfig, newConfig);    
    };
    

    /*
    support create new arrange algorithm;
    example:

        freewall.createEngine({
            slice: function(items, setting) {
                // slice engine;
            }
        });
    */
    freewall.createEngine = function(engineData) {
        // create new engine;
        $.extend(engine, engineData);
    };
    
    /*
    support create new plugin;
    example:
        
        freewall.createPlugin({
            centering: function(setting, container) {
                console.log(this);
                console.log(setting);
            }
        })l
    */
    freewall.createPlugin = function(pluginData) {
        // register new plugin;
        $.extend(layoutManager.plugin, pluginData);
    };

    /*
    support access helper function;
    example:

        freewall.getMethod('setBlock')(block, setting);
    */
    freewall.getMethod = function(method) {
        // get helper method;
        return layoutManager[method];
    };
 
})(window.Zepto || window.jQuery);
;/*
	ractive.js v0.6.0
	2014-10-08 - commit 150e82d0 

	http://ractivejs.org
	http://twitter.com/RactiveJS

	Released under the MIT License.
*/

( function( global ) {

	'use strict';

	var noConflict = global.Ractive;

	/* config/defaults/options.js */
	var options = function() {

		var defaultOptions = {
			// render placement:
			el: void 0,
			append: false,
			// template:
			template: {
				v: 1,
				t: []
			},
			yield: null,
			// parse:
			preserveWhitespace: false,
			sanitize: false,
			stripComments: true,
			// data & binding:
			data: {},
			computed: {},
			magic: false,
			modifyArrays: true,
			adapt: [],
			isolated: false,
			twoway: true,
			lazy: false,
			// transitions:
			noIntro: false,
			transitionsEnabled: true,
			complete: void 0,
			// css:
			noCssTransform: false,
			// debug:
			debug: false
		};
		return defaultOptions;
	}();

	/* config/defaults/easing.js */
	var easing = {
		linear: function( pos ) {
			return pos;
		},
		easeIn: function( pos ) {
			return Math.pow( pos, 3 );
		},
		easeOut: function( pos ) {
			return Math.pow( pos - 1, 3 ) + 1;
		},
		easeInOut: function( pos ) {
			if ( ( pos /= 0.5 ) < 1 ) {
				return 0.5 * Math.pow( pos, 3 );
			}
			return 0.5 * ( Math.pow( pos - 2, 3 ) + 2 );
		}
	};

	/* circular.js */
	var circular = [];

	/* utils/hasOwnProperty.js */
	var hasOwn = Object.prototype.hasOwnProperty;

	/* utils/isArray.js */
	var isArray = function() {

		var toString = Object.prototype.toString;
		// thanks, http://perfectionkills.com/instanceof-considered-harmful-or-how-to-write-a-robust-isarray/
		return function( thing ) {
			return toString.call( thing ) === '[object Array]';
		};
	}();

	/* utils/isObject.js */
	var isObject = function() {

		var toString = Object.prototype.toString;
		return function( thing ) {
			return thing && toString.call( thing ) === '[object Object]';
		};
	}();

	/* utils/isNumeric.js */
	var isNumeric = function( thing ) {
		return !isNaN( parseFloat( thing ) ) && isFinite( thing );
	};

	/* config/defaults/interpolators.js */
	var interpolators = function( circular, hasOwnProperty, isArray, isObject, isNumeric ) {

		var interpolators, interpolate, cssLengthPattern;
		circular.push( function() {
			interpolate = circular.interpolate;
		} );
		cssLengthPattern = /^([+-]?[0-9]+\.?(?:[0-9]+)?)(px|em|ex|%|in|cm|mm|pt|pc)$/;
		interpolators = {
			number: function( from, to ) {
				var delta;
				if ( !isNumeric( from ) || !isNumeric( to ) ) {
					return null;
				}
				from = +from;
				to = +to;
				delta = to - from;
				if ( !delta ) {
					return function() {
						return from;
					};
				}
				return function( t ) {
					return from + t * delta;
				};
			},
			array: function( from, to ) {
				var intermediate, interpolators, len, i;
				if ( !isArray( from ) || !isArray( to ) ) {
					return null;
				}
				intermediate = [];
				interpolators = [];
				i = len = Math.min( from.length, to.length );
				while ( i-- ) {
					interpolators[ i ] = interpolate( from[ i ], to[ i ] );
				}
				// surplus values - don't interpolate, but don't exclude them either
				for ( i = len; i < from.length; i += 1 ) {
					intermediate[ i ] = from[ i ];
				}
				for ( i = len; i < to.length; i += 1 ) {
					intermediate[ i ] = to[ i ];
				}
				return function( t ) {
					var i = len;
					while ( i-- ) {
						intermediate[ i ] = interpolators[ i ]( t );
					}
					return intermediate;
				};
			},
			object: function( from, to ) {
				var properties, len, interpolators, intermediate, prop;
				if ( !isObject( from ) || !isObject( to ) ) {
					return null;
				}
				properties = [];
				intermediate = {};
				interpolators = {};
				for ( prop in from ) {
					if ( hasOwnProperty.call( from, prop ) ) {
						if ( hasOwnProperty.call( to, prop ) ) {
							properties.push( prop );
							interpolators[ prop ] = interpolate( from[ prop ], to[ prop ] );
						} else {
							intermediate[ prop ] = from[ prop ];
						}
					}
				}
				for ( prop in to ) {
					if ( hasOwnProperty.call( to, prop ) && !hasOwnProperty.call( from, prop ) ) {
						intermediate[ prop ] = to[ prop ];
					}
				}
				len = properties.length;
				return function( t ) {
					var i = len,
						prop;
					while ( i-- ) {
						prop = properties[ i ];
						intermediate[ prop ] = interpolators[ prop ]( t );
					}
					return intermediate;
				};
			}
		};
		return interpolators;
	}( circular, hasOwn, isArray, isObject, isNumeric );

	/* config/svg.js */
	var svg = function() {

		var svg;
		if ( typeof document === 'undefined' ) {
			svg = false;
		} else {
			svg = document && document.implementation.hasFeature( 'http://www.w3.org/TR/SVG11/feature#BasicStructure', '1.1' );
		}
		return svg;
	}();

	/* utils/warn.js */
	var warn = function() {

		/* global console */
		var warn, warned = {};
		if ( typeof console !== 'undefined' && typeof console.warn === 'function' && typeof console.warn.apply === 'function' ) {
			warn = function( message, allowDuplicates ) {
				if ( !allowDuplicates ) {
					if ( warned[ message ] ) {
						return;
					}
					warned[ message ] = true;
				}
				console.warn( message );
			};
		} else {
			warn = function() {};
		}
		return warn;
	}();

	/* config/errors.js */
	var errors = {
		missingParser: 'Missing Ractive.parse - cannot parse template. Either preparse or use the version that includes the parser',
		mergeComparisonFail: 'Merge operation: comparison failed. Falling back to identity checking',
		noComponentEventArguments: 'Components currently only support simple events - you cannot include arguments. Sorry!',
		noTemplateForPartial: 'Could not find template for partial "{name}"',
		noNestedPartials: 'Partials ({{>{name}}}) cannot contain nested inline partials',
		evaluationError: 'Error evaluating "{uniqueString}": {err}',
		badArguments: 'Bad arguments "{arguments}". I\'m not allowed to argue unless you\'ve paid.',
		failedComputation: 'Failed to compute "{key}": {err}',
		missingPlugin: 'Missing "{name}" {plugin} plugin. You may need to download a {plugin} via http://docs.ractivejs.org/latest/plugins#{plugin}s',
		badRadioInputBinding: 'A radio input can have two-way binding on its name attribute, or its checked attribute - not both',
		noRegistryFunctionReturn: 'A function was specified for "{name}" {registry}, but no {registry} was returned',
		defaultElSpecified: 'The <{name}/> component has a default `el` property; it has been disregarded',
		noElementProxyEventWildcards: 'Only component proxy-events may contain "*" wildcards, <{element} on-{event}/> is not valid.',
		methodDepricated: 'The method "{depricated}" has been depricated in favor of "{replacement}" and will likely be removed in a future release.'
	};

	/* utils/log.js */
	var log = function( consolewarn, errors ) {

		var log = {
			warn: function( options, passthru ) {
				if ( !options.debug && !passthru ) {
					return;
				}
				this.logger( getMessage( options ), options.allowDuplicates );
			},
			error: function( options ) {
				this.errorOnly( options );
				if ( !options.debug ) {
					this.warn( options, true );
				}
			},
			errorOnly: function( options ) {
				if ( options.debug ) {
					this.critical( options );
				}
			},
			critical: function( options ) {
				var err = options.err || new Error( getMessage( options ) );
				this.thrower( err );
			},
			logger: consolewarn,
			thrower: function( err ) {
				throw err;
			}
		};

		function getMessage( options ) {
			var message = errors[ options.message ] || options.message || '';
			return interpolate( message, options.args );
		}
		// simple interpolation. probably quicker (and better) out there,
		// but log is not in golden path of execution, only exceptions
		function interpolate( message, args ) {
			return message.replace( /{([^{}]*)}/g, function( a, b ) {
				return args[ b ];
			} );
		}
		return log;
	}( warn, errors );

	/* Ractive/prototype/shared/hooks/Hook.js */
	var Ractive$shared_hooks_Hook = function( log ) {

		var deprications = {
			construct: {
				depricated: 'beforeInit',
				replacement: 'onconstruct'
			},
			render: {
				depricated: 'init',
				replacement: 'onrender'
			},
			complete: {
				depricated: 'complete',
				replacement: 'oncomplete'
			}
		};

		function Hook( event ) {
			this.event = event;
			this.method = 'on' + event;
			this.depricate = deprications[ event ];
		}
		Hook.prototype.fire = function( ractive, arg ) {
			function call( method ) {
				if ( ractive[ method ] ) {
					arg ? ractive[ method ]( arg ) : ractive[ method ]();
					return true;
				}
			}
			call( this.method );
			if ( this.depricate && call( this.depricate.depricated ) ) {
				log.warn( {
					debug: ractive.debug,
					message: 'methodDepricated',
					args: this.depricate
				} );
			}
			arg ? ractive.fire( this.event, arg ) : ractive.fire( this.event );
		};
		return Hook;
	}( log );

	/* utils/removeFromArray.js */
	var removeFromArray = function( array, member ) {
		var index = array.indexOf( member );
		if ( index !== -1 ) {
			array.splice( index, 1 );
		}
	};

	/* utils/Promise.js */
	var Promise = function() {

		var __export;
		var _Promise, PENDING = {},
			FULFILLED = {},
			REJECTED = {};
		if ( typeof Promise === 'function' ) {
			// use native Promise
			_Promise = Promise;
		} else {
			_Promise = function( callback ) {
				var fulfilledHandlers = [],
					rejectedHandlers = [],
					state = PENDING,
					result, dispatchHandlers, makeResolver, fulfil, reject, promise;
				makeResolver = function( newState ) {
					return function( value ) {
						if ( state !== PENDING ) {
							return;
						}
						result = value;
						state = newState;
						dispatchHandlers = makeDispatcher( state === FULFILLED ? fulfilledHandlers : rejectedHandlers, result );
						// dispatch onFulfilled and onRejected handlers asynchronously
						wait( dispatchHandlers );
					};
				};
				fulfil = makeResolver( FULFILLED );
				reject = makeResolver( REJECTED );
				try {
					callback( fulfil, reject );
				} catch ( err ) {
					reject( err );
				}
				promise = {
					// `then()` returns a Promise - 2.2.7
					then: function( onFulfilled, onRejected ) {
						var promise2 = new _Promise( function( fulfil, reject ) {
							var processResolutionHandler = function( handler, handlers, forward ) {
								// 2.2.1.1
								if ( typeof handler === 'function' ) {
									handlers.push( function( p1result ) {
										var x;
										try {
											x = handler( p1result );
											resolve( promise2, x, fulfil, reject );
										} catch ( err ) {
											reject( err );
										}
									} );
								} else {
									// Forward the result of promise1 to promise2, if resolution handlers
									// are not given
									handlers.push( forward );
								}
							};
							// 2.2
							processResolutionHandler( onFulfilled, fulfilledHandlers, fulfil );
							processResolutionHandler( onRejected, rejectedHandlers, reject );
							if ( state !== PENDING ) {
								// If the promise has resolved already, dispatch the appropriate handlers asynchronously
								wait( dispatchHandlers );
							}
						} );
						return promise2;
					}
				};
				promise[ 'catch' ] = function( onRejected ) {
					return this.then( null, onRejected );
				};
				return promise;
			};
			_Promise.all = function( promises ) {
				return new _Promise( function( fulfil, reject ) {
					var result = [],
						pending, i, processPromise;
					if ( !promises.length ) {
						fulfil( result );
						return;
					}
					processPromise = function( i ) {
						promises[ i ].then( function( value ) {
							result[ i ] = value;
							if ( !--pending ) {
								fulfil( result );
							}
						}, reject );
					};
					pending = i = promises.length;
					while ( i-- ) {
						processPromise( i );
					}
				} );
			};
			_Promise.resolve = function( value ) {
				return new _Promise( function( fulfil ) {
					fulfil( value );
				} );
			};
			_Promise.reject = function( reason ) {
				return new _Promise( function( fulfil, reject ) {
					reject( reason );
				} );
			};
		}
		__export = _Promise;
		// TODO use MutationObservers or something to simulate setImmediate
		function wait( callback ) {
			setTimeout( callback, 0 );
		}

		function makeDispatcher( handlers, result ) {
			return function() {
				var handler;
				while ( handler = handlers.shift() ) {
					handler( result );
				}
			};
		}

		function resolve( promise, x, fulfil, reject ) {
			// Promise Resolution Procedure
			var then;
			// 2.3.1
			if ( x === promise ) {
				throw new TypeError( 'A promise\'s fulfillment handler cannot return the same promise' );
			}
			// 2.3.2
			if ( x instanceof _Promise ) {
				x.then( fulfil, reject );
			} else if ( x && ( typeof x === 'object' || typeof x === 'function' ) ) {
				try {
					then = x.then;
				} catch ( e ) {
					reject( e );
					// 2.3.3.2
					return;
				}
				// 2.3.3.3
				if ( typeof then === 'function' ) {
					var called, resolvePromise, rejectPromise;
					resolvePromise = function( y ) {
						if ( called ) {
							return;
						}
						called = true;
						resolve( promise, y, fulfil, reject );
					};
					rejectPromise = function( r ) {
						if ( called ) {
							return;
						}
						called = true;
						reject( r );
					};
					try {
						then.call( x, resolvePromise, rejectPromise );
					} catch ( e ) {
						if ( !called ) {
							// 2.3.3.3.4.1
							reject( e );
							// 2.3.3.3.4.2
							called = true;
							return;
						}
					}
				} else {
					fulfil( x );
				}
			} else {
				fulfil( x );
			}
		}
		return __export;
	}();

	/* utils/normaliseRef.js */
	var normaliseRef = function() {

		var regex = /\[\s*(\*|[0-9]|[1-9][0-9]+)\s*\]/g;
		return function normaliseRef( ref ) {
			return ( ref || '' ).replace( regex, '.$1' );
		};
	}();

	/* shared/getInnerContext.js */
	var getInnerContext = function( fragment ) {
		do {
			if ( fragment.context !== undefined ) {
				return fragment.context;
			}
		} while ( fragment = fragment.parent );
		return '';
	};

	/* utils/isEqual.js */
	var isEqual = function( a, b ) {
		if ( a === null && b === null ) {
			return true;
		}
		if ( typeof a === 'object' || typeof b === 'object' ) {
			return false;
		}
		return a === b;
	};

	/* shared/createComponentBinding.js */
	var createComponentBinding = function( circular, isEqual ) {

		var runloop;
		circular.push( function() {
			return runloop = circular.runloop;
		} );
		var Binding = function( ractive, keypath, otherInstance, otherKeypath ) {
			var this$0 = this;
			this.root = ractive;
			this.keypath = keypath;
			this.otherInstance = otherInstance;
			this.otherKeypath = otherKeypath;
			this.unlock = function() {
				return this$0.updating = false;
			};
			this.bind();
			this.value = this.root.viewmodel.get( this.keypath );
		};
		Binding.prototype = {
			shuffle: function( newIndices, value ) {
				this.propagateChange( value, newIndices );
			},
			setValue: function( value ) {
				this.propagateChange( value );
			},
			propagateChange: function( value, newIndices ) {
				// Only *you* can prevent infinite loops
				if ( this.updating || this.counterpart && this.counterpart.updating ) {
					this.value = value;
					return;
				}
				if ( !isEqual( value, this.value ) ) {
					this.updating = true;
					// TODO maybe the case that `value === this.value` - should that result
					// in an update rather than a set?
					runloop.addViewmodel( this.otherInstance.viewmodel );
					if ( newIndices ) {
						this.otherInstance.viewmodel.smartUpdate( this.otherKeypath, value, newIndices );
					} else {
						this.otherInstance.viewmodel.set( this.otherKeypath, value );
					}
					this.value = value;
					// TODO will the counterpart update after this line, during
					// the runloop end cycle? may be a problem...
					runloop.scheduleTask( this.unlock );
				}
			},
			bind: function() {
				this.root.viewmodel.register( this.keypath, this );
			},
			rebind: function( newKeypath ) {
				this.unbind();
				this.keypath = newKeypath;
				this.counterpart.otherKeypath = newKeypath;
				this.bind();
			},
			unbind: function() {
				this.root.viewmodel.unregister( this.keypath, this );
			}
		};
		return function createComponentBinding( component, parentInstance, parentKeypath, childKeypath ) {
			var hash, childInstance, bindings, parentToChildBinding, childToParentBinding;
			hash = parentKeypath + '=' + childKeypath;
			bindings = component.bindings;
			if ( bindings[ hash ] ) {
				// TODO does this ever happen?
				return;
			}
			childInstance = component.instance;
			parentToChildBinding = new Binding( parentInstance, parentKeypath, childInstance, childKeypath );
			bindings.push( parentToChildBinding );
			if ( childInstance.twoway ) {
				childToParentBinding = new Binding( childInstance, childKeypath, parentInstance, parentKeypath );
				bindings.push( childToParentBinding );
				parentToChildBinding.counterpart = childToParentBinding;
				childToParentBinding.counterpart = parentToChildBinding;
			}
			bindings[ hash ] = parentToChildBinding;
		};
	}( circular, isEqual );

	/* shared/resolveRef.js */
	var resolveRef = function( normaliseRef, getInnerContext, createComponentBinding ) {

		var __export;
		var ancestorErrorMessage, getOptions;
		ancestorErrorMessage = 'Could not resolve reference - too many "../" prefixes';
		getOptions = {
			evaluateWrapped: true
		};
		__export = function resolveRef( ractive, ref, fragment, isParentLookup ) {
			var context, key, index, keypath, parentValue, hasContextChain, parentKeys, childKeys, parentKeypath, childKeypath;
			ref = normaliseRef( ref );
			// If a reference begins '~/', it's a top-level reference
			if ( ref.substr( 0, 2 ) === '~/' ) {
				return ref.substring( 2 );
			}
			// If a reference begins with '.', it's either a restricted reference or
			// an ancestor reference...
			if ( ref.charAt( 0 ) === '.' ) {
				return resolveAncestorReference( getInnerContext( fragment ), ref );
			}
			// ...otherwise we need to find the keypath
			key = ref.split( '.' )[ 0 ];
			// get() in viewmodel creation means no fragment (yet)
			fragment = fragment || {};
			do {
				context = fragment.context;
				if ( !context ) {
					continue;
				}
				hasContextChain = true;
				parentValue = ractive.viewmodel.get( context, getOptions );
				if ( parentValue && ( typeof parentValue === 'object' || typeof parentValue === 'function' ) && key in parentValue ) {
					return context + '.' + ref;
				}
			} while ( fragment = fragment.parent );
			// Root/computed property?
			if ( key in ractive.data || key in ractive.viewmodel.computations ) {
				return ref;
			}
			// If this is an inline component, and it's not isolated, we
			// can try going up the scope chain
			if ( ractive._parent && !ractive.isolated ) {
				hasContextChain = true;
				fragment = ractive.component.parentFragment;
				// Special case - index refs
				if ( fragment.indexRefs && ( index = fragment.indexRefs[ ref ] ) !== undefined ) {
					// Create an index ref binding, so that it can be rebound letter if necessary.
					// It doesn't have an alias since it's an implicit binding, hence `...[ ref ] = ref`
					ractive.component.indexRefBindings[ ref ] = ref;
					ractive.viewmodel.set( ref, index, true );
					return;
				}
				keypath = resolveRef( ractive._parent, ref, fragment, true );
				if ( keypath ) {
					// We need to create an inter-component binding
					// If parent keypath is 'one.foo' and child is 'two.foo', we bind
					// 'one' to 'two' as it's more efficient and avoids edge cases
					parentKeys = keypath.split( '.' );
					childKeys = ref.split( '.' );
					while ( parentKeys.length > 1 && childKeys.length > 1 && parentKeys[ parentKeys.length - 1 ] === childKeys[ childKeys.length - 1 ] ) {
						parentKeys.pop();
						childKeys.pop();
					}
					parentKeypath = parentKeys.join( '.' );
					childKeypath = childKeys.join( '.' );
					ractive.viewmodel.set( childKeypath, ractive._parent.viewmodel.get( parentKeypath ), true );
					createComponentBinding( ractive.component, ractive._parent, parentKeypath, childKeypath );
					return ref;
				}
			}
			// If there's no context chain, and the instance is either a) isolated or
			// b) an orphan, then we know that the keypath is identical to the reference
			if ( !isParentLookup && !hasContextChain ) {
				// the data object needs to have a property by this name,
				// to prevent future failed lookups
				ractive.viewmodel.set( ref, undefined );
				return ref;
			}
			if ( ractive.viewmodel.get( ref ) !== undefined ) {
				return ref;
			}
		};

		function resolveAncestorReference( baseContext, ref ) {
			var contextKeys;
			// {{.}} means 'current context'
			if ( ref === '.' )
				return baseContext;
			contextKeys = baseContext ? baseContext.split( '.' ) : [];
			// ancestor references (starting "../") go up the tree
			if ( ref.substr( 0, 3 ) === '../' ) {
				while ( ref.substr( 0, 3 ) === '../' ) {
					if ( !contextKeys.length ) {
						throw new Error( ancestorErrorMessage );
					}
					contextKeys.pop();
					ref = ref.substring( 3 );
				}
				contextKeys.push( ref );
				return contextKeys.join( '.' );
			}
			// not an ancestor reference - must be a restricted reference (prepended with "." or "./")
			if ( !baseContext ) {
				return ref.replace( /^\.\/?/, '' );
			}
			return baseContext + ref.replace( /^\.\//, '.' );
		}
		return __export;
	}( normaliseRef, getInnerContext, createComponentBinding );

	/* global/TransitionManager.js */
	var TransitionManager = function( removeFromArray ) {

		var TransitionManager = function( callback, parent ) {
			this.callback = callback;
			this.parent = parent;
			this.intros = [];
			this.outros = [];
			this.children = [];
			this.totalChildren = this.outroChildren = 0;
			this.detachQueue = [];
			this.outrosComplete = false;
			if ( parent ) {
				parent.addChild( this );
			}
		};
		TransitionManager.prototype = {
			addChild: function( child ) {
				this.children.push( child );
				this.totalChildren += 1;
				this.outroChildren += 1;
			},
			decrementOutros: function() {
				this.outroChildren -= 1;
				check( this );
			},
			decrementTotal: function() {
				this.totalChildren -= 1;
				check( this );
			},
			add: function( transition ) {
				var list = transition.isIntro ? this.intros : this.outros;
				list.push( transition );
			},
			remove: function( transition ) {
				var list = transition.isIntro ? this.intros : this.outros;
				removeFromArray( list, transition );
				check( this );
			},
			init: function() {
				this.ready = true;
				check( this );
			},
			detachNodes: function() {
				this.detachQueue.forEach( detach );
				this.children.forEach( detachNodes );
			}
		};

		function detach( element ) {
			element.detach();
		}

		function detachNodes( tm ) {
			tm.detachNodes();
		}

		function check( tm ) {
			if ( !tm.ready || tm.outros.length || tm.outroChildren )
				return;
			// If all outros are complete, and we haven't already done this,
			// we notify the parent if there is one, otherwise
			// start detaching nodes
			if ( !tm.outrosComplete ) {
				if ( tm.parent ) {
					tm.parent.decrementOutros( tm );
				} else {
					tm.detachNodes();
				}
				tm.outrosComplete = true;
			}
			// Once everything is done, we can notify parent transition
			// manager and call the callback
			if ( !tm.intros.length && !tm.totalChildren ) {
				if ( typeof tm.callback === 'function' ) {
					tm.callback();
				}
				if ( tm.parent ) {
					tm.parent.decrementTotal();
				}
			}
		}
		return TransitionManager;
	}( removeFromArray );

	/* global/runloop.js */
	var runloop = function( circular, Hook, removeFromArray, Promise, resolveRef, TransitionManager ) {

		var __export;
		var batch, runloop, unresolved = [],
			changeHook = new Hook( 'change' );
		runloop = {
			start: function( instance, returnPromise ) {
				var promise, fulfilPromise;
				if ( returnPromise ) {
					promise = new Promise( function( f ) {
						return fulfilPromise = f;
					} );
				}
				batch = {
					previousBatch: batch,
					transitionManager: new TransitionManager( fulfilPromise, batch && batch.transitionManager ),
					views: [],
					tasks: [],
					viewmodels: []
				};
				if ( instance ) {
					batch.viewmodels.push( instance.viewmodel );
				}
				return promise;
			},
			end: function() {
				flushChanges();
				batch.transitionManager.init();
				batch = batch.previousBatch;
			},
			addViewmodel: function( viewmodel ) {
				if ( batch ) {
					if ( batch.viewmodels.indexOf( viewmodel ) === -1 ) {
						batch.viewmodels.push( viewmodel );
					}
				} else {
					viewmodel.applyChanges();
				}
			},
			registerTransition: function( transition ) {
				transition._manager = batch.transitionManager;
				batch.transitionManager.add( transition );
			},
			addView: function( view ) {
				batch.views.push( view );
			},
			addUnresolved: function( thing ) {
				unresolved.push( thing );
			},
			removeUnresolved: function( thing ) {
				removeFromArray( unresolved, thing );
			},
			// synchronise node detachments with transition ends
			detachWhenReady: function( thing ) {
				batch.transitionManager.detachQueue.push( thing );
			},
			scheduleTask: function( task ) {
				if ( !batch ) {
					task();
				} else {
					batch.tasks.push( task );
				}
			}
		};
		circular.runloop = runloop;
		__export = runloop;

		function flushChanges() {
			var i, thing, changeHash;
			for ( i = 0; i < batch.viewmodels.length; i += 1 ) {
				thing = batch.viewmodels[ i ];
				changeHash = thing.applyChanges();
				if ( changeHash ) {
					changeHook.fire( thing.ractive, changeHash );
				}
			}
			batch.viewmodels.length = 0;
			attemptKeypathResolution();
			// Now that changes have been fully propagated, we can update the DOM
			// and complete other tasks
			for ( i = 0; i < batch.views.length; i += 1 ) {
				batch.views[ i ].update();
			}
			batch.views.length = 0;
			for ( i = 0; i < batch.tasks.length; i += 1 ) {
				batch.tasks[ i ]();
			}
			batch.tasks.length = 0;
			// If updating the view caused some model blowback - e.g. a triple
			// containing <option> elements caused the binding on the <select>
			// to update - then we start over
			if ( batch.viewmodels.length )
				return flushChanges();
		}

		function attemptKeypathResolution() {
			var i, item, keypath, resolved;
			i = unresolved.length;
			// see if we can resolve any unresolved references
			while ( i-- ) {
				item = unresolved[ i ];
				if ( item.keypath ) {
					// it resolved some other way. TODO how? two-way binding? Seems
					// weird that we'd still end up here
					unresolved.splice( i, 1 );
				}
				if ( keypath = resolveRef( item.root, item.ref, item.parentFragment ) ) {
					( resolved || ( resolved = [] ) ).push( {
						item: item,
						keypath: keypath
					} );
					unresolved.splice( i, 1 );
				}
			}
			if ( resolved ) {
				resolved.forEach( resolve );
			}
		}

		function resolve( resolved ) {
			resolved.item.resolve( resolved.keypath );
		}
		return __export;
	}( circular, Ractive$shared_hooks_Hook, removeFromArray, Promise, resolveRef, TransitionManager );

	/* utils/createBranch.js */
	var createBranch = function() {

		var numeric = /^\s*[0-9]+\s*$/;
		return function( key ) {
			return numeric.test( key ) ? [] : {};
		};
	}();

	/* viewmodel/prototype/get/magicAdaptor.js */
	var viewmodel$get_magicAdaptor = function( runloop, createBranch, isArray ) {

		var __export;
		var magicAdaptor, MagicWrapper;
		try {
			Object.defineProperty( {}, 'test', {
				value: 0
			} );
			magicAdaptor = {
				filter: function( object, keypath, ractive ) {
					var keys, key, parentKeypath, parentWrapper, parentValue;
					if ( !keypath ) {
						return false;
					}
					keys = keypath.split( '.' );
					key = keys.pop();
					parentKeypath = keys.join( '.' );
					// If the parent value is a wrapper, other than a magic wrapper,
					// we shouldn't wrap this property
					if ( ( parentWrapper = ractive.viewmodel.wrapped[ parentKeypath ] ) && !parentWrapper.magic ) {
						return false;
					}
					parentValue = ractive.get( parentKeypath );
					// if parentValue is an array that doesn't include this member,
					// we should return false otherwise lengths will get messed up
					if ( isArray( parentValue ) && /^[0-9]+$/.test( key ) ) {
						return false;
					}
					return parentValue && ( typeof parentValue === 'object' || typeof parentValue === 'function' );
				},
				wrap: function( ractive, property, keypath ) {
					return new MagicWrapper( ractive, property, keypath );
				}
			};
			MagicWrapper = function( ractive, value, keypath ) {
				var keys, objKeypath, template, siblings;
				this.magic = true;
				this.ractive = ractive;
				this.keypath = keypath;
				this.value = value;
				keys = keypath.split( '.' );
				this.prop = keys.pop();
				objKeypath = keys.join( '.' );
				this.obj = objKeypath ? ractive.get( objKeypath ) : ractive.data;
				template = this.originalDescriptor = Object.getOwnPropertyDescriptor( this.obj, this.prop );
				// Has this property already been wrapped?
				if ( template && template.set && ( siblings = template.set._ractiveWrappers ) ) {
					// Yes. Register this wrapper to this property, if it hasn't been already
					if ( siblings.indexOf( this ) === -1 ) {
						siblings.push( this );
					}
					return;
				}
				// No, it hasn't been wrapped
				createAccessors( this, value, template );
			};
			MagicWrapper.prototype = {
				get: function() {
					return this.value;
				},
				reset: function( value ) {
					if ( this.updating ) {
						return;
					}
					this.updating = true;
					this.obj[ this.prop ] = value;
					// trigger set() accessor
					runloop.addViewmodel( this.ractive.viewmodel );
					this.ractive.viewmodel.mark( this.keypath );
					this.updating = false;
				},
				set: function( key, value ) {
					if ( this.updating ) {
						return;
					}
					if ( !this.obj[ this.prop ] ) {
						this.updating = true;
						this.obj[ this.prop ] = createBranch( key );
						this.updating = false;
					}
					this.obj[ this.prop ][ key ] = value;
				},
				teardown: function() {
					var template, set, value, wrappers, index;
					// If this method was called because the cache was being cleared as a
					// result of a set()/update() call made by this wrapper, we return false
					// so that it doesn't get torn down
					if ( this.updating ) {
						return false;
					}
					template = Object.getOwnPropertyDescriptor( this.obj, this.prop );
					set = template && template.set;
					if ( !set ) {
						// most likely, this was an array member that was spliced out
						return;
					}
					wrappers = set._ractiveWrappers;
					index = wrappers.indexOf( this );
					if ( index !== -1 ) {
						wrappers.splice( index, 1 );
					}
					// Last one out, turn off the lights
					if ( !wrappers.length ) {
						value = this.obj[ this.prop ];
						Object.defineProperty( this.obj, this.prop, this.originalDescriptor || {
							writable: true,
							enumerable: true,
							configurable: true
						} );
						this.obj[ this.prop ] = value;
					}
				}
			};
		} catch ( err ) {
			magicAdaptor = false;
		}
		__export = magicAdaptor;

		function createAccessors( originalWrapper, value, template ) {
			var object, property, oldGet, oldSet, get, set;
			object = originalWrapper.obj;
			property = originalWrapper.prop;
			// Is this template configurable?
			if ( template && !template.configurable ) {
				// Special case - array length
				if ( property === 'length' ) {
					return;
				}
				throw new Error( 'Cannot use magic mode with property "' + property + '" - object is not configurable' );
			}
			// Time to wrap this property
			if ( template ) {
				oldGet = template.get;
				oldSet = template.set;
			}
			get = oldGet || function() {
				return value;
			};
			set = function( v ) {
				if ( oldSet ) {
					oldSet( v );
				}
				value = oldGet ? oldGet() : v;
				set._ractiveWrappers.forEach( updateWrapper );
			};

			function updateWrapper( wrapper ) {
				var keypath, ractive;
				wrapper.value = value;
				if ( wrapper.updating ) {
					return;
				}
				ractive = wrapper.ractive;
				keypath = wrapper.keypath;
				wrapper.updating = true;
				runloop.start( ractive );
				ractive.viewmodel.mark( keypath );
				runloop.end();
				wrapper.updating = false;
			}
			// Create an array of wrappers, in case other keypaths/ractives depend on this property.
			// Handily, we can store them as a property of the set function. Yay JavaScript.
			set._ractiveWrappers = [ originalWrapper ];
			Object.defineProperty( object, property, {
				get: get,
				set: set,
				enumerable: true,
				configurable: true
			} );
		}
		return __export;
	}( runloop, createBranch, isArray );

	/* config/magic.js */
	var magic = function( magicAdaptor ) {

		return !!magicAdaptor;
	}( viewmodel$get_magicAdaptor );

	/* config/namespaces.js */
	var namespaces = {
		html: 'http://www.w3.org/1999/xhtml',
		mathml: 'http://www.w3.org/1998/Math/MathML',
		svg: 'http://www.w3.org/2000/svg',
		xlink: 'http://www.w3.org/1999/xlink',
		xml: 'http://www.w3.org/XML/1998/namespace',
		xmlns: 'http://www.w3.org/2000/xmlns/'
	};

	/* utils/createElement.js */
	var createElement = function( svg, namespaces ) {

		var createElement;
		// Test for SVG support
		if ( !svg ) {
			createElement = function( type, ns ) {
				if ( ns && ns !== namespaces.html ) {
					throw 'This browser does not support namespaces other than http://www.w3.org/1999/xhtml. The most likely cause of this error is that you\'re trying to render SVG in an older browser. See http://docs.ractivejs.org/latest/svg-and-older-browsers for more information';
				}
				return document.createElement( type );
			};
		} else {
			createElement = function( type, ns ) {
				if ( !ns || ns === namespaces.html ) {
					return document.createElement( type );
				}
				return document.createElementNS( ns, type );
			};
		}
		return createElement;
	}( svg, namespaces );

	/* config/isClient.js */
	var isClient = function() {

		var isClient = typeof document === 'object';
		return isClient;
	}();

	/* utils/defineProperty.js */
	var defineProperty = function( isClient ) {

		var defineProperty;
		try {
			Object.defineProperty( {}, 'test', {
				value: 0
			} );
			if ( isClient ) {
				Object.defineProperty( document.createElement( 'div' ), 'test', {
					value: 0
				} );
			}
			defineProperty = Object.defineProperty;
		} catch ( err ) {
			// Object.defineProperty doesn't exist, or we're in IE8 where you can
			// only use it with DOM objects (what the fuck were you smoking, MSFT?)
			defineProperty = function( obj, prop, desc ) {
				obj[ prop ] = desc.value;
			};
		}
		return defineProperty;
	}( isClient );

	/* utils/defineProperties.js */
	var defineProperties = function( createElement, defineProperty, isClient ) {

		var defineProperties;
		try {
			try {
				Object.defineProperties( {}, {
					test: {
						value: 0
					}
				} );
			} catch ( err ) {
				// TODO how do we account for this? noMagic = true;
				throw err;
			}
			if ( isClient ) {
				Object.defineProperties( createElement( 'div' ), {
					test: {
						value: 0
					}
				} );
			}
			defineProperties = Object.defineProperties;
		} catch ( err ) {
			defineProperties = function( obj, props ) {
				var prop;
				for ( prop in props ) {
					if ( props.hasOwnProperty( prop ) ) {
						defineProperty( obj, prop, props[ prop ] );
					}
				}
			};
		}
		return defineProperties;
	}( createElement, defineProperty, isClient );

	/* Ractive/prototype/shared/add.js */
	var Ractive$shared_add = function( isNumeric ) {

		return function add( root, keypath, d ) {
			var value;
			if ( typeof keypath !== 'string' || !isNumeric( d ) ) {
				throw new Error( 'Bad arguments' );
			}
			value = +root.get( keypath ) || 0;
			if ( !isNumeric( value ) ) {
				throw new Error( 'Cannot add to a non-numeric value' );
			}
			return root.set( keypath, value + d );
		};
	}( isNumeric );

	/* Ractive/prototype/add.js */
	var Ractive$add = function( add ) {

		return function Ractive$add( keypath, d ) {
			return add( this, keypath, d === undefined ? 1 : +d );
		};
	}( Ractive$shared_add );

	/* utils/normaliseKeypath.js */
	var normaliseKeypath = function( normaliseRef ) {

		var leadingDot = /^\.+/;
		return function normaliseKeypath( keypath ) {
			return normaliseRef( keypath ).replace( leadingDot, '' );
		};
	}( normaliseRef );

	/* config/vendors.js */
	var vendors = [
		'o',
		'ms',
		'moz',
		'webkit'
	];

	/* utils/requestAnimationFrame.js */
	var requestAnimationFrame = function( vendors ) {

		var requestAnimationFrame;
		// If window doesn't exist, we don't need requestAnimationFrame
		if ( typeof window === 'undefined' ) {
			requestAnimationFrame = null;
		} else {
			// https://gist.github.com/paulirish/1579671
			( function( vendors, lastTime, window ) {
				var x, setTimeout;
				if ( window.requestAnimationFrame ) {
					return;
				}
				for ( x = 0; x < vendors.length && !window.requestAnimationFrame; ++x ) {
					window.requestAnimationFrame = window[ vendors[ x ] + 'RequestAnimationFrame' ];
				}
				if ( !window.requestAnimationFrame ) {
					setTimeout = window.setTimeout;
					window.requestAnimationFrame = function( callback ) {
						var currTime, timeToCall, id;
						currTime = Date.now();
						timeToCall = Math.max( 0, 16 - ( currTime - lastTime ) );
						id = setTimeout( function() {
							callback( currTime + timeToCall );
						}, timeToCall );
						lastTime = currTime + timeToCall;
						return id;
					};
				}
			}( vendors, 0, window ) );
			requestAnimationFrame = window.requestAnimationFrame;
		}
		return requestAnimationFrame;
	}( vendors );

	/* utils/getTime.js */
	var getTime = function() {

		var getTime;
		if ( typeof window !== 'undefined' && window.performance && typeof window.performance.now === 'function' ) {
			getTime = function() {
				return window.performance.now();
			};
		} else {
			getTime = function() {
				return Date.now();
			};
		}
		return getTime;
	}();

	/* shared/animations.js */
	var animations = function( rAF, getTime, runloop ) {

		var queue = [];
		var animations = {
			tick: function() {
				var i, animation, now;
				now = getTime();
				runloop.start();
				for ( i = 0; i < queue.length; i += 1 ) {
					animation = queue[ i ];
					if ( !animation.tick( now ) ) {
						// animation is complete, remove it from the stack, and decrement i so we don't miss one
						queue.splice( i--, 1 );
					}
				}
				runloop.end();
				if ( queue.length ) {
					rAF( animations.tick );
				} else {
					animations.running = false;
				}
			},
			add: function( animation ) {
				queue.push( animation );
				if ( !animations.running ) {
					animations.running = true;
					rAF( animations.tick );
				}
			},
			// TODO optimise this
			abort: function( keypath, root ) {
				var i = queue.length,
					animation;
				while ( i-- ) {
					animation = queue[ i ];
					if ( animation.root === root && animation.keypath === keypath ) {
						animation.stop();
					}
				}
			}
		};
		return animations;
	}( requestAnimationFrame, getTime, runloop );

	/* config/options/css/transform.js */
	var transform = function() {

		var __export;
		var selectorsPattern = /(?:^|\})?\s*([^\{\}]+)\s*\{/g,
			commentsPattern = /\/\*.*?\*\//g,
			selectorUnitPattern = /((?:(?:\[[^\]+]\])|(?:[^\s\+\>\~:]))+)((?::[^\s\+\>\~]+)?\s*[\s\+\>\~]?)\s*/g,
			mediaQueryPattern = /^@media/,
			dataRvcGuidPattern = /\[data-rvcguid="[a-z0-9-]+"]/g;
		__export = function transformCss( css, guid ) {
			var transformed, addGuid;
			addGuid = function( selector ) {
				var selectorUnits, match, unit, dataAttr, base, prepended, appended, i, transformed = [];
				selectorUnits = [];
				while ( match = selectorUnitPattern.exec( selector ) ) {
					selectorUnits.push( {
						str: match[ 0 ],
						base: match[ 1 ],
						modifiers: match[ 2 ]
					} );
				}
				// For each simple selector within the selector, we need to create a version
				// that a) combines with the guid, and b) is inside the guid
				dataAttr = '[data-rvcguid="' + guid + '"]';
				base = selectorUnits.map( extractString );
				i = selectorUnits.length;
				while ( i-- ) {
					appended = base.slice();
					// Pseudo-selectors should go after the attribute selector
					unit = selectorUnits[ i ];
					appended[ i ] = unit.base + dataAttr + unit.modifiers || '';
					prepended = base.slice();
					prepended[ i ] = dataAttr + ' ' + prepended[ i ];
					transformed.push( appended.join( ' ' ), prepended.join( ' ' ) );
				}
				return transformed.join( ', ' );
			};
			if ( dataRvcGuidPattern.test( css ) ) {
				transformed = css.replace( dataRvcGuidPattern, '[data-rvcguid="' + guid + '"]' );
			} else {
				transformed = css.replace( commentsPattern, '' ).replace( selectorsPattern, function( match, $1 ) {
					var selectors, transformed;
					// don't transform media queries!
					if ( mediaQueryPattern.test( $1 ) )
						return match;
					selectors = $1.split( ',' ).map( trim );
					transformed = selectors.map( addGuid ).join( ', ' ) + ' ';
					return match.replace( $1, transformed );
				} );
			}
			return transformed;
		};

		function trim( str ) {
			if ( str.trim ) {
				return str.trim();
			}
			return str.replace( /^\s+/, '' ).replace( /\s+$/, '' );
		}

		function extractString( unit ) {
			return unit.str;
		}
		return __export;
	}();

	/* config/options/css/css.js */
	var css = function( transformCss ) {

		var cssConfig = {
			name: 'css',
			extend: extend,
			init: function() {}
		};

		function extend( Parent, proto, options ) {
			var guid = proto.constructor._guid,
				css;
			if ( css = getCss( options.css, options, guid ) || getCss( Parent.css, Parent, guid ) ) {
				proto.constructor.css = css;
			}
		}

		function getCss( css, target, guid ) {
			if ( !css ) {
				return;
			}
			return target.noCssTransform ? css : transformCss( css, guid );
		}
		return cssConfig;
	}( transform );

	/* utils/wrapMethod.js */
	var wrapMethod = function() {

		var __export;
		__export = function( method, superMethod, force ) {
			if ( force || needsSuper( method, superMethod ) ) {
				return function() {
					var hasSuper = '_super' in this,
						_super = this._super,
						result;
					this._super = superMethod;
					result = method.apply( this, arguments );
					if ( hasSuper ) {
						this._super = _super;
					}
					return result;
				};
			} else {
				return method;
			}
		};

		function needsSuper( method, superMethod ) {
			return typeof superMethod === 'function' && /_super/.test( method );
		}
		return __export;
	}();

	/* config/options/data.js */
	var data = function( wrap ) {

		var __export;
		var dataConfig = {
			name: 'data',
			extend: extend,
			init: init,
			reset: reset
		};
		__export = dataConfig;

		function combine( Parent, target, options ) {
			var value = options.data || {},
				parentValue = getAddedKeys( Parent.prototype.data );
			if ( typeof value !== 'object' && typeof value !== 'function' ) {
				throw new TypeError( 'data option must be an object or a function, "' + value + '" is not valid' );
			}
			return dispatch( parentValue, value );
		}

		function extend( Parent, proto, options ) {
			proto.data = combine( Parent, proto, options );
		}

		function init( Parent, ractive, options ) {
			var value = options.data,
				result = combine( Parent, ractive, options );
			if ( typeof result === 'function' ) {
				result = result.call( ractive, value ) || value;
			}
			return ractive.data = result || {};
		}

		function reset( ractive ) {
			var result = this.init( ractive.constructor, ractive, ractive );
			if ( result ) {
				ractive.data = result;
				return true;
			}
		}

		function getAddedKeys( parent ) {
			// only for functions that had keys added
			if ( typeof parent !== 'function' || !Object.keys( parent ).length ) {
				return parent;
			}
			// copy the added keys to temp 'object', otherwise
			// parent would be interpreted as 'function' by dispatch
			var temp = {};
			copy( parent, temp );
			// roll in added keys
			return dispatch( parent, temp );
		}

		function dispatch( parent, child ) {
			if ( typeof child === 'function' ) {
				return extendFn( child, parent );
			} else if ( typeof parent === 'function' ) {
				return fromFn( child, parent );
			} else {
				return fromProperties( child, parent );
			}
		}

		function copy( from, to, fillOnly ) {
			for ( var key in from ) {
				if ( fillOnly && key in to ) {
					continue;
				}
				to[ key ] = from[ key ];
			}
		}

		function fromProperties( child, parent ) {
			child = child || {};
			if ( !parent ) {
				return child;
			}
			copy( parent, child, true );
			return child;
		}

		function fromFn( child, parentFn ) {
			return function( data ) {
				var keys;
				if ( child ) {
					// Track the keys that our on the child,
					// but not on the data. We'll need to apply these
					// after the parent function returns.
					keys = [];
					for ( var key in child ) {
						if ( !data || !( key in data ) ) {
							keys.push( key );
						}
					}
				}
				// call the parent fn, use data if no return value
				data = parentFn.call( this, data ) || data;
				// Copy child keys back onto data. The child keys
				// should take precedence over whatever the
				// parent did with the data.
				if ( keys && keys.length ) {
					data = data || {};
					keys.forEach( function( key ) {
						data[ key ] = child[ key ];
					} );
				}
				return data;
			};
		}

		function extendFn( childFn, parent ) {
			var parentFn;
			if ( typeof parent !== 'function' ) {
				// copy props to data
				parentFn = function( data ) {
					fromProperties( data, parent );
				};
			} else {
				parentFn = function( data ) {
					// give parent function it's own this._super context,
					// otherwise this._super is from child and
					// causes infinite loop
					parent = wrap( parent, function() {}, true );
					return parent.call( this, data ) || data;
				};
			}
			return wrap( childFn, parentFn );
		}
		return __export;
	}( wrapMethod );

	/* config/types.js */
	var types = {
		TEXT: 1,
		INTERPOLATOR: 2,
		TRIPLE: 3,
		SECTION: 4,
		INVERTED: 5,
		CLOSING: 6,
		ELEMENT: 7,
		PARTIAL: 8,
		COMMENT: 9,
		DELIMCHANGE: 10,
		MUSTACHE: 11,
		TAG: 12,
		ATTRIBUTE: 13,
		CLOSING_TAG: 14,
		COMPONENT: 15,
		NUMBER_LITERAL: 20,
		STRING_LITERAL: 21,
		ARRAY_LITERAL: 22,
		OBJECT_LITERAL: 23,
		BOOLEAN_LITERAL: 24,
		GLOBAL: 26,
		KEY_VALUE_PAIR: 27,
		REFERENCE: 30,
		REFINEMENT: 31,
		MEMBER: 32,
		PREFIX_OPERATOR: 33,
		BRACKETED: 34,
		CONDITIONAL: 35,
		INFIX_OPERATOR: 36,
		INVOCATION: 40,
		SECTION_IF: 50,
		SECTION_UNLESS: 51,
		SECTION_EACH: 52,
		SECTION_WITH: 53,
		SECTION_IF_WITH: 54
	};

	/* utils/create.js */
	var create = function() {

		var create;
		try {
			Object.create( null );
			create = Object.create;
		} catch ( err ) {
			// sigh
			create = function() {
				var F = function() {};
				return function( proto, props ) {
					var obj;
					if ( proto === null ) {
						return {};
					}
					F.prototype = proto;
					obj = new F();
					if ( props ) {
						Object.defineProperties( obj, props );
					}
					return obj;
				};
			}();
		}
		return create;
	}();

	/* parse/Parser/expressions/shared/errors.js */
	var parse_Parser_expressions_shared_errors = {
		expectedExpression: 'Expected a JavaScript expression',
		expectedParen: 'Expected closing paren'
	};

	/* parse/Parser/expressions/primary/literal/numberLiteral.js */
	var numberLiteral = function( types ) {

		var numberPattern = /^(?:[+-]?)(?:(?:(?:0|[1-9]\d*)?\.\d+)|(?:(?:0|[1-9]\d*)\.)|(?:0|[1-9]\d*))(?:[eE][+-]?\d+)?/;
		return function( parser ) {
			var result;
			if ( result = parser.matchPattern( numberPattern ) ) {
				return {
					t: types.NUMBER_LITERAL,
					v: result
				};
			}
			return null;
		};
	}( types );

	/* parse/Parser/expressions/primary/literal/booleanLiteral.js */
	var booleanLiteral = function( types ) {

		return function( parser ) {
			var remaining = parser.remaining();
			if ( remaining.substr( 0, 4 ) === 'true' ) {
				parser.pos += 4;
				return {
					t: types.BOOLEAN_LITERAL,
					v: 'true'
				};
			}
			if ( remaining.substr( 0, 5 ) === 'false' ) {
				parser.pos += 5;
				return {
					t: types.BOOLEAN_LITERAL,
					v: 'false'
				};
			}
			return null;
		};
	}( types );

	/* parse/Parser/expressions/primary/literal/stringLiteral/makeQuotedStringMatcher.js */
	var makeQuotedStringMatcher = function() {

		var stringMiddlePattern, escapeSequencePattern, lineContinuationPattern;
		// Match one or more characters until: ", ', \, or EOL/EOF.
		// EOL/EOF is written as (?!.) (meaning there's no non-newline char next).
		stringMiddlePattern = /^(?=.)[^"'\\]+?(?:(?!.)|(?=["'\\]))/;
		// Match one escape sequence, including the backslash.
		escapeSequencePattern = /^\\(?:['"\\bfnrt]|0(?![0-9])|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|(?=.)[^ux0-9])/;
		// Match one ES5 line continuation (backslash + line terminator).
		lineContinuationPattern = /^\\(?:\r\n|[\u000A\u000D\u2028\u2029])/;
		// Helper for defining getDoubleQuotedString and getSingleQuotedString.
		return function( okQuote ) {
			return function( parser ) {
				var start, literal, done, next;
				start = parser.pos;
				literal = '"';
				done = false;
				while ( !done ) {
					next = parser.matchPattern( stringMiddlePattern ) || parser.matchPattern( escapeSequencePattern ) || parser.matchString( okQuote );
					if ( next ) {
						if ( next === '"' ) {
							literal += '\\"';
						} else if ( next === '\\\'' ) {
							literal += '\'';
						} else {
							literal += next;
						}
					} else {
						next = parser.matchPattern( lineContinuationPattern );
						if ( next ) {
							// convert \(newline-like) into a \u escape, which is allowed in JSON
							literal += '\\u' + ( '000' + next.charCodeAt( 1 ).toString( 16 ) ).slice( -4 );
						} else {
							done = true;
						}
					}
				}
				literal += '"';
				// use JSON.parse to interpret escapes
				return JSON.parse( literal );
			};
		};
	}();

	/* parse/Parser/expressions/primary/literal/stringLiteral/singleQuotedString.js */
	var singleQuotedString = function( makeQuotedStringMatcher ) {

		return makeQuotedStringMatcher( '"' );
	}( makeQuotedStringMatcher );

	/* parse/Parser/expressions/primary/literal/stringLiteral/doubleQuotedString.js */
	var doubleQuotedString = function( makeQuotedStringMatcher ) {

		return makeQuotedStringMatcher( '\'' );
	}( makeQuotedStringMatcher );

	/* parse/Parser/expressions/primary/literal/stringLiteral/_stringLiteral.js */
	var stringLiteral = function( types, getSingleQuotedString, getDoubleQuotedString ) {

		return function( parser ) {
			var start, string;
			start = parser.pos;
			if ( parser.matchString( '"' ) ) {
				string = getDoubleQuotedString( parser );
				if ( !parser.matchString( '"' ) ) {
					parser.pos = start;
					return null;
				}
				return {
					t: types.STRING_LITERAL,
					v: string
				};
			}
			if ( parser.matchString( '\'' ) ) {
				string = getSingleQuotedString( parser );
				if ( !parser.matchString( '\'' ) ) {
					parser.pos = start;
					return null;
				}
				return {
					t: types.STRING_LITERAL,
					v: string
				};
			}
			return null;
		};
	}( types, singleQuotedString, doubleQuotedString );

	/* parse/Parser/expressions/shared/patterns.js */
	var patterns = {
		name: /^[a-zA-Z_$][a-zA-Z_$0-9]*/
	};

	/* parse/Parser/expressions/shared/key.js */
	var key = function( getStringLiteral, getNumberLiteral, patterns ) {

		var identifier = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/;
		// http://mathiasbynens.be/notes/javascript-properties
		// can be any name, string literal, or number literal
		return function( parser ) {
			var token;
			if ( token = getStringLiteral( parser ) ) {
				return identifier.test( token.v ) ? token.v : '"' + token.v.replace( /"/g, '\\"' ) + '"';
			}
			if ( token = getNumberLiteral( parser ) ) {
				return token.v;
			}
			if ( token = parser.matchPattern( patterns.name ) ) {
				return token;
			}
		};
	}( stringLiteral, numberLiteral, patterns );

	/* parse/Parser/expressions/primary/literal/objectLiteral/keyValuePair.js */
	var keyValuePair = function( types, getKey ) {

		return function( parser ) {
			var start, key, value;
			start = parser.pos;
			// allow whitespace between '{' and key
			parser.allowWhitespace();
			key = getKey( parser );
			if ( key === null ) {
				parser.pos = start;
				return null;
			}
			// allow whitespace between key and ':'
			parser.allowWhitespace();
			// next character must be ':'
			if ( !parser.matchString( ':' ) ) {
				parser.pos = start;
				return null;
			}
			// allow whitespace between ':' and value
			parser.allowWhitespace();
			// next expression must be a, well... expression
			value = parser.readExpression();
			if ( value === null ) {
				parser.pos = start;
				return null;
			}
			return {
				t: types.KEY_VALUE_PAIR,
				k: key,
				v: value
			};
		};
	}( types, key );

	/* parse/Parser/expressions/primary/literal/objectLiteral/keyValuePairs.js */
	var keyValuePairs = function( getKeyValuePair ) {

		return function getKeyValuePairs( parser ) {
			var start, pairs, pair, keyValuePairs;
			start = parser.pos;
			pair = getKeyValuePair( parser );
			if ( pair === null ) {
				return null;
			}
			pairs = [ pair ];
			if ( parser.matchString( ',' ) ) {
				keyValuePairs = getKeyValuePairs( parser );
				if ( !keyValuePairs ) {
					parser.pos = start;
					return null;
				}
				return pairs.concat( keyValuePairs );
			}
			return pairs;
		};
	}( keyValuePair );

	/* parse/Parser/expressions/primary/literal/objectLiteral/_objectLiteral.js */
	var objectLiteral = function( types, getKeyValuePairs ) {

		return function( parser ) {
			var start, keyValuePairs;
			start = parser.pos;
			// allow whitespace
			parser.allowWhitespace();
			if ( !parser.matchString( '{' ) ) {
				parser.pos = start;
				return null;
			}
			keyValuePairs = getKeyValuePairs( parser );
			// allow whitespace between final value and '}'
			parser.allowWhitespace();
			if ( !parser.matchString( '}' ) ) {
				parser.pos = start;
				return null;
			}
			return {
				t: types.OBJECT_LITERAL,
				m: keyValuePairs
			};
		};
	}( types, keyValuePairs );

	/* parse/Parser/expressions/shared/expressionList.js */
	var expressionList = function( errors ) {

		return function getExpressionList( parser ) {
			var start, expressions, expr, next;
			start = parser.pos;
			parser.allowWhitespace();
			expr = parser.readExpression();
			if ( expr === null ) {
				return null;
			}
			expressions = [ expr ];
			// allow whitespace between expression and ','
			parser.allowWhitespace();
			if ( parser.matchString( ',' ) ) {
				next = getExpressionList( parser );
				if ( next === null ) {
					parser.error( errors.expectedExpression );
				}
				next.forEach( append );
			}

			function append( expression ) {
				expressions.push( expression );
			}
			return expressions;
		};
	}( parse_Parser_expressions_shared_errors );

	/* parse/Parser/expressions/primary/literal/arrayLiteral.js */
	var arrayLiteral = function( types, getExpressionList ) {

		return function( parser ) {
			var start, expressionList;
			start = parser.pos;
			// allow whitespace before '['
			parser.allowWhitespace();
			if ( !parser.matchString( '[' ) ) {
				parser.pos = start;
				return null;
			}
			expressionList = getExpressionList( parser );
			if ( !parser.matchString( ']' ) ) {
				parser.pos = start;
				return null;
			}
			return {
				t: types.ARRAY_LITERAL,
				m: expressionList
			};
		};
	}( types, expressionList );

	/* parse/Parser/expressions/primary/literal/_literal.js */
	var literal = function( getNumberLiteral, getBooleanLiteral, getStringLiteral, getObjectLiteral, getArrayLiteral ) {

		return function( parser ) {
			var literal = getNumberLiteral( parser ) || getBooleanLiteral( parser ) || getStringLiteral( parser ) || getObjectLiteral( parser ) || getArrayLiteral( parser );
			return literal;
		};
	}( numberLiteral, booleanLiteral, stringLiteral, objectLiteral, arrayLiteral );

	/* parse/Parser/expressions/primary/reference.js */
	var reference = function( types, patterns ) {

		var dotRefinementPattern, arrayMemberPattern, getArrayRefinement, globals, keywords;
		dotRefinementPattern = /^\.[a-zA-Z_$0-9]+/;
		getArrayRefinement = function( parser ) {
			var num = parser.matchPattern( arrayMemberPattern );
			if ( num ) {
				return '.' + num;
			}
			return null;
		};
		arrayMemberPattern = /^\[(0|[1-9][0-9]*)\]/;
		// if a reference is a browser global, we don't deference it later, so it needs special treatment
		globals = /^(?:Array|Date|RegExp|decodeURIComponent|decodeURI|encodeURIComponent|encodeURI|isFinite|isNaN|parseFloat|parseInt|JSON|Math|NaN|undefined|null)$/;
		// keywords are not valid references, with the exception of `this`
		keywords = /^(?:break|case|catch|continue|debugger|default|delete|do|else|finally|for|function|if|in|instanceof|new|return|switch|throw|try|typeof|var|void|while|with)$/;
		return function( parser ) {
			var startPos, ancestor, name, dot, combo, refinement, lastDotIndex;
			startPos = parser.pos;
			// we might have a root-level reference
			if ( parser.matchString( '~/' ) ) {
				ancestor = '~/';
			} else {
				// we might have ancestor refs...
				ancestor = '';
				while ( parser.matchString( '../' ) ) {
					ancestor += '../';
				}
			}
			if ( !ancestor ) {
				// we might have an implicit iterator or a restricted reference
				dot = parser.matchString( '.' ) || '';
			}
			name = parser.matchPattern( /^@(?:index|key)/ ) || parser.matchPattern( patterns.name ) || '';
			// bug out if it's a keyword
			if ( keywords.test( name ) ) {
				parser.pos = startPos;
				return null;
			}
			// if this is a browser global, stop here
			if ( !ancestor && !dot && globals.test( name ) ) {
				return {
					t: types.GLOBAL,
					v: name
				};
			}
			combo = ( ancestor || dot ) + name;
			if ( !combo ) {
				return null;
			}
			while ( refinement = parser.matchPattern( dotRefinementPattern ) || getArrayRefinement( parser ) ) {
				combo += refinement;
			}
			if ( parser.matchString( '(' ) ) {
				// if this is a method invocation (as opposed to a function) we need
				// to strip the method name from the reference combo, else the context
				// will be wrong
				lastDotIndex = combo.lastIndexOf( '.' );
				if ( lastDotIndex !== -1 ) {
					combo = combo.substr( 0, lastDotIndex );
					parser.pos = startPos + combo.length;
				} else {
					parser.pos -= 1;
				}
			}
			return {
				t: types.REFERENCE,
				n: combo.replace( /^this\./, './' ).replace( /^this$/, '.' )
			};
		};
	}( types, patterns );

	/* parse/Parser/expressions/primary/bracketedExpression.js */
	var bracketedExpression = function( types, errors ) {

		return function( parser ) {
			var start, expr;
			start = parser.pos;
			if ( !parser.matchString( '(' ) ) {
				return null;
			}
			parser.allowWhitespace();
			expr = parser.readExpression();
			if ( !expr ) {
				parser.error( errors.expectedExpression );
			}
			parser.allowWhitespace();
			if ( !parser.matchString( ')' ) ) {
				parser.error( errors.expectedParen );
			}
			return {
				t: types.BRACKETED,
				x: expr
			};
		};
	}( types, parse_Parser_expressions_shared_errors );

	/* parse/Parser/expressions/primary/_primary.js */
	var primary = function( getLiteral, getReference, getBracketedExpression ) {

		return function( parser ) {
			return getLiteral( parser ) || getReference( parser ) || getBracketedExpression( parser );
		};
	}( literal, reference, bracketedExpression );

	/* parse/Parser/expressions/shared/refinement.js */
	var refinement = function( types, errors, patterns ) {

		return function getRefinement( parser ) {
			var start, name, expr;
			start = parser.pos;
			parser.allowWhitespace();
			// "." name
			if ( parser.matchString( '.' ) ) {
				parser.allowWhitespace();
				if ( name = parser.matchPattern( patterns.name ) ) {
					return {
						t: types.REFINEMENT,
						n: name
					};
				}
				parser.error( 'Expected a property name' );
			}
			// "[" expression "]"
			if ( parser.matchString( '[' ) ) {
				parser.allowWhitespace();
				expr = parser.readExpression();
				if ( !expr ) {
					parser.error( errors.expectedExpression );
				}
				parser.allowWhitespace();
				if ( !parser.matchString( ']' ) ) {
					parser.error( 'Expected \']\'' );
				}
				return {
					t: types.REFINEMENT,
					x: expr
				};
			}
			return null;
		};
	}( types, parse_Parser_expressions_shared_errors, patterns );

	/* parse/Parser/expressions/memberOrInvocation.js */
	var memberOrInvocation = function( types, getPrimary, getExpressionList, getRefinement, errors ) {

		return function( parser ) {
			var current, expression, refinement, expressionList;
			expression = getPrimary( parser );
			if ( !expression ) {
				return null;
			}
			while ( expression ) {
				current = parser.pos;
				if ( refinement = getRefinement( parser ) ) {
					expression = {
						t: types.MEMBER,
						x: expression,
						r: refinement
					};
				} else if ( parser.matchString( '(' ) ) {
					parser.allowWhitespace();
					expressionList = getExpressionList( parser );
					parser.allowWhitespace();
					if ( !parser.matchString( ')' ) ) {
						parser.error( errors.expectedParen );
					}
					expression = {
						t: types.INVOCATION,
						x: expression
					};
					if ( expressionList ) {
						expression.o = expressionList;
					}
				} else {
					break;
				}
			}
			return expression;
		};
	}( types, primary, expressionList, refinement, parse_Parser_expressions_shared_errors );

	/* parse/Parser/expressions/typeof.js */
	var _typeof = function( types, errors, getMemberOrInvocation ) {

		var getTypeof, makePrefixSequenceMatcher;
		makePrefixSequenceMatcher = function( symbol, fallthrough ) {
			return function( parser ) {
				var expression;
				if ( expression = fallthrough( parser ) ) {
					return expression;
				}
				if ( !parser.matchString( symbol ) ) {
					return null;
				}
				parser.allowWhitespace();
				expression = parser.readExpression();
				if ( !expression ) {
					parser.error( errors.expectedExpression );
				}
				return {
					s: symbol,
					o: expression,
					t: types.PREFIX_OPERATOR
				};
			};
		};
		// create all prefix sequence matchers, return getTypeof
		( function() {
			var i, len, matcher, prefixOperators, fallthrough;
			prefixOperators = '! ~ + - typeof'.split( ' ' );
			fallthrough = getMemberOrInvocation;
			for ( i = 0, len = prefixOperators.length; i < len; i += 1 ) {
				matcher = makePrefixSequenceMatcher( prefixOperators[ i ], fallthrough );
				fallthrough = matcher;
			}
			// typeof operator is higher precedence than multiplication, so provides the
			// fallthrough for the multiplication sequence matcher we're about to create
			// (we're skipping void and delete)
			getTypeof = fallthrough;
		}() );
		return getTypeof;
	}( types, parse_Parser_expressions_shared_errors, memberOrInvocation );

	/* parse/Parser/expressions/logicalOr.js */
	var logicalOr = function( types, getTypeof ) {

		var getLogicalOr, makeInfixSequenceMatcher;
		makeInfixSequenceMatcher = function( symbol, fallthrough ) {
			return function( parser ) {
				var start, left, right;
				left = fallthrough( parser );
				if ( !left ) {
					return null;
				}
				// Loop to handle left-recursion in a case like `a * b * c` and produce
				// left association, i.e. `(a * b) * c`.  The matcher can't call itself
				// to parse `left` because that would be infinite regress.
				while ( true ) {
					start = parser.pos;
					parser.allowWhitespace();
					if ( !parser.matchString( symbol ) ) {
						parser.pos = start;
						return left;
					}
					// special case - in operator must not be followed by [a-zA-Z_$0-9]
					if ( symbol === 'in' && /[a-zA-Z_$0-9]/.test( parser.remaining().charAt( 0 ) ) ) {
						parser.pos = start;
						return left;
					}
					parser.allowWhitespace();
					// right operand must also consist of only higher-precedence operators
					right = fallthrough( parser );
					if ( !right ) {
						parser.pos = start;
						return left;
					}
					left = {
						t: types.INFIX_OPERATOR,
						s: symbol,
						o: [
							left,
							right
						]
					};
				}
			};
		};
		// create all infix sequence matchers, and return getLogicalOr
		( function() {
			var i, len, matcher, infixOperators, fallthrough;
			// All the infix operators on order of precedence (source: https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Operators/Operator_Precedence)
			// Each sequence matcher will initially fall through to its higher precedence
			// neighbour, and only attempt to match if one of the higher precedence operators
			// (or, ultimately, a literal, reference, or bracketed expression) already matched
			infixOperators = '* / % + - << >> >>> < <= > >= in instanceof == != === !== & ^ | && ||'.split( ' ' );
			// A typeof operator is higher precedence than multiplication
			fallthrough = getTypeof;
			for ( i = 0, len = infixOperators.length; i < len; i += 1 ) {
				matcher = makeInfixSequenceMatcher( infixOperators[ i ], fallthrough );
				fallthrough = matcher;
			}
			// Logical OR is the fallthrough for the conditional matcher
			getLogicalOr = fallthrough;
		}() );
		return getLogicalOr;
	}( types, _typeof );

	/* parse/Parser/expressions/conditional.js */
	var conditional = function( types, getLogicalOr, errors ) {

		return function( parser ) {
			var start, expression, ifTrue, ifFalse;
			expression = getLogicalOr( parser );
			if ( !expression ) {
				return null;
			}
			start = parser.pos;
			parser.allowWhitespace();
			if ( !parser.matchString( '?' ) ) {
				parser.pos = start;
				return expression;
			}
			parser.allowWhitespace();
			ifTrue = parser.readExpression();
			if ( !ifTrue ) {
				parser.error( errors.expectedExpression );
			}
			parser.allowWhitespace();
			if ( !parser.matchString( ':' ) ) {
				parser.error( 'Expected ":"' );
			}
			parser.allowWhitespace();
			ifFalse = parser.readExpression();
			if ( !ifFalse ) {
				parser.error( errors.expectedExpression );
			}
			return {
				t: types.CONDITIONAL,
				o: [
					expression,
					ifTrue,
					ifFalse
				]
			};
		};
	}( types, logicalOr, parse_Parser_expressions_shared_errors );

	/* parse/Parser/utils/flattenExpression.js */
	var flattenExpression = function( types, isObject ) {

		var __export;
		__export = function( expression ) {
			var refs = [],
				flattened;
			extractRefs( expression, refs );
			flattened = {
				r: refs,
				s: stringify( this, expression, refs )
			};
			return flattened;
		};

		function quoteStringLiteral( str ) {
			return JSON.stringify( String( str ) );
		}
		// TODO maybe refactor this?
		function extractRefs( node, refs ) {
			var i, list;
			if ( node.t === types.REFERENCE ) {
				if ( refs.indexOf( node.n ) === -1 ) {
					refs.unshift( node.n );
				}
			}
			list = node.o || node.m;
			if ( list ) {
				if ( isObject( list ) ) {
					extractRefs( list, refs );
				} else {
					i = list.length;
					while ( i-- ) {
						extractRefs( list[ i ], refs );
					}
				}
			}
			if ( node.x ) {
				extractRefs( node.x, refs );
			}
			if ( node.r ) {
				extractRefs( node.r, refs );
			}
			if ( node.v ) {
				extractRefs( node.v, refs );
			}
		}

		function stringify( parser, node, refs ) {
			var stringifyAll = function( item ) {
				return stringify( parser, item, refs );
			};
			switch ( node.t ) {
				case types.BOOLEAN_LITERAL:
				case types.GLOBAL:
				case types.NUMBER_LITERAL:
					return node.v;
				case types.STRING_LITERAL:
					return quoteStringLiteral( node.v );
				case types.ARRAY_LITERAL:
					return '[' + ( node.m ? node.m.map( stringifyAll ).join( ',' ) : '' ) + ']';
				case types.OBJECT_LITERAL:
					return '{' + ( node.m ? node.m.map( stringifyAll ).join( ',' ) : '' ) + '}';
				case types.KEY_VALUE_PAIR:
					return node.k + ':' + stringify( parser, node.v, refs );
				case types.PREFIX_OPERATOR:
					return ( node.s === 'typeof' ? 'typeof ' : node.s ) + stringify( parser, node.o, refs );
				case types.INFIX_OPERATOR:
					return stringify( parser, node.o[ 0 ], refs ) + ( node.s.substr( 0, 2 ) === 'in' ? ' ' + node.s + ' ' : node.s ) + stringify( parser, node.o[ 1 ], refs );
				case types.INVOCATION:
					return stringify( parser, node.x, refs ) + '(' + ( node.o ? node.o.map( stringifyAll ).join( ',' ) : '' ) + ')';
				case types.BRACKETED:
					return '(' + stringify( parser, node.x, refs ) + ')';
				case types.MEMBER:
					return stringify( parser, node.x, refs ) + stringify( parser, node.r, refs );
				case types.REFINEMENT:
					return node.n ? '.' + node.n : '[' + stringify( parser, node.x, refs ) + ']';
				case types.CONDITIONAL:
					return stringify( parser, node.o[ 0 ], refs ) + '?' + stringify( parser, node.o[ 1 ], refs ) + ':' + stringify( parser, node.o[ 2 ], refs );
				case types.REFERENCE:
					return '_' + refs.indexOf( node.n );
				default:
					parser.error( 'Expected legal JavaScript' );
			}
		}
		return __export;
	}( types, isObject );

	/* parse/Parser/_Parser.js */
	var Parser = function( circular, create, hasOwnProperty, getConditional, flattenExpression ) {

		var Parser, ParseError, leadingWhitespace = /^\s+/;
		ParseError = function( message ) {
			this.name = 'ParseError';
			this.message = message;
			try {
				throw new Error( message );
			} catch ( e ) {
				this.stack = e.stack;
			}
		};
		ParseError.prototype = Error.prototype;
		Parser = function( str, options ) {
			var items, item, lineStart = 0;
			this.str = str;
			this.options = options || {};
			this.pos = 0;
			this.lines = this.str.split( '\n' );
			this.lineEnds = this.lines.map( function( line ) {
				var lineEnd = lineStart + line.length + 1;
				// +1 for the newline
				lineStart = lineEnd;
				return lineEnd;
			}, 0 );
			// Custom init logic
			if ( this.init )
				this.init( str, options );
			items = [];
			while ( this.pos < this.str.length && ( item = this.read() ) ) {
				items.push( item );
			}
			this.leftover = this.remaining();
			this.result = this.postProcess ? this.postProcess( items, options ) : items;
		};
		Parser.prototype = {
			read: function( converters ) {
				var pos, i, len, item;
				if ( !converters )
					converters = this.converters;
				pos = this.pos;
				len = converters.length;
				for ( i = 0; i < len; i += 1 ) {
					this.pos = pos;
					// reset for each attempt
					if ( item = converters[ i ]( this ) ) {
						return item;
					}
				}
				return null;
			},
			readExpression: function() {
				// The conditional operator is the lowest precedence operator (except yield,
				// assignment operators, and commas, none of which are supported), so we
				// start there. If it doesn't match, it 'falls through' to progressively
				// higher precedence operators, until it eventually matches (or fails to
				// match) a 'primary' - a literal or a reference. This way, the abstract syntax
				// tree has everything in its proper place, i.e. 2 + 3 * 4 === 14, not 20.
				return getConditional( this );
			},
			flattenExpression: flattenExpression,
			getLinePos: function( char ) {
				var lineNum = 0,
					lineStart = 0,
					columnNum;
				while ( char >= this.lineEnds[ lineNum ] ) {
					lineStart = this.lineEnds[ lineNum ];
					lineNum += 1;
				}
				columnNum = char - lineStart;
				return [
					lineNum + 1,
					columnNum + 1,
					char
				];
			},
			error: function( message ) {
				var pos, lineNum, columnNum, line, annotation, error;
				pos = this.getLinePos( this.pos );
				lineNum = pos[ 0 ];
				columnNum = pos[ 1 ];
				line = this.lines[ pos[ 0 ] - 1 ];
				annotation = line + '\n' + new Array( pos[ 1 ] ).join( ' ' ) + '^----';
				error = new ParseError( message + ' at line ' + lineNum + ' character ' + columnNum + ':\n' + annotation );
				error.line = pos[ 0 ];
				error.character = pos[ 1 ];
				error.shortMessage = message;
				throw error;
			},
			matchString: function( string ) {
				if ( this.str.substr( this.pos, string.length ) === string ) {
					this.pos += string.length;
					return string;
				}
			},
			matchPattern: function( pattern ) {
				var match;
				if ( match = pattern.exec( this.remaining() ) ) {
					this.pos += match[ 0 ].length;
					return match[ 1 ] || match[ 0 ];
				}
			},
			allowWhitespace: function() {
				this.matchPattern( leadingWhitespace );
			},
			remaining: function() {
				return this.str.substring( this.pos );
			},
			nextChar: function() {
				return this.str.charAt( this.pos );
			}
		};
		Parser.extend = function( proto ) {
			var Parent = this,
				Child, key;
			Child = function( str, options ) {
				Parser.call( this, str, options );
			};
			Child.prototype = create( Parent.prototype );
			for ( key in proto ) {
				if ( hasOwnProperty.call( proto, key ) ) {
					Child.prototype[ key ] = proto[ key ];
				}
			}
			Child.extend = Parser.extend;
			return Child;
		};
		circular.Parser = Parser;
		return Parser;
	}( circular, create, hasOwn, conditional, flattenExpression );

	/* parse/converters/mustache/delimiterChange.js */
	var delimiterChange = function() {

		var delimiterChangePattern = /^[^\s=]+/,
			whitespacePattern = /^\s+/;
		return function( parser ) {
			var start, opening, closing;
			if ( !parser.matchString( '=' ) ) {
				return null;
			}
			start = parser.pos;
			// allow whitespace before new opening delimiter
			parser.allowWhitespace();
			opening = parser.matchPattern( delimiterChangePattern );
			if ( !opening ) {
				parser.pos = start;
				return null;
			}
			// allow whitespace (in fact, it's necessary...)
			if ( !parser.matchPattern( whitespacePattern ) ) {
				return null;
			}
			closing = parser.matchPattern( delimiterChangePattern );
			if ( !closing ) {
				parser.pos = start;
				return null;
			}
			// allow whitespace before closing '='
			parser.allowWhitespace();
			if ( !parser.matchString( '=' ) ) {
				parser.pos = start;
				return null;
			}
			return [
				opening,
				closing
			];
		};
	}();

	/* parse/converters/mustache/delimiterTypes.js */
	var delimiterTypes = [ {
		delimiters: 'delimiters',
		isTriple: false,
		isStatic: false
	}, {
		delimiters: 'tripleDelimiters',
		isTriple: true,
		isStatic: false
	}, {
		delimiters: 'staticDelimiters',
		isTriple: false,
		isStatic: true
	}, {
		delimiters: 'staticTripleDelimiters',
		isTriple: true,
		isStatic: true
	} ];

	/* parse/converters/mustache/type.js */
	var type = function( types ) {

		var mustacheTypes = {
			'#': types.SECTION,
			'^': types.INVERTED,
			'/': types.CLOSING,
			'>': types.PARTIAL,
			'!': types.COMMENT,
			'&': types.TRIPLE
		};
		return function( parser ) {
			var type = mustacheTypes[ parser.str.charAt( parser.pos ) ];
			if ( !type ) {
				return null;
			}
			parser.pos += 1;
			return type;
		};
	}( types );

	/* parse/converters/mustache/handlebarsBlockCodes.js */
	var handlebarsBlockCodes = function( types ) {

		return {
			'each': types.SECTION_EACH,
			'if': types.SECTION_IF,
			'if-with': types.SECTION_IF_WITH,
			'with': types.SECTION_WITH,
			'unless': types.SECTION_UNLESS
		};
	}( types );

	/* empty/legacy.js */
	var legacy = null;

	/* parse/converters/mustache/content.js */
	var content = function( types, mustacheType, handlebarsBlockCodes ) {

		var __export;
		var indexRefPattern = /^\s*:\s*([a-zA-Z_$][a-zA-Z_$0-9]*)/,
			arrayMemberPattern = /^[0-9][1-9]*$/,
			handlebarsBlockPattern = new RegExp( '^(' + Object.keys( handlebarsBlockCodes ).join( '|' ) + ')\\b' ),
			legalReference;
		legalReference = /^[a-zA-Z$_0-9]+(?:(\.[a-zA-Z$_0-9]+)|(\[[a-zA-Z$_0-9]+\]))*$/;
		__export = function( parser, delimiterType ) {
			var start, pos, mustache, type, block, expression, i, remaining, index, delimiters;
			start = parser.pos;
			mustache = {};
			delimiters = parser[ delimiterType.delimiters ];
			if ( delimiterType.isStatic ) {
				mustache.s = true;
			}
			// Determine mustache type
			if ( delimiterType.isTriple ) {
				mustache.t = types.TRIPLE;
			} else {
				// We need to test for expressions before we test for mustache type, because
				// an expression that begins '!' looks a lot like a comment
				if ( parser.remaining()[ 0 ] === '!' ) {
					try {
						expression = parser.readExpression();
						// Was it actually an expression, or a comment block in disguise?
						parser.allowWhitespace();
						if ( parser.remaining().indexOf( delimiters[ 1 ] ) ) {
							expression = null;
						} else {
							mustache.t = types.INTERPOLATOR;
						}
					} catch ( err ) {}
					if ( !expression ) {
						index = parser.remaining().indexOf( delimiters[ 1 ] );
						if ( ~index ) {
							parser.pos += index;
						} else {
							parser.error( 'Expected closing delimiter (\'' + delimiters[ 1 ] + '\')' );
						}
						return {
							t: types.COMMENT
						};
					}
				}
				if ( !expression ) {
					type = mustacheType( parser );
					mustache.t = type || types.INTERPOLATOR;
					// default
					// See if there's an explicit section type e.g. {{#with}}...{{/with}}
					if ( type === types.SECTION ) {
						if ( block = parser.matchPattern( handlebarsBlockPattern ) ) {
							mustache.n = block;
						}
						parser.allowWhitespace();
					} else if ( type === types.COMMENT || type === types.CLOSING ) {
						remaining = parser.remaining();
						index = remaining.indexOf( delimiters[ 1 ] );
						if ( index !== -1 ) {
							mustache.r = remaining.substr( 0, index ).split( ' ' )[ 0 ];
							parser.pos += index;
							return mustache;
						}
					}
				}
			}
			if ( !expression ) {
				// allow whitespace
				parser.allowWhitespace();
				// get expression
				expression = parser.readExpression();
				// If this is a partial, it may have a context (e.g. `{{>item foo}}`). These
				// cases involve a bit of a hack - we want to turn it into the equivalent of
				// `{{#with foo}}{{>item}}{{/with}}`, but to get there we temporarily append
				// a 'contextPartialExpression' to the mustache, and process the context instead of
				// the reference
				var temp;
				if ( mustache.t === types.PARTIAL && expression && ( temp = parser.readExpression() ) ) {
					mustache = {
						contextPartialExpression: expression
					};
					expression = temp;
				}
				// With certain valid references that aren't valid expressions,
				// e.g. {{1.foo}}, we have a problem: it looks like we've got an
				// expression, but the expression didn't consume the entire
				// reference. So we need to check that the mustache delimiters
				// appear next, unless there's an index reference (i.e. a colon)
				remaining = parser.remaining();
				if ( remaining.substr( 0, delimiters[ 1 ].length ) !== delimiters[ 1 ] && remaining.charAt( 0 ) !== ':' ) {
					pos = parser.pos;
					parser.pos = start;
					remaining = parser.remaining();
					index = remaining.indexOf( delimiters[ 1 ] );
					if ( index !== -1 ) {
						mustache.r = remaining.substr( 0, index ).trim();
						// Check it's a legal reference
						if ( !legalReference.test( mustache.r ) ) {
							parser.error( 'Expected a legal Mustache reference' );
						}
						parser.pos += index;
						return mustache;
					}
					parser.pos = pos;
				}
			}
			refineExpression( parser, expression, mustache );
			// if there was context, process the expression now and save it for later
			if ( mustache.contextPartialExpression ) {
				mustache.contextPartialExpression = [ refineExpression( parser, mustache.contextPartialExpression, {
					t: types.PARTIAL
				} ) ];
			}
			// optional index reference
			if ( i = parser.matchPattern( indexRefPattern ) ) {
				mustache.i = i;
			}
			return mustache;
		};

		function refineExpression( parser, expression, mustache ) {
			var referenceExpression;
			if ( expression ) {
				while ( expression.t === types.BRACKETED && expression.x ) {
					expression = expression.x;
				}
				// special case - integers should be treated as array members references,
				// rather than as expressions in their own right
				if ( expression.t === types.REFERENCE ) {
					mustache.r = expression.n;
				} else {
					if ( expression.t === types.NUMBER_LITERAL && arrayMemberPattern.test( expression.v ) ) {
						mustache.r = expression.v;
					} else if ( referenceExpression = getReferenceExpression( parser, expression ) ) {
						mustache.rx = referenceExpression;
					} else {
						mustache.x = parser.flattenExpression( expression );
					}
				}
				return mustache;
			}
		}
		// TODO refactor this! it's bewildering
		function getReferenceExpression( parser, expression ) {
			var members = [],
				refinement;
			while ( expression.t === types.MEMBER && expression.r.t === types.REFINEMENT ) {
				refinement = expression.r;
				if ( refinement.x ) {
					if ( refinement.x.t === types.REFERENCE ) {
						members.unshift( refinement.x );
					} else {
						members.unshift( parser.flattenExpression( refinement.x ) );
					}
				} else {
					members.unshift( refinement.n );
				}
				expression = expression.x;
			}
			if ( expression.t !== types.REFERENCE ) {
				return null;
			}
			return {
				r: expression.n,
				m: members
			};
		}
		return __export;
	}( types, type, handlebarsBlockCodes, legacy );

	/* parse/converters/mustache.js */
	var mustache = function( types, delimiterChange, delimiterTypes, mustacheContent, handlebarsBlockCodes ) {

		var __export;
		var delimiterChangeToken = {
				t: types.DELIMCHANGE,
				exclude: true
			},
			handlebarsIndexRefPattern = /^@(?:index|key)$/;
		__export = getMustache;

		function getMustache( parser ) {
			var types;
			// If we're inside a <script> or <style> tag, and we're not
			// interpolating, bug out
			if ( parser.interpolate[ parser.inside ] === false ) {
				return null;
			}
			types = delimiterTypes.slice().sort( function compare( a, b ) {
				// Sort in order of descending opening delimiter length (longer first),
				// to protect against opening delimiters being substrings of each other
				return parser[ b.delimiters ][ 0 ].length - parser[ a.delimiters ][ 0 ].length;
			} );
			return function r( type ) {
				if ( !type ) {
					return null;
				} else {
					return getMustacheOfType( parser, type ) || r( types.shift() );
				}
			}( types.shift() );
		}

		function getMustacheOfType( parser, delimiterType ) {
			var start, mustache, delimiters, children, expectedClose, elseChildren, currentChildren, child, indexRef;
			start = parser.pos;
			delimiters = parser[ delimiterType.delimiters ];
			if ( !parser.matchString( delimiters[ 0 ] ) ) {
				return null;
			}
			// delimiter change?
			if ( mustache = delimiterChange( parser ) ) {
				// find closing delimiter or abort...
				if ( !parser.matchString( delimiters[ 1 ] ) ) {
					return null;
				}
				// ...then make the switch
				parser[ delimiterType.delimiters ] = mustache;
				return delimiterChangeToken;
			}
			parser.allowWhitespace();
			mustache = mustacheContent( parser, delimiterType );
			if ( mustache === null ) {
				parser.pos = start;
				return null;
			}
			// allow whitespace before closing delimiter
			parser.allowWhitespace();
			if ( !parser.matchString( delimiters[ 1 ] ) ) {
				parser.error( 'Expected closing delimiter \'' + delimiters[ 1 ] + '\' after reference' );
			}
			if ( mustache.t === types.COMMENT ) {
				mustache.exclude = true;
			}
			if ( mustache.t === types.CLOSING ) {
				parser.sectionDepth -= 1;
				if ( parser.sectionDepth < 0 ) {
					parser.pos = start;
					parser.error( 'Attempted to close a section that wasn\'t open' );
				}
			}
			// partials with context
			if ( mustache.contextPartialExpression ) {
				mustache.f = mustache.contextPartialExpression;
				mustache.t = types.SECTION;
				mustache.n = 'with';
				delete mustache.contextPartialExpression;
			} else if ( isSection( mustache ) ) {
				parser.sectionDepth += 1;
				children = [];
				currentChildren = children;
				expectedClose = mustache.n;
				while ( child = parser.read() ) {
					if ( child.t === types.CLOSING ) {
						if ( expectedClose && child.r !== expectedClose ) {
							parser.error( 'Expected {{/' + expectedClose + '}}' );
						}
						break;
					}
					// {{else}} tags require special treatment
					if ( child.t === types.INTERPOLATOR && child.r === 'else' ) {
						// no {{else}} allowed in {{#unless}}
						if ( mustache.n === 'unless' ) {
							parser.error( '{{else}} not allowed in {{#unless}}' );
						} else {
							currentChildren = elseChildren = [];
							continue;
						}
					}
					currentChildren.push( child );
				}
				if ( children.length ) {
					mustache.f = children;
					// If this is an 'each' section, and it contains an {{@index}} or {{@key}},
					// we need to set the index reference accordingly
					if ( !mustache.i && mustache.n === 'each' && ( indexRef = handlebarsIndexRef( mustache.f ) ) ) {
						mustache.i = indexRef;
					}
				}
				if ( elseChildren && elseChildren.length ) {
					mustache.l = elseChildren;
					if ( mustache.n === 'with' ) {
						mustache.n = 'if-with';
					}
				}
			}
			if ( parser.includeLinePositions ) {
				mustache.p = parser.getLinePos( start );
			}
			// Replace block name with code
			if ( mustache.n ) {
				mustache.n = handlebarsBlockCodes[ mustache.n ];
			} else if ( mustache.t === types.INVERTED ) {
				mustache.t = types.SECTION;
				mustache.n = types.SECTION_UNLESS;
			}
			return mustache;
		}

		function handlebarsIndexRef( fragment ) {
			var i, child, indexRef, name;
			if ( !fragment ) {
				return;
			}
			i = fragment.length;
			while ( i-- ) {
				child = fragment[ i ];
				// Recurse into elements (but not sections)
				if ( child.t === types.ELEMENT ) {
					if ( indexRef = // directive arguments
						handlebarsIndexRef( child.o && child.o.d ) || handlebarsIndexRef( child.t0 && child.t0.d ) || handlebarsIndexRef( child.t1 && child.t1.d ) || handlebarsIndexRef( child.t2 && child.t2.d ) || // children
						handlebarsIndexRef( child.f ) ) {
						return indexRef;
					}
					// proxy events
					for ( name in child.v ) {
						if ( child.v.hasOwnProperty( name ) && child.v[ name ].d && ( indexRef = handlebarsIndexRef( child.v[ name ].d ) ) ) {
							return indexRef;
						}
					}
					// attributes
					for ( name in child.a ) {
						if ( child.a.hasOwnProperty( name ) && ( indexRef = handlebarsIndexRef( child.a[ name ] ) ) ) {
							return indexRef;
						}
					}
				}
				// Mustache?
				if ( child.t === types.INTERPOLATOR || child.t === types.TRIPLE || child.t === types.SECTION ) {
					// Normal reference?
					if ( child.r && handlebarsIndexRefPattern.test( child.r ) ) {
						return child.r;
					}
					// Expression?
					if ( child.x && ( indexRef = indexRefContainedInExpression( child.x ) ) ) {
						return indexRef;
					}
					// Reference expression?
					if ( child.rx && ( indexRef = indexRefContainedInReferenceExpression( child.rx ) ) ) {
						return indexRef;
					}
				}
			}
		}

		function indexRefContainedInExpression( expression ) {
			var i;
			i = expression.r.length;
			while ( i-- ) {
				if ( handlebarsIndexRefPattern.test( expression.r[ i ] ) ) {
					return expression.r[ i ];
				}
			}
		}

		function indexRefContainedInReferenceExpression( referenceExpression ) {
			var i, indexRef, member;
			i = referenceExpression.m.length;
			while ( i-- ) {
				member = referenceExpression.m[ i ];
				if ( member.r && ( indexRef = indexRefContainedInExpression( member ) ) ) {
					return indexRef;
				}
				if ( member.t === types.REFERENCE && handlebarsIndexRefPattern.test( member.n ) ) {
					return member.n;
				}
			}
		}

		function isSection( mustache ) {
			return mustache.t === types.SECTION || mustache.t === types.INVERTED;
		}
		return __export;
	}( types, delimiterChange, delimiterTypes, content, handlebarsBlockCodes );

	/* parse/converters/comment.js */
	var comment = function( types ) {

		var OPEN_COMMENT = '<!--',
			CLOSE_COMMENT = '-->';
		return function( parser ) {
			var start, content, remaining, endIndex, comment;
			start = parser.pos;
			if ( !parser.matchString( OPEN_COMMENT ) ) {
				return null;
			}
			remaining = parser.remaining();
			endIndex = remaining.indexOf( CLOSE_COMMENT );
			if ( endIndex === -1 ) {
				parser.error( 'Illegal HTML - expected closing comment sequence (\'-->\')' );
			}
			content = remaining.substr( 0, endIndex );
			parser.pos += endIndex + 3;
			comment = {
				t: types.COMMENT,
				c: content
			};
			if ( parser.includeLinePositions ) {
				comment.p = parser.getLinePos( start );
			}
			return comment;
		};
	}( types );

	/* config/voidElementNames.js */
	var voidElementNames = function() {

		var voidElementNames = /^(?:area|base|br|col|command|doctype|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/i;
		return voidElementNames;
	}();

	/* parse/converters/utils/getLowestIndex.js */
	var getLowestIndex = function( haystack, needles ) {
		var i, index, lowest;
		i = needles.length;
		while ( i-- ) {
			index = haystack.indexOf( needles[ i ] );
			// short circuit
			if ( !index ) {
				return 0;
			}
			if ( index === -1 ) {
				continue;
			}
			if ( !lowest || index < lowest ) {
				lowest = index;
			}
		}
		return lowest || -1;
	};

	/* parse/converters/text.js */
	var text = function( getLowestIndex ) {

		return function( parser ) {
			var index, remaining, disallowed, barrier;
			remaining = parser.remaining();
			barrier = parser.inside ? '</' + parser.inside : '<';
			if ( parser.inside && !parser.interpolate[ parser.inside ] ) {
				index = remaining.indexOf( barrier );
			} else {
				disallowed = [
					barrier,
					parser.delimiters[ 0 ],
					parser.tripleDelimiters[ 0 ],
					parser.staticDelimiters[ 0 ],
					parser.staticTripleDelimiters[ 0 ]
				];
				// http://developers.whatwg.org/syntax.html#syntax-attributes
				if ( parser.inAttribute === true ) {
					// we're inside an unquoted attribute value
					disallowed.push( '"', '\'', '=', '>', '`' );
				} else if ( parser.inAttribute ) {
					// quoted attribute value
					disallowed.push( parser.inAttribute );
				}
				index = getLowestIndex( remaining, disallowed );
			}
			if ( !index ) {
				return null;
			}
			if ( index === -1 ) {
				index = remaining.length;
			}
			parser.pos += index;
			return remaining.substr( 0, index );
		};
	}( getLowestIndex );

	/* parse/converters/element/closingTag.js */
	var closingTag = function( types ) {

		var closingTagPattern = /^([a-zA-Z]{1,}:?[a-zA-Z0-9\-]*)\s*\>/;
		return function( parser ) {
			var tag;
			// are we looking at a closing tag?
			if ( !parser.matchString( '</' ) ) {
				return null;
			}
			if ( tag = parser.matchPattern( closingTagPattern ) ) {
				return {
					t: types.CLOSING_TAG,
					e: tag
				};
			}
			// We have an illegal closing tag, report it
			parser.pos -= 2;
			parser.error( 'Illegal closing tag' );
		};
	}( types );

	/* shared/decodeCharacterReferences.js */
	var decodeCharacterReferences = function() {

		var __export;
		var htmlEntities, controlCharacters, entityPattern;
		htmlEntities = {
			quot: 34,
			amp: 38,
			apos: 39,
			lt: 60,
			gt: 62,
			nbsp: 160,
			iexcl: 161,
			cent: 162,
			pound: 163,
			curren: 164,
			yen: 165,
			brvbar: 166,
			sect: 167,
			uml: 168,
			copy: 169,
			ordf: 170,
			laquo: 171,
			not: 172,
			shy: 173,
			reg: 174,
			macr: 175,
			deg: 176,
			plusmn: 177,
			sup2: 178,
			sup3: 179,
			acute: 180,
			micro: 181,
			para: 182,
			middot: 183,
			cedil: 184,
			sup1: 185,
			ordm: 186,
			raquo: 187,
			frac14: 188,
			frac12: 189,
			frac34: 190,
			iquest: 191,
			Agrave: 192,
			Aacute: 193,
			Acirc: 194,
			Atilde: 195,
			Auml: 196,
			Aring: 197,
			AElig: 198,
			Ccedil: 199,
			Egrave: 200,
			Eacute: 201,
			Ecirc: 202,
			Euml: 203,
			Igrave: 204,
			Iacute: 205,
			Icirc: 206,
			Iuml: 207,
			ETH: 208,
			Ntilde: 209,
			Ograve: 210,
			Oacute: 211,
			Ocirc: 212,
			Otilde: 213,
			Ouml: 214,
			times: 215,
			Oslash: 216,
			Ugrave: 217,
			Uacute: 218,
			Ucirc: 219,
			Uuml: 220,
			Yacute: 221,
			THORN: 222,
			szlig: 223,
			agrave: 224,
			aacute: 225,
			acirc: 226,
			atilde: 227,
			auml: 228,
			aring: 229,
			aelig: 230,
			ccedil: 231,
			egrave: 232,
			eacute: 233,
			ecirc: 234,
			euml: 235,
			igrave: 236,
			iacute: 237,
			icirc: 238,
			iuml: 239,
			eth: 240,
			ntilde: 241,
			ograve: 242,
			oacute: 243,
			ocirc: 244,
			otilde: 245,
			ouml: 246,
			divide: 247,
			oslash: 248,
			ugrave: 249,
			uacute: 250,
			ucirc: 251,
			uuml: 252,
			yacute: 253,
			thorn: 254,
			yuml: 255,
			OElig: 338,
			oelig: 339,
			Scaron: 352,
			scaron: 353,
			Yuml: 376,
			fnof: 402,
			circ: 710,
			tilde: 732,
			Alpha: 913,
			Beta: 914,
			Gamma: 915,
			Delta: 916,
			Epsilon: 917,
			Zeta: 918,
			Eta: 919,
			Theta: 920,
			Iota: 921,
			Kappa: 922,
			Lambda: 923,
			Mu: 924,
			Nu: 925,
			Xi: 926,
			Omicron: 927,
			Pi: 928,
			Rho: 929,
			Sigma: 931,
			Tau: 932,
			Upsilon: 933,
			Phi: 934,
			Chi: 935,
			Psi: 936,
			Omega: 937,
			alpha: 945,
			beta: 946,
			gamma: 947,
			delta: 948,
			epsilon: 949,
			zeta: 950,
			eta: 951,
			theta: 952,
			iota: 953,
			kappa: 954,
			lambda: 955,
			mu: 956,
			nu: 957,
			xi: 958,
			omicron: 959,
			pi: 960,
			rho: 961,
			sigmaf: 962,
			sigma: 963,
			tau: 964,
			upsilon: 965,
			phi: 966,
			chi: 967,
			psi: 968,
			omega: 969,
			thetasym: 977,
			upsih: 978,
			piv: 982,
			ensp: 8194,
			emsp: 8195,
			thinsp: 8201,
			zwnj: 8204,
			zwj: 8205,
			lrm: 8206,
			rlm: 8207,
			ndash: 8211,
			mdash: 8212,
			lsquo: 8216,
			rsquo: 8217,
			sbquo: 8218,
			ldquo: 8220,
			rdquo: 8221,
			bdquo: 8222,
			dagger: 8224,
			Dagger: 8225,
			bull: 8226,
			hellip: 8230,
			permil: 8240,
			prime: 8242,
			Prime: 8243,
			lsaquo: 8249,
			rsaquo: 8250,
			oline: 8254,
			frasl: 8260,
			euro: 8364,
			image: 8465,
			weierp: 8472,
			real: 8476,
			trade: 8482,
			alefsym: 8501,
			larr: 8592,
			uarr: 8593,
			rarr: 8594,
			darr: 8595,
			harr: 8596,
			crarr: 8629,
			lArr: 8656,
			uArr: 8657,
			rArr: 8658,
			dArr: 8659,
			hArr: 8660,
			forall: 8704,
			part: 8706,
			exist: 8707,
			empty: 8709,
			nabla: 8711,
			isin: 8712,
			notin: 8713,
			ni: 8715,
			prod: 8719,
			sum: 8721,
			minus: 8722,
			lowast: 8727,
			radic: 8730,
			prop: 8733,
			infin: 8734,
			ang: 8736,
			and: 8743,
			or: 8744,
			cap: 8745,
			cup: 8746,
			'int': 8747,
			there4: 8756,
			sim: 8764,
			cong: 8773,
			asymp: 8776,
			ne: 8800,
			equiv: 8801,
			le: 8804,
			ge: 8805,
			sub: 8834,
			sup: 8835,
			nsub: 8836,
			sube: 8838,
			supe: 8839,
			oplus: 8853,
			otimes: 8855,
			perp: 8869,
			sdot: 8901,
			lceil: 8968,
			rceil: 8969,
			lfloor: 8970,
			rfloor: 8971,
			lang: 9001,
			rang: 9002,
			loz: 9674,
			spades: 9824,
			clubs: 9827,
			hearts: 9829,
			diams: 9830
		};
		controlCharacters = [
			8364,
			129,
			8218,
			402,
			8222,
			8230,
			8224,
			8225,
			710,
			8240,
			352,
			8249,
			338,
			141,
			381,
			143,
			144,
			8216,
			8217,
			8220,
			8221,
			8226,
			8211,
			8212,
			732,
			8482,
			353,
			8250,
			339,
			157,
			382,
			376
		];
		entityPattern = new RegExp( '&(#?(?:x[\\w\\d]+|\\d+|' + Object.keys( htmlEntities ).join( '|' ) + '));?', 'g' );
		__export = function decodeCharacterReferences( html ) {
			return html.replace( entityPattern, function( match, entity ) {
				var code;
				// Handle named entities
				if ( entity[ 0 ] !== '#' ) {
					code = htmlEntities[ entity ];
				} else if ( entity[ 1 ] === 'x' ) {
					code = parseInt( entity.substring( 2 ), 16 );
				} else {
					code = parseInt( entity.substring( 1 ), 10 );
				}
				if ( !code ) {
					return match;
				}
				return String.fromCharCode( validateCode( code ) );
			} );
		};
		// some code points are verboten. If we were inserting HTML, the browser would replace the illegal
		// code points with alternatives in some cases - since we're bypassing that mechanism, we need
		// to replace them ourselves
		//
		// Source: http://en.wikipedia.org/wiki/Character_encodings_in_HTML#Illegal_characters
		function validateCode( code ) {
			if ( !code ) {
				return 65533;
			}
			// line feed becomes generic whitespace
			if ( code === 10 ) {
				return 32;
			}
			// ASCII range. (Why someone would use HTML entities for ASCII characters I don't know, but...)
			if ( code < 128 ) {
				return code;
			}
			// code points 128-159 are dealt with leniently by browsers, but they're incorrect. We need
			// to correct the mistake or we'll end up with missing € signs and so on
			if ( code <= 159 ) {
				return controlCharacters[ code - 128 ];
			}
			// basic multilingual plane
			if ( code < 55296 ) {
				return code;
			}
			// UTF-16 surrogate halves
			if ( code <= 57343 ) {
				return 65533;
			}
			// rest of the basic multilingual plane
			if ( code <= 65535 ) {
				return code;
			}
			return 65533;
		}
		return __export;
	}( legacy );

	/* parse/converters/element/attribute.js */
	var attribute = function( getLowestIndex, getMustache, decodeCharacterReferences ) {

		var __export;
		var attributeNamePattern = /^[^\s"'>\/=]+/,
			unquotedAttributeValueTextPattern = /^[^\s"'=<>`]+/;
		__export = getAttribute;

		function getAttribute( parser ) {
			var attr, name, value;
			parser.allowWhitespace();
			name = parser.matchPattern( attributeNamePattern );
			if ( !name ) {
				return null;
			}
			attr = {
				name: name
			};
			value = getAttributeValue( parser );
			if ( value ) {
				attr.value = value;
			}
			return attr;
		}

		function getAttributeValue( parser ) {
			var start, valueStart, startDepth, value;
			start = parser.pos;
			parser.allowWhitespace();
			if ( !parser.matchString( '=' ) ) {
				parser.pos = start;
				return null;
			}
			parser.allowWhitespace();
			valueStart = parser.pos;
			startDepth = parser.sectionDepth;
			value = getQuotedAttributeValue( parser, '\'' ) || getQuotedAttributeValue( parser, '"' ) || getUnquotedAttributeValue( parser );
			if ( parser.sectionDepth !== startDepth ) {
				parser.pos = valueStart;
				parser.error( 'An attribute value must contain as many opening section tags as closing section tags' );
			}
			if ( value === null ) {
				parser.pos = start;
				return null;
			}
			if ( !value.length ) {
				return null;
			}
			if ( value.length === 1 && typeof value[ 0 ] === 'string' ) {
				return decodeCharacterReferences( value[ 0 ] );
			}
			return value;
		}

		function getUnquotedAttributeValueToken( parser ) {
			var start, text, haystack, needles, index;
			start = parser.pos;
			text = parser.matchPattern( unquotedAttributeValueTextPattern );
			if ( !text ) {
				return null;
			}
			haystack = text;
			needles = [
				parser.delimiters[ 0 ],
				parser.tripleDelimiters[ 0 ],
				parser.staticDelimiters[ 0 ],
				parser.staticTripleDelimiters[ 0 ]
			];
			if ( ( index = getLowestIndex( haystack, needles ) ) !== -1 ) {
				text = text.substr( 0, index );
				parser.pos = start + text.length;
			}
			return text;
		}

		function getUnquotedAttributeValue( parser ) {
			var tokens, token;
			parser.inAttribute = true;
			tokens = [];
			token = getMustache( parser ) || getUnquotedAttributeValueToken( parser );
			while ( token !== null ) {
				tokens.push( token );
				token = getMustache( parser ) || getUnquotedAttributeValueToken( parser );
			}
			if ( !tokens.length ) {
				return null;
			}
			parser.inAttribute = false;
			return tokens;
		}

		function getQuotedAttributeValue( parser, quoteMark ) {
			var start, tokens, token;
			start = parser.pos;
			if ( !parser.matchString( quoteMark ) ) {
				return null;
			}
			parser.inAttribute = quoteMark;
			tokens = [];
			token = getMustache( parser ) || getQuotedStringToken( parser, quoteMark );
			while ( token !== null ) {
				tokens.push( token );
				token = getMustache( parser ) || getQuotedStringToken( parser, quoteMark );
			}
			if ( !parser.matchString( quoteMark ) ) {
				parser.pos = start;
				return null;
			}
			parser.inAttribute = false;
			return tokens;
		}

		function getQuotedStringToken( parser, quoteMark ) {
			var start, index, haystack, needles;
			start = parser.pos;
			haystack = parser.remaining();
			needles = [
				quoteMark,
				parser.delimiters[ 0 ],
				parser.tripleDelimiters[ 0 ],
				parser.staticDelimiters[ 0 ],
				parser.staticTripleDelimiters[ 0 ]
			];
			index = getLowestIndex( haystack, needles );
			if ( index === -1 ) {
				parser.error( 'Quoted attribute value must have a closing quote' );
			}
			if ( !index ) {
				return null;
			}
			parser.pos += index;
			return haystack.substr( 0, index );
		}
		return __export;
	}( getLowestIndex, mustache, decodeCharacterReferences );

	/* utils/parseJSON.js */
	var parseJSON = function( Parser, getStringLiteral, getKey ) {

		var JsonParser, specials, specialsPattern, numberPattern, placeholderPattern, placeholderAtStartPattern, onlyWhitespace;
		specials = {
			'true': true,
			'false': false,
			'undefined': undefined,
			'null': null
		};
		specialsPattern = new RegExp( '^(?:' + Object.keys( specials ).join( '|' ) + ')' );
		numberPattern = /^(?:[+-]?)(?:(?:(?:0|[1-9]\d*)?\.\d+)|(?:(?:0|[1-9]\d*)\.)|(?:0|[1-9]\d*))(?:[eE][+-]?\d+)?/;
		placeholderPattern = /\$\{([^\}]+)\}/g;
		placeholderAtStartPattern = /^\$\{([^\}]+)\}/;
		onlyWhitespace = /^\s*$/;
		JsonParser = Parser.extend( {
			init: function( str, options ) {
				this.values = options.values;
				this.allowWhitespace();
			},
			postProcess: function( result ) {
				if ( result.length !== 1 || !onlyWhitespace.test( this.leftover ) ) {
					return null;
				}
				return {
					value: result[ 0 ].v
				};
			},
			converters: [

				function getPlaceholder( parser ) {
					var placeholder;
					if ( !parser.values ) {
						return null;
					}
					placeholder = parser.matchPattern( placeholderAtStartPattern );
					if ( placeholder && parser.values.hasOwnProperty( placeholder ) ) {
						return {
							v: parser.values[ placeholder ]
						};
					}
				},
				function getSpecial( parser ) {
					var special;
					if ( special = parser.matchPattern( specialsPattern ) ) {
						return {
							v: specials[ special ]
						};
					}
				},
				function getNumber( parser ) {
					var number;
					if ( number = parser.matchPattern( numberPattern ) ) {
						return {
							v: +number
						};
					}
				},
				function getString( parser ) {
					var stringLiteral = getStringLiteral( parser ),
						values;
					if ( stringLiteral && ( values = parser.values ) ) {
						return {
							v: stringLiteral.v.replace( placeholderPattern, function( match, $1 ) {
								return $1 in values ? values[ $1 ] : $1;
							} )
						};
					}
					return stringLiteral;
				},
				function getObject( parser ) {
					var result, pair;
					if ( !parser.matchString( '{' ) ) {
						return null;
					}
					result = {};
					parser.allowWhitespace();
					if ( parser.matchString( '}' ) ) {
						return {
							v: result
						};
					}
					while ( pair = getKeyValuePair( parser ) ) {
						result[ pair.key ] = pair.value;
						parser.allowWhitespace();
						if ( parser.matchString( '}' ) ) {
							return {
								v: result
							};
						}
						if ( !parser.matchString( ',' ) ) {
							return null;
						}
					}
					return null;
				},
				function getArray( parser ) {
					var result, valueToken;
					if ( !parser.matchString( '[' ) ) {
						return null;
					}
					result = [];
					parser.allowWhitespace();
					if ( parser.matchString( ']' ) ) {
						return {
							v: result
						};
					}
					while ( valueToken = parser.read() ) {
						result.push( valueToken.v );
						parser.allowWhitespace();
						if ( parser.matchString( ']' ) ) {
							return {
								v: result
							};
						}
						if ( !parser.matchString( ',' ) ) {
							return null;
						}
						parser.allowWhitespace();
					}
					return null;
				}
			]
		} );

		function getKeyValuePair( parser ) {
			var key, valueToken, pair;
			parser.allowWhitespace();
			key = getKey( parser );
			if ( !key ) {
				return null;
			}
			pair = {
				key: key
			};
			parser.allowWhitespace();
			if ( !parser.matchString( ':' ) ) {
				return null;
			}
			parser.allowWhitespace();
			valueToken = parser.read();
			if ( !valueToken ) {
				return null;
			}
			pair.value = valueToken.v;
			return pair;
		}
		return function( str, values ) {
			var parser = new JsonParser( str, {
				values: values
			} );
			return parser.result;
		};
	}( Parser, stringLiteral, key );

	/* parse/converters/element/processDirective.js */
	var processDirective = function( Parser, conditional, flattenExpression, parseJSON ) {

		var methodCallPattern = /^([a-zA-Z_$][a-zA-Z_$0-9]*)\(/,
			ExpressionParser;
		ExpressionParser = Parser.extend( {
			converters: [ conditional ]
		} );
		// TODO clean this up, it's shocking
		return function( tokens ) {
			var result, match, parser, args, token, colonIndex, directiveName, directiveArgs, parsed;
			if ( typeof tokens === 'string' ) {
				if ( match = methodCallPattern.exec( tokens ) ) {
					result = {
						m: match[ 1 ]
					};
					args = '[' + tokens.slice( result.m.length + 1, -1 ) + ']';
					parser = new ExpressionParser( args );
					result.a = flattenExpression( parser.result[ 0 ] );
					return result;
				}
				if ( tokens.indexOf( ':' ) === -1 ) {
					return tokens.trim();
				}
				tokens = [ tokens ];
			}
			result = {};
			directiveName = [];
			directiveArgs = [];
			while ( tokens.length ) {
				token = tokens.shift();
				if ( typeof token === 'string' ) {
					colonIndex = token.indexOf( ':' );
					if ( colonIndex === -1 ) {
						directiveName.push( token );
					} else {
						// is the colon the first character?
						if ( colonIndex ) {
							// no
							directiveName.push( token.substr( 0, colonIndex ) );
						}
						// if there is anything after the colon in this token, treat
						// it as the first token of the directiveArgs fragment
						if ( token.length > colonIndex + 1 ) {
							directiveArgs[ 0 ] = token.substring( colonIndex + 1 );
						}
						break;
					}
				} else {
					directiveName.push( token );
				}
			}
			directiveArgs = directiveArgs.concat( tokens );
			if ( directiveArgs.length || typeof directiveName !== 'string' ) {
				result = {
					// TODO is this really necessary? just use the array
					n: directiveName.length === 1 && typeof directiveName[ 0 ] === 'string' ? directiveName[ 0 ] : directiveName
				};
				if ( directiveArgs.length === 1 && typeof directiveArgs[ 0 ] === 'string' ) {
					parsed = parseJSON( '[' + directiveArgs[ 0 ] + ']' );
					result.a = parsed ? parsed.value : directiveArgs[ 0 ].trim();
				} else {
					result.d = directiveArgs;
				}
			} else {
				result = directiveName;
			}
			return result;
		};
	}( Parser, conditional, flattenExpression, parseJSON );

	/* parse/converters/element.js */
	var element = function( types, voidElementNames, getMustache, getComment, getText, getClosingTag, getAttribute, processDirective ) {

		var __export;
		var tagNamePattern = /^[a-zA-Z]{1,}:?[a-zA-Z0-9\-]*/,
			validTagNameFollower = /^[\s\n\/>]/,
			onPattern = /^on/,
			proxyEventPattern = /^on-([a-zA-Z\\*\\.$_][a-zA-Z\\*\\.$_0-9\-]+)$/,
			reservedEventNames = /^(?:change|reset|teardown|update|construct|config|init|render|unrender|detach|insert)$/,
			directives = {
				'intro-outro': 't0',
				intro: 't1',
				outro: 't2',
				decorator: 'o'
			},
			exclude = {
				exclude: true
			},
			converters, disallowedContents;
		// Different set of converters, because this time we're looking for closing tags
		converters = [
			getMustache,
			getComment,
			getElement,
			getText,
			getClosingTag
		];
		// based on http://developers.whatwg.org/syntax.html#syntax-tag-omission
		disallowedContents = {
			li: [ 'li' ],
			dt: [
				'dt',
				'dd'
			],
			dd: [
				'dt',
				'dd'
			],
			p: 'address article aside blockquote div dl fieldset footer form h1 h2 h3 h4 h5 h6 header hgroup hr main menu nav ol p pre section table ul'.split( ' ' ),
			rt: [
				'rt',
				'rp'
			],
			rp: [
				'rt',
				'rp'
			],
			optgroup: [ 'optgroup' ],
			option: [
				'option',
				'optgroup'
			],
			thead: [
				'tbody',
				'tfoot'
			],
			tbody: [
				'tbody',
				'tfoot'
			],
			tfoot: [ 'tbody' ],
			tr: [
				'tr',
				'tbody'
			],
			td: [
				'td',
				'th',
				'tr'
			],
			th: [
				'td',
				'th',
				'tr'
			]
		};
		__export = getElement;

		function getElement( parser ) {
			var start, element, lowerCaseName, directiveName, match, addProxyEvent, attribute, directive, selfClosing, children, child;
			start = parser.pos;
			if ( parser.inside ) {
				return null;
			}
			if ( !parser.matchString( '<' ) ) {
				return null;
			}
			// if this is a closing tag, abort straight away
			if ( parser.nextChar() === '/' ) {
				return null;
			}
			element = {
				t: types.ELEMENT
			};
			if ( parser.includeLinePositions ) {
				element.p = parser.getLinePos( start );
			}
			if ( parser.matchString( '!' ) ) {
				element.y = 1;
			}
			// element name
			element.e = parser.matchPattern( tagNamePattern );
			if ( !element.e ) {
				return null;
			}
			// next character must be whitespace, closing solidus or '>'
			if ( !validTagNameFollower.test( parser.nextChar() ) ) {
				parser.error( 'Illegal tag name' );
			}
			addProxyEvent = function( name, directive ) {
				var directiveName = directive.n || directive;
				if ( reservedEventNames.test( directiveName ) ) {
					parser.pos -= directiveName.length;
					parser.error( 'Cannot use reserved event names (change, reset, teardown, update, construct, config, init, render, unrender, detach, insert)' );
				}
				element.v[ name ] = directive;
			};
			parser.allowWhitespace();
			// directives and attributes
			while ( attribute = getMustache( parser ) || getAttribute( parser ) ) {
				// regular attributes
				if ( attribute.name ) {
					// intro, outro, decorator
					if ( directiveName = directives[ attribute.name ] ) {
						element[ directiveName ] = processDirective( attribute.value );
					} else if ( match = proxyEventPattern.exec( attribute.name ) ) {
						if ( !element.v )
							element.v = {};
						directive = processDirective( attribute.value );
						addProxyEvent( match[ 1 ], directive );
					} else {
						if ( !parser.sanitizeEventAttributes || !onPattern.test( attribute.name ) ) {
							if ( !element.a )
								element.a = {};
							element.a[ attribute.name ] = attribute.value || 0;
						}
					}
				} else {
					if ( !element.m )
						element.m = [];
					element.m.push( attribute );
				}
				parser.allowWhitespace();
			}
			// allow whitespace before closing solidus
			parser.allowWhitespace();
			// self-closing solidus?
			if ( parser.matchString( '/' ) ) {
				selfClosing = true;
			}
			// closing angle bracket
			if ( !parser.matchString( '>' ) ) {
				return null;
			}
			lowerCaseName = element.e.toLowerCase();
			if ( !selfClosing && !voidElementNames.test( element.e ) ) {
				// Special case - if we open a script element, further tags should
				// be ignored unless they're a closing script element
				if ( lowerCaseName === 'script' || lowerCaseName === 'style' ) {
					parser.inside = lowerCaseName;
				}
				children = [];
				while ( canContain( lowerCaseName, parser.remaining() ) && ( child = parser.read( converters ) ) ) {
					// Special case - closing section tag
					if ( child.t === types.CLOSING ) {
						break;
					}
					if ( child.t === types.CLOSING_TAG ) {
						break;
					}
					children.push( child );
				}
				if ( children.length ) {
					element.f = children;
				}
			}
			parser.inside = null;
			if ( parser.sanitizeElements && parser.sanitizeElements.indexOf( lowerCaseName ) !== -1 ) {
				return exclude;
			}
			return element;
		}

		function canContain( name, remaining ) {
			var match, disallowed;
			match = /^<([a-zA-Z][a-zA-Z0-9]*)/.exec( remaining );
			disallowed = disallowedContents[ name ];
			if ( !match || !disallowed ) {
				return true;
			}
			return !~disallowed.indexOf( match[ 1 ].toLowerCase() );
		}
		return __export;
	}( types, voidElementNames, mustache, comment, text, closingTag, attribute, processDirective );

	/* parse/utils/trimWhitespace.js */
	var trimWhitespace = function() {

		var leadingWhitespace = /^[ \t\f\r\n]+/,
			trailingWhitespace = /[ \t\f\r\n]+$/;
		return function( items, leading, trailing ) {
			var item;
			if ( leading ) {
				item = items[ 0 ];
				if ( typeof item === 'string' ) {
					item = item.replace( leadingWhitespace, '' );
					if ( !item ) {
						items.shift();
					} else {
						items[ 0 ] = item;
					}
				}
			}
			if ( trailing ) {
				item = items[ items.length - 1 ];
				if ( typeof item === 'string' ) {
					item = item.replace( trailingWhitespace, '' );
					if ( !item ) {
						items.pop();
					} else {
						items[ items.length - 1 ] = item;
					}
				}
			}
		};
	}();

	/* parse/utils/stripStandalones.js */
	var stripStandalones = function( types ) {

		var __export;
		var leadingLinebreak = /^\s*\r?\n/,
			trailingLinebreak = /\r?\n\s*$/;
		__export = function( items ) {
			var i, current, backOne, backTwo, lastSectionItem;
			for ( i = 1; i < items.length; i += 1 ) {
				current = items[ i ];
				backOne = items[ i - 1 ];
				backTwo = items[ i - 2 ];
				// if we're at the end of a [text][comment][text] sequence...
				if ( isString( current ) && isComment( backOne ) && isString( backTwo ) ) {
					// ... and the comment is a standalone (i.e. line breaks either side)...
					if ( trailingLinebreak.test( backTwo ) && leadingLinebreak.test( current ) ) {
						// ... then we want to remove the whitespace after the first line break
						items[ i - 2 ] = backTwo.replace( trailingLinebreak, '\n' );
						// and the leading line break of the second text token
						items[ i ] = current.replace( leadingLinebreak, '' );
					}
				}
				// if the current item is a section, and it is preceded by a linebreak, and
				// its first item is a linebreak...
				if ( isSection( current ) && isString( backOne ) ) {
					if ( trailingLinebreak.test( backOne ) && isString( current.f[ 0 ] ) && leadingLinebreak.test( current.f[ 0 ] ) ) {
						items[ i - 1 ] = backOne.replace( trailingLinebreak, '\n' );
						current.f[ 0 ] = current.f[ 0 ].replace( leadingLinebreak, '' );
					}
				}
				// if the last item was a section, and it is followed by a linebreak, and
				// its last item is a linebreak...
				if ( isString( current ) && isSection( backOne ) ) {
					lastSectionItem = backOne.f[ backOne.f.length - 1 ];
					if ( isString( lastSectionItem ) && trailingLinebreak.test( lastSectionItem ) && leadingLinebreak.test( current ) ) {
						backOne.f[ backOne.f.length - 1 ] = lastSectionItem.replace( trailingLinebreak, '\n' );
						items[ i ] = current.replace( leadingLinebreak, '' );
					}
				}
			}
			return items;
		};

		function isString( item ) {
			return typeof item === 'string';
		}

		function isComment( item ) {
			return item.t === types.COMMENT || item.t === types.DELIMCHANGE;
		}

		function isSection( item ) {
			return ( item.t === types.SECTION || item.t === types.INVERTED ) && item.f;
		}
		return __export;
	}( types );

	/* utils/escapeRegExp.js */
	var escapeRegExp = function() {

		var pattern = /[-/\\^$*+?.()|[\]{}]/g;
		return function escapeRegExp( str ) {
			return str.replace( pattern, '\\$&' );
		};
	}();

	/* parse/_parse.js */
	var parse = function( types, Parser, mustache, comment, element, text, trimWhitespace, stripStandalones, escapeRegExp ) {

		var __export;
		var StandardParser, parse, contiguousWhitespace = /[ \t\f\r\n]+/g,
			preserveWhitespaceElements = /^(?:pre|script|style|textarea)$/i,
			leadingWhitespace = /^\s+/,
			trailingWhitespace = /\s+$/;
		StandardParser = Parser.extend( {
			init: function( str, options ) {
				// config
				setDelimiters( options, this );
				this.sectionDepth = 0;
				this.interpolate = {
					script: !options.interpolate || options.interpolate.script !== false,
					style: !options.interpolate || options.interpolate.style !== false
				};
				if ( options.sanitize === true ) {
					options.sanitize = {
						// blacklist from https://code.google.com/p/google-caja/source/browse/trunk/src/com/google/caja/lang/html/html4-elements-whitelist.json
						elements: 'applet base basefont body frame frameset head html isindex link meta noframes noscript object param script style title'.split( ' ' ),
						eventAttributes: true
					};
				}
				this.sanitizeElements = options.sanitize && options.sanitize.elements;
				this.sanitizeEventAttributes = options.sanitize && options.sanitize.eventAttributes;
				this.includeLinePositions = options.includeLinePositions;
			},
			postProcess: function( items, options ) {
				if ( this.sectionDepth > 0 ) {
					this.error( 'A section was left open' );
				}
				cleanup( items, options.stripComments !== false, options.preserveWhitespace, !options.preserveWhitespace, !options.preserveWhitespace, options.rewriteElse !== false );
				return items;
			},
			converters: [
				mustache,
				comment,
				element,
				text
			]
		} );
		parse = function( template ) {
			var options = arguments[ 1 ];
			if ( options === void 0 )
				options = {};
			var result, remaining, partials, name, startMatch, endMatch, inlinePartialStart, inlinePartialEnd;
			setDelimiters( options );
			inlinePartialStart = new RegExp( '<!--\\s*' + escapeRegExp( options.delimiters[ 0 ] ) + '\\s*>\\s*([a-zA-Z_$][a-zA-Z_$0-9]*)\\s*' + escapeRegExp( options.delimiters[ 1 ] ) + '\\s*-->' );
			inlinePartialEnd = new RegExp( '<!--\\s*' + escapeRegExp( options.delimiters[ 0 ] ) + '\\s*\\/\\s*([a-zA-Z_$][a-zA-Z_$0-9]*)\\s*' + escapeRegExp( options.delimiters[ 1 ] ) + '\\s*-->' );
			result = {
				v: 1
			};
			if ( inlinePartialStart.test( template ) ) {
				remaining = template;
				template = '';
				while ( startMatch = inlinePartialStart.exec( remaining ) ) {
					name = startMatch[ 1 ];
					template += remaining.substr( 0, startMatch.index );
					remaining = remaining.substring( startMatch.index + startMatch[ 0 ].length );
					endMatch = inlinePartialEnd.exec( remaining );
					if ( !endMatch || endMatch[ 1 ] !== name ) {
						throw new Error( 'Inline partials must have a closing delimiter, and cannot be nested. Expected closing for "' + name + '", but ' + ( endMatch ? 'instead found "' + endMatch[ 1 ] + '"' : ' no closing found' ) );
					}
					( partials || ( partials = {} ) )[ name ] = new StandardParser( remaining.substr( 0, endMatch.index ), options ).result;
					remaining = remaining.substring( endMatch.index + endMatch[ 0 ].length );
				}
				template += remaining;
				result.p = partials;
			}
			result.t = new StandardParser( template, options ).result;
			return result;
		};
		__export = parse;

		function cleanup( items, stripComments, preserveWhitespace, removeLeadingWhitespace, removeTrailingWhitespace, rewriteElse ) {
			var i, item, previousItem, nextItem, preserveWhitespaceInsideFragment, removeLeadingWhitespaceInsideFragment, removeTrailingWhitespaceInsideFragment, unlessBlock, key;
			// First pass - remove standalones and comments etc
			stripStandalones( items );
			i = items.length;
			while ( i-- ) {
				item = items[ i ];
				// Remove delimiter changes, unsafe elements etc
				if ( item.exclude ) {
					items.splice( i, 1 );
				} else if ( stripComments && item.t === types.COMMENT ) {
					items.splice( i, 1 );
				}
			}
			// If necessary, remove leading and trailing whitespace
			trimWhitespace( items, removeLeadingWhitespace, removeTrailingWhitespace );
			i = items.length;
			while ( i-- ) {
				item = items[ i ];
				// Recurse
				if ( item.f ) {
					preserveWhitespaceInsideFragment = preserveWhitespace || item.t === types.ELEMENT && preserveWhitespaceElements.test( item.e );
					if ( !preserveWhitespaceInsideFragment ) {
						previousItem = items[ i - 1 ];
						nextItem = items[ i + 1 ];
						// if the previous item was a text item with trailing whitespace,
						// remove leading whitespace inside the fragment
						if ( !previousItem || typeof previousItem === 'string' && trailingWhitespace.test( previousItem ) ) {
							removeLeadingWhitespaceInsideFragment = true;
						}
						// and vice versa
						if ( !nextItem || typeof nextItem === 'string' && leadingWhitespace.test( nextItem ) ) {
							removeTrailingWhitespaceInsideFragment = true;
						}
					}
					cleanup( item.f, stripComments, preserveWhitespaceInsideFragment, removeLeadingWhitespaceInsideFragment, removeTrailingWhitespaceInsideFragment, rewriteElse );
				}
				// Split if-else blocks into two (an if, and an unless)
				if ( item.l ) {
					cleanup( item.l, stripComments, preserveWhitespace, removeLeadingWhitespaceInsideFragment, removeTrailingWhitespaceInsideFragment, rewriteElse );
					if ( rewriteElse ) {
						unlessBlock = {
							t: 4,
							n: types.SECTION_UNLESS,
							f: item.l
						};
						// copy the conditional based on its type
						if ( item.r ) {
							unlessBlock.r = item.r;
						}
						if ( item.x ) {
							unlessBlock.x = item.x;
						}
						if ( item.rx ) {
							unlessBlock.rx = item.rx;
						}
						items.splice( i + 1, 0, unlessBlock );
						delete item.l;
					}
				}
				// Clean up element attributes
				if ( item.a ) {
					for ( key in item.a ) {
						if ( item.a.hasOwnProperty( key ) && typeof item.a[ key ] !== 'string' ) {
							cleanup( item.a[ key ], stripComments, preserveWhitespace, removeLeadingWhitespaceInsideFragment, removeTrailingWhitespaceInsideFragment, rewriteElse );
						}
					}
				}
			}
			// final pass - fuse text nodes together
			i = items.length;
			while ( i-- ) {
				if ( typeof items[ i ] === 'string' ) {
					if ( typeof items[ i + 1 ] === 'string' ) {
						items[ i ] = items[ i ] + items[ i + 1 ];
						items.splice( i + 1, 1 );
					}
					if ( !preserveWhitespace ) {
						items[ i ] = items[ i ].replace( contiguousWhitespace, ' ' );
					}
					if ( items[ i ] === '' ) {
						items.splice( i, 1 );
					}
				}
			}
		}

		function setDelimiters( source ) {
			var target = arguments[ 1 ];
			if ( target === void 0 )
				target = source;
			target.delimiters = source.delimiters || [
				'{{',
				'}}'
			];
			target.tripleDelimiters = source.tripleDelimiters || [
				'{{{',
				'}}}'
			];
			target.staticDelimiters = source.staticDelimiters || [
				'[[',
				']]'
			];
			target.staticTripleDelimiters = source.staticTripleDelimiters || [
				'[[[',
				']]]'
			];
		}
		return __export;
	}( types, Parser, mustache, comment, element, text, trimWhitespace, stripStandalones, escapeRegExp );

	/* config/options/groups/optionGroup.js */
	var optionGroup = function() {

		return function createOptionGroup( keys, config ) {
			var group = keys.map( config );
			keys.forEach( function( key, i ) {
				group[ key ] = group[ i ];
			} );
			return group;
		};
	}( legacy );

	/* config/options/groups/parseOptions.js */
	var parseOptions = function( optionGroup ) {

		var keys, parseOptions;
		keys = [
			'preserveWhitespace',
			'sanitize',
			'stripComments',
			'delimiters',
			'tripleDelimiters',
			'interpolate'
		];
		parseOptions = optionGroup( keys, function( key ) {
			return key;
		} );
		return parseOptions;
	}( optionGroup );

	/* config/options/template/parser.js */
	var parser = function( errors, isClient, parse, create, parseOptions ) {

		var parser = {
			parse: doParse,
			fromId: fromId,
			isHashedId: isHashedId,
			isParsed: isParsed,
			getParseOptions: getParseOptions,
			createHelper: createHelper
		};

		function createHelper( parseOptions ) {
			var helper = create( parser );
			helper.parse = function( template, options ) {
				return doParse( template, options || parseOptions );
			};
			return helper;
		}

		function doParse( template, parseOptions ) {
			if ( !parse ) {
				throw new Error( errors.missingParser );
			}
			return parse( template, parseOptions || this.options );
		}

		function fromId( id, options ) {
			var template;
			if ( !isClient ) {
				if ( options && options.noThrow ) {
					return;
				}
				throw new Error( 'Cannot retrieve template #' + id + ' as Ractive is not running in a browser.' );
			}
			if ( isHashedId( id ) ) {
				id = id.substring( 1 );
			}
			if ( !( template = document.getElementById( id ) ) ) {
				if ( options && options.noThrow ) {
					return;
				}
				throw new Error( 'Could not find template element with id #' + id );
			}
			if ( template.tagName.toUpperCase() !== 'SCRIPT' ) {
				if ( options && options.noThrow ) {
					return;
				}
				throw new Error( 'Template element with id #' + id + ', must be a <script> element' );
			}
			return template.innerHTML;
		}

		function isHashedId( id ) {
			return id.charAt( 0 ) === '#';
		}

		function isParsed( template ) {
			return !( typeof template === 'string' );
		}

		function getParseOptions( ractive ) {
			// Could be Ractive or a Component
			if ( ractive.defaults ) {
				ractive = ractive.defaults;
			}
			return parseOptions.reduce( function( val, key ) {
				val[ key ] = ractive[ key ];
				return val;
			}, {} );
		}
		return parser;
	}( errors, isClient, parse, create, parseOptions );

	/* config/options/template/template.js */
	var template = function( parser, parse ) {

		var templateConfig = {
			name: 'template',
			extend: function extend( Parent, proto, options ) {
				var template;
				// only assign if exists
				if ( 'template' in options ) {
					template = options.template;
					if ( typeof template === 'function' ) {
						proto.template = template;
					} else {
						proto.template = parseIfString( template, proto );
					}
				}
			},
			init: function init( Parent, ractive, options ) {
				var template, fn;
				// TODO because of prototypal inheritance, we might just be able to use
				// ractive.template, and not bother passing through the Parent object.
				// At present that breaks the test mocks' expectations
				template = 'template' in options ? options.template : Parent.prototype.template;
				if ( typeof template === 'function' ) {
					fn = template;
					template = getDynamicTemplate( ractive, fn );
					ractive._config.template = {
						fn: fn,
						result: template
					};
				}
				template = parseIfString( template, ractive );
				// TODO the naming of this is confusing - ractive.template refers to [...],
				// but Component.prototype.template refers to {v:1,t:[],p:[]}...
				// it's unnecessary, because the developer never needs to access
				// ractive.template
				ractive.template = template.t;
				if ( template.p ) {
					extendPartials( ractive.partials, template.p );
				}
			},
			reset: function( ractive ) {
				var result = resetValue( ractive ),
					parsed;
				if ( result ) {
					parsed = parseIfString( result, ractive );
					ractive.template = parsed.t;
					extendPartials( ractive.partials, parsed.p, true );
					return true;
				}
			}
		};

		function resetValue( ractive ) {
			var initial = ractive._config.template,
				result;
			// If this isn't a dynamic template, there's nothing to do
			if ( !initial || !initial.fn ) {
				return;
			}
			result = getDynamicTemplate( ractive, initial.fn );
			// TODO deep equality check to prevent unnecessary re-rendering
			// in the case of already-parsed templates
			if ( result !== initial.result ) {
				initial.result = result;
				result = parseIfString( result, ractive );
				return result;
			}
		}

		function getDynamicTemplate( ractive, fn ) {
			var helper = parser.createHelper( parser.getParseOptions( ractive ) );
			return fn.call( ractive, ractive.data, helper );
		}

		function parseIfString( template, ractive ) {
			if ( typeof template === 'string' ) {
				// ID of an element containing the template?
				if ( template[ 0 ] === '#' ) {
					template = parser.fromId( template );
				}
				template = parse( template, parser.getParseOptions( ractive ) );
			} else if ( template.v !== 1 ) {
				throw new Error( 'Mismatched template version! Please ensure you are using the latest version of Ractive.js in your build process as well as in your app' );
			}
			return template;
		}

		function extendPartials( existingPartials, newPartials, overwrite ) {
			if ( !newPartials )
				return;
			// TODO there's an ambiguity here - we need to overwrite in the `reset()`
			// case, but not initially...
			for ( var key in newPartials ) {
				if ( overwrite || !existingPartials.hasOwnProperty( key ) ) {
					existingPartials[ key ] = newPartials[ key ];
				}
			}
		}
		return templateConfig;
	}( parser, parse );

	/* config/options/Registry.js */
	var Registry = function( create ) {

		function Registry( name, useDefaults ) {
			this.name = name;
			this.useDefaults = useDefaults;
		}
		Registry.prototype = {
			constructor: Registry,
			extend: function( Parent, proto, options ) {
				this.configure( this.useDefaults ? Parent.defaults : Parent, this.useDefaults ? proto : proto.constructor, options );
			},
			init: function( Parent, ractive, options ) {
				this.configure( this.useDefaults ? Parent.defaults : Parent, ractive, options );
			},
			configure: function( Parent, target, options ) {
				var name = this.name,
					option = options[ name ],
					registry;
				registry = create( Parent[ name ] );
				for ( var key in option ) {
					registry[ key ] = option[ key ];
				}
				target[ name ] = registry;
			},
			reset: function( ractive ) {
				var registry = ractive[ this.name ];
				var changed = false;
				Object.keys( registry ).forEach( function( key ) {
					var item = registry[ key ];
					if ( item._fn ) {
						if ( item._fn.isOwner ) {
							registry[ key ] = item._fn;
						} else {
							delete registry[ key ];
						}
						changed = true;
					}
				} );
				return changed;
			},
			findOwner: function( ractive, key ) {
				return ractive[ this.name ].hasOwnProperty( key ) ? ractive : this.findConstructor( ractive.constructor, key );
			},
			findConstructor: function( constructor, key ) {
				if ( !constructor ) {
					return;
				}
				return constructor[ this.name ].hasOwnProperty( key ) ? constructor : this.findConstructor( constructor._parent, key );
			},
			find: function( ractive, key ) {
				var this$0 = this;
				return recurseFind( ractive, function( r ) {
					return r[ this$0.name ][ key ];
				} );
			},
			findInstance: function( ractive, key ) {
				var this$0 = this;
				return recurseFind( ractive, function( r ) {
					return r[ this$0.name ][ key ] ? r : void 0;
				} );
			}
		};

		function recurseFind( ractive, fn ) {
			var find, parent;
			if ( find = fn( ractive ) ) {
				return find;
			}
			if ( !ractive.isolated && ( parent = ractive._parent ) ) {
				return recurseFind( parent, fn );
			}
		}
		return Registry;
	}( create, legacy );

	/* config/options/groups/registries.js */
	var registries = function( optionGroup, Registry ) {

		var keys = [
				'adaptors',
				'components',
				'computed',
				'decorators',
				'easing',
				'events',
				'interpolators',
				'partials',
				'transitions'
			],
			registries = optionGroup( keys, function( key ) {
				return new Registry( key, key === 'computed' );
			} );
		return registries;
	}( optionGroup, Registry );

	/* utils/noop.js */
	var noop = function() {};

	/* utils/wrapPrototypeMethod.js */
	var wrapPrototypeMethod = function( noop ) {

		var __export;
		__export = function wrap( parent, name, method ) {
			if ( !/_super/.test( method ) ) {
				return method;
			}
			var wrapper = function wrapSuper() {
				var superMethod = getSuperMethod( wrapper._parent, name ),
					hasSuper = '_super' in this,
					oldSuper = this._super,
					result;
				this._super = superMethod;
				result = method.apply( this, arguments );
				if ( hasSuper ) {
					this._super = oldSuper;
				} else {
					delete this._super;
				}
				return result;
			};
			wrapper._parent = parent;
			wrapper._method = method;
			return wrapper;
		};

		function getSuperMethod( parent, name ) {
			var method;
			if ( name in parent ) {
				var value = parent[ name ];
				if ( typeof value === 'function' ) {
					method = value;
				} else {
					method = function returnValue() {
						return value;
					};
				}
			} else {
				method = noop;
			}
			return method;
		}
		return __export;
	}( noop );

	/* config/deprecate.js */
	var deprecate = function( warn, isArray ) {

		function deprecate( options, deprecated, correct ) {
			if ( deprecated in options ) {
				if ( !( correct in options ) ) {
					warn( getMessage( deprecated, correct ) );
					options[ correct ] = options[ deprecated ];
				} else {
					throw new Error( getMessage( deprecated, correct, true ) );
				}
			}
		}

		function getMessage( deprecated, correct, isError ) {
			return 'options.' + deprecated + ' has been deprecated in favour of options.' + correct + '.' + ( isError ? ' You cannot specify both options, please use options.' + correct + '.' : '' );
		}

		function deprecateEventDefinitions( options ) {
			deprecate( options, 'eventDefinitions', 'events' );
		}

		function deprecateAdaptors( options ) {
			// Using extend with Component instead of options,
			// like Human.extend( Spider ) means adaptors as a registry
			// gets copied to options. So we have to check if actually an array
			if ( isArray( options.adaptors ) ) {
				deprecate( options, 'adaptors', 'adapt' );
			}
		}
		return function deprecateOptions( options ) {
			deprecateEventDefinitions( options );
			deprecateAdaptors( options );
		};
	}( warn, isArray );

	/* config/config.js */
	var config = function( css, data, defaults, template, parseOptions, registries, wrapPrototype, deprecate ) {

		var custom, options, config, blacklisted;
		// would be nice to not have these here,
		// they get added during initialise, so for now we have
		// to make sure not to try and extend them.
		// Possibly, we could re-order and not add till later
		// in process.
		blacklisted = {
			'_parent': true,
			'_component': true
		};
		custom = {
			data: data,
			template: template,
			css: css
		};
		options = Object.keys( defaults ).filter( function( key ) {
			return !registries[ key ] && !custom[ key ] && !parseOptions[ key ];
		} );
		// this defines the order:
		config = [].concat( custom.data, parseOptions, options, registries, custom.template, custom.css );
		for ( var key in custom ) {
			config[ key ] = custom[ key ];
		}
		// for iteration
		config.keys = Object.keys( defaults ).concat( registries.map( function( r ) {
			return r.name;
		} ) ).concat( [ 'css' ] );
		// add these to blacklisted key's that we don't double extend
		config.keys.forEach( function( key ) {
			return blacklisted[ key ] = true;
		} );
		config.parseOptions = parseOptions;
		config.registries = registries;

		function customConfig( method, key, Parent, instance, options ) {
			custom[ key ][ method ]( Parent, instance, options );
		}
		config.extend = function( Parent, proto, options ) {
			configure( 'extend', Parent, proto, options );
		};
		config.init = function( Parent, ractive, options ) {
			configure( 'init', Parent, ractive, options );
		};

		function isStandardDefaultKey( key ) {
			return key in defaults && !( key in config.parseOptions ) && !( key in custom );
		}

		function configure( method, Parent, instance, options ) {
			deprecate( options );
			customConfig( method, 'data', Parent, instance, options );
			config.parseOptions.forEach( function( key ) {
				if ( key in options ) {
					instance[ key ] = options[ key ];
				}
			} );
			for ( var key in options ) {
				if ( isStandardDefaultKey( key ) ) {
					var value = options[ key ];
					instance[ key ] = typeof value === 'function' ? wrapPrototype( Parent.prototype, key, value ) : value;
				}
			}
			config.registries.forEach( function( registry ) {
				registry[ method ]( Parent, instance, options );
			} );
			customConfig( method, 'template', Parent, instance, options );
			customConfig( method, 'css', Parent, instance, options );
			extendOtherMethods( Parent.prototype, instance, options );
		}

		function extendOtherMethods( parent, instance, options ) {
			for ( var key in options ) {
				if ( !( key in blacklisted ) && options.hasOwnProperty( key ) ) {
					var member = options[ key ];
					// if this is a method that overwrites a method, wrap it:
					if ( typeof member === 'function' ) {
						member = wrapPrototype( parent, key, member );
					}
					instance[ key ] = member;
				}
			}
		}
		config.reset = function( ractive ) {
			return config.filter( function( c ) {
				return c.reset && c.reset( ractive );
			} ).map( function( c ) {
				return c.name;
			} );
		};
		config.getConstructTarget = function( ractive, options ) {
			if ( options.onconstruct ) {
				// pretend this object literal is the ractive instance
				return {
					onconstruct: wrapPrototype( ractive, 'onconstruct', options.onconstruct ).bind( ractive ),
					fire: ractive.fire.bind( ractive )
				};
			} else {
				return ractive;
			}
		};
		return config;
	}( css, data, options, template, parseOptions, registries, wrapPrototypeMethod, deprecate );

	/* shared/interpolate.js */
	var interpolate = function( circular, warn, interpolators, config ) {

		var __export;
		var interpolate = function( from, to, ractive, type ) {
			if ( from === to ) {
				return snap( to );
			}
			if ( type ) {
				var interpol = config.registries.interpolators.find( ractive, type );
				if ( interpol ) {
					return interpol( from, to ) || snap( to );
				}
				warn( 'Missing "' + type + '" interpolator. You may need to download a plugin from [TODO]' );
			}
			return interpolators.number( from, to ) || interpolators.array( from, to ) || interpolators.object( from, to ) || snap( to );
		};
		circular.interpolate = interpolate;
		__export = interpolate;

		function snap( to ) {
			return function() {
				return to;
			};
		}
		return __export;
	}( circular, warn, interpolators, config );

	/* Ractive/prototype/animate/Animation.js */
	var Ractive$animate_Animation = function( warn, runloop, interpolate ) {

		var Animation = function( options ) {
			var key;
			this.startTime = Date.now();
			// from and to
			for ( key in options ) {
				if ( options.hasOwnProperty( key ) ) {
					this[ key ] = options[ key ];
				}
			}
			this.interpolator = interpolate( this.from, this.to, this.root, this.interpolator );
			this.running = true;
			this.tick();
		};
		Animation.prototype = {
			tick: function() {
				var elapsed, t, value, timeNow, index, keypath;
				keypath = this.keypath;
				if ( this.running ) {
					timeNow = Date.now();
					elapsed = timeNow - this.startTime;
					if ( elapsed >= this.duration ) {
						if ( keypath !== null ) {
							runloop.start( this.root );
							this.root.viewmodel.set( keypath, this.to );
							runloop.end();
						}
						if ( this.step ) {
							this.step( 1, this.to );
						}
						this.complete( this.to );
						index = this.root._animations.indexOf( this );
						// TODO investigate why this happens
						if ( index === -1 ) {
							warn( 'Animation was not found' );
						}
						this.root._animations.splice( index, 1 );
						this.running = false;
						return false;
					}
					t = this.easing ? this.easing( elapsed / this.duration ) : elapsed / this.duration;
					if ( keypath !== null ) {
						value = this.interpolator( t );
						runloop.start( this.root );
						this.root.viewmodel.set( keypath, value );
						runloop.end();
					}
					if ( this.step ) {
						this.step( t, value );
					}
					return true;
				}
				return false;
			},
			stop: function() {
				var index;
				this.running = false;
				index = this.root._animations.indexOf( this );
				// TODO investigate why this happens
				if ( index === -1 ) {
					warn( 'Animation was not found' );
				}
				this.root._animations.splice( index, 1 );
			}
		};
		return Animation;
	}( warn, runloop, interpolate );

	/* Ractive/prototype/animate.js */
	var Ractive$animate = function( isEqual, Promise, normaliseKeypath, animations, Animation ) {

		var __export;
		var noop = function() {},
			noAnimation = {
				stop: noop
			};
		__export = function Ractive$animate( keypath, to, options ) {
			var promise, fulfilPromise, k, animation, animations, easing, duration, step, complete, makeValueCollector, currentValues, collectValue, dummy, dummyOptions;
			promise = new Promise( function( fulfil ) {
				fulfilPromise = fulfil;
			} );
			// animate multiple keypaths
			if ( typeof keypath === 'object' ) {
				options = to || {};
				easing = options.easing;
				duration = options.duration;
				animations = [];
				// we don't want to pass the `step` and `complete` handlers, as they will
				// run for each animation! So instead we'll store the handlers and create
				// our own...
				step = options.step;
				complete = options.complete;
				if ( step || complete ) {
					currentValues = {};
					options.step = null;
					options.complete = null;
					makeValueCollector = function( keypath ) {
						return function( t, value ) {
							currentValues[ keypath ] = value;
						};
					};
				}
				for ( k in keypath ) {
					if ( keypath.hasOwnProperty( k ) ) {
						if ( step || complete ) {
							collectValue = makeValueCollector( k );
							options = {
								easing: easing,
								duration: duration
							};
							if ( step ) {
								options.step = collectValue;
							}
						}
						options.complete = complete ? collectValue : noop;
						animations.push( animate( this, k, keypath[ k ], options ) );
					}
				}
				// Create a dummy animation, to facilitate step/complete
				// callbacks, and Promise fulfilment
				dummyOptions = {
					easing: easing,
					duration: duration
				};
				if ( step ) {
					dummyOptions.step = function( t ) {
						step( t, currentValues );
					};
				}
				if ( complete ) {
					promise.then( function( t ) {
						complete( t, currentValues );
					} );
				}
				dummyOptions.complete = fulfilPromise;
				dummy = animate( this, null, null, dummyOptions );
				animations.push( dummy );
				promise.stop = function() {
					var animation;
					while ( animation = animations.pop() ) {
						animation.stop();
					}
					if ( dummy ) {
						dummy.stop();
					}
				};
				return promise;
			}
			// animate a single keypath
			options = options || {};
			if ( options.complete ) {
				promise.then( options.complete );
			}
			options.complete = fulfilPromise;
			animation = animate( this, keypath, to, options );
			promise.stop = function() {
				animation.stop();
			};
			return promise;
		};

		function animate( root, keypath, to, options ) {
			var easing, duration, animation, from;
			if ( keypath ) {
				keypath = normaliseKeypath( keypath );
			}
			if ( keypath !== null ) {
				from = root.viewmodel.get( keypath );
			}
			// cancel any existing animation
			// TODO what about upstream/downstream keypaths?
			animations.abort( keypath, root );
			// don't bother animating values that stay the same
			if ( isEqual( from, to ) ) {
				if ( options.complete ) {
					options.complete( options.to );
				}
				return noAnimation;
			}
			// easing function
			if ( options.easing ) {
				if ( typeof options.easing === 'function' ) {
					easing = options.easing;
				} else {
					easing = root.easing[ options.easing ];
				}
				if ( typeof easing !== 'function' ) {
					easing = null;
				}
			}
			// duration
			duration = options.duration === undefined ? 400 : options.duration;
			// TODO store keys, use an internal set method
			animation = new Animation( {
				keypath: keypath,
				from: from,
				to: to,
				root: root,
				duration: duration,
				easing: easing,
				interpolator: options.interpolator,
				// TODO wrap callbacks if necessary, to use instance as context
				step: options.step,
				complete: options.complete
			} );
			animations.add( animation );
			root._animations.push( animation );
			return animation;
		}
		return __export;
	}( isEqual, Promise, normaliseKeypath, animations, Ractive$animate_Animation );

	/* Ractive/prototype/detach.js */
	var Ractive$detach = function( Hook, removeFromArray ) {

		var detachHook = new Hook( 'detach' );
		return function Ractive$detach() {
			if ( this.detached ) {
				return this.detached;
			}
			if ( this.el ) {
				removeFromArray( this.el.__ractive_instances__, this );
			}
			this.detached = this.fragment.detach();
			detachHook.fire( this );
			return this.detached;
		};
	}( Ractive$shared_hooks_Hook, removeFromArray );

	/* Ractive/prototype/find.js */
	var Ractive$find = function Ractive$find( selector ) {
		if ( !this.el ) {
			return null;
		}
		return this.fragment.find( selector );
	};

	/* utils/matches.js */
	var matches = function( isClient, vendors, createElement ) {

		var matches, div, methodNames, unprefixed, prefixed, i, j, makeFunction;
		if ( !isClient ) {
			matches = null;
		} else {
			div = createElement( 'div' );
			methodNames = [
				'matches',
				'matchesSelector'
			];
			makeFunction = function( methodName ) {
				return function( node, selector ) {
					return node[ methodName ]( selector );
				};
			};
			i = methodNames.length;
			while ( i-- && !matches ) {
				unprefixed = methodNames[ i ];
				if ( div[ unprefixed ] ) {
					matches = makeFunction( unprefixed );
				} else {
					j = vendors.length;
					while ( j-- ) {
						prefixed = vendors[ i ] + unprefixed.substr( 0, 1 ).toUpperCase() + unprefixed.substring( 1 );
						if ( div[ prefixed ] ) {
							matches = makeFunction( prefixed );
							break;
						}
					}
				}
			}
			// IE8...
			if ( !matches ) {
				matches = function( node, selector ) {
					var nodes, parentNode, i;
					parentNode = node.parentNode;
					if ( !parentNode ) {
						// empty dummy <div>
						div.innerHTML = '';
						parentNode = div;
						node = node.cloneNode();
						div.appendChild( node );
					}
					nodes = parentNode.querySelectorAll( selector );
					i = nodes.length;
					while ( i-- ) {
						if ( nodes[ i ] === node ) {
							return true;
						}
					}
					return false;
				};
			}
		}
		return matches;
	}( isClient, vendors, createElement );

	/* Ractive/prototype/shared/makeQuery/test.js */
	var Ractive$shared_makeQuery_test = function( matches ) {

		return function( item, noDirty ) {
			var itemMatches = this._isComponentQuery ? !this.selector || item.name === this.selector : matches( item.node, this.selector );
			if ( itemMatches ) {
				this.push( item.node || item.instance );
				if ( !noDirty ) {
					this._makeDirty();
				}
				return true;
			}
		};
	}( matches );

	/* Ractive/prototype/shared/makeQuery/cancel.js */
	var Ractive$shared_makeQuery_cancel = function() {
		var liveQueries, selector, index;
		liveQueries = this._root[ this._isComponentQuery ? 'liveComponentQueries' : 'liveQueries' ];
		selector = this.selector;
		index = liveQueries.indexOf( selector );
		if ( index !== -1 ) {
			liveQueries.splice( index, 1 );
			liveQueries[ selector ] = null;
		}
	};

	/* Ractive/prototype/shared/makeQuery/sortByItemPosition.js */
	var Ractive$shared_makeQuery_sortByItemPosition = function() {

		var __export;
		__export = function( a, b ) {
			var ancestryA, ancestryB, oldestA, oldestB, mutualAncestor, indexA, indexB, fragments, fragmentA, fragmentB;
			ancestryA = getAncestry( a.component || a._ractive.proxy );
			ancestryB = getAncestry( b.component || b._ractive.proxy );
			oldestA = ancestryA[ ancestryA.length - 1 ];
			oldestB = ancestryB[ ancestryB.length - 1 ];
			// remove items from the end of both ancestries as long as they are identical
			// - the final one removed is the closest mutual ancestor
			while ( oldestA && oldestA === oldestB ) {
				ancestryA.pop();
				ancestryB.pop();
				mutualAncestor = oldestA;
				oldestA = ancestryA[ ancestryA.length - 1 ];
				oldestB = ancestryB[ ancestryB.length - 1 ];
			}
			// now that we have the mutual ancestor, we can find which is earliest
			oldestA = oldestA.component || oldestA;
			oldestB = oldestB.component || oldestB;
			fragmentA = oldestA.parentFragment;
			fragmentB = oldestB.parentFragment;
			// if both items share a parent fragment, our job is easy
			if ( fragmentA === fragmentB ) {
				indexA = fragmentA.items.indexOf( oldestA );
				indexB = fragmentB.items.indexOf( oldestB );
				// if it's the same index, it means one contains the other,
				// so we see which has the longest ancestry
				return indexA - indexB || ancestryA.length - ancestryB.length;
			}
			// if mutual ancestor is a section, we first test to see which section
			// fragment comes first
			if ( fragments = mutualAncestor.fragments ) {
				indexA = fragments.indexOf( fragmentA );
				indexB = fragments.indexOf( fragmentB );
				return indexA - indexB || ancestryA.length - ancestryB.length;
			}
			throw new Error( 'An unexpected condition was met while comparing the position of two components. Please file an issue at https://github.com/RactiveJS/Ractive/issues - thanks!' );
		};

		function getParent( item ) {
			var parentFragment;
			if ( parentFragment = item.parentFragment ) {
				return parentFragment.owner;
			}
			if ( item.component && ( parentFragment = item.component.parentFragment ) ) {
				return parentFragment.owner;
			}
		}

		function getAncestry( item ) {
			var ancestry, ancestor;
			ancestry = [ item ];
			ancestor = getParent( item );
			while ( ancestor ) {
				ancestry.push( ancestor );
				ancestor = getParent( ancestor );
			}
			return ancestry;
		}
		return __export;
	}();

	/* Ractive/prototype/shared/makeQuery/sortByDocumentPosition.js */
	var Ractive$shared_makeQuery_sortByDocumentPosition = function( sortByItemPosition ) {

		return function( node, otherNode ) {
			var bitmask;
			if ( node.compareDocumentPosition ) {
				bitmask = node.compareDocumentPosition( otherNode );
				return bitmask & 2 ? 1 : -1;
			}
			// In old IE, we can piggy back on the mechanism for
			// comparing component positions
			return sortByItemPosition( node, otherNode );
		};
	}( Ractive$shared_makeQuery_sortByItemPosition );

	/* Ractive/prototype/shared/makeQuery/sort.js */
	var Ractive$shared_makeQuery_sort = function( sortByDocumentPosition, sortByItemPosition ) {

		return function() {
			this.sort( this._isComponentQuery ? sortByItemPosition : sortByDocumentPosition );
			this._dirty = false;
		};
	}( Ractive$shared_makeQuery_sortByDocumentPosition, Ractive$shared_makeQuery_sortByItemPosition );

	/* Ractive/prototype/shared/makeQuery/dirty.js */
	var Ractive$shared_makeQuery_dirty = function( runloop ) {

		return function() {
			var this$0 = this;
			if ( !this._dirty ) {
				this._dirty = true;
				// Once the DOM has been updated, ensure the query
				// is correctly ordered
				runloop.scheduleTask( function() {
					this$0._sort();
				} );
			}
		};
	}( runloop );

	/* Ractive/prototype/shared/makeQuery/remove.js */
	var Ractive$shared_makeQuery_remove = function( nodeOrComponent ) {
		var index = this.indexOf( this._isComponentQuery ? nodeOrComponent.instance : nodeOrComponent );
		if ( index !== -1 ) {
			this.splice( index, 1 );
		}
	};

	/* Ractive/prototype/shared/makeQuery/_makeQuery.js */
	var Ractive$shared_makeQuery__makeQuery = function( defineProperties, test, cancel, sort, dirty, remove ) {

		return function makeQuery( ractive, selector, live, isComponentQuery ) {
			var query = [];
			defineProperties( query, {
				selector: {
					value: selector
				},
				live: {
					value: live
				},
				_isComponentQuery: {
					value: isComponentQuery
				},
				_test: {
					value: test
				}
			} );
			if ( !live ) {
				return query;
			}
			defineProperties( query, {
				cancel: {
					value: cancel
				},
				_root: {
					value: ractive
				},
				_sort: {
					value: sort
				},
				_makeDirty: {
					value: dirty
				},
				_remove: {
					value: remove
				},
				_dirty: {
					value: false,
					writable: true
				}
			} );
			return query;
		};
	}( defineProperties, Ractive$shared_makeQuery_test, Ractive$shared_makeQuery_cancel, Ractive$shared_makeQuery_sort, Ractive$shared_makeQuery_dirty, Ractive$shared_makeQuery_remove );

	/* Ractive/prototype/findAll.js */
	var Ractive$findAll = function( makeQuery ) {

		return function Ractive$findAll( selector, options ) {
			var liveQueries, query;
			if ( !this.el ) {
				return [];
			}
			options = options || {};
			liveQueries = this._liveQueries;
			// Shortcut: if we're maintaining a live query with this
			// selector, we don't need to traverse the parallel DOM
			if ( query = liveQueries[ selector ] ) {
				// Either return the exact same query, or (if not live) a snapshot
				return options && options.live ? query : query.slice();
			}
			query = makeQuery( this, selector, !!options.live, false );
			// Add this to the list of live queries Ractive needs to maintain,
			// if applicable
			if ( query.live ) {
				liveQueries.push( selector );
				liveQueries[ '_' + selector ] = query;
			}
			this.fragment.findAll( selector, query );
			return query;
		};
	}( Ractive$shared_makeQuery__makeQuery );

	/* Ractive/prototype/findAllComponents.js */
	var Ractive$findAllComponents = function( makeQuery ) {

		return function Ractive$findAllComponents( selector, options ) {
			var liveQueries, query;
			options = options || {};
			liveQueries = this._liveComponentQueries;
			// Shortcut: if we're maintaining a live query with this
			// selector, we don't need to traverse the parallel DOM
			if ( query = liveQueries[ selector ] ) {
				// Either return the exact same query, or (if not live) a snapshot
				return options && options.live ? query : query.slice();
			}
			query = makeQuery( this, selector, !!options.live, true );
			// Add this to the list of live queries Ractive needs to maintain,
			// if applicable
			if ( query.live ) {
				liveQueries.push( selector );
				liveQueries[ '_' + selector ] = query;
			}
			this.fragment.findAllComponents( selector, query );
			return query;
		};
	}( Ractive$shared_makeQuery__makeQuery );

	/* Ractive/prototype/findComponent.js */
	var Ractive$findComponent = function Ractive$findComponent( selector ) {
		return this.fragment.findComponent( selector );
	};

	/* utils/getPotentialWildcardMatches.js */
	var getPotentialWildcardMatches = function() {

		var __export;
		var starMaps = {};
		// This function takes a keypath such as 'foo.bar.baz', and returns
		// all the variants of that keypath that include a wildcard in place
		// of a key, such as 'foo.bar.*', 'foo.*.baz', 'foo.*.*' and so on.
		// These are then checked against the dependants map (ractive.viewmodel.depsMap)
		// to see if any pattern observers are downstream of one or more of
		// these wildcard keypaths (e.g. 'foo.bar.*.status')
		__export = function getPotentialWildcardMatches( keypath ) {
			var keys, starMap, mapper, i, result, wildcardKeypath;
			keys = keypath.split( '.' );
			if ( !( starMap = starMaps[ keys.length ] ) ) {
				starMap = getStarMap( keys.length );
			}
			result = [];
			mapper = function( star, i ) {
				return star ? '*' : keys[ i ];
			};
			i = starMap.length;
			while ( i-- ) {
				wildcardKeypath = starMap[ i ].map( mapper ).join( '.' );
				if ( !result.hasOwnProperty( wildcardKeypath ) ) {
					result.push( wildcardKeypath );
					result[ wildcardKeypath ] = true;
				}
			}
			return result;
		};
		// This function returns all the possible true/false combinations for
		// a given number - e.g. for two, the possible combinations are
		// [ true, true ], [ true, false ], [ false, true ], [ false, false ].
		// It does so by getting all the binary values between 0 and e.g. 11
		function getStarMap( num ) {
			var ones = '',
				max, binary, starMap, mapper, i;
			if ( !starMaps[ num ] ) {
				starMap = [];
				while ( ones.length < num ) {
					ones += 1;
				}
				max = parseInt( ones, 2 );
				mapper = function( digit ) {
					return digit === '1';
				};
				for ( i = 0; i <= max; i += 1 ) {
					binary = i.toString( 2 );
					while ( binary.length < num ) {
						binary = '0' + binary;
					}
					starMap[ i ] = Array.prototype.map.call( binary, mapper );
				}
				starMaps[ num ] = starMap;
			}
			return starMaps[ num ];
		}
		return __export;
	}();

	/* Ractive/prototype/shared/fireEvent.js */
	var Ractive$shared_fireEvent = function( getPotentialWildcardMatches ) {

		var __export;
		__export = function fireEvent( ractive, eventName ) {
			var options = arguments[ 2 ];
			if ( options === void 0 )
				options = {};
			if ( !eventName ) {
				return;
			}
			if ( !options.event ) {
				options.event = {
					name: eventName,
					context: ractive.data,
					keypath: '',
					// until event not included as argument default
					_noArg: true
				};
			} else {
				options.event.name = eventName;
			}
			var eventNames = getPotentialWildcardMatches( eventName );
			fireEventAs( ractive, eventNames, options.event, options.args, true );
		};

		function fireEventAs( ractive, eventNames, event, args ) {
			var initialFire = arguments[ 4 ];
			if ( initialFire === void 0 )
				initialFire = false;
			var subscribers, i, bubble = true;
			if ( event ) {
				ractive.event = event;
			}
			for ( i = eventNames.length; i >= 0; i-- ) {
				subscribers = ractive._subs[ eventNames[ i ] ];
				if ( subscribers ) {
					bubble = notifySubscribers( ractive, subscribers, event, args ) && bubble;
				}
			}
			if ( event ) {
				delete ractive.event;
			}
			if ( ractive._parent && bubble ) {
				if ( initialFire && ractive.component ) {
					var fullName = ractive.component.name + '.' + eventNames[ eventNames.length - 1 ];
					eventNames = getPotentialWildcardMatches( fullName );
					if ( event ) {
						event.component = ractive;
					}
				}
				fireEventAs( ractive._parent, eventNames, event, args );
			}
		}

		function notifySubscribers( ractive, subscribers, event, args ) {
			var originalEvent = null,
				stopEvent = false;
			if ( event && !event._noArg ) {
				args = [ event ].concat( args );
			}
			for ( var i = 0, len = subscribers.length; i < len; i += 1 ) {
				if ( subscribers[ i ].apply( ractive, args ) === false ) {
					stopEvent = true;
				}
			}
			if ( event && !event._noArg && stopEvent && ( originalEvent = event.original ) ) {
				originalEvent.preventDefault && originalEvent.preventDefault();
				originalEvent.stopPropagation && originalEvent.stopPropagation();
			}
			return !stopEvent;
		}
		return __export;
	}( getPotentialWildcardMatches );

	/* Ractive/prototype/fire.js */
	var Ractive$fire = function( fireEvent ) {

		return function Ractive$fire( eventName ) {
			var options = {
				args: Array.prototype.slice.call( arguments, 1 )
			};
			fireEvent( this, eventName, options );
		};
	}( Ractive$shared_fireEvent );

	/* Ractive/prototype/get.js */
	var Ractive$get = function( normaliseKeypath, resolveRef ) {

		var options = {
			capture: true
		};
		// top-level calls should be intercepted
		return function Ractive$get( keypath ) {
			var value;
			keypath = normaliseKeypath( keypath );
			value = this.viewmodel.get( keypath, options );
			// Create inter-component binding, if necessary
			if ( value === undefined && this._parent && !this.isolated ) {
				if ( resolveRef( this, keypath, this.fragment ) ) {
					// creates binding as side-effect, if appropriate
					value = this.viewmodel.get( keypath );
				}
			}
			return value;
		};
	}( normaliseKeypath, resolveRef );

	/* utils/getElement.js */
	var getElement = function getElement( input ) {
		var output;
		if ( !input || typeof input === 'boolean' ) {
			return;
		}
		if ( typeof window === 'undefined' || !document || !input ) {
			return null;
		}
		// We already have a DOM node - no work to do. (Duck typing alert!)
		if ( input.nodeType ) {
			return input;
		}
		// Get node from string
		if ( typeof input === 'string' ) {
			// try ID first
			output = document.getElementById( input );
			// then as selector, if possible
			if ( !output && document.querySelector ) {
				output = document.querySelector( input );
			}
			// did it work?
			if ( output && output.nodeType ) {
				return output;
			}
		}
		// If we've been given a collection (jQuery, Zepto etc), extract the first item
		if ( input[ 0 ] && input[ 0 ].nodeType ) {
			return input[ 0 ];
		}
		return null;
	};

	/* Ractive/prototype/insert.js */
	var Ractive$insert = function( Hook, getElement ) {

		var __export;
		var insertHook = new Hook( 'insert' );
		__export = function Ractive$insert( target, anchor ) {
			if ( !this.fragment.rendered ) {
				// TODO create, and link to, documentation explaining this
				throw new Error( 'The API has changed - you must call `ractive.render(target[, anchor])` to render your Ractive instance. Once rendered you can use `ractive.insert()`.' );
			}
			target = getElement( target );
			anchor = getElement( anchor ) || null;
			if ( !target ) {
				throw new Error( 'You must specify a valid target to insert into' );
			}
			target.insertBefore( this.detach(), anchor );
			this.el = target;
			( target.__ractive_instances__ || ( target.__ractive_instances__ = [] ) ).push( this );
			this.detached = null;
			fireInsertHook( this );
		};

		function fireInsertHook( ractive ) {
			insertHook.fire( ractive );
			ractive.findAllComponents( '*' ).forEach( function( child ) {
				fireInsertHook( child.instance );
			} );
		}
		return __export;
	}( Ractive$shared_hooks_Hook, getElement );

	/* Ractive/prototype/merge.js */
	var Ractive$merge = function( runloop, isArray, normaliseKeypath ) {

		return function Ractive$merge( keypath, array, options ) {
			var currentArray, promise;
			keypath = normaliseKeypath( keypath );
			currentArray = this.viewmodel.get( keypath );
			// If either the existing value or the new value isn't an
			// array, just do a regular set
			if ( !isArray( currentArray ) || !isArray( array ) ) {
				return this.set( keypath, array, options && options.complete );
			}
			// Manage transitions
			promise = runloop.start( this, true );
			this.viewmodel.merge( keypath, currentArray, array, options );
			runloop.end();
			// attach callback as fulfilment handler, if specified
			if ( options && options.complete ) {
				promise.then( options.complete );
			}
			return promise;
		};
	}( runloop, isArray, normaliseKeypath );

	/* Ractive/prototype/observe/Observer.js */
	var Ractive$observe_Observer = function( runloop, isEqual ) {

		var Observer = function( ractive, keypath, callback, options ) {
			this.root = ractive;
			this.keypath = keypath;
			this.callback = callback;
			this.defer = options.defer;
			// default to root as context, but allow it to be overridden
			this.context = options && options.context ? options.context : ractive;
		};
		Observer.prototype = {
			init: function( immediate ) {
				this.value = this.root.get( this.keypath );
				if ( immediate !== false ) {
					this.update();
				} else {
					this.oldValue = this.value;
				}
			},
			setValue: function( value ) {
				var this$0 = this;
				if ( !isEqual( value, this.value ) ) {
					this.value = value;
					if ( this.defer && this.ready ) {
						runloop.scheduleTask( function() {
							return this$0.update();
						} );
					} else {
						this.update();
					}
				}
			},
			update: function() {
				// Prevent infinite loops
				if ( this.updating ) {
					return;
				}
				this.updating = true;
				this.callback.call( this.context, this.value, this.oldValue, this.keypath );
				this.oldValue = this.value;
				this.updating = false;
			}
		};
		return Observer;
	}( runloop, isEqual );

	/* shared/getMatchingKeypaths.js */
	var getMatchingKeypaths = function( isArray ) {

		return function getMatchingKeypaths( ractive, pattern ) {
			var keys, key, matchingKeypaths;
			keys = pattern.split( '.' );
			matchingKeypaths = [ '' ];
			while ( key = keys.shift() ) {
				if ( key === '*' ) {
					// expand to find all valid child keypaths
					matchingKeypaths = matchingKeypaths.reduce( expand, [] );
				} else {
					if ( matchingKeypaths[ 0 ] === '' ) {
						// first key
						matchingKeypaths[ 0 ] = key;
					} else {
						matchingKeypaths = matchingKeypaths.map( concatenate( key ) );
					}
				}
			}
			return matchingKeypaths;

			function expand( matchingKeypaths, keypath ) {
				var value, key, childKeypath;
				value = ractive.viewmodel.wrapped[ keypath ] ? ractive.viewmodel.wrapped[ keypath ].get() : ractive.get( keypath );
				for ( key in value ) {
					if ( value.hasOwnProperty( key ) && ( key !== '_ractive' || !isArray( value ) ) ) {
						// for benefit of IE8
						childKeypath = keypath ? keypath + '.' + key : key;
						matchingKeypaths.push( childKeypath );
					}
				}
				return matchingKeypaths;
			}

			function concatenate( key ) {
				return function( keypath ) {
					return keypath ? keypath + '.' + key : key;
				};
			}
		};
	}( isArray );

	/* Ractive/prototype/observe/getPattern.js */
	var Ractive$observe_getPattern = function( getMatchingKeypaths ) {

		return function getPattern( ractive, pattern ) {
			var matchingKeypaths, values;
			matchingKeypaths = getMatchingKeypaths( ractive, pattern );
			values = {};
			matchingKeypaths.forEach( function( keypath ) {
				values[ keypath ] = ractive.get( keypath );
			} );
			return values;
		};
	}( getMatchingKeypaths );

	/* Ractive/prototype/observe/PatternObserver.js */
	var Ractive$observe_PatternObserver = function( runloop, isEqual, getPattern ) {

		var PatternObserver, wildcard = /\*/,
			slice = Array.prototype.slice;
		PatternObserver = function( ractive, keypath, callback, options ) {
			this.root = ractive;
			this.callback = callback;
			this.defer = options.defer;
			this.keypath = keypath;
			this.regex = new RegExp( '^' + keypath.replace( /\./g, '\\.' ).replace( /\*/g, '([^\\.]+)' ) + '$' );
			this.values = {};
			if ( this.defer ) {
				this.proxies = [];
			}
			// default to root as context, but allow it to be overridden
			this.context = options && options.context ? options.context : ractive;
		};
		PatternObserver.prototype = {
			init: function( immediate ) {
				var values, keypath;
				values = getPattern( this.root, this.keypath );
				if ( immediate !== false ) {
					for ( keypath in values ) {
						if ( values.hasOwnProperty( keypath ) ) {
							this.update( keypath );
						}
					}
				} else {
					this.values = values;
				}
			},
			update: function( keypath ) {
				var this$0 = this;
				var values;
				if ( wildcard.test( keypath ) ) {
					values = getPattern( this.root, keypath );
					for ( keypath in values ) {
						if ( values.hasOwnProperty( keypath ) ) {
							this.update( keypath );
						}
					}
					return;
				}
				// special case - array mutation should not trigger `array.*`
				// pattern observer with `array.length`
				if ( this.root.viewmodel.implicitChanges[ keypath ] ) {
					return;
				}
				if ( this.defer && this.ready ) {
					runloop.scheduleTask( function() {
						return this$0.getProxy( keypath ).update();
					} );
					return;
				}
				this.reallyUpdate( keypath );
			},
			reallyUpdate: function( keypath ) {
				var value, keys, args;
				value = this.root.viewmodel.get( keypath );
				// Prevent infinite loops
				if ( this.updating ) {
					this.values[ keypath ] = value;
					return;
				}
				this.updating = true;
				if ( !isEqual( value, this.values[ keypath ] ) || !this.ready ) {
					keys = slice.call( this.regex.exec( keypath ), 1 );
					args = [
						value,
						this.values[ keypath ],
						keypath
					].concat( keys );
					this.callback.apply( this.context, args );
					this.values[ keypath ] = value;
				}
				this.updating = false;
			},
			getProxy: function( keypath ) {
				var self = this;
				if ( !this.proxies[ keypath ] ) {
					this.proxies[ keypath ] = {
						update: function() {
							self.reallyUpdate( keypath );
						}
					};
				}
				return this.proxies[ keypath ];
			}
		};
		return PatternObserver;
	}( runloop, isEqual, Ractive$observe_getPattern );

	/* Ractive/prototype/observe/getObserverFacade.js */
	var Ractive$observe_getObserverFacade = function( normaliseKeypath, Observer, PatternObserver ) {

		var wildcard = /\*/,
			emptyObject = {};
		return function getObserverFacade( ractive, keypath, callback, options ) {
			var observer, isPatternObserver, cancelled;
			keypath = normaliseKeypath( keypath );
			options = options || emptyObject;
			// pattern observers are treated differently
			if ( wildcard.test( keypath ) ) {
				observer = new PatternObserver( ractive, keypath, callback, options );
				ractive.viewmodel.patternObservers.push( observer );
				isPatternObserver = true;
			} else {
				observer = new Observer( ractive, keypath, callback, options );
			}
			ractive.viewmodel.register( keypath, observer, isPatternObserver ? 'patternObservers' : 'observers' );
			observer.init( options.init );
			// This flag allows observers to initialise even with undefined values
			observer.ready = true;
			return {
				cancel: function() {
					var index;
					if ( cancelled ) {
						return;
					}
					if ( isPatternObserver ) {
						index = ractive.viewmodel.patternObservers.indexOf( observer );
						ractive.viewmodel.patternObservers.splice( index, 1 );
						ractive.viewmodel.unregister( keypath, observer, 'patternObservers' );
					} else {
						ractive.viewmodel.unregister( keypath, observer, 'observers' );
					}
					cancelled = true;
				}
			};
		};
	}( normaliseKeypath, Ractive$observe_Observer, Ractive$observe_PatternObserver );

	/* Ractive/prototype/observe.js */
	var Ractive$observe = function( isObject, getObserverFacade ) {

		return function Ractive$observe( keypath, callback, options ) {
			var observers, map, keypaths, i;
			// Allow a map of keypaths to handlers
			if ( isObject( keypath ) ) {
				options = callback;
				map = keypath;
				observers = [];
				for ( keypath in map ) {
					if ( map.hasOwnProperty( keypath ) ) {
						callback = map[ keypath ];
						observers.push( this.observe( keypath, callback, options ) );
					}
				}
				return {
					cancel: function() {
						while ( observers.length ) {
							observers.pop().cancel();
						}
					}
				};
			}
			// Allow `ractive.observe( callback )` - i.e. observe entire model
			if ( typeof keypath === 'function' ) {
				options = callback;
				callback = keypath;
				keypath = '';
				return getObserverFacade( this, keypath, callback, options );
			}
			keypaths = keypath.split( ' ' );
			// Single keypath
			if ( keypaths.length === 1 ) {
				return getObserverFacade( this, keypath, callback, options );
			}
			// Multiple space-separated keypaths
			observers = [];
			i = keypaths.length;
			while ( i-- ) {
				keypath = keypaths[ i ];
				if ( keypath ) {
					observers.push( getObserverFacade( this, keypath, callback, options ) );
				}
			}
			return {
				cancel: function() {
					while ( observers.length ) {
						observers.pop().cancel();
					}
				}
			};
		};
	}( isObject, Ractive$observe_getObserverFacade );

	/* Ractive/prototype/shared/trim.js */
	var Ractive$shared_trim = function( str ) {
		return str.trim();
	};

	/* Ractive/prototype/shared/notEmptyString.js */
	var Ractive$shared_notEmptyString = function( str ) {
		return str !== '';
	};

	/* Ractive/prototype/off.js */
	var Ractive$off = function( trim, notEmptyString ) {

		return function Ractive$off( eventName, callback ) {
			var this$0 = this;
			var eventNames;
			// if no arguments specified, remove all callbacks
			if ( !eventName ) {
				// TODO use this code instead, once the following issue has been resolved
				// in PhantomJS (tests are unpassable otherwise!)
				// https://github.com/ariya/phantomjs/issues/11856
				// defineProperty( this, '_subs', { value: create( null ), configurable: true });
				for ( eventName in this._subs ) {
					delete this._subs[ eventName ];
				}
			} else {
				// Handle multiple space-separated event names
				eventNames = eventName.split( ' ' ).map( trim ).filter( notEmptyString );
				eventNames.forEach( function( eventName ) {
					var subscribers, index;
					// If we have subscribers for this event...
					if ( subscribers = this$0._subs[ eventName ] ) {
						// ...if a callback was specified, only remove that
						if ( callback ) {
							index = subscribers.indexOf( callback );
							if ( index !== -1 ) {
								subscribers.splice( index, 1 );
							}
						} else {
							this$0._subs[ eventName ] = [];
						}
					}
				} );
			}
			return this;
		};
	}( Ractive$shared_trim, Ractive$shared_notEmptyString );

	/* Ractive/prototype/on.js */
	var Ractive$on = function( trim, notEmptyString ) {

		return function Ractive$on( eventName, callback ) {
			var this$0 = this;
			var self = this,
				listeners, n, eventNames;
			// allow mutliple listeners to be bound in one go
			if ( typeof eventName === 'object' ) {
				listeners = [];
				for ( n in eventName ) {
					if ( eventName.hasOwnProperty( n ) ) {
						listeners.push( this.on( n, eventName[ n ] ) );
					}
				}
				return {
					cancel: function() {
						var listener;
						while ( listener = listeners.pop() ) {
							listener.cancel();
						}
					}
				};
			}
			// Handle multiple space-separated event names
			eventNames = eventName.split( ' ' ).map( trim ).filter( notEmptyString );
			eventNames.forEach( function( eventName ) {
				( this$0._subs[ eventName ] || ( this$0._subs[ eventName ] = [] ) ).push( callback );
			} );
			return {
				cancel: function() {
					self.off( eventName, callback );
				}
			};
		};
	}( Ractive$shared_trim, Ractive$shared_notEmptyString );

	/* shared/getNewIndices.js */
	var getNewIndices = function() {

		var __export;
		// This function takes an array, the name of a mutator method, and the
		// arguments to call that mutator method with, and returns an array that
		// maps the old indices to their new indices.
		// So if you had something like this...
		//
		//     array = [ 'a', 'b', 'c', 'd' ];
		//     array.push( 'e' );
		//
		// ...you'd get `[ 0, 1, 2, 3 ]` - in other words, none of the old indices
		// have changed. If you then did this...
		//
		//     array.unshift( 'z' );
		//
		// ...the indices would be `[ 1, 2, 3, 4, 5 ]` - every item has been moved
		// one higher to make room for the 'z'. If you removed an item, the new index
		// would be -1...
		//
		//     array.splice( 2, 2 );
		//
		// ...this would result in [ 0, 1, -1, -1, 2, 3 ].
		//
		// This information is used to enable fast, non-destructive shuffling of list
		// sections when you do e.g. `ractive.splice( 'items', 2, 2 );
		__export = function getNewIndices( array, methodName, args ) {
			var spliceArguments, len, newIndices = [],
				removeStart, removeEnd, balance, i;
			spliceArguments = getSpliceEquivalent( array, methodName, args );
			if ( !spliceArguments ) {
				return null;
			}
			len = array.length;
			balance = spliceArguments.length - 2 - spliceArguments[ 1 ];
			removeStart = Math.min( len, spliceArguments[ 0 ] );
			removeEnd = removeStart + spliceArguments[ 1 ];
			for ( i = 0; i < removeStart; i += 1 ) {
				newIndices.push( i );
			}
			for ( ; i < removeEnd; i += 1 ) {
				newIndices.push( -1 );
			}
			for ( ; i < len; i += 1 ) {
				newIndices.push( i + balance );
			}
			return newIndices;
		};
		// The pop, push, shift an unshift methods can all be represented
		// as an equivalent splice
		function getSpliceEquivalent( array, methodName, args ) {
			switch ( methodName ) {
				case 'splice':
					if ( args[ 0 ] !== undefined && args[ 0 ] < 0 ) {
						args[ 0 ] = array.length + Math.max( args[ 0 ], -array.length );
					}
					while ( args.length < 2 ) {
						args.push( 0 );
					}
					// ensure we only remove elements that exist
					args[ 1 ] = Math.min( args[ 1 ], array.length - args[ 0 ] );
					return args;
				case 'sort':
				case 'reverse':
					return null;
				case 'pop':
					if ( array.length ) {
						return [
							array.length - 1,
							1
						];
					}
					return null;
				case 'push':
					return [
						array.length,
						0
					].concat( args );
				case 'shift':
					return [
						0,
						1
					];
				case 'unshift':
					return [
						0,
						0
					].concat( args );
			}
		}
		return __export;
	}();

	/* Ractive/prototype/shared/makeArrayMethod.js */
	var Ractive$shared_makeArrayMethod = function( isArray, runloop, getNewIndices ) {

		var arrayProto = Array.prototype;
		return function( methodName ) {
			return function( keypath ) {
				var SLICE$0 = Array.prototype.slice;
				var args = SLICE$0.call( arguments, 1 );
				var array, newIndices = [],
					len, promise, result;
				array = this.get( keypath );
				len = array.length;
				if ( !isArray( array ) ) {
					throw new Error( 'Called ractive.' + methodName + '(\'' + keypath + '\'), but \'' + keypath + '\' does not refer to an array' );
				}
				newIndices = getNewIndices( array, methodName, args );
				result = arrayProto[ methodName ].apply( array, args );
				promise = runloop.start( this, true ).then( function() {
					return result;
				} );
				if ( !!newIndices ) {
					this.viewmodel.smartUpdate( keypath, array, newIndices );
				} else {
					this.viewmodel.mark( keypath );
				}
				runloop.end();
				return promise;
			};
		};
	}( isArray, runloop, getNewIndices );

	/* Ractive/prototype/pop.js */
	var Ractive$pop = function( makeArrayMethod ) {

		return makeArrayMethod( 'pop' );
	}( Ractive$shared_makeArrayMethod );

	/* Ractive/prototype/push.js */
	var Ractive$push = function( makeArrayMethod ) {

		return makeArrayMethod( 'push' );
	}( Ractive$shared_makeArrayMethod );

	/* global/css.js */
	var global_css = function( circular, isClient, removeFromArray ) {

		var css, update, runloop, styleElement, head, styleSheet, inDom, prefix = '/* Ractive.js component styles */\n',
			componentsInPage = {},
			styles = [];
		if ( !isClient ) {
			css = null;
		} else {
			circular.push( function() {
				runloop = circular.runloop;
			} );
			styleElement = document.createElement( 'style' );
			styleElement.type = 'text/css';
			head = document.getElementsByTagName( 'head' )[ 0 ];
			inDom = false;
			// Internet Exploder won't let you use styleSheet.innerHTML - we have to
			// use styleSheet.cssText instead
			styleSheet = styleElement.styleSheet;
			update = function() {
				var css;
				if ( styles.length ) {
					css = prefix + styles.join( ' ' );
					if ( styleSheet ) {
						styleSheet.cssText = css;
					} else {
						styleElement.innerHTML = css;
					}
					if ( !inDom ) {
						head.appendChild( styleElement );
						inDom = true;
					}
				} else if ( inDom ) {
					head.removeChild( styleElement );
					inDom = false;
				}
			};
			css = {
				add: function( Component ) {
					if ( !Component.css ) {
						return;
					}
					if ( !componentsInPage[ Component._guid ] ) {
						// we create this counter so that we can in/decrement it as
						// instances are added and removed. When all components are
						// removed, the style is too
						componentsInPage[ Component._guid ] = 0;
						styles.push( Component.css );
						update();
					}
					componentsInPage[ Component._guid ] += 1;
				},
				remove: function( Component ) {
					if ( !Component.css ) {
						return;
					}
					componentsInPage[ Component._guid ] -= 1;
					if ( !componentsInPage[ Component._guid ] ) {
						removeFromArray( styles, Component.css );
						runloop.scheduleTask( update );
					}
				}
			};
		}
		return css;
	}( circular, isClient, removeFromArray );

	/* Ractive/prototype/shared/hooks/HookQueue.js */
	var Ractive$shared_hooks_HookQueue = function( Hook ) {

		function HookQueue( event ) {
			this.hook = new Hook( event );
			this.inProcess = {};
			this.queue = {};
		}
		HookQueue.prototype = {
			constructor: HookQueue,
			begin: function( ractive ) {
				this.inProcess[ ractive._guid ] = true;
			},
			end: function( ractive ) {
				var parent = ractive._parent;
				// If this is *isn't* a child of a component that's in process,
				// it should call methods or fire at this point
				if ( !parent || !this.inProcess[ parent._guid ] ) {
					fire( this, ractive );
				} else {
					getChildQueue( this.queue, parent ).push( ractive );
				}
				delete this.inProcess[ ractive._guid ];
			}
		};

		function getChildQueue( queue, ractive ) {
			return queue[ ractive._guid ] || ( queue[ ractive._guid ] = [] );
		}

		function fire( hookQueue, ractive ) {
			var childQueue = getChildQueue( hookQueue.queue, ractive );
			hookQueue.hook.fire( ractive );
			// queue is "live" because components can end up being
			// added while hooks fire on parents that modify data values.
			while ( childQueue.length ) {
				fire( hookQueue, childQueue.shift() );
			}
			delete hookQueue.queue[ ractive._guid ];
		}
		return HookQueue;
	}( Ractive$shared_hooks_Hook );

	/* Ractive/prototype/render.js */
	var Ractive$render = function( css, Hook, HookQueue, getElement, runloop ) {

		var renderHook = new HookQueue( 'render' ),
			completeHook = new Hook( 'complete' );
		return function Ractive$render( target, anchor ) {
			var this$0 = this;
			var promise, instances, transitionsEnabled;
			renderHook.begin( this );
			// if `noIntro` is `true`, temporarily disable transitions
			transitionsEnabled = this.transitionsEnabled;
			if ( this.noIntro ) {
				this.transitionsEnabled = false;
			}
			promise = runloop.start( this, true );
			if ( this.fragment.rendered ) {
				throw new Error( 'You cannot call ractive.render() on an already rendered instance! Call ractive.unrender() first' );
			}
			target = getElement( target ) || this.el;
			anchor = getElement( anchor ) || this.anchor;
			this.el = target;
			this.anchor = anchor;
			// Add CSS, if applicable
			if ( this.constructor.css ) {
				css.add( this.constructor );
			}
			if ( target ) {
				if ( !( instances = target.__ractive_instances__ ) ) {
					target.__ractive_instances__ = [ this ];
				} else {
					instances.push( this );
				}
				if ( anchor ) {
					target.insertBefore( this.fragment.render(), anchor );
				} else {
					target.appendChild( this.fragment.render() );
				}
			}
			renderHook.end( this );
			runloop.end();
			this.transitionsEnabled = transitionsEnabled;
			// It is now more problematic to know if the complete hook
			// would fire. Method checking is straight-forward, but would
			// also require preflighting event subscriptions. Which seems
			// like more work then just letting the promise happen.
			// But perhaps I'm wrong about that...
			promise.then( function() {
				return completeHook.fire( this$0 );
			} );
			return promise;
		};
	}( global_css, Ractive$shared_hooks_Hook, Ractive$shared_hooks_HookQueue, getElement, runloop );

	/* virtualdom/Fragment/prototype/bubble.js */
	var virtualdom_Fragment$bubble = function Fragment$bubble() {
		this.dirtyValue = this.dirtyArgs = true;
		if ( this.bound && typeof this.owner.bubble === 'function' ) {
			this.owner.bubble();
		}
	};

	/* virtualdom/Fragment/prototype/detach.js */
	var virtualdom_Fragment$detach = function Fragment$detach() {
		var docFrag;
		if ( this.items.length === 1 ) {
			return this.items[ 0 ].detach();
		}
		docFrag = document.createDocumentFragment();
		this.items.forEach( function( item ) {
			var node = item.detach();
			// TODO The if {...} wasn't previously required - it is now, because we're
			// forcibly detaching everything to reorder sections after an update. That's
			// a non-ideal brute force approach, implemented to get all the tests to pass
			// - as soon as it's replaced with something more elegant, this should
			// revert to `docFrag.appendChild( item.detach() )`
			if ( node ) {
				docFrag.appendChild( node );
			}
		} );
		return docFrag;
	};

	/* virtualdom/Fragment/prototype/find.js */
	var virtualdom_Fragment$find = function Fragment$find( selector ) {
		var i, len, item, queryResult;
		if ( this.items ) {
			len = this.items.length;
			for ( i = 0; i < len; i += 1 ) {
				item = this.items[ i ];
				if ( item.find && ( queryResult = item.find( selector ) ) ) {
					return queryResult;
				}
			}
			return null;
		}
	};

	/* virtualdom/Fragment/prototype/findAll.js */
	var virtualdom_Fragment$findAll = function Fragment$findAll( selector, query ) {
		var i, len, item;
		if ( this.items ) {
			len = this.items.length;
			for ( i = 0; i < len; i += 1 ) {
				item = this.items[ i ];
				if ( item.findAll ) {
					item.findAll( selector, query );
				}
			}
		}
		return query;
	};

	/* virtualdom/Fragment/prototype/findAllComponents.js */
	var virtualdom_Fragment$findAllComponents = function Fragment$findAllComponents( selector, query ) {
		var i, len, item;
		if ( this.items ) {
			len = this.items.length;
			for ( i = 0; i < len; i += 1 ) {
				item = this.items[ i ];
				if ( item.findAllComponents ) {
					item.findAllComponents( selector, query );
				}
			}
		}
		return query;
	};

	/* virtualdom/Fragment/prototype/findComponent.js */
	var virtualdom_Fragment$findComponent = function Fragment$findComponent( selector ) {
		var len, i, item, queryResult;
		if ( this.items ) {
			len = this.items.length;
			for ( i = 0; i < len; i += 1 ) {
				item = this.items[ i ];
				if ( item.findComponent && ( queryResult = item.findComponent( selector ) ) ) {
					return queryResult;
				}
			}
			return null;
		}
	};

	/* virtualdom/Fragment/prototype/findNextNode.js */
	var virtualdom_Fragment$findNextNode = function Fragment$findNextNode( item ) {
		var index = item.index,
			node;
		if ( this.items[ index + 1 ] ) {
			node = this.items[ index + 1 ].firstNode();
		} else if ( this.owner === this.root ) {
			if ( !this.owner.component ) {
				// TODO but something else could have been appended to
				// this.root.el, no?
				node = null;
			} else {
				node = this.owner.component.findNextNode();
			}
		} else {
			node = this.owner.findNextNode( this );
		}
		return node;
	};

	/* virtualdom/Fragment/prototype/firstNode.js */
	var virtualdom_Fragment$firstNode = function Fragment$firstNode() {
		if ( this.items && this.items[ 0 ] ) {
			return this.items[ 0 ].firstNode();
		}
		return null;
	};

	/* virtualdom/Fragment/prototype/getNode.js */
	var virtualdom_Fragment$getNode = function Fragment$getNode() {
		var fragment = this;
		do {
			if ( fragment.pElement ) {
				return fragment.pElement.node;
			}
		} while ( fragment = fragment.parent );
		return this.root.detached || this.root.el;
	};

	/* virtualdom/Fragment/prototype/getValue.js */
	var virtualdom_Fragment$getValue = function( parseJSON ) {

		var __export;
		var empty = {};
		__export = function Fragment$getValue() {
			var options = arguments[ 0 ];
			if ( options === void 0 )
				options = empty;
			var asArgs, values, source, parsed, cachedResult, dirtyFlag, result;
			asArgs = options.args;
			cachedResult = asArgs ? 'argsList' : 'value';
			dirtyFlag = asArgs ? 'dirtyArgs' : 'dirtyValue';
			if ( this[ dirtyFlag ] ) {
				source = processItems( this.items, values = {}, this.root._guid );
				parsed = parseJSON( asArgs ? '[' + source + ']' : source, values );
				if ( !parsed ) {
					result = asArgs ? [ this.toString() ] : this.toString();
				} else {
					result = parsed.value;
				}
				this[ cachedResult ] = result;
				this[ dirtyFlag ] = false;
			}
			return this[ cachedResult ];
		};

		function processItems( items, values, guid, counter ) {
			counter = counter || 0;
			return items.map( function( item ) {
				var placeholderId, wrapped, value;
				if ( item.text ) {
					return item.text;
				}
				if ( item.fragments ) {
					return item.fragments.map( function( fragment ) {
						return processItems( fragment.items, values, guid, counter );
					} ).join( '' );
				}
				placeholderId = guid + '-' + counter++;
				if ( wrapped = item.root.viewmodel.wrapped[ item.keypath ] ) {
					value = wrapped.value;
				} else {
					value = item.getValue();
				}
				values[ placeholderId ] = value;
				return '${' + placeholderId + '}';
			} ).join( '' );
		}
		return __export;
	}( parseJSON );

	/* utils/escapeHtml.js */
	var escapeHtml = function() {

		var lessThan = /</g,
			greaterThan = />/g;
		return function escapeHtml( str ) {
			return str.replace( lessThan, '&lt;' ).replace( greaterThan, '&gt;' );
		};
	}();

	/* utils/detachNode.js */
	var detachNode = function detachNode( node ) {
		if ( node && node.parentNode ) {
			node.parentNode.removeChild( node );
		}
		return node;
	};

	/* virtualdom/items/shared/detach.js */
	var detach = function( detachNode ) {

		return function() {
			return detachNode( this.node );
		};
	}( detachNode );

	/* virtualdom/items/Text.js */
	var Text = function( types, escapeHtml, detach, decodeCharacterReferences ) {

		var Text = function( options ) {
			this.type = types.TEXT;
			this.text = options.template;
		};
		Text.prototype = {
			detach: detach,
			firstNode: function() {
				return this.node;
			},
			render: function() {
				if ( !this.node ) {
					this.node = document.createTextNode( decodeCharacterReferences( this.text ) );
				}
				return this.node;
			},
			toString: function( escape ) {
				return escape ? escapeHtml( this.text ) : this.text;
			},
			unrender: function( shouldDestroy ) {
				if ( shouldDestroy ) {
					return this.detach();
				}
			}
		};
		return Text;
	}( types, escapeHtml, detach, decodeCharacterReferences );

	/* virtualdom/items/shared/unbind.js */
	var unbind = function( runloop ) {

		return function unbind() {
			if ( !this.keypath ) {
				// this was on the 'unresolved' list, we need to remove it
				runloop.removeUnresolved( this );
			} else {
				// this was registered as a dependant
				this.root.viewmodel.unregister( this.keypath, this );
			}
			if ( this.resolver ) {
				this.resolver.unbind();
			}
		};
	}( runloop );

	/* virtualdom/items/shared/Mustache/getValue.js */
	var getValue = function Mustache$getValue() {
		return this.value;
	};

	/* shared/Unresolved.js */
	var Unresolved = function( runloop ) {

		var Unresolved = function( ractive, ref, parentFragment, callback ) {
			this.root = ractive;
			this.ref = ref;
			this.parentFragment = parentFragment;
			this.resolve = callback;
			runloop.addUnresolved( this );
		};
		Unresolved.prototype = {
			unbind: function() {
				runloop.removeUnresolved( this );
			}
		};
		return Unresolved;
	}( runloop );

	/* virtualdom/items/shared/utils/startsWithKeypath.js */
	var startsWithKeypath = function startsWithKeypath( target, keypath ) {
		return target && keypath && target.substr( 0, keypath.length + 1 ) === keypath + '.';
	};

	/* virtualdom/items/shared/utils/getNewKeypath.js */
	var getNewKeypath = function( startsWithKeypath ) {

		return function getNewKeypath( targetKeypath, oldKeypath, newKeypath ) {
			// exact match
			if ( targetKeypath === oldKeypath ) {
				return newKeypath !== undefined ? newKeypath : null;
			}
			// partial match based on leading keypath segments
			if ( startsWithKeypath( targetKeypath, oldKeypath ) ) {
				return newKeypath === null ? newKeypath : targetKeypath.replace( oldKeypath + '.', newKeypath + '.' );
			}
		};
	}( startsWithKeypath );

	/* shared/getFunctionFromString.js */
	var getFunctionFromString = function() {

		var cache = {};
		return function getFunctionFromString( str, i ) {
			var fn, args;
			if ( cache[ str ] ) {
				return cache[ str ];
			}
			args = [];
			while ( i-- ) {
				args[ i ] = '_' + i;
			}
			fn = new Function( args.join( ',' ), 'return(' + str + ')' );
			cache[ str ] = fn;
			return fn;
		};
	}();

	/* virtualdom/items/shared/Resolvers/ExpressionResolver.js */
	var ExpressionResolver = function( removeFromArray, defineProperty, resolveRef, Unresolved, getFunctionFromString, getNewKeypath ) {

		var __export;
		var ExpressionResolver, bind = Function.prototype.bind;
		ExpressionResolver = function( owner, parentFragment, expression, callback ) {
			var expressionResolver = this,
				ractive, indexRefs, args;
			ractive = owner.root;
			this.root = ractive;
			this.callback = callback;
			this.owner = owner;
			this.str = expression.s;
			this.args = args = [];
			this.unresolved = [];
			this.pending = 0;
			indexRefs = parentFragment.indexRefs;
			// some expressions don't have references. edge case, but, yeah.
			if ( !expression.r || !expression.r.length ) {
				this.resolved = this.ready = true;
				this.bubble();
				return;
			}
			// Create resolvers for each reference
			expression.r.forEach( function( reference, i ) {
				var index, keypath, unresolved;
				// Is this an index reference?
				if ( indexRefs && ( index = indexRefs[ reference ] ) !== undefined ) {
					args[ i ] = {
						indexRef: reference,
						value: index
					};
					return;
				}
				// Can we resolve it immediately?
				if ( keypath = resolveRef( ractive, reference, parentFragment ) ) {
					args[ i ] = {
						keypath: keypath
					};
					return;
				} else if ( reference === '.' ) {
					// special case of context reference to root
					args[ i ] = {
						'': ''
					};
					return;
				}
				// Couldn't resolve yet
				args[ i ] = null;
				expressionResolver.pending += 1;
				unresolved = new Unresolved( ractive, reference, parentFragment, function( keypath ) {
					expressionResolver.resolve( i, keypath );
					removeFromArray( expressionResolver.unresolved, unresolved );
				} );
				expressionResolver.unresolved.push( unresolved );
			} );
			this.ready = true;
			this.bubble();
		};
		ExpressionResolver.prototype = {
			bubble: function() {
				if ( !this.ready ) {
					return;
				}
				this.uniqueString = getUniqueString( this.str, this.args );
				this.keypath = getKeypath( this.uniqueString );
				this.createEvaluator();
				this.callback( this.keypath );
			},
			unbind: function() {
				var unresolved;
				while ( unresolved = this.unresolved.pop() ) {
					unresolved.unbind();
				}
			},
			resolve: function( index, keypath ) {
				this.args[ index ] = {
					keypath: keypath
				};
				this.bubble();
				// when all references have been resolved, we can flag the entire expression
				// as having been resolved
				this.resolved = !--this.pending;
			},
			createEvaluator: function() {
				var this$0 = this;
				var self = this,
					computation, valueGetters, signature, keypaths = [],
					i, arg, fn;
				computation = this.root.viewmodel.computations[ this.keypath ];
				// only if it doesn't exist yet!
				if ( !computation ) {
					i = this.args.length;
					while ( i-- ) {
						arg = this.args[ i ];
						if ( arg && arg.keypath ) {
							keypaths.push( arg.keypath );
						}
					}
					fn = getFunctionFromString( this.str, this.args.length );
					valueGetters = this.args.map( function( arg ) {
						var keypath, value;
						if ( !arg ) {
							return function() {
								return undefined;
							};
						}
						if ( arg.indexRef ) {
							value = arg.value;
							return function() {
								return value;
							};
						}
						keypath = arg.keypath;
						return function() {
							var value = this$0.root.viewmodel.get( keypath );
							if ( typeof value === 'function' ) {
								value = wrapFunction( value, self.root );
							}
							return value;
						};
					} );
					signature = {
						deps: keypaths,
						get: function() {
							var args = valueGetters.map( call );
							return fn.apply( null, args );
						}
					};
					computation = this.root.viewmodel.compute( this.keypath, signature );
				} else {
					this.root.viewmodel.mark( this.keypath );
				}
			},
			rebind: function( indexRef, newIndex, oldKeypath, newKeypath ) {
				var changed;
				this.args.forEach( function( arg ) {
					var changedKeypath;
					if ( !arg )
						return;
					if ( arg.keypath && ( changedKeypath = getNewKeypath( arg.keypath, oldKeypath, newKeypath ) ) ) {
						arg.keypath = changedKeypath;
						changed = true;
					} else if ( arg.indexRef && arg.indexRef === indexRef ) {
						arg.value = newIndex;
						changed = true;
					}
				} );
				if ( changed ) {
					this.bubble();
				}
			}
		};
		__export = ExpressionResolver;

		function call( value ) {
			return value.call();
		}

		function getUniqueString( str, args ) {
			// get string that is unique to this expression
			return str.replace( /_([0-9]+)/g, function( match, $1 ) {
				var arg = args[ $1 ];
				if ( !arg )
					return 'undefined';
				if ( arg.indexRef )
					return arg.value;
				return arg.keypath;
			} );
		}

		function getKeypath( uniqueString ) {
			// Sanitize by removing any periods or square brackets. Otherwise
			// we can't split the keypath into keys!
			return '${' + uniqueString.replace( /[\.\[\]]/g, '-' ) + '}';
		}

		function wrapFunction( fn, ractive ) {
			var wrapped, prop, key;
			if ( fn._noWrap ) {
				return fn;
			}
			prop = '__ractive_' + ractive._guid;
			wrapped = fn[ prop ];
			if ( wrapped ) {
				return wrapped;
			} else if ( /this/.test( fn.toString() ) ) {
				defineProperty( fn, prop, {
					value: bind.call( fn, ractive )
				} );
				// Add properties/methods to wrapped function
				for ( key in fn ) {
					if ( fn.hasOwnProperty( key ) ) {
						fn[ prop ][ key ] = fn[ key ];
					}
				}
				return fn[ prop ];
			}
			defineProperty( fn, '__ractive_nowrap', {
				value: fn
			} );
			return fn.__ractive_nowrap;
		}
		return __export;
	}( removeFromArray, defineProperty, resolveRef, Unresolved, getFunctionFromString, getNewKeypath, legacy );

	/* virtualdom/items/shared/Resolvers/ReferenceExpressionResolver/MemberResolver.js */
	var MemberResolver = function( types, resolveRef, Unresolved, getNewKeypath, ExpressionResolver ) {

		var MemberResolver = function( template, resolver, parentFragment ) {
			var member = this,
				ref, indexRefs, index, ractive, keypath;
			member.resolver = resolver;
			member.root = resolver.root;
			member.viewmodel = resolver.root.viewmodel;
			if ( typeof template === 'string' ) {
				member.value = template;
			} else if ( template.t === types.REFERENCE ) {
				ref = member.ref = template.n;
				// If it's an index reference, our job is simple
				if ( ( indexRefs = parentFragment.indexRefs ) && ( index = indexRefs[ ref ] ) !== undefined ) {
					member.indexRef = ref;
					member.value = index;
				} else {
					ractive = resolver.root;
					// Can we resolve the reference immediately?
					if ( keypath = resolveRef( ractive, ref, parentFragment ) ) {
						member.resolve( keypath );
					} else {
						// Couldn't resolve yet
						member.unresolved = new Unresolved( ractive, ref, parentFragment, function( keypath ) {
							member.unresolved = null;
							member.resolve( keypath );
						} );
					}
				}
			} else {
				new ExpressionResolver( resolver, parentFragment, template, function( keypath ) {
					member.resolve( keypath );
				} );
			}
		};
		MemberResolver.prototype = {
			resolve: function( keypath ) {
				this.keypath = keypath;
				this.value = this.viewmodel.get( keypath );
				this.bind();
				this.resolver.bubble();
			},
			bind: function() {
				this.viewmodel.register( this.keypath, this );
			},
			rebind: function( indexRef, newIndex, oldKeypath, newKeypath ) {
				var keypath;
				if ( indexRef && this.indexRef === indexRef ) {
					if ( newIndex !== this.value ) {
						this.value = newIndex;
						return true;
					}
				} else if ( this.keypath && ( keypath = getNewKeypath( this.keypath, oldKeypath, newKeypath ) ) ) {
					this.unbind();
					this.keypath = keypath;
					this.value = this.root.viewmodel.get( keypath );
					this.bind();
					return true;
				}
			},
			setValue: function( value ) {
				this.value = value;
				this.resolver.bubble();
			},
			unbind: function() {
				if ( this.keypath ) {
					this.root.viewmodel.unregister( this.keypath, this );
				}
				if ( this.unresolved ) {
					this.unresolved.unbind();
				}
			},
			forceResolution: function() {
				if ( this.unresolved ) {
					this.unresolved.unbind();
					this.unresolved = null;
					this.keypath = this.ref;
					this.value = this.viewmodel.get( this.ref );
					this.bind();
				}
			}
		};
		return MemberResolver;
	}( types, resolveRef, Unresolved, getNewKeypath, ExpressionResolver );

	/* virtualdom/items/shared/Resolvers/ReferenceExpressionResolver/ReferenceExpressionResolver.js */
	var ReferenceExpressionResolver = function( resolveRef, Unresolved, MemberResolver ) {

		var ReferenceExpressionResolver = function( mustache, template, callback ) {
			var this$0 = this;
			var resolver = this,
				ractive, ref, keypath, parentFragment;
			parentFragment = mustache.parentFragment;
			resolver.root = ractive = mustache.root;
			resolver.mustache = mustache;
			resolver.ref = ref = template.r;
			resolver.callback = callback;
			resolver.unresolved = [];
			// Find base keypath
			if ( keypath = resolveRef( ractive, ref, parentFragment ) ) {
				resolver.base = keypath;
			} else {
				resolver.baseResolver = new Unresolved( ractive, ref, parentFragment, function( keypath ) {
					resolver.base = keypath;
					resolver.baseResolver = null;
					resolver.bubble();
				} );
			}
			// Find values for members, or mark them as unresolved
			resolver.members = template.m.map( function( template ) {
				return new MemberResolver( template, this$0, parentFragment );
			} );
			resolver.ready = true;
			resolver.bubble();
		};
		ReferenceExpressionResolver.prototype = {
			getKeypath: function() {
				var values = this.members.map( getValue );
				if ( !values.every( isDefined ) || this.baseResolver ) {
					return null;
				}
				return this.base + '.' + values.join( '.' );
			},
			bubble: function() {
				if ( !this.ready || this.baseResolver ) {
					return;
				}
				this.callback( this.getKeypath() );
			},
			unbind: function() {
				this.members.forEach( unbind );
			},
			rebind: function( indexRef, newIndex, oldKeypath, newKeypath ) {
				var changed;
				this.members.forEach( function( members ) {
					if ( members.rebind( indexRef, newIndex, oldKeypath, newKeypath ) ) {
						changed = true;
					}
				} );
				if ( changed ) {
					this.bubble();
				}
			},
			forceResolution: function() {
				if ( this.baseResolver ) {
					this.base = this.ref;
					this.baseResolver.unbind();
					this.baseResolver = null;
				}
				this.members.forEach( function( m ) {
					return m.forceResolution();
				} );
				this.bubble();
			}
		};

		function getValue( member ) {
			return member.value;
		}

		function isDefined( value ) {
			return value != undefined;
		}

		function unbind( member ) {
			member.unbind();
		}
		return ReferenceExpressionResolver;
	}( resolveRef, Unresolved, MemberResolver );

	/* virtualdom/items/shared/Mustache/initialise.js */
	var initialise = function( types, runloop, resolveRef, ReferenceExpressionResolver, ExpressionResolver ) {

		return function Mustache$init( mustache, options ) {
			var ref, keypath, indexRefs, index, parentFragment, template;
			parentFragment = options.parentFragment;
			template = options.template;
			mustache.root = parentFragment.root;
			mustache.parentFragment = parentFragment;
			mustache.pElement = parentFragment.pElement;
			mustache.template = options.template;
			mustache.index = options.index || 0;
			mustache.isStatic = options.template.s;
			mustache.type = options.template.t;
			// if this is a simple mustache, with a reference, we just need to resolve
			// the reference to a keypath
			if ( ref = template.r ) {
				indexRefs = parentFragment.indexRefs;
				if ( indexRefs && ( index = indexRefs[ ref ] ) !== undefined ) {
					mustache.indexRef = ref;
					mustache.setValue( index );
					return;
				}
				keypath = resolveRef( mustache.root, ref, mustache.parentFragment );
				if ( keypath !== undefined ) {
					mustache.resolve( keypath );
				} else {
					mustache.ref = ref;
					runloop.addUnresolved( mustache );
				}
			}
			// if it's an expression, we have a bit more work to do
			if ( options.template.x ) {
				mustache.resolver = new ExpressionResolver( mustache, parentFragment, options.template.x, resolveAndRebindChildren );
			}
			if ( options.template.rx ) {
				mustache.resolver = new ReferenceExpressionResolver( mustache, options.template.rx, resolveAndRebindChildren );
			}
			// Special case - inverted sections
			if ( mustache.template.n === types.SECTION_UNLESS && !mustache.hasOwnProperty( 'value' ) ) {
				mustache.setValue( undefined );
			}

			function resolveAndRebindChildren( newKeypath ) {
				var oldKeypath = mustache.keypath;
				if ( newKeypath !== oldKeypath ) {
					mustache.resolve( newKeypath );
					if ( oldKeypath !== undefined ) {
						mustache.fragments && mustache.fragments.forEach( function( f ) {
							f.rebind( null, null, oldKeypath, newKeypath );
						} );
					}
				}
			}
		};
	}( types, runloop, resolveRef, ReferenceExpressionResolver, ExpressionResolver );

	/* virtualdom/items/shared/Mustache/resolve.js */
	var resolve = function Mustache$resolve( keypath ) {
		var wasResolved, value, twowayBinding;
		// If we resolved previously, we need to unregister
		if ( this.keypath != undefined ) {
			// undefined or null
			this.root.viewmodel.unregister( this.keypath, this );
			wasResolved = true;
		}
		this.keypath = keypath;
		// If the new keypath exists, we need to register
		// with the viewmodel
		if ( keypath != undefined ) {
			// undefined or null
			value = this.root.viewmodel.get( keypath );
			this.root.viewmodel.register( keypath, this );
		}
		// Either way we need to queue up a render (`value`
		// will be `undefined` if there's no keypath)
		this.setValue( value );
		// Two-way bindings need to point to their new target keypath
		if ( wasResolved && ( twowayBinding = this.twowayBinding ) ) {
			twowayBinding.rebound();
		}
	};

	/* virtualdom/items/shared/Mustache/rebind.js */
	var rebind = function( getNewKeypath ) {

		return function Mustache$rebind( indexRef, newIndex, oldKeypath, newKeypath ) {
			var keypath;
			// Children first
			if ( this.fragments ) {
				this.fragments.forEach( function( f ) {
					return f.rebind( indexRef, newIndex, oldKeypath, newKeypath );
				} );
			}
			// Expression mustache?
			if ( this.resolver ) {
				this.resolver.rebind( indexRef, newIndex, oldKeypath, newKeypath );
			}
			// Normal keypath mustache or reference expression?
			if ( this.keypath !== undefined ) {
				keypath = getNewKeypath( this.keypath, oldKeypath, newKeypath );
				// was a new keypath created?
				if ( keypath !== undefined ) {
					// resolve it
					this.resolve( keypath );
				}
			} else if ( indexRef !== undefined && this.indexRef === indexRef ) {
				this.setValue( newIndex );
			}
		};
	}( getNewKeypath );

	/* virtualdom/items/shared/Mustache/_Mustache.js */
	var Mustache = function( getValue, init, resolve, rebind ) {

		return {
			getValue: getValue,
			init: init,
			resolve: resolve,
			rebind: rebind
		};
	}( getValue, initialise, resolve, rebind );

	/* virtualdom/items/Interpolator.js */
	var Interpolator = function( types, runloop, escapeHtml, detachNode, isEqual, unbind, Mustache, detach ) {

		var Interpolator = function( options ) {
			this.type = types.INTERPOLATOR;
			Mustache.init( this, options );
		};
		Interpolator.prototype = {
			update: function() {
				this.node.data = this.value == undefined ? '' : this.value;
			},
			resolve: Mustache.resolve,
			rebind: Mustache.rebind,
			detach: detach,
			unbind: unbind,
			render: function() {
				if ( !this.node ) {
					this.node = document.createTextNode( this.value != undefined ? this.value : '' );
				}
				return this.node;
			},
			unrender: function( shouldDestroy ) {
				if ( shouldDestroy ) {
					detachNode( this.node );
				}
			},
			getValue: Mustache.getValue,
			// TEMP
			setValue: function( value ) {
				var wrapper;
				// TODO is there a better way to approach this?
				if ( wrapper = this.root.viewmodel.wrapped[ this.keypath ] ) {
					value = wrapper.get();
				}
				if ( !isEqual( value, this.value ) ) {
					this.value = value;
					this.parentFragment.bubble();
					if ( this.node ) {
						runloop.addView( this );
					}
				}
			},
			firstNode: function() {
				return this.node;
			},
			toString: function( escape ) {
				var string = this.value != undefined ? '' + this.value : '';
				return escape ? escapeHtml( string ) : string;
			}
		};
		return Interpolator;
	}( types, runloop, escapeHtml, detachNode, isEqual, unbind, Mustache, detach );

	/* virtualdom/items/Section/prototype/bubble.js */
	var virtualdom_items_Section$bubble = function Section$bubble() {
		this.parentFragment.bubble();
	};

	/* virtualdom/items/Section/prototype/detach.js */
	var virtualdom_items_Section$detach = function Section$detach() {
		var docFrag;
		if ( this.fragments.length === 1 ) {
			return this.fragments[ 0 ].detach();
		}
		docFrag = document.createDocumentFragment();
		this.fragments.forEach( function( item ) {
			docFrag.appendChild( item.detach() );
		} );
		return docFrag;
	};

	/* virtualdom/items/Section/prototype/find.js */
	var virtualdom_items_Section$find = function Section$find( selector ) {
		var i, len, queryResult;
		len = this.fragments.length;
		for ( i = 0; i < len; i += 1 ) {
			if ( queryResult = this.fragments[ i ].find( selector ) ) {
				return queryResult;
			}
		}
		return null;
	};

	/* virtualdom/items/Section/prototype/findAll.js */
	var virtualdom_items_Section$findAll = function Section$findAll( selector, query ) {
		var i, len;
		len = this.fragments.length;
		for ( i = 0; i < len; i += 1 ) {
			this.fragments[ i ].findAll( selector, query );
		}
	};

	/* virtualdom/items/Section/prototype/findAllComponents.js */
	var virtualdom_items_Section$findAllComponents = function Section$findAllComponents( selector, query ) {
		var i, len;
		len = this.fragments.length;
		for ( i = 0; i < len; i += 1 ) {
			this.fragments[ i ].findAllComponents( selector, query );
		}
	};

	/* virtualdom/items/Section/prototype/findComponent.js */
	var virtualdom_items_Section$findComponent = function Section$findComponent( selector ) {
		var i, len, queryResult;
		len = this.fragments.length;
		for ( i = 0; i < len; i += 1 ) {
			if ( queryResult = this.fragments[ i ].findComponent( selector ) ) {
				return queryResult;
			}
		}
		return null;
	};

	/* virtualdom/items/Section/prototype/findNextNode.js */
	var virtualdom_items_Section$findNextNode = function Section$findNextNode( fragment ) {
		if ( this.fragments[ fragment.index + 1 ] ) {
			return this.fragments[ fragment.index + 1 ].firstNode();
		}
		return this.parentFragment.findNextNode( this );
	};

	/* virtualdom/items/Section/prototype/firstNode.js */
	var virtualdom_items_Section$firstNode = function Section$firstNode() {
		var len, i, node;
		if ( len = this.fragments.length ) {
			for ( i = 0; i < len; i += 1 ) {
				if ( node = this.fragments[ i ].firstNode() ) {
					return node;
				}
			}
		}
		return this.parentFragment.findNextNode( this );
	};

	/* virtualdom/items/Section/prototype/shuffle.js */
	var virtualdom_items_Section$shuffle = function( types, runloop, circular ) {

		var Fragment;
		circular.push( function() {
			Fragment = circular.Fragment;
		} );
		return function Section$shuffle( newIndices ) {
			var this$0 = this;
			var section = this,
				parentFragment, firstChange, i, newLength, reboundFragments, fragmentOptions, fragment;
			// short circuit any double-updates, and ensure that this isn't applied to
			// non-list sections
			if ( this.shuffling || this.unbound || this.subtype && this.subtype !== types.SECTION_EACH ) {
				return;
			}
			this.shuffling = true;
			runloop.scheduleTask( function() {
				return this$0.shuffling = false;
			} );
			parentFragment = this.parentFragment;
			reboundFragments = [];
			// first, rebind existing fragments
			newIndices.forEach( function rebindIfNecessary( newIndex, oldIndex ) {
				var fragment, by, oldKeypath, newKeypath;
				if ( newIndex === oldIndex ) {
					reboundFragments[ newIndex ] = section.fragments[ oldIndex ];
					return;
				}
				fragment = section.fragments[ oldIndex ];
				if ( firstChange === undefined ) {
					firstChange = oldIndex;
				}
				// does this fragment need to be torn down?
				if ( newIndex === -1 ) {
					section.fragmentsToUnrender.push( fragment );
					fragment.unbind();
					return;
				}
				// Otherwise, it needs to be rebound to a new index
				by = newIndex - oldIndex;
				oldKeypath = section.keypath + '.' + oldIndex;
				newKeypath = section.keypath + '.' + newIndex;
				fragment.rebind( section.template.i, newIndex, oldKeypath, newKeypath );
				fragment.index = newIndex;
				reboundFragments[ newIndex ] = fragment;
			} );
			newLength = this.root.get( this.keypath ).length;
			// If nothing changed with the existing fragments, then we start adding
			// new fragments at the end...
			if ( firstChange === undefined ) {
				// ...unless there are no new fragments to add
				if ( this.length === newLength ) {
					return;
				}
				firstChange = this.length;
			}
			this.length = this.fragments.length = newLength;
			if ( this.rendered ) {
				runloop.addView( this );
			}
			// Prepare new fragment options
			fragmentOptions = {
				template: this.template.f,
				root: this.root,
				owner: this
			};
			if ( this.template.i ) {
				fragmentOptions.indexRef = this.template.i;
			}
			// Add as many new fragments as we need to, or add back existing
			// (detached) fragments
			for ( i = firstChange; i < newLength; i += 1 ) {
				fragment = reboundFragments[ i ];
				if ( !fragment ) {
					this.fragmentsToCreate.push( i );
				}
				this.fragments[ i ] = fragment;
			}
		};
	}( types, runloop, circular );

	/* virtualdom/items/Section/prototype/render.js */
	var virtualdom_items_Section$render = function Section$render() {
		var docFrag;
		docFrag = this.docFrag = document.createDocumentFragment();
		this.update();
		this.rendered = true;
		return docFrag;
	};

	/* utils/isArrayLike.js */
	var isArrayLike = function() {

		var pattern = /^\[object (?:Array|FileList)\]$/,
			toString = Object.prototype.toString;
		return function isArrayLike( obj ) {
			return pattern.test( toString.call( obj ) );
		};
	}();

	/* virtualdom/items/Section/prototype/setValue.js */
	var virtualdom_items_Section$setValue = function( types, isArrayLike, isObject, runloop, circular ) {

		var __export;
		var Fragment;
		circular.push( function() {
			Fragment = circular.Fragment;
		} );
		__export = function Section$setValue( value ) {
			var this$0 = this;
			var wrapper, fragmentOptions;
			if ( this.updating ) {
				// If a child of this section causes a re-evaluation - for example, an
				// expression refers to a function that mutates the array that this
				// section depends on - we'll end up with a double rendering bug (see
				// https://github.com/ractivejs/ractive/issues/748). This prevents it.
				return;
			}
			this.updating = true;
			// with sections, we need to get the fake value if we have a wrapped object
			if ( wrapper = this.root.viewmodel.wrapped[ this.keypath ] ) {
				value = wrapper.get();
			}
			// If any fragments are awaiting creation after a splice,
			// this is the place to do it
			if ( this.fragmentsToCreate.length ) {
				fragmentOptions = {
					template: this.template.f,
					root: this.root,
					pElement: this.pElement,
					owner: this,
					indexRef: this.template.i
				};
				this.fragmentsToCreate.forEach( function( index ) {
					var fragment;
					fragmentOptions.context = this$0.keypath + '.' + index;
					fragmentOptions.index = index;
					fragment = new Fragment( fragmentOptions );
					this$0.fragmentsToRender.push( this$0.fragments[ index ] = fragment );
				} );
				this.fragmentsToCreate.length = 0;
			} else if ( reevaluateSection( this, value ) ) {
				this.bubble();
				if ( this.rendered ) {
					runloop.addView( this );
				}
			}
			this.value = value;
			this.updating = false;
		};

		function reevaluateSection( section, value ) {
			var fragmentOptions = {
				template: section.template.f,
				root: section.root,
				pElement: section.parentFragment.pElement,
				owner: section
			};
			// If we already know the section type, great
			// TODO can this be optimised? i.e. pick an reevaluateSection function during init
			// and avoid doing this each time?
			if ( section.subtype ) {
				switch ( section.subtype ) {
					case types.SECTION_IF:
						return reevaluateConditionalSection( section, value, false, fragmentOptions );
					case types.SECTION_UNLESS:
						return reevaluateConditionalSection( section, value, true, fragmentOptions );
					case types.SECTION_WITH:
						return reevaluateContextSection( section, fragmentOptions );
					case types.SECTION_IF_WITH:
						return reevaluateConditionalContextSection( section, value, fragmentOptions );
					case types.SECTION_EACH:
						if ( isObject( value ) ) {
							return reevaluateListObjectSection( section, value, fragmentOptions );
						}
				}
			}
			// Otherwise we need to work out what sort of section we're dealing with
			section.ordered = !!isArrayLike( value );
			// Ordered list section
			if ( section.ordered ) {
				return reevaluateListSection( section, value, fragmentOptions );
			}
			// Unordered list, or context
			if ( isObject( value ) || typeof value === 'function' ) {
				// Index reference indicates section should be treated as a list
				if ( section.template.i ) {
					return reevaluateListObjectSection( section, value, fragmentOptions );
				}
				// Otherwise, object provides context for contents
				return reevaluateContextSection( section, fragmentOptions );
			}
			// Conditional section
			return reevaluateConditionalSection( section, value, false, fragmentOptions );
		}

		function reevaluateListSection( section, value, fragmentOptions ) {
			var i, length, fragment;
			length = value.length;
			if ( length === section.length ) {
				// Nothing to do
				return false;
			}
			// if the array is shorter than it was previously, remove items
			if ( length < section.length ) {
				section.fragmentsToUnrender = section.fragments.splice( length, section.length - length );
				section.fragmentsToUnrender.forEach( unbind );
			} else {
				if ( length > section.length ) {
					// add any new ones
					for ( i = section.length; i < length; i += 1 ) {
						// append list item to context stack
						fragmentOptions.context = section.keypath + '.' + i;
						fragmentOptions.index = i;
						if ( section.template.i ) {
							fragmentOptions.indexRef = section.template.i;
						}
						fragment = new Fragment( fragmentOptions );
						section.fragmentsToRender.push( section.fragments[ i ] = fragment );
					}
				}
			}
			section.length = length;
			return true;
		}

		function reevaluateListObjectSection( section, value, fragmentOptions ) {
			var id, i, hasKey, fragment, changed;
			hasKey = section.hasKey || ( section.hasKey = {} );
			// remove any fragments that should no longer exist
			i = section.fragments.length;
			while ( i-- ) {
				fragment = section.fragments[ i ];
				if ( !( fragment.index in value ) ) {
					changed = true;
					fragment.unbind();
					section.fragmentsToUnrender.push( fragment );
					section.fragments.splice( i, 1 );
					hasKey[ fragment.index ] = false;
				}
			}
			// add any that haven't been created yet
			for ( id in value ) {
				if ( !hasKey[ id ] ) {
					changed = true;
					fragmentOptions.context = section.keypath + '.' + id;
					fragmentOptions.index = id;
					if ( section.template.i ) {
						fragmentOptions.indexRef = section.template.i;
					}
					fragment = new Fragment( fragmentOptions );
					section.fragmentsToRender.push( fragment );
					section.fragments.push( fragment );
					hasKey[ id ] = true;
				}
			}
			section.length = section.fragments.length;
			return changed;
		}

		function reevaluateConditionalContextSection( section, value, fragmentOptions ) {
			if ( value ) {
				return reevaluateContextSection( section, fragmentOptions );
			} else {
				return removeSectionFragments( section );
			}
		}

		function reevaluateContextSection( section, fragmentOptions ) {
			var fragment;
			// ...then if it isn't rendered, render it, adding section.keypath to the context stack
			// (if it is already rendered, then any children dependent on the context stack
			// will update themselves without any prompting)
			if ( !section.length ) {
				// append this section to the context stack
				fragmentOptions.context = section.keypath;
				fragmentOptions.index = 0;
				fragment = new Fragment( fragmentOptions );
				section.fragmentsToRender.push( section.fragments[ 0 ] = fragment );
				section.length = 1;
				return true;
			}
		}

		function reevaluateConditionalSection( section, value, inverted, fragmentOptions ) {
			var doRender, emptyArray, emptyObject, fragment, name;
			emptyArray = isArrayLike( value ) && value.length === 0;
			emptyObject = false;
			if ( !isArrayLike( value ) && isObject( value ) ) {
				emptyObject = true;
				for ( name in value ) {
					emptyObject = false;
					break;
				}
			}
			if ( inverted ) {
				doRender = emptyArray || emptyObject || !value;
			} else {
				doRender = value && !emptyArray && !emptyObject;
			}
			if ( doRender ) {
				if ( !section.length ) {
					// no change to context stack
					fragmentOptions.index = 0;
					fragment = new Fragment( fragmentOptions );
					section.fragmentsToRender.push( section.fragments[ 0 ] = fragment );
					section.length = 1;
					return true;
				}
				if ( section.length > 1 ) {
					section.fragmentsToUnrender = section.fragments.splice( 1 );
					section.fragmentsToUnrender.forEach( unbind );
					return true;
				}
			} else {
				return removeSectionFragments( section );
			}
		}

		function removeSectionFragments( section ) {
			if ( section.length ) {
				section.fragmentsToUnrender = section.fragments.splice( 0, section.fragments.length ).filter( isRendered );
				section.fragmentsToUnrender.forEach( unbind );
				section.length = section.fragmentsToRender.length = 0;
				return true;
			}
		}

		function unbind( fragment ) {
			fragment.unbind();
		}

		function isRendered( fragment ) {
			return fragment.rendered;
		}
		return __export;
	}( types, isArrayLike, isObject, runloop, circular );

	/* virtualdom/items/Section/prototype/toString.js */
	var virtualdom_items_Section$toString = function Section$toString( escape ) {
		var str, i, len;
		str = '';
		i = 0;
		len = this.length;
		for ( i = 0; i < len; i += 1 ) {
			str += this.fragments[ i ].toString( escape );
		}
		return str;
	};

	/* virtualdom/items/Section/prototype/unbind.js */
	var virtualdom_items_Section$unbind = function( unbind ) {

		var __export;
		__export = function Section$unbind() {
			this.fragments.forEach( unbindFragment );
			unbind.call( this );
			this.length = 0;
			this.unbound = true;
		};

		function unbindFragment( fragment ) {
			fragment.unbind();
		}
		return __export;
	}( unbind );

	/* virtualdom/items/Section/prototype/unrender.js */
	var virtualdom_items_Section$unrender = function() {

		var __export;
		__export = function Section$unrender( shouldDestroy ) {
			this.fragments.forEach( shouldDestroy ? unrenderAndDestroy : unrender );
		};

		function unrenderAndDestroy( fragment ) {
			fragment.unrender( true );
		}

		function unrender( fragment ) {
			fragment.unrender( false );
		}
		return __export;
	}();

	/* virtualdom/items/Section/prototype/update.js */
	var virtualdom_items_Section$update = function Section$update() {
		var fragment, renderIndex, renderedFragments, anchor, target, i, len;
		// `this.renderedFragments` is in the order of the previous render.
		// If fragments have shuffled about, this allows us to quickly
		// reinsert them in the correct place
		renderedFragments = this.renderedFragments;
		// Remove fragments that have been marked for destruction
		while ( fragment = this.fragmentsToUnrender.pop() ) {
			fragment.unrender( true );
			renderedFragments.splice( renderedFragments.indexOf( fragment ), 1 );
		}
		// Render new fragments (but don't insert them yet)
		while ( fragment = this.fragmentsToRender.shift() ) {
			fragment.render();
		}
		if ( this.rendered ) {
			target = this.parentFragment.getNode();
		}
		len = this.fragments.length;
		for ( i = 0; i < len; i += 1 ) {
			fragment = this.fragments[ i ];
			renderIndex = renderedFragments.indexOf( fragment, i );
			// search from current index - it's guaranteed to be the same or higher
			if ( renderIndex === i ) {
				// already in the right place. insert accumulated nodes (if any) and carry on
				if ( this.docFrag.childNodes.length ) {
					anchor = fragment.firstNode();
					target.insertBefore( this.docFrag, anchor );
				}
				continue;
			}
			this.docFrag.appendChild( fragment.detach() );
			// update renderedFragments
			if ( renderIndex !== -1 ) {
				renderedFragments.splice( renderIndex, 1 );
			}
			renderedFragments.splice( i, 0, fragment );
		}
		if ( this.rendered && this.docFrag.childNodes.length ) {
			anchor = this.parentFragment.findNextNode( this );
			target.insertBefore( this.docFrag, anchor );
		}
		// Save the rendering order for next time
		this.renderedFragments = this.fragments.slice();
	};

	/* virtualdom/items/Section/_Section.js */
	var Section = function( types, Mustache, bubble, detach, find, findAll, findAllComponents, findComponent, findNextNode, firstNode, shuffle, render, setValue, toString, unbind, unrender, update ) {

		var Section = function( options ) {
			this.type = types.SECTION;
			this.subtype = options.template.n;
			this.inverted = this.subtype === types.SECTION_UNLESS;
			this.pElement = options.pElement;
			this.fragments = [];
			this.fragmentsToCreate = [];
			this.fragmentsToRender = [];
			this.fragmentsToUnrender = [];
			this.renderedFragments = [];
			this.length = 0;
			// number of times this section is rendered
			Mustache.init( this, options );
		};
		Section.prototype = {
			bubble: bubble,
			detach: detach,
			find: find,
			findAll: findAll,
			findAllComponents: findAllComponents,
			findComponent: findComponent,
			findNextNode: findNextNode,
			firstNode: firstNode,
			getValue: Mustache.getValue,
			shuffle: shuffle,
			rebind: Mustache.rebind,
			render: render,
			resolve: Mustache.resolve,
			setValue: setValue,
			toString: toString,
			unbind: unbind,
			unrender: unrender,
			update: update
		};
		return Section;
	}( types, Mustache, virtualdom_items_Section$bubble, virtualdom_items_Section$detach, virtualdom_items_Section$find, virtualdom_items_Section$findAll, virtualdom_items_Section$findAllComponents, virtualdom_items_Section$findComponent, virtualdom_items_Section$findNextNode, virtualdom_items_Section$firstNode, virtualdom_items_Section$shuffle, virtualdom_items_Section$render, virtualdom_items_Section$setValue, virtualdom_items_Section$toString, virtualdom_items_Section$unbind, virtualdom_items_Section$unrender, virtualdom_items_Section$update );

	/* virtualdom/items/Triple/prototype/detach.js */
	var virtualdom_items_Triple$detach = function Triple$detach() {
		var len, i;
		if ( this.docFrag ) {
			len = this.nodes.length;
			for ( i = 0; i < len; i += 1 ) {
				this.docFrag.appendChild( this.nodes[ i ] );
			}
			return this.docFrag;
		}
	};

	/* virtualdom/items/Triple/prototype/find.js */
	var virtualdom_items_Triple$find = function( matches ) {

		return function Triple$find( selector ) {
			var i, len, node, queryResult;
			len = this.nodes.length;
			for ( i = 0; i < len; i += 1 ) {
				node = this.nodes[ i ];
				if ( node.nodeType !== 1 ) {
					continue;
				}
				if ( matches( node, selector ) ) {
					return node;
				}
				if ( queryResult = node.querySelector( selector ) ) {
					return queryResult;
				}
			}
			return null;
		};
	}( matches );

	/* virtualdom/items/Triple/prototype/findAll.js */
	var virtualdom_items_Triple$findAll = function( matches ) {

		return function Triple$findAll( selector, queryResult ) {
			var i, len, node, queryAllResult, numNodes, j;
			len = this.nodes.length;
			for ( i = 0; i < len; i += 1 ) {
				node = this.nodes[ i ];
				if ( node.nodeType !== 1 ) {
					continue;
				}
				if ( matches( node, selector ) ) {
					queryResult.push( node );
				}
				if ( queryAllResult = node.querySelectorAll( selector ) ) {
					numNodes = queryAllResult.length;
					for ( j = 0; j < numNodes; j += 1 ) {
						queryResult.push( queryAllResult[ j ] );
					}
				}
			}
		};
	}( matches );

	/* virtualdom/items/Triple/prototype/firstNode.js */
	var virtualdom_items_Triple$firstNode = function Triple$firstNode() {
		if ( this.rendered && this.nodes[ 0 ] ) {
			return this.nodes[ 0 ];
		}
		return this.parentFragment.findNextNode( this );
	};

	/* virtualdom/items/Triple/helpers/insertHtml.js */
	var insertHtml = function( namespaces, createElement ) {

		var __export;
		var elementCache = {},
			ieBug, ieBlacklist;
		try {
			createElement( 'table' ).innerHTML = 'foo';
		} catch ( err ) {
			ieBug = true;
			ieBlacklist = {
				TABLE: [
					'<table class="x">',
					'</table>'
				],
				THEAD: [
					'<table><thead class="x">',
					'</thead></table>'
				],
				TBODY: [
					'<table><tbody class="x">',
					'</tbody></table>'
				],
				TR: [
					'<table><tr class="x">',
					'</tr></table>'
				],
				SELECT: [
					'<select class="x">',
					'</select>'
				]
			};
		}
		__export = function( html, node, docFrag ) {
			var container, nodes = [],
				wrapper, selectedOption, child, i;
			// render 0 and false
			if ( html != null && html !== '' ) {
				if ( ieBug && ( wrapper = ieBlacklist[ node.tagName ] ) ) {
					container = element( 'DIV' );
					container.innerHTML = wrapper[ 0 ] + html + wrapper[ 1 ];
					container = container.querySelector( '.x' );
					if ( container.tagName === 'SELECT' ) {
						selectedOption = container.options[ container.selectedIndex ];
					}
				} else if ( node.namespaceURI === namespaces.svg ) {
					container = element( 'DIV' );
					container.innerHTML = '<svg class="x">' + html + '</svg>';
					container = container.querySelector( '.x' );
				} else {
					container = element( node.tagName );
					container.innerHTML = html;
				}
				while ( child = container.firstChild ) {
					nodes.push( child );
					docFrag.appendChild( child );
				}
				// This is really annoying. Extracting <option> nodes from the
				// temporary container <select> causes the remaining ones to
				// become selected. So now we have to deselect them. IE8, you
				// amaze me. You really do
				if ( ieBug && node.tagName === 'SELECT' ) {
					i = nodes.length;
					while ( i-- ) {
						if ( nodes[ i ] !== selectedOption ) {
							nodes[ i ].selected = false;
						}
					}
				}
			}
			return nodes;
		};

		function element( tagName ) {
			return elementCache[ tagName ] || ( elementCache[ tagName ] = createElement( tagName ) );
		}
		return __export;
	}( namespaces, createElement );

	/* utils/toArray.js */
	var toArray = function toArray( arrayLike ) {
		var array = [],
			i = arrayLike.length;
		while ( i-- ) {
			array[ i ] = arrayLike[ i ];
		}
		return array;
	};

	/* virtualdom/items/Triple/helpers/updateSelect.js */
	var updateSelect = function( toArray ) {

		var __export;
		__export = function updateSelect( parentElement ) {
			var selectedOptions, option, value;
			if ( !parentElement || parentElement.name !== 'select' || !parentElement.binding ) {
				return;
			}
			selectedOptions = toArray( parentElement.node.options ).filter( isSelected );
			// If one of them had a `selected` attribute, we need to sync
			// the model to the view
			if ( parentElement.getAttribute( 'multiple' ) ) {
				value = selectedOptions.map( function( o ) {
					return o.value;
				} );
			} else if ( option = selectedOptions[ 0 ] ) {
				value = option.value;
			}
			if ( value !== undefined ) {
				parentElement.binding.setValue( value );
			}
			parentElement.bubble();
		};

		function isSelected( option ) {
			return option.selected;
		}
		return __export;
	}( toArray );

	/* virtualdom/items/Triple/prototype/render.js */
	var virtualdom_items_Triple$render = function( insertHtml, updateSelect ) {

		return function Triple$render() {
			if ( this.rendered ) {
				throw new Error( 'Attempted to render an item that was already rendered' );
			}
			this.docFrag = document.createDocumentFragment();
			this.nodes = insertHtml( this.value, this.parentFragment.getNode(), this.docFrag );
			// Special case - we're inserting the contents of a <select>
			updateSelect( this.pElement );
			this.rendered = true;
			return this.docFrag;
		};
	}( insertHtml, updateSelect );

	/* virtualdom/items/Triple/prototype/setValue.js */
	var virtualdom_items_Triple$setValue = function( runloop ) {

		return function Triple$setValue( value ) {
			var wrapper;
			// TODO is there a better way to approach this?
			if ( wrapper = this.root.viewmodel.wrapped[ this.keypath ] ) {
				value = wrapper.get();
			}
			if ( value !== this.value ) {
				this.value = value;
				this.parentFragment.bubble();
				if ( this.rendered ) {
					runloop.addView( this );
				}
			}
		};
	}( runloop );

	/* virtualdom/items/Triple/prototype/toString.js */
	var virtualdom_items_Triple$toString = function( decodeCharacterReferences ) {

		return function Triple$toString() {
			return this.value != undefined ? decodeCharacterReferences( '' + this.value ) : '';
		};
	}( decodeCharacterReferences );

	/* virtualdom/items/Triple/prototype/unrender.js */
	var virtualdom_items_Triple$unrender = function( detachNode ) {

		return function Triple$unrender( shouldDestroy ) {
			if ( this.rendered && shouldDestroy ) {
				this.nodes.forEach( detachNode );
				this.rendered = false;
			}
		};
	}( detachNode );

	/* virtualdom/items/Triple/prototype/update.js */
	var virtualdom_items_Triple$update = function( insertHtml, updateSelect ) {

		return function Triple$update() {
			var node, parentNode;
			if ( !this.rendered ) {
				return;
			}
			// Remove existing nodes
			while ( this.nodes && this.nodes.length ) {
				node = this.nodes.pop();
				node.parentNode.removeChild( node );
			}
			// Insert new nodes
			parentNode = this.parentFragment.getNode();
			this.nodes = insertHtml( this.value, parentNode, this.docFrag );
			parentNode.insertBefore( this.docFrag, this.parentFragment.findNextNode( this ) );
			// Special case - we're inserting the contents of a <select>
			updateSelect( this.pElement );
		};
	}( insertHtml, updateSelect );

	/* virtualdom/items/Triple/_Triple.js */
	var Triple = function( types, Mustache, detach, find, findAll, firstNode, render, setValue, toString, unrender, update, unbind ) {

		var Triple = function( options ) {
			this.type = types.TRIPLE;
			Mustache.init( this, options );
		};
		Triple.prototype = {
			detach: detach,
			find: find,
			findAll: findAll,
			firstNode: firstNode,
			getValue: Mustache.getValue,
			rebind: Mustache.rebind,
			render: render,
			resolve: Mustache.resolve,
			setValue: setValue,
			toString: toString,
			unbind: unbind,
			unrender: unrender,
			update: update
		};
		return Triple;
	}( types, Mustache, virtualdom_items_Triple$detach, virtualdom_items_Triple$find, virtualdom_items_Triple$findAll, virtualdom_items_Triple$firstNode, virtualdom_items_Triple$render, virtualdom_items_Triple$setValue, virtualdom_items_Triple$toString, virtualdom_items_Triple$unrender, virtualdom_items_Triple$update, unbind );

	/* virtualdom/items/Element/prototype/bubble.js */
	var virtualdom_items_Element$bubble = function() {
		this.parentFragment.bubble();
	};

	/* virtualdom/items/Element/prototype/detach.js */
	var virtualdom_items_Element$detach = function Element$detach() {
		var node = this.node,
			parentNode;
		if ( node ) {
			// need to check for parent node - DOM may have been altered
			// by something other than Ractive! e.g. jQuery UI...
			if ( parentNode = node.parentNode ) {
				parentNode.removeChild( node );
			}
			return node;
		}
	};

	/* virtualdom/items/Element/prototype/find.js */
	var virtualdom_items_Element$find = function( matches ) {

		return function( selector ) {
			if ( matches( this.node, selector ) ) {
				return this.node;
			}
			if ( this.fragment && this.fragment.find ) {
				return this.fragment.find( selector );
			}
		};
	}( matches );

	/* virtualdom/items/Element/prototype/findAll.js */
	var virtualdom_items_Element$findAll = function( selector, query ) {
		// Add this node to the query, if applicable, and register the
		// query on this element
		if ( query._test( this, true ) && query.live ) {
			( this.liveQueries || ( this.liveQueries = [] ) ).push( query );
		}
		if ( this.fragment ) {
			this.fragment.findAll( selector, query );
		}
	};

	/* virtualdom/items/Element/prototype/findAllComponents.js */
	var virtualdom_items_Element$findAllComponents = function( selector, query ) {
		if ( this.fragment ) {
			this.fragment.findAllComponents( selector, query );
		}
	};

	/* virtualdom/items/Element/prototype/findComponent.js */
	var virtualdom_items_Element$findComponent = function( selector ) {
		if ( this.fragment ) {
			return this.fragment.findComponent( selector );
		}
	};

	/* virtualdom/items/Element/prototype/findNextNode.js */
	var virtualdom_items_Element$findNextNode = function Element$findNextNode() {
		return null;
	};

	/* virtualdom/items/Element/prototype/firstNode.js */
	var virtualdom_items_Element$firstNode = function Element$firstNode() {
		return this.node;
	};

	/* virtualdom/items/Element/prototype/getAttribute.js */
	var virtualdom_items_Element$getAttribute = function Element$getAttribute( name ) {
		if ( !this.attributes || !this.attributes[ name ] ) {
			return;
		}
		return this.attributes[ name ].value;
	};

	/* virtualdom/items/Element/shared/enforceCase.js */
	var enforceCase = function() {

		var svgCamelCaseElements, svgCamelCaseAttributes, createMap, map;
		svgCamelCaseElements = 'altGlyph altGlyphDef altGlyphItem animateColor animateMotion animateTransform clipPath feBlend feColorMatrix feComponentTransfer feComposite feConvolveMatrix feDiffuseLighting feDisplacementMap feDistantLight feFlood feFuncA feFuncB feFuncG feFuncR feGaussianBlur feImage feMerge feMergeNode feMorphology feOffset fePointLight feSpecularLighting feSpotLight feTile feTurbulence foreignObject glyphRef linearGradient radialGradient textPath vkern'.split( ' ' );
		svgCamelCaseAttributes = 'attributeName attributeType baseFrequency baseProfile calcMode clipPathUnits contentScriptType contentStyleType diffuseConstant edgeMode externalResourcesRequired filterRes filterUnits glyphRef gradientTransform gradientUnits kernelMatrix kernelUnitLength keyPoints keySplines keyTimes lengthAdjust limitingConeAngle markerHeight markerUnits markerWidth maskContentUnits maskUnits numOctaves pathLength patternContentUnits patternTransform patternUnits pointsAtX pointsAtY pointsAtZ preserveAlpha preserveAspectRatio primitiveUnits refX refY repeatCount repeatDur requiredExtensions requiredFeatures specularConstant specularExponent spreadMethod startOffset stdDeviation stitchTiles surfaceScale systemLanguage tableValues targetX targetY textLength viewBox viewTarget xChannelSelector yChannelSelector zoomAndPan'.split( ' ' );
		createMap = function( items ) {
			var map = {},
				i = items.length;
			while ( i-- ) {
				map[ items[ i ].toLowerCase() ] = items[ i ];
			}
			return map;
		};
		map = createMap( svgCamelCaseElements.concat( svgCamelCaseAttributes ) );
		return function( elementName ) {
			var lowerCaseElementName = elementName.toLowerCase();
			return map[ lowerCaseElementName ] || lowerCaseElementName;
		};
	}();

	/* virtualdom/items/Element/Attribute/prototype/bubble.js */
	var virtualdom_items_Element_Attribute$bubble = function( runloop, isEqual ) {

		return function Attribute$bubble() {
			var value = this.fragment.getValue();
			// TODO this can register the attribute multiple times (see render test
			// 'Attribute with nested mustaches')
			if ( !isEqual( value, this.value ) ) {
				// Need to clear old id from ractive.nodes
				if ( this.name === 'id' && this.value ) {
					delete this.root.nodes[ this.value ];
				}
				this.value = value;
				if ( this.name === 'value' && this.node ) {
					// We need to store the value on the DOM like this so we
					// can retrieve it later without it being coerced to a string
					this.node._ractive.value = value;
				}
				if ( this.rendered ) {
					runloop.addView( this );
				}
			}
		};
	}( runloop, isEqual );

	/* config/booleanAttributes.js */
	var booleanAttributes = function() {

		// https://github.com/kangax/html-minifier/issues/63#issuecomment-37763316
		var booleanAttributes = /^(allowFullscreen|async|autofocus|autoplay|checked|compact|controls|declare|default|defaultChecked|defaultMuted|defaultSelected|defer|disabled|draggable|enabled|formNoValidate|hidden|indeterminate|inert|isMap|itemScope|loop|multiple|muted|noHref|noResize|noShade|noValidate|noWrap|open|pauseOnExit|readOnly|required|reversed|scoped|seamless|selected|sortable|translate|trueSpeed|typeMustMatch|visible)$/i;
		return booleanAttributes;
	}();

	/* virtualdom/items/Element/Attribute/helpers/determineNameAndNamespace.js */
	var determineNameAndNamespace = function( namespaces, enforceCase ) {

		return function( attribute, name ) {
			var colonIndex, namespacePrefix;
			// are we dealing with a namespaced attribute, e.g. xlink:href?
			colonIndex = name.indexOf( ':' );
			if ( colonIndex !== -1 ) {
				// looks like we are, yes...
				namespacePrefix = name.substr( 0, colonIndex );
				// ...unless it's a namespace *declaration*, which we ignore (on the assumption
				// that only valid namespaces will be used)
				if ( namespacePrefix !== 'xmlns' ) {
					name = name.substring( colonIndex + 1 );
					attribute.name = enforceCase( name );
					attribute.namespace = namespaces[ namespacePrefix.toLowerCase() ];
					attribute.namespacePrefix = namespacePrefix;
					if ( !attribute.namespace ) {
						throw 'Unknown namespace ("' + namespacePrefix + '")';
					}
					return;
				}
			}
			// SVG attribute names are case sensitive
			attribute.name = attribute.element.namespace !== namespaces.html ? enforceCase( name ) : name;
		};
	}( namespaces, enforceCase );

	/* virtualdom/items/Element/Attribute/helpers/getInterpolator.js */
	var getInterpolator = function( types ) {

		return function getInterpolator( attribute ) {
			var items = attribute.fragment.items;
			if ( items.length !== 1 ) {
				return;
			}
			if ( items[ 0 ].type === types.INTERPOLATOR ) {
				return items[ 0 ];
			}
		};
	}( types );

	/* virtualdom/items/Element/Attribute/helpers/determinePropertyName.js */
	var determinePropertyName = function( namespaces, booleanAttributes ) {

		var propertyNames = {
			'accept-charset': 'acceptCharset',
			accesskey: 'accessKey',
			bgcolor: 'bgColor',
			'class': 'className',
			codebase: 'codeBase',
			colspan: 'colSpan',
			contenteditable: 'contentEditable',
			datetime: 'dateTime',
			dirname: 'dirName',
			'for': 'htmlFor',
			'http-equiv': 'httpEquiv',
			ismap: 'isMap',
			maxlength: 'maxLength',
			novalidate: 'noValidate',
			pubdate: 'pubDate',
			readonly: 'readOnly',
			rowspan: 'rowSpan',
			tabindex: 'tabIndex',
			usemap: 'useMap'
		};
		return function( attribute, options ) {
			var propertyName;
			if ( attribute.pNode && !attribute.namespace && ( !options.pNode.namespaceURI || options.pNode.namespaceURI === namespaces.html ) ) {
				propertyName = propertyNames[ attribute.name ] || attribute.name;
				if ( options.pNode[ propertyName ] !== undefined ) {
					attribute.propertyName = propertyName;
				}
				// is attribute a boolean attribute or 'value'? If so we're better off doing e.g.
				// node.selected = true rather than node.setAttribute( 'selected', '' )
				if ( booleanAttributes.test( propertyName ) || propertyName === 'value' ) {
					attribute.useProperty = true;
				}
			}
		};
	}( namespaces, booleanAttributes );

	/* virtualdom/items/Element/Attribute/prototype/init.js */
	var virtualdom_items_Element_Attribute$init = function( types, booleanAttributes, determineNameAndNamespace, getInterpolator, determinePropertyName, circular ) {

		var Fragment;
		circular.push( function() {
			Fragment = circular.Fragment;
		} );
		return function Attribute$init( options ) {
			this.type = types.ATTRIBUTE;
			this.element = options.element;
			this.root = options.root;
			determineNameAndNamespace( this, options.name );
			// if it's an empty attribute, or just a straight key-value pair, with no
			// mustache shenanigans, set the attribute accordingly and go home
			if ( !options.value || typeof options.value === 'string' ) {
				this.value = booleanAttributes.test( this.name ) ? true : options.value || '';
				return;
			}
			// otherwise we need to do some work
			// share parentFragment with parent element
			this.parentFragment = this.element.parentFragment;
			this.fragment = new Fragment( {
				template: options.value,
				root: this.root,
				owner: this
			} );
			this.value = this.fragment.getValue();
			// Store a reference to this attribute's interpolator, if its fragment
			// takes the form `{{foo}}`. This is necessary for two-way binding and
			// for correctly rendering HTML later
			this.interpolator = getInterpolator( this );
			this.isBindable = !!this.interpolator && !this.interpolator.isStatic;
			// can we establish this attribute's property name equivalent?
			determinePropertyName( this, options );
			// mark as ready
			this.ready = true;
		};
	}( types, booleanAttributes, determineNameAndNamespace, getInterpolator, determinePropertyName, circular );

	/* virtualdom/items/Element/Attribute/prototype/rebind.js */
	var virtualdom_items_Element_Attribute$rebind = function Attribute$rebind( indexRef, newIndex, oldKeypath, newKeypath ) {
		if ( this.fragment ) {
			this.fragment.rebind( indexRef, newIndex, oldKeypath, newKeypath );
		}
	};

	/* virtualdom/items/Element/Attribute/prototype/render.js */
	var virtualdom_items_Element_Attribute$render = function( namespaces, booleanAttributes ) {

		var propertyNames = {
			'accept-charset': 'acceptCharset',
			'accesskey': 'accessKey',
			'bgcolor': 'bgColor',
			'class': 'className',
			'codebase': 'codeBase',
			'colspan': 'colSpan',
			'contenteditable': 'contentEditable',
			'datetime': 'dateTime',
			'dirname': 'dirName',
			'for': 'htmlFor',
			'http-equiv': 'httpEquiv',
			'ismap': 'isMap',
			'maxlength': 'maxLength',
			'novalidate': 'noValidate',
			'pubdate': 'pubDate',
			'readonly': 'readOnly',
			'rowspan': 'rowSpan',
			'tabindex': 'tabIndex',
			'usemap': 'useMap'
		};
		return function Attribute$render( node ) {
			var propertyName;
			this.node = node;
			// should we use direct property access, or setAttribute?
			if ( !node.namespaceURI || node.namespaceURI === namespaces.html ) {
				propertyName = propertyNames[ this.name ] || this.name;
				if ( node[ propertyName ] !== undefined ) {
					this.propertyName = propertyName;
				}
				// is attribute a boolean attribute or 'value'? If so we're better off doing e.g.
				// node.selected = true rather than node.setAttribute( 'selected', '' )
				if ( booleanAttributes.test( propertyName ) || propertyName === 'value' ) {
					this.useProperty = true;
				}
				if ( propertyName === 'value' ) {
					this.useProperty = true;
					node._ractive.value = this.value;
				}
			}
			this.rendered = true;
			this.update();
		};
	}( namespaces, booleanAttributes );

	/* virtualdom/items/Element/Attribute/prototype/toString.js */
	var virtualdom_items_Element_Attribute$toString = function( booleanAttributes ) {

		var __export;
		__export = function Attribute$toString() {
			var name = ( fragment = this ).name,
				namespacePrefix = fragment.namespacePrefix,
				value = fragment.value,
				interpolator = fragment.interpolator,
				fragment = fragment.fragment;
			// Special case - select and textarea values (should not be stringified)
			if ( name === 'value' && ( this.element.name === 'select' || this.element.name === 'textarea' ) ) {
				return;
			}
			// Special case - content editable
			if ( name === 'value' && this.element.getAttribute( 'contenteditable' ) !== undefined ) {
				return;
			}
			// Special case - radio names
			if ( name === 'name' && this.element.name === 'input' && interpolator ) {
				return 'name={{' + ( interpolator.keypath || interpolator.ref ) + '}}';
			}
			// Boolean attributes
			if ( booleanAttributes.test( name ) ) {
				return value ? name : '';
			}
			if ( fragment ) {
				value = fragment.toString();
			}
			if ( namespacePrefix ) {
				name = namespacePrefix + ':' + name;
			}
			return value ? name + '="' + escape( value ) + '"' : name;
		};

		function escape( value ) {
			return value.replace( /&/g, '&amp;' ).replace( /"/g, '&quot;' ).replace( /'/g, '&#39;' );
		}
		return __export;
	}( booleanAttributes );

	/* virtualdom/items/Element/Attribute/prototype/unbind.js */
	var virtualdom_items_Element_Attribute$unbind = function Attribute$unbind() {
		// ignore non-dynamic attributes
		if ( this.fragment ) {
			this.fragment.unbind();
		}
		if ( this.name === 'id' ) {
			delete this.root.nodes[ this.value ];
		}
	};

	/* virtualdom/items/Element/Attribute/prototype/update/updateSelectValue.js */
	var virtualdom_items_Element_Attribute$update_updateSelectValue = function Attribute$updateSelect() {
		var value = this.value,
			options, option, optionValue, i;
		if ( !this.locked ) {
			this.node._ractive.value = value;
			options = this.node.options;
			i = options.length;
			while ( i-- ) {
				option = options[ i ];
				optionValue = option._ractive ? option._ractive.value : option.value;
				// options inserted via a triple don't have _ractive
				if ( optionValue == value ) {
					// double equals as we may be comparing numbers with strings
					option.selected = true;
					break;
				}
			}
		}
	};

	/* utils/arrayContains.js */
	var arrayContains = function arrayContains( array, value ) {
		for ( var i = 0, c = array.length; i < c; i++ ) {
			if ( array[ i ] == value ) {
				return true;
			}
		}
		return false;
	};

	/* virtualdom/items/Element/Attribute/prototype/update/updateMultipleSelectValue.js */
	var virtualdom_items_Element_Attribute$update_updateMultipleSelectValue = function( arrayContains, isArray ) {

		return function Attribute$updateMultipleSelect() {
			var value = this.value,
				options, i, option, optionValue;
			if ( !isArray( value ) ) {
				value = [ value ];
			}
			options = this.node.options;
			i = options.length;
			while ( i-- ) {
				option = options[ i ];
				optionValue = option._ractive ? option._ractive.value : option.value;
				// options inserted via a triple don't have _ractive
				option.selected = arrayContains( value, optionValue );
			}
		};
	}( arrayContains, isArray );

	/* virtualdom/items/Element/Attribute/prototype/update/updateRadioName.js */
	var virtualdom_items_Element_Attribute$update_updateRadioName = function Attribute$updateRadioName() {
		var node = ( value = this ).node,
			value = value.value;
		node.checked = value == node._ractive.value;
	};

	/* virtualdom/items/Element/Attribute/prototype/update/updateRadioValue.js */
	var virtualdom_items_Element_Attribute$update_updateRadioValue = function( runloop ) {

		return function Attribute$updateRadioValue() {
			var wasChecked, node = this.node,
				binding, bindings, i;
			wasChecked = node.checked;
			node.value = this.element.getAttribute( 'value' );
			node.checked = this.element.getAttribute( 'value' ) === this.element.getAttribute( 'name' );
			// This is a special case - if the input was checked, and the value
			// changed so that it's no longer checked, the twoway binding is
			// most likely out of date. To fix it we have to jump through some
			// hoops... this is a little kludgy but it works
			if ( wasChecked && !node.checked && this.element.binding ) {
				bindings = this.element.binding.siblings;
				if ( i = bindings.length ) {
					while ( i-- ) {
						binding = bindings[ i ];
						if ( !binding.element.node ) {
							// this is the initial render, siblings are still rendering!
							// we'll come back later...
							return;
						}
						if ( binding.element.node.checked ) {
							runloop.addViewmodel( binding.root.viewmodel );
							return binding.handleChange();
						}
					}
					runloop.addViewmodel( binding.root.viewmodel );
					this.root.viewmodel.set( binding.keypath, undefined );
				}
			}
		};
	}( runloop );

	/* virtualdom/items/Element/Attribute/prototype/update/updateCheckboxName.js */
	var virtualdom_items_Element_Attribute$update_updateCheckboxName = function( isArray ) {

		return function Attribute$updateCheckboxName() {
			var element = ( value = this ).element,
				node = value.node,
				value = value.value,
				valueAttribute, i;
			valueAttribute = element.getAttribute( 'value' );
			if ( !isArray( value ) ) {
				node.checked = value == valueAttribute;
			} else {
				i = value.length;
				while ( i-- ) {
					if ( valueAttribute == value[ i ] ) {
						node.checked = true;
						return;
					}
				}
			}
		};
	}( isArray );

	/* virtualdom/items/Element/Attribute/prototype/update/updateClassName.js */
	var virtualdom_items_Element_Attribute$update_updateClassName = function Attribute$updateClassName() {
		var node, value;
		node = this.node;
		value = this.value;
		if ( value === undefined ) {
			value = '';
		}
		node.className = value;
	};

	/* virtualdom/items/Element/Attribute/prototype/update/updateIdAttribute.js */
	var virtualdom_items_Element_Attribute$update_updateIdAttribute = function Attribute$updateIdAttribute() {
		var node = ( value = this ).node,
			value = value.value;
		this.root.nodes[ value ] = node;
		node.id = value;
	};

	/* virtualdom/items/Element/Attribute/prototype/update/updateIEStyleAttribute.js */
	var virtualdom_items_Element_Attribute$update_updateIEStyleAttribute = function Attribute$updateIEStyleAttribute() {
		var node, value;
		node = this.node;
		value = this.value;
		if ( value === undefined ) {
			value = '';
		}
		node.style.setAttribute( 'cssText', value );
	};

	/* virtualdom/items/Element/Attribute/prototype/update/updateContentEditableValue.js */
	var virtualdom_items_Element_Attribute$update_updateContentEditableValue = function Attribute$updateContentEditableValue() {
		var value = this.value;
		if ( value === undefined ) {
			value = '';
		}
		if ( !this.locked ) {
			this.node.innerHTML = value;
		}
	};

	/* virtualdom/items/Element/Attribute/prototype/update/updateValue.js */
	var virtualdom_items_Element_Attribute$update_updateValue = function Attribute$updateValue() {
		var node = ( value = this ).node,
			value = value.value;
		// store actual value, so it doesn't get coerced to a string
		node._ractive.value = value;
		// with two-way binding, only update if the change wasn't initiated by the user
		// otherwise the cursor will often be sent to the wrong place
		if ( !this.locked ) {
			node.value = value == undefined ? '' : value;
		}
	};

	/* virtualdom/items/Element/Attribute/prototype/update/updateBoolean.js */
	var virtualdom_items_Element_Attribute$update_updateBoolean = function Attribute$updateBooleanAttribute() {
		// with two-way binding, only update if the change wasn't initiated by the user
		// otherwise the cursor will often be sent to the wrong place
		if ( !this.locked ) {
			this.node[ this.propertyName ] = this.value;
		}
	};

	/* virtualdom/items/Element/Attribute/prototype/update/updateEverythingElse.js */
	var virtualdom_items_Element_Attribute$update_updateEverythingElse = function( booleanAttributes ) {

		return function Attribute$updateEverythingElse() {
			var node = ( fragment = this ).node,
				namespace = fragment.namespace,
				name = fragment.name,
				value = fragment.value,
				fragment = fragment.fragment;
			if ( namespace ) {
				node.setAttributeNS( namespace, name, ( fragment || value ).toString() );
			} else if ( !booleanAttributes.test( name ) ) {
				node.setAttribute( name, ( fragment || value ).toString() );
			} else {
				if ( value ) {
					node.setAttribute( name, '' );
				} else {
					node.removeAttribute( name );
				}
			}
		};
	}( booleanAttributes );

	/* virtualdom/items/Element/Attribute/prototype/update.js */
	var virtualdom_items_Element_Attribute$update = function( namespaces, noop, updateSelectValue, updateMultipleSelectValue, updateRadioName, updateRadioValue, updateCheckboxName, updateClassName, updateIdAttribute, updateIEStyleAttribute, updateContentEditableValue, updateValue, updateBoolean, updateEverythingElse ) {

		return function Attribute$update() {
			var name = ( node = this ).name,
				element = node.element,
				node = node.node,
				type, updateMethod;
			if ( name === 'id' ) {
				updateMethod = updateIdAttribute;
			} else if ( name === 'value' ) {
				// special case - selects
				if ( element.name === 'select' && name === 'value' ) {
					updateMethod = element.getAttribute( 'multiple' ) ? updateMultipleSelectValue : updateSelectValue;
				} else if ( element.name === 'textarea' ) {
					updateMethod = updateValue;
				} else if ( element.getAttribute( 'contenteditable' ) != null ) {
					updateMethod = updateContentEditableValue;
				} else if ( element.name === 'input' ) {
					type = element.getAttribute( 'type' );
					// type='file' value='{{fileList}}'>
					if ( type === 'file' ) {
						updateMethod = noop;
					} else if ( type === 'radio' && element.binding && element.binding.name === 'name' ) {
						updateMethod = updateRadioValue;
					} else {
						updateMethod = updateValue;
					}
				}
			} else if ( this.twoway && name === 'name' ) {
				if ( node.type === 'radio' ) {
					updateMethod = updateRadioName;
				} else if ( node.type === 'checkbox' ) {
					updateMethod = updateCheckboxName;
				}
			} else if ( name === 'style' && node.style.setAttribute ) {
				updateMethod = updateIEStyleAttribute;
			} else if ( name === 'class' && ( !node.namespaceURI || node.namespaceURI === namespaces.html ) ) {
				updateMethod = updateClassName;
			} else if ( this.useProperty ) {
				updateMethod = updateBoolean;
			}
			if ( !updateMethod ) {
				updateMethod = updateEverythingElse;
			}
			this.update = updateMethod;
			this.update();
		};
	}( namespaces, noop, virtualdom_items_Element_Attribute$update_updateSelectValue, virtualdom_items_Element_Attribute$update_updateMultipleSelectValue, virtualdom_items_Element_Attribute$update_updateRadioName, virtualdom_items_Element_Attribute$update_updateRadioValue, virtualdom_items_Element_Attribute$update_updateCheckboxName, virtualdom_items_Element_Attribute$update_updateClassName, virtualdom_items_Element_Attribute$update_updateIdAttribute, virtualdom_items_Element_Attribute$update_updateIEStyleAttribute, virtualdom_items_Element_Attribute$update_updateContentEditableValue, virtualdom_items_Element_Attribute$update_updateValue, virtualdom_items_Element_Attribute$update_updateBoolean, virtualdom_items_Element_Attribute$update_updateEverythingElse );

	/* virtualdom/items/Element/Attribute/_Attribute.js */
	var Attribute = function( bubble, init, rebind, render, toString, unbind, update ) {

		var Attribute = function( options ) {
			this.init( options );
		};
		Attribute.prototype = {
			bubble: bubble,
			init: init,
			rebind: rebind,
			render: render,
			toString: toString,
			unbind: unbind,
			update: update
		};
		return Attribute;
	}( virtualdom_items_Element_Attribute$bubble, virtualdom_items_Element_Attribute$init, virtualdom_items_Element_Attribute$rebind, virtualdom_items_Element_Attribute$render, virtualdom_items_Element_Attribute$toString, virtualdom_items_Element_Attribute$unbind, virtualdom_items_Element_Attribute$update );

	/* virtualdom/items/Element/prototype/init/createAttributes.js */
	var virtualdom_items_Element$init_createAttributes = function( Attribute ) {

		return function( element, attributes ) {
			var name, attribute, result = [];
			for ( name in attributes ) {
				if ( attributes.hasOwnProperty( name ) ) {
					attribute = new Attribute( {
						element: element,
						name: name,
						value: attributes[ name ],
						root: element.root
					} );
					result.push( result[ name ] = attribute );
				}
			}
			return result;
		};
	}( Attribute );

	/* virtualdom/items/Element/ConditionalAttribute/_ConditionalAttribute.js */
	var ConditionalAttribute = function( circular, namespaces, createElement, toArray ) {

		var __export;
		var Fragment, div;
		if ( typeof document !== 'undefined' ) {
			div = createElement( 'div' );
		}
		circular.push( function() {
			Fragment = circular.Fragment;
		} );
		var ConditionalAttribute = function( element, template ) {
			this.element = element;
			this.root = element.root;
			this.parentFragment = element.parentFragment;
			this.attributes = [];
			this.fragment = new Fragment( {
				root: element.root,
				owner: this,
				template: [ template ]
			} );
		};
		ConditionalAttribute.prototype = {
			bubble: function() {
				if ( this.node ) {
					this.update();
				}
				this.element.bubble();
			},
			rebind: function( indexRef, newIndex, oldKeypath, newKeypath ) {
				this.fragment.rebind( indexRef, newIndex, oldKeypath, newKeypath );
			},
			render: function( node ) {
				this.node = node;
				this.isSvg = node.namespaceURI === namespaces.svg;
				this.update();
			},
			unbind: function() {
				this.fragment.unbind();
			},
			update: function() {
				var this$0 = this;
				var str, attrs;
				str = this.fragment.toString();
				attrs = parseAttributes( str, this.isSvg );
				// any attributes that previously existed but no longer do
				// must be removed
				this.attributes.filter( function( a ) {
					return notIn( attrs, a );
				} ).forEach( function( a ) {
					this$0.node.removeAttribute( a.name );
				} );
				attrs.forEach( function( a ) {
					this$0.node.setAttribute( a.name, a.value );
				} );
				this.attributes = attrs;
			},
			toString: function() {
				return this.fragment.toString();
			}
		};
		__export = ConditionalAttribute;

		function parseAttributes( str, isSvg ) {
			var tag = isSvg ? 'svg' : 'div';
			div.innerHTML = '<' + tag + ' ' + str + '></' + tag + '>';
			return toArray( div.childNodes[ 0 ].attributes );
		}

		function notIn( haystack, needle ) {
			var i = haystack.length;
			while ( i-- ) {
				if ( haystack[ i ].name === needle.name ) {
					return false;
				}
			}
			return true;
		}
		return __export;
	}( circular, namespaces, createElement, toArray );

	/* virtualdom/items/Element/prototype/init/createConditionalAttributes.js */
	var virtualdom_items_Element$init_createConditionalAttributes = function( ConditionalAttribute ) {

		return function( element, attributes ) {
			if ( !attributes ) {
				return [];
			}
			return attributes.map( function( a ) {
				return new ConditionalAttribute( element, a );
			} );
		};
	}( ConditionalAttribute );

	/* utils/extend.js */
	var extend = function( target ) {
		var SLICE$0 = Array.prototype.slice;
		var sources = SLICE$0.call( arguments, 1 );
		var prop, source;
		while ( source = sources.shift() ) {
			for ( prop in source ) {
				if ( source.hasOwnProperty( prop ) ) {
					target[ prop ] = source[ prop ];
				}
			}
		}
		return target;
	};

	/* virtualdom/items/Element/Binding/Binding.js */
	var Binding = function( runloop, warn, create, extend, removeFromArray ) {

		var Binding = function( element ) {
			var interpolator, keypath, value;
			this.element = element;
			this.root = element.root;
			this.attribute = element.attributes[ this.name || 'value' ];
			interpolator = this.attribute.interpolator;
			interpolator.twowayBinding = this;
			if ( interpolator.keypath && interpolator.keypath.substr === '${' ) {
				warn( 'Two-way binding does not work with expressions: ' + interpolator.keypath );
				return false;
			}
			// A mustache may be *ambiguous*. Let's say we were given
			// `value="{{bar}}"`. If the context was `foo`, and `foo.bar`
			// *wasn't* `undefined`, the keypath would be `foo.bar`.
			// Then, any user input would result in `foo.bar` being updated.
			//
			// If, however, `foo.bar` *was* undefined, and so was `bar`, we would be
			// left with an unresolved partial keypath - so we are forced to make an
			// assumption. That assumption is that the input in question should
			// be forced to resolve to `bar`, and any user input would affect `bar`
			// and not `foo.bar`.
			//
			// Did that make any sense? No? Oh. Sorry. Well the moral of the story is
			// be explicit when using two-way data-binding about what keypath you're
			// updating. Using it in lists is probably a recipe for confusion...
			if ( !interpolator.keypath ) {
				if ( interpolator.ref ) {
					interpolator.resolve( interpolator.ref );
				}
				// If we have a reference expression resolver, we have to force
				// members to attach themselves to the root
				if ( interpolator.resolver ) {
					interpolator.resolver.forceResolution();
				}
			}
			this.keypath = keypath = interpolator.keypath;
			// initialise value, if it's undefined
			if ( this.root.viewmodel.get( keypath ) === undefined && this.getInitialValue ) {
				value = this.getInitialValue();
				if ( value !== undefined ) {
					this.root.viewmodel.set( keypath, value );
				}
			}
		};
		Binding.prototype = {
			handleChange: function() {
				var this$0 = this;
				runloop.start( this.root );
				this.attribute.locked = true;
				this.root.viewmodel.set( this.keypath, this.getValue() );
				runloop.scheduleTask( function() {
					return this$0.attribute.locked = false;
				} );
				runloop.end();
			},
			rebound: function() {
				var bindings, oldKeypath, newKeypath;
				oldKeypath = this.keypath;
				newKeypath = this.attribute.interpolator.keypath;
				// The attribute this binding is linked to has already done the work
				if ( oldKeypath === newKeypath ) {
					return;
				}
				removeFromArray( this.root._twowayBindings[ oldKeypath ], this );
				this.keypath = newKeypath;
				bindings = this.root._twowayBindings[ newKeypath ] || ( this.root._twowayBindings[ newKeypath ] = [] );
				bindings.push( this );
			},
			unbind: function() {}
		};
		Binding.extend = function( properties ) {
			var Parent = this,
				SpecialisedBinding;
			SpecialisedBinding = function( element ) {
				Binding.call( this, element );
				if ( this.init ) {
					this.init();
				}
			};
			SpecialisedBinding.prototype = create( Parent.prototype );
			extend( SpecialisedBinding.prototype, properties );
			SpecialisedBinding.extend = Binding.extend;
			return SpecialisedBinding;
		};
		return Binding;
	}( runloop, warn, create, extend, removeFromArray );

	/* virtualdom/items/Element/Binding/shared/handleDomEvent.js */
	var handleDomEvent = function handleChange() {
		this._ractive.binding.handleChange();
	};

	/* virtualdom/items/Element/Binding/ContentEditableBinding.js */
	var ContentEditableBinding = function( Binding, handleDomEvent ) {

		var ContentEditableBinding = Binding.extend( {
			getInitialValue: function() {
				return this.element.fragment ? this.element.fragment.toString() : '';
			},
			render: function() {
				var node = this.element.node;
				node.addEventListener( 'change', handleDomEvent, false );
				if ( !this.root.lazy ) {
					node.addEventListener( 'input', handleDomEvent, false );
					if ( node.attachEvent ) {
						node.addEventListener( 'keyup', handleDomEvent, false );
					}
				}
			},
			unrender: function() {
				var node = this.element.node;
				node.removeEventListener( 'change', handleDomEvent, false );
				node.removeEventListener( 'input', handleDomEvent, false );
				node.removeEventListener( 'keyup', handleDomEvent, false );
			},
			getValue: function() {
				return this.element.node.innerHTML;
			}
		} );
		return ContentEditableBinding;
	}( Binding, handleDomEvent );

	/* virtualdom/items/Element/Binding/shared/getSiblings.js */
	var getSiblings = function() {

		var sets = {};
		return function getSiblings( id, group, keypath ) {
			var hash = id + group + keypath;
			return sets[ hash ] || ( sets[ hash ] = [] );
		};
	}();

	/* virtualdom/items/Element/Binding/RadioBinding.js */
	var RadioBinding = function( runloop, removeFromArray, Binding, getSiblings, handleDomEvent ) {

		var RadioBinding = Binding.extend( {
			name: 'checked',
			init: function() {
				this.siblings = getSiblings( this.root._guid, 'radio', this.element.getAttribute( 'name' ) );
				this.siblings.push( this );
			},
			render: function() {
				var node = this.element.node;
				node.addEventListener( 'change', handleDomEvent, false );
				if ( node.attachEvent ) {
					node.addEventListener( 'click', handleDomEvent, false );
				}
			},
			unrender: function() {
				var node = this.element.node;
				node.removeEventListener( 'change', handleDomEvent, false );
				node.removeEventListener( 'click', handleDomEvent, false );
			},
			handleChange: function() {
				runloop.start( this.root );
				this.siblings.forEach( function( binding ) {
					binding.root.viewmodel.set( binding.keypath, binding.getValue() );
				} );
				runloop.end();
			},
			getValue: function() {
				return this.element.node.checked;
			},
			unbind: function() {
				removeFromArray( this.siblings, this );
			}
		} );
		return RadioBinding;
	}( runloop, removeFromArray, Binding, getSiblings, handleDomEvent );

	/* virtualdom/items/Element/Binding/RadioNameBinding.js */
	var RadioNameBinding = function( removeFromArray, Binding, handleDomEvent, getSiblings ) {

		var RadioNameBinding = Binding.extend( {
			name: 'name',
			init: function() {
				this.siblings = getSiblings( this.root._guid, 'radioname', this.keypath );
				this.siblings.push( this );
				this.radioName = true;
				// so that ractive.updateModel() knows what to do with this
				this.attribute.twoway = true;
			},
			getInitialValue: function() {
				if ( this.element.getAttribute( 'checked' ) ) {
					return this.element.getAttribute( 'value' );
				}
			},
			render: function() {
				var node = this.element.node;
				node.name = '{{' + this.keypath + '}}';
				node.checked = this.root.viewmodel.get( this.keypath ) == this.element.getAttribute( 'value' );
				node.addEventListener( 'change', handleDomEvent, false );
				if ( node.attachEvent ) {
					node.addEventListener( 'click', handleDomEvent, false );
				}
			},
			unrender: function() {
				var node = this.element.node;
				node.removeEventListener( 'change', handleDomEvent, false );
				node.removeEventListener( 'click', handleDomEvent, false );
			},
			getValue: function() {
				var node = this.element.node;
				return node._ractive ? node._ractive.value : node.value;
			},
			handleChange: function() {
				// If this <input> is the one that's checked, then the value of its
				// `name` keypath gets set to its value
				if ( this.element.node.checked ) {
					Binding.prototype.handleChange.call( this );
				}
			},
			rebound: function( indexRef, newIndex, oldKeypath, newKeypath ) {
				var node;
				Binding.prototype.rebound.call( this, indexRef, newIndex, oldKeypath, newKeypath );
				if ( node = this.element.node ) {
					node.name = '{{' + this.keypath + '}}';
				}
			},
			unbind: function() {
				removeFromArray( this.siblings, this );
			}
		} );
		return RadioNameBinding;
	}( removeFromArray, Binding, handleDomEvent, getSiblings );

	/* virtualdom/items/Element/Binding/CheckboxNameBinding.js */
	var CheckboxNameBinding = function( isArray, removeFromArray, Binding, getSiblings, handleDomEvent ) {

		var CheckboxNameBinding = Binding.extend( {
			name: 'name',
			getInitialValue: function() {
				// This only gets called once per group (of inputs that
				// share a name), because it only gets called if there
				// isn't an initial value. By the same token, we can make
				// a note of that fact that there was no initial value,
				// and populate it using any `checked` attributes that
				// exist (which users should avoid, but which we should
				// support anyway to avoid breaking expectations)
				this.noInitialValue = true;
				return [];
			},
			init: function() {
				var existingValue, bindingValue, noInitialValue;
				this.checkboxName = true;
				// so that ractive.updateModel() knows what to do with this
				this.attribute.twoway = true;
				// we set this property so that the attribute gets the correct update method
				// Each input has a reference to an array containing it and its
				// siblings, as two-way binding depends on being able to ascertain
				// the status of all inputs within the group
				this.siblings = getSiblings( this.root._guid, 'checkboxes', this.keypath );
				this.siblings.push( this );
				if ( this.noInitialValue ) {
					this.siblings.noInitialValue = true;
				}
				noInitialValue = this.siblings.noInitialValue;
				existingValue = this.root.viewmodel.get( this.keypath );
				bindingValue = this.element.getAttribute( 'value' );
				if ( noInitialValue ) {
					this.isChecked = this.element.getAttribute( 'checked' );
					if ( this.isChecked ) {
						existingValue.push( bindingValue );
					}
				} else {
					this.shouldOverride = true;
				}
			},
			unbind: function() {
				removeFromArray( this.siblings, this );
			},
			render: function() {
				var node = this.element.node,
					existingValue, bindingValue, i;
				if ( this.shouldOverride ) {
					existingValue = this.root.viewmodel.get( this.keypath );
					bindingValue = this.element.getAttribute( 'value' );
					if ( isArray( existingValue ) ) {
						i = existingValue.length;
						while ( i-- ) {
							if ( existingValue[ i ] == bindingValue ) {
								this.isChecked = true;
								break;
							}
						}
					} else {
						this.isChecked = existingValue == bindingValue;
					}
				}
				node.name = '{{' + this.keypath + '}}';
				node.checked = this.isChecked;
				node.addEventListener( 'change', handleDomEvent, false );
				// in case of IE emergency, bind to click event as well
				if ( node.attachEvent ) {
					node.addEventListener( 'click', handleDomEvent, false );
				}
			},
			unrender: function() {
				var node = this.element.node;
				node.removeEventListener( 'change', handleDomEvent, false );
				node.removeEventListener( 'click', handleDomEvent, false );
			},
			changed: function() {
				var wasChecked = !!this.isChecked;
				this.isChecked = this.element.node.checked;
				return this.isChecked === wasChecked;
			},
			handleChange: function() {
				this.isChecked = this.element.node.checked;
				Binding.prototype.handleChange.call( this );
			},
			getValue: function() {
				return this.siblings.filter( isChecked ).map( getValue );
			}
		} );

		function isChecked( binding ) {
			return binding.isChecked;
		}

		function getValue( binding ) {
			return binding.element.getAttribute( 'value' );
		}
		return CheckboxNameBinding;
	}( isArray, removeFromArray, Binding, getSiblings, handleDomEvent );

	/* virtualdom/items/Element/Binding/CheckboxBinding.js */
	var CheckboxBinding = function( Binding, handleDomEvent ) {

		var CheckboxBinding = Binding.extend( {
			name: 'checked',
			render: function() {
				var node = this.element.node;
				node.addEventListener( 'change', handleDomEvent, false );
				if ( node.attachEvent ) {
					node.addEventListener( 'click', handleDomEvent, false );
				}
			},
			unrender: function() {
				var node = this.element.node;
				node.removeEventListener( 'change', handleDomEvent, false );
				node.removeEventListener( 'click', handleDomEvent, false );
			},
			getValue: function() {
				return this.element.node.checked;
			}
		} );
		return CheckboxBinding;
	}( Binding, handleDomEvent );

	/* virtualdom/items/Element/Binding/SelectBinding.js */
	var SelectBinding = function( runloop, Binding, handleDomEvent ) {

		var SelectBinding = Binding.extend( {
			getInitialValue: function() {
				var options = this.element.options,
					len, i, value, optionWasSelected;
				if ( this.element.getAttribute( 'value' ) !== undefined ) {
					return;
				}
				i = len = options.length;
				if ( !len ) {
					return;
				}
				// take the final selected option...
				while ( i-- ) {
					if ( options[ i ].getAttribute( 'selected' ) ) {
						value = options[ i ].getAttribute( 'value' );
						optionWasSelected = true;
						break;
					}
				}
				// or the first non-disabled option, if none are selected
				if ( !optionWasSelected ) {
					while ( ++i < len ) {
						if ( !options[ i ].getAttribute( 'disabled' ) ) {
							value = options[ i ].getAttribute( 'value' );
							break;
						}
					}
				}
				// This is an optimisation (aka hack) that allows us to forgo some
				// other more expensive work
				if ( value !== undefined ) {
					this.element.attributes.value.value = value;
				}
				return value;
			},
			render: function() {
				this.element.node.addEventListener( 'change', handleDomEvent, false );
			},
			unrender: function() {
				this.element.node.removeEventListener( 'change', handleDomEvent, false );
			},
			// TODO this method is an anomaly... is it necessary?
			setValue: function( value ) {
				runloop.addViewmodel( this.root.viewmodel );
				this.root.viewmodel.set( this.keypath, value );
			},
			getValue: function() {
				var options, i, len, option, optionValue;
				options = this.element.node.options;
				len = options.length;
				for ( i = 0; i < len; i += 1 ) {
					option = options[ i ];
					if ( options[ i ].selected ) {
						optionValue = option._ractive ? option._ractive.value : option.value;
						return optionValue;
					}
				}
			},
			forceUpdate: function() {
				var this$0 = this;
				var value = this.getValue();
				if ( value !== undefined ) {
					this.attribute.locked = true;
					runloop.addViewmodel( this.root.viewmodel );
					runloop.scheduleTask( function() {
						return this$0.attribute.locked = false;
					} );
					this.root.viewmodel.set( this.keypath, value );
				}
			}
		} );
		return SelectBinding;
	}( runloop, Binding, handleDomEvent );

	/* utils/arrayContentsMatch.js */
	var arrayContentsMatch = function( isArray ) {

		return function( a, b ) {
			var i;
			if ( !isArray( a ) || !isArray( b ) ) {
				return false;
			}
			if ( a.length !== b.length ) {
				return false;
			}
			i = a.length;
			while ( i-- ) {
				if ( a[ i ] !== b[ i ] ) {
					return false;
				}
			}
			return true;
		};
	}( isArray );

	/* virtualdom/items/Element/Binding/MultipleSelectBinding.js */
	var MultipleSelectBinding = function( runloop, arrayContentsMatch, SelectBinding, handleDomEvent ) {

		var MultipleSelectBinding = SelectBinding.extend( {
			getInitialValue: function() {
				return this.element.options.filter( function( option ) {
					return option.getAttribute( 'selected' );
				} ).map( function( option ) {
					return option.getAttribute( 'value' );
				} );
			},
			render: function() {
				var valueFromModel;
				this.element.node.addEventListener( 'change', handleDomEvent, false );
				valueFromModel = this.root.viewmodel.get( this.keypath );
				if ( valueFromModel === undefined ) {
					// get value from DOM, if possible
					this.handleChange();
				}
			},
			unrender: function() {
				this.element.node.removeEventListener( 'change', handleDomEvent, false );
			},
			setValue: function() {
				throw new Error( 'TODO not implemented yet' );
			},
			getValue: function() {
				var selectedValues, options, i, len, option, optionValue;
				selectedValues = [];
				options = this.element.node.options;
				len = options.length;
				for ( i = 0; i < len; i += 1 ) {
					option = options[ i ];
					if ( option.selected ) {
						optionValue = option._ractive ? option._ractive.value : option.value;
						selectedValues.push( optionValue );
					}
				}
				return selectedValues;
			},
			handleChange: function() {
				var attribute, previousValue, value;
				attribute = this.attribute;
				previousValue = attribute.value;
				value = this.getValue();
				if ( previousValue === undefined || !arrayContentsMatch( value, previousValue ) ) {
					SelectBinding.prototype.handleChange.call( this );
				}
				return this;
			},
			forceUpdate: function() {
				var this$0 = this;
				var value = this.getValue();
				if ( value !== undefined ) {
					this.attribute.locked = true;
					runloop.addViewmodel( this.root.viewmodel );
					runloop.scheduleTask( function() {
						return this$0.attribute.locked = false;
					} );
					this.root.viewmodel.set( this.keypath, value );
				}
			},
			updateModel: function() {
				if ( this.attribute.value === undefined || !this.attribute.value.length ) {
					this.root.viewmodel.set( this.keypath, this.initialValue );
				}
			}
		} );
		return MultipleSelectBinding;
	}( runloop, arrayContentsMatch, SelectBinding, handleDomEvent );

	/* virtualdom/items/Element/Binding/FileListBinding.js */
	var FileListBinding = function( Binding, handleDomEvent ) {

		var FileListBinding = Binding.extend( {
			render: function() {
				this.element.node.addEventListener( 'change', handleDomEvent, false );
			},
			unrender: function() {
				this.element.node.removeEventListener( 'change', handleDomEvent, false );
			},
			getValue: function() {
				return this.element.node.files;
			}
		} );
		return FileListBinding;
	}( Binding, handleDomEvent );

	/* virtualdom/items/Element/Binding/GenericBinding.js */
	var GenericBinding = function( Binding, handleDomEvent ) {

		var __export;
		var GenericBinding, getOptions;
		getOptions = {
			evaluateWrapped: true
		};
		GenericBinding = Binding.extend( {
			getInitialValue: function() {
				return '';
			},
			getValue: function() {
				return this.element.node.value;
			},
			render: function() {
				var node = this.element.node;
				node.addEventListener( 'change', handleDomEvent, false );
				if ( !this.root.lazy ) {
					node.addEventListener( 'input', handleDomEvent, false );
					if ( node.attachEvent ) {
						node.addEventListener( 'keyup', handleDomEvent, false );
					}
				}
				node.addEventListener( 'blur', handleBlur, false );
			},
			unrender: function() {
				var node = this.element.node;
				node.removeEventListener( 'change', handleDomEvent, false );
				node.removeEventListener( 'input', handleDomEvent, false );
				node.removeEventListener( 'keyup', handleDomEvent, false );
				node.removeEventListener( 'blur', handleBlur, false );
			}
		} );
		__export = GenericBinding;

		function handleBlur() {
			var value;
			handleDomEvent.call( this );
			value = this._ractive.root.viewmodel.get( this._ractive.binding.keypath, getOptions );
			this.value = value == undefined ? '' : value;
		}
		return __export;
	}( Binding, handleDomEvent );

	/* virtualdom/items/Element/Binding/NumericBinding.js */
	var NumericBinding = function( GenericBinding ) {

		return GenericBinding.extend( {
			getInitialValue: function() {
				return undefined;
			},
			getValue: function() {
				var value = parseFloat( this.element.node.value );
				return isNaN( value ) ? undefined : value;
			}
		} );
	}( GenericBinding );

	/* virtualdom/items/Element/prototype/init/createTwowayBinding.js */
	var virtualdom_items_Element$init_createTwowayBinding = function( log, ContentEditableBinding, RadioBinding, RadioNameBinding, CheckboxNameBinding, CheckboxBinding, SelectBinding, MultipleSelectBinding, FileListBinding, NumericBinding, GenericBinding ) {

		var __export;
		__export = function createTwowayBinding( element ) {
			var attributes = element.attributes,
				type, Binding, bindName, bindChecked;
			// if this is a late binding, and there's already one, it
			// needs to be torn down
			if ( element.binding ) {
				element.binding.teardown();
				element.binding = null;
			}
			// contenteditable
			if ( element.getAttribute( 'contenteditable' ) && isBindable( attributes.value ) ) {
				Binding = ContentEditableBinding;
			} else if ( element.name === 'input' ) {
				type = element.getAttribute( 'type' );
				if ( type === 'radio' || type === 'checkbox' ) {
					bindName = isBindable( attributes.name );
					bindChecked = isBindable( attributes.checked );
					// we can either bind the name attribute, or the checked attribute - not both
					if ( bindName && bindChecked ) {
						log.error( {
							message: 'badRadioInputBinding'
						} );
					}
					if ( bindName ) {
						Binding = type === 'radio' ? RadioNameBinding : CheckboxNameBinding;
					} else if ( bindChecked ) {
						Binding = type === 'radio' ? RadioBinding : CheckboxBinding;
					}
				} else if ( type === 'file' && isBindable( attributes.value ) ) {
					Binding = FileListBinding;
				} else if ( isBindable( attributes.value ) ) {
					Binding = type === 'number' || type === 'range' ? NumericBinding : GenericBinding;
				}
			} else if ( element.name === 'select' && isBindable( attributes.value ) ) {
				Binding = element.getAttribute( 'multiple' ) ? MultipleSelectBinding : SelectBinding;
			} else if ( element.name === 'textarea' && isBindable( attributes.value ) ) {
				Binding = GenericBinding;
			}
			if ( Binding ) {
				return new Binding( element );
			}
		};

		function isBindable( attribute ) {
			return attribute && attribute.isBindable;
		}
		return __export;
	}( log, ContentEditableBinding, RadioBinding, RadioNameBinding, CheckboxNameBinding, CheckboxBinding, SelectBinding, MultipleSelectBinding, FileListBinding, NumericBinding, GenericBinding );

	/* virtualdom/items/Element/EventHandler/prototype/bubble.js */
	var virtualdom_items_Element_EventHandler$bubble = function EventHandler$bubble() {
		var hasAction = this.getAction();
		if ( hasAction && !this.hasListener ) {
			this.listen();
		} else if ( !hasAction && this.hasListener ) {
			this.unrender();
		}
	};

	/* virtualdom/items/Element/EventHandler/prototype/fire.js */
	var virtualdom_items_Element_EventHandler$fire = function( fireEvent ) {

		return function EventHandler$fire( event ) {
			fireEvent( this.root, this.getAction(), {
				event: event
			} );
		};
	}( Ractive$shared_fireEvent );

	/* virtualdom/items/Element/EventHandler/prototype/getAction.js */
	var virtualdom_items_Element_EventHandler$getAction = function EventHandler$getAction() {
		return this.action.toString().trim();
	};

	/* virtualdom/items/Element/EventHandler/prototype/init.js */
	var virtualdom_items_Element_EventHandler$init = function( removeFromArray, getFunctionFromString, resolveRef, Unresolved, circular, fireEvent, log ) {

		var __export;
		var Fragment, getValueOptions = {
				args: true
			},
			eventPattern = /^event(?:\.(.+))?/;
		circular.push( function() {
			Fragment = circular.Fragment;
		} );
		__export = function EventHandler$init( element, name, template ) {
			var handler = this,
				action, args, indexRefs, ractive, parentFragment;
			handler.element = element;
			handler.root = element.root;
			handler.name = name;
			if ( name.indexOf( '*' ) !== -1 ) {
				log.error( {
					debug: this.root.debug,
					message: 'noElementProxyEventWildcards',
					args: {
						element: element.tagName,
						event: name
					}
				} );
				this.invalid = true;
			}
			if ( template.m ) {
				// This is a method call
				handler.method = template.m;
				handler.args = args = [];
				handler.unresolved = [];
				handler.refs = template.a.r;
				handler.fn = getFunctionFromString( template.a.s, handler.refs.length );
				parentFragment = element.parentFragment;
				indexRefs = parentFragment.indexRefs;
				ractive = handler.root;
				// Create resolvers for each reference
				template.a.r.forEach( function( reference, i ) {
					var index, keypath, match, unresolved;
					// Is this an index reference?
					if ( indexRefs && ( index = indexRefs[ reference ] ) !== undefined ) {
						args[ i ] = {
							indexRef: reference,
							value: index
						};
						return;
					}
					if ( match = eventPattern.exec( reference ) ) {
						args[ i ] = {
							eventObject: true,
							refinements: match[ 1 ] ? match[ 1 ].split( '.' ) : []
						};
						return;
					}
					// Can we resolve it immediately?
					if ( keypath = resolveRef( ractive, reference, parentFragment ) ) {
						args[ i ] = {
							keypath: keypath
						};
						return;
					}
					// Couldn't resolve yet
					args[ i ] = null;
					unresolved = new Unresolved( ractive, reference, parentFragment, function( keypath ) {
						handler.resolve( i, keypath );
						removeFromArray( handler.unresolved, unresolved );
					} );
					handler.unresolved.push( unresolved );
				} );
				this.fire = fireMethodCall;
			} else {
				// Get action ('foo' in 'on-click='foo')
				action = template.n || template;
				if ( typeof action !== 'string' ) {
					action = new Fragment( {
						template: action,
						root: this.root,
						owner: this
					} );
				}
				this.action = action;
				// Get parameters
				if ( template.d ) {
					this.dynamicParams = new Fragment( {
						template: template.d,
						root: this.root,
						owner: this.element
					} );
					this.fire = fireEventWithDynamicParams;
				} else if ( template.a ) {
					this.params = template.a;
					this.fire = fireEventWithParams;
				}
			}
		};

		function fireMethodCall( event ) {
			var ractive, values, args;
			ractive = this.root;
			if ( typeof ractive[ this.method ] !== 'function' ) {
				throw new Error( 'Attempted to call a non-existent method ("' + this.method + '")' );
			}
			values = this.args.map( function( arg ) {
				var value, len, i;
				if ( !arg ) {
					// not yet resolved
					return undefined;
				}
				if ( arg.indexRef ) {
					return arg.value;
				}
				// TODO the refinements stuff would be better handled at parse time
				if ( arg.eventObject ) {
					value = event;
					if ( len = arg.refinements.length ) {
						for ( i = 0; i < len; i += 1 ) {
							value = value[ arg.refinements[ i ] ];
						}
					}
				} else {
					value = ractive.get( arg.keypath );
				}
				return value;
			} );
			args = this.fn.apply( null, values );
			ractive[ this.method ].apply( ractive, args );
		}

		function fireEventWithParams( event ) {
			fireEvent( this.root, this.getAction(), {
				event: event,
				args: this.params
			} );
		}

		function fireEventWithDynamicParams( event ) {
			var args = this.dynamicParams.getValue( getValueOptions );
			// need to strip [] from ends if a string!
			if ( typeof args === 'string' ) {
				args = args.substr( 1, args.length - 2 );
			}
			fireEvent( this.root, this.getAction(), {
				event: event,
				args: args
			} );
		}
		return __export;
	}( removeFromArray, getFunctionFromString, resolveRef, Unresolved, circular, Ractive$shared_fireEvent, log );

	/* virtualdom/items/Element/EventHandler/shared/genericHandler.js */
	var genericHandler = function genericHandler( event ) {
		var storage, handler;
		storage = this._ractive;
		handler = storage.events[ event.type ];
		handler.fire( {
			node: this,
			original: event,
			index: storage.index,
			keypath: storage.keypath,
			context: storage.root.get( storage.keypath )
		} );
	};

	/* virtualdom/items/Element/EventHandler/prototype/listen.js */
	var virtualdom_items_Element_EventHandler$listen = function( config, genericHandler, log ) {

		var __export;
		var customHandlers = {},
			touchEvents = {
				touchstart: true,
				touchmove: true,
				touchend: true,
				touchcancel: true,
				//not w3c, but supported in some browsers
				touchleave: true
			};
		__export = function EventHandler$listen() {
			var definition, name = this.name;
			if ( this.invalid ) {
				return;
			}
			if ( definition = config.registries.events.find( this.root, name ) ) {
				this.custom = definition( this.node, getCustomHandler( name ) );
			} else {
				// Looks like we're dealing with a standard DOM event... but let's check
				if ( !( 'on' + name in this.node ) && !( window && 'on' + name in window ) ) {
					// okay to use touch events if this browser doesn't support them
					if ( !touchEvents[ name ] ) {
						log.error( {
							debug: this.root.debug,
							message: 'missingPlugin',
							args: {
								plugin: 'event',
								name: name
							}
						} );
					}
					return;
				}
				this.node.addEventListener( name, genericHandler, false );
			}
			this.hasListener = true;
		};

		function getCustomHandler( name ) {
			if ( !customHandlers[ name ] ) {
				customHandlers[ name ] = function( event ) {
					var storage = event.node._ractive;
					event.index = storage.index;
					event.keypath = storage.keypath;
					event.context = storage.root.get( storage.keypath );
					storage.events[ name ].fire( event );
				};
			}
			return customHandlers[ name ];
		}
		return __export;
	}( config, genericHandler, log );

	/* virtualdom/items/Element/EventHandler/prototype/rebind.js */
	var virtualdom_items_Element_EventHandler$rebind = function( getNewKeypath ) {

		return function EventHandler$rebind( indexRef, newIndex, oldKeypath, newKeypath ) {
			if ( this.method ) {
				this.args.forEach( function( arg ) {
					if ( arg.indexRef && arg.indexRef === indexRef ) {
						arg.value = newIndex;
					}
					if ( arg.keypath && ( newKeypath = getNewKeypath( arg.keypath, oldKeypath, newKeypath ) ) ) {
						arg.keypath = newKeypath;
					}
				} );
				return;
			}
			if ( typeof this.action !== 'string' ) {
				this.action.rebind( indexRef, newIndex, oldKeypath, newKeypath );
			}
			if ( this.dynamicParams ) {
				this.dynamicParams.rebind( indexRef, newIndex, oldKeypath, newKeypath );
			}
		};
	}( getNewKeypath );

	/* virtualdom/items/Element/EventHandler/prototype/render.js */
	var virtualdom_items_Element_EventHandler$render = function EventHandler$render() {
		this.node = this.element.node;
		// store this on the node itself, so it can be retrieved by a
		// universal handler
		this.node._ractive.events[ this.name ] = this;
		if ( this.method || this.getAction() ) {
			this.listen();
		}
	};

	/* virtualdom/items/Element/EventHandler/prototype/resolve.js */
	var virtualdom_items_Element_EventHandler$resolve = function EventHandler$resolve( index, keypath ) {
		this.args[ index ] = {
			keypath: keypath
		};
	};

	/* virtualdom/items/Element/EventHandler/prototype/unbind.js */
	var virtualdom_items_Element_EventHandler$unbind = function() {

		var __export;
		__export = function EventHandler$unbind() {
			if ( this.method ) {
				this.unresolved.forEach( teardown );
				return;
			}
			// Tear down dynamic name
			if ( typeof this.action !== 'string' ) {
				this.action.unbind();
			}
			// Tear down dynamic parameters
			if ( this.dynamicParams ) {
				this.dynamicParams.unbind();
			}
		};

		function teardown( x ) {
			x.teardown();
		}
		return __export;
	}();

	/* virtualdom/items/Element/EventHandler/prototype/unrender.js */
	var virtualdom_items_Element_EventHandler$unrender = function( genericHandler ) {

		return function EventHandler$unrender() {
			if ( this.custom ) {
				this.custom.teardown();
			} else {
				this.node.removeEventListener( this.name, genericHandler, false );
			}
			this.hasListener = false;
		};
	}( genericHandler );

	/* virtualdom/items/Element/EventHandler/_EventHandler.js */
	var EventHandler = function( bubble, fire, getAction, init, listen, rebind, render, resolve, unbind, unrender ) {

		var EventHandler = function( element, name, template ) {
			this.init( element, name, template );
		};
		EventHandler.prototype = {
			bubble: bubble,
			fire: fire,
			getAction: getAction,
			init: init,
			listen: listen,
			rebind: rebind,
			render: render,
			resolve: resolve,
			unbind: unbind,
			unrender: unrender
		};
		return EventHandler;
	}( virtualdom_items_Element_EventHandler$bubble, virtualdom_items_Element_EventHandler$fire, virtualdom_items_Element_EventHandler$getAction, virtualdom_items_Element_EventHandler$init, virtualdom_items_Element_EventHandler$listen, virtualdom_items_Element_EventHandler$rebind, virtualdom_items_Element_EventHandler$render, virtualdom_items_Element_EventHandler$resolve, virtualdom_items_Element_EventHandler$unbind, virtualdom_items_Element_EventHandler$unrender );

	/* virtualdom/items/Element/prototype/init/createEventHandlers.js */
	var virtualdom_items_Element$init_createEventHandlers = function( EventHandler ) {

		return function( element, template ) {
			var i, name, names, handler, result = [];
			for ( name in template ) {
				if ( template.hasOwnProperty( name ) ) {
					names = name.split( '-' );
					i = names.length;
					while ( i-- ) {
						handler = new EventHandler( element, names[ i ], template[ name ] );
						result.push( handler );
					}
				}
			}
			return result;
		};
	}( EventHandler );

	/* virtualdom/items/Element/Decorator/_Decorator.js */
	var Decorator = function( log, circular, config ) {

		var Fragment, getValueOptions, Decorator;
		circular.push( function() {
			Fragment = circular.Fragment;
		} );
		getValueOptions = {
			args: true
		};
		Decorator = function( element, template ) {
			var decorator = this,
				ractive, name, fragment;
			decorator.element = element;
			decorator.root = ractive = element.root;
			name = template.n || template;
			if ( typeof name !== 'string' ) {
				fragment = new Fragment( {
					template: name,
					root: ractive,
					owner: element
				} );
				name = fragment.toString();
				fragment.unbind();
			}
			if ( template.a ) {
				decorator.params = template.a;
			} else if ( template.d ) {
				decorator.fragment = new Fragment( {
					template: template.d,
					root: ractive,
					owner: element
				} );
				decorator.params = decorator.fragment.getValue( getValueOptions );
				decorator.fragment.bubble = function() {
					this.dirtyArgs = this.dirtyValue = true;
					decorator.params = this.getValue( getValueOptions );
					if ( decorator.ready ) {
						decorator.update();
					}
				};
			}
			decorator.fn = config.registries.decorators.find( ractive, name );
			if ( !decorator.fn ) {
				log.error( {
					debug: ractive.debug,
					message: 'missingPlugin',
					args: {
						plugin: 'decorator',
						name: name
					}
				} );
			}
		};
		Decorator.prototype = {
			init: function() {
				var decorator = this,
					node, result, args;
				node = decorator.element.node;
				if ( decorator.params ) {
					args = [ node ].concat( decorator.params );
					result = decorator.fn.apply( decorator.root, args );
				} else {
					result = decorator.fn.call( decorator.root, node );
				}
				if ( !result || !result.teardown ) {
					throw new Error( 'Decorator definition must return an object with a teardown method' );
				}
				// TODO does this make sense?
				decorator.actual = result;
				decorator.ready = true;
			},
			update: function() {
				if ( this.actual.update ) {
					this.actual.update.apply( this.root, this.params );
				} else {
					this.actual.teardown( true );
					this.init();
				}
			},
			rebind: function( indexRef, newIndex, oldKeypath, newKeypath ) {
				if ( this.fragment ) {
					this.fragment.rebind( indexRef, newIndex, oldKeypath, newKeypath );
				}
			},
			teardown: function( updating ) {
				this.actual.teardown();
				if ( !updating && this.fragment ) {
					this.fragment.unbind();
				}
			}
		};
		return Decorator;
	}( log, circular, config );

	/* virtualdom/items/Element/special/select/sync.js */
	var sync = function( toArray ) {

		var __export;
		__export = function syncSelect( selectElement ) {
			var selectNode, selectValue, isMultiple, options, optionWasSelected;
			selectNode = selectElement.node;
			if ( !selectNode ) {
				return;
			}
			options = toArray( selectNode.options );
			selectValue = selectElement.getAttribute( 'value' );
			isMultiple = selectElement.getAttribute( 'multiple' );
			// If the <select> has a specified value, that should override
			// these options
			if ( selectValue !== undefined ) {
				options.forEach( function( o ) {
					var optionValue, shouldSelect;
					optionValue = o._ractive ? o._ractive.value : o.value;
					shouldSelect = isMultiple ? valueContains( selectValue, optionValue ) : selectValue == optionValue;
					if ( shouldSelect ) {
						optionWasSelected = true;
					}
					o.selected = shouldSelect;
				} );
				if ( !optionWasSelected ) {
					if ( options[ 0 ] ) {
						options[ 0 ].selected = true;
					}
					if ( selectElement.binding ) {
						selectElement.binding.forceUpdate();
					}
				}
			} else if ( selectElement.binding ) {
				selectElement.binding.forceUpdate();
			}
		};

		function valueContains( selectValue, optionValue ) {
			var i = selectValue.length;
			while ( i-- ) {
				if ( selectValue[ i ] == optionValue ) {
					return true;
				}
			}
		}
		return __export;
	}( toArray );

	/* virtualdom/items/Element/special/select/bubble.js */
	var bubble = function( runloop, syncSelect ) {

		return function bubbleSelect() {
			var this$0 = this;
			if ( !this.dirty ) {
				this.dirty = true;
				runloop.scheduleTask( function() {
					syncSelect( this$0 );
					this$0.dirty = false;
				} );
			}
			this.parentFragment.bubble();
		};
	}( runloop, sync );

	/* virtualdom/items/Element/special/option/findParentSelect.js */
	var findParentSelect = function findParentSelect( element ) {
		do {
			if ( element.name === 'select' ) {
				return element;
			}
		} while ( element = element.parent );
	};

	/* virtualdom/items/Element/special/option/init.js */
	var init = function( findParentSelect ) {

		return function initOption( option, template ) {
			option.select = findParentSelect( option.parent );
			// we might be inside a <datalist> element
			if ( !option.select ) {
				return;
			}
			option.select.options.push( option );
			// If the value attribute is missing, use the element's content
			if ( !template.a ) {
				template.a = {};
			}
			// ...as long as it isn't disabled
			if ( !template.a.value && !template.a.hasOwnProperty( 'disabled' ) ) {
				template.a.value = template.f;
			}
			// If there is a `selected` attribute, but the <select>
			// already has a value, delete it
			if ( 'selected' in template.a && option.select.getAttribute( 'value' ) !== undefined ) {
				delete template.a.selected;
			}
		};
	}( findParentSelect );

	/* virtualdom/items/Element/prototype/init.js */
	var virtualdom_items_Element$init = function( types, enforceCase, createAttributes, createConditionalAttributes, createTwowayBinding, createEventHandlers, Decorator, bubbleSelect, initOption, circular ) {

		var Fragment;
		circular.push( function() {
			Fragment = circular.Fragment;
		} );
		return function Element$init( options ) {
			var parentFragment, template, ractive, binding, bindings;
			this.type = types.ELEMENT;
			// stuff we'll need later
			parentFragment = this.parentFragment = options.parentFragment;
			template = this.template = options.template;
			this.parent = options.pElement || parentFragment.pElement;
			this.root = ractive = parentFragment.root;
			this.index = options.index;
			this.name = enforceCase( template.e );
			// Special case - <option> elements
			if ( this.name === 'option' ) {
				initOption( this, template );
			}
			// Special case - <select> elements
			if ( this.name === 'select' ) {
				this.options = [];
				this.bubble = bubbleSelect;
			}
			// create attributes
			this.attributes = createAttributes( this, template.a );
			this.conditionalAttributes = createConditionalAttributes( this, template.m );
			// append children, if there are any
			if ( template.f ) {
				this.fragment = new Fragment( {
					template: template.f,
					root: ractive,
					owner: this,
					pElement: this
				} );
			}
			// create twoway binding
			if ( ractive.twoway && ( binding = createTwowayBinding( this, template.a ) ) ) {
				this.binding = binding;
				// register this with the root, so that we can do ractive.updateModel()
				bindings = this.root._twowayBindings[ binding.keypath ] || ( this.root._twowayBindings[ binding.keypath ] = [] );
				bindings.push( binding );
			}
			// create event proxies
			if ( template.v ) {
				this.eventHandlers = createEventHandlers( this, template.v );
			}
			// create decorator
			if ( template.o ) {
				this.decorator = new Decorator( this, template.o );
			}
			// create transitions
			this.intro = template.t0 || template.t1;
			this.outro = template.t0 || template.t2;
		};
	}( types, enforceCase, virtualdom_items_Element$init_createAttributes, virtualdom_items_Element$init_createConditionalAttributes, virtualdom_items_Element$init_createTwowayBinding, virtualdom_items_Element$init_createEventHandlers, Decorator, bubble, init, circular );

	/* virtualdom/items/shared/utils/startsWith.js */
	var startsWith = function( startsWithKeypath ) {

		return function startsWith( target, keypath ) {
			return target === keypath || startsWithKeypath( target, keypath );
		};
	}( startsWithKeypath );

	/* virtualdom/items/shared/utils/assignNewKeypath.js */
	var assignNewKeypath = function( startsWith, getNewKeypath ) {

		return function assignNewKeypath( target, property, oldKeypath, newKeypath ) {
			var existingKeypath = target[ property ];
			if ( !existingKeypath || startsWith( existingKeypath, newKeypath ) || !startsWith( existingKeypath, oldKeypath ) ) {
				return;
			}
			target[ property ] = getNewKeypath( existingKeypath, oldKeypath, newKeypath );
		};
	}( startsWith, getNewKeypath );

	/* virtualdom/items/Element/prototype/rebind.js */
	var virtualdom_items_Element$rebind = function( assignNewKeypath ) {

		return function Element$rebind( indexRef, newIndex, oldKeypath, newKeypath ) {
			var i, storage, liveQueries, ractive;
			if ( this.attributes ) {
				this.attributes.forEach( rebind );
			}
			if ( this.conditionalAttributes ) {
				this.conditionalAttributes.forEach( rebind );
			}
			if ( this.eventHandlers ) {
				this.eventHandlers.forEach( rebind );
			}
			if ( this.decorator ) {
				rebind( this.decorator );
			}
			// rebind children
			if ( this.fragment ) {
				rebind( this.fragment );
			}
			// Update live queries, if necessary
			if ( liveQueries = this.liveQueries ) {
				ractive = this.root;
				i = liveQueries.length;
				while ( i-- ) {
					liveQueries[ i ]._makeDirty();
				}
			}
			if ( this.node && ( storage = this.node._ractive ) ) {
				// adjust keypath if needed
				assignNewKeypath( storage, 'keypath', oldKeypath, newKeypath );
				if ( indexRef != undefined ) {
					storage.index[ indexRef ] = newIndex;
				}
			}

			function rebind( thing ) {
				thing.rebind( indexRef, newIndex, oldKeypath, newKeypath );
			}
		};
	}( assignNewKeypath );

	/* virtualdom/items/Element/special/img/render.js */
	var render = function renderImage( img ) {
		var loadHandler;
		// if this is an <img>, and we're in a crap browser, we may need to prevent it
		// from overriding width and height when it loads the src
		if ( img.attributes.width || img.attributes.height ) {
			img.node.addEventListener( 'load', loadHandler = function() {
				var width = img.getAttribute( 'width' ),
					height = img.getAttribute( 'height' );
				if ( width !== undefined ) {
					img.node.setAttribute( 'width', width );
				}
				if ( height !== undefined ) {
					img.node.setAttribute( 'height', height );
				}
				img.node.removeEventListener( 'load', loadHandler, false );
			}, false );
		}
	};

	/* virtualdom/items/Element/Transition/prototype/init.js */
	var virtualdom_items_Element_Transition$init = function( log, config, circular ) {

		var Fragment, getValueOptions = {};
		// TODO what are the options?
		circular.push( function() {
			Fragment = circular.Fragment;
		} );
		return function Transition$init( element, template, isIntro ) {
			var t = this,
				ractive, name, fragment;
			t.element = element;
			t.root = ractive = element.root;
			t.isIntro = isIntro;
			name = template.n || template;
			if ( typeof name !== 'string' ) {
				fragment = new Fragment( {
					template: name,
					root: ractive,
					owner: element
				} );
				name = fragment.toString();
				fragment.unbind();
			}
			t.name = name;
			if ( template.a ) {
				t.params = template.a;
			} else if ( template.d ) {
				// TODO is there a way to interpret dynamic arguments without all the
				// 'dependency thrashing'?
				fragment = new Fragment( {
					template: template.d,
					root: ractive,
					owner: element
				} );
				t.params = fragment.getValue( getValueOptions );
				fragment.unbind();
			}
			t._fn = config.registries.transitions.find( ractive, name );
			if ( !t._fn ) {
				log.error( {
					debug: ractive.debug,
					message: 'missingPlugin',
					args: {
						plugin: 'transition',
						name: name
					}
				} );
				return;
			}
		};
	}( log, config, circular );

	/* utils/camelCase.js */
	var camelCase = function( hyphenatedStr ) {
		return hyphenatedStr.replace( /-([a-zA-Z])/g, function( match, $1 ) {
			return $1.toUpperCase();
		} );
	};

	/* virtualdom/items/Element/Transition/helpers/prefix.js */
	var prefix = function( isClient, vendors, createElement, camelCase ) {

		var prefix, prefixCache, testStyle;
		if ( !isClient ) {
			prefix = null;
		} else {
			prefixCache = {};
			testStyle = createElement( 'div' ).style;
			prefix = function( prop ) {
				var i, vendor, capped;
				prop = camelCase( prop );
				if ( !prefixCache[ prop ] ) {
					if ( testStyle[ prop ] !== undefined ) {
						prefixCache[ prop ] = prop;
					} else {
						// test vendors...
						capped = prop.charAt( 0 ).toUpperCase() + prop.substring( 1 );
						i = vendors.length;
						while ( i-- ) {
							vendor = vendors[ i ];
							if ( testStyle[ vendor + capped ] !== undefined ) {
								prefixCache[ prop ] = vendor + capped;
								break;
							}
						}
					}
				}
				return prefixCache[ prop ];
			};
		}
		return prefix;
	}( isClient, vendors, createElement, camelCase );

	/* virtualdom/items/Element/Transition/prototype/getStyle.js */
	var virtualdom_items_Element_Transition$getStyle = function( legacy, isClient, isArray, prefix ) {

		var getStyle, getComputedStyle;
		if ( !isClient ) {
			getStyle = null;
		} else {
			getComputedStyle = window.getComputedStyle || legacy.getComputedStyle;
			getStyle = function( props ) {
				var computedStyle, styles, i, prop, value;
				computedStyle = getComputedStyle( this.node );
				if ( typeof props === 'string' ) {
					value = computedStyle[ prefix( props ) ];
					if ( value === '0px' ) {
						value = 0;
					}
					return value;
				}
				if ( !isArray( props ) ) {
					throw new Error( 'Transition$getStyle must be passed a string, or an array of strings representing CSS properties' );
				}
				styles = {};
				i = props.length;
				while ( i-- ) {
					prop = props[ i ];
					value = computedStyle[ prefix( prop ) ];
					if ( value === '0px' ) {
						value = 0;
					}
					styles[ prop ] = value;
				}
				return styles;
			};
		}
		return getStyle;
	}( legacy, isClient, isArray, prefix );

	/* virtualdom/items/Element/Transition/prototype/setStyle.js */
	var virtualdom_items_Element_Transition$setStyle = function( prefix ) {

		return function( style, value ) {
			var prop;
			if ( typeof style === 'string' ) {
				this.node.style[ prefix( style ) ] = value;
			} else {
				for ( prop in style ) {
					if ( style.hasOwnProperty( prop ) ) {
						this.node.style[ prefix( prop ) ] = style[ prop ];
					}
				}
			}
			return this;
		};
	}( prefix );

	/* shared/Ticker.js */
	var Ticker = function( warn, getTime, animations ) {

		var __export;
		var Ticker = function( options ) {
			var easing;
			this.duration = options.duration;
			this.step = options.step;
			this.complete = options.complete;
			// easing
			if ( typeof options.easing === 'string' ) {
				easing = options.root.easing[ options.easing ];
				if ( !easing ) {
					warn( 'Missing easing function ("' + options.easing + '"). You may need to download a plugin from [TODO]' );
					easing = linear;
				}
			} else if ( typeof options.easing === 'function' ) {
				easing = options.easing;
			} else {
				easing = linear;
			}
			this.easing = easing;
			this.start = getTime();
			this.end = this.start + this.duration;
			this.running = true;
			animations.add( this );
		};
		Ticker.prototype = {
			tick: function( now ) {
				var elapsed, eased;
				if ( !this.running ) {
					return false;
				}
				if ( now > this.end ) {
					if ( this.step ) {
						this.step( 1 );
					}
					if ( this.complete ) {
						this.complete( 1 );
					}
					return false;
				}
				elapsed = now - this.start;
				eased = this.easing( elapsed / this.duration );
				if ( this.step ) {
					this.step( eased );
				}
				return true;
			},
			stop: function() {
				if ( this.abort ) {
					this.abort();
				}
				this.running = false;
			}
		};
		__export = Ticker;

		function linear( t ) {
			return t;
		}
		return __export;
	}( warn, getTime, animations );

	/* virtualdom/items/Element/Transition/helpers/unprefix.js */
	var unprefix = function( vendors ) {

		var unprefixPattern = new RegExp( '^-(?:' + vendors.join( '|' ) + ')-' );
		return function( prop ) {
			return prop.replace( unprefixPattern, '' );
		};
	}( vendors );

	/* virtualdom/items/Element/Transition/helpers/hyphenate.js */
	var hyphenate = function( vendors ) {

		var vendorPattern = new RegExp( '^(?:' + vendors.join( '|' ) + ')([A-Z])' );
		return function( str ) {
			var hyphenated;
			if ( !str ) {
				return '';
			}
			if ( vendorPattern.test( str ) ) {
				str = '-' + str;
			}
			hyphenated = str.replace( /[A-Z]/g, function( match ) {
				return '-' + match.toLowerCase();
			} );
			return hyphenated;
		};
	}( vendors );

	/* virtualdom/items/Element/Transition/prototype/animateStyle/createTransitions.js */
	var virtualdom_items_Element_Transition$animateStyle_createTransitions = function( isClient, warn, createElement, camelCase, interpolate, Ticker, prefix, unprefix, hyphenate ) {

		var createTransitions, testStyle, TRANSITION, TRANSITIONEND, CSS_TRANSITIONS_ENABLED, TRANSITION_DURATION, TRANSITION_PROPERTY, TRANSITION_TIMING_FUNCTION, canUseCssTransitions = {},
			cannotUseCssTransitions = {};
		if ( !isClient ) {
			createTransitions = null;
		} else {
			testStyle = createElement( 'div' ).style;
			// determine some facts about our environment
			( function() {
				if ( testStyle.transition !== undefined ) {
					TRANSITION = 'transition';
					TRANSITIONEND = 'transitionend';
					CSS_TRANSITIONS_ENABLED = true;
				} else if ( testStyle.webkitTransition !== undefined ) {
					TRANSITION = 'webkitTransition';
					TRANSITIONEND = 'webkitTransitionEnd';
					CSS_TRANSITIONS_ENABLED = true;
				} else {
					CSS_TRANSITIONS_ENABLED = false;
				}
			}() );
			if ( TRANSITION ) {
				TRANSITION_DURATION = TRANSITION + 'Duration';
				TRANSITION_PROPERTY = TRANSITION + 'Property';
				TRANSITION_TIMING_FUNCTION = TRANSITION + 'TimingFunction';
			}
			createTransitions = function( t, to, options, changedProperties, resolve ) {
				// Wait a beat (otherwise the target styles will be applied immediately)
				// TODO use a fastdom-style mechanism?
				setTimeout( function() {
					var hashPrefix, jsTransitionsComplete, cssTransitionsComplete, checkComplete, transitionEndHandler;
					checkComplete = function() {
						if ( jsTransitionsComplete && cssTransitionsComplete ) {
							// will changes to events and fire have an unexpected consequence here?
							t.root.fire( t.name + ':end', t.node, t.isIntro );
							resolve();
						}
					};
					// this is used to keep track of which elements can use CSS to animate
					// which properties
					hashPrefix = ( t.node.namespaceURI || '' ) + t.node.tagName;
					t.node.style[ TRANSITION_PROPERTY ] = changedProperties.map( prefix ).map( hyphenate ).join( ',' );
					t.node.style[ TRANSITION_TIMING_FUNCTION ] = hyphenate( options.easing || 'linear' );
					t.node.style[ TRANSITION_DURATION ] = options.duration / 1000 + 's';
					transitionEndHandler = function( event ) {
						var index;
						index = changedProperties.indexOf( camelCase( unprefix( event.propertyName ) ) );
						if ( index !== -1 ) {
							changedProperties.splice( index, 1 );
						}
						if ( changedProperties.length ) {
							// still transitioning...
							return;
						}
						t.node.removeEventListener( TRANSITIONEND, transitionEndHandler, false );
						cssTransitionsComplete = true;
						checkComplete();
					};
					t.node.addEventListener( TRANSITIONEND, transitionEndHandler, false );
					setTimeout( function() {
						var i = changedProperties.length,
							hash, originalValue, index, propertiesToTransitionInJs = [],
							prop, suffix;
						while ( i-- ) {
							prop = changedProperties[ i ];
							hash = hashPrefix + prop;
							if ( CSS_TRANSITIONS_ENABLED && !cannotUseCssTransitions[ hash ] ) {
								t.node.style[ prefix( prop ) ] = to[ prop ];
								// If we're not sure if CSS transitions are supported for
								// this tag/property combo, find out now
								if ( !canUseCssTransitions[ hash ] ) {
									originalValue = t.getStyle( prop );
									// if this property is transitionable in this browser,
									// the current style will be different from the target style
									canUseCssTransitions[ hash ] = t.getStyle( prop ) != to[ prop ];
									cannotUseCssTransitions[ hash ] = !canUseCssTransitions[ hash ];
									// Reset, if we're going to use timers after all
									if ( cannotUseCssTransitions[ hash ] ) {
										t.node.style[ prefix( prop ) ] = originalValue;
									}
								}
							}
							if ( !CSS_TRANSITIONS_ENABLED || cannotUseCssTransitions[ hash ] ) {
								// we need to fall back to timer-based stuff
								if ( originalValue === undefined ) {
									originalValue = t.getStyle( prop );
								}
								// need to remove this from changedProperties, otherwise transitionEndHandler
								// will get confused
								index = changedProperties.indexOf( prop );
								if ( index === -1 ) {
									warn( 'Something very strange happened with transitions. If you see this message, please let @RactiveJS know. Thanks!' );
								} else {
									changedProperties.splice( index, 1 );
								}
								// TODO Determine whether this property is animatable at all
								suffix = /[^\d]*$/.exec( to[ prop ] )[ 0 ];
								// ...then kick off a timer-based transition
								propertiesToTransitionInJs.push( {
									name: prefix( prop ),
									interpolator: interpolate( parseFloat( originalValue ), parseFloat( to[ prop ] ) ),
									suffix: suffix
								} );
							}
						}
						// javascript transitions
						if ( propertiesToTransitionInJs.length ) {
							new Ticker( {
								root: t.root,
								duration: options.duration,
								easing: camelCase( options.easing || '' ),
								step: function( pos ) {
									var prop, i;
									i = propertiesToTransitionInJs.length;
									while ( i-- ) {
										prop = propertiesToTransitionInJs[ i ];
										t.node.style[ prop.name ] = prop.interpolator( pos ) + prop.suffix;
									}
								},
								complete: function() {
									jsTransitionsComplete = true;
									checkComplete();
								}
							} );
						} else {
							jsTransitionsComplete = true;
						}
						if ( !changedProperties.length ) {
							// We need to cancel the transitionEndHandler, and deal with
							// the fact that it will never fire
							t.node.removeEventListener( TRANSITIONEND, transitionEndHandler, false );
							cssTransitionsComplete = true;
							checkComplete();
						}
					}, 0 );
				}, options.delay || 0 );
			};
		}
		return createTransitions;
	}( isClient, warn, createElement, camelCase, interpolate, Ticker, prefix, unprefix, hyphenate );

	/* virtualdom/items/Element/Transition/prototype/animateStyle/visibility.js */
	var virtualdom_items_Element_Transition$animateStyle_visibility = function( vendors ) {

		var hidden, vendor, prefix, i, visibility;
		if ( typeof document !== 'undefined' ) {
			hidden = 'hidden';
			visibility = {};
			if ( hidden in document ) {
				prefix = '';
			} else {
				i = vendors.length;
				while ( i-- ) {
					vendor = vendors[ i ];
					hidden = vendor + 'Hidden';
					if ( hidden in document ) {
						prefix = vendor;
					}
				}
			}
			if ( prefix !== undefined ) {
				document.addEventListener( prefix + 'visibilitychange', onChange );
				// initialise
				onChange();
			} else {
				// gah, we're in an old browser
				if ( 'onfocusout' in document ) {
					document.addEventListener( 'focusout', onHide );
					document.addEventListener( 'focusin', onShow );
				} else {
					window.addEventListener( 'pagehide', onHide );
					window.addEventListener( 'blur', onHide );
					window.addEventListener( 'pageshow', onShow );
					window.addEventListener( 'focus', onShow );
				}
				visibility.hidden = false;
			}
		}

		function onChange() {
			visibility.hidden = document[ hidden ];
		}

		function onHide() {
			visibility.hidden = true;
		}

		function onShow() {
			visibility.hidden = false;
		}
		return visibility;
	}( vendors );

	/* virtualdom/items/Element/Transition/prototype/animateStyle/_animateStyle.js */
	var virtualdom_items_Element_Transition$animateStyle__animateStyle = function( legacy, isClient, warn, Promise, prefix, createTransitions, visibility ) {

		var animateStyle, getComputedStyle, resolved;
		if ( !isClient ) {
			animateStyle = null;
		} else {
			getComputedStyle = window.getComputedStyle || legacy.getComputedStyle;
			animateStyle = function( style, value, options, complete ) {
				var t = this,
					to;
				// Special case - page isn't visible. Don't animate anything, because
				// that way you'll never get CSS transitionend events
				if ( visibility.hidden ) {
					this.setStyle( style, value );
					return resolved || ( resolved = Promise.resolve() );
				}
				if ( typeof style === 'string' ) {
					to = {};
					to[ style ] = value;
				} else {
					to = style;
					// shuffle arguments
					complete = options;
					options = value;
				}
				// As of 0.3.9, transition authors should supply an `option` object with
				// `duration` and `easing` properties (and optional `delay`), plus a
				// callback function that gets called after the animation completes
				// TODO remove this check in a future version
				if ( !options ) {
					warn( 'The "' + t.name + '" transition does not supply an options object to `t.animateStyle()`. This will break in a future version of Ractive. For more info see https://github.com/RactiveJS/Ractive/issues/340' );
					options = t;
					complete = t.complete;
				}
				var promise = new Promise( function( resolve ) {
					var propertyNames, changedProperties, computedStyle, current, from, i, prop;
					// Edge case - if duration is zero, set style synchronously and complete
					if ( !options.duration ) {
						t.setStyle( to );
						resolve();
						return;
					}
					// Get a list of the properties we're animating
					propertyNames = Object.keys( to );
					changedProperties = [];
					// Store the current styles
					computedStyle = getComputedStyle( t.node );
					from = {};
					i = propertyNames.length;
					while ( i-- ) {
						prop = propertyNames[ i ];
						current = computedStyle[ prefix( prop ) ];
						if ( current === '0px' ) {
							current = 0;
						}
						// we need to know if we're actually changing anything
						if ( current != to[ prop ] ) {
							// use != instead of !==, so we can compare strings with numbers
							changedProperties.push( prop );
							// make the computed style explicit, so we can animate where
							// e.g. height='auto'
							t.node.style[ prefix( prop ) ] = current;
						}
					}
					// If we're not actually changing anything, the transitionend event
					// will never fire! So we complete early
					if ( !changedProperties.length ) {
						resolve();
						return;
					}
					createTransitions( t, to, options, changedProperties, resolve );
				} );
				// If a callback was supplied, do the honours
				// TODO remove this check in future
				if ( complete ) {
					warn( 't.animateStyle returns a Promise as of 0.4.0. Transition authors should do t.animateStyle(...).then(callback)' );
					promise.then( complete );
				}
				return promise;
			};
		}
		return animateStyle;
	}( legacy, isClient, warn, Promise, prefix, virtualdom_items_Element_Transition$animateStyle_createTransitions, virtualdom_items_Element_Transition$animateStyle_visibility );

	/* utils/fillGaps.js */
	var fillGaps = function( target ) {
		var SLICE$0 = Array.prototype.slice;
		var sources = SLICE$0.call( arguments, 1 );
		sources.forEach( function( s ) {
			for ( var key in s ) {
				if ( s.hasOwnProperty( key ) && !( key in target ) ) {
					target[ key ] = s[ key ];
				}
			}
		} );
		return target;
	};

	/* virtualdom/items/Element/Transition/prototype/processParams.js */
	var virtualdom_items_Element_Transition$processParams = function( fillGaps ) {

		return function( params, defaults ) {
			if ( typeof params === 'number' ) {
				params = {
					duration: params
				};
			} else if ( typeof params === 'string' ) {
				if ( params === 'slow' ) {
					params = {
						duration: 600
					};
				} else if ( params === 'fast' ) {
					params = {
						duration: 200
					};
				} else {
					params = {
						duration: 400
					};
				}
			} else if ( !params ) {
				params = {};
			}
			return fillGaps( {}, params, defaults );
		};
	}( fillGaps );

	/* virtualdom/items/Element/Transition/prototype/start.js */
	var virtualdom_items_Element_Transition$start = function() {

		var __export;
		__export = function Transition$start() {
			var t = this,
				node, originalStyle, completed;
			node = t.node = t.element.node;
			originalStyle = node.getAttribute( 'style' );
			// create t.complete() - we don't want this on the prototype,
			// because we don't want `this` silliness when passing it as
			// an argument
			t.complete = function( noReset ) {
				if ( completed ) {
					return;
				}
				if ( !noReset && t.isIntro ) {
					resetStyle( node, originalStyle );
				}
				node._ractive.transition = null;
				t._manager.remove( t );
				completed = true;
			};
			// If the transition function doesn't exist, abort
			if ( !t._fn ) {
				t.complete();
				return;
			}
			t._fn.apply( t.root, [ t ].concat( t.params ) );
		};

		function resetStyle( node, style ) {
			if ( style ) {
				node.setAttribute( 'style', style );
			} else {
				// Next line is necessary, to remove empty style attribute!
				// See http://stackoverflow.com/a/7167553
				node.getAttribute( 'style' );
				node.removeAttribute( 'style' );
			}
		}
		return __export;
	}();

	/* virtualdom/items/Element/Transition/_Transition.js */
	var Transition = function( init, getStyle, setStyle, animateStyle, processParams, start, circular ) {

		var Fragment, Transition;
		circular.push( function() {
			Fragment = circular.Fragment;
		} );
		Transition = function( owner, template, isIntro ) {
			this.init( owner, template, isIntro );
		};
		Transition.prototype = {
			init: init,
			start: start,
			getStyle: getStyle,
			setStyle: setStyle,
			animateStyle: animateStyle,
			processParams: processParams
		};
		return Transition;
	}( virtualdom_items_Element_Transition$init, virtualdom_items_Element_Transition$getStyle, virtualdom_items_Element_Transition$setStyle, virtualdom_items_Element_Transition$animateStyle__animateStyle, virtualdom_items_Element_Transition$processParams, virtualdom_items_Element_Transition$start, circular );

	/* virtualdom/items/Element/prototype/render.js */
	var virtualdom_items_Element$render = function( namespaces, isArray, warn, create, createElement, defineProperty, noop, runloop, getInnerContext, renderImage, Transition ) {

		var __export;
		var updateCss, updateScript;
		updateCss = function() {
			var node = this.node,
				content = this.fragment.toString( false );
			// IE8 has no styleSheet unless there's a type text/css
			if ( window && window.appearsToBeIELessEqual8 ) {
				node.type = 'text/css';
			}
			if ( node.styleSheet ) {
				node.styleSheet.cssText = content;
			} else {
				while ( node.hasChildNodes() ) {
					node.removeChild( node.firstChild );
				}
				node.appendChild( document.createTextNode( content ) );
			}
		};
		updateScript = function() {
			if ( !this.node.type || this.node.type === 'text/javascript' ) {
				warn( 'Script tag was updated. This does not cause the code to be re-evaluated!' );
			}
			this.node.text = this.fragment.toString( false );
		};
		__export = function Element$render() {
			var this$0 = this;
			var root = this.root,
				namespace, node;
			namespace = getNamespace( this );
			node = this.node = createElement( this.name, namespace );
			// Is this a top-level node of a component? If so, we may need to add
			// a data-rvcguid attribute, for CSS encapsulation
			// NOTE: css no longer copied to instance, so we check constructor.css -
			// we can enhance to handle instance, but this is more "correct" with current
			// functionality
			if ( root.constructor.css && this.parentFragment.getNode() === root.el ) {
				this.node.setAttribute( 'data-rvcguid', root.constructor._guid );
			}
			// Add _ractive property to the node - we use this object to store stuff
			// related to proxy events, two-way bindings etc
			defineProperty( this.node, '_ractive', {
				value: {
					proxy: this,
					keypath: getInnerContext( this.parentFragment ),
					index: this.parentFragment.indexRefs,
					events: create( null ),
					root: root
				}
			} );
			// Render attributes
			this.attributes.forEach( function( a ) {
				return a.render( node );
			} );
			this.conditionalAttributes.forEach( function( a ) {
				return a.render( node );
			} );
			// Render children
			if ( this.fragment ) {
				// Special case - <script> element
				if ( this.name === 'script' ) {
					this.bubble = updateScript;
					this.node.text = this.fragment.toString( false );
					// bypass warning initially
					this.fragment.unrender = noop;
				} else if ( this.name === 'style' ) {
					this.bubble = updateCss;
					this.bubble();
					this.fragment.unrender = noop;
				} else if ( this.binding && this.getAttribute( 'contenteditable' ) ) {
					this.fragment.unrender = noop;
				} else {
					this.node.appendChild( this.fragment.render() );
				}
			}
			// Add proxy event handlers
			if ( this.eventHandlers ) {
				this.eventHandlers.forEach( function( h ) {
					return h.render();
				} );
			}
			// deal with two-way bindings
			if ( this.binding ) {
				this.binding.render();
				this.node._ractive.binding = this.binding;
			}
			// Special case: if this is an <img>, and we're in a crap browser, we may
			// need to prevent it from overriding width and height when it loads the src
			if ( this.name === 'img' ) {
				renderImage( this );
			}
			// apply decorator(s)
			if ( this.decorator && this.decorator.fn ) {
				runloop.scheduleTask( function() {
					this$0.decorator.init();
				} );
			}
			// trigger intro transition
			if ( root.transitionsEnabled && this.intro ) {
				var transition = new Transition( this, this.intro, true );
				runloop.registerTransition( transition );
				runloop.scheduleTask( function() {
					return transition.start();
				} );
				this.transition = transition;
			}
			if ( this.name === 'option' ) {
				processOption( this );
			}
			if ( this.node.autofocus ) {
				// Special case. Some browsers (*cough* Firefix *cough*) have a problem
				// with dynamically-generated elements having autofocus, and they won't
				// allow you to programmatically focus the element until it's in the DOM
				runloop.scheduleTask( function() {
					return this$0.node.focus();
				} );
			}
			updateLiveQueries( this );
			return this.node;
		};

		function getNamespace( element ) {
			var namespace, xmlns, parent;
			// Use specified namespace...
			if ( xmlns = element.getAttribute( 'xmlns' ) ) {
				namespace = xmlns;
			} else if ( element.name === 'svg' ) {
				namespace = namespaces.svg;
			} else if ( parent = element.parent ) {
				// ...or HTML, if the parent is a <foreignObject>
				if ( parent.name === 'foreignObject' ) {
					namespace = namespaces.html;
				} else {
					namespace = parent.node.namespaceURI;
				}
			} else {
				namespace = element.root.el.namespaceURI;
			}
			return namespace;
		}

		function processOption( option ) {
			var optionValue, selectValue, i;
			if ( !option.select ) {
				return;
			}
			selectValue = option.select.getAttribute( 'value' );
			if ( selectValue === undefined ) {
				return;
			}
			optionValue = option.getAttribute( 'value' );
			if ( option.select.node.multiple && isArray( selectValue ) ) {
				i = selectValue.length;
				while ( i-- ) {
					if ( optionValue == selectValue[ i ] ) {
						option.node.selected = true;
						break;
					}
				}
			} else {
				option.node.selected = optionValue == selectValue;
			}
		}

		function updateLiveQueries( element ) {
			var instance, liveQueries, i, selector, query;
			// Does this need to be added to any live queries?
			instance = element.root;
			do {
				liveQueries = instance._liveQueries;
				i = liveQueries.length;
				while ( i-- ) {
					selector = liveQueries[ i ];
					query = liveQueries[ '_' + selector ];
					if ( query._test( element ) ) {
						// keep register of applicable selectors, for when we teardown
						( element.liveQueries || ( element.liveQueries = [] ) ).push( query );
					}
				}
			} while ( instance = instance._parent );
		}
		return __export;
	}( namespaces, isArray, warn, create, createElement, defineProperty, noop, runloop, getInnerContext, render, Transition );

	/* virtualdom/items/Element/prototype/toString.js */
	var virtualdom_items_Element$toString = function( voidElementNames, isArray, escapeHtml ) {

		var __export;
		__export = function() {
			var str, escape;
			str = '<' + ( this.template.y ? '!DOCTYPE' : this.template.e );
			str += this.attributes.map( stringifyAttribute ).join( '' ) + this.conditionalAttributes.map( stringifyAttribute ).join( '' );
			// Special case - selected options
			if ( this.name === 'option' && optionIsSelected( this ) ) {
				str += ' selected';
			}
			// Special case - two-way radio name bindings
			if ( this.name === 'input' && inputIsCheckedRadio( this ) ) {
				str += ' checked';
			}
			str += '>';
			// Special case - textarea
			if ( this.name === 'textarea' && this.getAttribute( 'value' ) !== undefined ) {
				str += escapeHtml( this.getAttribute( 'value' ) );
			} else if ( this.getAttribute( 'contenteditable' ) !== undefined ) {
				str += this.getAttribute( 'value' );
			}
			if ( this.fragment ) {
				escape = this.name !== 'script' && this.name !== 'style';
				str += this.fragment.toString( escape );
			}
			// add a closing tag if this isn't a void element
			if ( !voidElementNames.test( this.template.e ) ) {
				str += '</' + this.template.e + '>';
			}
			return str;
		};

		function optionIsSelected( element ) {
			var optionValue, selectValue, i;
			optionValue = element.getAttribute( 'value' );
			if ( optionValue === undefined || !element.select ) {
				return false;
			}
			selectValue = element.select.getAttribute( 'value' );
			if ( selectValue == optionValue ) {
				return true;
			}
			if ( element.select.getAttribute( 'multiple' ) && isArray( selectValue ) ) {
				i = selectValue.length;
				while ( i-- ) {
					if ( selectValue[ i ] == optionValue ) {
						return true;
					}
				}
			}
		}

		function inputIsCheckedRadio( element ) {
			var attributes, typeAttribute, valueAttribute, nameAttribute;
			attributes = element.attributes;
			typeAttribute = attributes.type;
			valueAttribute = attributes.value;
			nameAttribute = attributes.name;
			if ( !typeAttribute || typeAttribute.value !== 'radio' || !valueAttribute || !nameAttribute.interpolator ) {
				return;
			}
			if ( valueAttribute.value === nameAttribute.interpolator.value ) {
				return true;
			}
		}

		function stringifyAttribute( attribute ) {
			var str = attribute.toString();
			return str ? ' ' + str : '';
		}
		return __export;
	}( voidElementNames, isArray, escapeHtml );

	/* virtualdom/items/Element/special/option/unbind.js */
	var virtualdom_items_Element_special_option_unbind = function( removeFromArray ) {

		return function unbindOption( option ) {
			if ( option.select ) {
				removeFromArray( option.select.options, option );
			}
		};
	}( removeFromArray );

	/* virtualdom/items/Element/prototype/unbind.js */
	var virtualdom_items_Element$unbind = function( unbindOption ) {

		var __export;
		__export = function Element$unbind() {
			if ( this.fragment ) {
				this.fragment.unbind();
			}
			if ( this.binding ) {
				this.binding.unbind();
			}
			if ( this.eventHandlers ) {
				this.eventHandlers.forEach( unbind );
			}
			// Special case - <option>
			if ( this.name === 'option' ) {
				unbindOption( this );
			}
			this.attributes.forEach( unbind );
			this.conditionalAttributes.forEach( unbind );
		};

		function unbind( x ) {
			x.unbind();
		}
		return __export;
	}( virtualdom_items_Element_special_option_unbind );

	/* virtualdom/items/Element/prototype/unrender.js */
	var virtualdom_items_Element$unrender = function( runloop, Transition ) {

		var __export;
		__export = function Element$unrender( shouldDestroy ) {
			var binding, bindings;
			if ( this.transition ) {
				this.transition.complete();
			}
			// Detach as soon as we can
			if ( this.name === 'option' ) {
				// <option> elements detach immediately, so that
				// their parent <select> element syncs correctly, and
				// since option elements can't have transitions anyway
				this.detach();
			} else if ( shouldDestroy ) {
				runloop.detachWhenReady( this );
			}
			// Children first. that way, any transitions on child elements will be
			// handled by the current transitionManager
			if ( this.fragment ) {
				this.fragment.unrender( false );
			}
			if ( binding = this.binding ) {
				this.binding.unrender();
				this.node._ractive.binding = null;
				bindings = this.root._twowayBindings[ binding.keypath ];
				bindings.splice( bindings.indexOf( binding ), 1 );
			}
			// Remove event handlers
			if ( this.eventHandlers ) {
				this.eventHandlers.forEach( function( h ) {
					return h.unrender();
				} );
			}
			if ( this.decorator ) {
				this.decorator.teardown();
			}
			// trigger outro transition if necessary
			if ( this.root.transitionsEnabled && this.outro ) {
				var transition = new Transition( this, this.outro, false );
				runloop.registerTransition( transition );
				runloop.scheduleTask( function() {
					return transition.start();
				} );
			}
			// Remove this node from any live queries
			if ( this.liveQueries ) {
				removeFromLiveQueries( this );
			}
		};

		function removeFromLiveQueries( element ) {
			var query, selector, i;
			i = element.liveQueries.length;
			while ( i-- ) {
				query = element.liveQueries[ i ];
				selector = query.selector;
				query._remove( element.node );
			}
		}
		return __export;
	}( runloop, Transition );

	/* virtualdom/items/Element/_Element.js */
	var Element = function( bubble, detach, find, findAll, findAllComponents, findComponent, findNextNode, firstNode, getAttribute, init, rebind, render, toString, unbind, unrender ) {

		var Element = function( options ) {
			this.init( options );
		};
		Element.prototype = {
			bubble: bubble,
			detach: detach,
			find: find,
			findAll: findAll,
			findAllComponents: findAllComponents,
			findComponent: findComponent,
			findNextNode: findNextNode,
			firstNode: firstNode,
			getAttribute: getAttribute,
			init: init,
			rebind: rebind,
			render: render,
			toString: toString,
			unbind: unbind,
			unrender: unrender
		};
		return Element;
	}( virtualdom_items_Element$bubble, virtualdom_items_Element$detach, virtualdom_items_Element$find, virtualdom_items_Element$findAll, virtualdom_items_Element$findAllComponents, virtualdom_items_Element$findComponent, virtualdom_items_Element$findNextNode, virtualdom_items_Element$firstNode, virtualdom_items_Element$getAttribute, virtualdom_items_Element$init, virtualdom_items_Element$rebind, virtualdom_items_Element$render, virtualdom_items_Element$toString, virtualdom_items_Element$unbind, virtualdom_items_Element$unrender );

	/* virtualdom/items/Partial/deIndent.js */
	var deIndent = function() {

		var __export;
		var empty = /^\s*$/,
			leadingWhitespace = /^\s*/;
		__export = function( str ) {
			var lines, firstLine, lastLine, minIndent;
			lines = str.split( '\n' );
			// remove first and last line, if they only contain whitespace
			firstLine = lines[ 0 ];
			if ( firstLine !== undefined && empty.test( firstLine ) ) {
				lines.shift();
			}
			lastLine = lines[ lines.length - 1 ];
			if ( lastLine !== undefined && empty.test( lastLine ) ) {
				lines.pop();
			}
			minIndent = lines.reduce( reducer, null );
			if ( minIndent ) {
				str = lines.map( function( line ) {
					return line.replace( minIndent, '' );
				} ).join( '\n' );
			}
			return str;
		};

		function reducer( previous, line ) {
			var lineIndent = leadingWhitespace.exec( line )[ 0 ];
			if ( previous === null || lineIndent.length < previous.length ) {
				return lineIndent;
			}
			return previous;
		}
		return __export;
	}();

	/* virtualdom/items/Partial/getPartialTemplate.js */
	var getPartialTemplate = function( log, config, parser, deIndent ) {

		var __export;
		__export = function getPartialTemplate( ractive, name ) {
			var partial;
			// If the partial in instance or view heirarchy instances, great
			if ( partial = getPartialFromRegistry( ractive, name ) ) {
				return partial;
			}
			// Does it exist on the page as a script tag?
			partial = parser.fromId( name, {
				noThrow: true
			} );
			if ( partial ) {
				// is this necessary?
				partial = deIndent( partial );
				// parse and register to this ractive instance
				var parsed = parser.parse( partial, parser.getParseOptions( ractive ) );
				// register (and return main partial if there are others in the template)
				return ractive.partials[ name ] = parsed.t;
			}
		};

		function getPartialFromRegistry( ractive, name ) {
			var partials = config.registries.partials;
			// find first instance in the ractive or view hierarchy that has this partial
			var instance = partials.findInstance( ractive, name );
			if ( !instance ) {
				return;
			}
			var partial = instance.partials[ name ],
				fn;
			// partial is a function?
			if ( typeof partial === 'function' ) {
				fn = partial.bind( instance );
				fn.isOwner = instance.partials.hasOwnProperty( name );
				partial = fn( instance.data, parser );
			}
			if ( !partial ) {
				log.warn( {
					debug: ractive.debug,
					message: 'noRegistryFunctionReturn',
					args: {
						registry: 'partial',
						name: name
					}
				} );
				return;
			}
			// If this was added manually to the registry,
			// but hasn't been parsed, parse it now
			if ( !parser.isParsed( partial ) ) {
				// use the parseOptions of the ractive instance on which it was found
				var parsed = parser.parse( partial, parser.getParseOptions( instance ) );
				// Partials cannot contain nested partials!
				// TODO add a test for this
				if ( parsed.p ) {
					log.warn( {
						debug: ractive.debug,
						message: 'noNestedPartials',
						args: {
							rname: name
						}
					} );
				}
				// if fn, use instance to store result, otherwise needs to go
				// in the correct point in prototype chain on instance or constructor
				var target = fn ? instance : partials.findOwner( instance, name );
				// may be a template with partials, which need to be registered and main template extracted
				target.partials[ name ] = partial = parsed.t;
			}
			// store for reset
			if ( fn ) {
				partial._fn = fn;
			}
			return partial.v ? partial.t : partial;
		}
		return __export;
	}( log, config, parser, deIndent );

	/* virtualdom/items/Partial/applyIndent.js */
	var applyIndent = function( string, indent ) {
		var indented;
		if ( !indent ) {
			return string;
		}
		indented = string.split( '\n' ).map( function( line, notFirstLine ) {
			return notFirstLine ? indent + line : line;
		} ).join( '\n' );
		return indented;
	};

	/* virtualdom/items/Partial/_Partial.js */
	var Partial = function( log, types, getPartialTemplate, applyIndent, circular, runloop, Mustache, rebind, unbind ) {

		var Partial, Fragment;
		circular.push( function() {
			Fragment = circular.Fragment;
		} );
		Partial = function( options ) {
			var parentFragment, template;
			parentFragment = this.parentFragment = options.parentFragment;
			this.root = parentFragment.root;
			this.type = types.PARTIAL;
			this.index = options.index;
			this.name = options.template.r;
			this.fragment = this.fragmentToRender = this.fragmentToUnrender = null;
			Mustache.init( this, options );
			// If this didn't resolve, it most likely means we have a named partial
			// (i.e. `{{>foo}}` means 'use the foo partial', not 'use the partial
			// whose name is the value of `foo`')
			if ( !this.keypath && ( template = getPartialTemplate( this.root, this.name ) ) ) {
				unbind.call( this );
				// prevent any further changes
				this.isNamed = true;
				this.setTemplate( template );
			}
		};
		Partial.prototype = {
			bubble: function() {
				this.parentFragment.bubble();
			},
			detach: function() {
				return this.fragment.detach();
			},
			find: function( selector ) {
				return this.fragment.find( selector );
			},
			findAll: function( selector, query ) {
				return this.fragment.findAll( selector, query );
			},
			findComponent: function( selector ) {
				return this.fragment.findComponent( selector );
			},
			findAllComponents: function( selector, query ) {
				return this.fragment.findAllComponents( selector, query );
			},
			firstNode: function() {
				return this.fragment.firstNode();
			},
			findNextNode: function() {
				return this.parentFragment.findNextNode( this );
			},
			getValue: function() {
				return this.fragment.getValue();
			},
			rebind: function( indexRef, newIndex, oldKeypath, newKeypath ) {
				rebind.call( this, indexRef, newIndex, oldKeypath, newKeypath );
				this.fragment.rebind( indexRef, newIndex, oldKeypath, newKeypath );
			},
			render: function() {
				this.docFrag = document.createDocumentFragment();
				this.update();
				this.rendered = true;
				return this.docFrag;
			},
			resolve: Mustache.resolve,
			setValue: function( value ) {
				var template;
				if ( value !== undefined && value === this.value ) {
					// nothing has changed, so no work to be done
					return;
				}
				template = getPartialTemplate( this.root, '' + value );
				// we may be here if we have a partial like `{{>foo}}` and `foo` is the
				// name of both a data property (whose value ISN'T the name of a partial)
				// and a partial. In those cases, this becomes a named partial
				if ( !template && ( template = getPartialTemplate( this.root, this.name ) ) ) {
					unbind.call( this );
					this.isNamed = true;
				}
				if ( !template ) {
					log.error( {
						debug: this.root.debug,
						message: 'noTemplateForPartial',
						args: {
							name: this.name
						}
					} );
				}
				this.setTemplate( template || [] );
				this.value = value;
				this.bubble();
				if ( this.rendered ) {
					runloop.addView( this );
				}
			},
			setTemplate: function( template ) {
				if ( this.fragment ) {
					this.fragment.unbind();
					this.fragmentToUnrender = this.fragment;
				}
				this.fragment = new Fragment( {
					template: template,
					root: this.root,
					owner: this,
					pElement: this.parentFragment.pElement
				} );
				this.fragmentToRender = this.fragment;
			},
			toString: function( toString ) {
				var string, previousItem, lastLine, match;
				string = this.fragment.toString( toString );
				previousItem = this.parentFragment.items[ this.index - 1 ];
				if ( !previousItem || previousItem.type !== types.TEXT ) {
					return string;
				}
				lastLine = previousItem.text.split( '\n' ).pop();
				if ( match = /^\s+$/.exec( lastLine ) ) {
					return applyIndent( string, match[ 0 ] );
				}
				return string;
			},
			unbind: function() {
				if ( !this.isNamed ) {
					// dynamic partial - need to unbind self
					unbind.call( this );
				}
				if ( this.fragment ) {
					this.fragment.unbind();
				}
			},
			unrender: function( shouldDestroy ) {
				if ( this.rendered ) {
					if ( this.fragment ) {
						this.fragment.unrender( shouldDestroy );
					}
					this.rendered = false;
				}
			},
			update: function() {
				var target, anchor;
				if ( this.fragmentToUnrender ) {
					this.fragmentToUnrender.unrender( true );
					this.fragmentToUnrender = null;
				}
				if ( this.fragmentToRender ) {
					this.docFrag.appendChild( this.fragmentToRender.render() );
					this.fragmentToRender = null;
				}
				if ( this.rendered ) {
					target = this.parentFragment.getNode();
					anchor = this.parentFragment.findNextNode( this );
					target.insertBefore( this.docFrag, anchor );
				}
			}
		};
		return Partial;
	}( log, types, getPartialTemplate, applyIndent, circular, runloop, Mustache, rebind, unbind );

	/* virtualdom/items/Component/getComponent.js */
	var getComponent = function( config, log, circular ) {

		var Ractive;
		circular.push( function() {
			Ractive = circular.Ractive;
		} );
		// finds the component constructor in the registry or view hierarchy registries
		return function getComponent( ractive, name ) {
			var component, instance = config.registries.components.findInstance( ractive, name );
			if ( instance ) {
				component = instance.components[ name ];
				// best test we have for not Ractive.extend
				if ( !component._parent ) {
					// function option, execute and store for reset
					var fn = component.bind( instance );
					fn.isOwner = instance.components.hasOwnProperty( name );
					component = fn( instance.data );
					if ( !component ) {
						log.warn( {
							debug: ractive.debug,
							message: 'noRegistryFunctionReturn',
							args: {
								registry: 'component',
								name: name
							}
						} );
						return;
					}
					if ( typeof component === 'string' ) {
						//allow string lookup
						component = getComponent( ractive, component );
					}
					component._fn = fn;
					instance.components[ name ] = component;
				}
			}
			return component;
		};
	}( config, log, circular );

	/* virtualdom/items/Component/prototype/detach.js */
	var virtualdom_items_Component$detach = function( Hook ) {

		var detachHook = new Hook( 'detach' );
		return function Component$detach() {
			var detached = this.instance.fragment.detach();
			detachHook.fire( this.instance );
			return detached;
		};
	}( Ractive$shared_hooks_Hook );

	/* virtualdom/items/Component/prototype/find.js */
	var virtualdom_items_Component$find = function Component$find( selector ) {
		return this.instance.fragment.find( selector );
	};

	/* virtualdom/items/Component/prototype/findAll.js */
	var virtualdom_items_Component$findAll = function Component$findAll( selector, query ) {
		return this.instance.fragment.findAll( selector, query );
	};

	/* virtualdom/items/Component/prototype/findAllComponents.js */
	var virtualdom_items_Component$findAllComponents = function Component$findAllComponents( selector, query ) {
		query._test( this, true );
		if ( this.instance.fragment ) {
			this.instance.fragment.findAllComponents( selector, query );
		}
	};

	/* virtualdom/items/Component/prototype/findComponent.js */
	var virtualdom_items_Component$findComponent = function Component$findComponent( selector ) {
		if ( !selector || selector === this.name ) {
			return this.instance;
		}
		if ( this.instance.fragment ) {
			return this.instance.fragment.findComponent( selector );
		}
		return null;
	};

	/* virtualdom/items/Component/prototype/findNextNode.js */
	var virtualdom_items_Component$findNextNode = function Component$findNextNode() {
		return this.parentFragment.findNextNode( this );
	};

	/* virtualdom/items/Component/prototype/firstNode.js */
	var virtualdom_items_Component$firstNode = function Component$firstNode() {
		if ( this.rendered ) {
			return this.instance.fragment.firstNode();
		}
		return null;
	};

	/* virtualdom/items/Component/initialise/createModel/ComponentParameter.js */
	var ComponentParameter = function( runloop, circular ) {

		var Fragment, ComponentParameter;
		circular.push( function() {
			Fragment = circular.Fragment;
		} );
		ComponentParameter = function( component, key, value ) {
			this.parentFragment = component.parentFragment;
			this.component = component;
			this.key = key;
			this.fragment = new Fragment( {
				template: value,
				root: component.root,
				owner: this
			} );
			this.value = this.fragment.getValue();
		};
		ComponentParameter.prototype = {
			bubble: function() {
				if ( !this.dirty ) {
					this.dirty = true;
					runloop.addView( this );
				}
			},
			update: function() {
				var value = this.fragment.getValue();
				this.component.instance.viewmodel.set( this.key, value );
				runloop.addViewmodel( this.component.instance.viewmodel );
				this.value = value;
				this.dirty = false;
			},
			rebind: function( indexRef, newIndex, oldKeypath, newKeypath ) {
				this.fragment.rebind( indexRef, newIndex, oldKeypath, newKeypath );
			},
			unbind: function() {
				this.fragment.unbind();
			}
		};
		return ComponentParameter;
	}( runloop, circular );

	/* virtualdom/items/Component/initialise/createModel/ReferenceExpressionParameter.js */
	var ReferenceExpressionParameter = function( ReferenceExpressionResolver, createComponentBinding ) {

		var ReferenceExpressionParameter = function( component, childKeypath, template, toBind ) {
			var this$0 = this;
			this.root = component.root;
			this.parentFragment = component.parentFragment;
			this.ready = false;
			this.hash = null;
			this.resolver = new ReferenceExpressionResolver( this, template, function( keypath ) {
				// Are we updating an existing binding?
				if ( this$0.binding || ( this$0.binding = component.bindings[ this$0.hash ] ) ) {
					component.bindings[ this$0.hash ] = null;
					this$0.binding.rebind( keypath );
					this$0.hash = keypath + '=' + childKeypath;
					component.bindings[ this$0.hash ];
				} else {
					if ( !this$0.ready ) {
						// The child instance isn't created yet, we need to create the binding later
						toBind.push( {
							childKeypath: childKeypath,
							parentKeypath: keypath
						} );
					} else {
						createComponentBinding( component, component.root, keypath, childKeypath );
					}
				}
				this$0.value = component.root.viewmodel.get( keypath );
			} );
		};
		ReferenceExpressionParameter.prototype = {
			rebind: function( indexRef, newIndex, oldKeypath, newKeypath ) {
				this.resolver.rebind( indexRef, newIndex, oldKeypath, newKeypath );
			},
			unbind: function() {
				this.resolver.unbind();
			}
		};
		return ReferenceExpressionParameter;
	}( ReferenceExpressionResolver, createComponentBinding );

	/* virtualdom/items/Component/initialise/createModel/_createModel.js */
	var createModel = function( types, parseJSON, resolveRef, ComponentParameter, ReferenceExpressionParameter ) {

		var __export;
		__export = function( component, defaultData, attributes, toBind ) {
			var data = {},
				key, value;
			// some parameters, e.g. foo="The value is {{bar}}", are 'complex' - in
			// other words, we need to construct a string fragment to watch
			// when they change. We store these so they can be torn down later
			component.complexParameters = [];
			for ( key in attributes ) {
				if ( attributes.hasOwnProperty( key ) ) {
					value = getValue( component, key, attributes[ key ], toBind );
					if ( value !== undefined || defaultData[ key ] === undefined ) {
						data[ key ] = value;
					}
				}
			}
			return data;
		};

		function getValue( component, key, template, toBind ) {
			var parameter, parsed, parentInstance, parentFragment, keypath, indexRef;
			parentInstance = component.root;
			parentFragment = component.parentFragment;
			// If this is a static value, great
			if ( typeof template === 'string' ) {
				parsed = parseJSON( template );
				if ( !parsed ) {
					return template;
				}
				return parsed.value;
			}
			// If null, we treat it as a boolean attribute (i.e. true)
			if ( template === null ) {
				return true;
			}
			// Single interpolator?
			if ( template.length === 1 && template[ 0 ].t === types.INTERPOLATOR ) {
				// If it's a regular interpolator, we bind to it
				if ( template[ 0 ].r ) {
					// Is it an index reference?
					if ( parentFragment.indexRefs && parentFragment.indexRefs[ indexRef = template[ 0 ].r ] !== undefined ) {
						component.indexRefBindings[ indexRef ] = key;
						return parentFragment.indexRefs[ indexRef ];
					}
					// TODO what about references that resolve late? Should these be considered?
					keypath = resolveRef( parentInstance, template[ 0 ].r, parentFragment ) || template[ 0 ].r;
					// We need to set up bindings between parent and child, but
					// we can't do it yet because the child instance doesn't exist
					// yet - so we make a note instead
					toBind.push( {
						childKeypath: key,
						parentKeypath: keypath
					} );
					return parentInstance.viewmodel.get( keypath );
				}
				// If it's a reference expression (e.g. `{{foo[bar]}}`), we need
				// to watch the keypath and create/destroy bindings
				if ( template[ 0 ].rx ) {
					parameter = new ReferenceExpressionParameter( component, key, template[ 0 ].rx, toBind );
					component.complexParameters.push( parameter );
					parameter.ready = true;
					return parameter.value;
				}
			}
			// We have a 'complex parameter' - we need to create a full-blown string
			// fragment in order to evaluate and observe its value
			parameter = new ComponentParameter( component, key, template );
			component.complexParameters.push( parameter );
			return parameter.value;
		}
		return __export;
	}( types, parseJSON, resolveRef, ComponentParameter, ReferenceExpressionParameter );

	/* virtualdom/items/Component/initialise/createInstance.js */
	var createInstance = function( log ) {

		return function( component, Component, data, contentDescriptor ) {
			var instance, parentFragment, partials, ractive;
			parentFragment = component.parentFragment;
			ractive = component.root;
			// Make contents available as a {{>content}} partial
			partials = {
				content: contentDescriptor || []
			};
			if ( Component.defaults.el ) {
				log.warn( {
					debug: ractive.debug,
					message: 'defaultElSpecified',
					args: {
						name: component.name
					}
				} );
			}
			instance = new Component( {
				el: null,
				append: true,
				data: data,
				partials: partials,
				magic: ractive.magic || Component.defaults.magic,
				modifyArrays: ractive.modifyArrays,
				_parent: ractive,
				_component: component,
				// need to inherit runtime parent adaptors
				adapt: ractive.adapt,
				yield: {
					template: contentDescriptor,
					instance: ractive
				}
			} );
			return instance;
		};
	}( log );

	/* virtualdom/items/Component/initialise/createBindings.js */
	var createBindings = function( createComponentBinding ) {

		return function createInitialComponentBindings( component, toBind ) {
			toBind.forEach( function createInitialComponentBinding( pair ) {
				var childValue, parentValue;
				createComponentBinding( component, component.root, pair.parentKeypath, pair.childKeypath );
				childValue = component.instance.viewmodel.get( pair.childKeypath );
				parentValue = component.root.viewmodel.get( pair.parentKeypath );
				if ( childValue !== undefined && parentValue === undefined ) {
					component.root.viewmodel.set( pair.parentKeypath, childValue );
				}
			} );
		};
	}( createComponentBinding );

	/* virtualdom/items/Component/initialise/propagateEvents.js */
	var propagateEvents = function( circular, fireEvent, log ) {

		var __export;
		var Fragment;
		circular.push( function() {
			Fragment = circular.Fragment;
		} );
		__export = function propagateEvents( component, eventsDescriptor ) {
			var eventName;
			for ( eventName in eventsDescriptor ) {
				if ( eventsDescriptor.hasOwnProperty( eventName ) ) {
					propagateEvent( component.instance, component.root, eventName, eventsDescriptor[ eventName ] );
				}
			}
		};

		function propagateEvent( childInstance, parentInstance, eventName, proxyEventName ) {
			if ( typeof proxyEventName !== 'string' ) {
				log.error( {
					debug: parentInstance.debug,
					message: 'noComponentEventArguments'
				} );
			}
			childInstance.on( eventName, function() {
				var event, args;
				// semi-weak test, but what else? tag the event obj ._isEvent ?
				if ( arguments.length && arguments[ 0 ] && arguments[ 0 ].node ) {
					event = Array.prototype.shift.call( arguments );
				}
				args = Array.prototype.slice.call( arguments );
				fireEvent( parentInstance, proxyEventName, {
					event: event,
					args: args
				} );
				// cancel bubbling
				return false;
			} );
		}
		return __export;
	}( circular, Ractive$shared_fireEvent, log );

	/* virtualdom/items/Component/initialise/updateLiveQueries.js */
	var updateLiveQueries = function( component ) {
		var ancestor, query;
		// If there's a live query for this component type, add it
		ancestor = component.root;
		while ( ancestor ) {
			if ( query = ancestor._liveComponentQueries[ '_' + component.name ] ) {
				query.push( component.instance );
			}
			ancestor = ancestor._parent;
		}
	};

	/* virtualdom/items/Component/prototype/init.js */
	var virtualdom_items_Component$init = function( types, warn, createModel, createInstance, createBindings, propagateEvents, updateLiveQueries ) {

		return function Component$init( options, Component ) {
			var parentFragment, root, data, toBind;
			parentFragment = this.parentFragment = options.parentFragment;
			root = parentFragment.root;
			this.root = root;
			this.type = types.COMPONENT;
			this.name = options.template.e;
			this.index = options.index;
			this.indexRefBindings = {};
			this.bindings = [];
			// even though only one yielder is allowed, we need to have an array of them
			// as it's possible to cause a yielder to be created before the last one
			// was destroyed in the same turn of the runloop
			this.yielders = [];
			if ( !Component ) {
				throw new Error( 'Component "' + this.name + '" not found' );
			}
			// First, we need to create a model for the component - e.g. if we
			// encounter <widget foo='bar'/> then we need to create a widget
			// with `data: { foo: 'bar' }`.
			//
			// This may involve setting up some bindings, but we can't do it
			// yet so we take some notes instead
			toBind = [];
			data = createModel( this, Component.defaults.data || {}, options.template.a, toBind );
			createInstance( this, Component, data, options.template.f );
			createBindings( this, toBind );
			propagateEvents( this, options.template.v );
			// intro, outro and decorator directives have no effect
			if ( options.template.t1 || options.template.t2 || options.template.o ) {
				warn( 'The "intro", "outro" and "decorator" directives have no effect on components' );
			}
			updateLiveQueries( this );
		};
	}( types, warn, createModel, createInstance, createBindings, propagateEvents, updateLiveQueries );

	/* virtualdom/items/Component/prototype/rebind.js */
	var virtualdom_items_Component$rebind = function( runloop, getNewKeypath ) {

		return function Component$rebind( indexRef, newIndex, oldKeypath, newKeypath ) {
			var childInstance = this.instance,
				parentInstance = childInstance._parent,
				indexRefAlias, query;
			this.bindings.forEach( function( binding ) {
				var updated;
				if ( binding.root !== parentInstance ) {
					return;
				}
				if ( updated = getNewKeypath( binding.keypath, oldKeypath, newKeypath ) ) {
					binding.rebind( updated );
				}
			} );
			this.complexParameters.forEach( rebind );
			if ( this.yielders[ 0 ] ) {
				rebind( this.yielders[ 0 ] );
			}
			if ( indexRefAlias = this.indexRefBindings[ indexRef ] ) {
				runloop.addViewmodel( childInstance.viewmodel );
				childInstance.viewmodel.set( indexRefAlias, newIndex );
			}
			if ( query = this.root._liveComponentQueries[ '_' + this.name ] ) {
				query._makeDirty();
			}

			function rebind( x ) {
				x.rebind( indexRef, newIndex, oldKeypath, newKeypath );
			}
		};
	}( runloop, getNewKeypath );

	/* virtualdom/items/Component/prototype/render.js */
	var virtualdom_items_Component$render = function Component$render() {
		var instance = this.instance;
		instance.render( this.parentFragment.getNode() );
		this.rendered = true;
		return instance.fragment.detach();
	};

	/* virtualdom/items/Component/prototype/toString.js */
	var virtualdom_items_Component$toString = function Component$toString() {
		return this.instance.fragment.toString();
	};

	/* virtualdom/items/Component/prototype/unbind.js */
	var virtualdom_items_Component$unbind = function() {

		var __export;
		__export = function Component$unbind() {
			this.complexParameters.forEach( unbind );
			this.bindings.forEach( unbind );
			removeFromLiveComponentQueries( this );
			this.instance.fragment.unbind();
		};

		function unbind( thing ) {
			thing.unbind();
		}

		function removeFromLiveComponentQueries( component ) {
			var instance, query;
			instance = component.root;
			do {
				if ( query = instance._liveComponentQueries[ '_' + component.name ] ) {
					query._remove( component );
				}
			} while ( instance = instance._parent );
		}
		return __export;
	}();

	/* virtualdom/items/Component/prototype/unrender.js */
	var virtualdom_items_Component$unrender = function Component$unrender( shouldDestroy ) {
		this.shouldDestroy = shouldDestroy;
		this.instance.unrender();
		if ( shouldDestroy ) {
			this.instance.teardown();
		}
	};

	/* virtualdom/items/Component/_Component.js */
	var Component = function( detach, find, findAll, findAllComponents, findComponent, findNextNode, firstNode, init, rebind, render, toString, unbind, unrender ) {

		var Component = function( options, Constructor ) {
			this.init( options, Constructor );
		};
		Component.prototype = {
			detach: detach,
			find: find,
			findAll: findAll,
			findAllComponents: findAllComponents,
			findComponent: findComponent,
			findNextNode: findNextNode,
			firstNode: firstNode,
			init: init,
			rebind: rebind,
			render: render,
			toString: toString,
			unbind: unbind,
			unrender: unrender
		};
		return Component;
	}( virtualdom_items_Component$detach, virtualdom_items_Component$find, virtualdom_items_Component$findAll, virtualdom_items_Component$findAllComponents, virtualdom_items_Component$findComponent, virtualdom_items_Component$findNextNode, virtualdom_items_Component$firstNode, virtualdom_items_Component$init, virtualdom_items_Component$rebind, virtualdom_items_Component$render, virtualdom_items_Component$toString, virtualdom_items_Component$unbind, virtualdom_items_Component$unrender );

	/* virtualdom/items/Comment.js */
	var Comment = function( types, detach ) {

		var Comment = function( options ) {
			this.type = types.COMMENT;
			this.value = options.template.c;
		};
		Comment.prototype = {
			detach: detach,
			firstNode: function() {
				return this.node;
			},
			render: function() {
				if ( !this.node ) {
					this.node = document.createComment( this.value );
				}
				return this.node;
			},
			toString: function() {
				return '<!--' + this.value + '-->';
			},
			unrender: function( shouldDestroy ) {
				if ( shouldDestroy ) {
					this.node.parentNode.removeChild( this.node );
				}
			}
		};
		return Comment;
	}( types, detach );

	/* virtualdom/items/Yielder.js */
	var Yielder = function( runloop, removeFromArray, circular ) {

		var Fragment;
		circular.push( function() {
			Fragment = circular.Fragment;
		} );
		var Yielder = function( options ) {
			var componentInstance, component;
			componentInstance = options.parentFragment.root;
			this.component = component = componentInstance.component;
			this.surrogateParent = options.parentFragment;
			this.parentFragment = component.parentFragment;
			this.fragment = new Fragment( {
				owner: this,
				root: componentInstance.yield.instance,
				template: componentInstance.yield.template,
				pElement: this.surrogateParent.pElement
			} );
			component.yielders.push( this );
			runloop.scheduleTask( function() {
				if ( component.yielders.length > 1 ) {
					throw new Error( 'A component template can only have one {{yield}} declaration at a time' );
				}
			} );
		};
		Yielder.prototype = {
			detach: function() {
				return this.fragment.detach();
			},
			find: function( selector ) {
				return this.fragment.find( selector );
			},
			findAll: function( selector, query ) {
				return this.fragment.findAll( selector, query );
			},
			findComponent: function( selector ) {
				return this.fragment.findComponent( selector );
			},
			findAllComponents: function( selector, query ) {
				return this.fragment.findAllComponents( selector, query );
			},
			findNextNode: function() {
				return this.surrogateParent.findNextNode( this );
			},
			firstNode: function() {
				return this.fragment.firstNode();
			},
			getValue: function( options ) {
				return this.fragment.getValue( options );
			},
			render: function() {
				return this.fragment.render();
			},
			unbind: function() {
				this.fragment.unbind();
			},
			unrender: function( shouldDestroy ) {
				this.fragment.unrender( shouldDestroy );
				removeFromArray( this.component.yielders, this );
			},
			rebind: function( indexRef, newIndex, oldKeypath, newKeypath ) {
				this.fragment.rebind( indexRef, newIndex, oldKeypath, newKeypath );
			},
			toString: function() {
				return this.fragment.toString();
			}
		};
		return Yielder;
	}( runloop, removeFromArray, circular );

	/* virtualdom/Fragment/prototype/init/createItem.js */
	var virtualdom_Fragment$init_createItem = function( types, Text, Interpolator, Section, Triple, Element, Partial, getComponent, Component, Comment, Yielder ) {

		return function createItem( options ) {
			if ( typeof options.template === 'string' ) {
				return new Text( options );
			}
			switch ( options.template.t ) {
				case types.INTERPOLATOR:
					if ( options.template.r === 'yield' ) {
						return new Yielder( options );
					}
					return new Interpolator( options );
				case types.SECTION:
					return new Section( options );
				case types.TRIPLE:
					return new Triple( options );
				case types.ELEMENT:
					var constructor;
					if ( constructor = getComponent( options.parentFragment.root, options.template.e ) ) {
						return new Component( options, constructor );
					}
					return new Element( options );
				case types.PARTIAL:
					return new Partial( options );
				case types.COMMENT:
					return new Comment( options );
				default:
					throw new Error( 'Something very strange happened. Please file an issue at https://github.com/ractivejs/ractive/issues. Thanks!' );
			}
		};
	}( types, Text, Interpolator, Section, Triple, Element, Partial, getComponent, Component, Comment, Yielder );

	/* virtualdom/Fragment/prototype/init.js */
	var virtualdom_Fragment$init = function( types, create, createItem ) {

		return function Fragment$init( options ) {
			var this$0 = this;
			var parentFragment, parentRefs, ref;
			// The item that owns this fragment - an element, section, partial, or attribute
			this.owner = options.owner;
			parentFragment = this.parent = this.owner.parentFragment;
			// inherited properties
			this.root = options.root;
			this.pElement = options.pElement;
			this.context = options.context;
			// If parent item is a section, this may not be the only fragment
			// that belongs to it - we need to make a note of the index
			if ( this.owner.type === types.SECTION ) {
				this.index = options.index;
			}
			// index references (the 'i' in {{#section:i}}...{{/section}}) need to cascade
			// down the tree
			if ( parentFragment ) {
				parentRefs = parentFragment.indexRefs;
				if ( parentRefs ) {
					this.indexRefs = create( null );
					// avoids need for hasOwnProperty
					for ( ref in parentRefs ) {
						this.indexRefs[ ref ] = parentRefs[ ref ];
					}
				}
			}
			if ( options.indexRef ) {
				if ( !this.indexRefs ) {
					this.indexRefs = {};
				}
				this.indexRefs[ options.indexRef ] = options.index;
			}
			// Time to create this fragment's child items
			// TEMP should this be happening?
			if ( typeof options.template === 'string' ) {
				options.template = [ options.template ];
			} else if ( !options.template ) {
				options.template = [];
			}
			this.items = options.template.map( function( template, i ) {
				return createItem( {
					parentFragment: this$0,
					pElement: options.pElement,
					template: template,
					index: i
				} );
			} );
			this.value = this.argsList = null;
			this.dirtyArgs = this.dirtyValue = true;
			this.bound = true;
		};
	}( types, create, virtualdom_Fragment$init_createItem );

	/* virtualdom/Fragment/prototype/rebind.js */
	var virtualdom_Fragment$rebind = function( assignNewKeypath ) {

		return function Fragment$rebind( indexRef, newIndex, oldKeypath, newKeypath ) {
			// assign new context keypath if needed
			assignNewKeypath( this, 'context', oldKeypath, newKeypath );
			if ( this.indexRefs && this.indexRefs[ indexRef ] !== undefined ) {
				this.indexRefs[ indexRef ] = newIndex;
			}
			this.items.forEach( function( item ) {
				if ( item.rebind ) {
					item.rebind( indexRef, newIndex, oldKeypath, newKeypath );
				}
			} );
		};
	}( assignNewKeypath );

	/* virtualdom/Fragment/prototype/render.js */
	var virtualdom_Fragment$render = function Fragment$render() {
		var result;
		if ( this.items.length === 1 ) {
			result = this.items[ 0 ].render();
		} else {
			result = document.createDocumentFragment();
			this.items.forEach( function( item ) {
				result.appendChild( item.render() );
			} );
		}
		this.rendered = true;
		return result;
	};

	/* virtualdom/Fragment/prototype/toString.js */
	var virtualdom_Fragment$toString = function Fragment$toString( escape ) {
		if ( !this.items ) {
			return '';
		}
		return this.items.map( function( item ) {
			return item.toString( escape );
		} ).join( '' );
	};

	/* virtualdom/Fragment/prototype/unbind.js */
	var virtualdom_Fragment$unbind = function() {

		var __export;
		__export = function Fragment$unbind() {
			if ( !this.bound ) {
				return;
			}
			this.items.forEach( unbindItem );
			this.bound = false;
		};

		function unbindItem( item ) {
			if ( item.unbind ) {
				item.unbind();
			}
		}
		return __export;
	}();

	/* virtualdom/Fragment/prototype/unrender.js */
	var virtualdom_Fragment$unrender = function Fragment$unrender( shouldDestroy ) {
		if ( !this.rendered ) {
			throw new Error( 'Attempted to unrender a fragment that was not rendered' );
		}
		this.items.forEach( function( i ) {
			return i.unrender( shouldDestroy );
		} );
		this.rendered = false;
	};

	/* virtualdom/Fragment.js */
	var Fragment = function( bubble, detach, find, findAll, findAllComponents, findComponent, findNextNode, firstNode, getNode, getValue, init, rebind, render, toString, unbind, unrender, circular ) {

		var Fragment = function( options ) {
			this.init( options );
		};
		Fragment.prototype = {
			bubble: bubble,
			detach: detach,
			find: find,
			findAll: findAll,
			findAllComponents: findAllComponents,
			findComponent: findComponent,
			findNextNode: findNextNode,
			firstNode: firstNode,
			getNode: getNode,
			getValue: getValue,
			init: init,
			rebind: rebind,
			render: render,
			toString: toString,
			unbind: unbind,
			unrender: unrender
		};
		circular.Fragment = Fragment;
		return Fragment;
	}( virtualdom_Fragment$bubble, virtualdom_Fragment$detach, virtualdom_Fragment$find, virtualdom_Fragment$findAll, virtualdom_Fragment$findAllComponents, virtualdom_Fragment$findComponent, virtualdom_Fragment$findNextNode, virtualdom_Fragment$firstNode, virtualdom_Fragment$getNode, virtualdom_Fragment$getValue, virtualdom_Fragment$init, virtualdom_Fragment$rebind, virtualdom_Fragment$render, virtualdom_Fragment$toString, virtualdom_Fragment$unbind, virtualdom_Fragment$unrender, circular );

	/* Ractive/prototype/reset.js */
	var Ractive$reset = function( Hook, runloop, Fragment, config ) {

		var shouldRerender = [
				'template',
				'partials',
				'components',
				'decorators',
				'events'
			],
			resetHook = new Hook( 'reset' );
		return function Ractive$reset( data, callback ) {
			var promise, wrapper, changes, i, rerender;
			if ( typeof data === 'function' && !callback ) {
				callback = data;
				data = {};
			} else {
				data = data || {};
			}
			if ( typeof data !== 'object' ) {
				throw new Error( 'The reset method takes either no arguments, or an object containing new data' );
			}
			// If the root object is wrapped, try and use the wrapper's reset value
			if ( ( wrapper = this.viewmodel.wrapped[ '' ] ) && wrapper.reset ) {
				if ( wrapper.reset( data ) === false ) {
					// reset was rejected, we need to replace the object
					this.data = data;
				}
			} else {
				this.data = data;
			}
			// reset config items and track if need to rerender
			changes = config.reset( this );
			i = changes.length;
			while ( i-- ) {
				if ( shouldRerender.indexOf( changes[ i ] ) > -1 ) {
					rerender = true;
					break;
				}
			}
			if ( rerender ) {
				var component;
				this.viewmodel.mark( '' );
				// Is this is a component, we need to set the `shouldDestroy`
				// flag, otherwise it will assume by default that a parent node
				// will be detached, and therefore it doesn't need to bother
				// detaching its own nodes
				if ( component = this.component ) {
					component.shouldDestroy = true;
				}
				this.unrender();
				if ( component ) {
					component.shouldDestroy = false;
				}
				// If the template changed, we need to destroy the parallel DOM
				// TODO if we're here, presumably it did?
				if ( this.fragment.template !== this.template ) {
					this.fragment.unbind();
					this.fragment = new Fragment( {
						template: this.template,
						root: this,
						owner: this
					} );
				}
				promise = this.render( this.el, this.anchor );
			} else {
				promise = runloop.start( this, true );
				this.viewmodel.mark( '' );
				runloop.end();
			}
			resetHook.fire( this, data );
			if ( callback ) {
				promise.then( callback );
			}
			return promise;
		};
	}( Ractive$shared_hooks_Hook, runloop, Fragment, config );

	/* Ractive/prototype/resetTemplate.js */
	var Ractive$resetTemplate = function( config, Fragment ) {

		return function Ractive$resetTemplate( template ) {
			var transitionsEnabled, component;
			config.template.init( null, this, {
				template: template
			} );
			transitionsEnabled = this.transitionsEnabled;
			this.transitionsEnabled = false;
			// Is this is a component, we need to set the `shouldDestroy`
			// flag, otherwise it will assume by default that a parent node
			// will be detached, and therefore it doesn't need to bother
			// detaching its own nodes
			if ( component = this.component ) {
				component.shouldDestroy = true;
			}
			this.unrender();
			if ( component ) {
				component.shouldDestroy = false;
			}
			// remove existing fragment and create new one
			this.fragment.unbind();
			this.fragment = new Fragment( {
				template: this.template,
				root: this,
				owner: this
			} );
			this.render( this.el, this.anchor );
			this.transitionsEnabled = transitionsEnabled;
		};
	}( config, Fragment );

	/* Ractive/prototype/reverse.js */
	var Ractive$reverse = function( makeArrayMethod ) {

		return makeArrayMethod( 'reverse' );
	}( Ractive$shared_makeArrayMethod );

	/* Ractive/prototype/set.js */
	var Ractive$set = function( runloop, isObject, normaliseKeypath, getMatchingKeypaths ) {

		var wildcard = /\*/;
		return function Ractive$set( keypath, value, callback ) {
			var this$0 = this;
			var map, promise;
			promise = runloop.start( this, true );
			// Set multiple keypaths in one go
			if ( isObject( keypath ) ) {
				map = keypath;
				callback = value;
				for ( keypath in map ) {
					if ( map.hasOwnProperty( keypath ) ) {
						value = map[ keypath ];
						keypath = normaliseKeypath( keypath );
						this.viewmodel.set( keypath, value );
					}
				}
			} else {
				keypath = normaliseKeypath( keypath );
				if ( wildcard.test( keypath ) ) {
					getMatchingKeypaths( this, keypath ).forEach( function( keypath ) {
						this$0.viewmodel.set( keypath, value );
					} );
				} else {
					this.viewmodel.set( keypath, value );
				}
			}
			runloop.end();
			if ( callback ) {
				promise.then( callback.bind( this ) );
			}
			return promise;
		};
	}( runloop, isObject, normaliseKeypath, getMatchingKeypaths );

	/* Ractive/prototype/shift.js */
	var Ractive$shift = function( makeArrayMethod ) {

		return makeArrayMethod( 'shift' );
	}( Ractive$shared_makeArrayMethod );

	/* Ractive/prototype/sort.js */
	var Ractive$sort = function( makeArrayMethod ) {

		return makeArrayMethod( 'sort' );
	}( Ractive$shared_makeArrayMethod );

	/* Ractive/prototype/splice.js */
	var Ractive$splice = function( makeArrayMethod ) {

		return makeArrayMethod( 'splice' );
	}( Ractive$shared_makeArrayMethod );

	/* Ractive/prototype/subtract.js */
	var Ractive$subtract = function( add ) {

		return function Ractive$subtract( keypath, d ) {
			return add( this, keypath, d === undefined ? -1 : -d );
		};
	}( Ractive$shared_add );

	/* Ractive/prototype/teardown.js */
	var Ractive$teardown = function( Hook, Promise, removeFromArray ) {

		var teardownHook = new Hook( 'teardown' );
		// Teardown. This goes through the root fragment and all its children, removing observers
		// and generally cleaning up after itself
		return function Ractive$teardown( callback ) {
			var promise;
			this.fragment.unbind();
			this.viewmodel.teardown();
			if ( this.fragment.rendered && this.el.__ractive_instances__ ) {
				removeFromArray( this.el.__ractive_instances__, this );
			}
			this.shouldDestroy = true;
			promise = this.fragment.rendered ? this.unrender() : Promise.resolve();
			teardownHook.fire( this );
			if ( callback ) {
				// TODO deprecate this?
				promise.then( callback.bind( this ) );
			}
			return promise;
		};
	}( Ractive$shared_hooks_Hook, Promise, removeFromArray );

	/* Ractive/prototype/toggle.js */
	var Ractive$toggle = function( log ) {

		return function Ractive$toggle( keypath, callback ) {
			var value;
			if ( typeof keypath !== 'string' ) {
				log.errorOnly( {
					debug: this.debug,
					messsage: 'badArguments',
					arg: {
						arguments: keypath
					}
				} );
			}
			value = this.get( keypath );
			return this.set( keypath, !value, callback );
		};
	}( log );

	/* Ractive/prototype/toHTML.js */
	var Ractive$toHTML = function Ractive$toHTML() {
		return this.fragment.toString( true );
	};

	/* Ractive/prototype/unrender.js */
	var Ractive$unrender = function( css, Hook, log, Promise, removeFromArray, runloop ) {

		var unrenderHook = new Hook( 'unrender' );
		return function Ractive$unrender() {
			var this$0 = this;
			var promise, shouldDestroy;
			if ( !this.fragment.rendered ) {
				log.warn( {
					debug: this.debug,
					message: 'ractive.unrender() was called on a Ractive instance that was not rendered'
				} );
				return Promise.resolve();
			}
			promise = runloop.start( this, true );
			// If this is a component, and the component isn't marked for destruction,
			// don't detach nodes from the DOM unnecessarily
			shouldDestroy = !this.component || this.component.shouldDestroy || this.shouldDestroy;
			if ( this.constructor.css ) {
				promise.then( function() {
					css.remove( this$0.constructor );
				} );
			}
			// Cancel any animations in progress
			while ( this._animations[ 0 ] ) {
				this._animations[ 0 ].stop();
			}
			this.fragment.unrender( shouldDestroy );
			removeFromArray( this.el.__ractive_instances__, this );
			unrenderHook.fire( this );
			runloop.end();
			return promise;
		};
	}( global_css, Ractive$shared_hooks_Hook, log, Promise, removeFromArray, runloop );

	/* Ractive/prototype/unshift.js */
	var Ractive$unshift = function( makeArrayMethod ) {

		return makeArrayMethod( 'unshift' );
	}( Ractive$shared_makeArrayMethod );

	/* Ractive/prototype/update.js */
	var Ractive$update = function( Hook, runloop ) {

		var updateHook = new Hook( 'update' );
		return function Ractive$update( keypath, callback ) {
			var promise;
			if ( typeof keypath === 'function' ) {
				callback = keypath;
				keypath = '';
			} else {
				keypath = keypath || '';
			}
			promise = runloop.start( this, true );
			this.viewmodel.mark( keypath );
			runloop.end();
			updateHook.fire( this, keypath );
			if ( callback ) {
				promise.then( callback.bind( this ) );
			}
			return promise;
		};
	}( Ractive$shared_hooks_Hook, runloop );

	/* Ractive/prototype/updateModel.js */
	var Ractive$updateModel = function( arrayContentsMatch, isEqual ) {

		var __export;
		__export = function Ractive$updateModel( keypath, cascade ) {
			var values;
			if ( typeof keypath !== 'string' ) {
				keypath = '';
				cascade = true;
			}
			consolidateChangedValues( this, keypath, values = {}, cascade );
			return this.set( values );
		};

		function consolidateChangedValues( ractive, keypath, values, cascade ) {
			var bindings, childDeps, i, binding, oldValue, newValue, checkboxGroups = [];
			bindings = ractive._twowayBindings[ keypath ];
			if ( bindings && ( i = bindings.length ) ) {
				while ( i-- ) {
					binding = bindings[ i ];
					// special case - radio name bindings
					if ( binding.radioName && !binding.element.node.checked ) {
						continue;
					}
					// special case - checkbox name bindings come in groups, so
					// we want to get the value once at most
					if ( binding.checkboxName ) {
						if ( !checkboxGroups[ binding.keypath ] && !binding.changed() ) {
							checkboxGroups.push( binding.keypath );
							checkboxGroups[ binding.keypath ] = binding;
						}
						continue;
					}
					oldValue = binding.attribute.value;
					newValue = binding.getValue();
					if ( arrayContentsMatch( oldValue, newValue ) ) {
						continue;
					}
					if ( !isEqual( oldValue, newValue ) ) {
						values[ keypath ] = newValue;
					}
				}
			}
			// Handle groups of `<input type='checkbox' name='{{foo}}' ...>`
			if ( checkboxGroups.length ) {
				checkboxGroups.forEach( function( keypath ) {
					var binding, oldValue, newValue;
					binding = checkboxGroups[ keypath ];
					// one to represent the entire group
					oldValue = binding.attribute.value;
					newValue = binding.getValue();
					if ( !arrayContentsMatch( oldValue, newValue ) ) {
						values[ keypath ] = newValue;
					}
				} );
			}
			if ( !cascade ) {
				return;
			}
			// cascade
			childDeps = ractive.viewmodel.depsMap[ 'default' ][ keypath ];
			if ( childDeps ) {
				i = childDeps.length;
				while ( i-- ) {
					consolidateChangedValues( ractive, childDeps[ i ], values, cascade );
				}
			}
		}
		return __export;
	}( arrayContentsMatch, isEqual );

	/* Ractive/prototype.js */
	var prototype = function( add, animate, detach, find, findAll, findAllComponents, findComponent, fire, get, insert, merge, observe, off, on, pop, push, render, reset, resetTemplate, reverse, set, shift, sort, splice, subtract, teardown, toggle, toHTML, unrender, unshift, update, updateModel ) {

		return {
			add: add,
			animate: animate,
			detach: detach,
			find: find,
			findAll: findAll,
			findAllComponents: findAllComponents,
			findComponent: findComponent,
			fire: fire,
			get: get,
			insert: insert,
			merge: merge,
			observe: observe,
			off: off,
			on: on,
			pop: pop,
			push: push,
			render: render,
			reset: reset,
			resetTemplate: resetTemplate,
			reverse: reverse,
			set: set,
			shift: shift,
			sort: sort,
			splice: splice,
			subtract: subtract,
			teardown: teardown,
			toggle: toggle,
			toHTML: toHTML,
			unrender: unrender,
			unshift: unshift,
			update: update,
			updateModel: updateModel
		};
	}( Ractive$add, Ractive$animate, Ractive$detach, Ractive$find, Ractive$findAll, Ractive$findAllComponents, Ractive$findComponent, Ractive$fire, Ractive$get, Ractive$insert, Ractive$merge, Ractive$observe, Ractive$off, Ractive$on, Ractive$pop, Ractive$push, Ractive$render, Ractive$reset, Ractive$resetTemplate, Ractive$reverse, Ractive$set, Ractive$shift, Ractive$sort, Ractive$splice, Ractive$subtract, Ractive$teardown, Ractive$toggle, Ractive$toHTML, Ractive$unrender, Ractive$unshift, Ractive$update, Ractive$updateModel );

	/* utils/getGuid.js */
	var getGuid = function() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace( /[xy]/g, function( c ) {
			var r, v;
			r = Math.random() * 16 | 0;
			v = c == 'x' ? r : r & 3 | 8;
			return v.toString( 16 );
		} );
	};

	/* utils/getNextNumber.js */
	var getNextNumber = function() {

		var i = 0;
		return function() {
			return 'r-' + i++;
		};
	}();

	/* viewmodel/prototype/get/arrayAdaptor/processWrapper.js */
	var viewmodel$get_arrayAdaptor_processWrapper = function( wrapper, array, methodName, newIndices ) {
		var root = wrapper.root,
			keypath = wrapper.keypath;
		// If this is a sort or reverse, we just do root.set()...
		// TODO use merge logic?
		if ( methodName === 'sort' || methodName === 'reverse' ) {
			root.viewmodel.set( keypath, array );
			return;
		}
		root.viewmodel.smartUpdate( keypath, array, newIndices );
	};

	/* viewmodel/prototype/get/arrayAdaptor/patch.js */
	var viewmodel$get_arrayAdaptor_patch = function( runloop, defineProperty, getNewIndices, processWrapper ) {

		var patchedArrayProto = [],
			mutatorMethods = [
				'pop',
				'push',
				'reverse',
				'shift',
				'sort',
				'splice',
				'unshift'
			],
			testObj, patchArrayMethods, unpatchArrayMethods;
		mutatorMethods.forEach( function( methodName ) {
			var method = function() {
				var SLICE$0 = Array.prototype.slice;
				var args = SLICE$0.call( arguments, 0 );
				var newIndices, result, wrapper, i;
				newIndices = getNewIndices( this, methodName, args );
				// apply the underlying method
				result = Array.prototype[ methodName ].apply( this, arguments );
				// trigger changes
				runloop.start();
				this._ractive.setting = true;
				i = this._ractive.wrappers.length;
				while ( i-- ) {
					wrapper = this._ractive.wrappers[ i ];
					runloop.addViewmodel( wrapper.root.viewmodel );
					processWrapper( wrapper, this, methodName, newIndices );
				}
				runloop.end();
				this._ractive.setting = false;
				return result;
			};
			defineProperty( patchedArrayProto, methodName, {
				value: method
			} );
		} );
		// can we use prototype chain injection?
		// http://perfectionkills.com/how-ecmascript-5-still-does-not-allow-to-subclass-an-array/#wrappers_prototype_chain_injection
		testObj = {};
		if ( testObj.__proto__ ) {
			// yes, we can
			patchArrayMethods = function( array ) {
				array.__proto__ = patchedArrayProto;
			};
			unpatchArrayMethods = function( array ) {
				array.__proto__ = Array.prototype;
			};
		} else {
			// no, we can't
			patchArrayMethods = function( array ) {
				var i, methodName;
				i = mutatorMethods.length;
				while ( i-- ) {
					methodName = mutatorMethods[ i ];
					defineProperty( array, methodName, {
						value: patchedArrayProto[ methodName ],
						configurable: true
					} );
				}
			};
			unpatchArrayMethods = function( array ) {
				var i;
				i = mutatorMethods.length;
				while ( i-- ) {
					delete array[ mutatorMethods[ i ] ];
				}
			};
		}
		patchArrayMethods.unpatch = unpatchArrayMethods;
		return patchArrayMethods;
	}( runloop, defineProperty, getNewIndices, viewmodel$get_arrayAdaptor_processWrapper );

	/* viewmodel/prototype/get/arrayAdaptor.js */
	var viewmodel$get_arrayAdaptor = function( defineProperty, isArray, patch ) {

		var arrayAdaptor,
			// helpers
			ArrayWrapper, errorMessage;
		arrayAdaptor = {
			filter: function( object ) {
				// wrap the array if a) b) it's an array, and b) either it hasn't been wrapped already,
				// or the array didn't trigger the get() itself
				return isArray( object ) && ( !object._ractive || !object._ractive.setting );
			},
			wrap: function( ractive, array, keypath ) {
				return new ArrayWrapper( ractive, array, keypath );
			}
		};
		ArrayWrapper = function( ractive, array, keypath ) {
			this.root = ractive;
			this.value = array;
			this.keypath = keypath;
			// if this array hasn't already been ractified, ractify it
			if ( !array._ractive ) {
				// define a non-enumerable _ractive property to store the wrappers
				defineProperty( array, '_ractive', {
					value: {
						wrappers: [],
						instances: [],
						setting: false
					},
					configurable: true
				} );
				patch( array );
			}
			// store the ractive instance, so we can handle transitions later
			if ( !array._ractive.instances[ ractive._guid ] ) {
				array._ractive.instances[ ractive._guid ] = 0;
				array._ractive.instances.push( ractive );
			}
			array._ractive.instances[ ractive._guid ] += 1;
			array._ractive.wrappers.push( this );
		};
		ArrayWrapper.prototype = {
			get: function() {
				return this.value;
			},
			teardown: function() {
				var array, storage, wrappers, instances, index;
				array = this.value;
				storage = array._ractive;
				wrappers = storage.wrappers;
				instances = storage.instances;
				// if teardown() was invoked because we're clearing the cache as a result of
				// a change that the array itself triggered, we can save ourselves the teardown
				// and immediate setup
				if ( storage.setting ) {
					return false;
				}
				index = wrappers.indexOf( this );
				if ( index === -1 ) {
					throw new Error( errorMessage );
				}
				wrappers.splice( index, 1 );
				// if nothing else depends on this array, we can revert it to its
				// natural state
				if ( !wrappers.length ) {
					delete array._ractive;
					patch.unpatch( this.value );
				} else {
					// remove ractive instance if possible
					instances[ this.root._guid ] -= 1;
					if ( !instances[ this.root._guid ] ) {
						index = instances.indexOf( this.root );
						if ( index === -1 ) {
							throw new Error( errorMessage );
						}
						instances.splice( index, 1 );
					}
				}
			}
		};
		errorMessage = 'Something went wrong in a rather interesting way';
		return arrayAdaptor;
	}( defineProperty, isArray, viewmodel$get_arrayAdaptor_patch );

	/* viewmodel/prototype/get/magicArrayAdaptor.js */
	var viewmodel$get_magicArrayAdaptor = function( magicAdaptor, arrayAdaptor ) {

		var magicArrayAdaptor, MagicArrayWrapper;
		if ( magicAdaptor ) {
			magicArrayAdaptor = {
				filter: function( object, keypath, ractive ) {
					return magicAdaptor.filter( object, keypath, ractive ) && arrayAdaptor.filter( object );
				},
				wrap: function( ractive, array, keypath ) {
					return new MagicArrayWrapper( ractive, array, keypath );
				}
			};
			MagicArrayWrapper = function( ractive, array, keypath ) {
				this.value = array;
				this.magic = true;
				this.magicWrapper = magicAdaptor.wrap( ractive, array, keypath );
				this.arrayWrapper = arrayAdaptor.wrap( ractive, array, keypath );
			};
			MagicArrayWrapper.prototype = {
				get: function() {
					return this.value;
				},
				teardown: function() {
					this.arrayWrapper.teardown();
					this.magicWrapper.teardown();
				},
				reset: function( value ) {
					return this.magicWrapper.reset( value );
				}
			};
		}
		return magicArrayAdaptor;
	}( viewmodel$get_magicAdaptor, viewmodel$get_arrayAdaptor );

	/* viewmodel/prototype/adapt.js */
	var viewmodel$adapt = function( config, arrayAdaptor, log, magicAdaptor, magicArrayAdaptor ) {

		var __export;
		var prefixers = {};
		__export = function Viewmodel$adapt( keypath, value ) {
			var ractive = this.ractive,
				len, i, adaptor, wrapped;
			// Do we have an adaptor for this value?
			len = ractive.adapt.length;
			for ( i = 0; i < len; i += 1 ) {
				adaptor = ractive.adapt[ i ];
				// Adaptors can be specified as e.g. [ 'Backbone.Model', 'Backbone.Collection' ] -
				// we need to get the actual adaptor if that's the case
				if ( typeof adaptor === 'string' ) {
					var found = config.registries.adaptors.find( ractive, adaptor );
					if ( !found ) {
						// will throw. "return" for safety, if we downgrade :)
						return log.critical( {
							debug: ractive.debug,
							message: 'missingPlugin',
							args: {
								plugin: 'adaptor',
								name: adaptor
							}
						} );
					}
					adaptor = ractive.adapt[ i ] = found;
				}
				if ( adaptor.filter( value, keypath, ractive ) ) {
					wrapped = this.wrapped[ keypath ] = adaptor.wrap( ractive, value, keypath, getPrefixer( keypath ) );
					wrapped.value = value;
					return value;
				}
			}
			if ( ractive.magic ) {
				if ( magicArrayAdaptor.filter( value, keypath, ractive ) ) {
					this.wrapped[ keypath ] = magicArrayAdaptor.wrap( ractive, value, keypath );
				} else if ( magicAdaptor.filter( value, keypath, ractive ) ) {
					this.wrapped[ keypath ] = magicAdaptor.wrap( ractive, value, keypath );
				}
			} else if ( ractive.modifyArrays && arrayAdaptor.filter( value, keypath, ractive ) ) {
				this.wrapped[ keypath ] = arrayAdaptor.wrap( ractive, value, keypath );
			}
			return value;
		};

		function prefixKeypath( obj, prefix ) {
			var prefixed = {},
				key;
			if ( !prefix ) {
				return obj;
			}
			prefix += '.';
			for ( key in obj ) {
				if ( obj.hasOwnProperty( key ) ) {
					prefixed[ prefix + key ] = obj[ key ];
				}
			}
			return prefixed;
		}

		function getPrefixer( rootKeypath ) {
			var rootDot;
			if ( !prefixers[ rootKeypath ] ) {
				rootDot = rootKeypath ? rootKeypath + '.' : '';
				prefixers[ rootKeypath ] = function( relativeKeypath, value ) {
					var obj;
					if ( typeof relativeKeypath === 'string' ) {
						obj = {};
						obj[ rootDot + relativeKeypath ] = value;
						return obj;
					}
					if ( typeof relativeKeypath === 'object' ) {
						// 'relativeKeypath' is in fact a hash, not a keypath
						return rootDot ? prefixKeypath( relativeKeypath, rootKeypath ) : relativeKeypath;
					}
				};
			}
			return prefixers[ rootKeypath ];
		}
		return __export;
	}( config, viewmodel$get_arrayAdaptor, log, viewmodel$get_magicAdaptor, viewmodel$get_magicArrayAdaptor );

	/* viewmodel/helpers/getUpstreamChanges.js */
	var getUpstreamChanges = function getUpstreamChanges( changes ) {
		var upstreamChanges = [ '' ],
			i, keypath, keys, upstreamKeypath;
		i = changes.length;
		while ( i-- ) {
			keypath = changes[ i ];
			keys = keypath.split( '.' );
			while ( keys.length > 1 ) {
				keys.pop();
				upstreamKeypath = keys.join( '.' );
				if ( upstreamChanges.indexOf( upstreamKeypath ) === -1 ) {
					upstreamChanges.push( upstreamKeypath );
				}
			}
		}
		return upstreamChanges;
	};

	/* viewmodel/prototype/applyChanges/getPotentialWildcardMatches.js */
	var viewmodel$applyChanges_getPotentialWildcardMatches = function() {

		var __export;
		var starMaps = {};
		// This function takes a keypath such as 'foo.bar.baz', and returns
		// all the variants of that keypath that include a wildcard in place
		// of a key, such as 'foo.bar.*', 'foo.*.baz', 'foo.*.*' and so on.
		// These are then checked against the dependants map (ractive.viewmodel.depsMap)
		// to see if any pattern observers are downstream of one or more of
		// these wildcard keypaths (e.g. 'foo.bar.*.status')
		__export = function getPotentialWildcardMatches( keypath ) {
			var keys, starMap, mapper, result;
			keys = keypath.split( '.' );
			starMap = getStarMap( keys.length );
			mapper = function( star, i ) {
				return star ? '*' : keys[ i ];
			};
			result = starMap.map( function( mask ) {
				return mask.map( mapper ).join( '.' );
			} );
			return result;
		};
		// This function returns all the possible true/false combinations for
		// a given number - e.g. for two, the possible combinations are
		// [ true, true ], [ true, false ], [ false, true ], [ false, false ].
		// It does so by getting all the binary values between 0 and e.g. 11
		function getStarMap( length ) {
			var ones = '',
				max, binary, starMap, mapper, i;
			if ( !starMaps[ length ] ) {
				starMap = [];
				while ( ones.length < length ) {
					ones += 1;
				}
				max = parseInt( ones, 2 );
				mapper = function( digit ) {
					return digit === '1';
				};
				for ( i = 0; i <= max; i += 1 ) {
					binary = i.toString( 2 );
					while ( binary.length < length ) {
						binary = '0' + binary;
					}
					starMap[ i ] = Array.prototype.map.call( binary, mapper );
				}
				starMaps[ length ] = starMap;
			}
			return starMaps[ length ];
		}
		return __export;
	}();

	/* viewmodel/prototype/applyChanges/notifyPatternObservers.js */
	var viewmodel$applyChanges_notifyPatternObservers = function( getPotentialWildcardMatches ) {

		var __export;
		var lastKey = /[^\.]+$/;
		__export = notifyPatternObservers;

		function notifyPatternObservers( viewmodel, keypath, onlyDirect ) {
			var potentialWildcardMatches;
			updateMatchingPatternObservers( viewmodel, keypath );
			if ( onlyDirect ) {
				return;
			}
			potentialWildcardMatches = getPotentialWildcardMatches( keypath );
			potentialWildcardMatches.forEach( function( upstreamPattern ) {
				cascade( viewmodel, upstreamPattern, keypath );
			} );
		}

		function cascade( viewmodel, upstreamPattern, keypath ) {
			var group, map, actualChildKeypath;
			group = viewmodel.depsMap.patternObservers;
			map = group[ upstreamPattern ];
			if ( map ) {
				map.forEach( function( childKeypath ) {
					var key = lastKey.exec( childKeypath )[ 0 ];
					// 'baz'
					actualChildKeypath = keypath ? keypath + '.' + key : key;
					// 'foo.bar.baz'
					updateMatchingPatternObservers( viewmodel, actualChildKeypath );
					cascade( viewmodel, childKeypath, actualChildKeypath );
				} );
			}
		}

		function updateMatchingPatternObservers( viewmodel, keypath ) {
			viewmodel.patternObservers.forEach( function( observer ) {
				if ( observer.regex.test( keypath ) ) {
					observer.update( keypath );
				}
			} );
		}
		return __export;
	}( viewmodel$applyChanges_getPotentialWildcardMatches );

	/* viewmodel/prototype/applyChanges.js */
	var viewmodel$applyChanges = function( getUpstreamChanges, notifyPatternObservers ) {

		var __export;
		var dependantGroups = [
			'observers',
			'default'
		];
		__export = function Viewmodel$applyChanges() {
			var this$0 = this;
			var self = this,
				changes, upstreamChanges, hash = {};
			changes = this.changes;
			if ( !changes.length ) {
				// TODO we end up here on initial render. Perhaps we shouldn't?
				return;
			}

			function cascade( keypath ) {
				var map, dependants, keys;
				if ( self.noCascade.hasOwnProperty( keypath ) ) {
					return;
				}
				if ( dependants = self.deps.computed[ keypath ] ) {
					dependants.forEach( invalidate );
					keys = dependants.map( getKey );
					keys.forEach( mark );
					keys.forEach( cascade );
				}
				if ( map = self.depsMap.computed[ keypath ] ) {
					map.forEach( cascade );
				}
			}

			function mark( keypath ) {
				self.mark( keypath );
			}
			changes.forEach( cascade );
			upstreamChanges = getUpstreamChanges( changes );
			upstreamChanges.forEach( function( keypath ) {
				var dependants, keys;
				if ( dependants = self.deps.computed[ keypath ] ) {
					dependants.forEach( invalidate );
					keys = dependants.map( getKey );
					keys.forEach( mark );
				}
			} );
			this.changes = [];
			// Pattern observers are a weird special case
			if ( this.patternObservers.length ) {
				upstreamChanges.forEach( function( keypath ) {
					return notifyPatternObservers( this$0, keypath, true );
				} );
				changes.forEach( function( keypath ) {
					return notifyPatternObservers( this$0, keypath );
				} );
			}
			dependantGroups.forEach( function( group ) {
				if ( !this$0.deps[ group ] ) {
					return;
				}
				upstreamChanges.forEach( function( keypath ) {
					return notifyUpstreamDependants( this$0, keypath, group );
				} );
				notifyAllDependants( this$0, changes, group );
			} );
			// Return a hash of keypaths to updated values
			changes.forEach( function( keypath ) {
				hash[ keypath ] = this$0.get( keypath );
			} );
			this.implicitChanges = {};
			this.noCascade = {};
			return hash;
		};

		function invalidate( computation ) {
			computation.invalidate();
		}

		function getKey( computation ) {
			return computation.key;
		}

		function notifyUpstreamDependants( viewmodel, keypath, groupName ) {
			var dependants, value;
			if ( dependants = findDependants( viewmodel, keypath, groupName ) ) {
				value = viewmodel.get( keypath );
				dependants.forEach( function( d ) {
					return d.setValue( value );
				} );
			}
		}

		function notifyAllDependants( viewmodel, keypaths, groupName ) {
			var queue = [];
			addKeypaths( keypaths );
			queue.forEach( dispatch );

			function addKeypaths( keypaths ) {
				keypaths.forEach( addKeypath );
				keypaths.forEach( cascade );
			}

			function addKeypath( keypath ) {
				var deps = findDependants( viewmodel, keypath, groupName );
				if ( deps ) {
					queue.push( {
						keypath: keypath,
						deps: deps
					} );
				}
			}

			function cascade( keypath ) {
				var childDeps;
				if ( childDeps = viewmodel.depsMap[ groupName ][ keypath ] ) {
					addKeypaths( childDeps );
				}
			}

			function dispatch( set ) {
				var value = viewmodel.get( set.keypath );
				set.deps.forEach( function( d ) {
					return d.setValue( value );
				} );
			}
		}

		function findDependants( viewmodel, keypath, groupName ) {
			var group = viewmodel.deps[ groupName ];
			return group ? group[ keypath ] : null;
		}
		return __export;
	}( getUpstreamChanges, viewmodel$applyChanges_notifyPatternObservers );

	/* viewmodel/prototype/capture.js */
	var viewmodel$capture = function Viewmodel$capture() {
		this.captureGroups.push( [] );
	};

	/* viewmodel/prototype/clearCache.js */
	var viewmodel$clearCache = function Viewmodel$clearCache( keypath, dontTeardownWrapper ) {
		var cacheMap, wrapper;
		if ( !dontTeardownWrapper ) {
			// Is there a wrapped property at this keypath?
			if ( wrapper = this.wrapped[ keypath ] ) {
				// Did we unwrap it?
				if ( wrapper.teardown() !== false ) {
					// Is this right?
					// What's the meaning of returning false from teardown?
					// Could there be a GC ramification if this is a "real" ractive.teardown()?
					this.wrapped[ keypath ] = null;
				}
			}
		}
		this.cache[ keypath ] = undefined;
		if ( cacheMap = this.cacheMap[ keypath ] ) {
			while ( cacheMap.length ) {
				this.clearCache( cacheMap.pop() );
			}
		}
	};

	/* viewmodel/Computation/getComputationSignature.js */
	var getComputationSignature = function() {

		var __export;
		var pattern = /\$\{([^\}]+)\}/g;
		__export = function( signature ) {
			if ( typeof signature === 'function' ) {
				return {
					get: signature
				};
			}
			if ( typeof signature === 'string' ) {
				return {
					get: createFunctionFromString( signature )
				};
			}
			if ( typeof signature === 'object' && typeof signature.get === 'string' ) {
				signature = {
					get: createFunctionFromString( signature.get ),
					set: signature.set
				};
			}
			return signature;
		};

		function createFunctionFromString( signature ) {
			var functionBody = 'var __ractive=this;return(' + signature.replace( pattern, function( match, keypath ) {
				return '__ractive.get("' + keypath + '")';
			} ) + ')';
			return new Function( functionBody );
		}
		return __export;
	}();

	/* viewmodel/Computation/Computation.js */
	var Computation = function( log, isEqual ) {

		var Computation = function( ractive, key, signature ) {
			var this$0 = this;
			this.ractive = ractive;
			this.viewmodel = ractive.viewmodel;
			this.key = key;
			this.getter = signature.get;
			this.setter = signature.set;
			this.hardDeps = signature.deps || [];
			this.softDeps = [];
			this.depValues = {};
			if ( this.hardDeps ) {
				this.hardDeps.forEach( function( d ) {
					return ractive.viewmodel.register( d, this$0, 'computed' );
				} );
			}
			this._dirty = this._firstRun = true;
		};
		Computation.prototype = {
			constructor: Computation,
			init: function() {
				var initial;
				this.bypass = true;
				initial = this.ractive.viewmodel.get( this.key );
				this.ractive.viewmodel.clearCache( this.key );
				this.bypass = false;
				if ( this.setter && initial !== undefined ) {
					this.set( initial );
				}
			},
			invalidate: function() {
				this._dirty = true;
			},
			get: function() {
				var this$0 = this;
				var ractive, newDeps, args, dependenciesChanged, dependencyValuesChanged = false;
				if ( this.getting ) {
					// prevent double-computation (e.g. caused by array mutation inside computation)
					return;
				}
				this.getting = true;
				if ( this._dirty ) {
					ractive = this.ractive;
					// determine whether the inputs have changed, in case this depends on
					// other computed values
					if ( this._firstRun || !this.hardDeps.length && !this.softDeps.length ) {
						dependencyValuesChanged = true;
					} else {
						[
							this.hardDeps,
							this.softDeps
						].forEach( function( deps ) {
							var keypath, value, i;
							if ( dependencyValuesChanged ) {
								return;
							}
							i = deps.length;
							while ( i-- ) {
								keypath = deps[ i ];
								value = ractive.viewmodel.get( keypath );
								if ( !isEqual( value, this$0.depValues[ keypath ] ) ) {
									this$0.depValues[ keypath ] = value;
									dependencyValuesChanged = true;
									return;
								}
							}
						} );
					}
					if ( dependencyValuesChanged ) {
						ractive.viewmodel.capture();
						try {
							if ( this.hardDeps.length ) {
								args = this.hardDeps.map( function( keypath ) {
									return this$0.viewmodel.get( keypath );
								} );
								this.value = this.getter.apply( ractive, args );
							} else {
								this.value = this.getter.call( ractive );
							}
						} catch ( err ) {
							log.warn( {
								debug: ractive.debug,
								message: 'failedComputation',
								args: {
									key: this.key,
									err: err.message || err
								}
							} );
							this.value = void 0;
						}
						newDeps = ractive.viewmodel.release();
						dependenciesChanged = this.updateDependencies( newDeps );
						if ( dependenciesChanged ) {
							[
								this.hardDeps,
								this.softDeps
							].forEach( function( deps ) {
								deps.forEach( function( keypath ) {
									this$0.depValues[ keypath ] = ractive.viewmodel.get( keypath );
								} );
							} );
						}
					}
					this._dirty = false;
				}
				this.getting = this._firstRun = false;
				return this.value;
			},
			set: function( value ) {
				if ( this.setting ) {
					this.value = value;
					return;
				}
				if ( !this.setter ) {
					throw new Error( 'Computed properties without setters are read-only. (This may change in a future version of Ractive!)' );
				}
				this.setter.call( this.ractive, value );
			},
			updateDependencies: function( newDeps ) {
				var i, oldDeps, keypath, dependenciesChanged;
				oldDeps = this.softDeps;
				// remove dependencies that are no longer used
				i = oldDeps.length;
				while ( i-- ) {
					keypath = oldDeps[ i ];
					if ( newDeps.indexOf( keypath ) === -1 ) {
						dependenciesChanged = true;
						this.viewmodel.unregister( keypath, this, 'computed' );
					}
				}
				// create references for any new dependencies
				i = newDeps.length;
				while ( i-- ) {
					keypath = newDeps[ i ];
					if ( oldDeps.indexOf( keypath ) === -1 && ( !this.hardDeps || this.hardDeps.indexOf( keypath ) === -1 ) ) {
						dependenciesChanged = true;
						this.viewmodel.register( keypath, this, 'computed' );
					}
				}
				if ( dependenciesChanged ) {
					this.softDeps = newDeps.slice();
				}
				return dependenciesChanged;
			}
		};
		return Computation;
	}( log, isEqual );

	/* viewmodel/prototype/compute.js */
	var viewmodel$compute = function( getComputationSignature, Computation ) {

		return function Viewmodel$compute( key, signature ) {
			signature = getComputationSignature( signature );
			return this.computations[ key ] = new Computation( this.ractive, key, signature );
		};
	}( getComputationSignature, Computation );

	/* viewmodel/prototype/get/FAILED_LOOKUP.js */
	var viewmodel$get_FAILED_LOOKUP = {
		FAILED_LOOKUP: true
	};

	/* viewmodel/prototype/get/UnresolvedImplicitDependency.js */
	var viewmodel$get_UnresolvedImplicitDependency = function( removeFromArray, runloop ) {

		var empty = {};
		var UnresolvedImplicitDependency = function( viewmodel, keypath ) {
			this.viewmodel = viewmodel;
			this.root = viewmodel.ractive;
			// TODO eliminate this
			this.ref = keypath;
			this.parentFragment = empty;
			viewmodel.unresolvedImplicitDependencies[ keypath ] = true;
			viewmodel.unresolvedImplicitDependencies.push( this );
			runloop.addUnresolved( this );
		};
		UnresolvedImplicitDependency.prototype = {
			resolve: function() {
				this.viewmodel.mark( this.ref );
				this.viewmodel.unresolvedImplicitDependencies[ this.ref ] = false;
				removeFromArray( this.viewmodel.unresolvedImplicitDependencies, this );
			},
			teardown: function() {
				runloop.removeUnresolved( this );
			}
		};
		return UnresolvedImplicitDependency;
	}( removeFromArray, runloop );

	/* viewmodel/prototype/get.js */
	var viewmodel$get = function( FAILED_LOOKUP, UnresolvedImplicitDependency ) {

		var __export;
		var empty = {};
		__export = function Viewmodel$get( keypath ) {
			var options = arguments[ 1 ];
			if ( options === void 0 )
				options = empty;
			var ractive = this.ractive,
				cache = this.cache,
				value, computation, wrapped, captureGroup;
			if ( cache[ keypath ] === undefined ) {
				// Is this a computed property?
				if ( ( computation = this.computations[ keypath ] ) && !computation.bypass ) {
					value = computation.get();
				} else if ( wrapped = this.wrapped[ keypath ] ) {
					value = wrapped.value;
				} else if ( !keypath ) {
					this.adapt( '', ractive.data );
					value = ractive.data;
				} else {
					value = retrieve( this, keypath );
				}
				cache[ keypath ] = value;
			} else {
				value = cache[ keypath ];
			}
			if ( options.evaluateWrapped && ( wrapped = this.wrapped[ keypath ] ) ) {
				value = wrapped.get();
			}
			// capture the keypath, if we're inside a computation
			if ( options.capture && ( captureGroup = this.captureGroups[ this.captureGroups.length - 1 ] ) ) {
				if ( !~captureGroup.indexOf( keypath ) ) {
					captureGroup.push( keypath );
					// if we couldn't resolve the keypath, we need to make it as a failed
					// lookup, so that the computation updates correctly once we CAN
					// resolve the keypath
					if ( value === FAILED_LOOKUP && this.unresolvedImplicitDependencies[ keypath ] !== true ) {
						new UnresolvedImplicitDependency( this, keypath );
					}
				}
			}
			return value === FAILED_LOOKUP ? void 0 : value;
		};

		function retrieve( viewmodel, keypath ) {
			var keys, key, parentKeypath, parentValue, cacheMap, value, wrapped;
			keys = keypath.split( '.' );
			key = keys.pop();
			parentKeypath = keys.join( '.' );
			parentValue = viewmodel.get( parentKeypath );
			if ( wrapped = viewmodel.wrapped[ parentKeypath ] ) {
				parentValue = wrapped.get();
			}
			if ( parentValue === null || parentValue === undefined ) {
				return;
			}
			// update cache map
			if ( !( cacheMap = viewmodel.cacheMap[ parentKeypath ] ) ) {
				viewmodel.cacheMap[ parentKeypath ] = [ keypath ];
			} else {
				if ( cacheMap.indexOf( keypath ) === -1 ) {
					cacheMap.push( keypath );
				}
			}
			// If this property doesn't exist, we return a sentinel value
			// so that we know to query parent scope (if such there be)
			if ( typeof parentValue === 'object' && !( key in parentValue ) ) {
				return viewmodel.cache[ keypath ] = FAILED_LOOKUP;
			}
			value = parentValue[ key ];
			// Do we have an adaptor for this value?
			viewmodel.adapt( keypath, value, false );
			// Update cache
			viewmodel.cache[ keypath ] = value;
			return value;
		}
		return __export;
	}( viewmodel$get_FAILED_LOOKUP, viewmodel$get_UnresolvedImplicitDependency );

	/* viewmodel/prototype/init.js */
	var viewmodel$init = function() {

		var __export;
		__export = function Viewmodel$init() {
			var key, computation, computations = [];
			for ( key in this.ractive.computed ) {
				computation = this.compute( key, this.ractive.computed[ key ] );
				computations.push( computation );
			}
			computations.forEach( init );
		};

		function init( computation ) {
			computation.init();
		}
		return __export;
	}();

	/* viewmodel/prototype/mark.js */
	var viewmodel$mark = function Viewmodel$mark( keypath, options ) {
		var computation;
		// implicit changes (i.e. `foo.length` on `ractive.push('foo',42)`)
		// should not be picked up by pattern observers
		if ( options ) {
			if ( options.implicit ) {
				this.implicitChanges[ keypath ] = true;
			}
			if ( options.noCascade ) {
				this.noCascade[ keypath ] = true;
			}
		}
		if ( computation = this.computations[ keypath ] ) {
			computation.invalidate();
		}
		if ( this.changes.indexOf( keypath ) === -1 ) {
			this.changes.push( keypath );
			this.clearCache( keypath );
		}
	};

	/* viewmodel/prototype/merge/mapOldToNewIndex.js */
	var viewmodel$merge_mapOldToNewIndex = function( oldArray, newArray ) {
		var usedIndices, firstUnusedIndex, newIndices, changed;
		usedIndices = {};
		firstUnusedIndex = 0;
		newIndices = oldArray.map( function( item, i ) {
			var index, start, len;
			start = firstUnusedIndex;
			len = newArray.length;
			do {
				index = newArray.indexOf( item, start );
				if ( index === -1 ) {
					changed = true;
					return -1;
				}
				start = index + 1;
			} while ( usedIndices[ index ] && start < len );
			// keep track of the first unused index, so we don't search
			// the whole of newArray for each item in oldArray unnecessarily
			if ( index === firstUnusedIndex ) {
				firstUnusedIndex += 1;
			}
			if ( index !== i ) {
				changed = true;
			}
			usedIndices[ index ] = true;
			return index;
		} );
		return newIndices;
	};

	/* viewmodel/prototype/merge.js */
	var viewmodel$merge = function( warn, mapOldToNewIndex ) {

		var __export;
		var comparators = {};
		__export = function Viewmodel$merge( keypath, currentArray, array, options ) {
			var oldArray, newArray, comparator, newIndices;
			this.mark( keypath );
			if ( options && options.compare ) {
				comparator = getComparatorFunction( options.compare );
				try {
					oldArray = currentArray.map( comparator );
					newArray = array.map( comparator );
				} catch ( err ) {
					// fallback to an identity check - worst case scenario we have
					// to do more DOM manipulation than we thought...
					// ...unless we're in debug mode of course
					if ( this.debug ) {
						throw err;
					} else {
						warn( 'Merge operation: comparison failed. Falling back to identity checking' );
					}
					oldArray = currentArray;
					newArray = array;
				}
			} else {
				oldArray = currentArray;
				newArray = array;
			}
			// find new indices for members of oldArray
			newIndices = mapOldToNewIndex( oldArray, newArray );
			this.smartUpdate( keypath, array, newIndices, currentArray.length !== array.length );
		};

		function stringify( item ) {
			return JSON.stringify( item );
		}

		function getComparatorFunction( comparator ) {
			// If `compare` is `true`, we use JSON.stringify to compare
			// objects that are the same shape, but non-identical - i.e.
			// { foo: 'bar' } !== { foo: 'bar' }
			if ( comparator === true ) {
				return stringify;
			}
			if ( typeof comparator === 'string' ) {
				if ( !comparators[ comparator ] ) {
					comparators[ comparator ] = function( item ) {
						return item[ comparator ];
					};
				}
				return comparators[ comparator ];
			}
			if ( typeof comparator === 'function' ) {
				return comparator;
			}
			throw new Error( 'The `compare` option must be a function, or a string representing an identifying field (or `true` to use JSON.stringify)' );
		}
		return __export;
	}( warn, viewmodel$merge_mapOldToNewIndex );

	/* viewmodel/prototype/register.js */
	var viewmodel$register = function() {

		var __export;
		__export = function Viewmodel$register( keypath, dependant ) {
			var group = arguments[ 2 ];
			if ( group === void 0 )
				group = 'default';
			var depsByKeypath, deps;
			if ( dependant.isStatic ) {
				return;
			}
			depsByKeypath = this.deps[ group ] || ( this.deps[ group ] = {} );
			deps = depsByKeypath[ keypath ] || ( depsByKeypath[ keypath ] = [] );
			deps.push( dependant );
			if ( !keypath ) {
				return;
			}
			updateDependantsMap( this, keypath, group );
		};

		function updateDependantsMap( viewmodel, keypath, group ) {
			var keys, parentKeypath, map, parent;
			// update dependants map
			keys = keypath.split( '.' );
			while ( keys.length ) {
				keys.pop();
				parentKeypath = keys.join( '.' );
				map = viewmodel.depsMap[ group ] || ( viewmodel.depsMap[ group ] = {} );
				parent = map[ parentKeypath ] || ( map[ parentKeypath ] = [] );
				if ( parent[ keypath ] === undefined ) {
					parent[ keypath ] = 0;
					parent.push( keypath );
				}
				parent[ keypath ] += 1;
				keypath = parentKeypath;
			}
		}
		return __export;
	}();

	/* viewmodel/prototype/release.js */
	var viewmodel$release = function Viewmodel$release() {
		return this.captureGroups.pop();
	};

	/* viewmodel/prototype/set.js */
	var viewmodel$set = function( isEqual, createBranch ) {

		var __export;
		__export = function Viewmodel$set( keypath, value, silent ) {
			var computation, wrapper, dontTeardownWrapper;
			computation = this.computations[ keypath ];
			if ( computation ) {
				if ( computation.setting ) {
					// let the other computation set() handle things...
					return;
				}
				computation.set( value );
				value = computation.get();
			}
			if ( isEqual( this.cache[ keypath ], value ) ) {
				return;
			}
			wrapper = this.wrapped[ keypath ];
			// If we have a wrapper with a `reset()` method, we try and use it. If the
			// `reset()` method returns false, the wrapper should be torn down, and
			// (most likely) a new one should be created later
			if ( wrapper && wrapper.reset ) {
				dontTeardownWrapper = wrapper.reset( value ) !== false;
				if ( dontTeardownWrapper ) {
					value = wrapper.get();
				}
			}
			if ( !computation && !dontTeardownWrapper ) {
				resolveSet( this, keypath, value );
			}
			if ( !silent ) {
				this.mark( keypath );
			} else {
				// We're setting a parent of the original target keypath (i.e.
				// creating a fresh branch) - we need to clear the cache, but
				// not mark it as a change
				this.clearCache( keypath );
			}
		};

		function resolveSet( viewmodel, keypath, value ) {
			var keys, lastKey, parentKeypath, wrapper, parentValue, wrapperSet, valueSet;
			wrapperSet = function() {
				if ( wrapper.set ) {
					wrapper.set( lastKey, value );
				} else {
					parentValue = wrapper.get();
					valueSet();
				}
			};
			valueSet = function() {
				if ( !parentValue ) {
					parentValue = createBranch( lastKey );
					viewmodel.set( parentKeypath, parentValue, true );
				}
				parentValue[ lastKey ] = value;
			};
			keys = keypath.split( '.' );
			lastKey = keys.pop();
			parentKeypath = keys.join( '.' );
			wrapper = viewmodel.wrapped[ parentKeypath ];
			if ( wrapper ) {
				wrapperSet();
			} else {
				parentValue = viewmodel.get( parentKeypath );
				// may have been wrapped via the above .get()
				// call on viewmodel if this is first access via .set()!
				if ( wrapper = viewmodel.wrapped[ parentKeypath ] ) {
					wrapperSet();
				} else {
					valueSet();
				}
			}
		}
		return __export;
	}( isEqual, createBranch );

	/* viewmodel/prototype/smartUpdate.js */
	var viewmodel$smartUpdate = function() {

		var __export;
		var implicitOption = {
				implicit: true
			},
			noCascadeOption = {
				noCascade: true
			};
		__export = function Viewmodel$smartUpdate( keypath, array, newIndices ) {
			var this$0 = this;
			var dependants, oldLength;
			oldLength = newIndices.length;
			// Indices that are being removed should be marked as dirty
			newIndices.forEach( function( newIndex, oldIndex ) {
				if ( newIndex === -1 ) {
					this$0.mark( keypath + '.' + oldIndex, noCascadeOption );
				}
			} );
			// Update the model
			// TODO allow existing array to be updated in place, rather than replaced?
			this.set( keypath, array, true );
			if ( dependants = this.deps[ 'default' ][ keypath ] ) {
				dependants.filter( canShuffle ).forEach( function( d ) {
					return d.shuffle( newIndices, array );
				} );
			}
			if ( oldLength !== array.length ) {
				this.mark( keypath + '.length', implicitOption );
				for ( var i = oldLength; i < array.length; i += 1 ) {
					this.mark( keypath + '.' + i );
				}
				// don't allow removed indexes beyond end of new array to trigger recomputations
				for ( var i$0 = array.length; i$0 < oldLength; i$0 += 1 ) {
					this.mark( keypath + '.' + i$0, noCascadeOption );
				}
			}
		};

		function canShuffle( dependant ) {
			return typeof dependant.shuffle === 'function';
		}
		return __export;
	}();

	/* viewmodel/prototype/teardown.js */
	var viewmodel$teardown = function Viewmodel$teardown() {
		var this$0 = this;
		var unresolvedImplicitDependency;
		// Clear entire cache - this has the desired side-effect
		// of unwrapping adapted values (e.g. arrays)
		Object.keys( this.cache ).forEach( function( keypath ) {
			return this$0.clearCache( keypath );
		} );
		// Teardown any failed lookups - we don't need them to resolve any more
		while ( unresolvedImplicitDependency = this.unresolvedImplicitDependencies.pop() ) {
			unresolvedImplicitDependency.teardown();
		}
	};

	/* viewmodel/prototype/unregister.js */
	var viewmodel$unregister = function() {

		var __export;
		__export = function Viewmodel$unregister( keypath, dependant ) {
			var group = arguments[ 2 ];
			if ( group === void 0 )
				group = 'default';
			var deps, index;
			if ( dependant.isStatic ) {
				return;
			}
			deps = this.deps[ group ][ keypath ];
			index = deps.indexOf( dependant );
			if ( index === -1 ) {
				throw new Error( 'Attempted to remove a dependant that was no longer registered! This should not happen. If you are seeing this bug in development please raise an issue at https://github.com/RactiveJS/Ractive/issues - thanks' );
			}
			deps.splice( index, 1 );
			if ( !keypath ) {
				return;
			}
			updateDependantsMap( this, keypath, group );
		};

		function updateDependantsMap( viewmodel, keypath, group ) {
			var keys, parentKeypath, map, parent;
			// update dependants map
			keys = keypath.split( '.' );
			while ( keys.length ) {
				keys.pop();
				parentKeypath = keys.join( '.' );
				map = viewmodel.depsMap[ group ];
				parent = map[ parentKeypath ];
				parent[ keypath ] -= 1;
				if ( !parent[ keypath ] ) {
					// remove from parent deps map
					parent.splice( parent.indexOf( keypath ), 1 );
					parent[ keypath ] = undefined;
				}
				keypath = parentKeypath;
			}
		}
		return __export;
	}();

	/* viewmodel/adaptConfig.js */
	var adaptConfig = function() {

		// should this be combined with prototype/adapt.js?
		var configure = {
			lookup: function( target, adaptors ) {
				var i, adapt = target.adapt;
				if ( !adapt || !adapt.length ) {
					return adapt;
				}
				if ( adaptors && Object.keys( adaptors ).length && ( i = adapt.length ) ) {
					while ( i-- ) {
						var adaptor = adapt[ i ];
						if ( typeof adaptor === 'string' ) {
							adapt[ i ] = adaptors[ adaptor ] || adaptor;
						}
					}
				}
				return adapt;
			},
			combine: function( parent, adapt ) {
				// normalize 'Foo' to [ 'Foo' ]
				parent = arrayIfString( parent );
				adapt = arrayIfString( adapt );
				// no parent? return adapt
				if ( !parent || !parent.length ) {
					return adapt;
				}
				// no adapt? return 'copy' of parent
				if ( !adapt || !adapt.length ) {
					return parent.slice();
				}
				// add parent adaptors to options
				parent.forEach( function( a ) {
					// don't put in duplicates
					if ( adapt.indexOf( a ) === -1 ) {
						adapt.push( a );
					}
				} );
				return adapt;
			}
		};

		function arrayIfString( adapt ) {
			if ( typeof adapt === 'string' ) {
				adapt = [ adapt ];
			}
			return adapt;
		}
		return configure;
	}();

	/* viewmodel/Viewmodel.js */
	var Viewmodel = function( create, adapt, applyChanges, capture, clearCache, compute, get, init, mark, merge, register, release, set, smartUpdate, teardown, unregister, adaptConfig ) {

		var noMagic;
		try {
			Object.defineProperty( {}, 'test', {
				value: 0
			} );
		} catch ( err ) {
			noMagic = true;
		}
		var Viewmodel = function( ractive ) {
			this.ractive = ractive;
			// TODO eventually, we shouldn't need this reference
			Viewmodel.extend( ractive.constructor, ractive );
			this.cache = {};
			// we need to be able to use hasOwnProperty, so can't inherit from null
			this.cacheMap = create( null );
			this.deps = {
				computed: {},
				'default': {}
			};
			this.depsMap = {
				computed: {},
				'default': {}
			};
			this.patternObservers = [];
			this.wrapped = create( null );
			this.computations = create( null );
			this.captureGroups = [];
			this.unresolvedImplicitDependencies = [];
			this.changes = [];
			this.implicitChanges = {};
			this.noCascade = {};
		};
		Viewmodel.extend = function( Parent, instance ) {
			if ( instance.magic && noMagic ) {
				throw new Error( 'Getters and setters (magic mode) are not supported in this browser' );
			}
			instance.adapt = adaptConfig.combine( Parent.prototype.adapt, instance.adapt ) || [];
			instance.adapt = adaptConfig.lookup( instance, instance.adaptors );
		};
		Viewmodel.prototype = {
			adapt: adapt,
			applyChanges: applyChanges,
			capture: capture,
			clearCache: clearCache,
			compute: compute,
			get: get,
			init: init,
			mark: mark,
			merge: merge,
			register: register,
			release: release,
			set: set,
			smartUpdate: smartUpdate,
			teardown: teardown,
			unregister: unregister
		};
		return Viewmodel;
	}( create, viewmodel$adapt, viewmodel$applyChanges, viewmodel$capture, viewmodel$clearCache, viewmodel$compute, viewmodel$get, viewmodel$init, viewmodel$mark, viewmodel$merge, viewmodel$register, viewmodel$release, viewmodel$set, viewmodel$smartUpdate, viewmodel$teardown, viewmodel$unregister, adaptConfig );

	/* Ractive/initialise.js */
	var Ractive_initialise = function( config, create, Fragment, getElement, getNextNumber, Hook, HookQueue, Viewmodel ) {

		var __export;
		var constructHook = new Hook( 'construct' ),
			configHook = new Hook( 'config' ),
			initHook = new HookQueue( 'init' );
		__export = function initialiseRactiveInstance( ractive ) {
			var options = arguments[ 1 ];
			if ( options === void 0 )
				options = {};
			var el;
			initialiseProperties( ractive, options );
			// make this option do what would be expected if someone
			// did include it on a new Ractive() or new Component() call.
			// Silly to do so (put a hook on the very options being used),
			// but handle it correctly, consistent with the intent.
			constructHook.fire( config.getConstructTarget( ractive, options ), options );
			// init config from Parent and options
			config.init( ractive.constructor, ractive, options );
			configHook.fire( ractive );
			// Teardown any existing instances *before* trying to set up the new one -
			// avoids certain weird bugs
			if ( el = getElement( ractive.el ) ) {
				if ( !ractive.append ) {
					if ( el.__ractive_instances__ ) {
						try {
							el.__ractive_instances__.splice( 0, el.__ractive_instances__.length ).forEach( function( r ) {
								return r.teardown();
							} );
						} catch ( err ) {}
					}
					el.innerHTML = '';
				}
			}
			initHook.begin( ractive );
			// TEMPORARY. This is so we can implement Viewmodel gradually
			ractive.viewmodel = new Viewmodel( ractive );
			// hacky circular problem until we get this sorted out
			// if viewmodel immediately processes computed properties,
			// they may call ractive.get, which calls ractive.viewmodel,
			// which hasn't been set till line above finishes.
			ractive.viewmodel.init();
			// Render our *root fragment*
			if ( ractive.template ) {
				ractive.fragment = new Fragment( {
					template: ractive.template,
					root: ractive,
					owner: ractive
				} );
			}
			initHook.end( ractive );
			// render automatically ( if `el` is specified )
			if ( el ) {
				ractive.render( el, ractive.append );
			}
		};

		function initialiseProperties( ractive, options ) {
			// Generate a unique identifier, for places where you'd use a weak map if it
			// existed
			ractive._guid = getNextNumber();
			// events
			ractive._subs = create( null );
			// storage for item configuration from instantiation to reset,
			// like dynamic functions or original values
			ractive._config = {};
			// two-way bindings
			ractive._twowayBindings = create( null );
			// animations (so we can stop any in progress at teardown)
			ractive._animations = [];
			// nodes registry
			ractive.nodes = {};
			// live queries
			ractive._liveQueries = [];
			ractive._liveComponentQueries = [];
			// If this is a component, store a reference to the parent
			if ( options._parent && options._component ) {
				ractive._parent = options._parent;
				ractive.component = options._component;
				// And store a reference to the instance on the component
				options._component.instance = ractive;
			}
		}
		return __export;
	}( config, create, Fragment, getElement, getNextNumber, Ractive$shared_hooks_Hook, Ractive$shared_hooks_HookQueue, Viewmodel );

	/* extend/initChildInstance.js */
	var initChildInstance = function( initialise ) {

		return function initChildInstance( child, Child, options ) {
			if ( child.beforeInit ) {
				child.beforeInit( options );
			}
			initialise( child, options );
		};
	}( Ractive_initialise );

	/* extend/unwrapExtended.js */
	var unwrapExtended = function( wrap, config, circular ) {

		var __export;
		var Ractive;
		circular.push( function() {
			Ractive = circular.Ractive;
		} );
		__export = function unwrapExtended( Child ) {
			if ( !( Child.prototype instanceof Ractive ) ) {
				return Child;
			}
			var options = {};
			while ( Child ) {
				config.registries.forEach( function( r ) {
					addRegistry( r.useDefaults ? Child.prototype : Child, options, r.name );
				} );
				Object.keys( Child.prototype ).forEach( function( key ) {
					if ( key === 'computed' ) {
						return;
					}
					var value = Child.prototype[ key ];
					if ( !( key in options ) ) {
						options[ key ] = value._method ? value._method : value;
					} else if ( typeof options[ key ] === 'function' && typeof value === 'function' && options[ key ]._method ) {
						var result, needsSuper = value._method;
						if ( needsSuper ) {
							value = value._method;
						}
						// rewrap bound directly to parent fn
						result = wrap( options[ key ]._method, value );
						if ( needsSuper ) {
							result._method = result;
						}
						options[ key ] = result;
					}
				} );
				if ( Child._parent !== Ractive ) {
					Child = Child._parent;
				} else {
					Child = false;
				}
			}
			return options;
		};

		function addRegistry( target, options, name ) {
			var registry, keys = Object.keys( target[ name ] );
			if ( !keys.length ) {
				return;
			}
			if ( !( registry = options[ name ] ) ) {
				registry = options[ name ] = {};
			}
			keys.filter( function( key ) {
				return !( key in registry );
			} ).forEach( function( key ) {
				return registry[ key ] = target[ name ][ key ];
			} );
		}
		return __export;
	}( wrapMethod, config, circular );

	/* extend/_extend.js */
	var Ractive_extend = function( create, defineProperties, getGuid, config, initChildInstance, Viewmodel, unwrap ) {

		return function extend() {
			var options = arguments[ 0 ];
			if ( options === void 0 )
				options = {};
			var Parent = this,
				Child, proto, staticProperties;
			// if we're extending with another Ractive instance, inherit its
			// prototype methods and default options as well
			options = unwrap( options );
			// create Child constructor
			Child = function( options ) {
				initChildInstance( this, Child, options );
			};
			proto = create( Parent.prototype );
			proto.constructor = Child;
			staticProperties = {
				// each component needs a guid, for managing CSS etc
				_guid: {
					value: getGuid()
				},
				// alias prototype as defaults
				defaults: {
					value: proto
				},
				// extendable
				extend: {
					value: extend,
					writable: true,
					configurable: true
				},
				// Parent - for IE8, can't use Object.getPrototypeOf
				_parent: {
					value: Parent
				}
			};
			defineProperties( Child, staticProperties );
			// extend configuration
			config.extend( Parent, proto, options );
			Viewmodel.extend( Parent, proto );
			Child.prototype = proto;
			return Child;
		};
	}( create, defineProperties, getGuid, config, initChildInstance, Viewmodel, unwrapExtended );

	/* Ractive.js */
	var Ractive = function( defaults, easing, interpolators, svg, magic, defineProperties, proto, Promise, extendObj, extend, parse, initialise, circular ) {

		var Ractive, properties;
		// Main Ractive required object
		Ractive = function( options ) {
			initialise( this, options );
		};
		// Ractive properties
		properties = {
			// static methods:
			extend: {
				value: extend
			},
			parse: {
				value: parse
			},
			// Namespaced constructors
			Promise: {
				value: Promise
			},
			// support
			svg: {
				value: svg
			},
			magic: {
				value: magic
			},
			// version
			VERSION: {
				value: '0.6.0'
			},
			// Plugins
			adaptors: {
				writable: true,
				value: {}
			},
			components: {
				writable: true,
				value: {}
			},
			decorators: {
				writable: true,
				value: {}
			},
			easing: {
				writable: true,
				value: easing
			},
			events: {
				writable: true,
				value: {}
			},
			interpolators: {
				writable: true,
				value: interpolators
			},
			partials: {
				writable: true,
				value: {}
			},
			transitions: {
				writable: true,
				value: {}
			}
		};
		// Ractive properties
		defineProperties( Ractive, properties );
		Ractive.prototype = extendObj( proto, defaults );
		Ractive.prototype.constructor = Ractive;
		// alias prototype as defaults
		Ractive.defaults = Ractive.prototype;
		// Certain modules have circular dependencies. If we were bundling a
		// module loader, e.g. almond.js, this wouldn't be a problem, but we're
		// not - we're using amdclean as part of the build process. Because of
		// this, we need to wait until all modules have loaded before those
		// circular dependencies can be required.
		circular.Ractive = Ractive;
		while ( circular.length ) {
			circular.pop()();
		}
		// Ractive.js makes liberal use of things like Array.prototype.indexOf. In
		// older browsers, these are made available via a shim - here, we do a quick
		// pre-flight check to make sure that either a) we're not in a shit browser,
		// or b) we're using a Ractive-legacy.js build
		var FUNCTION = 'function';
		if ( typeof Date.now !== FUNCTION || typeof String.prototype.trim !== FUNCTION || typeof Object.keys !== FUNCTION || typeof Array.prototype.indexOf !== FUNCTION || typeof Array.prototype.forEach !== FUNCTION || typeof Array.prototype.map !== FUNCTION || typeof Array.prototype.filter !== FUNCTION || typeof window !== 'undefined' && typeof window.addEventListener !== FUNCTION ) {
			throw new Error( 'It looks like you\'re attempting to use Ractive.js in an older browser. You\'ll need to use one of the \'legacy builds\' in order to continue - see http://docs.ractivejs.org/latest/legacy-builds for more information.' );
		}
		return Ractive;
	}( options, easing, interpolators, svg, magic, defineProperties, prototype, Promise, extend, Ractive_extend, parse, Ractive_initialise, circular );


	// export as Common JS module...
	if ( typeof module !== "undefined" && module.exports ) {
		module.exports = Ractive;
	}

	// ... or as AMD module
	else if ( typeof define === "function" && define.amd ) {
		define( function() {
			return Ractive;
		} );
	}

	// ... or as browser global
	global.Ractive = Ractive;

	Ractive.noConflict = function() {
		global.Ractive = noConflict;
		return Ractive;
	};

}( typeof window !== 'undefined' ? window : this ) );
;$(function() {
    var wall, ractive;

    ractive = new Ractive({
        el: 'container',
        template: '#foods-by-restaurant'
        data: {
            foodsByRestaurant : [
                {
                    name: 'Assarin Ullakko',
                    foods: [
                        {
                            name: 'Makaronilaatikko',
                            diets: 'L G',
                            prices: '2,60 / 4,90 / 5,90'
                        },
                        {
                            name: 'Nakki ja Muusi',
                            diets: 'L G',
                            prices: '2,60 / 4,90 / 5,90'
                        }
                    ]
                },
                {
                    name: 'Delica',
                    foods: [
                        {
                            name: 'Makaronilaatikko',
                            diets: 'L G',
                            prices: '2,60 / 4,90 / 5,90'
                        },
                        {
                            name: 'Nakki ja Muusi',
                            diets: 'L G',
                            prices: '2,60 / 4,90 / 5,90'
                        }
                    ]
                }
            ]
        }
    });

    wall = new freewall("#container");

    wall.reset({
        selector: '.item',
        cellH: 'auto',
        onResize: function() {
            wall.refresh();
        }
    });

    wall.fitWidth();
});