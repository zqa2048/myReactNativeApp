import { TabBar } from "@ant-design/react-native";import { AntDesign, FontAwesome5 } from "@expo/vector-icons";import { useNavigation } from "@react-navigation/native";import React, { useState, useEffect } from "react";import { AsyncStorage, Text, View } from "react-native";import { useDispatch, useSelector } from "react-redux";import User from "../user/";import List from "../list/List";import MyMap from "../myMap/MyMap";import Wiki from "../wiki/View";export default function Home() {	const [selected,setSelected] = useState('selectedHome')	const [selectedMap,setSelectedMap] = useState<JSX.Element>(<Text/>)	const navigation = useNavigation()	navigation.setOptions({title:'',headerStyle:{height:0}})	// @ts-ignore	const home = useSelector(({home}) => home)	const dispatch = useDispatch()			const onTabChange = (value:boolean) => {		dispatch({			type: 'home/changeNear',			payload:{				type: 'change',				value:value			}		})	}	const fn = () => {		AsyncStorage.getItem('nearSwitch',(err,value)=>{			if(value === 'true'){				return onTabChange(true)			}else{				return onTabChange(false)			}		})	}	useEffect(()=>{		fn()	},[])		useEffect(()=>{		if(home.nearSwitch){			setSelectedMap(<TabBar.Item				title='附近美食'				selected={selected === "selectedMap"}				onPress={() => {					setSelected("selectedMap");					console.log('2222222222')				}}				key={2}				icon={<AntDesign name='customerservice' size={24} color="#F6CED8" />}			>				<MyMap/>			</TabBar.Item>)		}else{			setSelectedMap(<Text/>)		}	},[home.nearSwitch,selected])			return (		// <Provider>			<TabBar>				<TabBar.Item					title='美食大全'					selected={selected === 'selectedHome'}					onPress={()=>setSelected('selectedHome')}					key={1}					icon={<AntDesign name="home" size={24} color="#E1F5A9" />}				>					<Wiki />				</TabBar.Item>				<TabBar.Item					title='热门列表'					selected={selected === 'selectedFind'}					onPress={()=>setSelected('selectedFind')}					key={2}					icon={<FontAwesome5 name="fire-alt" size={24} color="#FE2E2A" />}				>					<List/>				</TabBar.Item>								{ selectedMap }								<TabBar.Item					title='个人中心'					selected={selected === 'selectedUser'}					onPress={()=>setSelected('selectedUser')}					key={3}					icon={<AntDesign name="user" size={24} color='skyblue' />}					badge={1}				>				<User/>				</TabBar.Item>			</TabBar>		// </Provider>	)}