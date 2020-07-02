/**
 * Select Meteor extensions
 *
 * @memberof Structure:Client
 * @function Meteor_extensions
 * @locus Client
 *
 * @notes
 *  1.  Meteor.callPromise extracted from https://github.com/deanius/meteor-promise/ to reduce version conflicts
 *
 */


// This implementation of denodeify, taken from
// https://github.com/matthew-andrews/denodeify/blob/bbc334a90a4b036f491f766ce335fca7bd274109/index.js
// works in ways that Promise.denodeify does not (meteor-promise-docs shows [Object object]),
// Probably because the Object type returned doesn't pass the test of `instanceof Promise`

import {Meteor} from 'meteor/meteor';
import {HTTP} from "meteor/http";

let denodeify = function denodeify(nodeStyleFunction, filter) {
    'use strict';

    return function () {
        let self = this;
        let functionArguments = new Array(arguments.length + 1);

        for (let i = 0; i < arguments.length; i += 1) {
            functionArguments[i] = arguments[i];
        }

        function promiseHandler(resolve, reject) {
            function callbackFunction() {
                let args = new Array(arguments.length);

                for (let i = 0; i < args.length; i += 1) {
                    args[i] = arguments[i];
                }

                if (filter) {
                    args = filter.apply(self, args);
                }

                let error = args[0];
                let result = args[1];

                if (error) {
                    return reject(error);
                }

                return resolve(result);
            }

            functionArguments[functionArguments.length - 1] = callbackFunction;
            nodeStyleFunction.apply(self, functionArguments);
        }

        return new Promise(promiseHandler);
    };
};

/**
 * @summary Meteor.callPromise and other functions
 *
 * @memberof Structure:Client
 * @function Meteor_callPromise
 * @locus Client
 *
 * @param {String} name Name of method to invoke
 * @param {EJSON} [arg1,arg2...] Optional method arguments
 * @returns {Promise}
 */

Meteor.callPromise = denodeify(Meteor.call);
Meteor.wrapPromise = denodeify;
HTTP.callPromise = denodeify(HTTP.call);
HTTP.getPromise = denodeify(HTTP.get);
HTTP.postPromise = denodeify(HTTP.post);
HTTP.putPromise = denodeify(HTTP.put);
HTTP.deletePromise = denodeify(HTTP.delete);

//* include subscription service as well
let addReadyPromise = (handle) => {
    handle.readyPromise = () =>
        new Promise((resolve) => {
            Tracker.autorun((computation) => {
                if (handle.ready()) {
                    //resolving invokes 'then' steps async, just like computation invalidations
                    resolve(true);
                    computation.stop();
                }
            })
        })
};

Meteor._subscribe = Meteor.subscribe;

Meteor.subscribe = function () {
    let handle = Meteor._subscribe.apply(Meteor, arguments);
    addReadyPromise(handle);
    return handle;
};
