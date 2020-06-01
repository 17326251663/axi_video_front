import 'react-native-gesture-handler';
import React, { Component, Fragment } from 'react';

import {Router, Scene, Tabs} from "react-native-router-flux";

import {View,Text,Alert,AppState, Linking } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome';

import welcome from './video/view/splashView'
import loading from './video/view/guideView'
import index from './video/view/index/main'
import search from './video/view/search/index'
import user from './video/view/user/index'
import category from './video/view/category/index'

import play from './video/view/play'
import video from './video/view/video'



//设置tab选中时的字体颜色和标题
const TabIcon = ({focused , title}) => {
  return (
          <Fragment>
            <Icon name={title=='首页'?'home': title=='搜索'?'search':title=='分类'?'list':'user-o'} size={20} style={{color:focused  ? '#F56C6C':'#909399'}}/>
            <Text style={{color: focused  ? '#F56C6C':'#909399'}}>{title}</Text>
          </Fragment>
  );
};



class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      title:'播放器'
     }
  }

  componentDidMount(){
    AppState.addEventListener('change', this._handleAppStateChange)
  }
  componentWillUnmount(){
    AppState.removeEventListener('change', this._handleAppStateChange)
  }

  _handleAppStateChange = (nextAppState) => {


    console.log(nextAppState)

    if(nextAppState==='active'){
      Linking.getInitialURL().then(res => {
       console.log(res)
      })
    }
  }

  render() { 
    return ( 
      <Router>
      {/* 这种写法是将全部的跳转页面都放在Root下面 */}
      <Scene key="root"  tabBarPosition="bottom">
        {/* key 就是给页面的标签,供Actions使用 */}
        {/* component 设置关联的页面 */}
        {/* title 就是给页面标题 */}
        {/* initial 就是设置默认页面*/}
        <Scene
          key="welcome"
          component={welcome}
          hideNavBar={true}
        />
        <Scene key="loading" component={loading} hideNavBar={true}/>

      

        <Tabs
                key="tabbar"
                swipeEnabled
                wrap={false}
                // 是否显示标签栏文字
                showLabel={false}
                tabBarStyle={{backgroundColor: "#eee"}}
                hideNavBar
                //tab选中的颜色
                activeBackgroundColor="white"
                //tab没选中的颜色
                inactiveBackgroundColor="white"
            >


        <Scene key="index" component={index}  title='首页'  icon={TabIcon}/>
        <Scene key="search" component={search} title='搜索' icon={TabIcon}/>
      
        <Scene key="category" component={category} title='分类' icon={TabIcon}/>
        <Scene key="user" component={user} title='个人' icon={TabIcon}/>
        
        </Tabs>

        <Scene key="play" component={play} title={this.state.title}/>
        <Scene key="video" component={video} hideNavBar/>

      </Scene>
    </Router>
     );
  }
}
 
export default App;