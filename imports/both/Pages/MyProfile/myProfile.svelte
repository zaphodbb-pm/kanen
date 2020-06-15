<script>
    /**
     * Layout for MyProfile page.
     *
     * @memberof Pages:MyProfile
     * @function myProfile
     * @locus Client
     *
     */


    //* page set-up boilerplate *************************************

    //** setup props to receive route data
    export let currentRoute;
    export let params;

    //** app services (getContext is often optional)
    import { setContext } from 'svelte';

    //** get the user language preference from store (optional)
    import {lang} from '/imports/client/systemStores'

    //** get page text information and set contexts for children components
    import {header, page} from './myProfile_text'

    setContext("pageHdr", header);
    setContext("pageText", page);

    //** get component configuration information and set contexts for children components
    import pageConfig from './myProfile_config'
    setContext("pageConfig", pageConfig);

    //** get the page header common component; component get gets its own translated text from "pageText" context
    import Hdr from '/imports/both/pageStructure/PageHeader.svelte'

    //****************************************************************



    //* page-body support **************************
    import config from './myProfile_config'
    import Form_Holder from '/imports/components/formBuilder/formHolder.svelte'
    import schema from './myProfile_form_schema'

    import {onMount, onDestroy} from 'svelte'
    import {i18n} from '/imports/functions/i18n'
    let formText = i18n(page, "form", $lang);

    //* local reactive variables
    let conf = config;
    let role = "";
    let editdoc = {};
    let directdoc = {};

    let submitted = false;
    let currentDoc = {};
    let showList = false;
    let showForm = false;
    let releaseEdit = false;

    let  baseProfile = {
        id: "",
        type: "create",
        coll: conf.form.coll,
        data: {email: " "},
    };


    onMount( () => {
        currentDoc = baseProfile;
        getMyDoc();
    });

    function docSent(msg) {
        if (msg) {
            getMyDoc();
        }
    }

    function getMyDoc() {
        currentDoc = baseProfile;

        //** get current logged in user
        let me = Meteor.user();

        if(me){
            currentDoc = {
                id: me._id,
                type: "edit",
                coll: conf.form.coll,
                data: me.profile,
            };
        }
    }

</script>



<Hdr />



<div class="columns">
    <div id="my-profile-display" class="column">

        <Form_Holder
                config="{conf.form}"
                {formText}
                {schema}
                {role}
                editdoc={currentDoc}
                {directdoc}

                on:doc-submitted="{docSent}"/>

    </div>
</div>
