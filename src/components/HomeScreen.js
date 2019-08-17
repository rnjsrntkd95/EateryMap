import React, { Component } from 'react'
import {
    Text,
    View,
    FlatList,
    StyleSheet,
    Image,
    Alert
} from 'react-native'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import MapView from 'react-native-maps'
import { TextInput } from 'react-native-gesture-handler';
import PlaceRow from 'components/PlaceRow'


export default class HomeScreen extends Component {

    static navigationOptions = {
        title: "거슐랭",
        headerStyle: {
            backgroundColor: "#F3F3F7"
        },
        headerTintColor: '#1B94FF'
    }

    constructor(props){
        super(props);
        
        this.state = {
            search: null,
            places: [
                {name: '김밥천국', address: '인천광역시 서구 청라 ...', rating: 3},
                {name: '달봉감자', address: '123 Anywhere St', rating: 2.5},
                {name: '삼겹살 먹고싶다', address: '123 Anywhere St', rating: 4},
                {name: '아몰랑', address: '인천광역시 서구 청라 ...', rating: 5},
                {name: '권구상 일해라', address: '123 Anywhere St', rating: 1},
                {name: '긱식 극혐', address: '123 Anywhere St', rating: 3},
                {name: '내일은 개강일', address: '인천광역시 서구 청라 ...', rating: 3.5},
                {name: '짜장면', address: '123 Anywhere St', rating: 4.5},
                {name: '맛있다', address: '123 Anywhere St', rating: 3},
            ],
            userReview: [
                {id: '냐옹', rating: 5, comment: '맛있어요.'},
                {id: '김민준', rating: 2.5, comment: '맛없어요.'},
            ],
            location: null
        }   
    }

    myLocation = () => {
        navigator.geolocation.getCurrentPosition(
            position => {
                const location = JSON.stringify(position);
                console.log(position);
                this.setState({ location });
            },
            error => Alert.alert(error.message),
            { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
        );
    }


    render(){

        return(
            <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: '#FFF' }}>
                <View style={{
                    flex: 1,
                    backgroundColor: '#FFFFFF',
                    flexDirection: 'column',
                }}>
                    <View style={styles.container}>
                        <MapView
                            style = { styles.map }
                            region = { this.state.location }
                        />
                    </View>
                    <TextInput style={styles.input}
                        placeholder="Live Search"
                        onChangeText={text => {
                            this.setState({ search: text })
                    }}
                        value = {this.state.search}
                        />
                    <FlatList
                        data = {
                            this.state.places.filter(place => {
                                return !this.state.search || place.name === this.state.search || place.name.toLowerCase().indexOf(this.state.search.toLowerCase()) > 1
                            })
                        }
                        renderItem = {({ item, index }) =>
                                <PlaceRow place = { item } index = { index } navigation = { this.props.navigation }/>
                        }
                        keyExtractor = {item => item.name}
                        initialNumToRender = {20}
                        ListHeaderComponent = {<View style = {{height: 5}} />}
                    />
                </View>
            </KeyboardAwareScrollView>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 30,
        padding: 10,
        color: '#0066CC',
        backgroundColor: '#F5F5F5'
    },
    container: {
        height: 300
    },
    map: {
        ...StyleSheet.absoluteFillObject
    },
    input: {
        fontSize: 16,
        padding: 10,
        paddingHorizontal: 20,
        color: '#444',
        borderBottomWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#F5F5F5',
    }
})