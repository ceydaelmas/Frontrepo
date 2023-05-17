import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react';
import {BASE_URL} from '../config';
import { useContext } from 'react';
import { Alert } from 'react-native';
const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({children}) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);
  const [token, setToken] = useState(null);

  const getTokenData = async () => {
    try {
      const value = await AsyncStorage.getItem('jwt');
      if (value !== null) {
        console.log(value);
        setToken(value);
        token = value;
        return value; // Value değerini döndür
      }
    } catch (e) {
    }
  };
  
  useEffect(() => {
    getTokenData();
    isLoggedIn();
    setIsLoading(false);
  },[]);
  

  const register = async (
    userFullName,
    userEmail,
    userName,
    userPassword,
    confirmPassword,
    navigation
  ) => {
    setIsLoading(true);
    await axios
      .post(`${BASE_URL}/Auth/register`, {
        userFullName,
        userEmail,
        userName,
        userPassword,
        confirmPassword,
      })
      .then(res => {
        let userInfo = res.data;
        setUserInfo(userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        setIsLoading(false);
        navigation.navigate('Login');
        console.log(userInfo);
      })
      .catch(e => {
        setIsLoading(false);
        Alert.alert('Register Error', userInfo.message);
      });
  };

  const login = async (email, password, navigation) => {
    setIsLoading(true);
    axios
      .post(`${BASE_URL}/Auth/login`, {
        email,
        password,
      })
      .then(res => {
        let userInfo = res.data;
        setUserInfo(userInfo);
        console.log("userrr", userInfo);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        AsyncStorage.setItem('jwt', userInfo.data.token);
        const removeItemValue =async(key)=> {
          try {
              await AsyncStorage.removeItem(key);
              return true;
          }
          catch(exception) {
              return false;
          }
      }
        
      
        
        navigation.navigate('Tabs');
      })
      .catch(e => {
        navigation.navigate('Login');
        setIsLoading(false); // Loader'ı durdur
        Alert.alert('Login Error', userInfo.message);
      });
  };
  

  const authorizedFetch = async (url, options = {}) => {
    useEffect(() => {
      getData();
    }, []);
  
    let localToken = await getTokenData();
    if (!localToken) {
      throw new Error("Token is not set");
    }

    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${localToken}`,
      },
    });
  };

  const logout = navigation => {
    setIsLoading(true);
    axios
      .post(
        `${BASE_URL}/Account/logout`,
        {},
        {
          headers: {Authorization: `Bearer ${userInfo.data.jwToken}`},
        },
      )
      .then(res => {
        console.log(res.data);
        AsyncStorage.removeItem('userInfo');
        navigation.navigate('Welcome');
        setUserInfo({});
        setIsLoading(false);
      })
      .catch(e => {
        console.log(`logout error ${e}`);
        setIsLoading(false);
      });
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);

      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserInfo(userInfo);
      }

      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
      console.log(`is logged in error ${JSON.stringify(e.response.data)}`);
    }
  };



  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        splashLoading,
        register,
        login,
        logout,
        token
      }}>
      {children}
    </AuthContext.Provider>
  );
};
