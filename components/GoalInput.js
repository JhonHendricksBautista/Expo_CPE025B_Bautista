import { useState } from 'react';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';

function GoalInput(props) {
  const [enteredGoalText, setEnteredText] = useState('');

  function textInputHandler(enteredText) {
    setEnteredText(enteredText);
  }

  function addGoalHandler() {
    props.onAddGoal(enteredGoalText);
    setEnteredText('');
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput 
        placeholder="Your course goals!"
        placeholderTextColor="#888"
        style={styles.input}
        onChangeText={textInputHandler}
        value={enteredGoalText}
      />
      <View style={styles.buttonContainer}>
        <Pressable
          onPress={addGoalHandler}
          style={({ pressed }) => [
            styles.pressableButton,
            pressed && styles.pressedButton
          ]}
        >
          <Text style={styles.buttonText}>Add Goal</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    borderRadius: 5,
    color: 'white'
  },
  buttonContainer: {
    marginLeft: 8,
  },
  pressableButton: {
    backgroundColor: '#1E90FF',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 5,
    alignItems: 'center',
  },
  pressedButton: {
    opacity: 0.7,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default GoalInput;