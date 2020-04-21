import PageOne from '/imports/both/Pages/pageOne.svelte'
import PageTwo from '/imports/both/Pages/pageTwo.svelte'
import PageThree from '/imports/both/Pages/pageThree.svelte'


const routes = [

    {
        name: "/pageOne",
        component: PageOne,
    },

    {
        name: "/pageTwo",
        component: PageTwo,
    },

    {
        name: "/pageThree",
        component: PageThree,
    }


];

export {routes}
