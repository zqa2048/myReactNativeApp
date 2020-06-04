import { TabBar, Provider } from "@ant-design/react-native";
import { Ionicons, Entypo, AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { AsyncStorage, Text, View, StatusBar } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Delete from "../delete";
import Succ from "../succress";
import Todo from "../todo";
import { XStorage } from "react-native-easy-app";
import { RNStorage } from "../../constants/easyApp";

export default function Home() {
	const [ selected, setSelected ] = useState("selectedList");
	const [ selectedMap, setSelectedMap ] = useState<JSX.Element>(<Text />);
	const navigation = useNavigation();
	navigation.setOptions({ title: "", headerStyle: { height: 0 } });
	// @ts-ignore
	const list = useSelector(({ list }) => list);
	const dispatch = useDispatch();

	const onTabChange = (value: boolean) => {
		dispatch({
			type: "home/changeNear",
			payload: {
				type: "change",
				value: value,
			},
		});
	};

	const saveAll = (e: any) => {
		dispatch({
			type: "list/saveAll",
			payload: {
				todolist: e.TodoList,
				dellist: e.DelList,
				succlist: e.SuccList,
			},
		});
	};
	const fn = () => {
		// console.log('saveAll RNStorage.TodoList:',RNStorage)
		if (RNStorage.TodoList || RNStorage.DelList || RNStorage.SuccList) {
			console.log("saveAll RNStorage.TodoList:", RNStorage);
			saveAll(RNStorage);
		}
	};

	useEffect(() => {
		XStorage.initStorage(
			RNStorage,
			() => {
				// 初始化自定义数据管理器
				fn();
				console.log("RNStorage999999999999", JSON.stringify(RNStorage)); // 打印数据管理器的内容
			},
			(data) => {
				console.log("持久化数据变化", data);
			},
			"1.0",
			AsyncStorage,
		);
	}, []);

	return (
		<Provider>
			<TabBar>
				<StatusBar barStyle="light-content" />
				<TabBar.Item
					title="未完成"
					selected={selected === "selectedList"}
					onPress={() => setSelected("selectedList")}
					key={1}
					icon={<Entypo name="list" size={24} color="black" />}
					badge={list.todolist.length}
					selectedIcon={<Entypo name="list" size={24} color="#FA58AC" />}
				>
					<Todo />
				</TabBar.Item>
				<TabBar.Item
					title="已完成"
					selected={selected === "selectedSucc"}
					onPress={() => setSelected("selectedSucc")}
					key={2}
					icon={<Ionicons name="md-checkmark" size={24} color="black" />}
					selectedIcon={<Ionicons name="md-checkmark" size={24} color="#81DAF5" />}
				>
					<Succ />
				</TabBar.Item>

				<TabBar.Item
					title="已删除"
					selected={selected === "selectedDel"}
					onPress={() => setSelected("selectedDel")}
					key={3}
					icon={<AntDesign name="delete" size={24} color="black" />}
					selectedIcon={<AntDesign name="delete" size={24} color="#F7D358" />}
					>
					<Delete />
				</TabBar.Item>
			</TabBar>
		</Provider>
	);
}
