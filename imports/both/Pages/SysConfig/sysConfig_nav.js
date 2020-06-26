/**
 * @summary Nav label for SysConfig page.
 *
 * @memberof Pages:SysConfig
 * @function sysConfig_nav
 * @locus Client
 * @augments sysConfig
 *
 * @returns {Object} - {nav}
 * @returns {String} - link
 * @returns {String} - icon
 * @returns {Object} - roles {read: [], write: []}
 */


export const nav = {en: "System Config"};

export const link = "/sysConfig";

export const icon = "iconConfig";

// roles that can see this link in Navbar and be routed to
// roles are also used by database write / read checking
export const roles = {
    read: ["administrator"],
    write: ["administrator"]
}
