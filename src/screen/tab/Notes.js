import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native';
import {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useStore} from '../../store/context';
import React from 'react';

import {format, addDays} from 'date-fns';
import Layout from '../../components/Layout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SegmentedControl from 'react-native-segmented-control-2';
import {Calendar} from 'react-native-calendars';
import NotesCard from '../../components/NotesCard';

const Notes = () => {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showFavorites, setShowFavorites] = useState(false);
  const [category, setCategory] = useState(null);
  const [selectCategoryId, setSelectCategoryId] = useState(null);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [formData, setFormData] = useState([]);
  const [filteredData, setFilteredData] = useState(formData);
  const {filterIcon} = useStore();
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
  const isFocused = useIsFocused();

  useEffect(() => {
    getData();
  }, [isFocused]);

  const selectCategory = selectedCategory => {
    const filteredByCategory = formData.filter(
      item => item.selectCategoryId === selectedCategory.id,
    );
    setFilteredData(filteredByCategory);

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

  const getData = async () => {
    try {
      const savedData = await AsyncStorage.getItem('notes');
      const parsed = JSON.parse(savedData);

      if (parsed != null) {
        setFormData(parsed);
        setFilteredData(parsed);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const generateDays = () => {
    return Array.from({length: 7}, (_, i) => addDays(new Date(), i));
  };

  const handleDatePress = date => {
    setSelectedDate(date);
  };

  const renderDay = ({item}) => {
    const isSelected =
      format(item, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
    return (
      <TouchableOpacity
        style={[styles.dayContainer, isSelected && styles.selectedDay]}
        onPress={() => handleDatePress(item)}>
        <Text style={[styles.dayOfWeek, isSelected && styles.selectedText]}>
          {format(item, 'EEE')} {/* Day of the week, e.g., Mon */}
        </Text>
        <Text style={[styles.date, isSelected && styles.selectedText]}>
          {format(item, 'dd')} {/* Date, e.g., 05 */}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Layout>
      <ScrollView>
        <View style={{marginHorizontal: 16}}>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={() => {
                setShowFavorites(!showFavorites);
                navigation.navigate('Favorites');
              }}>
              {showFavorites ? (
                <Image
                  source={require('../../../assets/images/icons/favChecked.png')}
                />
              ) : (
                <Image
                  source={require('../../../assets/images/icons/fav.png')}
                />
              )}
            </TouchableOpacity>

            <Text style={styles.headerTitle}>Notes</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('Filter')}>
              {filterIcon ? (
                <Image
                  source={require('../../../assets/images/icons/useFilter.png')}
                />
              ) : (
                <Image
                  source={require('../../../assets/images/icons/filter.png')}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View style={{marginHorizontal: 16}}>
          <SegmentedControl
            style={styles.segmentControl}
            activeTabColor="#1C5839"
            activeTextColor="#FFFFFF"
            textStyle={{color: '#fff'}}
            tabs={['Week', 'Month']}
            selectedTabStyle={{
              borderRadius: 16,
            }}
            onChange={index => setSelectedIdx(index)}
          />
        </View>

        {selectedIdx === 0 && (
          <View style={styles.container}>
            <FlatList
              data={generateDays()}
              horizontal
              keyExtractor={item => item.toISOString()}
              renderItem={renderDay}
              contentContainerStyle={styles.listContainer}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        )}

        {selectedIdx === 1 && (
          <Calendar
            monthFormat="MMMM yyyy"
            showSixWeeks={true}
            hideExtraDays={true}
            theme={{
              calendarBackground: 'transparent',
              textSectionTitleColor: '#ffffff',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#ffffff',
              todayBackgroundColor: '#1C5839',
              textDisabledColor: '#dd99ee',
              arrowColor: '#fff',
              indicatorColor: '#fff',
              dayTextColor: '#fff',
              monthTextColor: '#ffffff',
              textMonthFontSize: 16,
              textMonthFontWeight: '700',
              textDayFontSize: 13,
              textDayFontWeight: '600',
            }}
            onDayPress={day => {
              console.log('selected day', day);
            }}
          />
        )}

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
                  backgroundColor: '#1C5839',
                  borderColor: '#1C5839',
                },
              ]}>
              <Text
                style={[
                  styles.categoryText,
                  category.checked && {color: '#fff'},
                ]}>
                {category.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {filteredData.length === 0 && (
          <View
            style={{
              alignItems: 'center',
              marginTop: 100,
              marginHorizontal: 40,
            }}>
            <Image source={require('../../../assets/images/icons/close.png')} />
            <Text style={styles.closeText}>
              There are no notes, please add some by tap for the button
            </Text>
          </View>
        )}
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 16,
            gap: 10,
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            marginBottom: 140,
          }}>
          {filteredData.map((note, idx) => (
            <NotesCard note={note} key={idx} />
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.navigate('CreateNote')}
        activeOpacity={0.7}
        style={styles.addBtnContainer}>
        <Image
          source={require('../../../assets/images/icons/add.png')}
          style={{}}
        />
      </TouchableOpacity>
    </Layout>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  addBtnContainer: {
    width: 64,
    height: 64,
    backgroundColor: '#0F301F',
    borderRadius: 99,
    position: 'absolute',
    right: 20,
    bottom: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    fontWeight: '400',
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginTop: 17,
  },
  categoriesWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 24,
    marginTop: 34,
    marginHorizontal: 16,
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
  segmentControl: {
    marginTop: 19,
    backgroundColor: '#0F301F',
    borderRadius: 16,
    height: 40,
    width: '100%',
  },
  container: {
    marginTop: 24,
    paddingLeft: 16,
  },
  listContainer: {
    alignItems: 'center',
  },
  dayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 13,
    borderRadius: 40,
    marginHorizontal: 5,
    backgroundColor: '#0F301F',
  },
  selectedDay: {
    backgroundColor: '#1C5839',
  },
  dayOfWeek: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 5,
    opacity: 0.6,
  },
  date: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  selectedText: {
    color: '#fff',
  },
});

export default Notes;
