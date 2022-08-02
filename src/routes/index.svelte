<script context="module">
    import ProjectCard from '$lib/components/project-card.svelte'
    import { client } from '$lib/graphql-client'
    import { authorsQuery, projectsQuery } from '$lib/graphql-queries'
  
    export const load = async () => {
  
      const [authorReq, projectsReq] = await Promise.all([
        client.request(authorsQuery),
        client.request(projectsQuery),
      ])

      const {authors} = authorReq
      const {projects} = projectsReq

      return {
        props: {
          projects,
          authors,
        },
      }
    }
  </script>

<script>
    export let projects
    export let authors
  </script>
  
  <svelte:head>
  <title>Portfolio of Geoff Maddock</title>
</svelte:head>

<h1>Portfolio :: Geoff Maddock</h1>

  {#each authors as { name, intro, picture } }
  <div class="flex mb-40 items-end">
    <div class="mr-6">
      <h2 class="text-3xl mb-4 font-bold tracking-wider">{name}</h2>
      <p class="text-xl mb-4">{intro}</p>
    </div>

    <img class="mask mask-squircle h-48" src={picture.url} alt={name} />
  </div>
{/each}

<div class="grid gap-10 md:grid-cols-4 md:px-10 lg:grid-cols-6 lg:-mx-52">

  {#each projects as { name, slug, description, image }}
    <ProjectCard {name} {description} url={image[0].url} {slug}/>
  {/each}
</div>