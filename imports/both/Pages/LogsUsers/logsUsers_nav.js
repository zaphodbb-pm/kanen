/**
 * @summary Nav label for LogsUsers page.
 *
 * @memberof Pages:LogsUsers
 * @function logsUsers_nav
 * @locus Anywhere
 * @augments logsUsers
 *
 * @returns {Object} - {nav}
 * @returns {String} - link
 * @returns {String} - icon
 * @returns {Object} - roles {read: [], write: []}
 */


export const nav = {en: "Users Logs"};

export const link = "/logsUsers";

export const icon = "iconSysLogs";

// roles that can see this link in Navbar and be routed to
// roles are also used by database write / read checking
export const roles = {
    read: ["siteAdmin"],
    write: ["siteAdmin"]
}
