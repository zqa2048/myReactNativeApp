import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Home from "../pages/home/Home";
import { AppLoading } from 'expo';
import * as Font from 'expo-font'


const Stack = createStackNavigator()

export default class App extends React.Component {
	state = {
		theme: null,
		currentTheme: null,
		isReady: false,
	};
	async componentDidMount () {
		await Font.loadAsync(
			'antoutline',
			// eslint-disable-next-line
			require('@ant-design/icons-react-native/fonts/antoutline.ttf')
		);

		await Font.loadAsync(
			'antfill',
			// eslint-disable-next-line
			require('@ant-design/icons-react-native/fonts/antfill.ttf')
		);
		// eslint-disable-next-line
		this.setState({ isReady: true });
	}
	render () {
		const { isReady } = this.state;
		if (!isReady) {
			return <AppLoading />;
		}
		return (
			<NavigationContainer>
				<Stack.Navigator >
					<Stack.Screen name="Home" component={Home} />
				</Stack.Navigator>
			</NavigationContainer>
		)
	}
}