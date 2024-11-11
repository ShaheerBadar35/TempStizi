import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import CountryPicker from 'react-native-country-picker-modal'

const SignUpScreen = () => {
  const [countryCode, setCountryCode] = useState('US') // Default to United States
  const [callingCode, setCallingCode] = useState('1') // Default to +1
  const [phoneNumber, setPhoneNumber] = useState('')

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Stizi</Text>
        <Text style={styles.subtitle}>Welcome Back</Text>
      </View>
      <View style={styles.phoneInputContainer}>
        <TextInput
          style={styles.phoneInput}
          placeholder="Enter your email address"
          placeholderTextColor="#B0AEB1"
          keyboardType="email-address"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
      </View>
    <TouchableOpacity>
        <View style={styles.textContainer}>
                <Text style={{color:'#107CF1',fontSize:16,fontWeight:700,margin:20,}}>Login with Number</Text>
        </View>        
    </TouchableOpacity>
    </View>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#340472',
        justifyContent: 'center',
        alignItems: 'center',
      },
      textContainer: {
        alignItems: 'center',
        marginBottom: 40,
      },
      title: {
        fontSize: 64,
        fontWeight: '400',
        color: '#B4FFC0',
      },
      subtitle: {
        fontSize: 17,
        fontWeight: '700',
        color: '#F4F2F2',
        marginTop: 8,
      },
      phoneInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#5E0380',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        width: '80%',
      },
      countryPicker: {
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
      },
      divider: {
        height: '100%',
        width: 1,
        backgroundColor: '#B0AEB1',
        marginHorizontal: 10,
      },
      phoneInput: {
        flex: 1,
        fontSize: 16,
        color: '#FFF',
      },
})
