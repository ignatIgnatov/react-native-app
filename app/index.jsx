import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import { router } from "expo-router";

const Welcome = () => {
  return (
    <SafeAreaView className="bg-gray-200 h-full">
      <View className="flex-1 justify-center items-center">
        <Text className="font-semibold text-2xl">Welcome!</Text>
      </View>

      <View className="justify-center items-center">
        <CustomButton
          title="Click to start..."
          handlePress={() => router.push("/login")}
          containerStyles="w-[90%] my-7 bg-secondary-100"
        />
      </View>

      <View className="justify-center items-center">
        <CustomButton
          title="to home..."
          handlePress={() => router.push("/home")}
          containerStyles="w-[90%] my-7 bg-secondary-100"
        />
      </View>
    </SafeAreaView>
  );
};

export default Welcome;
