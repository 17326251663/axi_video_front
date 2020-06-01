import React, { Component } from 'react';
import {View ,Text,TouchableHighlight, Linking} from 'react-native';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( <>
        <View>

            <Text>制作中,有问题请联系作者,qq:207798583</Text>
            <Text>制作中,有问题请联系作者,邮箱:207798583@qq.com</Text>

                <TouchableHighlight 
                onPress={()=>Linking.openURL('mqqwpa://im/chat?chat_type=wpa&uin=207798583&version=1&src_type=web&web_src=oicqzone.com')} 
                style={
                    {
                        margin:20,
                        backgroundColor:'#409EFF',
                        width:140,
                        height:40,
                        padding:10,
                        borderRadius:4
                    }
                }>
                    <Text style={{color:'white',textAlign:'center'}}>有问题?进行反馈</Text>
                </TouchableHighlight>
        </View>
        </> );
    }
}
 
export default App;