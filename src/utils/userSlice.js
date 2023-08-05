import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "./firebase-config.js";
import {
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
} from "@firebase/auth";

export const signInwithGoogle = createAsyncThunk(
  "user/signInwithGoogle",
  async () => {
    const provider = new GoogleAuthProvider();
    const userCred = await signInWithPopup(auth, provider);
    return userCred.user;
  }
);


export const setUpAuthObserver = () => (dispatch) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
        };
        dispatch({ type: 'user/LOGIN_SUCCESS', payload: userData });
      } else {
        dispatch({ type: 'user/LOGOUT_SUCCESS' });
      }
    });
  };

  export const logout = () => (dispatch) => {
    signOut(auth).then(() => {
      dispatch({ type: 'user/LOGOUT_SUCCESS' });
    });
  }

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    error: null,
    currentUser: null,
  },
  reducers: {
    LOGIN_SUCCESS: (state, action) => {
        state.currentUser = action.payload;
        state.loading = false;
    },
    LOGOUT_SUCCESS: (state) => {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signInwithGoogle.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(signInwithGoogle.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
    });
    builder.addCase(signInwithGoogle.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export default userSlice.reducer;
