<script context="module" >
    export async function load ({session,props})  {
        if (session.user) {
            console.log('user session exists')
            return {
                status: 302,
                redirect: '/'
            }
        }
        return { props }
    }
</script>
<script>
    import { session } from '$app/stores'
    import { send } from '$lib/api'

    export let error

    async function login(event) {
        const formEl = event.target 
        const response = await send(formEl)

        if (response.error) {
            error = response.error
        }

        $session.user = response.user 

        formEl.reset()
    }
</script>

<form
  on:submit|preventDefault={login}
  method="post"
  autocomplete="off"
>
  <div>
    <label for="email">Email</label>
    <input
      id="email"
      name="email"
      type="text"
      required
      class="input input-bordered" 
    />
  </div>

  <div>
    <label for="password">Password</label>
    <input
      id="password"
      name="password"
      type="password"
      required
      class="input input-bordered" 
    />
  </div>


  {#if error}
    <p class="error">{error}</p>
  {/if}


  <button type="submit" class="btn">Login</button>
</form>

<style>
  .error {
    color: tomato;
  }
</style>