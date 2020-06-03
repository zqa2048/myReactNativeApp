import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles";


const List = () => {
	const [data,setData] = useState<any[]>([])
	const [loading,setLoading] = useState<boolean>(false)
	const route = useRoute()
	const navigation = useNavigation()
	navigation.setOptions({
			title: '列表',
			headerStyle: {
				backgroundColor: '#f4511e',
			},
			headerTintColor: '#fff',
			headerTitleStyle: {
				fontWeight: 'bold',
			}
	})
	
	const dispatch = useDispatch()
	// @ts-ignore
	const list = useSelector(({list})=>list)
	
	// 改變loading状态
	// const changeLoading = (type:boolean)=>{
	// 	dispatch({
	// 		type:'list/changeLoading',
	// 		payload:{
	// 			value:type
	// 		}
	// 	})
	// }
	
	
	// const getList=(id?:string)=>{
	// 	dispatch({
	// 		type:'list/getList',
	// 		payload:{
	// 			id:id
	// 		}
	// 	})
	// }
	
	// const endList =()=>{
	// 	dispatch({
	// 		type:'list/endList'
	// 	})
	// }
	
	// const getListData=()=>{
	// 	changeLoading(true)
	// 	if(route.params){
	// 		// @ts-ignore
	// 		let id = route?.params?.data?.id
	// 		getList(id)
	// 	}else{
	// 		getList()
	// 	}
	// 	changeLoading(false)
	// }
	
	// const GoTo = (params:{}) => {
	// 	navigation.navigate('Detail',{data:params})
		
	// }
	
	// useEffect(()=>{
	// 	getListData()
	// 	return endList()
	// },[])
	
	
	return (
		<View style={styles.View}>
			<FlatList
				onRefresh={()=>{}}
				refreshing={loading}
				data={list.list}
				renderItem={({item})=>{
					return (
						<TouchableOpacity
							onPress={()=>{}}
						>
							<View style={styles.item}>
								<Image source={{uri:item.imgUrl}} style={styles.itemImage}/>
								<View style={styles.itemInfo}>
									<Text style={styles.itemTitle}>
										{item.title}
									</Text>
									<Text style={styles.itemDesc}>
										{item.desc}
									</Text>
								</View>
							</View>
						</TouchableOpacity>
					)
				}}
				keyExtractor={(item,index)=>item.id+index}
			>
			</FlatList>
		</View>
	)
}
export default List
