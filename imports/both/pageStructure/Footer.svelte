<script>

    /**
     * Footer component for MainPage
     *
     * @memberof Structure:Client
     * @function Footer
     * @locus Client
     * @augments MainPage
     *
     */

    //** get system wide info
    import { getContext } from 'svelte';
    let version = getContext("Version");

    //** get the user language preference from store
    import {sysConfig, showWidget, lang} from '/imports/client/systemStores'
    let lng = $lang;

    //** get component text strings
    import {i18n} from '/imports/functions/i18n'
    import text from './Footer_text'

    //let showPosition = false;
    let loc;

    //** user stuff
    import {userPosition} from '/imports/client/systemStores'
    $: loc = $userPosition;


</script>

<footer class="mt-6 pt-2 has-border-top is-hidden-mobile">

    <div class="level text-0dot9em">
        <div class="level-left">
            <strong>Copyright &copy; {version.COPYRIGHT} {i18n(text, "copyright", $lang)}
                <a href="http://www.google.com">{i18n(text, "company", $lang)}</a>
            </strong>
        </div>

        <div class="level-right">
            <div><b>{version.APP_NAME}: </b>{version.VERSION} ({version.LAST_UPDATE})</div>
        </div>
    </div>


    <!-- for dev and test only -->
    {#if $showWidget}
        <div class="text-0dot8rem mb-5">
            <span>lat: {loc.lat}</span>
            <span class="ml-3">lng: {loc.lng}</span>
        </div>
    {/if}

</footer>
