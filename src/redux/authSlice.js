import { createSlice } from "@reduxjs/toolkit";

const savedUser = localStorage.getItem("currentUserId");

const initialState = {
  users: JSON.parse(localStorage.getItem("users") || "[]"),
  currentUserId: savedUser || null,
  isAuthenticated: !!savedUser,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signup: (state, action) => {
      const newUser = {
        id: Date.now().toString(),
        email: action.payload.email,
        password: action.payload.password,
        name: action.payload.name,
      };

      state.users.push(newUser);
      state.currentUserId = newUser.id;
      state.isAuthenticated = true;

      localStorage.setItem("users", JSON.stringify(state.users));
      localStorage.setItem("currentUserId", newUser.id);
    },

    login: (state, action) => {
      const user = state.users.find(
        u =>
          u.email === action.payload.email &&
          u.password === action.payload.password
      );

      if (user) {
        state.currentUserId = user.id;
        state.isAuthenticated = true;
        localStorage.setItem("currentUserId", user.id);
      }
    },

    logout: (state) => {
      state.currentUserId = null;
      state.isAuthenticated = false;
      localStorage.removeItem("currentUserId");
    },
  },
});

export const { signup, login, logout } = authSlice.actions;
export default authSlice.reducer;
