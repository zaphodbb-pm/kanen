/**
 * Server side setup of Access Control List for pages that try to store documents.
 *
 * @memberof Structure:Server
 * @function setupACL
 * @locus Server
 *
 * @param {Object} starter_access_control
 * @param {Object} buildContent_access_control
 * @param {Object} learn_access_control
 * @param {Object} pubSub_access_control
 * @param {Object} users_access_control
 * @param {Object} logsSystem_access_control
 * @param {Object} logsUsers_access_control
 * @param {Object} notifications_acl
 *
 * @returns {Object} accessControl
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


//* load special collections
import {notifications_acl} from './specialACL'

acl = Object.assign(acl, notifications_acl);


export const accessControl = acl;
