import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {ScrollView} from 'react-native-gesture-handler';
import MainButton from '../../components/MainButton';
import Layout from '../../components/Layout';

const RecipeCard = ({route}) => {
  const recipe = route.params;
  const navigation = useNavigation();

  return (
    <Layout>
      <ScrollView>
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
          <Image source={require('../../../assets/images/icons/fav.png')} />
        </View>
        <View style={{marginHorizontal: 16}}>
          <Text style={styles.recipeTitle}>{recipe.title}</Text>
          <Image
            source={recipe.image}
            style={{
              width: '100%',
              height: 200,
              borderRadius: 20,
              marginBottom: 20,
            }}
          />

          <View style={styles.ingredientsContainer}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                borderBottomColor: 'rgba(153, 153, 153, 0.5)',
                borderBottomWidth: 1,
              }}>
              <Text style={styles.ingredientsTitle}>Ingredients</Text>
              <Image
                source={require('../../../assets/images/icons/ingredients.png')}
              />
            </View>

            <View>
              {recipe.ingredients.map(ingredient => (
                <View style={styles.ingredientWrap} key={ingredient}>
                  <Text style={styles.ingredientsText}>{ingredient}</Text>
                </View>
              ))}
            </View>
          </View>
          <Text style={styles.blockTitleText}>Receipt</Text>
          <Text style={styles.recipeText}>{recipe.receipt}</Text>
        </View>
        <View style={styles.footer}>
          <View style={{marginHorizontal: 16, alignItems: 'center'}}>
            <MainButton text={'Save'} />
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 20,
  },
  headerText: {
    fontWeight: '400',
    fontSize: 17,
    color: '#fff',
    marginLeft: 8,
  },
  recipeTitle: {
    fontWeight: '700',
    fontSize: 34,
    color: '#fff',
    marginBottom: 20,
  },
  ingredientsContainer: {
    width: '100%',
    paddingVertical: 24,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  ingredientsTitle: {
    fontWeight: '700',
    fontSize: 18,
    color: '#000',
    marginBottom: 20,
  },
  ingredientsText: {
    fontWeight: '400',
    fontSize: 17,
    color: 'rgba(0, 0, 0, 1)',
  },

  ingredientWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: 'rgba(153, 153, 153, 0.5)',
    borderBottomWidth: 1,
    paddingVertical: 13,
  },
  blockTitleText: {
    fontWeight: '700',
    fontSize: 20,
    color: '#fff',
    marginBottom: 10,
    marginTop: 32,
  },
  recipeText: {
    fontWeight: '400',
    fontSize: 16,
    color: '#fff',
    marginBottom: 150,
  },
  footer: {
    width: '100%',
    height: 120,
    backgroundColor: '#1C5839',
    bottom: 0,
    paddingTop: 12,
    position: 'absolute',
  },
});

export default RecipeCard;
