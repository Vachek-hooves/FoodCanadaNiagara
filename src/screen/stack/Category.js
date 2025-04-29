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
import {dishes} from '../../data/dishes';
import {useNavigation} from '@react-navigation/native';
import DishCard from '../../components/DishCard';
import AllRecipesCard from '../../components/AllRecipesCard';
import {useStore} from '../../store/context';

const Category = ({route}) => {
  const navigation = useNavigation();
  const selectedCategory = route.params.category;
  const {commonFilter} = useStore();

  const popularDishes = [...dishes].sort(() => Math.random() - 0.5);
  console.log('popularDishes', popularDishes);

  const selectedCategoryArray = commonFilter.filter(
    dish => dish.category === selectedCategory,
  );

  console.log('selectedCategoryArray', selectedCategoryArray);

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
            <Text style={styles.headerTitle}>{selectedCategory}</Text>
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
          <Text style={styles.blockTitleText}>All recipes</Text>
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
          {selectedCategoryArray.map(dish => (
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
});

export default Category;
