<script>
    import Login from '$lib/components/login.svelte'
    import Register from '$lib/components/register.svelte'
    import { goto } from '$app/navigation'

    function redirectToProfile() {
        goto('/profile')
    }
</script>

<main>
    <h1>Auth with Cookies</h1>
    <Login on:success={redirectToProfile}/>
    <Register on:success={redirectToProfile}/>
</main>

<style>
    
</style>