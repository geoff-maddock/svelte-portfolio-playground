<script>
    import { createEventDispatcher } from 'svelte'
    import ProjectCard from './project-card.svelte';
    const dispatch = createEventDispatcher();
    
    let email
    let password
    let name
    let error

    async function register() {
        error = undefined
        try {
            const res = await fetch('/auth/register', {
                method: 'POST',
                body: JSON.stringify({
                    email,
                    password,
                    name
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            
            console.log('fetch');
            console.log(res)
            if (res.ok) {
                dispatch('success')
            } else {
                error = 'An error occurred with register'
            }
        } catch (err) {
            console.log(err)
            error = 'An error occurred in trycatch'
        }

    }
</script>

<h1>Register</h1>
<input type="email" bind:value={email} placeholder="Enter your email" class="input input-bordered" minlength="3"/>
<input type="password" bind:value={password} placeholder="Enter your password" class="input input-bordered" minlength="3"/>
<input type="text" bind:value={name} placeholder="Enter your name" class="input input-bordered"/>
{#if error}<p>{error}</p>{/if}
<button on:click={register} class="btn">Register</button>