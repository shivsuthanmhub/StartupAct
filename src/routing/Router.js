// Import liraries
import { StackNavigator } from 'react-navigation';

// Import your views here
import LoginView from '../pages/LoginPage/LoginView';
import HomeView from '../pages/HomePage/HomeView'
import DetailView from '../pages/DetailPage/DetailView'

// Adding into StackNavigator
export const NavigationRouter = StackNavigator({
    LoginView: { screen: LoginView },
    HomeView: { screen: HomeView },
    DetailView: { screen: DetailView }
})

// export your StackNavigator
export default NavigationRouter;
