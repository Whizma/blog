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
    const res = await fetch('http://localhost:3000/posts');
    posts = await res.json();
  });

</script>

<h1>Posts</h1>

<ul>
  {#each posts as post}
    <li>
      <h2>
        {post.title}
      </h2>
      <h3>
        {post.content}
      </h3>
      <h4>
        {"posted by " + post.author + " at " + post.created_at}
      </h4>
    </li>
  {/each}
</ul>
