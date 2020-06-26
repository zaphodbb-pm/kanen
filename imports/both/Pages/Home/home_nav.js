/**
 * @summary Nav label for Home page.
 *
 * @memberof Pages:Home
 * @function home_nav
 * @locus Client
 * @augments home
 *
 * @returns {Object} - {nav}
 * @returns {String} - link
 * @returns {String} - icon
 * @returns {Object} - roles {read: [], write: []}
 *
 */


export const nav = {en: "Home"};

export const link = "/home";

export const icon = "iconHome";

// roles that can see this link in Navbar and be routed to
// roles are also used by database write / read checking
export const roles = {
    read: ["all"],
    write: ["none"]
}
