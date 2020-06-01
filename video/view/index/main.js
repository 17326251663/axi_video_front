import React, { Component, Fragment } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

import Search from '../../component/searchbar'
import Slideshow from '../../component/slideshow'
import { View, Text, StyleSheet, Dimensions, Image, ImageBackground, Alert, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'

import { jxAlbum } from '../../../api'
import { Actions } from 'react-native-router-flux';

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tvList: [],
            movieList: []
        }
    }


    async componentDidMount() {
        //获取首页资源
        let { data } = await jxAlbum()
        if (this.state.tvList.length == 0) {
            this.setState({
                tvList: data
            })
        }
    }

    showData() {
        return (
            <View>

            </View>
        )
    }


    render() {
        return (
            <Fragment>

                {/* 搜索框 */}
                <Search />

                {/* 走马灯 */}
                {/* <View style={{margin:4}}>
                    <Text>🔊公告:111</Text>
                </View> */}

                <ScrollView>

                    {/* 轮播图 */}
                    <Slideshow />

                    {/* 精选剧场 */}


                    {
                        this.state.tvList.length != 0 ?

                            this.state.tvList.map((e, i) => (

                                <View key={i} style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                                    <Text style={styles.myh1}>{e.title}</Text>

                                    {e.modelList.map((e2, i2) => (
                                        <TouchableOpacity style={styles.moveList} onPress={() => { Actions.play({ data: e2 }) }} key={i2}>
                                            <View style={styles.moveList} myKey={e2.key}>
                                                <ImageBackground source={{ uri: e2.imgUrl }} style={{ width: screenWidth / 2.18, height: screenWidth/3.8 }} resizeMode='center'>
                                                    <Text style={{ color: '#fafafa', position: 'absolute', bottom: 5, right: 5 }}>{e2.upInfo}</Text>
                                                </ImageBackground>
                                                <Text style={{ fontWeight: 'bold', marginLeft: 5, marginTop: 5 }}>
                                                {e2.title ? (e2.title.length > 10 ? e2.title.substr(0, 10) + "..." : e2.title) : ""}
                                                </Text>
                                                <Text style={{ marginLeft: 5, marginTop: 5, fontSize: 13 }}>
                                                {e2.remark ? (e2.remark.length > 10 ? e2.remark.substr(0, 10) + "..." : e2.remark) : ""}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </View>

                            ))

                            : <View><Text>服务器开小差了哦</Text></View>
                    }


                </ScrollView>
            </Fragment>
        );
    }
}


const styles = StyleSheet.create({

    myh1: {
        paddingLeft: 10,
        fontSize: 18,
        lineHeight: screenHeight / 10,
        fontWeight: "bold",
        textShadowColor: '#fafafa',
        textShadowRadius: 2,
        textShadowOffset: { width: 2, height: 2 },
        color: '#a1a1a1',
        width: screenWidth
    },
    moveList: {
        width: screenWidth / 2.16,
        height: screenHeight / 4.5,
        textAlign: 'center',
        marginBottom: 8
    },
    moveListFrom: {

    }

})

export default App;