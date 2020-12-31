<script>
    /**
     * Notifications widget for Navbar.
     *
     * @memberof Components:Elements
     * @function interest
     * @locus Client
     * @augments Navbar
     *
     */

    //** event handlers
    import { getContext, onMount } from 'svelte';
    import {createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();


    //* support files
    import {colors} from '/imports/both/systemGlobals'
    import Icon from '/imports/components/elements/icon.svelte'
    import {getDocs} from '/imports/functions/getDocs'
    import {timeAgo} from '/imports/functions/timeAgo'

    let text = getContext("navbar").notifications;

    //* local reactive variables
    let itemsToShow = 10;
    let items = [];
    let itemsLen = 0;
    let showItems = itemsToShow;
    let openNotes = false;

    onMount(() => {
        getMyNotifications();
    });


    async function getMyNotifications() {
        let me = Meteor.user();
        let now = new Date();
        now = now.toISOString();


        //***** for dev only
        me = me ? me : {_id: "abc"};
        const initVal = {
            header: "Msg Header",
            title: "Test Message",
            date: new Date( ( Date.now() + 1000 * 3600 * 3) ).toDateString(),
            location: "At a pub near you",
            msg: "Test Message",
            notifyId:  "abcdefg",
            itemId: "itemid-12345",
            timeAgo: timeAgo(Date.now() - 1000 * 3600 * 2 ),
            type: "INFO",
        }

        let unread = {};
        unread[me._id] = true;

        let query = {
            uids: me._id,
            validUntil: {$gte: now},
            unread
        };

        let options = {
            sort: {validUntil: 1},
            limit: itemsToShow
        };

        let notifications = await getDocs("notifications", "schemaLong", query, options);
        itemsLen = await getDocs("notifications", "schemaLong_count", query, {});

        items = notifications.map( (int) => {
            let out = int.msg;
            out.notifyId = int._id;
            out.itemId = int.itemId;
            out.timeAgo = timeAgo(int.updatedAt);
            out.type = int.itemType;
            return out;
        });


        //*** for dev purposes only
        if(itemsLen === 0){
            itemsLen = 1;
            items = [initVal];
        }

        showItems = itemsToShow;
    }

    function readNotify(item){
        console.log("message acknowledged");
    }

</script>


<div class="nav-notifications navbar-item has-dropdown is-hoverable">

    <a class="navbar-link is-arrowless">
        <span style="height: 1.5rem; position: relative;">
            <Icon icon={getContext("iconNotify")} class="text-1dot5rem"   />
            <span class="badge is-danger">{itemsLen}</span>
        </span>
    </a>

    <div class="navbar-dropdown is-right" style="overflow: scroll; max-height: 90vh;">
        {#each items as item, index (index)}

            <div class="navbar-item has-border-bottom has-text-black-bis mb-2">

                <div class="card w-100">
                    <header class="card-header" style="background-color: {colors[item.type]}">
                        <div class="card-header-title has-text-white-bis">
                            {item.header}
                        </div>
                    </header>

                    <div class="card-content" style="padding: 1rem;">
                        <div><b>{item.title}</b></div>
                        <div>{item.date}</div>
                        <div>{item.location}</div>

                        <div class="d-flex justify-content-between align-items-center mt-2">
                            <div class="has-text-grey d-flex align-items-center">
                                <Icon icon={getContext("iconClock")} class="text-0dot9rem"/>
                                <span class="pl-2">{item.timeAgo}</span>
                            </div>

                            <button class="button is-small is-primary is-outlined ml-3" on:click="{() => readNotify(item)}">
                                {text.read}
                            </button>
                        </div>
                    </div>
                </div>

            </div>

        {/each}
    </div>

</div>
