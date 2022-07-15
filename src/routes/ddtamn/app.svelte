<script context="module">
    export const load = async ({session}) => {
        if(session.user.exists) {
            return {}
        }
        else {
            return {
            status : 301,
            redirect : '/ddtamn'
        }
        }
        
    }
</script>

<script>
    import '../../css/style.css'
    import {session} from '$app/stores'
    import {request} from '../ddtamn/fetch.js'

    const signOut = async () => {
        await request('/ddtamn/auth', "DELETE");
        window.location.replace('/ddtamn');
    }

</script>

<h1>Welcome {$session.user.email}</h1>
<button on:click="{signOut}">Signout</button>