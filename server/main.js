/**
 * Main entry point for server code
 *
 * @memberof Structure:Server
 * @function server-main
 * @locus Server
 *
 * @notes
 *  1.  Common routines are imported here
 *
 */


//** main top level modules
import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base'
import {DDPRateLimiter} from 'meteor/ddp-rate-limiter'
import _ from 'underscore'


//** isomorphic routines
import '/imports/both/collections'
import Version from '/imports/both/version'


//** load method modules
import '/imports/server/methods/system';
import '/imports/server/methods/storeDoc';
import '/imports/server/methods/readDocs';
import '/imports/server/methods/exportImport';
import '/imports/server/methods/userMgmt';
import '/imports/server/methods/documentation'
import '/imports/server/methods/pubSubFixtures'

//** special publish collections
import '/imports/server/publish/realTime'



//** main configuration set up
import {writeLog} from '/imports/server/functions/writeLog'
import '/imports/server/indexing'
import '/imports/server/setupACL'


Meteor.startup(() => {
    console.log("main server starting ...");

    //* check to make sure we can access the system
    //* if no accounts are found, then create a default administrator / administrator account
    initializeAdmin();

    //* set up user accounts and login capability
    configAccountsPackage();
    registerExternalLogin();

    const THROTTLE_METHODS = _.chain(Meteor.server.method_handlers)
        .keys()
        .reject(function(meth){ return meth.includes("/") || meth.includes("__"); })
        .value();

    DDPRateLimiter.addRule({
        name(name) {
            return _.contains(THROTTLE_METHODS, name);
        },
        // Rate limit per connection ID
        connectionId() { return true; },
    }, 100, 1000);
});


//** track system restarts
if (Meteor.isServer) {
    let startData = {
        event: "startup",
        description: "Meteor startup sequence",
        version: Version.VERSION,
        app: Version.APP_NAME,
        update: Version.LAST_UPDATE
    };

    writeLog("LogsSystem", startData);
}

//** track user login / out activity
if (Meteor.isServer) {
    Accounts.onLogin( (data) => {
        let user = Meteor.user();

        if(user){
            let doc = buildUserDoc("login", data, user);
            LogsUsers.insert(doc);
        }
    });

    Accounts.onLogout( (data) => {
        let user = Meteor.users.findOne({_id: data.user._id});

        if(user){
            let doc = buildUserDoc("logout", data, user);
            LogsUsers.insert(doc);
        }
    });
}

//** When checking external services for account validation / login,
//** the external services tries to CREATE a new user if no match exists
//** We need to hijack this process and refuse new account creation but
//** allow an existing user to be logged in
//** see https://stackoverflow.com/questions/15592965/how-to-add-external-service-logins-to-an-already-existing-account-in-meteor
//**
if (Meteor.isServer) {
    let orig_updateOrCreateUserFromExternalService = Accounts.updateOrCreateUserFromExternalService;
    Accounts.updateOrCreateUserFromExternalService = function(serviceName, serviceData, options) {
        if(serviceData && serviceData.email){
            let test = Meteor.users.findOne({"emails.address": serviceData.email});
            //console.log("externalService", serviceName, serviceData, options, test);

            if(test){
                let setAttr = {};
                setAttr["services." + serviceName] = serviceData;
                Meteor.users.update(test._id, {$set: setAttr});
            }else{
                return {
                    type: "oauth",
                    error: new Meteor.Error(Accounts.LoginCancelledError.numericError, "No registered account for " + serviceData.email)
                };
            }
            return orig_updateOrCreateUserFromExternalService.apply(this, arguments);
        }else{
            return {
                type: "oauth",
                error: new Meteor.Error(Accounts.LoginCancelledError.numericError, "Invalid email " + serviceData.email)
            };
        }
    }
}





function configAccountsPackage(){
    //* configure Accounts package
    //** remove ability for user to create new accounts
    Accounts.config({forbidClientAccountCreation: true});

    //** customize Accounts email template
    Accounts.emailTemplates.siteName = "Kanen";
    Accounts.emailTemplates.from = "no-reply@kanen.com";
    Accounts.emailTemplates.enrollAccount.text = (user, url) => {
        const adjUrl = url.replace("#/", "");

        return  "Hello, " +  user.username + "\n\n" +
            "To start using the Kanen service, simply click the link below. \n"  +
            adjUrl + "\n\n" +
            "Thank you from Kanen Support"
    };
}



function buildUserDoc(type, fields, user){
    let now = new Date();
    let connect = fields.connection;

    return {
        tag: type,
        author: fields.user._id,
        username: user.username,
        tenantId: user.tenantId,
        role: user.role && user.role._id ? user.role._id : null,
        email: user.emails && user.emails[0].address ? user.emails[0].address : "n/a",


        connection: {
            connectionId: connect.id,
            ipAddr: fields.connection.clientAddress,
            userAgent: connect.httpHeaders["user-agent"], //fields["connection"]["user-agent"],
            logTime: now.toISOString(),
        },

        updatedAt: now.getTime()
    };
}



//** register service configurations for external login capability
function registerExternalLogin(){

    ServiceConfiguration.configurations.upsert(
        { service: "google" },
        { $set: {
                clientId: Meteor.settings.service_google_clientId,
                secret: Meteor.settings.service_google_secret,
            }
        }
    );
}





//** for initial system startup only;
//** if no "administrator" exists, then creat one
function initializeAdmin(){
    if( Meteor.users.find().count() === 0){
        let item = {
            username: "administrator",
            email: "superadmin@example.com",
            password: "administrator",
        };

        let test = Accounts.createUser(item);

        let addins = {
            emailMain: "admin@example.com",
            pwdMain: "",
            admin: true,
            active: true,
            apiKey: "",
            role: "",
            tenantId: "general",
            sortName: "administrator",
            groups: "administrator",
            groupMaster: false,
            credit: 0,
        };

        Meteor.users.update(test, {$set: addins});
    }
}
