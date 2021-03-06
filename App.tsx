// @ts-ignore
import { create } from "dva-core";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import Models from "./src/models";
import Home from "./src/routes/Home";




const App = () => {
	const app = create();
	Models.forEach((Model) => {
		app.model(Model);
	});
	app.onError = function(e: any) {
		{
			console.log(e.message);
		}
	};
	app.start();
	const store = app._store;

	useEffect(() => {
	
},)

	return (
		<Provider store={store}>
			<Home />
		</Provider>
	);
};
export default App;
