/* Add to Homescreen v4.0.0 ~ (c) 2019 Chris Love ~ @license: https://love2dev.com/pwa/add-to-homescreen/ */

import {defaultPrompt, defaultSession, athDefaults} from "./func-athDefaults";
import {getPlatform} from "./func-getPlatform";
import {checkPlatform} from "./func-checkPlatform";
import {nextPrime} from "./func-nextPrime";
import {buildGuidance} from "./func-buildGuidance";
import {showPlatformGuidance} from "./func-showPlatformGuidance";

( function (window, document, undefined ) {

	"use strict";

	/*
	       _   _ _____     _____
	 ___ _| |_| |_   _|___|  |  |___ _____ ___ ___ ___ ___ ___ ___ ___
	| .'| . | . | | | | . |     | . |     | -_|_ -|  _|  _| -_| -_|   |
	|__,|___|___| |_| |___|__|__|___|_|_|_|___|___|___|_| |___|___|_|_|
		by Matteo Spinelli ~ http://cubiq.org <-- No longer there :<
		Upgraded for PWA Support by Chris Love ~ https://love2dev.com/
	*/

    //* prepare common variables
    let appID = athDefaults.appID;
    let nativePrompt = false;
    let guidanceTargetURLs = [];
    let platform = {};
    let _instance;
    let _beforeInstallPrompt;

    //* load session
    let session = localStorage.getItem( appID );

    if ( session && session.added ) {
        return;
    }

    //* event handlers
    if ( "onbeforeinstallprompt" in window ) {
        window.addEventListener( "beforeinstallprompt", beforeInstallPrompt );
        nativePrompt = true;
    }

    if ( "onappinstalled" in window ) {
        window.addEventListener( "appinstalled", function ( evt ) {

            // TODO: update session object to reflect the PWA has been installed
            _instance.doLog( "a2hs", "installed" );

            session.added = true;
            _instance.updateSession();

            if ( this.options.onInstall ) {
                this.options.onInstall.call( this );
            }
        } );
    }

    //* setup browser platform object
    platform = checkPlatform(window.navigator.userAgent);

    platform.cancelPrompt = function ( evt ) {
        evt.preventDefault();
        if ( _instance.options.onCancel ) {
            _instance.options.onCancel();
        }
        platform.closePrompt();
        return false;
    };

    platform.closePrompt = function () {

        console.log("platform.closePrompt");

        /*
        let ath_wrapper = document.querySelector( _instance.options.athWrapper );
        if ( ath_wrapper ) {
            ath_wrapper.classList.remove( ..._instance.options.showClasses );
        }

         */
    };

    platform.handleInstall = function ( evt ) {
        if ( _instance.options.onInstall ) {
            _instance.options.onInstall();
        }

        let checkPlatform = getPlatform(platform, _instance.options.debug);

        if ( _beforeInstallPrompt && ( !_instance.options.debug || checkPlatform === "native" ) ) {
            platform.closePrompt();
            triggerNativePrompt();

            console.log("_beforeInstallPrompt", getPlatform(platform,  _instance.options.debug) === "native" );

        } else {

            if ( _instance.autoHideTimer ) {
                clearTimeout( _instance.autoHideTimer );
            }

            let promptTarget = Object.assign({}, defaultPrompt, _instance.options.customPrompt, _instance.options.prompt[checkPlatform]);
            let showImages = showPlatformGuidance( promptTarget );

            console.log("showImages", showImages);
        }

        return false;
    };


    //* setup main add-to-home object
    function ath( options ) {
        //prevent duplicate instances
        if ( !_instance ) {
            _instance || new ath.Class( options );
        }

        return _instance;
    }

    ath.defaults = athDefaults;

    ath.removeSession = function ( appID ) {
        localStorage.removeItem( appID || ath.defaults.appID );
    };

    ath.doLog = function ( logStr ) {
        if ( this.options.logging ) {
            console.log( logStr );
        }
    };

    ath.Class = function ( options ) {

        // class methods
        this.doLog = ath.doLog;

        // merge default options with user config
        this.options = Object.assign( {}, ath.defaults, options );

        _instance = this;

        if ( "serviceWorker" in navigator ) {
            let manifestEle = document.querySelector( "[rel='manifest']" );
            if ( !manifestEle ) {
                console.log( "no manifest file" );
                platform.isCompatible = false;
            }

            navigator.serviceWorker.getRegistration().then( afterSWCheck );
            guidanceTargetURLs = buildGuidance( this.options.prompt );
        } else {
            afterSWCheck( {} );
        }
    };




    session = session ? JSON.parse( session ) : defaultSession;





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
					_instance.doLog( "User accepted the A2HS prompt" );

					if ( _instance.options.onAdd ) {
						_instance.options.onAdd();
					}

				} else {

					if ( _instance.options.onCancel ) {
						_instance.options.onCancel();
					}

					session.optedout = true;
					_instance.doLog( "User dismissed the A2HS prompt" );
				}

				_instance.updateSession();
				_beforeInstallPrompt = null;
			} )
			.catch( function ( err ) {
				_instance.doLog( err.message );

				if ( err.message.indexOf( "user gesture" ) > -1 ) {
					_instance.options.mustShowCustomPrompt = true;
					_instance._delayedShow();
				} else if ( err.message.indexOf( "The app is already installed" ) > -1 ) {

					console.log( err.message );
					session.added = true;
					_instance.updateSession();

				} else {
					console.log( err );
					return err;
				}
			} );
	}


	function beforeInstallPrompt( evt ) {
		evt.preventDefault();
		console.log( "capturing the native A2HS prompt", _instance );
		_beforeInstallPrompt = evt;
		_instance._delayedShow();
	}



	function afterSWCheck( sw ) {
		_instance.sw = sw;

		if ( !_instance.sw ) {
			console.log( "no service worker" );
			platform.isCompatible = false;
		}

		session.sessions += 1;
		_instance.updateSession();

		// override defaults that are dependent on each other
		if ( _instance.options && _instance.options.debug && ( typeof _instance.options.logging === "undefined" ) ) {
			_instance.options.logging = true;
		}

		// normalize some options
		_instance.options.mandatory = _instance.options.mandatory && ( 'standalone' in window.navigator ||
			_instance.options.debug );

		//this is forcing the user to add to homescreen before anything can be done
		//the ideal scenario for this would be an enterprise business application
		//could also be a part of an onboarding workflow for a SAAS
		_instance.options.modal = _instance.options.modal || _instance.options.mandatory;

		if ( _instance.options.mandatory ) {
			_instance.options.startDelay = -0.5; // make the popup hasty
		}

		// setup the debug environment
		if ( _instance.options.debug ) {
			platform.isCompatible = true;
		}

		if ( _instance.options.onInit ) {
			_instance.options.onInit.call( _instance );
		}

		if ( _instance.options.autostart ) {
			_instance.doLog( "Add to homescreen: autostart displaying callout" );
			_instance.show();

		} else if ( !nativePrompt ) {
			_instance.show();
		}
	}

	ath.Class.prototype = {
		_canPrompt: undefined,

		//performs various checks to see if we are cleared for prompting
		canPrompt: function () {
			//already evaluated the situation, so don't do it again
			if ( this._canPrompt !== undefined ) {
				return this._canPrompt;
			}

			this._canPrompt = false;

            if ( _instance.options.customCriteria ) {
				let passCustom = false;

				if ( typeof _instance.options.customCriteria === "function" ) {
					passCustom = _instance.options.customCriteria();
				} else {
					passCustom = !!_instance.options.customCriteria;
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
		},

		show: function ( force ) {
			// message already on screen
			if ( _instance.shown ) {
				_instance.doLog( "Add to homescreen: not displaying callout because already shown on screen" );
				return;
			}

			_instance.shown = true;

			if ( document.readyState === "interactive" || document.readyState === "complete" ) {
				_instance._delayedShow();
			} else {
				document.onreadystatechange = function () {
					if ( document.readyState === 'complete' ) {
						_instance._delayedShow();
					}
				};
			}
		},

		_delayedShow: function ( e ) {
			setTimeout( _instance._show(), _instance.options.startDelay * 1000 + 500 );
		},

		_show: function () {
			if ( _instance.canPrompt() ) {
				if ( _beforeInstallPrompt && !_instance.options.mustShowCustomPrompt ) {
					triggerNativePrompt();

				} else {
					let target = getPlatform(platform, _instance.options.debug);
					let ath_wrapper = document.querySelector( _instance.options.athWrapper );

					if ( ath_wrapper && !session.optedout ) {
						ath_wrapper.classList.remove( _instance.options.hideClass );
						let promptTarget = Object.assign( {}, defaultPrompt, _instance.options.customPrompt, _instance.options.prompt[ target ] );

						if ( promptTarget.showClasses ) {
							promptTarget.showClasses = promptTarget.showClasses.concat( _instance.options.showClasses );
						} else {
							promptTarget.showClasses = _instance.options.showClasses;
						}

						for ( let index = 0; index < promptTarget.showClasses.length; index++ ) {
							ath_wrapper.classList.add( promptTarget.showClasses[ index ] );
						}

						//ath_wrapper.classList.add( ...promptTarget.showClasses );

						let ath_title = ath_wrapper.querySelector( _instance.options.promptDlg.title ),
							ath_logo = ath_wrapper.querySelector( _instance.options.promptDlg.logo ),
							ath_cancel = ath_wrapper.querySelector( _instance.options.promptDlg.cancel ),
							ath_install = ath_wrapper.querySelector( _instance.options.promptDlg.install );

						if ( ath_title && promptTarget.title ) {
							ath_title.innerText = promptTarget.title;
						}

						if ( ath_logo && promptTarget.src ) {
							ath_logo.src = promptTarget.src;
							ath_logo.alt = promptTarget.title || "Install PWA";
						}

						console.log("ath_install", _instance.options.promptDlg.install, ath_install);

						if ( ath_install ) {
							ath_install.addEventListener( "click", platform.handleInstall );
							//ath_install.classList.remove( _instance.options.hideClass );
                            /*
							ath_install.innerText = promptTarget.installMsg ? promptTarget.installMsg :
								( ( promptTarget.action && promptTarget.action.ok ) ? promptTarget.action.ok : _instance.options.promptDlg.action.ok );

                             */
						}

						if ( ath_cancel ) {
							ath_cancel.addEventListener( "click", platform.cancelPrompt );
							ath_cancel.classList.remove( _instance.options.hideClass );
							ath_cancel.innerText = promptTarget.cancelMsg ? promptTarget.cancelMsg :
								( ( promptTarget.action && promptTarget.action.cancel ) ? promptTarget.action.cancel : _instance.options.promptDlg.action.cancel );
						}
					}

					if ( this.options.lifespan && this.options.lifespan > 0 ) {
						_instance.autoHideTimer = setTimeout( this.autoHide, this.options.lifespan * 1000 );
					}
				}

				// fire the custom onShow event
				if ( this.options.onShow ) {
					this.options.onShow.call( this );
				}

				// increment the display count
				session.lastDisplayTime = Date.now();
				session.displayCount++;

				if ( _instance.options.displayNextPrime ) {
					session.nextSession = nextPrime( session.sessions );
				}

				this.updateSession();

			}
		},

		trigger: function () {
			this._show();
		},

		autoHide: function () {
			let target = getPlatform(platform, _instance.options.debug);
			let ath_wrapper = document.querySelector( _instance.options.athWrapper );

			if ( ath_wrapper ) {
				let promptTarget = _instance.options.prompt[ target ];
				promptTarget.showClasses = promptTarget.showClasses.concat( _instance.options.showClasses );

				ath_wrapper.classList.remove( ...promptTarget.showClasses );
				ath_wrapper.classList.add( _instance.options.hideClass );
			}
		},

		updateSession: function () {
			localStorage.setItem( this.options.appID, JSON.stringify( session ) );
		},

		clearSession: function () {
			session = defaultSession;
			this.updateSession();
		},

		optOut: function () {
			session.optedout = true;
			this.updateSession();
		},

		optIn: function () {
			session.optedout = false;
			this.updateSession();
		},

		clearDisplayCount: function () {
			session.displayCount = 0;
			this.updateSession();
		},

		platform: platform
	};

	// expose to the world
	window.addToHomescreen = ath;

} )( window, document );
