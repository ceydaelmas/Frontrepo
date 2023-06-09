import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Image, Text} from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useMarket} from '../context/MarketContext';
import {useNavigation} from '@react-navigation/native';

const TransactionCard = ({transactions, isCurrentUserPage}) => {
  const navigation = useNavigation();
  if (transactions?.succeeded === false) {
    // Yükleniyor durumunu göstermek için.
    return (
      <View>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#EEF1FF',
              paddingTop: 20,
              paddingBottom: 20,
              paddingLeft: 25,
              paddingRight: 20,
              marginHorizontal: 0,
              borderRadius: 20,
              alignItems: 'center',
              marginTop: 30,
            }}>
            <View>
              <Text
                style={{
                  color: '#345c74',
                  fontFamily: 'Poppins-Regular',
                  fontSize: 16,
                  paddingLeft: 30,
                  width: 280,
                }}> {isCurrentUserPage ? 'Henüz bir senet almadın :(':'Bu kullanıcı henüs senet almadı'}</Text>
              <View style={{flexDirection: 'row'}}></View>
            </View>
          </View>
      </View>
    );
  }

  return (
    <View>
      {transactions?.map((item, index) => (
        <View
          key={index}
          style={{
            flexDirection: 'row',
            backgroundColor: '#F6F1F1',
            paddingTop: 30,
            paddingBottom: 30,
            paddingLeft: 20,
            paddingRight: 20,
            marginHorizontal: 0,
            borderRadius: 20,
            alignItems: 'center',
            marginTop: 15,
          }}>
          <Ionicons
            name="pricetags-outline"
            color="#f58084"
            size={35}
          />
          <View>
            <Text
              style={{
                color: '#345c74',
                fontFamily: 'Poppins-SemiBold',
                fontSize: 15,
                paddingHorizontal: 20,
                width: 250,
              }}>
              {item.marketName} - Senet: {item.stockName}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  color: '#345c74',
                  fontFamily: 'Poppins-Regular',
                  fontSize: 16,
                  paddingHorizontal: 20,
                  flex: 2,
                  flexWrap: 'wrap',
                }}>
                Aldığın Senet : {item.marketTransactionAmount} Adet
              </Text>
            </View>

            <Text
              style={{
                color: '#345c74',
                fontFamily: 'Poppins-Regular',
                fontSize: 15,
                paddingHorizontal: 20,
              }}>
              Toplam yatırımın: {parseFloat(item.userTotalInvestment).toFixed(0)} coin
            </Text>
          </View>
          <View
            style={{
              paddingLeft: 30,
            }}>
          </View>
        </View>
      ))}
    </View>
  );
};

export default TransactionCard;
