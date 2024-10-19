import { useState } from "react";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { useDispatch } from "react-redux";
import { loginAction } from "../../state/authentication/Action";

const initialForm = {
  usernameOrEmail: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState(initialForm);

  const submit = () => {
    setSubmitting(true);

    if (form.usernameOrEmail === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    } else {
      dispatch(loginAction(form));
    }

    setSubmitting(false);
  };

  return (
    <SafeAreaView className="bg-gray-200 h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full p-4 my-6"
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
            Sign in
          </Text>

          <Text className="border-t border-secondary-100 mt-4"></Text>

          <FormField
            title="Email"
            value={form.usernameOrEmail}
            handleChangeText={(e) => setForm({ ...form, usernameOrEmail: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-16"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-500">
              Don't have an account?
            </Text>
            <Link
              href="/register"
              className="text-lg font-semibold text-secondary"
            >
              Sign up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
