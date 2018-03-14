// Import liraries
import React, { Component } from 'react';
import { View, Text, TextInput, Image, Alert, StyleSheet, KeyboardAvoidingView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { StackNavigator } from 'react-navigation';

// Create LoginView component
class LoginView extends Component {

    // Navigation configs
    static navigationOptions = {
        headerTitle: 'Login', // Title shown when a screen does not have a title
        headerTitleStyle: {
            color: '#FFF' // Color of the text in the header
        },
        headerStyle: {
            backgroundColor: '#431194' // Background color for bar
        },
        headerBackTitle: null, // Text for 'back' button. `null` sets this to an empty string
        headerTintColor: '#FFF', // Color of the text used in the back button/icons,
        headerLeft: null
    };

    // Add constructor
    constructor(props) {
        super(props)

        this.state = {
            userName: '',
            passCode: '',
            isLoading: false
        };

    }

    // Check Login 
    doLoginCheck = () => {

        const { isLoading } = this.state;
        const { userName } = this.state;
        const { passCode } = this.state;
        const { navigate } = this.props.navigation
        const { params } = this.props.navigation.state;

        this.setState({ isLoading: true })

        if (userName == "" && passCode == "") {
            setTimeout(() => {
                this.setState({ isLoading: false })

                navigate("HomeView", { userName: userName })

            }, 1000);
        } else {

            setTimeout(() => {

                this.setState({ isLoading: false })
                Alert.alert('Failed');

            }, 1000);
        }

    }

    // Render your view
    render() {

        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>

                <View style={styles.loginContainer}>
                    <Image resizeMode="contain" style={styles.logo} source={require('../../images/Cart.png')} />
                </View>

                {
                    this.state.isLoading ?
                        <View style={styles.loader}>
                            <ActivityIndicator color="#fff" size="large" style={{ padding: 20 }} /> </View> : null
                }
                <View style={styles.formContainer}>

                    <TextInput style={styles.input}
                        autoCapitalize="none"
                        onSubmitEditing={() => this.passwordInput.focus()}
                        autoCorrect={false}
                        keyboardType='email-address'
                        returnKeyType="next"
                        onChangeText={userName => this.setState({ userName })}
                        placeholder='Email or Mobile Num'
                        placeholderTextColor='rgba(225,225,225,0.7)' />

                    <TextInput style={styles.input}
                        returnKeyType="go" ref={(input) => this.passwordInput = input}
                        placeholder='Password'
                        onChangeText={passCode => this.setState({ passCode })}
                        placeholderTextColor='rgba(225,225,225,0.7)'
                        secureTextEntry />

                    <TouchableOpacity style={styles.buttonContainer} onPress={this.doLoginCheck}>
                        <Text style={styles.buttonText}>LOGIN</Text>
                    </TouchableOpacity>
                </View>

            </KeyboardAvoidingView>
        );
    }
}

// Define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#431194',
    },
    loginContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    formContainer: {
        flexGrow: 1
    },
    logo: {
        position: 'absolute',
        width: 128,
        height: 128
    },
    title: {
        color: "#FFF",
        marginTop: 120,
        width: 180,
        textAlign: 'center',
        opacity: 0.9
    },
    buttonContainer: {
        backgroundColor: '#ECECEC',
        paddingVertical: 15
    },
    buttonText: {
        color: 'black',
        textAlign: 'center',
        fontWeight: '700'
    },
    loginButton: {
        backgroundColor: '#2980b6',
        color: '#fff'
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(225,225,225,0.2)',
        marginBottom: 10,
        padding: 10,
        color: '#fff'
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
export default LoginView;
