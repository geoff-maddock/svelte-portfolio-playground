<script>  
	import Footer from '$lib/components/footer.svelte'
	import Navbar from '$lib/components/navbar.svelte'
	import '../app.css';
</script>

<Navbar />
<main class="container max-w-3xl mx-auto px-4 mb-20">
	<slot />
</main>
<Footer />