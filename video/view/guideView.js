
import React, { Component } from 'react';
import { Image, ScrollView, StyleSheet, Text, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import { Actions } from 'react-native-router-flux';

let image1 = require('../assets/welcome1.jpg');
let image2 = require('../assets/welcome2.jpg');
let image3 = require('../assets/welcome3.jpg');

const { width, height } = Dimensions.get('window');
export default class guideView extends Component {

    constructor() {
        super();
    };
    render() {
        return (
            <ScrollView
                contentContainerStyle={styles.contentContainer}
                bounces={false}
                pagingEnabled={true}
                horizontal={true}>
                <ImageBackground source={image1}
                    style={[styles.backgroundImage,styles.btnOut]} >

                    <TouchableOpacity
                        style={styles.next}
                       
                    >
                        <Text style={styles.btnText}>⚪ 〇 〇</Text>
                    </TouchableOpacity>

                    </ImageBackground>

                <ImageBackground source={image2} style={[styles.backgroundImage,styles.btnOut]} >

                <TouchableOpacity
                        style={styles.next}
                       
                    >
                        <Text style={styles.btnText}>〇 ⚪ 〇</Text>
                    </TouchableOpacity>

                </ImageBackground>

                <ImageBackground source={image3} style={[styles.backgroundImage,styles.btnOut]} >
                    <TouchableOpacity
                        style={styles.btn}    
                        onPress={()=>{Actions.index()}}               
                    >
                        <Text style={styles.btnText}>立即体验</Text>
                    </TouchableOpacity>
                </ImageBackground>
            </ScrollView>);
    }
};
var styles = StyleSheet.create({
    contentContainer: {
        width: width * 3,
        height: height,
    },
    backgroundImage: {
        width: width,
        height: height,
    },
    btnOut:{
        alignItems:'center',
    },
    btn:{
        width:150,
        height:50,
        borderRadius:50,
        justifyContent:'center',
        alignItems:'center',
        marginTop:550,
        borderWidth:1,
        borderColor:'white'
    },
    next:{
        width:150,
        height:50,
        borderRadius:8,
        justifyContent:'center',
        alignItems:'center',
        marginTop:550,

    },
    btnText:{
        fontSize:18,
        
        color:'#fff'
    },
});