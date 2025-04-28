import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Layout from '../../components/Layout';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';

const ContactWithUs = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');

  const sendForm = () => {
    setName(''), setNumber(''), setEmail(''), setDescription('');
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
          value={name}
          placeholderTextColor="rgba(60, 60, 67, 0.6)"
          onChangeText={setName}
        />
        <Text style={styles.secondaryText}>Mobile number</Text>
        <TextInput
          style={styles.input}
          placeholder="+7 (XXX) XXX XX XX"
          value={number}
          placeholderTextColor="rgba(60, 60, 67, 0.6)"
          onChangeText={setNumber}
        />
        <Text style={styles.secondaryText}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="ivanivanov@gmail.com"
          value={email}
          placeholderTextColor="rgba(60, 60, 67, 0.6)"
          onChangeText={setEmail}
        />
        <Text style={styles.secondaryText}>Description</Text>
        <TextInput
          textAlignVertical="top"
          style={[styles.input, {height: 88}]}
          placeholder="Description"
          value={description}
          placeholderTextColor="rgba(60, 60, 67, 0.6)"
          onChangeText={setDescription}
        />
      </View>

      <View style={styles.footer}>
        <View style={{marginHorizontal: 16, alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => sendForm()}
            activeOpacity={0.7}
            style={{
              width: '100%',
              height: 56,
              borderRadius: 20,
              backgroundColor: '#FFC20E',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontWeight: '700', fontSize: 20, color: '#fff'}}>
              Send
            </Text>
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
