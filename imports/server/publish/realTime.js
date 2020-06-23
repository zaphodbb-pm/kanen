import {check} from "meteor/check";

Meteor.publish("testRealTime", function (obj, filter){
    if (obj) {
        check(obj, Object);
    } else {
        obj = {};
    }

    if (filter) {
        check(filter, Object);
    } else {
        filter = {limit: 1000};
    }

    return RealTime.find(query, filter);
});

//* stop users from bypassing normal methods
RealTime.deny({
    update: function () {
        return true;
    },
    insert: function () {
        return true;
    },
    remove: function () {
        return true;
    }
});
