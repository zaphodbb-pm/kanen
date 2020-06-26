/**
 * Nav label for Learn page.
 *
 * @memberof Pages:Learn
 * @function learn_nav
 * @locus Client
 * @augments learn
 *
 * @returns {Object} - {nav}
 * @returns {String} - link
 * @returns {String} - icon
 * @returns {Object} - roles {read: [], write: []}
 *
 */


export const nav = {en: "Learn"};

export const link = "/learn";

export const icon = "iconLearn";

// roles that can see this link in Navbar and be routed to
// roles are also used by database write / read checking
export const roles = {
    read: ["all"],
    write: ["none"]
}
