// import React, {useState} from 'react';
// import {
//   StyleSheet,
//   View,
//   ImageBackground,
//   Text,
//   TouchableOpacity,
//   Image,
// } from 'react-native';

// const Onboard = () => {
//   const [currentStep, setCurrentStep] = useState(1); // Keeps track of the current progress step

//   const handleNextStep = () => {
//     if (currentStep < 4) setCurrentStep(currentStep + 1);
//   };

//   const handlePreviousStep = () => {
//     if (currentStep > 1) setCurrentStep(currentStep - 1);
//   };

//   return (
//     <View style={styles.container}>
//       <View
//         style={{
//           backgroundColor: 'rgba(59, 8, 8, 0.14)',
//         }}>
//         <ImageBackground
//           source={require('../../../assets/images/onboardBg.png')}
//           style={styles.imageBackground}
//           imageStyle={styles.imageStyle}>
//           <View
//             style={{
//               marginTop: 30,
//               marginHorizontal: 16,
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//             }}>
//             <View style={styles.dottedLine}>
//               {[1, 2, 3, 4].map(step => (
//                 <View
//                   key={step}
//                   style={[
//                     styles.dot,
//                     currentStep >= step ? styles.activeDot : styles.inactiveDot,
//                   ]}
//                 />
//               ))}
//             </View>
//             <Image
//               source={require('../../../assets/images/icons/onboardClose.png')}
//             />
//           </View>

//           <View style={{marginHorizontal: 16}}></View>
//         </ImageBackground>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//   },
//   dottedLine: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '80%',
//   },
//   titleText: {
//     color: '#fff',
//     fontSize: 32,
//     fontWeight: '700',
//     marginTop: 10,
//   },
//   secondText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '400',
//     marginTop: 10,
//   },
//   dot: {
//     height: 4,
//     width: 60,
//     borderRadius: 12,
//   },
//   activeDot: {
//     backgroundColor: '#FFD700',
//   },
//   inactiveDot: {
//     backgroundColor: '#fff',
//   },

//   imageBackground: {
//     marginTop: 100,
//     height: '100%',
//   },
//   imageStyle: {
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     overflow: 'hidden',
//     opacity: 0.6,
//   },
//   text: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginTop: 10,
//   },
// });

// export default Onboard;
