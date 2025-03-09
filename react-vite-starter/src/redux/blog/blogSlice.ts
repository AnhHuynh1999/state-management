import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface IBlog {
  id: number;
  title: string;
  author: string;
  content: string;
}

export const fetchBlog = createAsyncThunk(
  "user/fetchBlog",
  async (itemId, thunkApi) => {
    const item = await fetch("http://localhost:8000/blogs");
    const data = await item.json();
    return data;
  }
);
export const createNewBlog = createAsyncThunk(
  "user/createNewBlog",
  async (user: Omit<IBlog, "id">, thunkApi) => {
    const item = await fetch("http://localhost:8000/blogs", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await item.json();
    if (data && data.id) {
      thunkApi.dispatch(fetchBlog());
    }
    return data;
  }
);

export const updateBlog = createAsyncThunk(
  "user/updateBlog",
  async (user: IBlog, thunkApi) => {
    const item = await fetch(`http://localhost:8000/blogs/${user.id}`, {
      method: "PUT",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await item.json();
    if (data && data.id) {
      thunkApi.dispatch(fetchBlog());
    }
    return data;
  }
);

export const deleteBlog = createAsyncThunk(
  "user/deleteBlog",
  async (userId: number, thunkApi) => {
    const item = await fetch(`http://localhost:8000/blogs/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await item.json();
    if (data) {
      thunkApi.dispatch(fetchBlog());
    }
    return data;
  }
);

const initialState: {
  listBlogs: IBlog[];
  isCreateSuccess: boolean;
  isUpdateSuccess: boolean;
  isDeleteSuccess: boolean;
} = {
  listBlogs: [],
  isCreateSuccess: false,
  isUpdateSuccess: false, // Add any additional state properties here
  isDeleteSuccess: false,
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    resetCreateSuccess: (state) => {
      state.isCreateSuccess = false;
    },
    resetUpdateSuccess: (state) => {
      state.isUpdateSuccess = false;
    },
    resetDeleteSuccess: (state) => {
      state.isDeleteSuccess = false;
    },
    // Add any additional reducers here
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBlog.fulfilled, (state, action) => {
      state.listBlogs = action.payload;
    });
    builder.addCase(createNewBlog.fulfilled, (state, action) => {
      state.isCreateSuccess = true;
    });
    builder.addCase(updateBlog.fulfilled, (state, action) => {
      state.isUpdateSuccess = true;
    });
    builder.addCase(deleteBlog.fulfilled, (state, action) => {
      state.isDeleteSuccess = true;
    });
  },
});

// Action creators are generated for each case reducer function
export const { resetCreateSuccess, resetUpdateSuccess, resetDeleteSuccess } =
  blogSlice.actions;

export default blogSlice.reducer;
