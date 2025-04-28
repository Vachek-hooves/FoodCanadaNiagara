import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useStore} from '../store/context';
import CheckBox from './CheckBox';
const {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
} = require('react-native');

const NotesCard = ({note}) => {
  const [iconColor, setIconColor] = useState(false);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const {favorites, setFavorites} = useStore();
  const [checked, setChecked] = useState(false);

  const addToFavorites = async dish => {
    try {
      setIconColor(true);
      const jsonValue = await AsyncStorage.getItem('favorites');
      let favoritesList = jsonValue !== null ? JSON.parse(jsonValue) : [];

      const filtered = favoritesList.find(val => val.id === dish.id);

      if (!filtered) {
        favoritesList.push(dish);

        console.log('saved to fav');
        setFavorites(favoritesList);
      }

      await AsyncStorage.setItem('favorites', JSON.stringify(favoritesList));
    } catch (e) {
      console.error('Failed to add item to favorites:', e);
    }
  };

  const removeFavorites = async dish => {
    setIconColor(false);
    const jsonValue = await AsyncStorage.getItem('favorites');
    let favoritesList = jsonValue != null ? JSON.parse(jsonValue) : [];
    const filtered = favoritesList.filter(fav => fav.id !== dish.id);
    await AsyncStorage.setItem('favorites', JSON.stringify(filtered));

    setFavorites(filtered);
  };

  const renderFavorites = async item => {
    const jsonValue = await AsyncStorage.getItem('favorites');
    const favoritesList = JSON.parse(jsonValue);

    if (favoritesList != null) {
      let data = favoritesList.find(fav => fav.id === item.id);

      return data == null ? setIconColor(false) : setIconColor(true);
    }
  };

  return (
    <View
      onPress={() => navigation.navigate('RecipeCard', dish)}
      activeOpacity={0.7}
      style={styles.recipesCard}
      key={note}>
      <Image
        source={{uri: note.image}}
        style={[styles.popularRecipeImage, note.image === '' && {height: 0}]}
      />
      <View style={{padding: 10}}>
        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 13,
              fontWeight: '400',
              color: '#999999',
              opacity: checked ? 0.5 : 1,
              textDecorationLine: checked && 'line-through',
            }}>
            {note.selectedDate}
          </Text>
          <TouchableOpacity
            onPress={() => {
              setChecked(!checked);
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <View
              style={{
                width: 24,
                height: 24,
                backgroundColor: checked ? '#FFC20E' : 'transparent',
                borderColor: checked ? '#FFC20E' : '#1C5839',
                borderWidth: 1,
                borderRadius: 99,
                marginRight: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {checked ? (
                <Image
                  source={require('../../assets/images/icons/checkbox.png')}
                />
              ) : null}
            </View>
          </TouchableOpacity>
        </View>
        <Text
          numberOfLines={1}
          style={{
            fontSize: 15,
            fontWeight: '700',
            color: checked ? '#999999' : '#1B281B',
            textDecorationLine: checked && 'line-through',
          }}>
          {note.heading}
        </Text>
        <Text
          numberOfLines={1}
          style={{
            fontSize: 13,
            fontWeight: '400',
            color: '#999999',
            opacity: checked ? 0.5 : 1,
            textDecorationLine: checked && 'line-through',
          }}>
          {note.description}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  recipesCard: {
    backgroundColor: '#fff',
    paddingBottom: 10,
    width: '48%',
    borderRadius: 12,
  },
  popularRecipeImage: {
    width: '100%',
    height: 130,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  popularRecipeTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1B281B',
  },
  popularRecipeDescription: {
    fontSize: 13,
    fontWeight: '400',
    color: '#142E159E',
  },
  popularRecipeDifficulty: {
    fontSize: 12,
    fontWeight: '400',
    color: '#1C5839',
  },
});

export default NotesCard;
