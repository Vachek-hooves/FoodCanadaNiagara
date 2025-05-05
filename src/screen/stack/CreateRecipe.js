import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Layout from '../../components/Layout';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import CustomModal from '../../components/CustomModal';
import {TimerPicker} from 'react-native-timer-picker';

const CreateRecipe = () => {
  const navigation = useNavigation();
  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState('');
  const [image, setImage] = useState('');
  const [changePhoto, setChangePhoto] = useState(false);
  const [selectCategoryId, setSelectCategoryId] = useState(1);
  const [showTaskInput, setShowTaskInput] = useState(false);
  const [category, setCategory] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [min, setMin] = useState(0);
  const [hours, setHours] = useState(0);
  const [sec, setSec] = useState(0);
  const [showImageError, setShowImageError] = useState(false);
  const [showHeadingError, setShowHeadingError] = useState(false);
  const [showDescriptionError, setShowDescriptionError] = useState(false);
  const [checkCategory, setCheckCategory] = useState([
    {
      id: 1,
      title: 'Breakfast',
      checked: true,
    },
    {
      id: 2,
      title: 'Lunch',
      checked: false,
    },
    {
      id: 3,
      title: 'Dinner',
      checked: false,
    },
    {
      id: 4,
      title: 'Snacks',
      checked: false,
    },
    {
      id: 5,
      title: 'Fast food',
      checked: false,
    },
    {
      id: 6,
      title: 'Bakery',
      checked: false,
    },
  ]);
  const [showTime, setShowTime] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);

  console.log('sec', sec);

  const formatTime = ({minutes, hours, seconds}) => {
    const timeParts = [];

    console.log('hours', hours);

    if (hours !== undefined || hours !== 0) {
      setHours(hours.toString().padStart(2, '0'));
      console.log('seth', hours);
    }
    if (minutes !== undefined || minutes !== 0) {
      setMin(minutes.toString().padStart(2, '0'));
    }
    if (seconds !== undefined || seconds !== 0) {
      setSec(seconds.toString().padStart(2, '0'));
    }

    setSelectedTime(timeParts);
  };

  const handleRating = star => {
    setRating(star);
  };

  let options = {
    storageOptions: {
      path: 'image',
      maxHeight: 600,
      maxWidth: 600,
    },
  };

  const imagePicker = () => {
    launchImageLibrary(options, response => {
      if (response.didCancel) return;
      setImage(response.assets[0].uri);
      setChangePhoto(true);
      setShowImageError(false);
    });
  };

  const selectCategory = selectedCategory => {
    setCategory(selectedCategory.category);
    const checked = checkCategory.map(cat => {
      if (cat.id === selectedCategory.id) {
        return {
          ...cat,
          checked: true,
        };
      }
      return {
        ...cat,
        checked: false,
      };
    });
    setSelectCategoryId(selectedCategory.id);
    setCheckCategory(checked);
  };

  const saveData = async () => {
    let hasError = false;
    
    if (heading === '') {
      setShowHeadingError(true);
      hasError = true;
    } else {
      setShowHeadingError(false);
    }

    if (description === '') {
      setShowDescriptionError(true);
      hasError = true;
    } else {
      setShowDescriptionError(false);
    }

    if (image === '') {
      setShowImageError(true);
      hasError = true;
    } else {
      setShowImageError(false);
    }

    if (hasError) {
      return;
    }

    const newData = {
      id: Date.now(),
      description,
      tasks,
      heading,
      rating,
      image,
      selectCategoryId,
    };
    try {
      const jsonValue = await AsyncStorage.getItem('myRecipe');
      let recipe = jsonValue !== null ? JSON.parse(jsonValue) : [];
      console.log('recipe', recipe);
      recipe.push(newData);
      await AsyncStorage.setItem('myRecipe', JSON.stringify(recipe));
      navigation.goBack('');
    } catch (e) {
      console.error('Failed to add item to favorites:', e);
    }
  };

  return (
    <Layout>
      <ScrollView>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../../assets/images/icons/backArrow.png')}
            />
            <Text style={styles.headerText}>Back</Text>
          </TouchableOpacity>
        </View>

        <View style={{marginHorizontal: 16}}>
          <Text style={styles.blockTitleText}>Receipt</Text>
        </View>

        <View style={{marginHorizontal: 16}}>
          <Text style={styles.secondaryText}>Heading *</Text>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Heading"
              value={heading}
              placeholderTextColor="rgba(60, 60, 67, 0.6)"
              onChangeText={text => {
                setHeading(text);
                setShowHeadingError(false);
              }}
            />
            <TouchableOpacity activeOpacity={0.7} style={styles.inputImg}>
              {heading !== '' && (
                <Image
                  source={require('../../../assets/images/icons/deleteInput.png')}
                />
              )}
            </TouchableOpacity>
          </View>
          {showHeadingError && (
            <Text style={styles.errorText}>Please enter a heading</Text>
          )}

          <Text style={styles.secondaryText}>Description *</Text>
          <View>
            <TextInput
              textAlignVertical="top"
              style={[styles.input, {height: 88}]}
              placeholder="Description"
              value={description}
              placeholderTextColor="rgba(60, 60, 67, 0.6)"
              onChangeText={text => {
                setDescription(text);
                setShowDescriptionError(false);
              }}
            />
            <TouchableOpacity activeOpacity={0.7} style={styles.inputImg}>
              {description !== '' && (
                <Image
                  source={require('../../../assets/images/icons/deleteInput.png')}
                />
              )}
            </TouchableOpacity>
          </View>
          {showDescriptionError && (
            <Text style={styles.errorText}>Please enter a description</Text>
          )}
          <Text style={styles.secondaryText}>Ingredients</Text>
          {showTaskInput ? (
            <View>
              <TextInput
                style={styles.input}
                placeholder="Description"
                value={tasks}
                placeholderTextColor="rgba(60, 60, 67, 0.6)"
                onChangeText={setTasks}
              />
              <TouchableOpacity activeOpacity={0.7} style={styles.inputImg}>
                <Image
                  source={require('../../../assets/images/icons/deleteInput.png')}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => setShowTaskInput(true)}
              activeOpacity={0.7}
              style={{
                flexDirection: 'row',
                marginBottom: 10,
                marginTop: 5,
              }}>
              <Image
                source={require('../../../assets/images/icons/add.png')}
                style={{width: 16, height: 16}}
              />
              <Text style={styles.smallText}>Add ingredient</Text>
            </TouchableOpacity>
          )}
          <Text style={styles.secondaryText}>Category and color</Text>
          <View style={styles.categoriesWrap}>
            {checkCategory.map((category, idx) => (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => selectCategory(category)}
                key={idx}
                style={[
                  styles.categoryContainer,
                  category.checked && {
                    backgroundColor: '#fff',
                    borderColor: '#fff',
                  },
                ]}>
                <Text
                  style={[
                    styles.categoryText,
                    category.checked && {color: '#000'},
                  ]}>
                  {category.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {changePhoto ? (
            <Image source={{uri: image}} style={styles.userImg} />
          ) : (
            <View>
              <Text style={styles.secondaryText}>Cover *</Text>
              <TouchableOpacity
                onPress={() => imagePicker()}
                activeOpacity={0.7}
                style={styles.imagePickerContainer}>
                <Image
                  source={require('../../../assets/images/icons/add.png')}
                  style={{width: 14, height: 14}}
                  tintColor={'#1C5839'}
                />
              </TouchableOpacity>
              {showImageError && (
                <Text style={styles.errorText}>Please add a cover image</Text>
              )}
            </View>
          )}

          <Text style={styles.secondaryText}>Difficulty</Text>

          <View style={styles.containers}>
            <View style={styles.starsContainer}>
              {[1, 2, 3, 4, 5].map(star => (
                <TouchableOpacity key={star} onPress={() => handleRating(star)}>
                  {star <= rating ? (
                    <Image
                      source={require('../../../assets/images/icons/rating.png')}
                      tintColor={'#FFC20E'}
                    />
                  ) : (
                    <Image
                      source={require('../../../assets/images/icons/rating.png')}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <Text style={styles.secondaryText}>Duration</Text>
          <TouchableOpacity
            onPress={() => setIsVisible(true)}
            style={styles.deadlinesContainer}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../../assets/images/icons/notesTime.png')}
                style={{position: 'absolute', left: -50}}
              />
              {hours > 0 && (
                <Text style={styles.deadlinesText}>
                  {showTime && hours} {showTime && 'hour'}
                  {!showTime && 'Time'}
                </Text>
              )}
              {min > 0 && (
                <Text style={styles.deadlinesText}>
                  {showTime && min} {showTime && 'min'}
                  {!showTime && 'Time'}
                </Text>
              )}
              {sec > 0 && (
                <Text style={styles.deadlinesText}>
                  {showTime && sec} {showTime && 'sec'}
                  {!showTime && 'Time'}
                </Text>
              )}
            </View>

            <Image
              source={require('../../../assets/images/icons/nextArrow.png')}
            />
          </TouchableOpacity>

          <View style={styles.notifyContainer}></View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <View style={{marginHorizontal: 16, alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => saveData()}
            activeOpacity={0.7}
            style={styles.sendBtnContainer}>
            <Text style={{fontWeight: '700', fontSize: 20, color: '#fff'}}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {isVisible && (
        <CustomModal visible={true}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 24,
              marginHorizontal: 20,
            }}>
            <Text style={{fontSize: 20, fontWeight: '700', color: '#fff'}}>
              Duration
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setIsVisible(false)}>
              <Image
                source={require('../../../assets/images/icons/closeModal.png')}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              borderBottomColor: '#fff',
              borderBottomWidth: 1,
              marginBottom: 25,
            }}></View>

          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#1C5839',
            }}>
            <TimerPicker
              onDurationChange={pickedDuration => formatTime(pickedDuration)}
              padWithNItems={2}
              hourLabel="hours"
              minuteLabel="min"
              secondLabel="sec"
              backgroundColor="#1C5839"
              styles={{
                pickerItem: {
                  fontSize: 23,
                  fontWeight: '400',
                  backgroundColor: '#1C5839',
                  color: '#fff',
                },
                pickerLabel: {
                  fontSize: 17,
                  right: -20,
                  backgroundColor: '#1C5839',
                  color: '#fff',
                },
                pickerLabelContainer: {
                  width: 60,
                  backgroundColor: '#1C5839',
                },
                pickerItemContainer: {
                  width: 150,
                  backgroundColor: '#1C5839',
                },
              }}
            />
          </View>

          <View style={{alignItems: 'center', marginHorizontal: 20}}>
            <TouchableOpacity
              onPress={() => {
                setIsVisible(false), setShowTime(true);
              }}
              activeOpacity={0.7}
              style={{
                width: '100%',
                height: 56,
                borderRadius: 20,
                backgroundColor: '#FFC20E',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 26,
              }}>
              <Text style={{fontWeight: '700', fontSize: 20, color: '#fff'}}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </CustomModal>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 60,
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
    gap: 36,
  },
  star: {
    marginHorizontal: 5,
  },
  feedback: {
    fontSize: 18,
    color: '#333',
    marginTop: 20,
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
    marginBottom: 24,
  },
  deadlinesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingVertical: 10,
    marginLeft: 50,
  },
  notifyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 150,
  },
  resetBtnText: {
    fontSize: 20,
    fontWeight: '400',
    color: '#FFC20E',
    marginTop: 20,
  },
  sendBtnContainer: {
    width: '100%',
    height: 56,
    borderRadius: 20,
    backgroundColor: '#FFC20E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userImg: {width: 100, height: 100, borderRadius: 12, marginBottom: 25},
  inputImg: {position: 'absolute', right: 20, top: 15},
  headerText: {
    fontWeight: '400',
    fontSize: 17,
    color: '#fff',
    marginLeft: 8,
  },
  imagePickerContainer: {
    width: 100,
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
  },
  blockTitleText: {
    fontSize: 34,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 20,
  },
  secondaryText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
  },
  smallText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#fff',
    marginBottom: 12,
    marginLeft: 12,
  },
  deadlinesText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginLeft: 5,
  },
  footer: {
    width: '100%',
    height: 120,
    backgroundColor: '#1C5839',
    position: 'absolute',
    bottom: 0,
    paddingTop: 12,
  },
  categoriesWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 24,
  },
  categoryText: {
    fontWeight: '400',
    fontSize: 14,
    color: '#fff',
  },
  categoryContainer: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    marginTop: 5,
    marginBottom: 10,
  },
});

export default CreateRecipe;
