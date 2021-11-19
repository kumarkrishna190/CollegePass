'use strict';
import React, { Component } from 'react';
import { AppRegistry, Text, View, Image, StyleSheet, useColorScheme, SafeAreaView, StatusBar,TouchableOpacity } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { store, persistor } from './store';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import UpcomingClasses from './src/UpcomingClasses';
import PreviousLive from './src/PreviousLive';

export default function App(props) {
    const isDarkMode = useColorScheme() === 'dark';
    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <StatusBar barStyle="light-content" backgroundColor="#000" />
              <View style={{width:wp(100),height:hp(100),backgroundColor:'#000'}}>
                <View style={{flexDirection:'row', alignSelf:'center', width:wp(94),marginTop:hp(1),marginBottom:hp(1), justifyContent:'space-between'}}>
                  <View style={{flexDirection:'row', width:wp(20),justifyContent:'space-between'}}>
                    <Image resizeMode={'contain'} source={require('./src/assets/hamBurger.png')} style={{height:hp(4),width:hp(4)}}/>
                    <Image resizeMode={'contain'} source={require('./src/assets/logo.png')} style={{height:hp(4),width:hp(4)}}/>
                  </View>
                  <TouchableOpacity>
                    <View style={{backgroundColor:'#f00', width:wp(14),height:hp(4),borderRadius:5,alignItems:'center',justifyContent:'center'}}>
                      <Text style={{color:'#fff',fontWeight:'500'}}>LOG IN</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <UpcomingClasses />
                <PreviousLive />
              </View>
            </PersistGate>
        </Provider> 
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        alignItems: "center",
        justifyContent: "center"
    }
})
