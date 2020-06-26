/**
 * @summary Nav label for Widgets Content page.
 *
 * @memberof Pages:WidgetsContent
 * @function widgetsContent_nav
 * @locus Client
 * @augments widgetsContent
 *
 * @returns {Object} - {nav}
 * @returns {String} - link
 * @returns {String} - icon
 * @returns {Object} - roles {read: [], write: []}
 */


export const nav = {en: "Tab Widgets"};

export const link = "/content-widgets";

export const icon = "iconContent";

// roles that can see this link in Navbar and be routed to
// roles are also used by database write / read checking
export const roles = {
    read: ["all"],
    write: ["none"]
}
