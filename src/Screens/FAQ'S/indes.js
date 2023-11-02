import React, {useState, useRef} from 'react';
import {
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {styles} from './styles';
import {getFontSize, getWidth} from '../../../utils/ResponsiveFun';
import LinearGradient from 'react-native-linear-gradient';
import GeneralStatusBar from '../../Components/GeneralStatusBar';
import Pricing from '../../Components/Pricing';
import Security from '../../Components/Security/Index';
import Ortho from '../../Components/Ortho';
import General from '../../Components/General';
import Insurane from '../../Components/Insurane';
const FAQ = () => {
  const [selected1, setSelected1] = useState(1);

  const DATA = [
    {
      id: '1',
      title: 'What is SecondLook Ortho?',
    },
    {
      id: '2',
      title: 'Pricing',
    },
    {
      id: '3',
      title: 'General',
    },
    {
      id: '4',
      title: 'insurance',
    },
    {
      id: '5',
      title: 'Security & Privay',
    },
  ];
  return (
    <LinearGradient
      colors={['white', 'white', '#f7f7f7']}
      style={{flex: 1, alignItems: 'center'}}>
      <GeneralStatusBar
        backgroundColor="white"
        barStyle="dark-content"
        hidden={false}
        translucent={true}
      />
      <View style={styles.contaner}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.accounttext}>FAQ’s</Text>
          <Text style={styles.ttext}>
            Looking for answers? We are always happy to help/advice to your
            specific queries.
          </Text>
          <FlatList
            horizontal={true}
            data={DATA}
            showsHorizontalScrollIndicator={false}
            ListHeaderComponent={() => <View style={{padding: 5}} />}
            ItemSeparatorComponent={() => (
              <View style={styles.Separator}></View>
            )}
            renderItem={({item, index}) => (
              <View>
                {item?.id == selected1 ? (
                  <TouchableOpacity style={styles.ttext23}>
                    <Text
                      style={{
                        fontSize: getFontSize(2),
                        color: '#FFFFFF',
                        fontWeight: '600',

                        textAlign: 'center',
                      }}>
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.ttext2}
                    onPress={() => setSelected1(item?.id)}>
                    <Text>{item.title}</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
            keyExtractor={item => item.id}
          />
          {selected1 == '1' ? <Ortho /> : null}
          {selected1 == '2' ? <Pricing /> : null}
          {selected1 == '3' ? <General /> : null}
          {selected1 == '4' ? <Insurane /> : null}
          {selected1 == '5' ? <Security /> : null}
        </ScrollView>
      </View>
    </LinearGradient>
  );
};
export default FAQ;
