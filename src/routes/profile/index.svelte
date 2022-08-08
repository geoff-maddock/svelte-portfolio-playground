<script context="module">
    export async function load({session}) {
        console.log('load session')

        if (!session.authenticated) {
            return {
                status: 302,
                redirect: '/auth/login'
            }
        }
        return {
            status: 200,
            props: {
                email: session.user.email,
                name: session.user.name
            }
        }
    }   
</script>
<script>
    export let email
    export let name 
</script>

<h1>Profile</h1>
<p>Hello {name} you are logged in with the email {email}</p>