import { Alert } from "react-native";
import { api, API_URL } from "../../config/api";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_USER_FAILURE,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
} from "./ActionTypes";
import { router } from "expo-router";

export const registerUserAction = (form) => {
  return async (dispatch) => {
    dispatch({ type: REGISTER_USER_REQUEST });

    try {
      const { data } = await api.post(`${API_URL}/auth/register`, form);
      dispatch({ type: REGISTER_USER_SUCCESS, payload: data });
      console.log("res", data);
    } catch (error) {
      if (error.response) {
        const errorMessage =
          error.response.data.message || "Something went wrong!";
        dispatch({ type: REGISTER_USER_FAILURE, payload: errorMessage });
      } else {
        dispatch({ type: REGISTER_USER_FAILURE, payload: "Network error!" });
      }

      console.log(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };
};

export const loginAction = (form) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });

    try {
      const { data } = await api.post(`${API_URL}/auth/login`, form);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data,
      });
      router.push("/home");
      console.log("Success", data);
    } catch (error) {
      if (error.response) {
        const errorMessage =
          error.response.data.message ||
          "Something went wrong! Please try again later.";
        dispatch({ type: REGISTER_USER_FAILURE, payload: errorMessage });
        Alert.alert("Error", errorMessage);
      } else {
        dispatch({ type: REGISTER_USER_FAILURE, payload: "Network error!" });
        Alert.alert("Error", "Network error! Please try again later.");
      }

      console.log(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };
};
