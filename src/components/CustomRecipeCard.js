import {useNavigation} from '@react-navigation/native';

const {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
} = require('react-native');

const CustomRecipeCard = ({note}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => navigation.navigate('RecipeDetailsCard', note)}
      style={styles.recipesCard}
      key={note}>
      <Image
        source={{uri: note.image}}
        style={[styles.popularRecipeImage, note.image === '' && {height: 0}]}
      />
      <View style={{paddingHorizontal: 10}}>
        <View style={{}}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 13,
              fontWeight: '400',
              color: '#999999',
            }}>
            {note.selectedDate}
          </Text>
        </View>
        <Text
          numberOfLines={1}
          style={{
            fontSize: 15,
            fontWeight: '700',
          }}>
          {note.heading}
        </Text>
        <Text
          numberOfLines={1}
          style={{
            fontSize: 13,
            fontWeight: '400',
            color: '#999999',
          }}>
          {note.description}
        </Text>
        <Text
          numberOfLines={1}
          style={{
            fontSize: 13,
            fontWeight: '400',
            color: '#999999',
          }}>
          {note.rating <= 2 && 'Easy'}
          {note.rating === 3 && 'Medium'}
          {note.rating > 3 && 'Hard'}
        </Text>
      </View>
    </TouchableOpacity>
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

export default CustomRecipeCard;
