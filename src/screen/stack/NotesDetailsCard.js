import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import Layout from '../../components/Layout';
import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NotesDetailsCard = ({route}) => {
  const [checked, setChecked] = useState(false);
  const [hideTasks, setHideTasks] = useState(false);
  const note = route.params;

  const navigation = useNavigation();

  const removeNoteNotifycation = () => {
    Alert.alert(
      'Delete note',
      'Are you sure you want to delete the note? This action is irreversible!',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            removeNotes();
            navigation.goBack();
          },
        },
      ],
      {cancelable: false},
    );
  };

  const removeNotes = async () => {
    const jsonValue = await AsyncStorage.getItem('notes');
    let notes = jsonValue != null ? JSON.parse(jsonValue) : [];
    const filtered = notes.filter(item => item.id === note.id);
    await AsyncStorage.setItem('notes', JSON.stringify(filtered));
    console.log('remove');
  };

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
          <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
            <Image source={require('../../../assets/images/icons/fav.png')} />
          </TouchableOpacity>
        </View>
        <View style={{marginHorizontal: 16}}>
          <Text
            style={[
              styles.recipeTitle,
              note.heading === '' && {marginBottom: 0},
            ]}>
            {note.heading}
          </Text>
          <Image
            source={{uri: note.image}}
            style={{
              width: note.image === '' ? null : '100%',
              height: note.image === '' ? null : 200,
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
              <Text style={styles.ingredientsTitle}>Tasks</Text>
              <TouchableOpacity onPress={() => setHideTasks(!hideTasks)}>
                <Image
                  source={require('../../../assets/images/icons/arrUp.png')}
                />
              </TouchableOpacity>
            </View>

            {!hideTasks && (
              <View
                style={{
                  marginTop: 10,
                  borderBottomColor: 'rgba(153, 153, 153, 0.5)',
                  borderBottomWidth: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setChecked(!checked);
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 10,
                  }}>
                  <View
                    style={{
                      width: 24,
                      height: 24,
                      backgroundColor: checked ? '#FFC20E' : 'transparent',
                      borderColor: checked ? '#FFC20E' : '#1C5839',
                      borderWidth: 1,
                      borderRadius: 4,
                      marginRight: 10,
                      marginLeft: checked && 25,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    {checked ? (
                      <Image
                        source={require('../../../assets/images/icons/checkbox.png')}
                      />
                    ) : null}
                  </View>
                </TouchableOpacity>
                <Text style={styles.ingredientsText}>{note.tasks}</Text>
              </View>
            )}

            <View></View>
          </View>
          <Text style={styles.blockTitleText}>Heading</Text>
          <Text style={styles.recipeText}>{note.description}</Text>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <View style={{marginHorizontal: 16, flexDirection: 'row', gap: 16}}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.7}
            style={{
              width: '52%',
              height: 56,
              borderRadius: 20,
              backgroundColor: '#FFC20E',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontWeight: '700', fontSize: 20, color: '#fff'}}>
              Done
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.goBack('')}
            activeOpacity={0.7}
            style={{
              width: '20%',
              height: 56,
              borderRadius: 20,
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image source={require('../../../assets/images/icons/edit.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => removeNoteNotifycation()}
            activeOpacity={0.7}
            style={{
              width: '20%',
              height: 56,
              borderRadius: 20,
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image source={require('../../../assets/images/icons/del.png')} />
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

export default NotesDetailsCard;
