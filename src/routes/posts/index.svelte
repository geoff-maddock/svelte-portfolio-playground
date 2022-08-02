<script context="module">
    import { client } from '$lib/graphql-client'
    import { postsQuery } from '$lib/graphql-queries'
    import { marked } from 'marked'
  
    export const load = async () => {
      const { posts } = await client.request(postsQuery)
  
      return {
        props: {
          posts,
        },
      }
    }
  </script>

<script>
    export let posts
  </script>
  
  <svelte:head>
    <title>Portfolio | Blog</title>
  </svelte:head>

  <h1 class="text-4xl mb-10 font-extrabold">Blog posts</h1>

  {#each posts as { title, slug, content, coverImage, tags }}
    <div class="card text-center shadow-2xl mb-20">
        <figure class="">
            <img class="" src={coverImage.url} alt={`Cover image for ${title}`}/>
        </figure>
    </div>
  {/each}