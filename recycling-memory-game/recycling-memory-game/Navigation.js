
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './components/Screens/HomeSreens';
import GameScreen from './components/Screens/GameScreens';
import ResultScreen from './components/Screens/ResultSreens';
import Leaderboard from './components/Screens/Leaderboard';

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="GameScreen" component={GameScreen} />
        <Stack.Screen name="ResultScreen" component={ResultScreen} />
        <Stack.Screen name="Leaderboard" component={Leaderboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

