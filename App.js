import React, {useEffect, useState} from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    TextInput,
    Modal
} from 'react-native';

import {styles} from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';
import {mediaData} from './data';
import ListItem from "./ListItem";
import axios from "axios";
import LinearGradient from "react-native-linear-gradient";

let {height} = Dimensions.get('window');
let CONFIG = {
    days:[
        'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
    ], months:[
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ]
}
function App(){

    let [searchModalVisible, setSearchModalVisible] = useState(false);
    let [detailsModalVisible, setDetailsModalVisible] = useState(false);
    let [media, setMedia] = useState([]);
    let [searchData, setSearchData] = useState([]);
    let [currentMedia, setCurrentMedia] = useState(null);
    let [loading, setLoading] = useState(false);
    let [term, setTerm] = useState('');
    let [keyword, setKeyword] = useState('');

    useEffect(()=>{
        //setMedia(mediaData);
        async function getMediaAsync(){
            await getMedia();
        }

        getMediaAsync();

    }, []);


    let showSearchModal=()=>{
        setSearchModalVisible(true);
    };
    let hideSearchModal=()=>{
        setSearchModalVisible(false);
        setTerm('');
        setSearchData([]);
    };

    let showMedia=(item, save=false)=>{
        let oldMedia = [];
        setCurrentMedia(item);
        oldMedia.push({
            "kind": item.kind,
            "trackId": item.trackId,
            "artistName": item.artistName,
            "collectionName": item.collectionName,
            "trackName": item.trackName,
            "artworkUrl100": item.artworkUrl100,
            "releaseDate": item.releaseDate,
            "primaryGenreName": item.primaryGenreName,
            "country": item.country
        });

        AsyncStorage.getItem('@savedMedia').then(myMedia => {

            if (myMedia !== null) {
                let mediaJSON = JSON.parse(myMedia);
                let searched = searchLocal(media, item.trackId);
                //console.log("searched: ", searched);

                if(searched.length === 0) {
                    if (mediaJSON && mediaJSON.length > 0) {
                        mediaJSON.map(json => {
                            oldMedia.push(json);
                        });
                    }

                    oldMedia.push(item);

                    AsyncStorage.setItem('@savedMedia', JSON.stringify(oldMedia));
                    setMedia(oldMedia);
                }

            } else {
                AsyncStorage.setItem('@savedMedia', JSON.stringify(oldMedia)).then(() => {});
                setMedia(oldMedia);
            }
        });

        setDetailsModalVisible(true);
    };
    let hideMedia=()=>{
        setCurrentMedia(null);
        setDetailsModalVisible(false);
    };

    let getMedia=()=>{
        AsyncStorage.getItem('@savedMedia').then(media => {
            //console.log("Media is: ", media);
            if (media) {
                setMedia(JSON.parse(media));
            }else{
                setMedia([]);
            }
        });
    };

    let searchMedia=()=>{
        if(term) {
            setLoading(true);
            axios.get('https://itunes.apple.com/search?limit=30&term=' + term).then(resp => {
                setSearchData(resp.data.results);
                setLoading(false);
            }).catch(err => {
                console.log("Error: ", err.response);
                setLoading(false);
            });
        }
    };

    let searchLocal=(data, text, exclude)=> {
        text = _.toLower(text);
        return _.filter(data, (object) =>{
            //console.log("object: ", object);
            return _(object).omit(exclude).some((string)=> {
                return _(string).toLower().includes(text);
            });
        });
    };

    let searchList=(text)=>{
        setKeyword(text);
        if(text) {
            let searched = searchLocal(media, text);
            setMedia(searched);
        }else{
            getMedia();
        }
    };

    let clearSearch=()=>{
        setKeyword('');
        getMedia();
    };

    let getDate=()=>{
        if(currentMedia) {
            let date = new Date(currentMedia.releaseDate);
            return `${CONFIG.months[date.getMonth()]} ${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}, ${date.getFullYear()}`;
        }
    };

    return (
    <SafeAreaView style={{backgroundColor: '#fff'}}>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.wrapper}>
      <View style={styles.headingContainer}>
        <View style={{flex: 1}}>
          <Text style={[styles.headingText]}>Media</Text>
        </View>
        <View style={{marginLeft: 'auto'}}>
          <TouchableOpacity onPress={()=>showSearchModal()} style={{width: 40, height: 40, alignItems:'center', justifyContent:'center'}}>
              <MaterialCommunityIcons name={'magnify'} size={30} color={'#000'} />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={{backgroundColor: '#fff'}} contentContainerStyle={{minHeight: height, paddingBottom: 200, marginBottom: 200}}>

          <View style={styles.searchInputWrapper}>
              <TextInput placeholder={'Filter'} placeholderTextColor={'#999'} onChangeText={(text)=>searchList(text)} value={keyword} style={[styles.searchInput, {paddingLeft: 60}]} />
              <TouchableOpacity onPress={()=>keyword?clearSearch():searchMedia()} style={[styles.searchIcon, styles.searchIcon2]}>
                  <MaterialCommunityIcons name={keyword?'close':'magnify'} size={30} color={'red'} />
              </TouchableOpacity>
          </View>

          {media && media.length>0 ?
              _.compact(media).map((item, index)=>{
                return <ListItem media={item} key={index} onPress={()=>showMedia(item)} />
              })
          : <View style={styles.noMediaContainer}>
            <Text style={styles.noMediaText}>No media found</Text>
          </View>
          }

      </ScrollView>
      </View>

        <Modal
            animationType="fade"
            transparent={false}
            visible={searchModalVisible}
            onRequestClose={() => hideSearchModal()}
        >
            <View style={[styles.modalWrapper, {height: height}]}>

                <View style={styles.wrapper}>
                    <View style={styles.headingContainer}>
                        <View style={{flex: 1}}>
                            <Text style={[styles.headingText]}>Search</Text>
                        </View>
                        <View style={{marginLeft: 'auto'}}>
                            <TouchableOpacity onPress={()=>hideSearchModal()} style={{width: 40, height: 40, alignItems:'center', justifyContent:'center'}}>
                                <MaterialCommunityIcons name={'close'} size={30} color={'#000'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.searchInputWrapper}>
                        <TextInput placeholder={'Enter search term'} placeholderTextColor={'#999'} onEndEditing={()=>searchMedia()} onChangeText={(text)=>setTerm(text)} value={term} style={styles.searchInput} />
                        <TouchableOpacity onPress={()=>searchMedia()} style={[styles.searchIcon, styles.searchIcon1]}>
                            <MaterialCommunityIcons name={'magnify'} size={30} color={'red'} />
                        </TouchableOpacity>
                    </View>
                    {loading ?
                        <View style={{
                            paddingVertical: 100,
                            paddingHorizontal: 30,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <ActivityIndicator color={'red'} size={'large'}/>
                        </View> :
                        <ScrollView style={{backgroundColor: '#fff'}} contentContainerStyle={{minHeight: height, paddingBottom: 200, marginBottom: 200}}>
                            {searchData.length > 0 ?
                                searchData.map((item, index) => {
                                    return <ListItem media={item} key={index} onPress={() => showMedia(item, true)}/>
                                })
                                : <View style={styles.noMediaContainer}>
                                    <Text style={styles.noMediaText}>No media found</Text>
                                </View>
                            }

                        </ScrollView>
                    }
                </View>

            </View>
        </Modal>

        <Modal
            animationType="fade"
            transparent={false}
            visible={detailsModalVisible}
            onRequestClose={() => {setDetailsModalVisible(false)}}
        >
            <View style={[styles.modalWrapper, {height: height}]}>

                <View>
                    <View style={[styles.headingContainer, {position: 'absolute', zIndex: 99}]}>
                        <View style={{flex: 1}}>
                            {/*<Text style={[styles.headingText]}>Details</Text>*/}
                        </View>
                        <View style={[{marginLeft: 'auto', marginRight: 20, backgroundColor:'#000', borderRadius: 26}]}>
                            <TouchableOpacity onPress={()=>hideMedia()} style={{width: 40, height: 40, alignItems:'center', justifyContent:'center'}}>
                                <MaterialCommunityIcons name={'close'} size={30} color={'#fff'} />
                            </TouchableOpacity>
                        </View>
                    </View>

                        <ScrollView style={{backgroundColor: '#fff'}} contentContainerStyle={{minHeight: height, paddingBottom: 200, marginBottom: 200}}>
                            {currentMedia &&
                            <View style={styles.singleCard}>
                                <View style={styles.singleCardInside}>
                                    <View style={styles.cardImage}>
                                        <Image source={{uri: currentMedia.artworkUrl100}} style={styles.cardImageItem} resizeMode={'cover'} />
                                    </View>
                                    <LinearGradient colors={['rgba(14,21,44,0)', 'rgba(14,21,44,1)']} style={styles.cardInfo}>
                                        <View>
                                            <Text style={[styles.cardInfoText, styles.fontBold]}>{currentMedia.trackName}</Text>
                                        </View>
                                        <View>
                                            <Text style={[styles.cardInfoText2, styles.fontRegular]}>{currentMedia.artistName}</Text>
                                        </View>
                                    </LinearGradient>
                                </View>
                                <View style={styles.singleCardContent}>
                                    <View style={styles.singleCardRow}>
                                        <View style={styles.singleCardCol}>
                                            <Text style={[styles.singleCardHeading, styles.fontRegular]}>Release Date</Text>
                                            <Text style={[styles.singleCardValue, styles.fontRegular]}>{getDate()}</Text>
                                        </View>
                                        <View style={styles.singleCardCol}>
                                            <Text style={[styles.singleCardHeading, styles.fontRegular]}>Country</Text>
                                            <Text style={[styles.singleCardValue, styles.fontRegular]}>{currentMedia.country}</Text>
                                        </View>
                                    </View>

                                    <View style={styles.singleCardRow}>
                                        <View style={styles.singleCardCol}>
                                            <Text style={[styles.singleCardHeading, styles.fontRegular]}>Genre</Text>
                                            <Text style={[styles.singleCardValue, styles.fontRegular]}>{currentMedia.primaryGenreName}</Text>
                                        </View>
                                        <View style={styles.singleCardCol}>
                                            <Text style={[styles.singleCardHeading, styles.fontRegular]}>Collection</Text>
                                            <Text style={[styles.singleCardValue, styles.fontRegular]}>{currentMedia.collectionName}</Text>
                                        </View>
                                    </View>

                                </View>
                            </View>
                            }
                        </ScrollView>
                </View>

            </View>
        </Modal>
    </SafeAreaView>
  );
}

export default App;
