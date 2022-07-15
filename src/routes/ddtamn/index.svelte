<script>
    import Login from '../../components/auth/Login.svelte'
    import {goto} from '$app/navigation'

    function redirectToApp() {
        goto('/ddtamn/app')
    }
</script>
<Login on:success={redirectToApp}/>