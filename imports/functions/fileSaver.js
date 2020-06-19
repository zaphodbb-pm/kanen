/**
 * @summary Meteor friendly file saver.
 *
 * @memberof Functions
 * @function fileSaver
 * @locus Client
 *
 * @param {Array} blob - prepared data
 * @param {String} name - file name to send data to
 * @param {Object} opts = options to apply
 * @param {Object} popup - page wondow object
 *
 * @return nothing
 *
 * @see {@link https://github.com/eligrey/FileSaver.js/blob/master/src/FileSaver.js}
 *
 */

export function fileSaver(blob, name, opts, popup) {
    let a;

    switch (true) {

        case 'download' in HTMLAnchorElement.prototype:
            let URL = window.URL || window.webkitURL;
            a = document.createElement('a');
            name = name || blob.name || 'download';

            a.download = name;
            a.rel = 'noopener'; // tabnabbing

            if (typeof blob === 'string') {
                // Support regular links
                a.href = blob;
                if (a.origin !== location.origin) {
                    corsEnabled(a.href) ? download(blob, name, opts) : click(a, a.target = '_blank');
                } else {
                    click(a)
                }
            } else {
                // Support blobs
                a.href = URL.createObjectURL(blob);
                Meteor.setTimeout(function () {
                    URL.revokeObjectURL(a.href)
                }, 40000); // 40s
                Meteor.setTimeout(function () {
                    click(a)
                }, 0)
            }
            break;

        case 'msSaveOrOpenBlob' in navigator:
            name = name || blob.name || 'download';

            if (typeof blob === 'string') {
                if (corsEnabled(blob)) {
                    download(blob, name, opts)
                } else {
                    a = document.createElement('a');
                    a.href = blob;
                    a.target = '_blank';
                    setTimeout(function () {
                        click(a)
                    });
                }
            } else {
                navigator.msSaveOrOpenBlob(bom(blob, opts), name);
            }
            break;

        default:
            // Open a popup immediately do go around popup blocker
            // Mostly only available on user interaction and the fileReader is async so...
            popup = popup || open('', '_blank');
            if (popup) {
                popup.document.title =
                    popup.document.body.innerText = 'downloading...'
            }

            if (typeof blob === 'string') return download(blob, name, opts);

            let force = blob.type === 'application/octet-stream';
            let isSafari = /constructor/i.test(_global.HTMLElement) || _global.safari;
            let isChromeIOS = /CriOS\/[\d]+/.test(navigator.userAgent);

            if ((isChromeIOS || (force && isSafari)) && typeof FileReader === 'object') {
                // Safari doesn't allow downloading of blob URLs
                let reader = new FileReader();
                reader.onloadend = function () {
                    let url = reader.result;
                    url = isChromeIOS ? url : url.replace(/^data:[^;]*;/, 'data:attachment/file;');
                    if (popup) {
                        popup.location.href = url;
                    } else {
                        location = url;
                    }
                    popup = null // reverse-tabnabbing #460
                };
                reader.readAsDataURL(blob)
            } else {
                let URL = _global.URL || _global.webkitURL;
                let url = URL.createObjectURL(blob);
                if (popup) {
                    popup.location = url;
                } else {
                    location.href = url;
                }
                popup = null; // reverse-tabnabbing #460
                Meteor.setTimeout(function () {
                    URL.revokeObjectURL(url)
                }, 40000) // 40s
            }
    }
}


function bom(blob, opts) {
    if (typeof opts === 'undefined') opts = {autoBom: false};
    else if (typeof opts !== 'object') {
        console.warn('Deprecated: Expected third argument to be a object');
        opts = {autoBom: !opts}
    }

    // prepend BOM for UTF-8 XML and text/* types (including HTML)
    // note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF
    if (opts.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
        return new Blob([String.fromCharCode(0xFEFF), blob], {type: blob.type})
    }
    return blob
}

function download(url, name, opts) {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.onload = function () {
        saveAs(xhr.response, name, opts)
    };

    xhr.onerror = function () {
        console.error('could not download file')
    };

    xhr.send()
}

function corsEnabled(url) {
    let xhr = new XMLHttpRequest();
    // use sync to avoid popup blocker
    xhr.open('HEAD', url, false);
    xhr.send();
    return xhr.status >= 200 && xhr.status <= 299
}

// `a.click()` doesn't work for all browsers (#465)
function click(node) {
    try {
        node.dispatchEvent(new MouseEvent('click'));
    } catch (e) {
        let evt = document.createEvent('MouseEvents');
        evt.initMouseEvent('click', true, true, window, 0, 0, 0, 80,
            20, false, false, false, false, 0, null);
        node.dispatchEvent(evt);
    }
}
