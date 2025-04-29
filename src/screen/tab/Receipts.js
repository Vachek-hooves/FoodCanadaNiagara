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
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useStore} from '../../store/context';

import Layout from '../../components/Layout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AllRecipesCard from '../../components/AllRecipesCard';
import CustomRecipeCard from '../../components/CustomRecipeCard';
import DeletedCard from '../../components/DeletedCard';

const Receipts = () => {
  const navigation = useNavigation();
  const [showFavorites, setShowFavorites] = useState(false);
  const {favorites, setFavorites} = useStore();
  const [filteredCategory, setFilteredCategory] = useState([]);
  const [checkCategory, setCheckCategory] = useState(categories);
  const [onInputFocus, setOnInputFocus] = useState(false);
  const [onChangeValue, setOnChangeValue] = useState('');
  const [createdRecipe, setCreatedRecipe] = useState([]);
  const [deletedRecipies, setDeletedRecipies] = useState([]);
  const isFocused = useIsFocused();

  const searchDish = dishes.filter(dish =>
    dish.title.toLowerCase().includes(onChangeValue.toLowerCase()),
  );

  useEffect(() => {
    getData();
    getDeleted();
  }, [isFocused]);

  useEffect(() => {
    const getFavorites = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('favorites');
        let favoritesList = jsonValue !== null ? JSON.parse(jsonValue) : [];

        setFavorites(favoritesList);
        setFilteredCategory(favoritesList);
      } catch (e) {
        console.error('Failed to add item to favorites:', e);
      }
    };
    getFavorites();
  }, []);

  const getData = async () => {
    try {
      const savedData = await AsyncStorage.getItem('myRecipe');
      const parsed = JSON.parse(savedData);

      if (parsed != null) {
        setCreatedRecipe(parsed);
        setFilteredData(parsed);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getDeleted = async () => {
    try {
      const savedData = await AsyncStorage.getItem('myRecipeDeleted');
      const parsed = JSON.parse(savedData);

      if (parsed != null) {
        setDeletedRecipies(parsed);
      }
    } catch (error) {
      console.log(error);
    }
  };

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

            <Text style={styles.headerTitle}>My receipts</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('Filter')}>
              <Image
                source={require('../../../assets/images/icons/filter.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row'}}>
            {onInputFocus && (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setOnInputFocus(false)}
                style={styles.goBackBtn}>
                <Image
                  source={require('../../../assets/images/icons/goBack.png')}
                />
              </TouchableOpacity>
            )}

            <TextInput
              style={[styles.input, onInputFocus && {width: '85%'}]}
              placeholder="Search"
              value={onChangeValue}
              placeholderTextColor="rgba(60, 60, 67, 0.6)"
              onFocus={() => setOnInputFocus(true)}
              onChangeText={setOnChangeValue}
            />
            <Image
              source={require('../../../assets/images/icons/search.png')}
              style={[styles.inputImage, onInputFocus && {left: 80}]}
            />
            {onInputFocus && (
              <TouchableOpacity
                onPress={() => setOnChangeValue('')}
                activeOpacity={0.6}
                style={[styles.inputImage, onInputFocus && {left: 380}]}>
                <Image
                  source={require('../../../assets/images/icons/clearInput.png')}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {onInputFocus && (
          <View style={{marginHorizontal: 16}}>
            {searchDish.map(dish => (
              <View key={dish.id}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '400',
                    color: dish.title.includes(onChangeValue.toLowerCase())
                      ? '#fff'
                      : 'yellow',
                    marginBottom: 5,
                  }}>
                  {dish.title}
                </Text>
                <Text style={styles.searchSecondaryText}>{dish.time}</Text>
              </View>
            ))}
          </View>
        )}

        {!onInputFocus && (
          <View>
            {!showFavorites && (
              <View>
                {createdRecipe.length > 0 && (
                  <View style={{marginHorizontal: 16, marginBottom: 20}}>
                    <Text style={styles.blockTitleText}>Active</Text>
                  </View>
                )}

                <View style={[styles.categoriesContainer, {marginBottom: 20}]}>
                  {createdRecipe.map((note, idx) => (
                    <CustomRecipeCard note={note} key={note.id} />
                  ))}
                </View>

                {deletedRecipies.length > 0 && (
                  <View style={{marginHorizontal: 16, marginBottom: 20}}>
                    <Text style={styles.blockTitleText}>Deleted</Text>
                  </View>
                )}

                <View style={styles.categoriesContainer}>
                  {deletedRecipies.map((note, idx) => (
                    <DeletedCard note={note} key={note.id} />
                  ))}
                </View>
              </View>
            )}
            <View>
              {createdRecipe.length === 0 && deletedRecipies.length === 0 && (
                <View
                  style={{
                    alignItems: 'center',
                    marginTop: 60,
                    marginHorizontal: 40,
                  }}>
                  <Image
                    source={require('../../../assets/images/icons/close.png')}
                  />
                  <Text style={styles.closeText}>
                    There are no favourite receipts, add some from the list
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}
      </ScrollView>
      {!onInputFocus && (
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.addBtnContainer}
          onPress={() => navigation.navigate('CreateRecipe')}>
          <Image
            source={require('../../../assets/images/icons/add.png')}
            style={{}}
          />
        </TouchableOpacity>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
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
  blockTitleText: {fontSize: 18, fontWeight: '800', color: '#fff'},
  input: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingLeft: 47,
    height: 52,
    fontSize: 17,
    fontWeight: '400',
    color: '#000',
    width: '100%',
    marginBottom: 20,
  },
  inputImage: {
    position: 'absolute',
    top: 18,
    left: 20,
  },
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
  categoriesContainer: {
    marginHorizontal: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 140,
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
  closeText: {
    fontWeight: '400',
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginTop: 17,
  },
  favoritesWrap: {
    flexDirection: 'row',
    marginHorizontal: 16,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 150,
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
  searchSecondaryText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#fff',
    marginBottom: 25,
  },
  categoryImg: {width: 200, height: 180, borderRadius: 12},
  checkCategoryWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 20,
    paddingLeft: 16,
  },
  goBackBtn: {
    width: 52,
    height: 52,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginRight: 10,
    marginBottom: 15,
  },
});

export default Receipts;
