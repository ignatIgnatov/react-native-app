import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { SafeAreaView } from "react-native-safe-area-context";

const CalendarPage = () => {
  const [selected, setSelected] = useState("");

  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <View className="flex-1 justify-center p-20">
        <Text className="font-semibold text-center text-2xl mb-4">
          Calendar
        </Text>
        <View>
          <Calendar
            className="bg-gray-200 rounded-md p-4"
            firstDay={1}
            current={new Date().toISOString().split("T")[0]}
            d
            onDayPress={(day) => {
              setSelected(day.dateString);
            }}
            markedDates={{
              [selected]: {
                selected: true,
                marked: true,
                selectedColor: "orange",
              },
            }}
            theme={{
              selectedDayBackgroundColor: "#00adf5",
              todayTextColor: "#00adf5",
              arrowColor: "orange",
              monthTextColor: "black",
              textDayFontFamily: "monospace",
              textMonthFontFamily: "monospace",
              textDayHeaderFontFamily: "monospace",
              textMonthFontWeight: "bold",
              textDayFontSize: 16,
              textMonthFontSize: 20,
              textDayHeaderFontSize: 16,
              textSectionTitleColor: "#4B5563",
            }}
          />
        </View>
        {selected ? (
          <Text className="mt-10 text-center text-xl text-gra">
            Selected Date: {selected}
          </Text>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  selectedDate: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 18,
    color: "blue",
  },
});

export default CalendarPage;
