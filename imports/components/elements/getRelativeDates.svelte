<script>
    /**
     * Selector to get a relative date range for database record deletion.
     * Typically used to help manage the records in logs collection.
     *
     * @memberof Components:Elements
     * @function getRelativeDates
     * @locus Client
     *
     */

    //* support files
    import {userExtras} from '/imports/client/systemStores'
    import Field_Wrapper from '/imports/components/formBuilder/fieldWrapper.svelte'
    import Icon from '/imports/components/elements/icon.svelte'
    import { getContext, setContext } from 'svelte';

    //* component controls
    let text = getContext("formText");
    let watchFields = {};

    setContext("formText", {relativeDates: text});

    //* local reactive variables
    let field =     {
                field: "relativeDates",
                fieldType: "radios",
                optional: true,

                tab: 0,
                attributes: {},
                params: {cols: 4},
                defaultValue: {_id: "", name: ""},
            };

    //** event handlers
    function fieldChanged(msg){

        console.log("fieldChanged", msg.detail);

    }

</script>


<section class="get-relative-dates">

    <div class="mb-5" style="padding-top: 1rem;">
        <Field_Wrapper {field} {watchFields} on:field-changed="{fieldChanged}"/>
    </div>

</section>
