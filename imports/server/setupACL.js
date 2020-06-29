/**
 * Server side setup of Access Control List.
 *
 * @memberof Structure:Server
 * @function setupACL
 * @locus Server
 *
 *
 */


let acl = {};

//* load client accessable collections
import starter from '/imports/both/Pages/Starter/starter_access_control'
import content from '/imports/both/Pages/BuildContent/buildContent_access_control'
import learn from '/imports/both/Pages/Learn/learn_access_control'
import pubSub from '/imports/both/Pages/PubSub/pubSub_access_control'
import myProfile from '/imports/both/Pages/MyProfile/myProfile_access_control'

acl = Object.assign(acl, starter, content, learn, pubSub, myProfile);

//* load sys admin accessable collections
import users from '/imports/both/Pages/Users/users_access_control'
import sysConfig from '/imports/both/Pages/SysConfig/sysConfig_access_control'
import logsSystem from '/imports/both/Pages/LogsSystem/logsSystem_access_control'
import logsUsers from '/imports/both/Pages/LogsUsers/logsUsers_access_control'

acl = Object.assign(acl, users, sysConfig,  logsSystem, logsUsers);


export const accessControl = acl;
