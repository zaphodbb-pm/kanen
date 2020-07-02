<script>

    /**
     * Layout for LogsUsers page.
     *
     * @memberof Pages:LogsUsers
     * @function logsUsers
     * @locus Client
     *
     */


    //* page set-up boilerplate *************************************

        //** setup props to receive route data (optional)
        export let currentRoute;
        export let params;

        //** page specific text and configuration
        import {header, page} from './logsUsers_text'
        import {pageConfig} from './logsUsers_config'

        //** app support files
        import { setContext } from 'svelte';
        import PageWrapper from '/imports/both/pageStructure/PageWrapper.svelte'

    //* end of page boilerplate *************************************



    //* page-body support **************************
    import {i18n} from '/imports/functions/i18n'
    import {lang} from '/imports/client/systemStores'

    import DeleteRecords from '/imports/components/elements/getRelativeDates.svelte'
    import List_Holder from '/imports/components/listCollections/listHolder.svelte'
    import listArray from './logsUsers_list'

    let listText = i18n(page, "list", $lang);
    let element = i18n(page, "element", $lang);

    let conf = pageConfig;
    let sort = listArray.sort;
    let fields = listArray.fields;
    let submitted = false;
    let releaseEdit = false;


    setContext("formText", element);

    //* event handlers
    function deleteRange(msg) {
        releaseEdit = false;
        let out = {updatedAt: msg.detail};

        Meteor.call("removeDocuments", "logsUsers", out, function (err, res) {
            if (err) {
                console.log("removeDocuments error", err)
            }

            if (res) {
                console.log("removeDocuments", res);
            }

            releaseEdit = true;
        })
    }

</script>




<PageWrapper {header} >

    <DeleteRecords on:new-range={deleteRange}/>

    <div class="columns">

        <article class="column">
            <List_Holder
                    config="{conf.list}"
                    {listText}
                    {fields}
                    {sort}
                    submitted="{releaseEdit}"/>

        </article>

    </div>

</PageWrapper>
