<script>
    /**
     * Layout for Learn page.
     *
     * @memberof Pages:Learn
     * @function learn
     * @locus Client
     *
     */


    //* page set-up boilerplate *************************************

        //** setup props to receive route data (optional)
        export let currentRoute;
        export let params;

        //** page specific text and configuration
        import {header, page} from './learn_text'
        import {pageConfig} from './learn_config'

        //** app support files
        import { setContext, onMount } from 'svelte';
        import PageWrapper from '/imports/both/pageStructure/PageWrapper.svelte'

    //* end of page boilerplate *************************************


    //* page-body support **************************
    import {i18n} from '/imports/functions/i18n'
    import {lang} from '/imports/client/systemStores'
    import {messages} from '/imports/client/systemStores'

    import {getDocs} from '/imports/functions/getDocs'
    import {sortBy} from '/imports/functions/sortBy'
    import {generateId} from '/imports/functions/generateId'

    import Wiki_Toc from './wiki_toc.svelte'
    import Wiki_Content from './wiki_content.svelte'
    import Search_Box from '/imports/components/listCollections/searchbox.svelte'
    import Field_Wrapper from '/imports/components/formBuilder/fieldWrapper.svelte'
    import Modal_User from '/imports/components/blocks/modalUser.svelte'

    let formText = i18n(page, "form", $lang);
    setContext("formText", formText);
    setContext("pageText", page);

    let toc = i18n(page, "components", $lang).toc;
    let msgText = i18n(page, "components", $lang).messages;

    //* local reactive variables
    let showModal = false;
    let langComp = "all";
    let mode = true;
    let docId = "";

    let info = {
        lang: "all",
        tocTitles: [],
        pageid: "",

        clearSearch: false,
        showList: false,      // if true, show a list of found docs, else show one document from ToC
        list: [],

        fields: [
            {field: "name", key: "name", search: true},
            {field: "contentPage", key: "contentPage", search: true},
        ]
    }


    onMount( () => {
        buildToC(currentRoute);
    });

    //* event handlers
    function checkStateUser(msg) {
        showModal = msg.detail;
    }

    function addEvent(msg){
        let newMsg = {
            id: generateId(8),
            state: "add",
            text: msgText.msgAddEvent
        }

        $messages = [... $messages, newMsg];
    }

    function removeEvent(msg){
        let newMsg = {
            id: generateId(8),
            state: "remove",
            text: msgText.msgRemoveEvent,
        }

        $messages = [... $messages, newMsg];
    }

    function selectPage(msg) {
        info.list = null;
        info.showList = false;
        info.pageid = msg.detail;
        info.clearSearch = !info.clearSearch;
    }

    function newSearch(msg) {
        findDocs(msg.detail.query);
    }

    function fieldChanged(msg){
        let field = msg.detail;

        if(field.field === "getLang"){
            langComp = field.value._id;
            buildToC();
        }
    }

    function readMode(msg){
        mode = msg.detail.value;
    }

    async function showAuthor(msg) {
        docId = msg.detail._id;
        showModal = true;
    }

    function closeModal() {
        showModal = false;
    }

    //* support functions
    async function findDocs(query) {
        const sort = {sort: {name: 1}, limit: 100};
        let lang = langComp && (langComp === "all") ? {} : {"contentLang._id": {$in: [langComp, "all"]} };
        let compound = Object.assign({}, query, lang);

        if (query && Object.keys(query).length > 0) {
            let found = await getDocs("learn", "schemaLong", compound, sort);

            if (found.length > 0) {
                info.showList = true;
                info.list = found;
            }else{
                info.showList = false;
                info.list = [];
            }

        } else {
            info.list = null;
            info.showList = false;
        }
    }

    async function buildToC(item) {
        const sort = {sort: {name: 1}};
        let lang = langComp && (langComp === "all") ? {} : {"contentLang._id": {$in: [langComp, "all"]} };
        let compound = Object.assign({}, lang);
        let pages = await getDocs("learn", "listShort", compound, sort);

        info.tocTitles = structureToc(pages);

        //** check if a page of content is targeted from url parameter
        let target = item && item.queryParams && item.queryParams.item ? item.queryParams.item : null;

        if (Array.isArray(info.tocTitles) && info.tocTitles.length > 0) {
            if(target){
                info.pageid = target;
            }else{
                info.pageid = info.tocTitles[0]._id;
            }
        }
    }

    function structureToc(pages) {
        let adjPages = pages.map( (pg, idx) => {
            let hasParent = pages.find( (p) => p._id === pg.parentPage._id);
            pg.parent = hasParent ? pg.parentPage._id : "root";
            let children = pages.filter( (p) => p.parentPage._id === pg._id);

            if(children){
                pg.children = children.length > 1 ? sortBy(children, 'contentWeight') : children;
            }

            return pg;
        })

        let rootTop = adjPages.filter( (ap) => ap.parent === "root");
        rootTop = sortBy(rootTop, 'contentWeight');

        return rootTop;
    }

</script>



<PageWrapper {header} >

    <div class="columns">
        <div class="column is-one-fifth-fullhd is-one-quarter-desktop is-one-third-tablet">
            <Field_Wrapper
                    class=""
                    field="{pageConfig.components.getLang}"
                    watchFields="{ {} }"
                    on:field-changed="{fieldChanged}"/>

        </div>

        <div class="column">
            <Search_Box fields="{info.fields}" on:search-changed="{newSearch}" />
        </div>

        <div class="column is-one-quarter">
            <Field_Wrapper
                    class=""
                    field="{pageConfig.components.readMode}"
                    watchFields="{ {} }"
                    on:field-changed="{readMode}"/>
        </div>
    </div>

    <div class="columns mt-3">
        <div class="column is-one-fifth-fullhd is-one-quarter-desktop is-one-third-tablet">

            <Wiki_Toc
                    pageid="{info.pageid}"
                    tocHeader="{toc.title}"
                    tocTitles="{info.tocTitles}"
                    on:getpage="{selectPage}"/>

        </div>

        <div class="column">

            <Wiki_Content
                    pageid="{info.pageid}"
                    showList="{info.showList}"
                    list="{info.list}"
                    {mode}
                    on:push-author="{showAuthor}"
                    on:getpage="{selectPage}" />

        </div>

    </div>

    <Modal_User
            text="modal"
            {showModal}
            {docId}
            on:modal-addEvent={addEvent}
            on:modal-removeEvent={removeEvent}
            on:modalState={checkStateUser}/>

</PageWrapper>
