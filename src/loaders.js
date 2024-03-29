// Loader - All Posts page
export async function allPostsLoader() {
  try {
    const res = await fetch('http://localhost:3000/posts');
    if (!res.ok) {
      throw new Error('Failed to fetch.');
    }
    const allPosts = await res.json();
    return allPosts;
  } catch (error) {
    return error;
  }
}

// Loader - Edit and Delete Post pages
export async function postLoader(postId) {
  try {
    const res = await fetch(`http://localhost:3000/posts/${postId}`);
    if (!res.ok) {
      throw new Error('Failed to fetch.');
    }
    const post = await res.json();
    return post;
  } catch (error) {
    return error;
  }
}
