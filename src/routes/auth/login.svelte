<script context="module" >
    export async function load ({session,props})  {
        if (session.user) {
            return {
                status: 302,
                redirect: '/'
            }
        }
        return { props}
    }
</script>
<script>
    import {session } from '$app/stores'

    export let error

    async function login(event) {
        const formEl = event.target 
        const response = await send(formEl)

        if (response.error) {
            error = response.error
        }
    }
</script>