import React, { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles";
import { AntDesign } from "@expo/vector-icons";
import { Button, Checkbox, WingBlank, Modal, Toast, TextareaItem } from "@ant-design/react-native";


export default function Todo() {
	const dispatch = useDispatch();
	const list = useSelector((state) => state.list);

	const [ visible, setVisible ] = useState<boolean>(false);
	const [ input, setInput ] = useState<string|undefined>("");

	//编辑后保存按钮
	const save = (e: string|undefined) => {
		if (e) {
			saveList(e);
			setInput("");
			Toast.info("保存成功", 2);
		} else {
			Toast.info("保存失败，输入为空！", 2);
		}
	};

	//保存到dva
	const saveList = (e: any) => {
		dispatch({
			type: "list/save",
			payload: {
				list: e,
			},
		});
	};

	// 保存数据到本地
	const changeList = () => {
		dispatch({
			type: "list/changeList",
			payload: {
				type: "change",
			},
		});
	};

	// 完成todo
	const SuccList = (index: number) => {
		dispatch({
			type: "list/changeList",
			payload: {
				type: "succress",
				value: list,
				index: index,
			},
		});
	};

	//删除todo
	const Delete = (index: number) => {
		dispatch({
			type: "list/changeList",
			payload: {
				index: index,
				type: "delete/TO",
			},
		});
	};

	// modal 提示
	const onButtonClick = (index: number) => {
		Modal.alert("提示", "请确认完成Todo!", [
			{
				text: "Cancel",
				onPress: () => {},
				style: "cancel",
			},
			{ text: "OK", onPress: () => SuccList(index) },
		]);
	};

	//点击删除按钮
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

	useEffect(
		() => {
			const fn = () => {
				if (list.todolist.length) {
					changeList();
				}
			};
			return fn();
		},
		[ list, visible ],
	);

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
				<Text>Todo</Text>

				<TouchableOpacity
					activeOpacity={0.5}
					onPress={() => {
						setVisible(true);
					}}>
					<Text>
						<AntDesign name="edit" size={24} color="black" />
					</Text>
				</TouchableOpacity>
			</View>
			<FlatList
				data={list.todolist}
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
								<Checkbox
									onChange={() => {
										onButtonClick(index);
									}}
								/>
								<WingBlank>
									<TouchableOpacity
										onPress={() => {
											onDelClick(index);
										}}
										style={{ height: 20, width: 20, borderWidth: 1, borderColor: "red", alignItems: "center" }}>
										<AntDesign name="delete" size={16} color="red" />
									</TouchableOpacity>
								</WingBlank>
							</View>
						</TouchableOpacity>
					);
				}}
			/>

			<View style={{ marginTop: 22 }}>
				<Modal
					animationType="fade"
					visible={visible}
					maskClosable
					onClose={() => {
						setVisible(false);
					}}>
					<View style={{ marginTop: 15, height: "100%" }}>
						<View>
							<Text
								style={{
									fontSize: 18,
									textAlign: "center",
								}}>
								添加事项
							</Text>
							<TextareaItem
								value={input}
								placeholder="请输入代办事项"
								clear
								rows={10}
								count={200}
								labelNumber={7}
								onChange={(e) => setInput(e)}
								style={{
									textAlignVertical: "top",
									borderTopColor: "red",
									borderBottomColor: "red",
									borderTopWidth: 0.7,
									borderBottomWidth: 0.7,
									// marginBottom: 10,
									marginTop: 10,
								}}
							/>
							<View style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", marginTop: 10 }}>
								<Button
									size="large"
									style={{ width: 100 }}
									type="ghost"
									onPress={() => {
										save(input);
										setVisible(false);
									}}>
									返回
								</Button>
								<Button size="large" style={{ width: 100 }} type="primary" onPress={() => save(input)}>
									保存
								</Button>
							</View>
						</View>
					</View>
				</Modal>
			</View>
		</View>
	);
}
