import * as React from 'react';
import {
  TouchableOpacity,
  Animated,
  Text,
  View,
} from 'react-native';
import {SceneMap, TabView} from 'react-native-tab-view';
import {getWidth} from '../../../utils/ResponsiveFun';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../../Components/Button';
import {GernalStyle} from '../../constants/GernalStyle';
import {styles} from './styles';

import GeneralStatusBar from '../../Components/GeneralStatusBar';
import CardPayment from '../../Components/CardPayment';
import PaypalPayment from '../../Components/PaypalPayment';

const Payment = ({navigation}) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'CardPayment', title: 'Card Payment'},
    {key: 'PaypalPayment', title: 'Paypal Payment'},
  ]);
  const renderScene = SceneMap({
    CardPayment: CardPayment,
    PaypalPayment: PaypalPayment,
  });
  const renderTabBar = props => {
    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          return (
            <TouchableOpacity
              style={
                props?.navigationState?.index == i
                  ? route.key == 'PaypalPayment'
                    ? styles.tabItem
                    : {
                        ...styles.tabItem,
                      }
                  : styles.unselect
              }
              onPress={() => setIndex(i)}>
              <Animated.Text
                style={
                  props?.navigationState?.index == i
                    ? styles.selectedTabText
                    : styles.TabTex
                }>
                {route.title}
              </Animated.Text>
              {props?.navigationState?.index == i ? (
                <View style={styles.animatedview} />
              ) : (
                <View style={styles.animatedview2} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <GeneralStatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="white"
        translucent={true}
      />

      <View style={styles.contaner}>
        <View style={styles.txtview}>
          <Text style={styles.txt}>Already there!</Text>
        </View>
        <View style={styles.stxtview}>
          <Text style={styles.stxt}>
            Please confirm your payment details so that you may continue your
            healthy routine seamlessly.
          </Text>
        </View>

        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          renderTabBar={renderTabBar}
          initialLayout={{width: getWidth(100)}}
        />
      </View>
    </View>
  );
};

export default Payment;