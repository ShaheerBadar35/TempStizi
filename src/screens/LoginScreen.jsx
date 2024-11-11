import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase/app';
import 'firebase/auth';

// Firebase configuration (You need to set up Firebase in your project)
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const LoginScreen = () => {
  const navigation = useNavigation();
  const [countryCode, setCountryCode] = useState('PK'); // Default to Pakistan
  const [callingCode, setCallingCode] = useState('+92'); // Default to +92
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showGetCode, setShowGetCode] = useState(false);

  const handlePhoneNumberChange = (number) => {
    setPhoneNumber(number);
    setShowGetCode(number.length > 0); // Show "Get Code" button when phone number is entered
  };

  const handleSendCode = async () => {
    const fullPhoneNumber = callingCode + phoneNumber;

    // Send SMS with Firebase Phone Authentication
    const recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      'recaptcha-container', // ReCaptcha container (add this element in your component, or initialize on the server)
      { size: 'invisible', callback: () => {} },
    );

    try {
      const confirmation = await firebase.auth().signInWithPhoneNumber(fullPhoneNumber, recaptchaVerifier);
      // After sending the verification code, navigate to verification screen
      navigation.navigate('VerifyCodeScreen', { confirmation });
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Stizi</Text>
        <Text style={styles.subtitle}>Welcome Back</Text>
      </View>

      <View style={styles.phoneInputContainer}>
        <CountryPicker
          countryCode={countryCode}
          withCallingCode
          withFlag
          withFilter
          onSelect={(country) => {
            setCountryCode(country.cca2);
            setCallingCode(country.callingCode[0]);
          }}
          containerButtonStyle={styles.countryPicker}
        />
        <View style={styles.divider} />
        <TextInput
          style={styles.phoneInput}
          placeholder="Phone number"
          placeholderTextColor="#B0AEB1"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={handlePhoneNumberChange}
        />
      </View>

      {/* Conditionally render the 'Get Code' button */}
      {showGetCode && (
        <TouchableOpacity style={styles.getCodeButton} onPress={handleSendCode}>
          <Text style={styles.getCodeText}>Get Code</Text>
        </TouchableOpacity>
      )}

      <View style={{ width: "90%" }}>
        {showGetCode && (
          <Text style={{ color: '#F4F2F2', fontSize: 14, fontWeight: 400 }}>
            By providing your phone number, you agree Sidenote may 
            send you texts with notifications and security codes.
          </Text>
        )}
      </View>

      {!showGetCode && (
        <TouchableOpacity>
          <View style={styles.textContainer}>
            <Text style={{ color: '#107CF1', fontSize: 16, fontWeight: '700', margin: 20 }}>
              SignUp with Email
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default LoginScreen;

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
  getCodeButton: {
    backgroundColor: '#B4FFC0',
    borderRadius: 25,
    paddingVertical: 13,
    paddingHorizontal: "130",
    marginTop: 30,
    marginBottom: 20,
  },
  getCodeText: {
    color: '#107CF1',
    fontSize: 16,
    fontWeight: '700',
  },
});
// import React, { useState } from 'react';
// import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
// import CountryPicker from 'react-native-country-picker-modal';

// const LoginScreen = () => {
//   const [countryCode, setCountryCode] = useState('PK'); // Default to United States
//   const [callingCode, setCallingCode] = useState('+92'); // Default to +1
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [showGetCode, setShowGetCode] = useState(false);

//   const handlePhoneNumberChange = (number) => {
//     setPhoneNumber(number);
//     setShowGetCode(number.length > 0); // Show "Get Code" button when phone number is entered
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.textContainer}>
//         <Text style={styles.title}>Stizi</Text>
//         <Text style={styles.subtitle}>Welcome Back</Text>
//       </View>

//       <View style={styles.phoneInputContainer}>
//         <CountryPicker
//           countryCode={countryCode}
//           withCallingCode
//           withFlag
//           withFilter
//           onSelect={(country) => {
//             setCountryCode(country.cca2);
//             setCallingCode(country.callingCode[0]);
//           }}
//           containerButtonStyle={styles.countryPicker}
//         />
//         <View style={styles.divider} />
//         <TextInput
//           style={styles.phoneInput}
//           placeholder="Phone number"
//           placeholderTextColor="#B0AEB1"
//           keyboardType="phone-pad"
//           value={phoneNumber}
//           onChangeText={handlePhoneNumberChange}
//         />
//       </View>

//       {/* Conditionally render the 'Get Code' button */}
//       {showGetCode && (
//         <TouchableOpacity style={styles.getCodeButton}>
//           <Text style={styles.getCodeText}>Get Code</Text>
//         </TouchableOpacity>
//       )}
//       <View style={{width:"90%"}}>
//         {showGetCode && (
//           <Text style={{color:'#F4F2F2',fontSize:14,fontWeight:400}}>
//             By providing your phone number, you agree Sidenote may 
//             send you texts with notifications and security codes
//           </Text>
//         )}
//       </View>
//       {!showGetCode && (
//               <TouchableOpacity>
//               <View style={styles.textContainer}>
//                 <Text style={{ color: '#107CF1', fontSize: 16, fontWeight: '700', margin: 20 }}>
//                   SignUp with Email
//                 </Text>
//               </View>
//             </TouchableOpacity>
//       )}
//     </View>
//   );
// };

// export default LoginScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#340472',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   textContainer: {
//     alignItems: 'center',
//     marginBottom: 40,
//   },
//   title: {
//     fontSize: 64,
//     fontWeight: '400',
//     color: '#B4FFC0',
//   },
//   subtitle: {
//     fontSize: 17,
//     fontWeight: '700',
//     color: '#F4F2F2',
//     marginTop: 8,
//   },
//   phoneInputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#5E0380',
//     borderRadius: 10,
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     width: '80%',
//   },
//   countryPicker: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 10,
//   },
//   divider: {
//     height: '100%',
//     width: 1,
//     backgroundColor: '#B0AEB1',
//     marginHorizontal: 10,
//   },
//   phoneInput: {
//     flex: 1,
//     fontSize: 16,
//     color: '#FFF',
//   },
//   getCodeButton: {
//     backgroundColor: '#B4FFC0',
//     borderRadius: 25,
//     paddingVertical: 13,
//     paddingHorizontal: "130",
//     marginTop: 30,
//     marginBottom:20,
//   },
//   getCodeText: {
//     color: '#107CF1',
//     fontSize: 16,
//     fontWeight: '700',
//   },
// });
