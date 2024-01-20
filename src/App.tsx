import { ToastContainer } from "react-toastify";

import "assets/styles/custom.scss";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import Router from "./Router";

const App = () => {
	return (
		<>
			<Router />
			<ToastContainer />
		</>
	);
};

export default App;
