// Import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, TextInput, Button } from 'react-native';

// Create DetailView component
class DetailView extends Component {

    // Navigation configs
    static navigationOptions = ({ navigation }) => {

        const { params } = navigation.state;

        return {
            
            headerTitle: 'Detail View', // Title shown when a screen does not have a title
            headerTitleStyle: {
            color: '#FFF' // Color of the text in the header
            },
            headerStyle: {
                backgroundColor: '#431194' // Background color for bar
            },
            headerBackTitle: null, // Text for 'back' button. `null` sets this to an empty string
            headerTintColor: '#FFF', // Color of the text used in the back button/icons,

            headerRight: (
                
                <Button
                    title="Buy"
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
            imageURI: ''
        };
    }

    // Do Buy
    doBuy = () => {

        alert('Handle later to redirect merchant website!')

    }

    // Component Will Mount 
    componentWillMount() {

        const { isLoading } = this.state;
        this.setState({ isLoading: true });

    }

    // Component Did Mount 
    componentDidMount() {

        setTimeout(() => {

            const { isLoading } = this.state;
            this.setState({ isLoading: false });
            this.props.navigation.setParams({ handleSave: () => this.doBuy() });

        }, 1000);

    }

    // Render your view
    render() {

        const { params } = this.props.navigation.state;

        return (

            <View style={styles.container}>

                {
                    this.state.isLoading ?
                        <View style={styles.loader}>
                            <ActivityIndicator color="#fff" size="large" style={{ padding: 20 }} /> </View> : null
                }

                <Image source={{ uri: params.item.image }}
                    style={{
                        flex: 1,
                        alignSelf: 'stretch',
                        width: undefined,
                        height: undefined
                    }} resizeMode="cover" >
                </Image>

                <TextInput
                    multiline={true}
                    value={params.item.note}
                    numberOfLines={10}
                    style={{ color: "#fff", paddingTop: 30, margin: 5 }}
                />

            </View>
        );
    }
}

// Define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#431194',
        margin: 5,
        alignItems: 'center'
    },
    title: {
        fontSize: 38,
        backgroundColor: 'transparent'
    },
    button: {
        marginRight: 10
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
export default DetailView;
