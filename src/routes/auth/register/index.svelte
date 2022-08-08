<script context="module">

    export const load = ({ session, props }) => {
      if (session.user) {
        return {
          status: 302,
          redirect: '/',
        }
      }
  
      return { props }
    }
  </script>
<script>
    // import Register from '$lib/components/register.svelte'

    import { goto } from '$app/navigation'
    import { send } from '$lib/api'

    export let error
    export let success

    async function register(event) {
    error = ''

    const formEl = event.target
    const response = await send(formEl)

    if (response.error) {
        error = response.error
    }

    if (response.success) {
        success = response.success
    }

    formEl.reset()
   }

</script>

<form
  on:submit|preventDefault={register}
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

  <div>
    <label for="name">Name</label>
    <input
      id="name"
      name="name"
      type="text"
      required
      class="input input-bordered" 
    />
  </div>

  {#if error}
    <p class="error">{error}</p>
  {/if}

  {#if success}
    <div>
      <p>Thank you for signing up!</p>
      <p>
        <a href="/auth/login">You can log in.</a>
      </p>
    </div>
  {/if}

  <button type="submit" class="btn">Sign Up</button>
</form>

<style>
  .error {
    color: tomato;
  }
</style>