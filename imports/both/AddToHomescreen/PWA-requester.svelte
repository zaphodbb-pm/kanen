<script>
    /**
     * Progressive Web App requester.
     *
     * @memberof PWA
     * @function PWA-requester
     * @locus Client
     *
     * @see based on work by {@link https://github.com/docluv/add-to-homescreen|Chris Love}
     */

    import {defaultPrompt, defaultSession, athDefaults} from "./func-athDefaults";
    import {getPlatform} from "./func-getPlatform";
    import {checkPlatform} from "./func-checkPlatform";
    import {nextPrime} from "./func-nextPrime";
    //import {buildGuidance} from "./func-buildGuidance";
    import {showPlatformGuidance} from "./func-showPlatformGuidance";

    const text = {
        title: "Install this application to your home screen?",
        install: "Install",
        notNow: "Not Now"
    }

    let modalOpen = false;

    //* initialize component
    let initOpts = {
        onShow: function () {
            console.log( "showing" );

            modalOpen = true;
        },
        onInit: function (ath) {
            console.log( "initializing", ath );
        },
        onAdd: function () {
            console.log( "adding" );
        },
        onInstall: function () {
            console.log( "Installing" );
        },
        onCancel: function () {
            console.log( "Cancelling" );
        },

        displayPace: 0,

        debug: "iphone",
    };




    //* event handlers
    function btnInstall(){
        console.log("btnInstall");
    }

    function btnNotNow(){
        console.log("btnNotNow");
    }

    function btnClose(){
        modalOpen = false;
    }






    //* prepare common variables
    let appID = athDefaults.appID;
    let nativePrompt = false;
    let platform = {};
    let _beforeInstallPrompt;

    //* load session
    let session = localStorage.getItem( appID );

    if ( session && session.added ) {
        console.log("session exists", session);
    }

    session = session ? JSON.parse( session ) : defaultSession;

    class athMain {
        constructor(opts, platform){
            // merge default options with user config
            this.options = Object.assign( {}, athDefaults, opts );
            this._canPrompt = undefined;
            this.platform = platform;

            if ( "serviceWorker" in navigator ) {
                let manifestEle = document.querySelector( "[rel='manifest']" );
                if ( !manifestEle ) {
                    console.log( "no manifest file" );
                    platform.isCompatible = false;
                }

                navigator.serviceWorker.getRegistration().then( afterSWCheck );
            } else {
                afterSWCheck( {} );
            }
        }

        //** methods
        doLog( logStr ) {
            if ( this.options.logging ) {
                console.log( logStr );
            }
        };

        removeSession( appID ) {
            localStorage.removeItem( appID || athDefaults.appID );
        };


        //performs various checks to see if we are cleared for prompting
        canPrompt() {
            //already evaluated the situation, so don't do it again
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

            //using a double negative here to detect if service workers are not supported
            //if not then don't bother asking to add to install the PWA
            if ( !( "serviceWorker" in navigator ) ) {
                this.doLog( "Add to homescreen: not displaying callout because service workers are not supported" );
                return false;
            }

            // the device is not supported
            if ( !platform.isCompatible ) {
                this.doLog( "Add to homescreen: not displaying callout because device not supported" );
                return false;
            }

            let now = Date.now(),
                    lastDisplayTime = session.lastDisplayTime;

            // we obey the display pace (prevent the message to popup too often)
            if ( now - lastDisplayTime < this.options.displayPace * 60000 ) {
                this.doLog( "Add to homescreen: not displaying callout because displayed recently" );
                return false;
            }

            // obey the maximum number of display count
            if ( this.options.maxDisplayCount && session.displayCount >= this.options.maxDisplayCount ) {
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


            /*
            let isGuidanceURL = false;

            for ( let i = guidanceTargetURLs.length; i--; ) {
                if ( document.location.href.indexOf( guidanceTargetURLs[ i ] ) > -1 ) {
                    isGuidanceURL = true;
                    break;
                }
            }

            if ( isGuidanceURL ) {
                this.doLog( "Add to homescreen: not displaying callout because this is a guidance URL" );
                return false;
            }
            */

            if ( session.sessions < this.options.minSessions ) {
                this.doLog( "Add to homescreen: not displaying callout because not enough visits" );
                return false;
            }

            if ( ( this.options.nextSession && this.options.nextSession > 0 ) &&
                    session.sessions >= this.options.nextSession ) {
                this.doLog( "Add to homescreen: not displaying callout because waiting on session " + this.options.nextSession );
                return false;
            }

            // critical errors:
            if ( session.optedout ) {
                this.doLog( "Add to homescreen: not displaying callout because user opted out" );
                return false;
            }

            if ( session.added ) {
                this.doLog( "Add to homescreen: not displaying callout because already added to the homescreen" );
                return false;
            }

            // check if the app is in stand alone mode
            //this applies to iOS
            if ( platform.isStandalone ) {

                // execute the onAdd event if we haven't already
                if ( !session.added ) {
                    session.added = true;
                    this.updateSession();

                    if ( this.options.onAdd ) {
                        this.options.onAdd.call( this );
                    }
                }

                this.doLog( "Add to homescreen: not displaying callout because in standalone mode" );
                return false;
            }

            // check if this is a returning visitor
            if ( !session.returningVisitor ) {

                session.returningVisitor = true;
                this.updateSession();

                // we do not show the message if this is your first visit
                if ( this.options.skipFirstVisit ) {
                    this.doLog( "Add to homescreen: not displaying callout because skipping first visit" );
                    return false;
                }
            }

            this._canPrompt = true;

            return true;
        };

        show( force ) {
            // message already on screen
            if ( this.shown ) {
                this.doLog( "Add to homescreen: not displaying callout because already shown on screen" );
                return;
            }

            this.shown = true;

            if ( document.readyState === "interactive" || document.readyState === "complete" ) {
                this._delayedShow();
            } else {
                document.onreadystatechange = function () {
                    if ( document.readyState === 'complete' ) {
                        ath._delayedShow();
                    }
                };
            }
        };

        _delayedShow( e ) {
            setTimeout( this._show(), this.options.startDelay * 1000 + 500 );
        };

        _show() {
            if ( this.canPrompt() ) {
                if ( _beforeInstallPrompt && !this.options.mustShowCustomPrompt ) {
                    triggerNativePrompt();

                } else {
                    let target = getPlatform(platform, this.options.debug);
                    let ath_wrapper = document.querySelector( this.options.athWrapper );

                    if ( ath_wrapper && !session.optedout ) {
                        ath_wrapper.classList.remove( this.options.hideClass );
                        let promptTarget = Object.assign( {}, defaultPrompt, this.options.customPrompt, this.options.prompt[ target ] );

                        if ( promptTarget.showClasses ) {
                            promptTarget.showClasses = promptTarget.showClasses.concat( this.options.showClasses );
                        } else {
                            promptTarget.showClasses = this.options.showClasses;
                        }

                        for ( let index = 0; index < promptTarget.showClasses.length; index++ ) {
                            ath_wrapper.classList.add( promptTarget.showClasses[ index ] );
                        }

                        //ath_wrapper.classList.add( ...promptTarget.showClasses );




                        let ath_title = ath_wrapper.querySelector( this.options.promptDlg.title ),
                                ath_logo = ath_wrapper.querySelector( this.options.promptDlg.logo ),
                                ath_cancel = ath_wrapper.querySelector( this.options.promptDlg.cancel ),
                                ath_install = ath_wrapper.querySelector( this.options.promptDlg.install );


                        if ( ath_title && promptTarget.title ) {
                            ath_title.innerText = promptTarget.title;
                        }

                        if ( ath_logo && promptTarget.src ) {
                            ath_logo.src = promptTarget.src;
                            ath_logo.alt = promptTarget.title || "Install PWA";
                        }

                        if ( ath_install ) {
                            ath_install.addEventListener( "click", platform.handleInstall );
                            //ath_install.classList.remove( ath.options.hideClass );
                            /*
							ath_install.innerText = promptTarget.installMsg ? promptTarget.installMsg :
								( ( promptTarget.action && promptTarget.action.ok ) ? promptTarget.action.ok : ath.options.promptDlg.action.ok );

                             */
                        }

                        if ( ath_cancel ) {
                            ath_cancel.addEventListener( "click", platform.cancelPrompt );
                            ath_cancel.classList.remove( this.options.hideClass );
                            ath_cancel.innerText = promptTarget.cancelMsg ? promptTarget.cancelMsg :
                                    ( ( promptTarget.action && promptTarget.action.cancel ) ? promptTarget.action.cancel : this.options.promptDlg.action.cancel );
                        }
                    }

                    if ( this.options.lifespan && this.options.lifespan > 0 ) {
                        this.autoHideTimer = setTimeout( autoHide, this.options.lifespan * 1000 );
                    }
                }

                // fire the custom onShow event
                if ( this.options.onShow ) {
                    this.options.onShow.call( this );
                }

                // increment the display count
                session.lastDisplayTime = Date.now();
                session.displayCount++;

                if ( this.options.displayNextPrime ) {
                    session.nextSession = nextPrime( session.sessions );
                }

                this.updateSession();

            }
        };

        trigger() {
            this._show();
        };

        updateSession() {
            localStorage.setItem( this.options.appID, JSON.stringify( session ) );
        };

        clearSession() {
            session = defaultSession;
            this.updateSession();
        }

        optOut() {
            session.optedout = true;
            this.updateSession();
        };

        optIn() {
            session.optedout = false;
            this.updateSession();
        }

        clearDisplayCount() {
            session.displayCount = 0;
            this.updateSession();
        };
    }

    //let ath = ath ? ath : new athMain( initOpts);

    //* setup browser platform object
    platform = checkPlatform(window.navigator.userAgent);

    let ath =  new athMain( initOpts, platform);


    console.log("ath", ath);



    //* event handlers
    if ( "onbeforeinstallprompt" in window ) {
        window.addEventListener( "beforeinstallprompt", beforeInstallPrompt );
        nativePrompt = true;
    }

    if ( "onappinstalled" in window ) {
        window.addEventListener( "appinstalled", function ( evt ) {
            ath.doLog( "a2hs", "installed" );
            session.added = true;
            ath.updateSession();

            if ( ath.options.onInstall ) {
                ath.options.onInstall.call( this );
            }
        } );
    }



    platform.cancelPrompt = function ( evt ) {
        evt.preventDefault();
        if ( ath.options.onCancel ) {
            ath.options.onCancel();
        }
        platform.closePrompt();
        return false;
    };

    platform.closePrompt = function () {

        console.log("platform.closePrompt");

        /*
        let ath_wrapper = document.querySelector( ath.options.athWrapper );
        if ( ath_wrapper ) {
            ath_wrapper.classList.remove( ...ath.options.showClasses );
        }

         */
    };

    platform.handleInstall = function ( evt ) {
        if ( ath.options.onInstall ) {
            ath.options.onInstall();
        }

        let checkPlatform = getPlatform(platform, ath.options.debug);

        if ( _beforeInstallPrompt && ( !ath.options.debug || checkPlatform === "native" ) ) {
            platform.closePrompt();
            triggerNativePrompt();

            console.log("_beforeInstallPrompt", getPlatform(platform,  ath.options.debug) === "native" );

        } else {

            if ( ath.autoHideTimer ) {
                clearTimeout( ath.autoHideTimer );
            }

            let promptTarget = Object.assign({}, defaultPrompt, ath.options.customPrompt, ath.options.prompt[checkPlatform]);
            let showImages = showPlatformGuidance( promptTarget );

            console.log("showImages", checkPlatform, showImages);
        }

        return false;
    };

    function autoHide() {
        let target = getPlatform(platform, ath.options.debug);
        let ath_wrapper = document.querySelector( ath.options.athWrapper );

        if ( ath_wrapper ) {
            let promptTarget = ath.options.prompt[ target ];
            promptTarget.showClasses = promptTarget.showClasses.concat( ath.options.showClasses );

            ath_wrapper.classList.remove( ...promptTarget.showClasses );
            ath_wrapper.classList.add( ath.options.hideClass );
        }
    }


    //* displays native A2HS prompt & stores results
    function triggerNativePrompt() {
        return _beforeInstallPrompt.prompt()
                .then( function ( evt ) {

                    // Wait for the user to respond to the prompt
                    return _beforeInstallPrompt.userChoice;
                } )
                .then( function ( choiceResult ) {
                    session.added = ( choiceResult.outcome === "accepted" );

                    if ( session.added ) {
                        ath.doLog( "User accepted the A2HS prompt" );

                        if ( ath.options.onAdd ) {
                            ath.options.onAdd();
                        }

                    } else {

                        if ( ath.options.onCancel ) {
                            ath.options.onCancel();
                        }

                        session.optedout = true;
                        ath.doLog( "User dismissed the A2HS prompt" );
                    }

                    ath.updateSession();
                    _beforeInstallPrompt = null;
                } )
                .catch( function ( err ) {
                    ath.doLog( err.message );

                    if ( err.message.indexOf( "user gesture" ) > -1 ) {
                        ath.options.mustShowCustomPrompt = true;
                        ath._delayedShow();
                    } else if ( err.message.indexOf( "The app is already installed" ) > -1 ) {

                        console.log( err.message );
                        session.added = true;
                        ath.updateSession();

                    } else {
                        console.log( err );
                        return err;
                    }
                } );
    }


    function beforeInstallPrompt( evt ) {
        evt.preventDefault();
        console.log( "capturing the native A2HS prompt", ath );
        _beforeInstallPrompt = evt;
        ath._delayedShow();
    }



    function afterSWCheck( sw ) {
        ath.sw = sw;

        if ( !ath.sw ) {
            console.log( "no service worker" );
            platform.isCompatible = false;
        }

        session.sessions += 1;
        ath.updateSession();

        // override defaults that are dependent on each other
        if ( ath.options && ath.options.debug && ( typeof ath.options.logging === "undefined" ) ) {
            ath.options.logging = true;
        }

        // normalize some options
        ath.options.mandatory = ath.options.mandatory && ( 'standalone' in window.navigator ||
                ath.options.debug );

        //this is forcing the user to add to homescreen before anything can be done
        //the ideal scenario for this would be an enterprise business application
        //could also be a part of an onboarding workflow for a SAAS
        ath.options.modal = ath.options.modal || ath.options.mandatory;

        if ( ath.options.mandatory ) {
            ath.options.startDelay = -0.5; // make the popup hasty
        }

        // setup the debug environment
        if ( ath.options.debug ) {
            platform.isCompatible = true;
        }

        if ( ath.options.onInit ) {
            ath.options.onInit.call( ath );
        }

        if ( ath.options.autostart ) {
            ath.doLog( "Add to homescreen: autostart displaying callout" );
            ath.show();

        } else if ( !nativePrompt ) {
            ath.show();
        }
    }

</script>



<div class="modal" class:is-active="{modalOpen}">
    <div class="modal-background"></div>
    <div class="modal-content">
        <div class="ath-container banner-center-left" style="display: block;">

            <div class="columns mx-3 mt-3">
                <div class="column is-half-tablet is-offset-one-quarter-tablet">

                    <div class="title is-5">
                        <p>{text.title}</p>
                    </div>

                    <div class="d-flex justify-content-around">
                        <button class="button is-success btn-install-ath">{text.install}</button>
                        <button class="button is-outlined is-link btn-cancel-ath">{text.notNow}</button>
                    </div>

                    <div class="has-text-center">
                        <img src="pwa/pwa-logo-50x50.png" alt="PWA" class="ath-prompt-logo">
                    </div>

                </div>
            </div>
        </div>

    </div>
    <button class="modal-close is-large" aria-label="close" on:click={btnClose}></button>
</div>




<style>
    .ath-container {
        position: fixed;
        display: none;
        flex-direction: column;
        z-index: 1000;
        width: 100%;
        background-color: #eee;
        color: #000;
        padding: 1%;
        text-align: center;
    }

    .banner-top-left {
        top: 0;
        left: 0;
    }

    .banner-top-right {
        top: 0;
        right: 0;
    }

    .banner-bottom-left {
        left: 0;
        bottom: 0;
    }

    .banner-bottom-right {
        right: 0;
        bottom: 0;
    }

    .banner-center {
        left: 25%;
        top: 25%;
    }

    .banner-center-left {
        top: 25%;
        left: 0;
    }

    .banner-center-right {
        top: 25%;
        right: 0;
    }

    .banner-top-center {
        width: 50%;
        left: 25%;
        top: 12px;
    }

    .banner-bottom-center {
        bottom: 12px;
    }
</style>
