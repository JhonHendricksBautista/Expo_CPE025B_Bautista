import { useState, useEffect } from 'react';
import { View, TextInput, Pressable, Text, StyleSheet, Modal } from 'react-native';

function GoalInput(props) {
  const [enteredGoalText, setEnteredText] = useState('');
  const [priority, setPriority] = useState('medium');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (props.editingGoal) {
      setEnteredText(props.editingGoal.text);
      setPriority(props.editingGoal.priority);
      setModalVisible(true);
    }
  }, [props.editingGoal]);

  function addGoalHandler() {
    if (!enteredGoalText.trim()) {
      alert('Goal cannot be empty!'); // 🔥 simple error handling
      return;
    }

    if (props.editingGoal) {
      props.onEditGoal(props.editingGoal.key, enteredGoalText, priority);
    } else {
      props.onAddGoal(enteredGoalText, priority);
    }

    setEnteredText('');
    setPriority('medium');
    setModalVisible(false);
  }

  return (
    <View>
      {/* OPEN MODAL BUTTON */}
      <Pressable onPress={() => setModalVisible(true)} style={styles.openButton}>
        <Text style={styles.buttonText}>Add Goal</Text>
      </Pressable>

      {/* MODAL */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TextInput
            placeholder="Your goal..."
            placeholderTextColor="#888"
            style={styles.input}
            onChangeText={setEnteredText}
            value={enteredGoalText}
          />

          {/* PRIORITY SELECTOR */}
          <View style={styles.priorityContainer}>
            {['low', 'medium', 'high'].map((p) => (
              <Pressable key={p} onPress={() => setPriority(p)}>
                <Text style={[
                  styles.priorityText,
                  priority === p && styles.selectedPriority
                ]}>
                  {p.toUpperCase()}
                </Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.buttonRow}>
            <Pressable onPress={addGoalHandler} style={styles.pressableButton}>
              <Text style={styles.buttonText}>
                {props.editingGoal ? 'Update' : 'Add'}
              </Text>
            </Pressable>

            <Pressable 
              onPress={() => {
                setModalVisible(false);
                setEnteredText('');
                setPriority('medium');
                props.onCancelEdit(); // 🔥 THIS FIXES YOUR BUG
              }} 
              style={styles.cancelButton}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  openButton: {
    backgroundColor: '#1E90FF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    color: 'white',
    marginBottom: 20,
  },
  priorityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  priorityText: {
    color: 'gray',
    fontSize: 16,
  },
  selectedPriority: {
    color: '#1E90FF',
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pressableButton: {
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: '#555',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default GoalInput;