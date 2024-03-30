import { getToken } from './helpers';
import API_URL from './API';

// Loader - All Posts page
export async function allPostsLoader() {
  try {
    const res = await fetch(`${API_URL}/posts`);
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
    const res = await fetch(`${API_URL}/posts/${postId}`);
    if (!res.ok) {
      throw new Error('Failed to fetch.');
    }
    const post = await res.json();
    return post;
  } catch (error) {
    return error;
  }
}

// Loader - All Comments page
export async function allCommentsLoader() {
  try {
    const res = await fetch(`${API_URL}/posts/all/comments/all`);
    if (!res.ok) {
      throw new Error('Failed to fetch.');
    }
    const allComments = await res.json();
    return allComments;
  } catch (error) {
    return error;
  }
}

// Loader - Edit and Delete Comment pages
export async function commentLoader(postId, commentId) {
  try {
    const res = await fetch(
      `${API_URL}/posts/${postId}/comments/${commentId}`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      },
    );
    if (!res.ok) {
      throw new Error('Failed to fetch.');
    }
    const comment = await res.json();
    return comment;
  } catch (error) {
    return error;
  }
}
