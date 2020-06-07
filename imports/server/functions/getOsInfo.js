/**
 * Gets local os/machine information.
 *
 * @memberof Functions:Server
 * @function getOSinfo
 * @locus Server
 *
 * @return {Object} - os info
 *
 */


let os = require('os');

export function getOSinfo(){
    let ldAvg = os.loadavg();
    let macAddr = null;

    if( os.networkInterfaces().en0 ){
        macAddr = os.networkInterfaces().en0;
    }

    if( os.networkInterfaces().eth0 ){
        macAddr = os.networkInterfaces().eth0;
    }

    let osData = {
        type:       os.type(),
        release:    os.release(),
        arch:       os.arch(),
        hostname:   os.hostname(),
        homedir:    os.homedir(),
        uptime:     parseInt( os.uptime() / 3600 ).toString() + " hours",
        freemem:    parseInt( os.freemem() / 1024 / 1024 ).toString() + "MB",
        totalmem:   parseInt( os.totalmem() / 1024 / 1024 ).toString() + "MB",
        load:       ldAvg,
        loadtrunc:  [ ldAvg[0].toFixed(2),ldAvg[1].toFixed(2), ldAvg[2].toFixed(2) ],
        numCPUs:    os.cpus().length,

        cpus:       os.cpus(),
        macAddr: macAddr && macAddr[0] && macAddr[0].mac ? macAddr[0].mac : "not found",

        multiTenant: Meteor.settings.multi_tenancy,
        mongoVersion: Meteor.settings.mongodb
    };

    /*
            console.log("arch", osData.type + ": " +  osData.release  + " - " + osData.arch );
            console.log("CPUs", osData.numCPUs + " type: " + osData.cpus[0]. model + " speed (MHz): " + osData.cpus[0].speed);
            console.log("host", osData.hostname + " " +  osData.homedir );
            console.log("uptime", osData.uptime);
            console.log("operating", "memory: " + osData.freemem + " / " + osData.totalmem + "; load: " + osData.load );
    */
    return osData;
}
