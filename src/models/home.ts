import { Reducer } from "react";import { AsyncStorage } from "react-native";import { Effect } from "./modelsType";export interface IHomeModelsState {	nearSwitch:boolean}export interface IHomeModelsType {	namespace:'home';	state:IHomeModelsState;	effects:{		changeNear:Effect	};	reducers:{		save:Reducer<IHomeModelsState,any>		get:Reducer<IHomeModelsState,any>	}}const home:IHomeModelsType = {	namespace:'home',	state:{		nearSwitch:false	},	reducers: {		save(state, { payload } ) {			return { nearSwitch: payload.value }		},	},	effects:{		/**		 * 说明： 设置附近美食是否显示		 * @author zhou		 */		*changeNear({ payload },{ call, put }){			const value = payload.value.toString()			if(payload.type === 'change'){				AsyncStorage.setItem('nearSwitch', value)			}			yield put({				type:'save',				payload:{					value:payload.value				}			})		}	}}export default home