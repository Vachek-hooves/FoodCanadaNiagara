import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useState} from 'react';
import {categories} from '../../data/categories';
import {exploreCategories} from '../../data/exploreCategories';
import {dishes} from '../../data/dishes';
import {useNavigation} from '@react-navigation/native';
import {useStore} from '../../store/context';

import DishCard from '../../components/DishCard';
import Layout from '../../components/Layout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AllRecipesCard from '../../components/AllRecipesCard';

const Home = () => {
  const navigation = useNavigation();
  const [showFavorites, setShowFavorites] = useState(false);
  const {favorites, setFavorites, filterIcon} = useStore();
  const [filteredCategory, setFilteredCategory] = useState([]);
  const [checkCategory, setCheckCategory] = useState(categories);
  const [onInputFocus, setOnInputFocus] = useState(false);
  const [onChangeValue, setOnChangeValue] = useState('');

  const searchDish = dishes.filter(dish =>
    dish.title.toLowerCase().includes(onChangeValue.toLowerCase()),
  );

  const popularDishes = [...dishes].slice(0, 6);

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
                getFavorites();
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
                style={[onInputFocus && {right: 30, top: 17}]}>
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
              <TouchableOpacity
                activeOpacity={0.7}
                key={dish.id}
                onPress={() => navigation.navigate('RecipeCard', dish)}>
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
              </TouchableOpacity>
            ))}
          </View>
        )}

        {!onInputFocus && (
          <View>
            {!showFavorites && (
              <View>
                <View style={{marginHorizontal: 16}}>
                  <Text style={styles.blockTitleText}>Popular recipes</Text>
                </View>

                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={{paddingLeft: 16}}>
                  {popularDishes.splice(0, 5).map(dish => (
                    <DishCard dish={dish} key={dish.id} />
                  ))}
                </ScrollView>
                <View style={{marginHorizontal: 16, marginBottom: 20}}>
                  <Text style={styles.blockTitleText}>Explore categories</Text>
                </View>
                <View style={styles.categoriesContainer}>
                  {exploreCategories.map((category, idx) => (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      key={idx}
                      onPress={() => navigation.navigate('Category', category)}>
                      <Image
                        source={category.image}
                        style={styles.categoryImg}
                      />
                      <Text
                        style={[
                          styles.popularRecipeTitle,
                          {
                            color: '#fff',
                            position: 'absolute',
                            top: '45%',
                            left: 65,
                          },
                        ]}>
                        {category.category}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
            <View>
              {showFavorites && (
                <ScrollView>
                  <View style={{marginBottom: 140}}>
                    {favorites.length === 0 ? (
                      <View
                        style={{
                          alignItems: 'center',
                          marginTop: 150,
                          marginHorizontal: 40,
                        }}>
                        <Image
                          source={require('../../../assets/images/icons/close.png')}
                        />
                        <Text style={styles.closeText}>
                          There are no favourite receipts, add some from the
                          list
                        </Text>
                      </View>
                    ) : (
                      <View>
                        <ScrollView
                          horizontal
                          showsHorizontalScrollIndicator={false}>
                          <View style={styles.checkCategoryWrap}>
                            {checkCategory.map((category, idx) => (
                              <TouchableOpacity
                                onPress={() => selectCategory(category)}
                                activeOpacity={0.7}
                                key={idx}
                                style={[
                                  styles.categoryContainer,
                                  category.checked && {backgroundColor: '#fff'},
                                ]}>
                                <Text
                                  style={[
                                    styles.categoryText,
                                    category.checked && {color: '#000'},
                                  ]}>
                                  {category.category}
                                </Text>
                              </TouchableOpacity>
                            ))}
                          </View>
                        </ScrollView>

                        <View style={styles.favoritesWrap}>
                          {filteredCategory.map(dish => (
                            <AllRecipesCard dish={dish} key={dish.id} />
                          ))}
                        </View>
                      </View>
                    )}
                  </View>
                </ScrollView>
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
    backgroundColor: '#FFC20E',
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
  categoryImg: {width: 180, height: 180, borderRadius: 12},
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

export default Home;
