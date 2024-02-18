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
      const filters = state.posts.filter(
        (post, index) => action.payload !== post.id
      );
      state.posts = filters;
    },
    UpdatePost: (state, action) => {
      const UpdatePost = state.posts.map((elm, index) => {
        if (elm.id === action.payload.ID_post) {
          elm.media_url = action.payload.image;
          elm.content = action.payload.content;
        }
        return elm;
      });
      state.posts = UpdatePost;
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
    deleteCommentByPostId: (state, action) => {
      state.posts = state.posts.map((post) => {
        if (post.id === action.payload.postID) {
          post.commentsByPostId = post.commentsByPostId.filter(
            (comment) => comment.comment_id !== action.payload.commentID
          );
        }
        return post;
      });
    },
    UpdateCommentByPostId: (state, action) => {
      state.posts = state.posts.map((post) => {
        if (post.id === action.payload.id_post) {
          post.commentsByPostId = post.commentsByPostId.map((comment) => {
            if (comment.comment_id === action.payload.id_comment) {
              comment.content = action.payload.content;
            }
            return comment;
          });
        }
        return post;
      });
    }
  },
});

export const {
  setPosts,
  filter_like,
  addPost,
  setCommentByPostId,
  addCommentByPostId,
  deletePost,
  deleteCommentByPostId,
  UpdatePost,
  UpdateCommentByPostId
} = postsSlice.actions;

export default postsSlice.reducer;
