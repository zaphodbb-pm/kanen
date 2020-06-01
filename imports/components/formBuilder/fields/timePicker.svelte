<script>
    /**
     * Time picker popup.
     *
     * @memberof Components
     * @function timePicker
     * @locus Client
     * @augments fieldWrapper
     *
     * @param {Object} field
     *
     * @emits: 'on-inputentry' {value: value, error: errorVal} with text, number or other types
     *
     */

    //* common props from parent
    export let field = {};

    //* support functions
    import {getContext, createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();
    let formText = getContext("formText");
    let labels = formText[field.field] && formText[field.field].tag ? formText[field.field].tag : {};

    //* local reactive variable
    let inValue = "";

    let pickOpen = false;
    let disableSave = true;

    let saveMinutes = false;
    let saveHours = false;
    let saveDay = false;

    let minutes = createMinutes( field.params.minuteIncrement);
    let hours = createHours( field.params.timeStart, field.params.timeEnd,  field.params.hr12);
    let pickDay = field.params.hr12 ? -1 : "";
    let pickMinute = -1;
    let pickHour = -1;

    $: setValue(field.value);


    //* functions that mutate local variables
    function setValue(val){
        inValue = showStoreTime(val, field.params.hr12);
        useStoreTime(val, field.params.hr12);
    }

    function openPicker(){
        pickOpen = !pickOpen;
    }

    function getMinutes(min){
        pickMinute = min;
        checkDisable();
    }

    function getHours(hr){
        pickHour = hr;
        checkDisable();
    }

    function getDay(day){
        pickDay = day;
        checkDisable();
    }

    function saveTime(){
        if(!disableSave){
            inValue = formatStoreTime(pickHour, pickMinute, pickDay, field.params.hr12);

            dispatch('on-inputentry', {value: inValue, error: false}  );
            clearTime();
            pickOpen = false;
        }
    }

    function useStoreTime(val, ampm){

        if(typeof val !== 'string' || !val.includes(":")){
            clearTime();
            return "";
        }

        let frag = val.split(":");
        let hour = parseInt( frag[0] );
        pickHour = ampm ? ( (hour <= 12) ? hour : hour - 12 ) : hour ;
        pickMinute = parseInt( frag[1] );
        pickDay = ampm ? ( (hour <= 12) ? "am" : "pm" ) : "";
    }

    function checkDisable(){
        disableSave = (pickMinute === -1) || (pickHour === -1) || (pickDay === -1);
    }

    function clearTime(){
        pickMinute = -1;
        pickHour = -1;
        pickDay = field.params.hr12 ? -1 : "";
    }

    function closePopup(){
        pickOpen = false;
    }


    //* pure functions
    function createMinutes(inc){
        let i = 0;
        let out = [];

        while (i < 60) {
            out.push(i);
            i = i + inc;
        }

        return out;
    }

    function createHours(start, end, type){
        let out = [];
        let begin = type ? 1 : start;
        let stop = type ? 12 : end;
        let i = begin;

        while (i <= stop) {
            out.push(i);
            i = i + 1;
        }

        return out;
    }

    function formatStoreTime(hr, min, day, ampm){
        let offset = ampm && (day === "pm") ? 12 : 0;
        hr = hr + offset;

        //* add leading zero to hours
        if (hr < 10) {
            hr = "0" + hr.toString();
        }

        //* add leading zero to minutes
        if (min < 10) {
            min = "0" + min.toString();
        }

        return `${hr}:${min}`
    }

    function showStoreTime(val, ampm){
        //** check for valid time string
        if(typeof val !== 'string' || !val.includes(":")){
            return "";
        }

        let frag = val.split(":");
        let hr = parseInt( frag[0] );
        let min = parseInt( frag[1] );

        let suffix = ampm ? ( (hr <= 12) ? "am" : "pm" ) : "";

        if (hr > 12 && ampm) {
            hr = hr - 12;
        }

        if (hr < 10 && !ampm) {
            hr = "0" + hr.toString();
        }

        //* add leading zero to minutes
        if (min < 10) {
            min = "0" + min.toString();
        }

        return `${hr}:${min} ${suffix}`
    }

</script>


<div class="time-picker">

    <input type="text"
           class="input"
           bind:value="{inValue}"
           on:click="{openPicker}">


    {#if pickOpen}
        <div class="card pop-up">
            <div class="buffer-small">
                <div class="buffer-small">
                    <p class="has-text-weight-semibold">{labels.hours}</p>

                    <div class="columns is-multiline">
                        <div class="column">
                            {#each hours as hour}
                                <button class="button is-primary is-small has-text-weight-semibold mr-2 mb-2 {hour !== pickHour ? 'is-outlined' : ''}"
                                        style="width: 2.5rem"
                                        on:click="{() => getHours(hour)}">

                                    {hour}
                                </button>
                            {/each}
                        </div>
                    </div>
                </div>

                <div class="buffer-small">
                    <p class="has-text-weight-semibold">{labels.minutes}</p>

                    {#each minutes as minute}
                        <button class="button is-primary is-small has-text-weight-semibold mr-3 {minute !== pickMinute ? 'is-outlined' : ''}"
                                on:click="{() => getMinutes(minute)}">

                            {minute}
                        </button>
                    {/each}
                </div>

                {#if field.params.hr12}
                    <div class="buffer-small">
                        <p class="has-text-weight-semibold">{labels.hr12}</p>

                        <button class="button is-primary is-small has-text-weight-semibold mr-3 {'am' !== pickDay ? 'is-outlined' : ''}"
                                on:click="{() => getDay('am')}">
                            am
                        </button>

                        <button class="button is-primary is-small has-text-weight-semibold mr-3 {'pm' !== pickDay ? 'is-outlined' : ''}"
                                on:click="{() => getDay('pm')}">
                            pm
                        </button>
                    </div>
                {/if}
            </div>

            <footer class="card-footer">
                <a class="card-footer-item  {disableSave ? 'is-disabled' : ''}"  on:click="{saveTime}">{labels.save}</a>
                <a class="card-footer-item" on:click="{clearTime}">{labels.clear}</a>
                <a class="card-footer-item" on:click="{closePopup}">{labels.close}</a>
            </footer>
        </div>
    {/if}

</div>



<style>

    .time-picker {
        position: relative;
    }

    .pop-up {
        position: absolute;
        top: 3rem;
        width: 20rem;
        max-width: 20rem;
        z-index: 40;
        background-color: #f8f8f8;
    }

    .is-disabled {
        color: #CCC;
        cursor: not-allowed;
    }

</style>
