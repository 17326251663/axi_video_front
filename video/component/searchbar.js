import React, { Component, Fragment } from 'react';
import { View, Text,StyleSheet, TextInput, Button ,Dimensions} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 


                   <View style={{flexDirection:'row',backgroundColor:'#fafafa',borderBottomColor:'#a1a1a1',borderBottomWidth:1}}>
                       {/* 搜索样式 */}
                        <View  style={styles.searchNav}>
                        <Icon name={'navicon'} size={25} color='#F56C6C' style={{textAlign:'center'}}/>
                        </View>

                        {/* 搜索框 */}
                     <View style={styles.searchBar}>
                        <Text style={{
                            textAlign:'center',
                            color:'#F56C6C',
                            fontSize:20,
                            fontWeight:'bold',
                            lineHeight:50,
                            textShadowColor:'#a1a1a1',
                            textShadowRadius:2,
                            textShadowOffset:{width:1,height:1},
                            }}>
                            阿曦视频
                            </Text>
                    </View>

                     {/* 搜索样式 */}
                        <View  style={styles.searchNav}>
                        <Icon name={'search'} size={25} color='#F56C6C' style={{textAlign:'center'}} onPress={()=>{Actions.search()}}/>
                        </View>
                        
                   </View>
                
         );
    }
}
 

const styles = StyleSheet.create({
    searchBar:{
        width:screenWidth/6*4,
        height:screenHeight/16
    },

    searchNav:{
        width:screenWidth/6*1,
        backgroundColor:'#fafafa',
        height:screenHeight/16,
        justifyContent:'center'
    }

})

export default App;