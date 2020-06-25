import {check} from "meteor/check";
import ChangeStreams from '/imports/server/functions/ChangeStreams'

Meteor.publish("testRealTime", function (pipeline, options){
    if (pipeline) {
        check(pipeline, Array);
    } else {
        pipeline = [];
    }

    if (options) {
        check(options, Object);
    } else {
        options = {};
    }

    return new ChangeStreams(RealTime, pipeline, options);
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
