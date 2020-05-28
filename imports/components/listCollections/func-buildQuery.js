/**
 * Build MongoDb query object from search.
 *
 * @memberof Components:List
 * @function buildQuery
 * @locus Client
 * @augments searchBox
 *
 *
 * @param {String} str
 * @param {Array} fields
 *
 * @return {Object} modified MongoDb query
 *
 */


//** common query building function
export function buildQuery(str, fields) {
    let list = fields.filter( (fld) => fld.search );
    let compound = {};

    switch(true){
        case str.trim().length < 1:
            compound = {};
            break;

        case !str.includes(";") && !str.includes("+"):
            compound = simpleSearch(str, list);
            break;

        case str.includes(";"):
            compound = orSplit(str, list);
            break;

        case !str.includes(";") && str.includes("+"):
            compound = andSplit(str, list);
            break;
    }

    return compound;
}


function simpleSearch(str, list){
    let search = [];

    list.forEach( (el) => {
        let s = {};
        s[el.key] = checkString(str);
        search.push(s);
    });

    return str.includes("!") ? {$nor: search} : {$or: search};
}


function checkString(str) {
    if (str.charAt(0) === "!") {
        return {$regex: ".*" + str.slice(1) + ".*", $options: "i"};
    } else {
        return {$regex: ".*" + str + ".*", $options: "i"};
    }
}


function orSplit(str, list) {
    let ors = str.split(";");
    let orArray = [];

    ors.forEach( (el) => {
        let orTerm = [];

        if (el.includes("+")) {
            orArray.push(andSplit(el, fields));
        } else {
            list.forEach( (eli) => {
                let item = {};

                if (el.length > 1) {                //need at least two characters to form a compound search
                    item[eli.key] = {$regex: ".*" + el + ".*", $options: "i"};
                    orTerm.push(item);
                }
            });

            if (orTerm.length > 0) {
                orArray.push({$or: orTerm});
            }
        }
    });

    return {$or: orArray};
}


function andSplit(str, list) {
    let ands = str.split("+");
    let andArray = [];

    ands.forEach( (el) => {
        let andTerm = [];

        list.forEach( (eli) => {
            let item = {};
            if (el.length > 1) {                //need at least two characters to form a compound search
                item[eli.key] = checkString(el);
                andTerm.push(item);
            }
        });

        if (andTerm.length > 0) {
            if (el.includes("!")) {
                andArray.push({$nor: andTerm});
            } else {
                andArray.push({$or: andTerm});
            }
        }
    });

    return {$and: andArray};
}
