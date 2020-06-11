/**
 * Creates user log based on user activity.
 *
 * @memberof Functions
 * @function logUser
 * @locus Anywhere
 *
 * @param {Object} user - imported text object
 * @param {String} type - field in the main imported text object
 *
 * @returns nothing
 *
 */



export function logUser(user, type){
    let logMsg = {
        event: type,
        description: "User action: " + type,
        user: "User not logged in!",
    };

    if(user){
        logMsg = {
            event: type,
            description: "User action: " + type,

            user: user.username,
            email: user.emails[0].address,
            name: user.profile && user.profile.name ? user.profile.name : "",
            city: user.profile && user.profile.city ? user.profile.city : "",
            since: user.createdAt ? user.createdAt : "",
        };
    }


    console.log("logUser",logMsg);

    // Meteor.call("writeLogs", "LogsUsers", type);
}
