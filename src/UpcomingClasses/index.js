import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, FlatList, ImageBackground, Image, View, Text, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useSelector, useDispatch } from 'react-redux';
import liveClassesReducer from '../reducers/LiveClassesReducer';
import Carousel from 'react-native-snap-carousel';

const UpcomingClasses = (props) => {
    const dispatch = useDispatch()
    const [liveClasses, setLiveClasses] = useState([]);

    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
          fetch("https://api.collegepass.org/api/v1/events/getLiveClasses/", requestOptions)
            .then(response => response.text())
            .then(result => {
                let res = JSON.parse(result);
                if (res.status){
                    dispatch(liveClassesReducer(res.data));
                    setLiveClasses(res.data);
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
                        {item.is_live ? 
                            <View style={{backgroundColor:'#f00', width:wp(14),height:hp(4),borderRadius:5,alignItems:'center',justifyContent:'center'}}>
                                <Text style={{color:'#fff',fontWeight:'500'}}>LIVE</Text>
                            </View>
                        :
                            <View />
                        }
                        <View style={{backgroundColor:'#fff', width:wp(18),height:hp(4),borderRadius:5,alignItems:'center',justifyContent:'center'}}>
                            <Text style={{color:'#000',fontWeight:'500'}}>PREMIUM</Text>
                        </View>
                    </View>
                    <Text style={{color:'#fff',fontSize:18,fontWeight:'500',textAlign:'center',marginTop:hp(1)}}>{ item.NAME }</Text>
                    <Text style={{color:'#ff0',textAlign:'center',width:wp(50),alignSelf:'center',fontSize:16,fontWeight:'500'}}>{ new Date(item.DATE_TIME).toUTCString() }</Text>
                    <View style={{backgroundColor:'#f00', width:wp(50),height:hp(4),borderRadius:5,alignSelf:'center',marginBottom:hp(1),alignItems:'center',justifyContent:'center'}}>
                        <Text style={{color:'#fff',fontWeight:'500'}}>BOOK A FREE TRIAL CLASS</Text>
                    </View>
                </View>
            </ImageBackground>
        );
    }

    return(
        <View style={{flex: 1,backgroundColor:'#000'}}>
            <Text style={{color:'#fff',fontSize:18,fontWeight:'600',textAlign:'center',marginBottom:hp(2)}}>UPCOMING LIVE CLASSES</Text>
            <Carousel
              data={liveClasses}
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

export default UpcomingClasses