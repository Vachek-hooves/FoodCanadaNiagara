import {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomModal from '../../components/CustomModal';
import {useNavigation} from '@react-navigation/native';

const Settings = () => {
  const [onChangeValue, setOnChangeValue] = useState('');
  const [userImage, setUserImage] = useState('');
  const [name, setName] = useState('');

  const [changePhoto, setChangePhoto] = useState(false);
  const [saveProfile, setSaveProfile] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    getData();
  }, [saveProfile, isVisible]);

  console.log('userimg', userImage);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  let options = {
    storageOptions: {
      path: 'image',
      // maxHeight: 600,
      // maxWidth: 600,
    },
  };

  const imagePicker = () => {
    launchImageLibrary(options, response => {
      if (response.didCancel) return;
      setUserImage(response.assets[0].uri);

      setChangePhoto(true);
    });
  };

  const saveData = async () => {
    setSaveProfile(true);

    const newData = {
      onChangeValue,
      userImage,
    };

    try {
      await AsyncStorage.setItem('profileData', JSON.stringify(newData));
      console.log('saved', newData);
      setOnChangeValue('');
    } catch (error) {
      console.log('error', error);
    }
  };

  const getData = async () => {
    try {
      const savedData = await AsyncStorage.getItem('profileData');
      const parsed = JSON.parse(savedData);
      if (parsed != null) {
        setSaveProfile(true);
      }
      setName(parsed.onChangeValue);
      setUserImage(parsed.userImage);
      setChangePhoto(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeName = async () => {
    setIsVisible(false);
    const newData = {
      onChangeValue,
      userImage,
    };
    try {
      await AsyncStorage.setItem('profileData', JSON.stringify(newData));
      console.log('saved', newData);
    } catch (error) {
      console.log('error', error);
    }
  };

  const isDisabled = userImage === '' || onChangeValue === '';

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete account',
      'Are you sure you want to delete your account? This action is irreversible.',
      [
        {
          text: 'Back',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            setSaveProfile(false);
            setUserImage('');
            setChangePhoto(false);
            AsyncStorage.clear();
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <ImageBackground
      source={require('../../../assets/images/onboardBg.png')}
      style={{flex: 1}}>
      <View style={styles.bgContainer}>
        <ScrollView>
          {saveProfile ? (
            <View
              style={[styles.topContainer, saveProfile && {alignItems: ''}]}>
              <View>
                <Text style={styles.mainTitle}>Settings</Text>
                <View>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      source={{uri: userImage}}
                      style={{width: 88, height: 88, borderRadius: 100}}
                    />
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => imagePicker()}
                      style={styles.btnPenContainer}>
                      <Image
                        source={require('../../../assets/images/icons/Pen.png')}
                      />
                    </TouchableOpacity>
                    <View style={{marginLeft: 20}}>
                      <Text style={styles.nameText}>{name}</Text>
                      <Text style={styles.secondText}>Downloaded in 2025</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.topContainer}>
              <View>
                <Text style={styles.mainTitle}>Settings</Text>

                {!changePhoto && (
                  <View>
                    <Image
                      source={require('../../../assets/images/icons/person.png')}
                    />
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => imagePicker()}
                      style={styles.addImgContainer}>
                      <Image
                        source={require('../../../assets/images/icons/plus.png')}
                      />
                    </TouchableOpacity>
                  </View>
                )}

                {changePhoto && (
                  <Image
                    source={{uri: userImage}}
                    style={{width: 88, height: 88, borderRadius: 100}}
                  />
                )}
              </View>

              <TextInput
                style={styles.input}
                placeholder="Your name"
                value={onChangeValue}
                placeholderTextColor="rgba(60, 60, 67, 0.6)"
                onChangeText={setOnChangeValue}
              />
              <TouchableOpacity
                disabled={isDisabled}
                onPress={() => saveData()}
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
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={{marginHorizontal: 16}}>
            <Text style={styles.textTitlte}>Profile Settings</Text>
          </View>

          <View style={{marginHorizontal: '28'}}>
            <TouchableOpacity
              onPress={() => setIsVisible(true)}
              activeOpacity={0.7}
              style={styles.settingsContainer}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={require('../../../assets/images/icons/changeName.png')}
                />
                <Text style={styles.settingsSecondaryText}>Change Name</Text>
              </View>
              <Image
                source={require('../../../assets/images/icons/nextArrow.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('ContactWithUs')}
              activeOpacity={0.7}
              style={styles.settingsContainer}>
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
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.settingsContainer}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={require('../../../assets/images/icons/devSite.png')}
                />
                <Text style={styles.settingsSecondaryText}>
                  Developer Website
                </Text>
              </View>
              <Image
                source={require('../../../assets/images/icons/nextArrow.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.settingsContainer}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={require('../../../assets/images/icons/terms.png')}
                />
                <Text style={styles.settingsSecondaryText}>Terms of Use</Text>
              </View>
              <Image
                source={require('../../../assets/images/icons/nextArrow.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.settingsContainer}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={require('../../../assets/images/icons/privacy.png')}
                />
                <Text style={styles.settingsSecondaryText}>Privacy Policy</Text>
              </View>
              <Image
                source={require('../../../assets/images/icons/nextArrow.png')}
              />
            </TouchableOpacity>

            {saveProfile && (
              <View>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.settingsContainer}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={require('../../../assets/images/icons/notify.png')}
                    />
                    <Text style={styles.settingsSecondaryText}>
                      Notifications
                    </Text>
                  </View>
                  <Switch onValueChange={toggleSwitch} value={isEnabled} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDeleteAccount()}
                  activeOpacity={0.7}
                  style={styles.settingsContainer}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={require('../../../assets/images/icons/delete.png')}
                    />
                    <Text
                      style={[
                        styles.settingsSecondaryText,
                        saveProfile && {color: '#FF999D'},
                      ]}>
                      Delete account
                    </Text>
                  </View>
                  <Image
                    source={require('../../../assets/images/icons/nextArrow.png')}
                    tintColor={'#FF999D'}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
      {isVisible && (
        <CustomModal visible={true}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 24,
            }}>
            <Text style={{fontSize: 20, fontWeight: '700', color: '#fff'}}>
              Change name
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setIsVisible(false)}>
              <Image
                source={require('../../../assets/images/icons/closeModal.png')}
              />
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Your name"
            value={onChangeValue}
            placeholderTextColor="rgba(60, 60, 67, 0.6)"
            onChangeText={setOnChangeValue}
          />
          <TouchableOpacity
            onPress={() => handleChangeName()}
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
              Save
            </Text>
          </TouchableOpacity>
        </CustomModal>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingLeft: 20,
    height: 52,
    fontSize: 17,
    fontWeight: '400',
    color: '#000',
    width: '100%',
    marginBottom: 20,
    marginTop: 20,
  },
  bgContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    width: '100%',
    height: '100%',
  },
  topContainer: {
    width: '100%',
    paddingBottom: 25,
    backgroundColor: '#1C5839',
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    paddingTop: 60,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  inputImage: {
    position: 'absolute',
    top: 18,
    left: 20,
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
  textTitlte: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
    marginTop: 28,
    marginBottom: 35,
  },
  addImgContainer: {
    width: 32,
    height: 32,
    backgroundColor: '#FFC20E',
    borderRadius: 99,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: -5,
    bottom: -5,
  },
  mainTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 35,
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
    fontSize: 16,
    fontWeight: '400',
    color: '#999999',
  },
});

export default Settings;
