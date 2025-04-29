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
import {useEffect, useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import CustomModal from '../../components/CustomModal';
import StarRating from 'react-native-star-rating-widget';
import {AirbnbRating, Rating} from 'react-native-ratings';
import {TimerPicker} from 'react-native-timer-picker';
import LinearGradient from 'react-native-linear-gradient';

const CreateRecipe = () => {
  const navigation = useNavigation();
  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState('');
  const [image, setImage] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [changePhoto, setChangePhoto] = useState(false);
  const [selectCategoryId, setSelectCategoryId] = useState(1);
  const [showTaskInput, setShowTaskInput] = useState(false);
  const [category, setCategory] = useState(null);

  const [isVisible, setIsVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [rating, setRating] = useState(0);
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

  const formatTime = ({minutes}) => {
    const timeParts = [];

    if (minutes !== undefined) {
      timeParts.push(minutes.toString().padStart(2, '0'));
    }

    setSelectedTime(timeParts);
  };

  const selectDifficulty = [
    {
      id: 1,
      difficulty: 'Easy',
      checked: true,
      image: require('../../../assets/images/icons/rating.png'),
    },
    {
      id: 2,
      difficulty: 'Easy',
      checked: true,
      image: require('../../../assets/images/icons/rating.png'),
    },
    {
      id: 3,
      difficulty: 'Medium',
      checked: true,
      image: require('../../../assets/images/icons/rating.png'),
    },
    {
      id: 4,
      difficulty: 'Medium',
      checked: true,
      image: require('../../../assets/images/icons/rating.png'),
    },
    {
      id: 5,
      difficulty: 'Hard',
      checked: true,
      image: require('../../../assets/images/icons/rating.png'),
    },
  ];

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
    const newData = {
      id: Date.now(),
      description,
      tasks,
      heading,
      rating,
      image,
      selectCategoryId,
      //   selectedDate,
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
      <ScrollView>
        <View style={{marginHorizontal: 16}}>
          <Text style={styles.blockTitleText}>Receipt</Text>
        </View>

        <View style={{marginHorizontal: 16}}>
          <Text style={styles.secondaryText}>Heading</Text>
          <View>
            <TextInput
              style={styles.input}
              placeholder="Heading"
              value={heading}
              placeholderTextColor="rgba(60, 60, 67, 0.6)"
              onChangeText={setHeading}
            />
            <TouchableOpacity activeOpacity={0.7} style={styles.inputImg}>
              <Image
                source={require('../../../assets/images/icons/deleteInput.png')}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.secondaryText}>Description</Text>
          <View>
            <TextInput
              textAlignVertical="top"
              style={[styles.input, {height: 88}]}
              placeholder="Description"
              value={description}
              placeholderTextColor="rgba(60, 60, 67, 0.6)"
              onChangeText={setDescription}
            />
            <TouchableOpacity activeOpacity={0.7} style={styles.inputImg}>
              <Image
                source={require('../../../assets/images/icons/deleteInput.png')}
              />
            </TouchableOpacity>
          </View>
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
              <Text style={styles.secondaryText}>Cover</Text>
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
              <Text style={styles.deadlinesText}>
                {showTime && selectedTime} {showTime && 'min'}
                {!showTime && 'Time'}
              </Text>
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
});

export default CreateRecipe;
