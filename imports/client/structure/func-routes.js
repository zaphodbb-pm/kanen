/*

{
  name: 'about-us',
  component: About,
  layout: PublicLayout,
  redirectTo: 'company',
  onlyIf: { guard: userIsAdmin, redirect: '/login' },
  lang: { es: 'acerca-de' },
  nestedRoutes: [
    { name: 'our-values', component: CompanyValues, lang: { es: 'nuestros-valores' } }
  ]
}


 */


import PageOne from '/imports/both/Pages/pageOne/pageOne.svelte'
import PageTwo from '/imports/both/Pages/pageTwo/pageTwo.svelte'
import PageThree from '/imports/both/Pages/pageThree/pageThree.svelte'

import MainPage from './MainPage.svelte'


const routes = [

    {
        name: "/page-one",
        layout: MainPage,
        component: PageOne,

        icon: "iconHome",
        label: "Page One"
    },

    {
        name: "/page-two",
        layout: MainPage,
        component: PageTwo,

        icon: "iconPost",
        label: "Page Two"
    },

    {
        name: "/page-three",
        layout: MainPage,
        component: PageThree,

        icon: "iconLearn",
        label: "Page Three"
    },

    {
        name: "/404",
        layout: MainPage,
        component: PageOne,

        icon: "iconLearn",
        label: "404"
    }
];

export {routes}
