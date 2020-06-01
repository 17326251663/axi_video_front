import React, { Component, Fragment } from 'react';
import {View, Text, Button, Linking, Image, Dimensions, Picker, StyleSheet, TouchableHighlight, TouchableOpacity, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { getTvInfo, getAllTxTvByUrl } from '../../api'

const { width, height } = Dimensions.get('window');

import PopUp from '../component/popUp'


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            click: -1,
            line: 'https://www.yaosou.cc/jiexi2/?url=',
            lineList: [
                'https://www.yaosou.cc/jiexi2/?url=',
                'https://jx.688ing.com/?search=',
                'https://v.7cyd.com/vip/?url=',
                'https://api.653520.top/vip/?url=',
                'http://mimijiexi.top/?url=',
                'http://55jx.top/?url=',
                'http://playx.top/?url=',
                'http://nitian9.com/?url=',
                'http://19g.top/?url=',
                'http://607p.com/?url=',
                'http://52088.online/?url='
            ],
            jss: {
                set: [{
                    dataUrl: this.props.data.dataUrl,
                    title: ''
                }],
                remark: ''
            },
            AllSource: {
                cid: '',
                vidSet: []
            },
            clickButton:'-1'
        }
    }


    //当前视图自定义标题栏目，默认执行
    static navigationOptions = ({ navigation, screenProps }) => {
        return ({
            headerStyle: { backgroundColor: '#fafafa' },
            title: navigation.state.params.data.title,
            headerTitleStyle: { color: '#303133', flex: 1, textAlign: 'left' },
        });
    };



    open = () => {

        Linking.openURL(line)
    }

    format_url(url, i) {

        this.setState({
            click: i
        })

        let u1 = 'https://v.qq.com/x/cover/'

        if (url.indexOf('m.v.qq.com') == -1) {
            Linking.openURL(this.state.line + url)
            return
        }

        url = url.split("?")[1].split("&");
        let cid = url[0].split("=")[1];
        let vid = url[1].split("=")[1];

        Actions.video({lineUrl:this.state.line + u1 + cid + "/" + vid + ".html"})

        //Linking.openURL(this.state.line + u1 + cid + "/" + vid + ".html")
    }

    gotoUrl= (url, i) => {

        let u1 =this.state.line+ 'https://v.qq.com/x/cover/'+this.state.AllSource.cid+'/'+url +'.html'

        this.setState({
            clickButton:i
        })

        Actions.video({lineUrl:u1})
    }

    render() {
        return (
            <Fragment>

                {/* 弹框 */}
                <PopUp ref={ref => this.popUp = ref}>
                    <ScrollView horizontal>
                        <View style={{ flexDirection: 'row',flexWrap:'wrap',height:300,width:this.state.AllSource.vidSet.length*8 }}>
                            {
                                this.state.AllSource.vidSet.map((e, i) => (
                                    <View style={{margin:5,width:50}} key={i}>
                                    <Button title={(i<9?'0':'')+(i + 1)} onPress={()=>this.gotoUrl(e,i)} color={i==this.state.clickButton?'#ff6a00':''} />
                                    </View>
                                ))
                            }
                        </View>
                    </ScrollView>

                </PopUp>

                <View style={{ margin: 5, borderWidth: 0.2, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                    <Image source={{ uri: this.props.data.imgUrl }} resizeMode="stretch" style={{ borderRadius: 20, width: width - 10.4, height: height / 4 }} />
                    <View style={{ borderWidth: 0.2, margin: 1, borderColor: '#a1a1a1', backgroundColor: '#fafafa', width: width - 10.4, paddingTop: 10, paddingLeft: 20, paddingBottom: 10, paddingRight: 20 }}>

                        {/* <Text style={{ color: '#a1a1a1', marginBottom: 1 }}>{this.props.data.title}</Text> */}

                        {this.state.jss.remark != '' ? <Text>{this.state.jss.remark}</Text> : <></>}


                    </View>
                </View>


                <View style={{ flexDirection: 'row', margin: 5, borderWidth: 1, borderColor: '#a1a1a1' }}>
                    <Picker
                        mode={'dropdown'}
                        style={styles.picker}
                        selectedValue={this.state.line}
                        onValueChange={(value) => this.setState({ line: value })}>
                        {this.state.lineList.map((e, i) => (
                            <Picker.Item key={i} label={'线路' + (i + 1) +"     无法播放?先稍等,再试试更换线路吧"} value={e} />
                        ))}
                    </Picker>

                </View>
                <ScrollView>
                    <View style={{ margin: 5 }}>



                        {
                            this.state.AllSource.vidSet.length != 0 ? <Button title='视频不全?点此获取所有视频的集数' onPress={() => { this.popUp.show() }} /> : <></>
                        }

                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>剧集:
                        </Text>

                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                            {/* Actions.video({lineUrl:this.state.line+this.props.data.dataUrl })*/}
                            {
                                this.state.jss.set.map((e, i) => (
                                        
                                    <TouchableHighlight key={i} onPress={() => this.format_url(e.dataUrl, i)}

                                        style={styles.click, {
                                            margin: 6, width: 100, maxHeight: 100,
                                            paddingLeft: 20, paddingRight: 20, paddingTop: 10, paddingBottom: 10,

                                            borderRadius: 2, backgroundColor: this.state.click == i ? 'rgb(255, 157, 10)' : '#F2F6FC'
                                        }}>

                                        <Text style={{ color: this.state.click == i ? 'white' : '#606266', textAlign: 'center' }}>{e.title.substring(0, 10) + (e.title.length > 10 ? '...' : '')}</Text>

                                    </TouchableHighlight>
                                ))
                            }
                        </View>
                    </View>

                </ScrollView>

            </Fragment>
        )
    }

    async componentDidMount() {
        let data = await getTvInfo(this.props.data.dataUrl)
        if (data.code == 1) {
            this.setState({
                jss: data.data
            })
        }
        if (data.data.set.length < 51) {
            return
        }

        let u1 = 'https://v.qq.com/x/cover/'

        let url = data.data.set[data.data.set.length - 1].dataUrl

        if (url.indexOf('m.v.qq.com') == -1) {
            return
        }

        url = url.split("?")[1].split("&");
        let cid = url[0].split("=")[1];
        let vid = url[1].split("=")[1];
        let mypc = u1 + cid + "/" + vid + ".html"

        //获取所有的视频
        let mypcs = await getAllTxTvByUrl(mypc)
        console.log(mypcs)
        if (mypcs.code == 1) {
            this.setState({
                AllSource: {
                    cid: mypcs.data.cid,
                    vidSet: mypcs.data.vidSet
                }
            })
        }
    }
}

const styles = StyleSheet.create({
    picker: {
        width: width,
        height: 30,
        color: '#409EFF'
    },
    click: {
        backgroundColor: 'pink'
    }
})

export default App;