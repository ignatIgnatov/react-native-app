import { Alert } from "react-native";
import { API_URL } from "../../config/api";
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
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        dispatch({
          type: REGISTER_USER_SUCCESS,
          payload: "User registered successfully!",
        });
        router.push("/login");
        Alert.alert("Success", "User registered successfully!");
      } else {
        const error = await res.json();
        dispatch({
          type: REGISTER_USER_FAILURE,
          payload: error,
        });
        Alert.alert("Error", error.message);
      }
    } catch (error) {
      dispatch({ type: REGISTER_USER_FAILURE, payload: error });
      console.log("====================================");
      console.log("error", error);
      console.log("====================================");
    }
  };
};

export const loginAction = (form) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: "Login successfully!",
        });
        router.push("/home");
        Alert.alert("Success", "Login successfully!");
      } else {
        dispatch({
          type: LOGIN_FAILURE,
          payload: "Invalid username or password!",
        });
        Alert.alert("Error", "Invalid username or passwor!");
      }
    } catch (error) {
      dispatch({
        type: LOGIN_FAILURE,
        payload: error,
      });
      console.log("====================================");
      console.log("error", error);
      console.log("====================================");
    }
  };
};
