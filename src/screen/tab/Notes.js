import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useEffect, useState} from 'react';
import {categories} from '../../data/categories';
import {exploreCategories} from '../../data/exploreCategories';
import {dishes} from '../../data/dishes';
import {useNavigation} from '@react-navigation/native';
import {useStore} from '../../store/context';

import DishCard from '../../components/DishCard';
import Layout from '../../components/Layout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AllRecipesCard from '../../components/AllRecipesCard';
import SegmentedControl from 'react-native-segmented-control-2';
import {Calendar} from 'react-native-calendars';

const Notes = () => {
  const navigation = useNavigation();
  const [showFavorites, setShowFavorites] = useState(false);
  const {favorites, setFavorites} = useStore();
  const [filteredCategory, setFilteredCategory] = useState(favorites);
  const [checkCategory, setCheckCategory] = useState(categories);

  useEffect(() => {
    const getFavorites = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('favorites');
        let favoritesList = jsonValue !== null ? JSON.parse(jsonValue) : [];

        setFavorites(favoritesList);
      } catch (e) {
        console.error('Failed to add item to favorites:', e);
      }
    };
    getFavorites();
  }, []);

  const popularDishes = [...dishes].sort(() => Math.random() - 0.5);

  const selectCategory = selectedCategory => {
    const filteredByCategory = favorites.filter(
      favorite => favorite.category === selectedCategory.category,
    );

    const checked = categories.map(cat => {
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
    setCheckCategory(checked);
    setFilteredCategory(filteredByCategory);
  };

  // useEffect(() => {
  //   AsyncStorage.clear();
  // }, []);

  return (
    <Layout>
      <ScrollView>
        <View style={{marginHorizontal: 16}}>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={() => {
                setShowFavorites(!showFavorites);
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

            <Text style={styles.headerTitle}>Food Canada Niagara</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('Filter')}>
              <Image
                source={require('../../../assets/images/icons/filter.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{marginHorizontal: 16}}>
          <SegmentedControl
            style={styles.segmentControl}
            activeTabColor="#1C5839"
            activeTextColor="#FFFFFF"
            textStyle={{color: '#fff'}}
            tabs={['Reserves', 'News']}
            selectedTabStyle={{
              borderRadius: 16,
            }}
            onChange={index => setSelectedIdx(index)}
          />
        </View>

        <Calendar
          // Customize the appearance of the calendar
          style={{
            height: 350,
            backgroundColor: 'transparent',
            color: 'red',
          }}
          theme={{
            backgroundColor: 'transparent',
            calendarBackground: 'transparent',
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#00adf5',
            dayTextColor: '#2d4150',
            textDisabledColor: '#dd99ee',
            textSectionTitleDisabledColor: 'blue',
          }}
          // Specify the current date
          // current={'2012-03-01'}
          // Callback that gets called when the user selects a day
          onDayPress={day => {
            console.log('selected day', day);
          }}
          // Mark specific dates as marked
          markedDates={{
            '2012-03-01': {selected: true, marked: true, selectedColor: 'blue'},
            '2012-03-02': {marked: true},
            '2012-03-03': {selected: true, marked: true, selectedColor: 'blue'},
          }}
        />
      </ScrollView>
      <TouchableOpacity activeOpacity={0.7} style={styles.addBtnContainer}>
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
    backgroundColor: '#FFC20E',
    borderRadius: 99,
    position: 'absolute',
    right: 20,
    bottom: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentControl: {
    marginTop: 19,
    marginBottom: 20,
    backgroundColor: '#0F301F',
    borderRadius: 16,
    height: 40,
    width: '100%',
  },
});

export default Notes;
