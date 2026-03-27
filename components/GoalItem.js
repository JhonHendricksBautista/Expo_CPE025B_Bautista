import { View, Text, StyleSheet } from 'react-native';

function GoalItem(props) {
  return (
    <View style={styles.goalItem}>
      <Text style={styles.goalText}>{props.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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

export default GoalItem;