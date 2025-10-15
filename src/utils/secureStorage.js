import EncryptedStorage from 'react-native-encrypted-storage';

const TOKEN_KEY = 'auth_token';

export const secureStorage = {
  async setToken(token) {
    try {
      await EncryptedStorage.setItem(TOKEN_KEY, token);
      return true;
    } catch (error) {
      console.error('Error storing token:', error);
      return false;
    }
  },

  async getToken() {
    try {
      return await EncryptedStorage.getItem(TOKEN_KEY);
    } catch (error) {
      console.error('Error retrieving token:', error);
      return null;
    }
  },

  async removeToken() {
    try {
      await EncryptedStorage.removeItem(TOKEN_KEY);
      return true;
    } catch (error) {
      console.error('Error removing token:', error);
      return false;
    }
  },
};

// Initialize app — check if token exists, otherwise create one
export const initializeApp = async () => {
  const token = await secureStorage.getToken();
  if (!token) {
    await secureStorage.setToken('dummy-auth-token-12345');
  }
  return token || 'dummy-auth-token-12345';
};
