<script>
    /**
     * Progressive Web App requester.
     *
     * @memberof PWA
     * @function PWA-requester
     * @locus Client
     *
     */

    import './func-addtohomescreen'

    const text = {
        title: "Install this application to your home screen?",
        install: "Install",
        notNow: "Not Now"
    }

    let modalOpen = false;
    let session = {};

    //* initialize component
    let instance = addToHomescreen( {
        onShow: function () {
            console.log( "showing" );

            modalOpen = true;
        },
        onInit: function (_instance) {
            instance = _instance;
            console.log( "initializing", _instance );
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
    } );




    //* event handlers
    function btnInstall(){

        console.log("btnInstall", instance);

        if ( instance.beforeInstallPrompt ) {
            instance.triggerNativePrompt();
        } else {
            instance.optIn();
        }
    }

    function btnNotNow(){
        console.log("btnNotNow");
    }

    function btnClose(){
        modalOpen = false;
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
