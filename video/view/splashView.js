
//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Animated,Dimensions,BackHandler } from 'react-native';
import GetSetStorge from '../utils/GetSetStorge';
import {Actions} from 'react-native-router-flux';

const splashImg = require('../assets/loading.jpg');//加载图片

const { width, height } = Dimensions.get('window');
// create a component
class splashView extends Component {
    constructor(props) {
        super(props);
        this.state = {  //这是动画效果
            bounceValue: new Animated.Value(1)
        };
    }
    componentDidMount() {

        //组织页面返回
        BackHandler.addEventListener('hardwareBackPress',
            this.onBackButtonPressAndroid);

        Animated.timing(
            this.state.bounceValue, { toValue: 1.2, duration: 1000 }
        ).start();
        this.timer = setTimeout(() => {
            GetSetStorge.getStorgeAsync('isFrist').then((result) => {
                if (result == null || result == '') {
                    //第一次启动 
                    Actions.loading();
                    GetSetStorge.setStorgeAsync('isFrist', 'true');
                } else {
                    //第二次启动s
                    Actions.index();
                }
            }).catch((error) => {
                console.log('==========================');
                console.log('系统异常' + error);
                console.log('==========================');
            });
        }, 2000);

    }
    componentWillUpdate = () => {
        clearTimeout(this.timer);
    }


    render() {
        return (
            <Animated.Image
                style={{
                    width: width,
                    height: height,
                    transform: [{ scale: this.state.bounceValue }]
                }}
                source={splashImg}
            />
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default splashView;