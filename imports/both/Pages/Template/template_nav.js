/**
 * Nav label, link, icon and access control for Template page.
 *
 * @memberof Pages:Template
 * @function template_nav
 * @locus Client
 * @augments template
 *
 * @returns {Object} - {nav}
 * @returns {String} - link
 * @returns {String} - icon
 * @returns {Object} - roles {read: [], write: []}
 *
 * @notes
 *  1. In order to reduce the initial bundle size, the nav label is in a separate text file.
 */


export const nav = {en: "Template"};

export const link = "/template";

export const icon = "iconTemplate";

// roles that can see this link in Navbar and be routed to
// roles are also used by database write / read checking
export const roles = {
    read: ["all"],
    write: ["none"]
}
