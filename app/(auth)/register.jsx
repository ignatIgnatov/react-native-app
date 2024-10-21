import { useEffect, useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Image } from "react-native";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { registerUserAction } from "../../state/authentication/Action";
import CustomAlert from "../../components/CustomAlert";

const initialForm = {
  name: "",
  username: "",
  email: "",
  password: "",
  repeatPassword: "",
};

const SignUp = () => {
  // State for handling the alert modal visibility and messages
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertConfirmAction, setAlertConfirmAction] = useState(null);

  const dispatch = useDispatch();
  const { success, error } = useSelector((store) => store.auth);

  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    // If registration is successful, show success modal
    if (success) {
      setForm(initialForm);

      setAlertTitle("Success");
      setAlertMessage(success);
      setAlertConfirmAction(() => () => {
        setAlertVisible(false);
        router.push("/login");
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

    // Validate form fields
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
    } else if (form.password !== form.repeatPassword) {
      setAlertTitle("Error");
      setAlertMessage("Passwords do not match.");
      setAlertConfirmAction(() => () => setAlertVisible(false));
      setAlertVisible(true);
    } else {
      // Dispatch the registration action
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

          <View className="flex justify-center mb-12 pt-5 flex-row gap-2">
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

export default SignUp;
