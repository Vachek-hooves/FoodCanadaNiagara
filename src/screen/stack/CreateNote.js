import {
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Calendar} from 'react-native-calendars';

import Layout from '../../components/Layout';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import CustomModal from '../../components/CustomModal';

const CreateNote = () => {
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
  const [checkCategory, setCheckCategory] = useState([
    {
      id: 1,
      title: 'Personal',
      color: 'blue',
      checked: true,
    },
    {
      id: 2,
      title: 'Work',
      color: 'blue',
      checked: false,
    },
    {
      id: 3,
      title: 'Study',
      color: 'blue',
      checked: false,
    },
    {
      id: 4,
      title: 'Sport',
      color: 'blue',
      checked: false,
    },
  ]);
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

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
      description,
      tasks,
      heading,
      image,
      selectCategoryId,
      selectedDate,
    };
    try {
      const jsonValue = await AsyncStorage.getItem('notes');
      let notes = jsonValue !== null ? JSON.parse(jsonValue) : [];
      console.log('notes', notes);
      notes.push(newData);
      await AsyncStorage.setItem('notes', JSON.stringify(notes));
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
          <Text style={styles.blockTitleText}>Note</Text>
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
          <Text style={styles.secondaryText}>Tasks</Text>
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
              <Text style={styles.smallText}>Add task</Text>
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

                  category.id === 2 && {borderColor: '#FFC20E'},
                  category.id === 3 && {borderColor: '#FF999D'},
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

          <Text style={styles.secondaryText}>Deadlines</Text>
          <View style={styles.deadlinesContainer}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={require('../../../assets/images/icons/notesTime.png')}
                style={{position: 'absolute', left: -50}}
              />
              <Text style={styles.deadlinesText}>Time</Text>
            </View>

            <Image
              source={require('../../../assets/images/icons/nextArrow.png')}
            />
          </View>

          <TouchableOpacity
            onPress={() => setIsVisible(true)}
            style={[styles.deadlinesContainer, {marginBottom: 25}]}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={require('../../../assets/images/icons/notesCalendar.png')}
                style={{position: 'absolute', left: -50}}
              />
              <Text style={styles.deadlinesText}>Date</Text>
            </View>

            <Image
              source={require('../../../assets/images/icons/nextArrow.png')}
            />
          </TouchableOpacity>
          <View style={styles.notifyContainer}>
            <Text style={styles.secondaryText}>Notifications</Text>
            <Switch onValueChange={toggleSwitch} value={isEnabled} />
          </View>
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
              Date
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

          <Calendar
            monthFormat="MMMM yyyy"
            showSixWeeks={true}
            hideArrows={true}
            hideExtraDays={true}
            style={
              {
                // backgroundColor: 'transparent',
              }
            }
            theme={{
              calendarBackground: 'transparent',
              textSectionTitleColor: '#ffffff',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#FFC20E',
              textDisabledColor: '#dd99ee',
              arrowColor: '#fff',
              indicatorColor: '#fff',
              dayTextColor: '#fff',
              monthTextColor: '#ffffff',
              textMonthFontSize: 16,
              textMonthFontWeight: '700',
              textDayFontSize: 13,
              textDayFontWeight: '600',
              selectedDayBackgroundColor: '#FFC20E',
              selectedDayTextColor: 'rgba(255, 195, 14, 0.26)',
            }}
            // Callback that gets called when the user selects a day
            onDayPress={day => {
              setSelectedDate(day.dateString);
            }}
            // Mark specific dates as marked
            markedDates={{
              '2025-04-29': {
                marked: true,
                selectedColor: 'blue',
              },
              '2012-03-02': {marked: true},
              '2012-03-03': {
                marked: true,
                selectedColor: 'blue',
              },
            }}
          />

          <View style={{alignItems: 'center', marginHorizontal: 20}}>
            <TouchableOpacity
              onPress={() => setIsVisible(false)}
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
                Done
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setIsVisible(false)}>
              <Text style={styles.resetBtnText}>Reset</Text>
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
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
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

export default CreateNote;
