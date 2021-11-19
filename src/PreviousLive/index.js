import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, FlatList, ImageBackground, Image, View, Text, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSelector, useDispatch } from 'react-redux';
import streamArchieveReducer from '../reducers/StreamArchieve';
import Carousel from 'react-native-snap-carousel';


const PreviousLive = (props) => {
    const dispatch = useDispatch()
    const [previousLiveClass, setPreviousLiveClass] = useState([]);

    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
          
        fetch("https://api.collegepass.org/api/v2/archive/getStreamArchive", requestOptions)
        .then(response => response.text())
        .then(result => {
            const res = JSON.parse(result);
            if (res.status){
                console.log(res.data);
                dispatch(streamArchieveReducer(res.data));
                setPreviousLiveClass(res.data);
            }
        })
        .catch(error => console.log('error', error));
    }, [])


    _renderItem = ({item, index}) => {
        console.log(item)
        return (
            <ImageBackground 
                source={{uri:item.s3_image}} 
            >
                <View style={{width:wp(80),height:hp(25),justifyContent:'space-between',backgroundColor:'rgba(0,0,0,0.4)', alignItems:'center',borderRadius:20}}>
                    <View style={{flexDirection:'row',marginTop:hp(1), justifyContent:'space-between', width:wp(75)}}>
                        
                        <View style={{backgroundColor:'#f00', width:wp(22),height:hp(4),borderRadius:5,alignItems:'center',justifyContent:'center'}}>
                            <Text style={{color:'#fff',fontWeight:'500'}}>RECORDING</Text>
                        </View>
                        
                        <View style={{backgroundColor:'#fff', width:wp(18),height:hp(4),borderRadius:5,alignItems:'center',justifyContent:'center'}}>
                            <Text style={{color:'#000',fontWeight:'500'}}>PREMIUM</Text>
                        </View>
                    </View>
                    <Text style={{color:'#fff',fontSize:18,fontWeight:'500',textAlign:'center',marginTop:hp(1)}}>{ item.ARCHIVE_NAME }</Text>
                    <Text style={{color:'#ff0',textAlign:'center',width:wp(50),alignSelf:'center',fontSize:16,fontWeight:'500'}}>{ new Date(item.EVENT_DATE_TIME).toUTCString() }</Text>
                    <View style={{backgroundColor:'#f00', width:wp(30),height:hp(4),borderRadius:5,alignSelf:'center',marginBottom:hp(1),alignItems:'center',justifyContent:'center'}}>
                        <Text style={{color:'#fff',fontWeight:'500'}}>WATCH NOW</Text>
                    </View>
                </View>
            </ImageBackground>
        );
    }

    return(
        <View style={{flex: 1,backgroundColor:'#000'}}>
            <Text style={{color:'#fff',fontSize:18,fontWeight:'600',textAlign:'center',marginBottom:hp(2)}}>PREVIOUS LIVE STREAM</Text>
            <Carousel
              data={previousLiveClass}
              renderItem={_renderItem}
              sliderWidth={wp(100)}
              itemWidth={wp(80)}
            />
        </View>
    )



}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default PreviousLive