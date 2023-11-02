import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {styles} from './styles';
import {getFontSize, getHeight, getWidth} from '../../../utils/ResponsiveFun';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';

const FAQs = ({navigation}) => {
  const [state, setState] = useState(null);

  const DATA=[{},{},{}]
 
  return (
    <View style={{flex: 1, backgroundColor: '#F5F5F5'}}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="white"
      />
      <LinearGradient
        colors={[
          '#FFFFFF',
          '#F5F5F5',
          '#FFFFFF',
          '#F5F5F5',
          '#FFFFFF',
          '#F5F5F5',
          '#F5F5F5',
          '#FFFFFF',
        ]}
        style={{
          alignSelf: 'center',
          width: getWidth(100),
          height: getHeight(90),
        }}>
        <View>
          <Text
            style={styles.WorkOutSession}>
            Workout session
          </Text>
        </View>
        <FlatList
         
            data={DATA}
            showsHorizontalScrollIndicator={false}
           
            renderItem={({item, index}) => (
              <View>
                {state==index ? (
                  <TouchableOpacity
                  style={{
                    alignSelf: 'center',
                    width: getWidth(91),
                    backgroundColor: 'white',
                    alignItems: 'center',
                    marginTop: getHeight(2),
                    borderRadius: 15,
                  }}
                  onPress={() => setState(null)}>
                  <View
                    style={styles.faqListView}>
                    <Text
                      style={styles.questionText}>
                      Lorem ipsum dolor sit amet?
                    </Text>
                    <MaterialIcons
                      name={'keyboard-arrow-up'}
                      size={25}
                      color={'#182d4a'}
                    />
                  </View>
                  <Text
                    style={styles.answer}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec
                    aliquam turpis purus pulvinar in at in vitae libero. Nulla
                    condimentum placerat aliquet arcu feugiat. Posuere amet nibh
                    curabitur in sit sed scelerisque vivamus elit. Molestie in
                    vulputate euismod quis lectus et ac.
                  </Text>
                  <View style={{height: getHeight(2)}}></View>
                </TouchableOpacity>
         
        ) : (
          <TouchableOpacity
          style={styles.QuestionList}
          onPress={() => setState(index)}>
          <Text
            style={styles.questionText}>
            Lorem ipsum dolor sit amet?
          </Text>
          <MaterialIcons
            name={'keyboard-arrow-down'}
            size={25}
            color={'#182d4a'}
          />
        </TouchableOpacity>
        )}
              </View>
            )}
            keyExtractor={item => item.id}
          />
        

       
      </LinearGradient>
      
    </View>
  );
};

export default FAQs;
