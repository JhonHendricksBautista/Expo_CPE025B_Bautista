import React, { useState } from 'react';
import { View, Text, Pressable, Modal, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

function UserIcon() {
  const [visible, setVisible] = useState(false);

  const handleOpen = () => setVisible(true);
  const handleClose = () => setVisible(false);

  return (
    <View>
      {/* USER ICON */}
      <Pressable onPress={handleOpen}>
        <MaterialIcons name="account-circle" size={36} color="#1E90FF" />
      </Pressable>

      {/* MODAL */}
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={handleClose} // Android back button
      >
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.title}>Welcome Mr.Jonathan Joestar</Text>
            <Text style={styles.message}>Welcome to the application!</Text>

            <Pressable onPress={handleClose} style={styles.closeButton}>
              <Text style={styles.closeText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default UserIcon;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#121212',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  title: {
    color: '#1E90FF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  message: {
    color: 'white',
    marginBottom: 20,
    fontSize: 16,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  closeText: {
    color: '#1E90FF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});