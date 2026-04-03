import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';

function GoalItem(props) {

  function handleLongPress() {
    Alert.alert(
      'Delete Goal',
      'Are you sure you want to delete this goal?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: props.onDelete },
      ],
      { cancelable: true }
    );
  }

  return (
    <Pressable
      onLongPress={handleLongPress}
      onPress={props.onToggle}
      android_ripple={{ color: '#333' }}
      style={({ pressed }) => pressed && styles.pressedItem}
    >
      <View style={styles.goalItem}>
        
        {/* TOP ROW */}
        <View style={styles.row}>
          <Text style={styles.checkbox}>
            {props.completed ? '☑️' : '⬜'}
          </Text>

          <Text style={[
            styles.goalText,
            props.completed && styles.completedText
          ]}>
            {props.text}
          </Text>
        </View>

        {/* BOTTOM ROW */}
        <View style={styles.row}>
          <Text style={[
            styles.priority,
            { color: getPriorityColor(props.priority) }
          ]}>
            {props.priority}
          </Text>

          <Pressable onPress={props.onEdit}>
            <Text style={styles.editText}>Edit</Text>
          </Pressable>
        </View>

      </View>
    </Pressable>
  );
}

// ✅ MOVE THIS OUTSIDE THE COMPONENT
const getPriorityColor = (priority) => {
  if (priority === 'high') return 'red';
  if (priority === 'medium') return 'orange';
  return 'lightgreen';
};

// ✅ ALSO OUTSIDE
const styles = StyleSheet.create({
  goalItem: {
    backgroundColor: '#1E90FF',
    padding: 12,
    borderRadius: 12,
    marginVertical: 6,
  },
  pressedItem: {
    opacity: 0.6,
  },
  goalText: {
    color: '#fff',
    flex: 1,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#ccc',
  },
  checkbox: {
    marginRight: 10,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priority: {
    fontSize: 12,
    textTransform: 'uppercase',
  },
  editText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default GoalItem;