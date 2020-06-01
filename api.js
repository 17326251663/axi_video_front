import React, { Component } from 'react';
import { Alert } from 'react-native';

const url  = 'http://47.103.12.222:9090/tv/';

export function findSlideshow(){
    return fetch(url+'/imax',{method:'get'}).then(res=>res.json())
}

export function jxAlbum(){
    return fetch(url+'/album').then(res=>res.json())
}

export function jxMovie(){
    return fetch(url+'/jx_movie').then(res=>res.json())
}

export function search_hot(){
    return fetch('https://node.video.qq.com/x/api/hot_mobilesearch?channdlId=0').then(res=>res.json())
}

export function search(keyword){
    return fetch(url+"/search?keyword="+keyword).then(res=>res.json())
}

export function getTvInfo(url2){
    return fetch(url+"getInfo?url="+url2).then(res=>res.json())
}

export function getCategory(path){
    return fetch(path?path:url+"category").then(
        res=>{
            if(path) {
               
                return res.text().then(res=>JSON.parse(res.replace(/jsonp22\(/,"").replace(")","")).index)
            }
            return res.json()
        }
    ).catch(err=>alert(err))
}

export function sourceList(url){

    return fetch(url).then(e=>e.text()).then(e=>{
        let json = JSON.parse(e.replace(/jsonp22\(/,"").replace(')','')).jsonvalue.results

        //过滤不必要字段
        json = json.map(e=>({
            upInfo:e.fields.publish_date,
            title:e.fields.title,
            imgUrl:e.fields.new_pic_vt,
            imgUrl_hz:e.fields.new_pic_hz,
            dataUrl:"http://m.v.qq.com/x/m/play?cid="+e.id
        }))

        return json

    }).catch(err=>console.log(err))

}

export function getAllTxTvByUrl(urls){
    return fetch(url+'/all?url='+urls).then(res=>res.json()).then(res=>{

        let arr =  res
       
        let arrSet = []
 
        for(let e in arr.data.vidSet){

            e = arr.data.vidSet[e]

            if(urls.indexOf(e)!=-1){
                break;
            }
            arrSet.push(e)
        }
 
        arr.data.vidSet = arrSet
 
        return arr

    }).catch(error=>alert(error))
}

