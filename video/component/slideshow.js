import React, { Component, Fragment } from 'react';
import {
Platform,
StyleSheet,
Text,
View,
Image,
Dimensions,
ImageBackground ,
TouchableOpacity
} from 'react-native';

//引用插件
import Swiper from 'react-native-swiper';

import {findSlideshow} from '../../api'
import { Actions } from 'react-native-router-flux';

// 取得屏幕的宽高Dimensions
const { width, height } = Dimensions.get('window');

export default class MyPage extends Component {

constructor(props) {
super(props);
 this.state = {
 movieList:[],
 swiperShow: false,

};
}

async componentDidMount(){

   setTimeout(() => {
      this.setState({
         swiperShow: true,
      });
      }, 1)

   let {data} =  await findSlideshow();
       
       this.setState({
           movieList:data
       })
 }

// 轮播图
renderBanner() {
  if (this.state.swiperShow) {
   console.log ('返回值' + this.state.swiperShow);
  return (
        <Swiper
    style={styles.wrapper}
    height={width * 40 / 75}
    showsButtons={false}
    removeClippedSubviews={false} //这个很主要啊，解决白屏问题
    autoplay={true}
    horizontal ={true}
    paginationStyle={styles.paginationStyle}
    dotStyle={styles.dotStyle}
    activeDotStyle={styles.activeDotStyle}
>
   {
      this.state.movieList.map((e,i)=>(
         <TouchableOpacity style={styles.moveList} onPress={() => { Actions.play({ data: e }) }} key={e.key}>
         <ImageBackground source={{uri:e.imgUrl}} style={{width:width,height:width*40/75}} resizeMethod='scale'>
            <Text style={{position:'absolute',
            bottom:20,
            left:10,
            color:'white',
            fontSize:18,
            fontWeight:'bold',
            textShadowColor: '#a1a1a1',
            textShadowOffset: { width: 2, height: 2 },
            textShadowRadius : 5}}>
               {e.title}
               </Text>
         </ImageBackground>
         </TouchableOpacity>
      ))
      
   }
  
   

</Swiper>


);

} else {
return (
   <View style={styles.wrapper}>
       <Image source={require('../assets/welcome2.jpg')} style={styles.bannerImg} />
   </View>
 );
}
}



render() {
return (
<View style={styles.container}>
{this.renderBanner()}
</View>
   );
}
}

const styles = StyleSheet.create({
container: {
height:width * 40 / 75,
 },

wrpaper: {
width: width,
height:width * 40 / 75,

},

 paginationStyle: {
    bottom: 6,
  },
   dotStyle: {
    width: 22,
   height: 3,
  backgroundColor: '#fff',
  opacity: 0.4,
   borderRadius: 0,
},
  activeDotStyle: {
       width: 22,
      height: 3,
    backgroundColor: '#fff',
     borderRadius: 0,
  },
  bannerImg:{
     width:width
  }

   });