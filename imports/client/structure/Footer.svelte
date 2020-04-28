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
    import {lang} from '/imports/client/structure/systemStores'
    let lng = $lang;

    //** get component text strings
    import {i18n} from '/imports/functions/func-i18n'
    import text from './Footer_text'

    let showWidget = true;

    //** meteor stuff
    let loc = Session.get("userPosition");

    console.log("loc", loc);

</script>

<footer class="mt-5 pt-2 has-border-top is-hidden-mobile">

    <div class="level text-0dot9em">
        <div class="level-left">
            <strong>Copyright &copy; {version.COPYRIGHT} {i18n(text, "copyright", $lang)}
                <a href="http://www.google.com">{i18n(text, "company", $lang)}</a>
            </strong>
        </div>

        <div class="level-right">
            <div><b>{version.APP_NAME}: </b>{version.VERSION}</div>
        </div>
    </div>


    <!-- for dev and test only -->
    {#if showWidget}
    <div class="text-0dot8rem" style="margin-bottom: 50px;">
        <span>lat: location.lat</span>
        <span class="ml-3">lng: location.lng</span>
    </div>
    {/if}

</footer>
