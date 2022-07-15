
<script>
    import Login from '../../components/auth/Login.svelte'
    import {goto} from '$app/navigation'
    import {session} from '$app/stores'
    import { onMount } from 'svelte';
    
    onMount(() => {
        if ($session.user.exists == true) {
            redirectToApp()
        }
    })

    function redirectToApp() {
        goto('/ddtamn/app')
    }
</script>
<Login on:success={redirectToApp}/>