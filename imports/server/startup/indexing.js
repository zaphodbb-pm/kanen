/**
 * Server side code to set up key collection indexes.
 *
 * @memberof Structure:Server
 * @function server-indexing
 * @locus Server
 *
 *
 */



Meteor.startup(function(){

//** client accessable data

    //** system collections
    Content._ensureIndex({author: 1});
    BuildEmail._ensureIndex({author: 1});
    Notifications._ensureIndex({author: 1});
    LogsSystem._ensureIndex({updatedAt: 1});
    LogsUsers._ensureIndex({author: 1, updatedAt: 1});

    //** user collections
    Starter._ensureIndex({geoLocation: "2dsphere", tenantId: 1, author: 1});
});
