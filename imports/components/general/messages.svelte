<script>

    /**
     * @summary Messages component to handle system wide notifications.
     *
     * @memberof Components:General
     * @function messages
     * @locus Client
     * @isTemplate true
     *
     * @see Based on work by {@link https://buefy.org/documentation/notification|Buefy}
     *
     * @notes
     *  1. typical message object format:
     *          id =        {String} unique id for this element
     *          color =     {String} css string to set element color (default "")
     *          closable =  {Boolean} adds an 'X' button that closes the notification    (default true)
     *          duration =  {Number} if null or 0, stays open; else will close after x  milliseconds (default 5000)
     *          hasIcon =   {String} if null or "", no icon will be shown; else is a valid icon class for Icon tag (default "")
     *          text =      {String} body text with optional html tags
     *
     *
     */


    //* support functions
    import {messages} from '/imports/client/systemStores'
    import { getContext, createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    import {slide} from 'svelte/transition';
    import {quintOut} from 'svelte/easing';

    //* get components
    import Icon from '/imports/components/elements/icon.svelte'


    //* on start up "use" function
    function setAutoClose(node, msg) {
        let timer = null;

        return {
            update() {
             if (msg.duration) {
                    timer = setTimeout(() => {
                        messageEnd(msg);
                    }, msg.duration);
                }
            },

            destroy() {
                clearTimeout(timer);
            }
        };
    }

    function messageEnd(msg){
        let removeMsg = $messages;
        $messages = removeMsg.filter( (m) => m.id !== msg.id);
    }

</script>




<aside class="alert-box-wrapper">
    {#each $messages as message (message.id)}

        <div class="my-2" use:setAutoClose={message}>
            <div transition:slide="{{delay: 100, duration: 300, easing: quintOut }}">

                <article class="notification {message.color}">

                    {#if message.closable}
                        <button class="delete" type="button" on:click="{() => messageEnd(message) }"></button>
                    {/if}

                    <div class="media">
                        {#if message.hasIcon}
                            <div class="media-left">
                                <Icon icon={getContext(message.hasIcon)} class="text-2dot0rem"/>
                            </div>
                        {/if}

                        <div class="media-content">{@html message.text}</div>
                    </div>

                </article>

            </div>
        </div>

    {/each}
</aside>
