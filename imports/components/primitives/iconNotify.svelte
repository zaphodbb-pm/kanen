<script>
    import Icon from 'svelte-awesome';
    import { beer, refresh, comment, codeFork, camera, ban } from 'svelte-awesome/icons';

    import bellO from 'svelte-awesome/icons/bell-o';


    import { getContext } from 'svelte';

    const answer = getContext('iconBeer');


</script>

<span class="icon">
    <Icon data={answer}/>
</span>
