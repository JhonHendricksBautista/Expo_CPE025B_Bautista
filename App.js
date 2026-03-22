import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView } from 'react-native';

export default function App() {
  const [enteredGoalText, setEnteredGoalText] = useState('');
  const [courseGoals, setCourseGoals] = useState([]);

  function goalInputHandler(enteredText) {
    setEnteredGoalText(enteredText);
  }

  function addGoalHandler() {
    if (enteredGoalText.trim().length === 0) return; // preventing null inputs
    setCourseGoals((currentCourseGoals) => [ // add goals
      ...currentCourseGoals,
      enteredGoalText
    ]);
    setEnteredGoalText(''); // resets the inputField once added
  }

  return (
    <View style={styles.appContainer}>
      <StatusBar style="light" />

      {/* App Title */}
      <Text style={styles.appTitle}>My Goals App</Text>

      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input}
          placeholder="Your Course Goal"
          placeholderTextColor="#bbb"
          onChangeText={goalInputHandler}
          value={enteredGoalText}
        />
        <View style={styles.buttonContainer}>
          <Button title="Add" onPress={addGoalHandler} color="#1E90FF" />
        </View>
      </View>

      {/* tried to use scrollview to make the app interactive*/}
      <ScrollView style={styles.goalsContainer}>
        {courseGoals.length === 0 ? ( // checking if there are no goals
          <Text style={styles.noGoals}>No goals added yet!</Text>
        ) : (
          courseGoals.map((goal, index) => ( // now uses an index 
            <View key={index} style={styles.goalItem}>
              <Text style={styles.goalText}>{goal}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 50,
    paddingHorizontal: 16,
  },

  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E90FF',
    textAlign: 'center',
    marginBottom: 24,
  },

  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },

  input: {
    backgroundColor: '#1E1E1E',
    color: '#fff',
    width: "70%", 
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#1E90FF',
  },

  buttonContainer: {
    width: "25%", 
  },

  goalsContainer: {
    flex: 1,
  },

  noGoals: {
    color: '#aaa',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 20,
  },

  goalItem: {
    backgroundColor: '#1E90FF',
    padding: 12,
    borderRadius: 12,
    marginVertical: 6,
  },

  goalText: {
    color: '#fff',
  }
});