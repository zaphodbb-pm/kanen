/**
 * Builds navigation links object from routes info.
 *
 * @memberof Functions
 * @function buildNavLinks
 * @locus Anywhere
 *
 * @param {Object} user - user extras object
 * @param {Object} routes - constructed router object
 *
 * @return {Object} - reduced set of routes to links checked against user permissions
 *
 */

export function buildNavLinks(user, routes) {
    let out = [];

    routes.forEach(function (route) {
        let roles = route && route.roles && route.roles.read ? route.roles.read : [];
        switch (true) {
            case user && user.admin:
                out.push(route);
                break;

            case roles.includes("all"):
                out.push(route);
                break;

            case !!(user && user.role && user.role._id):
                if (roles.includes(user.role._id)) {
                    out.push(route);
                }
                break;
        }
    });

    return out;
}
