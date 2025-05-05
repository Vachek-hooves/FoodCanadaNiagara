import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import {dishes} from '../../data/dishes';
import OnboardCard from '../../components/OnboardCard';
import {useNavigation} from '@react-navigation/native';

const Onboard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigation = useNavigation();

  const handleNextStep = () => {
    if (currentStep === 4) {
      navigation.navigate('TabNav');
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View
          style={{
            backgroundColor: 'rgba(59, 8, 8, 0.14)',
          }}>
          <ImageBackground
            source={require('../../../assets/images/onboardBg.png')}
            style={styles.imageBackground}
            imageStyle={styles.imageStyle}>
            <View style={styles.headerContainer}>
              <View style={styles.dottedLine}>
                {[1, 2, 3, 4].map(step => (
                  <View
                    key={step}
                    style={[
                      styles.dot,
                      currentStep >= step
                        ? styles.activeDot
                        : styles.inactiveDot,
                    ]}
                  />
                ))}
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate('TabNav')}>
                <Image
                  source={require('../../../assets/images/icons/onboardClose.png')}
                />
              </TouchableOpacity>
            </View>

            {currentStep === 1 && (
              <View>
                <View
                  style={{
                    marginHorizontal: 16,
                    marginTop: 30,
                    marginBottom: 70,
                  }}>
                  <Text style={styles.titleText}>Discover</Text>
                  <Text style={styles.titleText}>the most delicious</Text>
                  <Text style={styles.titleText}>Canadian dish recipes</Text>
                  <Text style={styles.secondText}>
                    The app features a variety of dish categories...
                  </Text>
                </View>
                <View style={{marginBottom: 20, paddingLeft: 16}}>
                  <Text style={styles.blockTitleText}>Popular recipes</Text>
                  <View style={{flexDirection: 'row', gap: 10}}>
                    {dishes.slice(0, 4).map(note => (
                      <OnboardCard note={note} key={note.id} />
                    ))}
                  </View>
                </View>
                <View
                  style={{
                    marginHorizontal: 16,
                    marginTop: 50,
                  }}>
                  <TouchableOpacity
                    onPress={() => handleNextStep()}
                    activeOpacity={0.7}
                    style={styles.mainBtnContainer}>
                    <Text style={styles.mainBtnText}>Next</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            {currentStep === 2 && (
              <View>
                <View style={{marginHorizontal: 16, marginTop: 30}}>
                  <Text style={styles.titleText}>Easily and quickly</Text>
                  <Text style={styles.titleText}>record your recipes</Text>
                </View>
                <View style={{marginLeft: 60, marginTop: 25}}>
                  <Image
                    source={require('../../../assets/images/onboardArrow.png')}
                  />
                </View>
                <View style={{marginTop: 10, alignItems: 'center'}}>
                  <View activeOpacity={0.7} style={styles.addBtnContainer}>
                    <Image
                      source={require('../../../assets/images/icons/add.png')}
                      style={{}}
                    />
                  </View>
                </View>

                <View style={{marginHorizontal: 16}}>
                  <Text style={styles.secondaryText}>Heading</Text>
                  <View>
                    <TextInput
                      style={styles.input}
                      placeholder="Heading"
                      editable={false}
                      placeholderTextColor="rgba(60, 60, 67, 0.6)"
                    />
                  </View>

                  <Text style={styles.secondaryText}>Description</Text>
                  <View>
                    <TextInput
                      textAlignVertical="top"
                      style={[styles.input, {height: 88}]}
                      placeholder="Description"
                      editable={false}
                      placeholderTextColor="rgba(60, 60, 67, 0.6)"
                    />
                  </View>
                </View>

                <View
                  style={{
                    marginHorizontal: 16,
                    marginTop: 100,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 30,
                  }}>
                  <TouchableOpacity
                    onPress={() => handlePreviousStep()}
                    activeOpacity={0.7}
                    style={styles.goBackButton}>
                    <Image
                      source={require('../../../assets/images/icons/goBack.png')}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleNextStep()}
                    activeOpacity={0.7}
                    style={styles.smallBtn}>
                    <Text
                      style={{fontWeight: '700', fontSize: 20, color: '#fff'}}>
                      Next
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            {currentStep === 3 && (
              <View>
                <View
                  style={{
                    marginHorizontal: 16,
                    marginTop: 30,
                    marginBottom: 35,
                  }}>
                  <Text style={styles.titleText}>Create notes</Text>
                  <Text style={styles.titleText}>so you don't forget</Text>
                  <Text style={styles.titleText}>anything</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    marginHorizontal: 16,
                    justifyContent: 'center',
                  }}>
                  <Image source={require('../../../assets/images/note1.png')} />
                  <Image source={require('../../../assets/images/note2.png')} />
                  <Image source={require('../../../assets/images/note3.png')} />
                  <Image source={require('../../../assets/images/note4.png')} />
                </View>
                <View
                  style={{
                    marginHorizontal: 16,
                    marginTop: 70,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 30,
                  }}>
                  <TouchableOpacity
                    onPress={() => handlePreviousStep()}
                    activeOpacity={0.7}
                    style={styles.goBackButton}>
                    <Image
                      source={require('../../../assets/images/icons/goBack.png')}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleNextStep()}
                    activeOpacity={0.7}
                    style={styles.smallBtn}>
                    <Text
                      style={{fontWeight: '700', fontSize: 20, color: '#fff'}}>
                      Next
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            {currentStep === 4 && (
              <View style={{marginHorizontal: 16}}>
                <View style={{marginTop: 30, marginBottom: 25}}>
                  <Text style={styles.titleText}>
                    In the settings, you can adjust your personal information
                    and find the necessary features
                  </Text>
                </View>
                <View style={styles.userContainer}>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      source={require('../../../assets/images/userAva.png')}
                      style={{width: 88, height: 88, borderRadius: 100}}
                    />
                    <View activeOpacity={0.7} style={styles.btnPenContainer}>
                      <Image
                        source={require('../../../assets/images/icons/Pen.png')}
                      />
                    </View>
                    <View style={{marginLeft: 20}}>
                      <Text style={styles.nameText}>Aurora Borealis</Text>
                      <Text style={styles.secondTextUser}>
                        Downloaded in 2025
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{marginHorizontal: 16}}>
                  <Text style={styles.textTitlte}>Profile Settings</Text>

                  <View activeOpacity={0.7} style={styles.settingsContainer}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image
                        source={require('../../../assets/images/icons/changeName.png')}
                      />
                      <Text style={styles.settingsSecondaryText}>
                        Change Name
                      </Text>
                    </View>
                    <Image
                      source={require('../../../assets/images/icons/nextArrow.png')}
                    />
                  </View>
                  {/* <View activeOpacity={0.7} style={styles.settingsContainer}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image
                        source={require('../../../assets/images/icons/contactWithUs.png')}
                      />
                      <Text style={styles.settingsSecondaryText}>
                        Contact with us
                      </Text>
                    </View>
                    <Image
                      source={require('../../../assets/images/icons/nextArrow.png')}
                    />
                  </View> */}
                </View>
                <View
                  style={{
                    marginHorizontal: 16,
                    marginTop: 40,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 30,
                  }}>
                  <TouchableOpacity
                    onPress={() => handlePreviousStep()}
                    activeOpacity={0.7}
                    style={styles.goBackButton}>
                    <Image
                      source={require('../../../assets/images/icons/goBack.png')}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleNextStep()}
                    activeOpacity={0.7}
                    style={styles.smallBtn}>
                    <Text
                      style={{fontWeight: '700', fontSize: 20, color: '#fff'}}>
                      Let’s start
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </ImageBackground>
        </View>
      </ScrollView>
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

  mainBtnContainer: {
    width: '100%',
    height: 56,
    borderRadius: 20,
    backgroundColor: '#FFC20E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallBtn: {
    width: '75%',
    height: 56,
    borderRadius: 20,
    backgroundColor: '#FFC20E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainBtnText: {fontWeight: '700', fontSize: 20, color: '#fff'},
  headerContainer: {
    marginTop: 30,
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  goBackButton: {
    width: '20%',
    height: 56,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTitlte: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
    marginTop: 28,
    marginBottom: 35,
  },
  noteCard: {position: 'absolute', right: 45, top: 100},
  addBtnContainer: {
    width: 64,
    height: 64,
    backgroundColor: '#0F301F',
    borderRadius: 99,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userContainer: {
    width: '100%',
    backgroundColor: '#1C5839',
    padding: 24,
    borderRadius: 32,
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
  },
  secondTextUser: {
    fontSize: 16,
    fontWeight: '400',
    color: '#999999',
  },
  settingsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  settingsSecondaryText: {
    fontSize: 17,
    fontWeight: '400',
    color: '#fff',
    marginLeft: 8,
  },
  titleText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '700',
  },
  btnPenContainer: {
    width: 32,
    height: 32,
    backgroundColor: '#FFC20E',
    borderRadius: 99,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 60,
    bottom: 0,
  },
  nameText: {
    fontSize: 28,
    fontWeight: '600',
    color: '#fff',
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
    backgroundColor: '#1C5839',
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
  input: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingLeft: 20,
    height: 52,
    fontSize: 17,
    fontWeight: '400',
    color: '#000',
    width: '100%',
    marginBottom: 19,
  },
  secondaryText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
  },
});

export default Onboard;
