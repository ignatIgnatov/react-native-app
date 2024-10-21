import { useEffect, useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../state/authentication/Action";
import CustomAlert from "../../components/CustomAlert";

const initialForm = {
  usernameOrEmail: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const { success, error } = useSelector((store) => store.auth);
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState(initialForm);

  // State for handling the alert modal visibility and messages
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertConfirmAction, setAlertConfirmAction] = useState(null);

  useEffect(() => {
    // If registration is successful, show success modal
    if (success) {
      setForm(initialForm);

      setAlertTitle("Success");
      setAlertMessage(success);
      setAlertConfirmAction(() => () => {
        setAlertVisible(false);
        router.push("/home");
      });
      setAlertVisible(true);
    }

    // If there's an error, show error modal
    if (error) {
      setAlertTitle("Error");
      setAlertMessage(error);
      setAlertConfirmAction(() => () => setAlertVisible(false));
      setAlertVisible(true);
    }
  }, [success, error]);

  const submit = () => {
    setSubmitting(true);

    if (
      form.name === "" ||
      form.username === "" ||
      form.email === "" ||
      form.password === "" ||
      form.repeatPassword === ""
    ) {
      setAlertTitle("Error");
      setAlertMessage("Please fill in all fields.");
      setAlertConfirmAction(() => () => setAlertVisible(false));
      setAlertVisible(true);
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

      {/* Custom Alert Modal */}
      <CustomAlert
        visible={alertVisible}
        onClose={() => setAlertVisible(false)}
        onConfirm={alertConfirmAction}
        title={alertTitle}
        message={alertMessage}
        confirmText="OK"
      />
    </SafeAreaView>
  );
};

export default Login;
