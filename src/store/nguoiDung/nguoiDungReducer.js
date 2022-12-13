import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

const initialState = {
  isFetching: false,
  userInfo: {
    id: 0,
    name: "",
    email: "",
    phone: "",
    birthday: "",
    gender: true,
    role: "",
    skill: [],
    certification: [],
  },
  error: undefined,
  listUserPageSearch: undefined,
  newAdmin: undefined,
};

export const { reducer: nguoiDungReducer, actions: nguoiDungActions } =
  createSlice({
    name: "nguoiDung",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        //getUser
        .addCase(getUser.pending, (state) => {
          state.isFetching = true;
        })
        .addCase(getUser.fulfilled, (state, action) => {
          state.userInfo = action.payload;
          const { skill } = action.payload;
          state.isFetching = false;
        })
        .addCase(getUser.rejected, (state, action) => {
          state.isFetching = false;
          state.error = action.payload;
        })
        //putUser
        .addCase(putUserInfo.pending, (state, acton) => {
          state.isFetching = true;
        })
        .addCase(putUserInfo.fulfilled, (state, action) => {
          state.isFetching = false;
          state.userInfo = action.payload;
          console.log("action.payload: ", action.payload);
        })
        .addCase(putUserInfo.rejected, (state, action) => {
          state.isFetching = false;
          state.error = action.payload;
        })
        //getUserPageSearch
        .addCase(getUserPageSearch.pending, (state, action) => {
          state.isFetching = false;
        })
        .addCase(getUserPageSearch.fulfilled, (state, action) => {
          state.isFetching = true;
          state.listUserPageSearch = action.payload;
        })
        .addCase(getUserPageSearch.rejected, (state, action) => {
          state.isFetching = true;
          state.error = action.payload;
        })
        //deleteUser
        .addCase(deleteUser.pending, (state, action) => {
          state.isFetching = false;
        })
        .addCase(deleteUser.fulfilled, (state, action) => {
          state.isFetching = true;
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        })
        .addCase(deleteUser.rejected, (state, action) => {
          state.isFetching = true;
          state.error = action.payload;
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="">Why do I have this issue?</a>',
          });
        })
        .addCase(postNewAdmin.pending, (state, action) => {
          state.isFetching = true;
        })
        .addCase(postNewAdmin.fulfilled, (state, action) => {
          state.isFetching = false;
          state.newAdmin = action.payload;
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .addCase(postNewAdmin.rejected, (state, action) => {
          state.isFetching = false;
          state.error = action.payload;
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="">Why do I have this issue?</a>',
          });
        })
        //putChangeUserToAdmin
        .addCase(putChangeUserToAdmin.pending, (state, action) => {
          state.isFetching = true;
        })
        .addCase(putChangeUserToAdmin.fulfilled, (state, action) => {
          state.isFetching = false;
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Success",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .addCase(putChangeUserToAdmin.rejected, (state, action) => {
          state.isFetching = false;
          state.error = action.payload;
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="">Why do I have this issue?</a>',
          });
        });
    },
  });

export const getUser = createAsyncThunk(
  "nguoiDung/getUser",
  async (userId, { rejectWithValue }) => {
    try {
      const result = await axios({
        url: `https://fiverrnew.cybersoft.edu.vn/api/users/${userId}`,
        method: "GET",
        headers: {
          TokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCDEkMOgIE7hurVuZyAwNCIsIkhldEhhblN0cmluZyI6IjExLzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MTE3MTIwMDAwMCIsIm5iZiI6MTY1MjYzNDAwMCwiZXhwIjoxNjgxMzE4ODAwfQ.gSqRPtAGanL6NGpTCUadxaDv8iCWNHz1-5NHHkRP43A",
        },
      });
      console.log("result.data.content: ", result.data.content);
      return result.data.content;
    } catch (err) {
      console.log("error", err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

export const putUserInfo = createAsyncThunk(
  "nguoiDung/putUserProfile",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const result = await axios({
        url: `https://fiverrnew.cybersoft.edu.vn/api/users/${data.id}`,
        method: "PUT",
        headers: {
          TokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCDEkMOgIE7hurVuZyAwNCIsIkhldEhhblN0cmluZyI6IjExLzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MTE3MTIwMDAwMCIsIm5iZiI6MTY1MjYzNDAwMCwiZXhwIjoxNjgxMzE4ODAwfQ.gSqRPtAGanL6NGpTCUadxaDv8iCWNHz1-5NHHkRP43A",
        },
        data,
      });
      dispatch(getUser(data.id));
      return result.data.content;
    } catch (err) {
      console.log("error", err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

export const getUserPageSearch = createAsyncThunk(
  "nguoiDung/getUserPageSearch",
  async (data, { rejectWithValue }) => {
    try {
      const result = await axios({
        url: "https://fiverrnew.cybersoft.edu.vn/api/users/phan-trang-tim-kiem?pageIndex=1&pageSize=200",
        method: "GET",
        headers: {
          TokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCDEkMOgIE7hurVuZyAwNCIsIkhldEhhblN0cmluZyI6IjExLzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MTE3MTIwMDAwMCIsIm5iZiI6MTY1MjYzNDAwMCwiZXhwIjoxNjgxMzE4ODAwfQ.gSqRPtAGanL6NGpTCUadxaDv8iCWNHz1-5NHHkRP43A",
        },
      });
      return result.data.content;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "nguoiDung/deleteUser",
  async (deleteKey, { dispatch, rejectWithValue }) => {
    try {
      const result = await axios({
        url: `https://fiverrnew.cybersoft.edu.vn/api/users?id=${deleteKey}`,
        method: "DELETE",
        headers: {
          TokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCDEkMOgIE7hurVuZyAwNCIsIkhldEhhblN0cmluZyI6IjExLzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MTE3MTIwMDAwMCIsIm5iZiI6MTY1MjYzNDAwMCwiZXhwIjoxNjgxMzE4ODAwfQ.gSqRPtAGanL6NGpTCUadxaDv8iCWNHz1-5NHHkRP43A",
        },
      });
      dispatch(getUserPageSearch());
      console.log("result.data.content: ", result.data.content);
      return result.data.content;
    } catch (err) {
      console.log("err.response.data: ", err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

export const postNewAdmin = createAsyncThunk(
  "nguoiDung/postNewUser",
  async (data, { rejectWithValue }) => {
    try {
      const result = await axios({
        url: "https://fiverrnew.cybersoft.edu.vn/api/users",
        method: "POST",
        headers: {
          TokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCDEkMOgIE7hurVuZyAwNCIsIkhldEhhblN0cmluZyI6IjExLzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MTE3MTIwMDAwMCIsIm5iZiI6MTY1MjYzNDAwMCwiZXhwIjoxNjgxMzE4ODAwfQ.gSqRPtAGanL6NGpTCUadxaDv8iCWNHz1-5NHHkRP43A",
        },
        data,
      });
      return result.data.content;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const putChangeUserToAdmin = createAsyncThunk(
  "nguoiDung/putChangeUserToAdmin",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const result = await axios({
        url: `https://fiverrnew.cybersoft.edu.vn/api/users/${data.id}`,
        method: "PUT",
        headers: {
          TokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCDEkMOgIE7hurVuZyAwNCIsIkhldEhhblN0cmluZyI6IjExLzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MTE3MTIwMDAwMCIsIm5iZiI6MTY1MjYzNDAwMCwiZXhwIjoxNjgxMzE4ODAwfQ.gSqRPtAGanL6NGpTCUadxaDv8iCWNHz1-5NHHkRP43A",
        },
        data,
      });
      console.log(data);
      dispatch(getUserPageSearch());
      return result.data.content;
    } catch (err) {
      console.log("err", err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);
