import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Layout from '../../components/Layout';
import MainButton from '../../components/MainButton';
import {useNavigation} from '@react-navigation/native';

const Filter = () => {
  const navigation = useNavigation();

  const categories = [
    {
      category: 'Breakfast',
      checked: true,
    },
    {
      category: 'Lunch',
      checked: false,
    },
    {
      category: 'Dinner',
      checked: false,
    },
    {
      category: 'Snacks',
      checked: false,
    },
    {
      category: 'Fast Food',
      checked: false,
    },
    {
      category: 'Bakery',
      checked: false,
    },
  ];

  return (
    <Layout>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
          style={{
            flexDirection: 'row',
            marginRight: '28%',
            alignItems: 'center',
          }}>
          <Image
            source={require('../../../assets/images/icons/backArrow.png')}
          />
          <Text style={styles.headerText}>Back</Text>
        </TouchableOpacity>
        <Text style={[styles.headerText, {fontWeight: '600'}]}>Filters</Text>
      </View>

      <View
        style={{
          marginHorizontal: 16,
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 16,
          marginBottom: 32,
        }}>
        {categories.map((category, idx) => (
          <View
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
          </View>
        ))}
      </View>
      <View style={{marginHorizontal: 16}}>
        <Text style={styles.blockTitleText}>Popular recipes</Text>
      </View>

      <View style={styles.footer}>
        <View style={{marginHorizontal: 16, alignItems: 'center'}}>
          <MainButton text={'Save'} />
          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.resetBtnText}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  headerText: {
    fontWeight: '400',
    fontSize: 17,
    color: '#fff',
    marginLeft: 8,
  },
  blockTitleText: {fontSize: 18, fontWeight: '800', color: '#fff'},
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
  footer: {
    width: '100%',
    height: 168,
    backgroundColor: '#1C5839',
    position: 'absolute',
    bottom: 0,
    paddingTop: 12,
  },
  resetBtnText: {
    fontSize: 20,
    fontWeight: '400',
    color: '#fff',
    marginTop: 20,
  },
});

export default Filter;
