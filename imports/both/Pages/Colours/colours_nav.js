/**
 * @summary Nav label for Colours page.
 *
 * @memberof Pages:Colours
 * @function colours_nav
 * @locus Anywhere
 * @augments colours
 *
 * @returns {Object} - {nav}
 * @returns {String} - link
 * @returns {String} - icon
 * @returns {Object} - roles {read: [], write: []}
 *
 */


export const nav = {en: "Colours"};

export const link = "/colours";

export const icon = "iconColours";

// roles that can see this link in Navbar and be routed to
// roles are also used by database write / read checking
export const roles = {
    read: ["all"],
    write: ["none"]
}
