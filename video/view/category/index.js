import React, { Component } from 'react';
import { View, Text, TouchableHighlight, Linking, StyleSheet, Dimensions, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';

import { getCategory, sourceList } from '../../../api'

import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
import { Actions } from 'react-native-router-flux';


const { width, height } = Dimensions.get('window');

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //总类型
            parentCategory: [],
            //字列表
            childrenCategory: [],
            //总类型索引
            intfname: 1,
            //子类型
            childrenType: {
                offset: 0,
                offAdd: 21,
                url: ''
            },
            //资源列表
            sourceList: [],
            loading: ''
            //初始资源位置:

        }
    }

    SelectIntfname(index, value) {
        this.setState({
            intfname: `${value}`
        })
        this.loadingChildrenAndSource(index)
    }

    //子查询
    async setchildren_option(index, result) {

        let ct = this.state.childrenType

        ct[result.name + ''] = result.value

        this.setState({
            childrenType: ct
        })

        //改变条件之后再次进行查询
        this.getUrl()
    }

    getUrl = async (isOffset) => {

        let sb = this.state.childrenType

        if (isOffset) {
            sb.offset += sb.offAdd
        } else {
            sb.offset = 0
        }

        let url = `https://list.video.qq.com/fcgi-bin/list_common_cgi?pagesize=21&novalue=1&tid=573&uappkey=d2a6457eb8ae927a&uappid=20001172&type=${this.state.parentCategory[this.state.intfname].type + "&" + this.state.parentCategory[this.state.intfname].realUrl.split('?')[1]}`;

        //获取条件
        let params = ""


        for (let key in sb) {
            if (key != 'url')
                params += `&${key}=${sb[key]}`
        }

        url += params;

        let result = await sourceList(url)


        if (!result) {
            result = []
        }

        this.setState({
            sourceList: isOffset ? this.state.sourceList.concat(result) : result
        })


    }

    async loadingChildrenAndSource(index) {

        //查询之前置空,刷新按钮选中状态
        this.setState({
            childrenCategory: []
        })

        let result = await getCategory(this.state.parentCategory[index].realUrl)

        let stemp = {
            offset: 0,
            offAdd: 21,
            //默认打开资源的链接(电影)
        }

        //填充默认值
        //同时生成传递参数
        let paramers = ''

        for (let i = 0; i < result.length; i++) {
            stemp[result[i].name] = result[i].option[0]['value']
            paramers += '&' + result[i].name + '=' + result[i].option[0]['value']
        }

        this.setState({
            childrenCategory: result,
            childrenType: stemp
        })

        let ct = this.state.childrenType

        ct.url = 'https://list.video.qq.com/fcgi-bin/list_common_cgi?pagesize=21&novalue=1&offset=0&tid=573&uappkey=d2a6457eb8ae927a&uappid=20001172&type=' + this.state.parentCategory[this.state.intfname].type + "&" + this.state.parentCategory[this.state.intfname].realUrl.split('?')[1] + paramers

        //同时查询sourceList
        this.my_sourceList(1)

    }

    async my_sourceList(index) {
        //根据url查询
        if (index) {
            let result = await sourceList(this.state.childrenType.url)
            this.setState({
                sourceList: result
            })
        }
    }

    loadScrollView = (e) => {


        var offsetY = e.nativeEvent.contentOffset.y; //滑动距离
        var contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
        var oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度
        if (offsetY + oriageScrollHeight+ 50 < contentSizeHeight) {
            return
        }

        this.setState({
            loading: 'loading... 🛴'
        })

        setTimeout(() => {
            //加载资源
            this.getUrl(true)

            this.setState({
                loading: ''
            })
        }, 400);

        return
    }

    render() {
        return (
            <>
                <View>
                    <ScrollView
                        onMomentumScrollEnd={this.loadScrollView}
                    >

                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={styles.selectscroll}>
                                <RadioGroup
                                    style={styles.radiogroup}
                                    selectedIndex={1}

                                    onSelect={(index, value) => this.SelectIntfname(index, value)}>
                                    {
                                        this.state.parentCategory.map((e, i) => (
                                            <RadioButton key={i} value={i} style={styles.radioButton}>
                                                <Text style={styles.radiotext}>{e.typeName}</Text>
                                            </RadioButton>
                                        ))
                                    }

                                </RadioGroup>
                            </View>
                        </ScrollView>
                        <View style={styles.bottomborder}></View>

                        {
                            this.state.childrenCategory.push.length != 0 ?
                                this.state.childrenCategory.map((e, i) => (
                                    <View key={i}>
                                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                            <View style={styles.selectscroll}>
                                                <RadioGroup
                                                    style={styles.radiogroup}
                                                    onSelect={(index, value) => this.setchildren_option(index, value)}
                                                    selectedIndex={0}>
                                                    {
                                                        e.option.map((e2, i2) => (
                                                            <RadioButton value={{ name: e.name, value: e2.value }} style={styles.radioButton} key={i2}>
                                                                <Text style={styles.radiotext}>{e2.display_name}</Text>
                                                            </RadioButton>
                                                        ))
                                                    }

                                                </RadioGroup>
                                            </View>
                                        </ScrollView>
                                        <View style={styles.bottomborder}></View>
                                    </View>
                                ))
                                : <></>
                        }



                        <View style={styles.sourceBox}>

                            {
                                this.state.sourceList.map((e, i) => (
                                    <TouchableOpacity onPress={() => { Actions.play({ data: { title: e.title, imgUrl: e.imgUrl_hz, dataUrl: e.dataUrl } }) }} style={styles.sourceList} key={i}>
                                        <View>
                                            <ImageBackground source={{ uri: e.imgUrl }} style={styles.sourceImage}>
                                                <Text style={{
                                                    position: 'absolute',
                                                    bottom: 5,
                                                    right: 5,
                                                    color: 'white',
                                                    textShadowColor: 'black',
                                                    textShadowRadius: 1,
                                                    textShadowOffset: { width: 1, height: 1 },
                                                }}>
                                                    {e.upInfo}
                                                </Text>
                                            </ImageBackground>
                                            <Text style={{ fontWeight: 'bold', textAlign: 'center', lineHeight: 30 }}>
                                                {e.title}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                ))
                            }

                        </View>

                        {this.state.sourceList.length == 0 ? <View
                            style={{ alignContent: 'center', justifyContent: 'center' }}
                        ><Text style={{ textAlign: 'center', lineHeight: 200 }}>暂无资源🙂~</Text></View> : <View></View>}

                        <View>
                            <Text style={{ textAlign: 'center', padding: 10, fontWeight: 'bold' }}>{this.state.loading}</Text>
                        </View>

                    </ScrollView>
                </View>
            </>);
    }
    async componentDidMount() {
        let result = await getCategory()

        if (result.code == 1) {
            this.setState({
                parentCategory: result.data
            })
            this.loadingChildrenAndSource(1)
        } else {
            alert(result.message)
        }
    }
}

let styles = StyleSheet.create({
    radioButton: {
        margin: 0,
        padding: 0,
        paddingTop: 5,
        paddingBottom: 5
    },
    radiogroup: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    radiotext: {
        fontSize: 13,
        lineHeight: 28,

    },
    selectscroll: {

    },
    bottomborder: {
        borderBottomWidth: 0.2,
        borderColor: "#b6b7b7",
        width: width
    },
    sourceBox: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignContent: 'center',
        width: width
    },
    sourceList: {
        width: width / 3 * 0.95,
        height: height / 3.7,
        overflow: 'hidden',
    }
    , sourceImage: {
        width: width / 3 * 0.95,
        height: height / 4.5,
        resizeMode: 'stretch'
    }
})

export default App;