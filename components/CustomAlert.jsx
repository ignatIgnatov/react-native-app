import React, { useRef, useEffect } from "react";
import { Modal, View, Text, Pressable, Animated } from "react-native";

const CustomAlert = ({
  visible,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
}) => {
  // Initialize animated values for opacity and scale
  const opacityAnim = useRef(new Animated.Value(0)).current; // Initial opacity is 0 (transparent)
  const scaleAnim = useRef(new Animated.Value(0.8)).current; // Initial scale is 0.8 (slightly smaller)

  // Effect to handle showing and hiding animations
  useEffect(() => {
    if (visible) {
      // Animate opacity and scale when modal becomes visible
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 1, // Fully opaque
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1, // Full scale (normal size)
          friction: 7,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Animate opacity and scale when modal is closed
      Animated.parallel([
        Animated.timing(opacityAnim, {
          toValue: 0, // Fade out
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8, // Shrink slightly
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="none" // Disable default modal animation
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/50">
        {/* Animated View with scale and opacity */}
        <Animated.View
          style={{
            opacity: opacityAnim, // Animate opacity
            transform: [{ scale: scaleAnim }], // Animate scale
          }}
          className="w-72 p-5 bg-white rounded-lg items-center"
        >
          {/* Title */}
          <Text className="text-xl font-semibold text-center">{title}</Text>

          {/* Message */}
          <Text className="text-base text-gray-600 mt-4 text-center">
            {message}
          </Text>

          {/* Confirm Button */}
          <View className="flex-row justify-center w-full mt-6">
            {confirmText && (
              <Pressable
                onPress={onConfirm}
                className="w-[100px] bg-secondary-100 py-2 rounded-md items-center"
              >
                <Text className="text-white font-bold">{confirmText}</Text>
              </Pressable>
            )}
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default CustomAlert;
