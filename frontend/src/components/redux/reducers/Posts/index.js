import { createSlice } from "@reduxjs/toolkit";

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    addPost: (state, action) => {
      state.posts.unshift(action.payload);
    },
    deletePost: (state, action) => {
      const filters =state.posts.filter((post, index) => action.payload !== post.id );
      state.posts =filters
    },
    filter_like: (state, action) => {
      state.posts.map((post, i) => {
        if (post.id === action.payload.id) {
          post.like_count = action.payload.num;
        }
        return post;
      });
    },
    setCommentByPostId: (state, action) => {
      state.posts.map((post, index) => {
        if (post.id === action.payload.id) {
          post.commentsByPostId = action.payload.comments;
        }
      });
    },
    addCommentByPostId: (state, action) => {
      state.posts.map((post, index) => {
        if (post.id === action.payload.id) {
          if (!post.commentsByPostId) {
            post.commentsByPostId = action.payload.comment;
          } else {
            post.commentsByPostId.push(action.payload.comment);
          }
        }
      });
    },
  },
});

export const {
  setPosts,
  filter_like,
  addPost,
  setCommentByPostId,
  addCommentByPostId,
  deletePost,
} = postsSlice.actions;

export default postsSlice.reducer;
