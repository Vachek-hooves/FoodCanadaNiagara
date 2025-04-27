import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Layout from '../../components/Layout';
import MainButton from '../../components/MainButton';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import CheckBox from '../../components/CheckBox';
import {dishes} from '../../data/dishes';
import {categories} from '../../data/categories';
import {useStore} from '../../store/context';

const ContactWithUs = () => {
  const navigation = useNavigation();
  const [category, setCategory] = useState(null);
  const [checkCategory, setCheckCategory] = useState(categories);
  const [onChangeValue, setOnChangeValue] = useState('');
  const [colorsChecked, setColorsChecked] = useState({
    Easy: false,
    Medium: false,
    Hard: false,
  });
  const {setCommonFilter} = useStore();

  const saveFilters = () => {
    const filtered = dishes.filter(dish => dish.category === category);
    // setCommonFilter(filtered);
  };

  const selectCategory = selectedCategory => {
    // const filteredByCategory = favorites.filter(
    //   favorite => favorite.category === selectedCategory.category,
    // );
    setCategory(selectedCategory.category);
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
    // setFilteredCategory(filteredByCategory);
  };

  return (
    <Layout>
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
      </View>

      <View style={{marginHorizontal: 16}}>
        <Text style={styles.blockTitleText}>Contact with us</Text>
      </View>

      <View style={{marginHorizontal: 16}}>
        <Text style={styles.secondaryText}>First name</Text>
        <TextInput
          style={styles.input}
          placeholder="Your name"
          value={onChangeValue}
          placeholderTextColor="rgba(60, 60, 67, 0.6)"
          onChangeText={setOnChangeValue}
        />
        <Text style={styles.secondaryText}>Mobile number</Text>
        <TextInput
          style={styles.input}
          placeholder="Your name"
          value={onChangeValue}
          placeholderTextColor="rgba(60, 60, 67, 0.6)"
          onChangeText={setOnChangeValue}
        />
        <Text style={styles.secondaryText}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Your name"
          value={onChangeValue}
          placeholderTextColor="rgba(60, 60, 67, 0.6)"
          onChangeText={setOnChangeValue}
        />
        <Text style={styles.secondaryText}>Description</Text>
        <TextInput
          style={styles.input}
          placeholder="Your name"
          value={onChangeValue}
          placeholderTextColor="rgba(60, 60, 67, 0.6)"
          onChangeText={setOnChangeValue}
        />
      </View>

      <View style={styles.footer}>
        <View style={{marginHorizontal: 16, alignItems: 'center'}}>
          <MainButton text={'Send'} pressed={saveFilters()} />
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
  input: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingLeft: 20,
    height: 52,
    fontSize: 17,
    fontWeight: '400',
    color: '#000',
    width: '100%',
    marginBottom: 24,
  },
  headerText: {
    fontWeight: '400',
    fontSize: 17,
    color: '#fff',
    marginLeft: 8,
  },
  blockTitleText: {
    fontSize: 34,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 20,
  },
  secondaryText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
  },
  footer: {
    width: '100%',
    height: 120,
    backgroundColor: '#1C5839',
    position: 'absolute',
    bottom: 0,
    paddingTop: 12,
  },
});

export default ContactWithUs;
