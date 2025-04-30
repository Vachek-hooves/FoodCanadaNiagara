import {useEffect, useState} from 'react';
import {useStore} from '../store/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';

const {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
} = require('react-native');

const DishCard = ({dish}) => {
  const [iconColor, setIconColor] = useState(false);
  const isFocused = useIsFocused();
  const {setFavorites, focused} = useStore();
  const navigation = useNavigation();

  useEffect(() => {
    renderFavorites(dish);
  }, [isFocused]);

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
    console.log('removed');
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
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.popularRecipesCard}
      onPress={() => navigation.navigate('RecipeCard', dish)}>
      <Image source={dish.image} style={styles.popularRecipeImage} />
      <View style={{padding: 10}}>
        <Text numberOfLines={1} style={styles.popularRecipeTitle}>
          {dish.title}
        </Text>
        <Text numberOfLines={1} style={styles.popularRecipeDescription}>
          {dish.description}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 12,
          }}>
          <Text style={styles.popularRecipeDifficulty}>{dish.dfficulty}</Text>
          <TouchableOpacity
            onPress={() =>
              iconColor ? removeFavorites(dish) : addToFavorites(dish)
            }>
            {iconColor ? (
              <Image
                source={require('../../assets/images/icons/checkedHeart.png')}
              />
            ) : (
              <Image
                source={require('../../assets/images/icons/heartOutline.png')}
              />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  popularRecipesCard: {
    backgroundColor: '#fff',
    height: 230,
    width: 170,
    marginRight: 8,
    borderRadius: 12,
    marginTop: 20,
    marginBottom: 25,
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

export default DishCard;
