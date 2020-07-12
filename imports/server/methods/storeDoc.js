import {Meteor} from "meteor/meteor";
import {check} from 'meteor/check'

import {accessControl} from '/imports/server/setupACL'
import {verifyRole} from '/imports/server/functions/verifyRole'
import {ownsDocument} from '/imports/server/functions/ownsDocument'
import {objectify} from '/imports/server/functions/objectify'



Meteor.methods({
    /**
     * General insert document into collection.
     *
     * @memberof Methods
     * @function insertDoc
     * @isMethod true
     * @locus Server
     *
     * @param {String} coll
     * @param {Object} doc
     *
     * @return {Object}
     */
    insertDoc: function (coll, doc) {
        check(coll, String);
        check(doc, Object);
        let id;

        let acl = accessControl[coll];

        if( verifyRole(Meteor.user(), acl.roles) ) {
            doc.tenantId = Meteor.user() && Meteor.user().tenantId ? Meteor.user().tenantId : "general";
            doc.updatedAt = Date.now();

            //* inject group name server side for security
            if( Meteor.user() && Meteor.user().profile && Meteor.user().profile.group ){
                doc["group"] = Meteor.user().profile.group;
            }else{
                doc["group"] = "";
            }

            id = Mongo.Collection.get(acl.coll).insert(doc);

            if(id){
                return {status: 200, _id: id, text: `${id} has been added on ${coll} by insertDoc`};
            }else{
                return {status: 500, _id: id, text: `insertDoc at Server did not get a returned id value.`};
            }

        }else{
            return {status: 400, _id: "", text: "Invalid user"};
        }
    },

    /**
     * General document update into a collection.
     *
     * @memberof Methods
     * @function updateDoc
     * @isMethod true
     * @locus Server
     *
     * @param {String} coll
     * @param {String} id
     * @param {Object} doc
     *
     * @return {Object}
     */
    updateDoc: function (coll, id, doc) {
        check(coll, String);
        check(id, String);
        check(doc, Object);

        let acl = accessControl[coll];

        if( verifyRole(Meteor.user(), acl.roles) ) {
            if(ownsDocument(Meteor.user(), doc)){     // check if user is doc owner before update
                doc.updatedAt = Date.now();
                Mongo.Collection.get(acl.coll).update({_id: id}, {$set: doc});
                return {status: 200, text:  `${id} has been updated on ${coll} by updateDoc`};
            }

            return {status: 404, text:  `Has not been updated on ${coll} by updateDoc.  User does not own document.`};
        }else{
            return {status: 400, text: "Invalid user; does not have store privileges."};
        }
    },


    /**
     * General document remover from a collection.
     *
     * @memberof Methods
     * @function removeDoc
     * @isMethod true
     * @locus Server
     *
     * @param {String} coll
     * @param {String} docId
     *
     * @return {Object}
     */
    removeDoc: function (coll, docId) {
        check(coll, String);
        check(docId, String);

        let acl = accessControl[coll];

        if( verifyRole(Meteor.user(), acl.roles) ) {
            let doc = Mongo.Collection.get(acl.coll).findOne({_id: docId});

            if(ownsDocument(Meteor.user(), doc)){     // check if user is doc owner before delete
                Mongo.Collection.get(acl.coll).remove(doc._id);
                return {status: 200, _id: docId, text:  `${docId} has been removed from ${coll} by removeDoc`};
            }
            return {status: 404, _id: docId, text:  `User does not have permission to remove document.`};
        }else{
            return {status: 400, _id: "", text: "Invalid user; does not have store privileges."};
        }
    },

    /**
     * General document update a document field item.
     *
     * @memberof Methods
     * @function inputterUpdateItem
     * @isMethod true
     * @locus Server
     *
     * @requires {objectify}_from_'/imports/functionsBoth/func-objectify'
     *
     * @param {String} coll
     * @param {String} docId
     * @param {String} field
     * @param {String} value
     *
     * @return {Object}
     */

    updateDocField: function (coll, docId, field, value) {
        check(coll, String);
        check(docId, String);
        check(field, String);
        check(value, Match.OneOf(String, Number, Boolean, Object, Array) );

        let acl = accessControl[coll];

        if( verifyRole(Meteor.user(), acl.roles) ) {

            let updatedAt = Date.now();
            let setter = Object.assign({updatedAt: updatedAt}, objectify(field, value));

            Mongo.Collection.get(acl.coll).update({_id: docId}, {$set: setter });
            return {status: 200, _id: docId, text: `${docId} has been updated on ${coll} by updateDocField`};
        }else{
            return {status: 400, _id: "", text: "Invalid user; does not have store privileges."};
        }
    },

    /**
     * General document item as array updates.
     *
     * @memberof Methods
     * @function updateDocArray
     * @isMethod true
     * @locus Server
     *
     * @param {String} coll
     * @param {String} operation
     * @param {String} docId
     * @param {String} field
     * @param {String} value
     *
     * @return {Object}
     *
     * @notes
     *      As per MongoDb documentation, operations types are:
     *          "addToSet"
     *          "pop" or "shift" (ie "shift is "pop" with -1)
     *          "push"
     *          "pull"
     *          "pullAll"
     */

    updateDocArray: function (coll, operation,  docId, field, value) {
        check(coll, String);
        check(operation, String);
        check(docId, String);
        check(field, String);
        check(value, Match.OneOf(String, Array) );

        let acl = accessControl[coll];

        if( verifyRole(Meteor.user(), acl.roles) ) {
            let updatedAt = Date.now();
            let ops = null;

            switch(true){
                case operation === "addToSet":
                    if(Array.isArray(value) ){
                        ops = {
                            $addToSet: objectify(field, {$each: value} ),
                            $set: {updatedAt: updatedAt},
                        };
                    }
                    break;

                case (operation === "shift") || (operation === "pop"):
                    let remove = operation === "shift" ? -1 : 1;
                    ops = {
                        $pop: objectify(field, remove),
                        $set: {updatedAt: updatedAt},
                    };
                    break;

                case operation === "push":
                    if(Array.isArray(value) ){
                        ops = {
                            $push: objectify(field, {$each: value}),
                            $set: {updatedAt: updatedAt},
                        };
                    }else{
                        ops = {
                            $push: objectify(field, value),
                            $set: {updatedAt: updatedAt},
                        };
                    }
                    break;

                case operation === "pull":
                    if(Array.isArray(value) ){
                        ops = {
                            $pull: objectify(field, {$in: value}),
                            $set: {updatedAt: updatedAt},
                        };
                    }else{
                        ops = {
                            $pull: objectify(field, value),
                            $set: {updatedAt: updatedAt},
                        };
                    }
                    break;

                case operation === "pullAll":
                    if(Array.isArray(value) ){
                        ops = {
                            $pullAll: objectify(field, value),
                            $set: {updatedAt: updatedAt},
                        };
                    }else{
                        ops = {
                            $pull: objectify(field, value),
                            $set: {updatedAt: updatedAt},
                        };
                    }
                    break;
            }

            if(ops){
                let test = Mongo.Collection.get(acl.coll).update({_id: docId}, ops);

                if(test){
                    return {
                        status: 200,
                        id: docId,
                        text: coll + " has been updated by InputterUpdateArray",
                        value: value
                    };
                }else{
                    return {
                        status: 404,
                        id: docId,
                        text: coll + " has no matching documents",
                        value: value
                    };
                }

            }else{
                return {
                    status: 400,
                    id: docId,
                    text: "Invalid value or field",
                    value: value
                }
            }
        }
    }

});
