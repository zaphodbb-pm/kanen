/**
 * Extra meteor Collection functionality.
 * Replaces older packages to remove underscore dependency.
 *
 * @memberof Structure:Server
 * @function Meteor_server_extensions
 * @locus Server
 *
 * @see {@link https://github.com/rclai/meteor-collection-extensions/blob/master/collection-extensions.js|lai:collection-extensions}
 * @see {@link https://github.com/dburles/mongo-collection-instances/blob/master/mongo-instances.js|dburles:mongo-collection-instances}
 *
 */

import {Meteor} from "meteor/meteor";

/***** lai:collection-extensions **/
// The collection extensions namespace
let CollectionExtensions = {};

// Stores all the collection extensions
CollectionExtensions._extensions = [];

// This is where you would add custom functionality to
// Mongo.Collection/Meteor.Collection
CollectionExtensions.addExtension = function(customFunction) {
    if (typeof customFunction !== 'function') {
        throw new Meteor.Error(
            'collection-extension-wrong-argument',
            'You must pass a function \
             into CollectionExtensions.addExtension().');
    }
    CollectionExtensions._extensions.push(customFunction);
    // If Meteor.users exists, apply the extension right away
    if (typeof Meteor.users !== 'undefined') {
        customFunction.apply(Meteor.users, ['users']);
    }
};


// Utility function to add a prototype function to your
// Meteor/Mongo.Collection object
CollectionExtensions.addPrototype = function(name, customFunction) {
    if (typeof name !== 'string') {
        throw new Meteor.Error(
            'collection-extension-wrong-argument',
            'You must pass a string as the first argument \
             into CollectionExtensions.addPrototype().');
    }
    if (typeof customFunction !== 'function') {
        throw new Meteor.Error(
            'collection-extension-wrong-argument',
            'You must pass a function as the second argument \
             into CollectionExtensions.addPrototype().');
    }
    (typeof Mongo !== 'undefined' ?
        Mongo.Collection :
        Meteor.Collection).prototype[name] = customFunction;
};



// This is used to reassign the prototype of unfortunately
// and unstoppably already instantiated Mongo instances
// i.e. Meteor.users
function reassignCollectionPrototype(instance, constr) {
    let hasSetPrototypeOf = typeof Object.setPrototypeOf === 'function';

    if (!constr) constr = typeof Mongo !== 'undefined' ? Mongo.Collection : Meteor.Collection;

    // __proto__ is not available in < IE11
    // Note: Assigning a prototype dynamically has performance implications
    if (hasSetPrototypeOf) {
        Object.setPrototypeOf(instance, constr.prototype);
    } else if (instance.__proto__) {
        instance.__proto__ = constr.prototype;
    }
}

// This monkey-patches the Collection constructor
// This code is the same monkey-patching code
// that matb33:collection-hooks uses, which works pretty nicely
function wrapCollection(ns, as) {
    // Save the original prototype
    if (!as._CollectionPrototype) as._CollectionPrototype = new as.Collection(null);

    let constructor = as.Collection;
    let proto = as._CollectionPrototype;

    ns.Collection = function () {
        let ret = constructor.apply(this, arguments);
        // This is where all the collection extensions get processed
        processCollectionExtensions(this, arguments);
        return ret;
    };

    ns.Collection.prototype = proto;
    ns.Collection.prototype.constructor = ns.Collection;

    for (let prop in constructor) {
        if (constructor.hasOwnProperty(prop)) {
            ns.Collection[prop] = constructor[prop];
        }
    }
}

function processCollectionExtensions(self, args) {
    // Using old-school operations for better performance
    // Please don't judge me ;P
    args = args ? [].slice.call(args, 0) : undefined;
    let extensions = CollectionExtensions._extensions;
    for (let i = 0, len = extensions.length; i < len; i++) {
        extensions[i].apply(self, args);
    }
}

if (typeof Mongo !== 'undefined') {
    wrapCollection(Meteor, Mongo);
    wrapCollection(Mongo, Mongo);
} else {
    wrapCollection(Meteor, Meteor);
}

if (typeof Meteor.users !== 'undefined') {
    // Ensures that Meteor.users instanceof Mongo.Collection
    reassignCollectionPrototype(Meteor.users);
}





/***** dburles:mongo-collection-instances **/
let instances = [];

CollectionExtensions.addExtension(function (name, options) {
    instances.push({
        name: name,
        instance: this,
        options: options
    });
});

Mongo.Collection.get = function(name, options) {
    options = options || {};

    let collection = instances.find(function(instance) {
        if (options.connection)
            return instance.name === name &&
                instance.options && instance.options.connection._lastSessionId === options.connection._lastSessionId;
        return instance.name === name;
    });

    return collection && collection.instance;
};

Mongo.Collection.getAll = function() {
    return instances;
};

// Meteor.Collection will lack ownProperties that are added back to Mongo.Collection
Meteor.Collection = Mongo.Collection;
