/**
 * Collection definitions
 *
 * @memberof Structure
 * @function collections
 * @locus Anywhere
 *
 * @return {Object} collection
 *
 */


//** system info
SysConfigs = new Mongo.Collection("sysConfigs");            // contains one document for configuring rating parameters
LogsSystem = new Mongo.Collection("logsSystem");            // Systems events such as heartbeat
LogsUsers = new Mongo.Collection("logsUsers");              // Tracks user actions such as login / logout


//** client accessable data
Starter = new Mongo.Collection('starter');                  // sample starter coll; schema shows all field types
Content = new Mongo.Collection('content');                  // extra content pages as part of a simple CMS
BuildEmail = new Mongo.Collection('buildEmail');            // sweatcrew admin generated email templates
Notifications = new Mongo.Collection('notifications');      // sweatcrew user generated activity that drives notifications (ie invites)
