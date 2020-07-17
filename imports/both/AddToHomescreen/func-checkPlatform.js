/**
 * @summary Returns a browser name.
 *
 * @memberof PWA
 * @function checkPlatform
 * @locus Client
 *
 * @param {Object} _ua -user agent from browser
 *
 * @return {Object} - active browser
 *
 */


export function checkPlatform(_ua) {
    // browser info and capability
    let platform = {};

    platform.isIDevice = ( /iphone|ipod|ipad/i ).test( _ua );
    platform.isSamsung = /Samsung/i.test( _ua );
    platform.isFireFox = /Firefox/i.test( _ua );
    platform.isOpera = /opr/i.test( _ua );
    platform.isEdge = /edg/i.test( _ua );

    // Opera & FireFox only Trigger on Android
    if ( platform.isFireFox ) {
        platform.isFireFox = /android/i.test( _ua );
    }

    if ( platform.isOpera ) {
        platform.isOpera = /android/i.test( _ua );
    }

    platform.isChromium = ( "onbeforeinstallprompt" in window );
    platform.isInWebAppiOS = ( window.navigator.standalone === true );
    platform.isInWebAppChrome = ( window.matchMedia( '(display-mode: standalone)' ).matches );
    platform.isMobileSafari = platform.isIDevice && _ua.indexOf( 'Safari' ) > -1 && _ua.indexOf( 'CriOS' ) < 0;
    platform.isStandalone = window.matchMedia( '(display-mode: standalone)' ).matches ||
        window.navigator.standalone === true ||
        platform.isInWebAppiOS ||
        platform.isInWebAppChrome;
    platform.isiPad = ( platform.isMobileSafari && _ua.indexOf( 'iPad' ) > -1 );
    platform.isiPhone = ( platform.isMobileSafari && _ua.indexOf( 'iPad' ) === -1 );
    platform.isCompatible = ( platform.isChromium || platform.isMobileSafari ||
        platform.isSamsung || platform.isFireFox || platform.isOpera );

    // console.log( "platform.isiPhone: " + platform.isiPhone );
    // console.log( "platform.isMobileSafari: " + platform.isMobileSafari );
    // console.log( "platform.isInWebAppiOS: " + platform.isInWebAppiOS );
    // console.log( "platform.isCompatible: " + platform.isCompatible );

    return platform;
}
