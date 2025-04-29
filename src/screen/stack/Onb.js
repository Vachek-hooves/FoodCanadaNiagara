import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {dishes} from '../../data/dishes';
import OnboardCard from '../../components/OnboardCard';

const Onb = () => {
  const [currentStep, setCurrentStep] = useState(1); // Keeps track of the current progress step

  const handleNextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: 'rgba(59, 8, 8, 0.14)',
        }}>
        <ImageBackground
          source={require('../../../assets/images/onboardBg.png')}
          style={styles.imageBackground}
          imageStyle={styles.imageStyle}>
          <View
            style={{
              marginTop: 30,
              marginHorizontal: 16,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={styles.dottedLine}>
              {[1, 2, 3, 4].map(step => (
                <View
                  key={step}
                  style={[
                    styles.dot,
                    currentStep >= step ? styles.activeDot : styles.inactiveDot,
                  ]}
                />
              ))}
            </View>
            <Image
              source={require('../../../assets/images/icons/onboardClose.png')}
            />
          </View>

          <View style={{marginHorizontal: 16, marginTop: 30, marginBottom: 70}}>
            <Text style={styles.titleText}>Discover</Text>
            <Text style={styles.titleText}>the most delicious</Text>
            <Text style={styles.titleText}>Canadian dish recipes</Text>
            <Text style={styles.secondText}>
              The app features a variety of dish categories...
            </Text>
          </View>

          <View style={{marginBottom: 20, paddingLeft: 16}}>
            <Text style={styles.blockTitleText}>Popular recipes</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {dishes.slice(0, 4).map(note => (
                <OnboardCard note={note} key={note.id} />
              ))}
            </ScrollView>
          </View>
          <View style={{marginHorizontal: 16, marginTop: 50}}>
            <TouchableOpacity
              onPress={() => pressed}
              activeOpacity={0.7}
              style={{
                width: '100%',
                height: 56,
                borderRadius: 20,
                backgroundColor: '#FFC20E',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontWeight: '700', fontSize: 20, color: '#fff'}}>
                Next
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  dottedLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  titleText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '700',
  },
  secondText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
    marginTop: 10,
  },
  blockTitleText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 10,
  },
  dot: {
    height: 4,
    width: 60,
    borderRadius: 12,
  },
  activeDot: {
    backgroundColor: '#FFD700',
  },
  inactiveDot: {
    backgroundColor: '#fff',
  },

  imageBackground: {
    marginTop: 100,
    height: '100%',
  },
  imageStyle: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    opacity: 0.6,
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default Onb;
