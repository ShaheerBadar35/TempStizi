import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import firebase from 'firebase/app';
import 'firebase/auth';

const VerifyCodeScreen = () => {
  const [code, setCode] = useState('');
  const route = useRoute();
  const { confirmation } = route.params; // Get the confirmation from the previous screen

  const handleVerifyCode = async () => {
    try {
      await confirmation.confirm(code); // Confirm the code
      Alert.alert('Success', 'Phone number verified!');
      // Proceed to the next screen, e.g., home screen or dashboard
    } catch (error) {
      Alert.alert('Error', 'Invalid code');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Verification Code</Text>
      <TextInput
        style={styles.codeInput}
        placeholder="Enter Code"
        keyboardType="number-pad"
        value={code}
        onChangeText={setCode}
      />
      <TouchableOpacity style={styles.verifyButton} onPress={handleVerifyCode}>
        <Text style={styles.verifyButtonText}>Verify Code</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VerifyCodeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#340472',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#B4FFC0',
    marginBottom: 20,
  },
  codeInput: {
    width: '80%',
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 18,
  },
  verifyButton: {
    backgroundColor: '#107CF1',
    borderRadius: 25,
    paddingVertical: 13,
    paddingHorizontal: 50,
  },
  verifyButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
