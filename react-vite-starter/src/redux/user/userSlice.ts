import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface IUser {
  id: number;
  name: string;
  email: string;
}

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (itemId, thunkApi) => {
    const item = await fetch("http://localhost:8000/users");
    const data = await item.json();
    return data;
  }
);
export const createNewUser = createAsyncThunk(
  "user/createNewUser",
  async (user: Omit<IUser, "id">, thunkApi) => {
    const item = await fetch("http://localhost:8000/users", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await item.json();
    if (data && data.id) {
      thunkApi.dispatch(fetchUser());
    }
    return data;
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (user: IUser, thunkApi) => {
    const item = await fetch(`http://localhost:8000/users/${user.id}`, {
      method: "PUT",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await item.json();
    if (data && data.id) {
      thunkApi.dispatch(fetchUser());
    }
    return data;
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (userId: number, thunkApi) => {
    const item = await fetch(`http://localhost:8000/users/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await item.json();
    if (data) {
      thunkApi.dispatch(fetchUser());
    }
    return data;
  }
);

const initialState: {
  listUsers: IUser[];
  isCreateSuccess: boolean;
  isUpdateSuccess: boolean;
  isDeleteSuccess: boolean;
} = {
  listUsers: [],
  isCreateSuccess: false,
  isUpdateSuccess: false, // Add any additional state properties here
  isDeleteSuccess: false,
};

export const userSlice = createSlice({
  name: "user",
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
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.listUsers = action.payload;
    });
    builder.addCase(createNewUser.fulfilled, (state, action) => {
      state.isCreateSuccess = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.isUpdateSuccess = true;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.isDeleteSuccess = true;
    });
  },
});

// Action creators are generated for each case reducer function
export const { resetCreateSuccess, resetUpdateSuccess, resetDeleteSuccess } =
  userSlice.actions;

export default userSlice.reducer;
