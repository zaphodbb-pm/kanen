/**
 * @summary Nav label for Starter page.
 *
 * @memberof Pages:Starter
 * @function starter_nav
 * @locus Client
 * @augments starter
 *
 * @returns {Object} - {nav}
 * @returns {String} - link
 * @returns {String} - icon
 * @returns {Object} - roles {read: [], write: []}
 */


export const nav = {en: "Starter ListForm"};

export const link = "/listForm";

export const icon = "iconListForm";

// roles that can see this link in Navbar and be routed to
// roles are also used by database write / read checking
export const roles = {
    read: ["all"],
    write: ["siteAdmin"]
}
