import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Layout from '../../components/Layout';
import {useNavigation} from '@react-navigation/native';
import AllRecipesCard from '../../components/AllRecipesCard';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {categories} from '../../data/categories';

const Favorites = () => {
  const navigation = useNavigation();
  const [favorites, setFavorites] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState([]);
  const [checkCategory, setCheckCategory] = useState(categories);

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
            <Text style={styles.headerTitle}>Favorites</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('Filter')}>
              <Image
                source={require('../../../assets/images/icons/filter.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={{marginBottom: 25}}>
            <TextInput
              style={styles.input}
              placeholder="Search"
              placeholderTextColor="rgba(60, 60, 67, 0.6)"
            />
            <Image
              source={require('../../../assets/images/icons/search.png')}
              style={styles.inputImage}
            />
          </View>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 16,
              marginBottom: 32,
              paddingLeft: 16,
            }}>
            {checkCategory.map((category, idx) => (
              <TouchableOpacity
                onPress={() => selectCategory(category)}
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

        <View style={{marginBottom: 100}}>
          {favorites.length === 0 && (
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

        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 16,
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: 10,
            marginBottom: 50,
          }}>
          {favorites.map(dish => (
            <AllRecipesCard dish={dish} key={dish.id} />
          ))}
        </View>
      </ScrollView>
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
  headerText: {
    fontWeight: '400',
    fontSize: 17,
    color: '#fff',
    marginLeft: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginRight: 25,
  },
  blockTitleText: {fontSize: 18, fontWeight: '800', color: '#fff'},
  input: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingLeft: 47,
    height: 52,
    fontSize: 17,
    fontWeight: '400',
    color: '#fff',
    width: '100%',
  },
  inputImage: {
    position: 'absolute',
    top: 18,
    left: 20,
  },
  closeText: {
    fontWeight: '400',
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginTop: 17,
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
  recipesCard: {
    backgroundColor: '#fff',
    height: 230,
    width: '48%',

    borderRadius: 12,
    // marginTop: 10,
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
});

export default Favorites;
