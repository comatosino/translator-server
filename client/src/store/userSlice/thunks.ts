import { AppThunk } from "..";
import { setFetchingStatus, setUser, clearUser } from ".";
import API, { Credentials } from "../../utils/API";

export const getUser = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setFetchingStatus(true));
    const response = await API.getUser();
    const { profile } = response.data;
    dispatch(setUser(profile));
  } catch (error) {
    console.error(error);
    localStorage.removeItem("translator-token");
  } finally {
    dispatch(setFetchingStatus(false));
  }
};

export const register =
  (credentials: Credentials): AppThunk =>
  async (dispatch) => {
    try {
      const response = await API.register(credentials);
      const { profile, token } = response.data;
      localStorage.setItem("translator-token", token);
      dispatch(setUser(profile));
    } catch (error) {
      console.error(error);
      localStorage.removeItem("translator-token");
    }
  };

export const login =
  (credentials: Credentials): AppThunk =>
  async (dispatch) => {
    try {
      const response = await API.login(credentials);
      const { profile, token } = response.data;
      localStorage.setItem("translator-token", token);
      dispatch(setUser(profile));
    } catch (error) {
      console.error(error);
      localStorage.removeItem("translator-token");
    }
  };

export const logout = (): AppThunk => async (dispatch, getState) => {
  try {
    console.log("LOGGING OUT");
    await API.logout();
    dispatch(clearUser());
  } catch (error) {
    console.error(error);
  } finally {
    localStorage.removeItem("translator-token");
  }
};
