import { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

function GoalInput(props) {
  const [enteredGoalText, setEnteredText] = useState('');
  // local handler updates the local state
  function textInputHandler(enteredText) {
    setEnteredText(enteredText);
  }
  // when button is pressed, call the prop function with local state
  function addGoalHandler() {
    props.onAddGoal(enteredGoalText);  // send text to App.js
    setEnteredText('');                 // reset input field
  }
  return (
    <View style={styles.inputContainer}>
      <TextInput 
        placeholder="Your course goals!"
        style={styles.input}
        onChangeText={textInputHandler}
        value={enteredGoalText}         // controlled input
      />
      <View style={styles.buttonContainer}>
        <Button title="Add Goal" onPress={addGoalHandler} color="#1E90FF" />
      </View>
    </View>
  );
}

export default GoalInput;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#1E1E1E',
    color: '#fff',
    width: '70%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#1E90FF',
  },
  buttonContainer: {
    width: '25%',
  },
});