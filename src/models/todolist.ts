import { Reducer } from "react";
import { homeList } from "../service/ProjectService";
import { Effect } from "./modelsType";
import { AsyncStorage } from "react-native";
import { RNStorage } from "../constants/easyApp";

export interface IListModelsState {
  todolist: [];
  dellist: [];
  succlist: [];
}
export interface IListModelsType {
  namespace: "list";
  state: IListModelsState;
  effects: {
    // getMyList: Effect;
    changeList: Effect;
  };
  reducers: {
    save: Reducer<IListModelsState, any>;
    saveAll: Reducer<IListModelsState, any>;
    saveOther: Reducer<IListModelsState, any>;
  };
}

const todolist: IListModelsType = {
  namespace: "list",
  state: {
    todolist: [],
    dellist: [],
    succlist: []
  },
  reducers: {
    save(state, { payload }) {
      const todo = state.todolist;
      if (todo[0]) {
        todo.push(payload.list);
      } else {
        todo[0] = payload.list;
      }
      return { ...state, todolist: todo };
    },

    // 将本地持久化的数据全部保存到状态
    saveAll(state, { payload }) {
      const data = {
        todolist: payload.todolist,
        dellist: payload.dellist,
        succlist: payload.succlist
      };
      return { ...data };
    },

    // 根据传递的type，操作对应的list
    saveOther(state, { payload }) {
      const list = payload.value;
      switch (payload.type) {
        case "todolist":
          RNStorage.TodoList = list;
          console.log("list :>> ", list);
          return { ...state, todolist: list };
        case "succlist":
          RNStorage.SuccList = list;
          return { ...state, succlist: list };
        case "dellist":
          RNStorage.DelList = list;
          return { ...state, dellist: list };
        default:
          return { ...state };
      }
    }
  },
  effects: {
    /**
     * 说明：保存todolist到本地
     * @author zhou
     */

    *changeList({ payload }, { call, put, select }) {
      const list = yield select(state => state.list);

      //声明变量，保存list
      let succlist: any[] = [];
      succlist = succlist.concat(list.succlist);
      let todolist: any[] = [];
      todolist = todolist.concat(list.todolist);
      let dellist: any[] = [];
      dellist = dellist.concat(list.dellist);

      //根据传递进来的payload.type，对各个list进行修改
      if (payload.type === "change") {
        RNStorage.TodoList = list.todolist;
      } else if (payload.type === "delete/TO") {
        //有值往里面追加
        if (list.dellist) {
          dellist.push(list.todolist[payload.index]);
        } else {
          dellist[0] = list.todolist[payload.index];
        }
        //更新保存到状态和本地持久化
        yield put({
          type: "saveOther",
          payload: {
            type: "dellist",
            value: dellist
          }
        });
        //更新保存到状态和本地持久化
        todolist = todolist.filter((item, index) => index != payload.index);
        yield put({
          type: "saveOther",
          payload: {
            type: "todolist",
            value: todolist
          }
        });
      } else if (payload.type === "delete/SU") {
        if (list.dellist) {
          dellist.push(list.succlist[payload.index]);
        } else {
          dellist[0] = list.succlist[payload.index];
        }
        yield put({
          type: "saveOther",
          payload: {
            type: "dellist",
            value: dellist
          }
        });
        succlist = succlist.filter((item, index) => index != payload.index);
        yield put({
          type: "saveOther",
          payload: {
            type: "succlist",
            value: succlist
          }
        });
      } else if (payload.type === "succress") {
        if (list.succlist) {
          succlist.push(list.todolist[payload.index]);
        } else {
          succlist[0] = list.todolist[payload.index];
        }
        yield put({
          type: "saveOther",
          payload: {
            type: "succlist",
            value: succlist
          }
        });
        todolist = todolist.filter((item, index) => index != payload.index);
        yield put({
          type: "saveOther",
          payload: {
            type: "todolist",
            value: todolist
          }
        });
      } else {
        console.log("other");
      }
    }
  }
};
export default todolist;
