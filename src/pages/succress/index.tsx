// export { default} from "./src/pages/home"
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles";
import { AntDesign } from "@expo/vector-icons";
import { WingBlank, Modal } from "@ant-design/react-native";

export default function Todo() {
	const dispatch = useDispatch();
	const list = useSelector((state) => state.list);
	const navigation = useNavigation();

	//删除todo
	const Delete = (index: number) => {
		dispatch({
			type: "list/changeList",
			payload: {
				index: index,
				type: "delete/SU",
			},
		});
	};
	//删除按钮
	const onDelClick = (index: number) => {
		Modal.alert("提示", "请确认删除Todo!", [
			{
				text: "Cancel",
				onPress: () => {},
				style: "cancel",
			},
			{ text: "OK", onPress: () => Delete(index) },
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
				<Text>已完成</Text>

				<TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
					<Text />
				</TouchableOpacity>
			</View>
			<FlatList
				data={list.succlist}
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
								<WingBlank>
									<TouchableOpacity
										onPress={() => onDelClick(index)}
										style={{ height: 20, width: 20, borderWidth: 1, borderColor: "red", alignItems: "center" }}>
										<AntDesign name="delete" size={16} color="red" />
									</TouchableOpacity>
								</WingBlank>
							</View>
						</TouchableOpacity>
					);
				}}
			/>
		</View>
	);
}
