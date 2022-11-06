import { createSlice } from "@reduxjs/toolkit";
import { ACCESS_TOKEN } from "../../Config/config.constant";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    user: null,
    token: null,
    notificationTokens: [],
  },
  reducers: {
    setCredentials: (state, action) => {
      const { name, surname, accessToken, userNotificationTokens } = action.payload;

      state.token = accessToken;
      state.user = name + " " + surname;
      state.notificationTokens = userNotificationTokens;
      // SETTING TO LOCALSTORAGE
      localStorage.setItem("clientName", name);
      localStorage.setItem("clientSurname", surname);
      localStorage.setItem(ACCESS_TOKEN, accessToken);
      localStorage.setItem( "userNotificationTokens", `${JSON.stringify(userNotificationTokens)}`);
    },
    logout: (state, action) => {
      let navigate = action.payload;
      state.user = null;
      state.token = null;
      state.notificationTokens = null;
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem("clientName");
      localStorage.removeItem("clientSurname");
      localStorage.removeItem("userNotificationTokens");
      navigate('/');
    },
  },
});

export const { setCredentials, logout } = loginSlice.actions;

export default loginSlice.reducer;

// export const selecCurrentUser = (state) => state.auth.user;
// export const selecCurrentToken = (state) => state.auth.token;
