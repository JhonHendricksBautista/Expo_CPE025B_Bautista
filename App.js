import { StatusBar, StyleSheet, Text, View, FlatList, LayoutAnimation, Platform, UIManager } from 'react-native';
import { useState } from 'react';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);

  // Enable LayoutAnimation on Android
  if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  // Add a new goal
  function addGoalHandler(enteredGoalText) {
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      { text: enteredGoalText, key: Math.random().toString() },
    ]);
  }

  // Delete a goal with animation
  function deleteGoalHandler(goalKey) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setCourseGoals((currentGoals) =>
      currentGoals.filter((goal) => goal.key !== goalKey)
    );
  }

  return (
    <View style={styles.appContainer}>
      <StatusBar style="light" />
      <Text style={styles.appTitle}>My Goals App</Text>

      {/* Input to add new goals */}
      <GoalInput onAddGoal={addGoalHandler} />

      {/* Scrollable list of goals */}
      <View style={styles.goalListContainer}>
        <FlatList
          data={courseGoals}
          renderItem={(itemData) => (
            <GoalItem
              text={itemData.item.text}
              onDelete={() => deleteGoalHandler(itemData.item.key)}
            />
          )}
          keyExtractor={(item) => item.key}
        />
      </View>
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
  goalListContainer: {
    flex: 1,
    height: '40%',
    maxHeight: 300,
  },
});