<script context="module" >
    // export async function load ({session,props})  {
    //     if (session.authenticated) {
    //         return {
    //             status: 302,
    //             redirect: '/'
    //         }
    //     }
    //     return { props}
    // }
</script>
<script>
    import { createEventDispatcher } from 'svelte'
    const dispatch = createEventDispatcher();
    
    let email
    let password
    let error

    async function login() {
        error = undefined
        try {
            const res = await fetch('/authentication/login', {
                method: 'POST',
                body: JSON.stringify({
                    email,
                    password
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (res.ok) {
                dispatch('success')
            } else {
                error = 'An error occurred'
            }
        } catch(err) {
            console.log(err)
            error = 'An error occurred'
        }

    }
</script>

<h1>Login</h1>
<input type="email" bind:value={email} placeholder="Enter your email" class="input-bordered input w-full max-w-xs" minlength="3"/>
<input type="password" bind:value={password} placeholder="Enter your password" class=" input-bordered input w-full max-w-xs" minlength="3"/>
<button on:click={login}  class="btn">Login</button>