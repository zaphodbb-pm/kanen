<script>
    /**
     * Selector to get a relative date range for database record deletion.
     * Typically used to help manage the records in logs collection.
     *
     * @memberof Components:Elements
     * @function getRelativeDates
     * @locus Client
     *
     * @emits 'new-range' - {$lt: now - ranges[radio] };
     */

    //* support files
    import Field_Wrapper from '/imports/components/formBuilder/fieldWrapper.svelte'
    import { createEventDispatcher, getContext, setContext } from 'svelte';
    const dispatch = createEventDispatcher();

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
        let radio = msg.detail && msg.detail.value && msg.detail.value._id ? msg.detail.value._id : "none";
        let now = Date.now();
        let day = 1000 * 3600 * 24;         // milliseconds per day;

        let ranges = {
            none: now,
            days_1: day,
            days_7: day * 7,
            days_30: day * 30,
            days_90: day * 90,
            days_365: day * 365,
            all: 0,
        }

        let out = {$lt: now - ranges[radio] };

        dispatch("new-range", out);
    }

</script>


<section class="get-relative-dates">

    <div class="mb-5" style="padding-top: 1rem;">
        <Field_Wrapper class="" {field} {watchFields} on:field-changed="{fieldChanged}"/>
    </div>

</section>
