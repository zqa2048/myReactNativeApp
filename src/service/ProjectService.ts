import { MockUrl } from "../constants/url";export const homeList = async()=>{	try{		let response= await fetch(MockUrl.index)		let data = response.json()		console.log('data1:',data)		return data	} catch(e) {		return console.log('请求错误！')	}}export const getHotList = async(url:string)=>{	try{		let response = await fetch(url)		let data = response.json()		console.log('data2:',data)		return data	} catch(e) {		return console.log('请求错误！')	}}