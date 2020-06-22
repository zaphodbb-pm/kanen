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

    //** system collections
    Learn._ensureIndex({author: 1});
    Notifications._ensureIndex({author: 1});
    LogsSystem._ensureIndex({updatedAt: 1});
    LogsUsers._ensureIndex({author: 1, updatedAt: 1});
    LogsSensors._ensureIndex({updatedAt: 1});
    RealTime._ensureIndex({name: 1, updatedAt: 1});

    //** user collections
    Starter._ensureIndex({geoLocation: "2dsphere", tenantId: 1, author: 1});  // "geoLocation needs to be first field!
});
