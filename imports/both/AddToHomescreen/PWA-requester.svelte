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

    import {getContext} from 'svelte'
    import {defaultSession, athDefaults} from "./func-athDefaults";
    import {getPlatform} from "./func-getPlatform";
    import {checkPlatform} from "./func-checkPlatform";
    import {nextPrime} from "./func-nextPrime";
    import {athMainClass} from "./func-class_athMain";

    let text = getContext("pwaText");

    //* prepare common variables
    let appID = athDefaults.appID;
    let nativePrompt = false;
    let platform = {};
    let _beforeInstallPrompt;
    let modalOpen = false;
    let instructions = null;

    //* load session
    let session = localStorage.getItem( appID );
    session = session ? JSON.parse( session ) : defaultSession;

    if ( session && session.added ) {
        console.log("session exists", session);
    }


    //* initialize component
    let initOpts = {
        onShow: function () {
            modalOpen = true;
        },
        onInit: function (ath) {
            console.log( "initializing");
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
        //debug: "iphone",
        logging: true
    };



    //* event handlers
    function btnClose(){
        modalOpen = false;
    }

    function btnNotNow(){
        if ( ath.options.onCancel ) {
            ath.options.onCancel();
        }
        btnClose();
    }

    function btnInstall(){
        if ( ath.options.onInstall ) {
            ath.options.onInstall();
        }

        let checkPlatform = getPlatform(platform, ath.options.debug);
        let isNative = checkPlatform === "native" || ath.options.debug === "native";

        if ( _beforeInstallPrompt && isNative ) {
            btnClose();
            triggerNativePrompt();
        } else {
            if ( ath.autoHideTimer ) {
                clearTimeout( ath.autoHideTimer );
            }

            let promptTarget = Object.assign({}, ath.options.customPrompt, ath.options.prompt[checkPlatform]);
            instructions = promptTarget.imgs;
        }
    }


    //* setup browser platform object
    platform = checkPlatform(window.navigator.userAgent);

    //* service worker check
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

    let ath =  new athMainClass( initOpts, platform, session, );


    //* for dev work only
    /*
    ath.removeSession();
    session.added = false;
    session.optedout = false;
    ath.updateSession();
    console.log("update session", session);
     */



    function autoHide() {
        btnNotNow();
    }

    function _delayedShow(ath) {
        setTimeout( _show(ath, platform, _beforeInstallPrompt), ath.options.startDelay * 1000 + 500 );
    }

    function _show(ath, platform, _beforeInstallPrompt){
        if ( ath.canPrompt() ) {
            if ( _beforeInstallPrompt && !ath.options.mustShowCustomPrompt ) {
                triggerNativePrompt();

            } else {
                if ( ath.options.lifespan && ath.options.lifespan > 0 ) {
                    ath.autoHideTimer = setTimeout( autoHide, ath.options.lifespan * 1000 );
                }
            }

            //** fire the custom onShow event
            if ( ath.options.onShow ) {
                ath.options.onShow.call( this );
            }

            //** increment the display count
            session.lastDisplayTime = Date.now();
            session.displayCount++;

            if ( ath.options.displayNextPrime ) {
                session.nextSession = nextPrime( session.sessions );
            }

            ath.updateSession();
        }
    }


    //* displays native A2HS prompt & stores results
    function triggerNativePrompt() {
        return _beforeInstallPrompt.prompt()
                .then( function ( evt ) {
                    return _beforeInstallPrompt.userChoice;     // Wait for the user to respond to the prompt
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
                        _delayedShow(ath);
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

    function beforeInstallPrompt( evt ) {
        console.log( "capturing the native A2HS prompt");

        evt.preventDefault();
        _beforeInstallPrompt = evt;
        _delayedShow(ath);
    }


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

    if ( document.readyState === "interactive" || document.readyState === "complete" ) {
        _delayedShow(ath);
    } else {
        document.onreadystatechange = function () {
            if ( document.readyState === 'complete' ) {
                _delayedShow(ath);
            }
        };
    }

</script>



<div class="modal" class:is-active="{modalOpen}">
    <div class="modal-background"></div>
    <div class="modal-card">
        <div class="modal-card-body">

            <div class="is-size-5 has-text-weight-semibold has-text-centered mb-3">
                {text.title}
            </div>

            <div class="d-flex justify-content-around align-items-center">
                <button class="button is-success" on:click={btnInstall}>{text.install}</button>
                <img src="pwa/pwa-logo-50x50.png" alt="PWA">
                <button class="button is-outlined is-link" on:click={btnNotNow}>{text.notNow}</button>
            </div>

            {#if instructions}
            <p class="has-text-centered mt-5 mb-3">{text.instructions}</p>
                {#each instructions as instruction}
                    <div class="has-text-centered">
                        <img src="{instruction.src}" alt="{instruction.alt}" class="">
                    </div>
                {/each}
            {/if}

        </div>
    </div>
    <button class="modal-close is-large" aria-label="close" on:click={btnClose}></button>
</div>
