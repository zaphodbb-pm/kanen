/**
 * @summary Nav label for BuildContent page.
 *
 * @memberof Pages:BuildContent
 * @function buildContent_nav
 * @locus Anywhere
 * @augments buildContent
 *
 * @returns {Object} - {nav}
 * @returns {String} - link
 * @returns {String} - icon
 * @returns {Object} - roles {read: [], write: []}
 */


export const nav = {en: "Build Content"};

export const link = "/buildContent";

export const icon = "iconBuildContent";

// roles that can see this link in Navbar and be routed to
// roles are also used by database write / read checking
export const roles = {
    read: ["siteAdmin"],
    write: ["siteAdmin"]
}
