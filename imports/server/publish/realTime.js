import {check} from "meteor/check";
import PublishAggregations from '/imports/server/functions/PublishAggregations'

Meteor.publish("testRealTime", function (query, filter){
    if (query) {
        check(query, Object);
    } else {
        query = {};
    }

    if (filter) {
        check(filter, Object);
    } else {
        filter = {limit: 1000};
    }

    //return RealTime.find(query, filter);

    return new PublishAggregations(RealTime, []);
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
