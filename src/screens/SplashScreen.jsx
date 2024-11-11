// // SplashScreen.js
// import React, { useEffect } from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const SplashScreen = ({ navigation }) => {
//   useEffect(() => {
//     // Set a timer for navigating to the main screen after 3 seconds
//     const timer = setTimeout(() => {
//       navigation.replace('Home');
//     }, 3000);

//     return () => clearTimeout(timer); // Clean up the timer
//   }, [navigation]);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Stizi</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#ffffff', // Set background color
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     color: '#333333', // Set text color
//   },
// });

// export default SplashScreen;
