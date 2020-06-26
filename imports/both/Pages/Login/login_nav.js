/**
 * Nav label for Login page.
 *
 * @memberof Pages:Login
 * @function login_nav
 * @locus Anywhere
 * @augments login
 *
 * @returns {Object} - {nav}
 * @returns {String} - link
 * @returns {String} - icon
 * @returns {Object} - roles {read: [], write: []}
 */


export const nav = {en: "Login"};

export const link = "/login";

export const icon = "iconSignIn";

// roles that can see this link in Navbar and be routed to
// roles are also used by database write / read checking
export const roles = {
    read: ["all"],
    write: ["none"]
}
