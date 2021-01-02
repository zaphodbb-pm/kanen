<script>
    /**
     * Layout for users page.
     *
     * @memberof Pages:Users
     * @function users
     * @locus Client
     *
     */


    //* page set-up boilerplate *************************************

        //** setup props to receive route data (optional)
        export let currentRoute;
        export let params;

        //** page specific text and configuration
        import {header, page} from './users_text'
        import {pageConfig} from './users_config'

        //** app support files
        import PageWrapper from '/imports/both/PageStructure/PageWrapper.svelte'

    //* end of page boilerplate *************************************


    //* page-body support **************************
    import {i18n} from '/imports/functions/i18n'
    import {lang} from '/imports/client/systemStores'
    import {deepClone} from '/imports/functions/deepClone'

    import schema from './users_form_schema'
    import listArray from './users_list'
    import List_Form from '/imports/components/listForm/listForm.svelte'

    let formText = i18n(page, "form", $lang);
    let listText = i18n(page, "list", $lang);
    let conf = deepClone(pageConfig);

</script>




<PageWrapper {header} >

    <List_Form
            confList="{conf.list}"
            listArray="{listArray}"
            listText="{listText}"
            confForm="{conf.form}"
            schema="{schema}"
            formText="{formText}"
    />

</PageWrapper>
