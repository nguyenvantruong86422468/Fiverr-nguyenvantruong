import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

const initialState = {
  isFetching: false,
  dsBinhLuan: [],
  listCommentsSearch: [],
};

export const {
  reducer: quanLyBinhLuanReducer,
  actions: quanLyBinhLuanActions,
} = createSlice({
  name: "quanLyBinhLuan",
  initialState,
  reducers: {},
  extraReducers: (buider) => {
    buider

      // layBinhLuanTheoCongViec
      .addCase(layBinhLuanTheoCongViec.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(layBinhLuanTheoCongViec.fulfilled, (state, action) => {
        state.dsBinhLuan = action.payload;
        state.isFetching = false;
      })
      .addCase(layBinhLuanTheoCongViec.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload;
        console.log(action.payload);
      })

      // Gui Binh luan
      .addCase(guiBinhLuan.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(guiBinhLuan.fulfilled, (state, action) => {
        state.isFetching = false;
        console.log(action.payload);
      })
      .addCase(guiBinhLuan.rejected, (state, action) => {
        state.error = action.payload;
        console.log(action.payload);
        state.isFetching = false;
        Swal.fire({
          icon: "error",
          title: "Thất bại...",
          text: action.payload.content,
          footer: '<a href="">Xin cảm ơn</a>',
        });
      })
      //getCommentsSearch
      .addCase(getCommentsSearch.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(getCommentsSearch.fulfilled, (state, action) => {
        state.isFetching = false;
        state.listCommentsSearch = action.payload;
      })
      .addCase(getCommentsSearch.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload;
      })
      //deleteComment
      .addCase(deleteComment.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.isFetching = false;
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload;
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="">Why do I have this issue?</a>',
        });
      })
      // Doi Binh luan
      .addCase(changeComment.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(changeComment.fulfilled, (state, action) => {
        state.isFetching = false;
        console.log(action.payload);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .addCase(changeComment.rejected, (state, action) => {
        state.error = action.payload;
        console.log(action.payload);
        state.isFetching = false;
        Swal.fire({
          icon: "error",
          title: "Thất bại...",
          text: action.payload.content,
          footer: '<a href="">Xin cảm ơn</a>',
        });
      });
  },
});

export const layBinhLuanTheoCongViec = createAsyncThunk(
  "quanLyBinhLuan/layBinhLuanTheoCongViec",
  async (data, { dispatch, getState, rejectWithValue }) => {
    try {
      const result = await axios({
        url: `https://fiverrnew.cybersoft.edu.vn/api/binh-luan/lay-binh-luan-theo-cong-viec/${data}`,
        method: "GET",
        headers: {
          TokenCyberSoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCDEkMOgIE7hurVuZyAwNCIsIkhldEhhblN0cmluZyI6IjExLzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MTE3MTIwMDAwMCIsIm5iZiI6MTY1MjYzNDAwMCwiZXhwIjoxNjgxMzE4ODAwfQ.gSqRPtAGanL6NGpTCUadxaDv8iCWNHz1-5NHHkRP43A",
        },
      });
      console.log("result.data.content: ", result.data.content);
      return result.data.content;
    } catch (err) {
      console.log(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

export const guiBinhLuan = createAsyncThunk(
  "quanLyBinhLuan/guiBinhLuan",
  async (data, { dispatch, getState, rejectWithValue }) => {
    try {
      const result = await axios({
        url: "https://fiverrnew.cybersoft.edu.vn/api/binh-luan",
        method: "POST",
        headers: {
          token: localStorage.getItem("TOKEN"),
          tokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCDEkMOgIE7hurVuZyAwNCIsIkhldEhhblN0cmluZyI6IjExLzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MTE3MTIwMDAwMCIsIm5iZiI6MTY1MjYzNDAwMCwiZXhwIjoxNjgxMzE4ODAwfQ.gSqRPtAGanL6NGpTCUadxaDv8iCWNHz1-5NHHkRP43A",
        },
        data,
      });
      console.log("data2", data);
      return result.data.content;
    } catch (err) {
      console.log(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);

export const getCommentsSearch = createAsyncThunk(
  "quanLyBinhLuan/getCommentsSearch",
  async (data, { rejectWithValue }) => {
    try {
      const result = await axios({
        url: "https://fiverrnew.cybersoft.edu.vn/api/binh-luan",
        method: "GET",
        headers: {
          TokenCyberSoft:
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

export const deleteComment = createAsyncThunk(
  "quanLyBinhLuan/deleteComment",
  async (commentId, { dispatch, rejectWithValue }) => {
    try {
      const result = await axios({
        url: `https://fiverrnew.cybersoft.edu.vn/api/binh-luan/${commentId}`,
        method: "DELETE",
        headers: {
          token: localStorage.getItem("TOKEN"),
          TokenCyberSoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCDEkMOgIE7hurVuZyAwNCIsIkhldEhhblN0cmluZyI6IjExLzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MTE3MTIwMDAwMCIsIm5iZiI6MTY1MjYzNDAwMCwiZXhwIjoxNjgxMzE4ODAwfQ.gSqRPtAGanL6NGpTCUadxaDv8iCWNHz1-5NHHkRP43A",
        },
      });
      dispatch(getCommentsSearch());
      return result.data.content;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const changeComment = createAsyncThunk(
  "quanLyBinhLuan/changeComment",
  async (data, { dispatch, getState, rejectWithValue }) => {
    try {
      const result = await axios({
        url: `https://fiverrnew.cybersoft.edu.vn/api/binh-luan/${data.id}`,
        method: "PUT",
        headers: {
          token: localStorage.getItem("TOKEN"),
          tokenCybersoft:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCDEkMOgIE7hurVuZyAwNCIsIkhldEhhblN0cmluZyI6IjExLzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MTE3MTIwMDAwMCIsIm5iZiI6MTY1MjYzNDAwMCwiZXhwIjoxNjgxMzE4ODAwfQ.gSqRPtAGanL6NGpTCUadxaDv8iCWNHz1-5NHHkRP43A",
        },
        data,
      });
      dispatch(getCommentsSearch());
      return result.data.content;
    } catch (err) {
      console.log(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);
