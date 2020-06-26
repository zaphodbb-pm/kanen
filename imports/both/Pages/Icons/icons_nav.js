/**
 * @summary Nav label for Icons page.
 *
 * @memberof Pages:Icons
 * @function icons_nav
 * @locus Client
 * @augments icons
 *
 * @returns {Object} - {nav}
 * @returns {String} - link
 * @returns {String} - icon
 * @returns {Object} - roles {read: [], write: []}
 */


export const nav = {en: "Icons"};

export const link = "/icons";

export const icon = "iconIcons";

// roles that can see this link in Navbar and be routed to
// roles are also used by database write / read checking
export const roles = {
    read: ["all"],
    write: ["none"]
}
