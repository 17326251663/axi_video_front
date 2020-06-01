import React, { Component, Fragment } from 'react';
import { View, Text, Dimensions, Button, TouchableOpacity, StyleSheet, ImageBackground, Image, Linking } from 'react-native';
import { TextInput, ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';

import { search_hot, search } from '.././../../api'
import { Actions } from 'react-native-router-flux';

const { width, height } = Dimensions.get('window');

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search_hot: [],
            search_condition: '',
            modelList: []
        }
    }
    render() {
        return (

            <View>

                <View style={{ flexDirection: 'row' }}>
                    <Icon name='search' style={{ backgroundColor: '#fafafa', lineHeight: 50, fontSize: 20, width: width / 2 * 0.2, textAlign: 'center', color: '#a1a1a1' }} />
                    <TextInput
                        value={this.state.search_condition}
                        onChangeText={(e) => this.setState({ search_condition: e })}
                        ref='textInputRefer'
                        autoFocus={true}
                        style={{ borderWidth: 5, borderColor: '#fafafa', width: width / 2 * 1.5, height: 50, paddingLeft: 20 }}
                        placeholder='        请输入关键字进行搜索' />

                    <TouchableOpacity
                        onPress={() => this.sendsearch()}
                        style={{ width: width / 2 * 0.27, height: 50, backgroundColor: '#fafafa', justifyContent: 'center' }}>
                        <Text style={{ color: 'black', fontSize: 18, textAlign: 'center' }}>搜索</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView>
                    {/* 滚动条 */}
                    {
                        this.state.search_condition.length == 0 ?
                            <ScrollView>
                                {
                                    this.state.search_hot.map((e, i) => (
                                        <TouchableOpacity style={styles.moveList} onPress={() => this.search(e.title)} key={i}>

                                            <View style={{ flexDirection: 'row', borderBottomWidth: 0.2, borderBottomColor: '#e2e2e2', padding: 20, height: 60 }}>
                                                <View style={i < 3 ? styles['hot' + (i + 1)] : styles.hot_other}><Text style={styles.hot}>{i + 1}</Text></View>
                                                <View><Text>{e.title}</Text></View>
                                            </View>
                                        </TouchableOpacity>
                                    ))
                                }
                                <View>

                                </View>
                            </ScrollView>
                            : <></>
                    }

                    {this.state.modelList.data != undefined && this.state.search_condition.length != 0 ? <View style={{ padding: 5 }}>
                        {this.state.modelList.data != undefined ? <Text style={{ lineHeight: 25, fontWeight: 'bold' }}>{`(${this.state.modelList.data.searchNum}个)`}</Text> : <></>}
                    </View>
                        : <></>}

                    {/* 列表一 */}
                    {
                        this.state.modelList.data != undefined
                         &&this.state.modelList.data.modelList1.length!=0
                         && this.state.search_condition.length != 0 ? <View style={{ height: 220 }}>
                            <ScrollView horizontal
                            keyboardDismissMode='on-drag'
                            showsHorizontalScrollIndicator={false}>

                                <View style={{ flexDirection: 'row' }}>

                                    {
                                        this.state.modelList.data.modelList1.map((e, i) => (
                                            <View key={i}>
                                                <TouchableOpacity onPress={()=>Actions.play({data:e})}>
                                                <Image
                                                    source={{ uri: e.imgUrl }}
                                                    style={{ width: width / 3, height: 180, marginRight: 10, resizeMode: 'stretch' }} />
                                                <Text style={{ color: 'orange', lineHeight: 40, fontWeight: 'bold' }}>{e.title}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        ))

                                    }

                                </View>

                            </ScrollView>
                        </View> : <></>
                    }

                    {/* 列表二 */}
                    <View style={{ backgroundColor: '#fafafa' }}>
                        {this.state.modelList.data != undefined && this.state.search_condition.length != 0 ?

                            this.state.modelList.data.modelList2.map((e, i) => (
                                <View
                                    style={{ flexDirection: 'row', marginTop: 10, backgroundColor: 'white', padding: 10 }}
                                    key={i}>
                                    <Image source={{ uri: e.imgUrl }} style={{ width: 130, height: 190 }} />
                                    {/* 简介 */}
                                    <View style={{
                                        paddingLeft: 5, flexDirection: 'row',

                                        justifyContent: 'flex-start',
                                        width: 200,
                                        flexWrap: 'wrap',
                                    }}>
                                        <Text >{e.title}</Text>
                                        <Text >{e.genre}</Text>
                                        <Text >{e.director}</Text>
                                        <Text >{e.cast}</Text>
                                        <Text >{e.source}</Text>
                                    </View>
                                    {/* 播放按钮 */}
                                    <View style={{position:'absolute',bottom:30,flexDirection:'row',right:40}}>
                                    <TouchableOpacity style={{padding:8,backgroundColor:'#E6A23C',borderRadius:3,marginRight:20}} onPress={()=>Actions.play({data:e})}>
                                    <Text style={{color:'white'}}>▶播放</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{padding:5,backgroundColor:'#409EFF',borderRadius:3}} onPress={()=>Linking.openURL(e.dataUrl)}>
                                    <Text style={{color:'white'}}>去官网解析</Text>
                                    </TouchableOpacity>
                                    </View>
                                </View>
                            ))

                            : <></>}
                    </View>

                    <View style={{ width: width, height: 100, backgroundColor: '#fafafa' }}></View>

                </ScrollView>

            </View>

        );
    }

    search = async (keyword) => {
        await this.setState({
            search_condition: keyword
        })

        this.sendsearch()
    }

    async sendsearch() {
        let data = await search(this.state.search_condition)
        console.log(data)
        if (data.code != 1) {
            alert(data.message)
            return
        }

        this.setState({
            modelList: data
        })

    }

    componentWillMount() {
        if (this.refs.textInputRefer != undefined) {
            this.refs.textInputRefer.focus();
        }
    }

    async componentWillMount() {
        let { data } = await search_hot()
        this.setState({
            search_hot: data.itemList
        })
    }
}
const styles = StyleSheet.create({
    hot1: {
        backgroundColor: 'red',
        width: 20,
        height: 20,
        marginRight: 20,
        borderRadius: 2
    },
    hot2: {
        backgroundColor: 'orange',
        width: 20,
        height: 20,
        marginRight: 20,
        borderRadius: 2
    },
    hot3: {
        backgroundColor: 'rgba(230, 162, 60, 0.54)',
        width: 20,
        height: 20,
        marginRight: 20,
        borderRadius: 2
    },
    hot_other: {
        backgroundColor: '#a1a1a1',
        width: 20,
        height: 20,
        marginRight: 20,
        borderRadius: 2
    },
    hot: {
        color: 'white',
        textAlign: 'center',
        lineHeight: 20
    }
})
export default App;