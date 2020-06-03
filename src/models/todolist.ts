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

    saveAll(state, { payload }) {
      const data = {
        todolist: payload.todolist,
        dellist: payload.dellist,
        succlist: payload.succlist
      };
      return { ...data };
    },

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
      let succlist: any[] = [];
      succlist = succlist.concat(list.succlist);
      let todolist: any[] = [];
      todolist = todolist.concat(list.todolist);
      let dellist: any[] = [];
      dellist = dellist.concat(list.dellist);
console.log('payload :>> ', payload);
      console.log("lists", list);
      if (payload.type === "change") {
        RNStorage.TodoList = list.todolist;
      } else if (payload.type === "delete/TO") {
        console.log("delete/TO");

        if (list.dellist) {
          console.log("list.succlist :>> ", list.succlist);
          dellist.push(list.todolist[payload.index]);
        } else {
          dellist[0] = list.todolist[payload.index];
        }
        yield put({
          type: "saveOther",
          payload: {
            type: "dellist",
            value: dellist
          }
        });
        todolist = todolist.filter((item, index) => index != payload.index);
        console.log("todolist :>> ", todolist);
        yield put({
          type: "saveOther",
          payload: {
            type: "todolist",
            value: todolist
          }
        });
      }else if (payload.type === "delete/SU") {
        console.log("delete/SU");

        if (list.dellist) {
          console.log("list.succlist :>> ", list.succlist);
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
        console.log("succlist :>> ", succlist);
        yield put({
          type: "saveOther",
          payload: {
            type: "succlist",
            value: succlist
          }
        });
      } else if (payload.type === "succress") {
        console.log("succlist:", succlist);
        if (list.succlist) {
          console.log("list.succlist :>> ", list.succlist);
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
        console.log("todolist :>> ", todolist);
        yield put({
          type: "saveOther",
          payload: {
            type: "todolist",
            value: todolist
          }
        });

        console.log("succress");
      } else {
        console.log("other");
      }
    }
  }
};
export default todolist;
