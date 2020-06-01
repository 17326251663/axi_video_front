import React, { Component, Fragment } from 'react';
import { Linking, View, Text,StatusBar} from 'react-native';

import Orientation from 'react-native-orientation'

import {WebView} from 'react-native-webview'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() { 
        return ( 
    <>
    <StatusBar 
    barStyle    = "dark-content|light-content" 
    hidden      = {true}
    animated    = {true}
    />
                <View style={{flex:1}}>
                <WebView 
                source={{uri:this.props.lineUrl}}
                style={{justifyContent:'space-around',alignContent:'space-around'}}
                mediaPlaybackRequiresUserAction={false}
                automaticallyAdjustContentInsets={true}
                injectedJavaScript={this.js}
                javaScriptEnabled={true}
                scalesPageToFit={true}
                mixedContentMode="never"
                startInLoadingState={true}
                allowsInlineMediaPlayback={true}
                >
                </WebView>
            </View>
            </>
            );
    }

    js=
    `
    (
        function() {

            $('#search_page').html('').css('display','none')
        
            $('#header').html('').css('display','none')
    
            $('footer').html('').css('display','none')            

            $('body>#content').prop('style','height:100% !important')

            $('body').css('backgroundColor','black')

        document.getElementsByClassName('slide')[0].innerHTML=''

            var video = document.getElementsByTagName('video')[0]

            
           
       })();    
    `
    
    componentDidMount(){
        // Linking.openURL(this.props.lineUrl)

        console.log(this.props.lineUrl)
        Orientation.lockToLandscape();
    }

    //离开页面强制竖屏
    componentWillUnmount() {
        Orientation.lockToPortrait();
 }
}
 
export default App;