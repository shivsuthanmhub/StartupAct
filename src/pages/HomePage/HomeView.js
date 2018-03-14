// Import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Alert, ActivityIndicator, Button, Image, RefreshControl } from 'react-native';
import axios from 'axios';
import JsonData from '../../services/LoadData.json';

// Create HomeView component
class HomeView extends Component {

    // Navigation configs
    static navigationOptions = ({ navigation }) => {

        const { params } = navigation.state;

        return {
            headerTitle: `Welcome ${navigation.state.params.userName}`, // Title shown when a screen does not have a title
            headerTitleStyle: {
                color: '#FFF' // Color of the text in the header
            },
            headerStyle: {
                backgroundColor: '#431194' // Background color for bar
            },
            headerLeft: null,
            headerBackTitle: null, // Text for 'back' button. `null` sets this to an empty string
            headerTintColor: '#FFF', // Color of the text used in the back button/icons,

            headerRight: (
                <Button
                    title="Logout"
                    color='#fff'
                    onPress={() => params.handleSave && params.handleSave()} />
            )
        }

    }

    // Add constructor
    constructor(props) {
        super(props);

        this.state = {
            albums: [],
            isLoading: false,
            isRefreshing: false
        };

    }

    // Do log-out here
    doLogout = () => {

        const { navigate } = this.props.navigation

        Alert.alert(
            'Alert',
            'Are you sure want to logout?',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'Ok', onPress: () => navigate("LoginView") },
            ],
            { cancelable: false }
        )
    }

    // Component Did Mount 
    componentDidMount() {
        this.props.navigation.setParams({ handleSave: () => this.doLogout() });
    }

    // Add Separator for FlatList
    FlatListItemSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#fff",
                }}
            />
        );
    }

    // Click callback of FlatList
    GetItem(item) {
        const { navigate } = this.props.navigation
        navigate("DetailView", { item });

    }

    // Hanle your refresh here later
    handleRefresh = () => {

        this.setState({
            isRefreshing: false
        })
    }

    // Render your view
    render() {

        return (
            <View style={styles.MainContainer}>
                <FlatList
                    data={JsonData.results}

                    ItemSeparatorComponent={this.FlatListItemSeparator}

                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={this.handleRefresh}
                            tintColor="#fff"
                        />
                    }

                    renderItem={({ item }) =>
                        <View style={styles.SubContainer}>
                            <Image source={{ uri: item.image }}
                                style={{
                                    alignSelf: 'stretch',
                                    height: 80,
                                    width: 80,
                                    borderWidth: 1,
                                    borderRadius: 40,
                                    borderColor: '#00ffffff'
                                }} resizeMode="cover" >
                            </Image>
                            <View style={styles.SubTextContainer}>
                                <Text style={styles.itemOne} onPress={this.GetItem.bind(this, item)} >  {item.title} </Text>
                                <Text style={styles.itemTwo} onPress={this.GetItem.bind(this, item)} >  {item.sub_note} </Text>
                            </View>
                        </View>
                    }
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>

        );
    }
}

// Define your styles
const styles = StyleSheet.create({

    MainContainer: {
        backgroundColor: '#431194',
    },
    SubContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#431194',
        margin: 5
    },
    SubTextContainer: {
        flex: 1,
        flexDirection: 'column',
        margin: 5
    },
    itemOne: {
        fontSize: 24,
        color: 'white',
        padding: 5
    },
    itemTwo: {
        fontSize: 12,
        color: 'white',
        padding: 5
    },
    loader: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

//Make this component available to the app
export default HomeView;
