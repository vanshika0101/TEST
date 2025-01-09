import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigation = useNavigation();

  // Google Sign-In Configuration
  GoogleSignin.configure({
   //webClientId: '558774693256-0ntcjrldqd2m327vguq800mthbt77559.apps.googleusercontent.com', // Replace with your Web Client ID from Firebase
  //  offlineAccess: false,
  });

  // Helper: Validate Email Format
  const isValidEmail = (email) => /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);

  // Handle Email/Password Login
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid Gmail address.');
      return;
    }

    setError('');
    Alert.alert('Login Successful', `Logged in with email: ${email}`);
    navigation.navigate('DemoApp'); // Navigate to your app's main screen
  };

  // Handle Google Sign-In
  const onGoogleButtonPress = async () => {
    setLoading(true);
    setError('');
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const userInfo = await GoogleSignin.signIn();
      console.log('Google Sign-In Success:', userInfo);

      // Example: Use userInfo data or navigate to the app's main screen
      navigation.navigate('DemoApp');
    } catch (error) {
      console.error('Google Sign-In Error:', error);

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        setError('Sign-In was cancelled. Please try again.');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        setError('Sign-In is already in progress.');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        setError('Google Play Services are not available or outdated.');
      } else {
        setError('Google Sign-In failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#8e8e8e"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#8e8e8e"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Login Button */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: loading ? '#A5D6A7' : '#4CAF50' }]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Login</Text>}
      </TouchableOpacity>

      {/* Divider */}
      <Text style={styles.divider}>OR</Text>

      {/* Google Sign-In Button */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: loading ? '#90CAF9' : '#4285F4' }]}
        onPress={onGoogleButtonPress}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Sign In with Google</Text>
        )}
      </TouchableOpacity>

      {/* Error Message */}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingLeft: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    color:'black',
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  divider: {
    fontSize: 16,
    marginVertical: 15,
    color: '#888',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    fontSize: 14,
  },
});

export default Login;
