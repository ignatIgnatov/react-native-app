import { StatusBar, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";
import Loader from "../../components/Loader";

const AuthLayout = () => {
  const [loading, setLoading] = useState(false);
  // const { loading, isLogged } = useGlobalContext();

  // if (!loading) return <Redirect href="/home" />;

  return (
    <>
      <Stack>
        <Stack.Screen
          name="login"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="register"
          options={{
            headerShown: false,
          }}
        />
      </Stack>

      <Loader isLoading={loading} />
      <StatusBar className="bg-gray-200" style="light" />
    </>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({});
