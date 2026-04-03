import { StatusBar, StyleSheet, Text, View, FlatList, LayoutAnimation, Platform, UIManager, Modal, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';
import UserIcon from './components/UserIcon';

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]);
  const [editingGoal, setEditingGoal] = useState(null);
  const [warningVisible, setWarningVisible] = useState(false); // new state

  // Enable LayoutAnimation on Android
  if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  // Add a new goal
  function addGoalHandler(enteredGoalText) {
    // Prevent empty goal
    if (!enteredGoalText.trim()) return;

    setCourseGoals((currentCourseGoals) => {
      const updatedGoals = [
        ...currentCourseGoals,
        {
          text: enteredGoalText,
          key: Math.random().toString(),
          priority: 'medium',
          completed: false
        }
      ];

      // Show warning if goals exceed 5
      if (updatedGoals.length > 5) {
        setWarningVisible(true);
      }

      return updatedGoals;
    });
  }

  // Delete a goal
  function deleteGoalHandler(goalKey) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setCourseGoals((currentGoals) =>
      currentGoals.filter((goal) => goal.key !== goalKey)
    );
  }

  // Edit a goal
  function editGoalHandler(key, newText, newPriority) {
    setCourseGoals((currentGoals) =>
      currentGoals.map((goal) =>
        goal.key === key ? { ...goal, text: newText, priority: newPriority } : goal
      )
    );
    setEditingGoal(null);
  }

  // Toggle completion
  function toggleCompleteHandler(key) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setCourseGoals((currentGoals) =>
      currentGoals.map((goal) =>
        goal.key === key ? { ...goal, completed: !goal.completed } : goal
      )
    );
  }

  return (
    <View style={styles.appContainer}>
      <StatusBar style="light" />
      <UserIcon></UserIcon>
      <Text style={styles.appTitle}>My Goals App</Text>

      {/* Input to add new goals */}
      <GoalInput
        onAddGoal={addGoalHandler}
        editingGoal={editingGoal}
        onEditGoal={editGoalHandler}
      />

      {/* Goal List */}
      <View style={styles.goalListContainer}>
        <FlatList
          data={courseGoals}
          keyExtractor={(item) => item.key}
          renderItem={(itemData) => (
            <GoalItem
              text={itemData.item.text}
              priority={itemData.item.priority}
              completed={itemData.item.completed}
              onDelete={() => deleteGoalHandler(itemData.item.key)}
              onToggle={() => toggleCompleteHandler(itemData.item.key)}
              onEdit={() => setEditingGoal(itemData.item)}
            />
          )}
        />
      </View>

      {/* Warning Modal */}
      <Modal
        visible={warningVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setWarningVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>⚠️ Warning</Text>
            <Text style={styles.modalText}>
              You have more than 5 goals! Make sure not to overwhelm yourself.
            </Text>
            <Pressable onPress={() => setWarningVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Got it</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#121212',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E90FF',
    marginBottom: 10,
  },
  modalText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    color: '#1E90FF',
    fontWeight: 'bold',
  },
});