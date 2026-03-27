import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';

function GoalItem(props) {
  // Handle long press to show delete confirmation
  function handleLongPress() {
    Alert.alert(
      'Delete Goal',
      'Are you sure you want to delete this goal?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: props.onDelete,
        },
      ],
      { cancelable: true }
    );
  }

  return (
    <Pressable
      onLongPress={handleLongPress}
      android_ripple={{ color: '#333' }}
      style={({ pressed }) => pressed && styles.pressedItem}
    >
      <View style={styles.goalItem}>
        <Text style={styles.goalText}>{props.text}</Text>
      </View>
    </Pressable>
  );
}

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
  },
});

export default GoalItem;