<script>
  export let url = ''
  export let name = ''
  export let slug = ''
  export let description = ''
</script>

<div>
  <img src='{url}' alt={name} />
  <a href={`/projects/${slug}`}>
    <div>
      <h2>{name}</h2>
      <p>
        {description.slice(0, 80)}...
      </p>
    </div>
  </a>
</div>