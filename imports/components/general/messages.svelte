<script>

    /**
     * @summary Messages component to handle system wide notifications.
     *
     * @memberof Components:General
     * @function messages
     * @locus Client
     * @isTemplate true
     *
     * @param {String} color - css string to set element color (default "")
     * @param {Boolean} closable - adds an 'X' button that closes the notification    (default true)
     * @param {Number} duration -    if null or 0, stays open; else will close after x  milliseconds (default 5000)
     * @param {String} hasIcon    - if null or "", no icon will be shown; else is a valid icon class for Icon tag (default "")
     * @param {String} text - body text with optional html tags
     * @param {String} id - unique id for this element
     *
     * @see Based on work by {@link https://buefy.org/documentation/notification|Buefy}
     *
     */


    //* props
    export let msg = {
                color: "",
                closable: true,
                duration: 5000,
                hasIcon: "iconBeer",
                text: "n/a",
                id: ""
    }

    //* support functions
    import { getContext, onMount, onDestroy, createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    import {slide} from 'svelte/transition';
    import {quintOut} from 'svelte/easing';

    //* get components
    import Icon from '/imports/components/elements/icon.svelte'


    //* local reactive variables
    let showIcon = (msg.hasIcon && msg.hasIcon.length > 0);
    let timer = null;

    //* event handlers
    function close() {
        dispatch('message-close', msg.id);
    }

    //** Set timer to auto close message
    function setAutoClose() {
        if (msg.duration) {
            timer = setTimeout(() => {
                close();
            }, msg.duration);
        }
    }


    //* lifecycle controls
    onMount( () => {
        setAutoClose();
    });

    onDestroy( () => {
        clearTimeout(timer)
    })

</script>




<div transition:slide="{{delay: 100, duration: 300, easing: quintOut }}">

    <article class="notification {msg.color}">

        {#if msg.closable}
            <button class="delete" type="button" on:click="{close}"></button>
        {/if}

        <div class="media">
            {#if showIcon}
                <div class="media-left">
                    <Icon icon={getContext(msg.hasIcon)} class="text-2dot0rem"/>
                </div>
            {/if}

            <div class="media-content">{@html msg.text}</div>
        </div>

    </article>
</div>
