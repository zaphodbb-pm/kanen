import PageOne from '/imports/both/Pages/pageOne/pageOne.svelte'
import PageTwo from '/imports/both/Pages/pageTwo/pageTwo.svelte'
import PageThree from '/imports/both/Pages/pageThree/pageThree.svelte'


const routes = [

    {
        name: "/page-one",
        component: PageOne,
    },

    {
        name: "/page-two",
        component: PageTwo,
    },

    {
        name: "/page-three",
        component: PageThree,
    }


];

export {routes}
