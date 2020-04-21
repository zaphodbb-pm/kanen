<script>
  import { onMount } from 'svelte'

  import { SpaRouter } from '../Router/spa_router'
  import Route from '../Router/components/route.svelte'
  import { activeRoute } from '../Router/store'

  export let routes = []
  export let options = {}

  onMount(function() {
    SpaRouter(routes, document.location.href, options).setActiveRoute()
  })
</script>

<Route currentRoute={$activeRoute} />
