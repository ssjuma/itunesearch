import {StyleSheet, Dimensions} from "react-native";
let {width} = Dimensions.get('window');
export const styles = StyleSheet.create({
    headingContainer:{
        paddingVertical: 16,
        flexDirection: 'row'
    },
    headingText:{
        fontSize: 40,
        color: '#000',
        fontWeight: 'bold'
    },
    wrapper:{
        paddingHorizontal: 30
    },
    listItem:{
        flexDirection: 'row',
        paddingBottom: 6,
        marginBottom: 6,
    },
    listImage:{
        width: 60,
        height: 60,
        backgroundColor:'#ddd',
        borderRadius: 8,
        overflow: 'hidden'
    },
    listContent:{
        borderBottomWidth: 1,
        borderBottomColor:'#eee',
        marginLeft: 16,
        flex: 1,
        flexDirection: 'row'
    },
    songName:{
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',
        paddingTop: 5,
        paddingBottom: 4
    },
    songDescription:{
        fontSize: 14,
        color: '#888',
        overflow: 'hidden'
    },
    noMediaContainer:{
        paddingVertical: 10
    },
    noMediaText:{
        color: '#000',
        fontSize: 16,
    },

    modalWrapper: {
        backgroundColor: '#fff'
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
    },
    searchInputWrapper:{
        position: 'relative',
        backgroundColor: '#eee',
        borderRadius: 24,
        marginBottom: 20
    },
    searchInput:{
        fontSize: 16,
        paddingLeft: 20,
        color: '#000'
    },
    searchIcon:{
        position: 'absolute',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchIcon1:{
        right: 16,
    },
    searchIcon2:{
        left: 16,
    },

    singleCardInside:{
        backgroundColor:'#0E152C',
        width: '100%',
        height: '70%',
        borderRadius: 0,
        overflow: 'hidden'
    },
    singleCardContent:{

    },
    singleCardRow:{
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,.1)',
        paddingVertical: 20,
        paddingHorizontal: 30,
        flexDirection:'row'
    },
    singleCardCol:{
        flex: 1
    },
    singleCardHeading:{
        color: '#999',
        fontSize: 16,
    },
    singleCardValue:{
        color: '#444',
        fontSize: 16,
    },

    cardInside:{
        backgroundColor:'#0E152C',
        position: 'absolute',
        left: 0,
        width: '100%',
        height: '98%',
        borderRadius: 20,
        overflow: 'hidden'
    },
    cardImage:{
        position: 'absolute',
        left: 0,
        width: '100%',
        height: '100%',
    },
    cardInfo:{
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',
        zIndex: 99,
        paddingVertical: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardImageItem:{
        width: '100%',
        height: '100%'
    },
    cardInfoText:{
        color:'#fff',
        fontSize: 40,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10
    },
    cardInfoText2:{
        color:'#fff',
        fontSize: 22,
    },
    promoteButtonWrapper:{
        paddingTop: 20
    },
    promoteButton:{
        backgroundColor:'#FC7A28',
        paddingVertical: 12,
        paddingHorizontal: 80,
        borderRadius: 6
    },
    promoteButtonText:{
        color: '#fff',
        fontSize: 18
    },
    singleCard:{
        flex: 1,
        width: width,
        marginHorizontal: 0,
        marginTop: 0,
        position: 'relative'
    },
    fontBold:{
        fontWeight: 'bold'
    },
    fontRegular:{
        fontWeight: 'bold'
    }
});
