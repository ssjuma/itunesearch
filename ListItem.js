import React, {memo} from "react";
import {styles} from "./styles";
import {Text, View, TouchableOpacity, Image} from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function ListItem({media, onPress}){

    let hideText=(text)=>{
        if(text && text.length>10) {
            return `${text.substr(0, 30)}...`;
        }else{
            return text;
        }
    };

    return <TouchableOpacity style={styles.listItem} onPress={onPress}>
        <View style={styles.listImage}>
            <Image source={{uri: media.artworkUrl100}} style={{width: 60, height: 60}} resizeMode={'cover'} />
        </View>
        <View style={styles.listContent}>
            <View style={{flex:1}}>
            <Text style={styles.songName}>{hideText(media.trackName)}</Text>
            <View style={{flexDirection: 'row'}}>
                <Text style={[styles.songDescription, {flex: 1}]}>{media.artistName}</Text>
            </View>
            </View>
            <View style={{marginLeft:'auto', marginTop: 5}}>
                <MaterialCommunityIcons style={{marginLeft: 'auto'}} name={'arrow-right'} size={26} color={'gray'} />
            </View>
        </View>
    </TouchableOpacity>
}
export default memo(ListItem);
