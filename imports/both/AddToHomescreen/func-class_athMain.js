/**
 * @summary Returns a browser name.
 *
 * @memberof PWA
 * @function class_athMain
 * @locus Client
 *
 * @param {Object} opts
 * @param {Object} platform
 *
 * @return {Object} - ath class
 *
 */


import {athDefaults, defaultSession} from "./func-athDefaults";


export class athMainClass{
    constructor(opts, platform, session, _beforeInstallPrompt){
        //** merge default options with user config
        this.options = Object.assign( {}, athDefaults, opts );
        this._canPrompt = undefined;
        this.platform = platform;
        this.session = session;
    }

    //* methods
    doLog( logStr ) {
        if ( this.options.logging ) {
            console.log( logStr );
        }
    };

    updateSession() {
        localStorage.setItem( this.options.appID, JSON.stringify( this.session ) );
    };

    clearSession() {
        this.session = defaultSession;
        this.updateSession();
    }

    optOut() {
        this.session.optedout = true;
        this.updateSession();
    };

    optIn() {
        this.session.optedout = false;
        this.updateSession();
    }

    clearDisplayCount() {
        this.session.displayCount = 0;
        this.updateSession();
    };

    removeSession( appID ) {
        localStorage.removeItem( appID || athDefaults.appID );
    };


    //* performs various checks to see if we are cleared for prompting
    canPrompt() {
        //** already evaluated the situation, so don't do it again
        if ( this._canPrompt !== undefined ) {
            return this._canPrompt;
        }

        this._canPrompt = false;

        if ( this.options.customCriteria ) {
            let passCustom = false;

            if ( typeof this.options.customCriteria === "function" ) {
                passCustom = this.options.customCriteria();
            } else {
                passCustom = !!this.options.customCriteria;
            }

            if ( !passCustom ) {
                this.doLog( "Add to homescreen: not displaying callout because a custom criteria was not met." );
                return false;
            }
        }

        //** using a double negative here to detect if service workers are not supported
        //** if not then don't bother asking to add to install the PWA
        if ( !( "serviceWorker" in navigator ) ) {
            this.doLog( "Add to homescreen: not displaying callout because service workers are not supported" );
            return false;
        }

        //** the device is not supported
        if ( !this.platform.isCompatible ) {
            this.doLog( "Add to homescreen: not displaying callout because device not supported" );
            return false;
        }

        let now = Date.now(),
            lastDisplayTime = this.session.lastDisplayTime;

        //** we obey the display pace (prevent the message to popup too often)
        if ( now - lastDisplayTime < this.options.displayPace * 60000 ) {
            this.doLog( "Add to homescreen: not displaying callout because displayed recently" );
            return false;
        }

        //** obey the maximum number of display count
        if ( this.options.maxDisplayCount && this.session.displayCount >= this.options.maxDisplayCount ) {
            this.doLog( "Add to homescreen: not displaying callout because displayed too many times already" );
            return false;
        }

        let isValidLocation = !this.options.validLocation.length;

        for ( let i = this.options.validLocation.length; i--; ) {
            if ( this.options.validLocation[ i ].test( document.location.href ) ) {
                isValidLocation = true;
                break;
            }
        }

        if ( !isValidLocation ) {
            this.doLog( "Add to homescreen: not displaying callout because not a valid location" );
            return false;
        }

        if ( this.session.sessions < this.options.minSessions ) {
            this.doLog( "Add to homescreen: not displaying callout because not enough visits" );
            return false;
        }

        if ( ( this.options.nextSession && this.options.nextSession > 0 ) &&
            this.session.sessions >= this.options.nextSession ) {
            this.doLog( "Add to homescreen: not displaying callout because waiting on session " + this.options.nextSession );
            return false;
        }

        //** critical errors:
        if ( this.session.optedout ) {
            this.doLog( "Add to homescreen: not displaying callout because user opted out" );
            return false;
        }

        if ( this.session.added ) {
            this.doLog( "Add to homescreen: not displaying callout because already added to the homescreen" );
            return false;
        }

        //** check if the app is in stand alone mode
        //** this applies to iOS
        if ( this.platform.isStandalone ) {

            //*** execute the onAdd event if we haven't already
            if ( !this.session.added ) {
                this.session.added = true;
                this.updateSession();

                if ( this.options.onAdd ) {
                    this.options.onAdd.call( this );
                }
            }

            this.doLog( "Add to homescreen: not displaying callout because in standalone mode" );
            return false;
        }

        //** check if this is a returning visitor
        if ( !this.session.returningVisitor ) {

            this.session.returningVisitor = true;
            this.updateSession();

            //*** we do not show the message if this is your first visit
            if ( this.options.skipFirstVisit ) {
                this.doLog( "Add to homescreen: not displaying callout because skipping first visit" );
                return false;
            }
        }

        this._canPrompt = true;

        return true;
    };

    show( force ) {
        //** message already on screen
        if ( this.shown ) {
            this.doLog( "Add to homescreen: not displaying callout because already shown on screen" );
            return;
        }

        this.shown = true;
    };
}
