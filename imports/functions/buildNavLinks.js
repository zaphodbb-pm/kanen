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
 * @return {Object} - reformatted routes to links checked against user permissions
 *
 */

export function buildNavLinks(user, routes) {
    let parents = {};


    console.log("buildNavLinks", user, routes);
    return {};

    //*** get parent links
    Object.keys(routes).forEach(function (key) {
        let nav = routes[key].nav;

        let roles = routes[key].role;
        if(!_.isArray(roles) ){ roles = roles.read; }

        if (nav && nav.isParent) {
            switch (true) {
                case user && user.admin:
                    parents[nav.lnk] = nav;
                    break;

                case roles.includes("all"):
                    parents[nav.lnk] = nav;
                    break;

                case !!(user && user.role && user.role._id):
                    if (roles.includes(user.role._id)) {
                        parents[nav.lnk] = nav;
                    }
                    break;
            }
        }
    });


    //*** attach sublinks to parent links
    Object.keys(parents).forEach(function (parent) {
        let children = [];

        Object.keys(routes).forEach(function (key) {
            let nav = routes[key].nav;
            if (nav && nav.subLnk && parent === nav.parent) {

                let roles = routes[key].role;
                if(!Array.isArray(roles) ){ roles = roles.read; }

                switch (true) {
                    case user && user.admin:
                        children.push({lnk: nav.lnk, txt: nav.txt, icon: nav.icon, role: nav.role});
                        break;

                    case roles.includes("all"):
                        children.push({lnk: nav.lnk, txt: nav.txt, icon: nav.icon, role: nav.role});
                        break;

                    case !!(user && user.role && user.role._id):
                        if (roles.includes(user.role._id)) {
                            children.push({lnk: nav.lnk, txt: nav.txt, icon: nav.icon, role: nav.role});
                        }
                        break;
                }
            }
        });

        parents[parent]["subMenu"] = children;
    });
    return parents;
}
