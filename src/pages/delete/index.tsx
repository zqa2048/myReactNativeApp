import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { Modal } from "@ant-design/react-native";

export default function Todo() {
	const dispatch = useDispatch();
	const list = useSelector((state) => state.list);

	const DeleteList = () => {
		dispatch({
			type: "list/saveOther",
			payload: {
				type: "dellist",
				value: [],
			},
		});
	};

	const onDelClick = () => {
		Modal.alert("提示", "请确认清除Todo!", [
			{
				text: "Cancel",
				onPress: () => {},
				style: "cancel",
			},
			{ text: "OK", onPress: () => DeleteList() },
		]);
	};

	return (
		<View style={styles.container}>
			<View
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
					marginTop: 10,
					marginLeft: 10,
					marginRight: 10,
				}}>
				<Text>
					<AntDesign name="staro" size={24} color="black" />
				</Text>
				<Text>已删除</Text>

				<TouchableOpacity
					activeOpacity={0.5}
					onPress={() => {
						onDelClick();
					}}>
					<Text>
						<MaterialIcons name="clear" size={24} color="red" />
					</Text>
				</TouchableOpacity>
			</View>
			<FlatList
				data={list.dellist}
				initialNumToRender={12}
				showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
				keyExtractor={(item, index) => item + index}
				renderItem={({ item, index }) => {
					return (
						<TouchableOpacity
							onPress={() => {}}
							style={[
								{
									width: "90%",
									minHeight: 50,
									maxHeight: 100,
									marginTop: 8,
									marginLeft: 10,
									marginRight: 10,
									paddingLeft: 10,
									paddingTop: 5,
									borderWidth: 1,
								},
							]}>
							<View style={{ display: "flex", flexDirection: "row" }}>
								<Text style={styles.itemTitle}>{item}</Text>
							</View>
						</TouchableOpacity>
					);
				}}
			/>
		</View>
	);
}
