/**
 * @summary Nav label for Documentation page.
 *
 * @memberof Pages:Documentation
 * @function documentation_nav
 * @locus Anywhere
 * @augments documentation
 *
 * @returns {Object} - {nav}
 * @returns {String} - link
 * @returns {String} - icon
 * @returns {Object} - roles {read: [], write: []}
 */


export const nav = {en: "Jsdoc"};

export const link = "/documentation";

export const icon = "iconDocumentation";

// roles that can see this link in Navbar and be routed to
// roles are also used by database write / read checking
export const roles = {
    read: ["siteAdmin"],
    write: ["siteAdmin"]
}
