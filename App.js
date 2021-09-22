import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import { RadioButton } from "react-native-paper";

export default function App() {
  const [result, setResult] = useState(0);
  const [error, setError] = useState(false);
  const [numValues, setNumValues] = useState(["0", "0", "0"]);
  const [checklists, setCheckLists] = useState([false, false, false]);

  const onChangeTextHandler = (val, i) => {
    const newNumValues = [...numValues];
    newNumValues[i] = val;
    setNumValues(newNumValues);
  };

  const checkListHandler = (i) => {
    const newCheckLists = [...checklists];
    newCheckLists[i] = !newCheckLists[i];
    setCheckLists(newCheckLists);
  };

  const calculate = (operation) => {
    setError(false);
    const arrayForCalculation = [];
    checklists.forEach((check, i) => {
      if (check) {
        arrayForCalculation.push(parseInt(numValues[i]));
      }
    });

    if (arrayForCalculation.length < 2) {
      setError(true);
      return;
    }

    const res = arrayForCalculation.reduce((a, b) => {
      switch (operation) {
        case "+":
          return a + b;
        case "-":
          return a - b;
        case "*":
          return a * b;
        case "/":
          return a / b;
        default:
          break;
      }
    });
    setResult(res);
  };

  return (
    <View style={styles.container}>
      <View style={styles.masterInputContainer}>
        <View style={styles.textAndRadioContainer}>
          <View style={styles.textInputContainer}>
            <TextInput
              value={numValues[0]}
              onChangeText={(val) => onChangeTextHandler(val, 0)}
            />
          </View>

          <View style={styles.radioButtonContainer}>
            <RadioButton
              value="first"
              status={checklists[0] ? "checked" : "unchecked"}
              onPress={() => checkListHandler(0)}
            />
          </View>
        </View>
        <View style={styles.textAndRadioContainer}>
          <View style={styles.textInputContainer}>
            <TextInput
              value={numValues[1]}
              onChangeText={(val) => onChangeTextHandler(val, 1)}
            />
          </View>
          <View style={styles.radioButtonContainer}>
            <RadioButton
              value="first"
              status={checklists[1] ? "checked" : "unchecked"}
              onPress={() => checkListHandler(1)}
            />
          </View>
        </View>

        <View style={styles.textAndRadioContainer}>
          <View style={styles.textInputContainer}>
            <TextInput
              value={numValues[2]}
              onChangeText={(val) => onChangeTextHandler(val, 2)}
            />
          </View>
          <View style={styles.radioButtonContainer}>
            <RadioButton
              value="first"
              status={checklists[2] ? "checked" : "unchecked"}
              onPress={() => checkListHandler(2)}
            />
          </View>
        </View>
      </View>

      <View style={styles.operationContainer}>
        <Pressable style={styles.button} onPress={() => calculate("+")}>
          <Text style={styles.buttonText}>+</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => calculate("-")}>
          <Text style={styles.buttonText}>-</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => calculate("*")}>
          <Text style={styles.buttonText}>*</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => calculate("/")}>
          <Text style={styles.buttonText}>/</Text>
        </Pressable>
      </View>

      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>error. check 2 atau lebih value!</Text>
        </View>
      ) : null}

      <View style={styles.line}></View>
      <View style={styles.hasilContainer}>
        <Text style={styles.hasilText}>Hasil:</Text>
        <Text style={styles.hasilText}>{result}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "center",
    marginTop: "auto",
    marginBottom: "auto",
    padding: 15,
  },

  masterInputContainer: {
    width: "100%",
  },

  textAndRadioContainer: {
    flexDirection: "row",

    justifyContent: "center",
  },

  textInputContainer: {
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 10,
    marginVertical: 15,
    padding: 10,
    flex: 1,
    marginRight: 15,
  },
  line: {
    marginVertical: 25,
    borderBottomWidth: 2,
    borderBottomColor: "gray",
    width: "100%",
  },
  errorText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "red",
  },
  errorContainer: {
    marginTop: 15,
    width: "100%",
  },
  hasilContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  hasilText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  button: {
    backgroundColor: "teal",
    paddingHorizontal: 10,
    paddingVertical: 2.5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
  },
  operationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 15,
  },
  radioButtonContainer: {
    backgroundColor: "#eaeaea",
    padding: 1,
    marginVertical: 15,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});
