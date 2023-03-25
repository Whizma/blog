<script lang="ts">
  import { onMount } from 'svelte';
  interface Post {
    id: number;
    title: string;
    content: string;
    author: string;
    created_at: string;
    updated_at: string;
  }

  let posts: Post[] = [];

  onMount(async () => {
    const res = await fetch('http://localhost:3000/api/posts');
    posts = await res.json();
  });

</script>

<h1>Posts</h1>

<ul>
  {#each posts as post}
    <li>{post.title}</li>
  {/each}
</ul>
