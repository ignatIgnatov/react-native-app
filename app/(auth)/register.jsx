import { useState } from "react";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { useDispatch } from "react-redux";
import { registerUserAction } from "../../state/authentication/Action";

const initialForm = {
  name: "",
  username: "",
  email: "",
  password: "",
  repeatPassword: "",
};

const SignUp = () => {
  const dispatch = useDispatch();

  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState(initialForm);

  const submit = () => {
    setSubmitting(true);

    if (
      form.name === "" ||
      form.username === "" ||
      form.email === "" ||
      form.password === "" ||
      form.repeatPassword === ""
    ) {
      Alert.alert("Error", "Please fill in all fields");
    } else {
      dispatch(registerUserAction(form));
    }
    setSubmitting(false);
  };

  return (
    <SafeAreaView className="bg-gary-200 h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          {/* <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[34px]"
          /> */}

          <Text className="text-2xl text-secondary-100 font-semibold mt-10">
            Sign Up
          </Text>

          <Text className="border-t border-secondary-100 mt-4"></Text>

          <FormField
            title="Name"
            value={form.name}
            handleChangeText={(e) => setForm({ ...form, name: e })}
            otherStyles="mt-10"
          />

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <FormField
            title="Confirm Password"
            value={form.confirmPassword}
            handleChangeText={(e) => setForm({ ...form, repeatPassword: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-16"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-500">
              You have an account yet?
            </Text>
            <Link
              href="/login"
              className="text-lg font-semibold text-secondary"
            >
              Sign in
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
