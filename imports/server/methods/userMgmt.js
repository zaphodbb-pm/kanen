//** user accounts are implicit in Meteor and are handled differently than collections

import {Meteor} from "meteor/meteor";
import {Accounts} from 'meteor/accounts-base';
import {check} from 'meteor/check'

import {objectify} from '/imports/server/functions/objectify'
import {verifyRole} from '/imports/server/functions/verifyRole'


Meteor.methods({

    /**
     * Insert a new user object.
     *
     * @memberof Methods
     * @function userMgmtInsert
     * @isMethod true
     * @locus Server
     *
     * @param {Object} doc
     *
     * @return {Object} - status
     */
    userMgmtInsert: function (doc) {
        check(doc, Object);


        //if (Meteor.userId() && verifyRole(Meteor.userId(), "administrator")) {      // check if updating user is administrator

            let test = Accounts.createUser({
                username: doc.username,
                email: doc.emailMain !== "" ? doc.emailMain : doc.username + "@example.com",
                password: doc.pwdMain && doc.pwdMain !== "" ? doc.pwdMain : doc.username
            });

            let addins = {
                sortName: doc.sortName ? doc.sortName : doc.username.toLowerCase(),
                tenantId: doc.tenantId ? doc.tenantId : "general",
                active: doc.active ? doc.active : false,
                emailMain: doc.emailMain && doc.emailMain !== "" ? doc.emailMain : doc.username + "@example.com",
                credits: doc.credits ? doc.credits : 0,

                role: doc.role ? doc.role : "",

                admin: doc.admin ? doc.admin : false,
                apiKey: doc.apiKey ? doc.apiKey : "",
                groups: doc.groups ? doc.groups : "",
                groupMaster: doc.groupMaster ? doc.groupMaster : false,

                author: test,
                authorName: doc.username,
                authorFullName: doc.username,

                profile: {},
                updatedAt: Date.now()
            };

            Meteor.users.update(test, {$set: addins}, function (err, res) {
                console.log("umi", err, res);
            });

            return {status: 200, _id: test, text: `${doc.username} has been added to users`};
       // }
    },

    /**
     * @summary Update a user's profile info.
     *
     * @memberof Methods
     * @function userMgmtUpdate
     * @isMethod true
     * @locus Server
     *
     * @param {string} userId
     * @param {Object} doc
     *
     * @return {Object} - status
     */
    userMgmtUpdate: function (userId, doc) {
        check(userId, String);
        check(doc, Object);

        //if (Meteor.userId() && verifyRole(Meteor.userId(), "administrator")) {     // check if updating user is administrator
            let user = Meteor.users.findOne({_id: userId});

            Accounts.setUsername(userId, doc.username);

            if (doc.pwdMain) {
                Accounts.setPassword(userId, doc.pwdMain);
            }

            if (user.emails && user.emails[0] && user.emails[0].address) {        // check if email field exists
                if (doc.emailMain !== user.emails[0].address) {                   // skip if email has not been changed
                    Accounts.removeEmail(userId, user.emails[0].address);
                    Accounts.addEmail(userId, doc.emailMain, true);
                }
            }else{
                if(doc.emailMain){
                    Accounts.addEmail(userId, doc.emailMain, true);
                }
            }

            let addins = {
                sortName: doc.sortName ? doc.sortName : doc.username.toLowerCase(),
                emailMain: doc.emailMain && doc.emailMain !== "" ? doc.emailMain : doc.username + "@example.com",
                tenantId: doc.tenantId ? doc.tenantId : "general",
                active: doc.active ? doc.active : false,
                credits: doc.credits ? doc.credits : 0,

                role: doc.role ? doc.role : "",
                admin: doc.admin ? doc.admin : false,
                apiKey: doc.apiKey ? doc.apiKey : "",
                groups: doc.groups ? doc.groups : "",
                groupMaster: doc.groupMaster ? doc.groupMaster : false,

                author: doc._id,
                authorName: doc.username,
                authorFullName: doc.username,

                profile: doc.profile,
                updatedAt: Date.now()
            };

            Meteor.users.update(userId, {$set: addins});
            return {status: 200, _id: user, text: `${doc.username} has been added to users`};
        //} else {
            //return {status: 500, _id: userId, text: `${doc.username} was not updated`};
        //}
    },

    /**
     * @summary Update a user's profile field value.
     *
     * @memberof Methods
     * @function userMgmtUpdateItem
     * @isMethod true
     * @locus Server
     *
     * @param {String} item
     * @param {*} val
     * @return {string}
     */
    userMgmtUpdateItem: function (item, val) {
        check(item, String);
        check(val, Match.OneOf(String, Object, Array) );

        if( Meteor.userId() ) {     // check if user is logged in
            Meteor.users.update({_id: Meteor.user()._id}, {$set: objectify(item, val)});
            return {status: 200, _id: Meteor.user()._id, text: `${item} has been updated`};
        }else{
            return {status: 400, _id: null, text: `User does not have access privileges; ${item} has NOT been updated`};
        }
    },

    /**
     * @summary Remove an existing user object.
     *
     * @memberof Methods
     * @function userMgmtRemove
     * @isMethod true
     * @locus Server
     *
     * @param {String} docId
     *
     * @return {Object} - status
     */
    userMgmtRemove: function (docId) {
        check(docId, String);

        //if (Meteor.userId() && verifyRole(Meteor.userId(), "administrator")) {    // check if updating user is administrator
            let doc = Meteor.users.findOne({_id: docId});
            Meteor.users.remove(doc._id);
            return {status: 200, _id: docId, text: `${doc.username} has been removed`};
        //}
    },

    /**
     * @summary Update a user's credit value
     *
     * @memberof Methods
     * @function userUpdateCredit
     * @isMethod true
     * @locus Server
     *
     * @param {Number} price
     *
     * @return {string}
     */
    userUpdateCredit: function ( price) {
        check(price, Number);

        if(this.userId){
            let doc = Meteor.users.findOne({_id: this.userId});     // get user info
            if (doc && doc.credit) {
                let credit = doc.credit - Math.abs(price);                  // adjust and ensure that users cannot game the credits
                credit = credit > 0 ? credit : 0;

                Meteor.users.update({_id: this.userId}, {$set: {credit: credit}});
                return {status: 400, _id: null, text: `User does not have access privileges; ${item} has NOT been updated`};
            } else {
                return {status: 400, _id: this.userId, text: `User does not exist or has no credit`};
            }
        }
    },

    /**
     * @summary Find a user's group members.
     *
     * @memberof Methods
     * @function getGroupMembers
     * @isMethod true
     * @locus Server
     *
     * @return {Array}
     */
    getGroupMembers: function(){
        if( !this.userId ){return [];}

        let out = [ this.userId ];
        let mine = Meteor.users.findOne({_id: this.userId});

        //*** modify query to include include documents from my group members
        if (mine.groups && (typeof mine.groups === "string") && mine.groups !== "") {

            let groups = (mine.groups).replace(/\s/g, '').split(",");       // remove all whites spaces and then create item array
            groups = groups.map( function(item){                // add regex strings to match on
                return new RegExp(item, "i");
            });

            let members = Meteor.users.find({groups: {$in: groups}}, {fields: {_id: 1}}).fetch();
            out = members.map( function(item){
                return item._id;
            });
        }

        return out;
    },

    /**
     * @summary Get extra user fields based on user id.
     *
     * @memberof Methods
     * @function loadExtraFields
     * @isMethod true
     * @locus Server
     *
     * @return {Object} - extra user fields
     */
    loadExtraFields: function () {
        if (this.userId) {
            let extras = {
                tenantId: 1,
                sortName: 1,
                admin: 1,
                active: 1,
                apiKey: 1,
                role: 1,
                groups: 1,
                groupMaster: 1,
                credits: 1,
                status: 1,
            };

            return  Meteor.users.findOne({_id: this.userId}, {fields: extras});
        } else {
            return null;
        }
    },

    /**
     * @summary External Login service support.
     *
     * @memberof Methods
     * @function getServiceConfiguration
     * @isMethod true
     * @locus Server
     *
     * @return {Object}
     */

    getServiceConfiguration(service){
        return ServiceConfiguration.configurations.findOne({service: service});
    }
});
