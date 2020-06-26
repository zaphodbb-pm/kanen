/**
 * @summary Nav label for Widgets page.
 *
 * @memberof Pages:Widgets
 * @function widgets_nav
 * @locus Client
 * @augments widgets
 *
 * @returns {Object} - {nav}
 * @returns {String} - link
 * @returns {String} - icon
 * @returns {Object} - roles {read: [], write: []}
 */


export const nav = {en: "Widgets"};

export const link = "/widgets";

export const icon = "iconWidget";

// roles that can see this link in Navbar and be routed to
// roles are also used by database write / read checking
export const roles = {
    read: ["all"],
    write: ["none"]
}
