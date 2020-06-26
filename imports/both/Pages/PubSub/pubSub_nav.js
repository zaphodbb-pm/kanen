/**
 * Nav label for PubSub page.
 *
 * @memberof Pages:PubSub
 * @function pubSub_nav
 * @locus Anywhere
 * @augments pubSub
 *
 * @returns {Object} - {nav}
 * @returns {String} - link
 * @returns {String} - icon
 * @returns {Object} - roles {read: [], write: []}
 */


export const nav = {en: "Pub Sub"};

export const link = "/pubSub";

export const icon = "iconPubSub";

// roles that can see this link in Navbar and be routed to
// roles are also used by database write / read checking
export const roles = {
    read: ["all"],
    write: ["none"]
}
