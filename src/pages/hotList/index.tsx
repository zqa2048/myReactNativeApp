import React,{ useState,useEffect } from 'react';
import { Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView
} from "react-native";
import TodoList from "./TodoList";



export default function HotList() {
  const [data,setData] = useState<any>()
  const [inputValue,setInputValue] = useState<string>('')

  useEffect(()=>{
    fetch("http://www.abc.com/mock")
      .then((res)=>res.json())
      .then(({data})=> {
        console.log("data:", data);
        setData(data)
      })
      .catch(err => console.log(err));
  },[])

  const ChangeText=(e:string)=>{
    console.log("e value:",e)
    setInputValue(e)
  }
  const ButText=()=>{
    if(inputValue){
      setData({...data,list:[...data.list,inputValue]})
    }
    setInputValue('')
    console.log("data:",data)
  }
  const onclick =(index:number)=>{
    console.log(index)
    let listed = data.list
    listed.splice(index,1)
    setData({...data,list:[...listed]})
  }
  return (
    <View style={styles.container}>
      <View style={styles.textArea}>
        <TextInput
          style={styles.search}
          placeholder="请输入内容"
          placeholderTextColor="#666"
          onChangeText={(e)=>ChangeText(e)}
          value={inputValue}
        >
        </TextInput>
        <TouchableOpacity onPress={ButText}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>提交</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.list}>
        <TodoList
          data={data}
          onClick={(index)=>onclick(index)}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:20,
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  textArea:{
    display:"flex",
    flexDirection:"row",
    height:40,
    fontSize:16,
    paddingLeft:10,
    paddingRight:10,
    backgroundColor:"#eee",

  },
  search:{
    flex:1,
    textAlign:"left",
  },
  button:{
    marginTop:5,
    // marginRight:10,
    // marginLeft:5,
    marginBottom:5,
    paddingTop:5,
    paddingLeft:10,
    paddingRight:10,
    height:30,
    backgroundColor:'blue',
    borderRadius:3
  },
  buttonText:{
    lineHeight:20,
    textAlign:"center",
    fontSize:16,
    color:"#fff"
  },
  list:{
    // flex:1,
    backgroundColor: '#ccc',
  }
});
