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
            state.posts.unshift(action.payload)
    },
    filter_like: (state,action)=>{
        state.posts.map((post,i)=>{
            if(post.id === action.payload.id){
                post.like_count = action.payload.num
            }
            return post
        })
    }
  },
});

export const { setPosts,filter_like,addPost } = postsSlice.actions;

export default postsSlice.reducer;
