<script lang="ts">
  interface Post {
    id: number;
    title: string;
    content: string;
    author: string;
    created_at: string;
    updated_at: string;
  }

  let posts: Post[] = [];

  fetch("/api/posts")
    .then((response) => response.json())
    .then((data) => {
      posts = data.posts;
    });
</script>

<h1>Posts</h1>

<ul>
  {#each posts as post}
    <li>{post.title}</li>
  {/each}
</ul>
