// export { default} from "./src/pages/home"import { useNavigation } from "@react-navigation/native";import React, { useEffect } from "react";import { Dimensions, FlatList, Image, Text, TextInput, TouchableOpacity, View } from "react-native";import { useDispatch, useSelector } from "react-redux";import styles from "./styles";export default function index() {			const bannerImg = require('../../../resource/imgs/banner.png')	const window = Dimensions.get("window")	const WidthItem = (window.width - 20) / 3 -20	const HeightItem = (window.height * .75 - 105) / 4	const IMG = (window.width - 20) / 3 - 20	const dispatch = useDispatch()	const navigation = useNavigation()		// @ts-ignore	const wiki = useSelector(({ wiki })=>wiki)			const GoTo = (params:{}) => {		navigation.navigate('List',{data:params})		}	useEffect(()=>{		dispatch({			type:'wiki/getMyList'		})	},[])		return (		<View style={styles.container}>						<Image				source={bannerImg}				style={{width:window.width,height:window.height / 4}}			/>			<TextInput				placeholder='请输入搜索内容'				style={[styles.search, { top: window.height / 4 * .7 }]}				placeholderTextColor='#000'			>			</TextInput>						<View				style={styles.content}			>				<FlatList					data={wiki.categories}					initialNumToRender={12}					numColumns={3}					showsHorizontalScrollIndicator={false}					showsVerticalScrollIndicator={false}					keyExtractor={(item)=>item["id"]}					renderItem={({ item, index })=>{						return (							<TouchableOpacity								onPress={()=>GoTo(item)}								style={									[										{											width:WidthItem,											height:HeightItem ,											marginTop:8,											marginLeft:10,											marginRight:10,										}									]								}							>								<Image									source={{uri:item["imgUrl"]}}									style={{										width:IMG,										height:IMG - 10,										borderRadius:5									}}								/>								<Text style={styles.itemTitle}>									{item["title"]}								</Text>							</TouchableOpacity>						)					}}				>				</FlatList>			</View>		</View>	)}