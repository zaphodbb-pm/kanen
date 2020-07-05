<script>

    /**
     * @summary Modal display for user schema information information from a list item.
     *
     * @memberof Components:Blocks
     * @function modalUser
     * @locus Client
     *
     * @param {Boolean} showModal - turns modal on or off
     * @param {String} text - target for text package
     * @param {Object} modalInfo - {user info}
     *
     * @emits modal-addEvent - doc id
     * @emits modal-removeEvent - doc id
     *
     * @return nothing
     *
     */

    //* setup props to receive component data
    export let showModal = false;
    export let docId = "";
    export let text;

    //* get the user language preference from store; text from context and support functions
    import { getContext } from 'svelte';
    import {lang} from '/imports/client/systemStores'
    import {i18n} from '/imports/functions/i18n'
    import {getDocs} from '/imports/functions/getDocs'
    import {timeAgo} from '/imports/functions/timeAgo'
    import {formatPhoneNumber} from '/imports/functions/formatPhoneNumber'

    //* get components
    import Icon from '/imports/components/elements/icon.svelte'


    //* local reactive variable
    let modalText = i18n(getContext("pageText"), "components", $lang)[text];
    let openModal = false;
    let info = null;

    //* respond to changes in props
    $: {
        openModal = showModal;

        if(showModal && docId){
            loadInfo(docId);
        }
    }


    //** event handlers
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    function btnClose() {
        openModal = false;
        dispatch('modalState', openModal);
    }

    function sendAddEvent() {
        dispatch('modal-addEvent', info._id);
        btnClose();
    }

    function sendRemoveEvent() {
        dispatch('modal-removeEvent', info._id);
        btnClose();
    }


    //** load key information based on props change
    async function loadInfo(id){
        let testInfo = await getDocs("authors", "listLong_one", {_id:  id}, {});
        info = Object.keys(testInfo).length > 0 ? testInfo : null;
    }

</script>




<div class="modal modal-user" class:is-active="{openModal}" class:is-clipped="{openModal}">
    <div class="modal-background"></div>
    <div class="modal-card">

        <header class="modal-card-head">
            <p class="modal-card-title">{modalText.title}</p>
            <button on:click="{btnClose}" class="delete" aria-label="close"></button>
        </header>

        <section class="modal-card-body">
            {#if docId && info}

                <table>
                    <tbody>

                        <tr>
                            <td rowspan="10">
                                {#if !!(info.profile && info.profile.image && info.profile.image.src)}
                                    <img src="{info.profile.image.src}" class="user-image" alt="user image">
                                {:else}
                                    <Icon icon={getContext("iconDefaultUser")} class="ml-3 mr-2 text-4dot0rem"/>
                                {/if}
                            </td>
                            <td class="is-modal-label has-text-right">{modalText.username}</td>
                            <td class="is-modal-value">{info.username}</td>
                        </tr>

                        <tr>
                            <td class="is-modal-label has-text-right">{modalText.name}</td>
                            <td class="is-modal-value">{info.profile && info.profile.name ? info.profile.name : ""}</td>
                        </tr>

                        <tr>
                            <td class="is-modal-label has-text-right">{modalText.role}</td>
                            <td class="is-modal-value">{info.role && info.role.name ? info.role.name : ""}</td>
                        </tr>

                        <tr>
                            <td class="is-modal-label has-text-right">{modalText.mainEmail}</td>
                            <td class="is-modal-value">{info.emails && info.emails[0] && info.emails[0].address ? info.emails[0].address : ""}</td>
                        </tr>

                        <tr>
                            <td class="is-modal-label has-text-right">{modalText.secondaryEmail}</td>
                            <td class="is-modal-value">{info.profile && info.profile.email ? info.profile.email : ""}</td>
                        </tr>

                        <tr>
                            <td class="is-modal-label has-text-right">{modalText.phone}</td>
                            <td class="is-modal-value">{info.profile && info.profile.phone ? formatPhoneNumber(info.profile.phone) : ""}</td>
                        </tr>

                        <tr>
                            <td class="is-modal-label has-text-right">{modalText.active}</td>
                            <td class="is-modal-value">{info.active}</td>
                        </tr>

                        <tr>
                            <td class="is-modal-label has-text-right">{modalText.updatedAt}</td>
                            <td class="is-modal-value">{info.updatedAt ? timeAgo(info.updatedAt) : ""}</td>
                        </tr>

                    </tbody>
                </table>

            {:else}

                <p>{modalText.noAccess}</p>

            {/if}
        </section>

        {#if info && (modalText.addEvent || modalText.removeEvent) }
            <footer class="modal-card-foot">
                {#if modalText.addEvent}
                    <button class="button is-primary" on:click="{sendAddEvent}">
                        {modalText.addEvent}
                    </button>
                {/if}

                {#if modalText.removeEvent}
                    <button class="button is-danger" on:click="{sendRemoveEvent}">
                        {modalText.removeEvent}
                    </button>
                {/if}
            </footer>
        {/if}

    </div>
</div>



<style>
    .is-modal-label {
        padding: 0 0.5rem;
    }

    .is-modal-value {
        padding: 0 0.5rem;
        font-weight: bold;
    }

    .user-image {
        height: 4rem;
        width: 4rem;
        margin-right: 2rem;
        border-radius: 50%;
    }

</style>
