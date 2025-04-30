import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
} = require('react-native');

const OnboardCard = ({note}) => {
  return (
    <View activeOpacity={0.7} style={styles.recipesCard} key={note}>
      <Image source={note.image} style={styles.popularRecipeImage} />
      <View style={{paddingHorizontal: 10}}>
        <View style={{}}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 15,
              fontWeight: '700',
              color: '#1B281B',
              paddingTop: 10,
              marginBottom: 5,
            }}>
            {note.title}
          </Text>
        </View>

        <Text
          numberOfLines={1}
          style={{
            fontSize: 13,
            fontWeight: '400',
            color: '#999999',
          }}>
          {note.description}
        </Text>
        <View
          onPress={() => removeNotes()}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <Image source={require('../../assets/images/Rating.png')} />
          <Image
            source={require('../../assets/images/icons/checkedHeart.png')}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  recipesCard: {
    backgroundColor: '#fff',
    paddingBottom: 10,
    width: '40%',
    borderRadius: 12,
    marginRight: 10,
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

export default OnboardCard;
