import { FC, useLayoutEffect, useRef, useState } from "react";
import { BrowserRouterProps, Router } from "react-router-dom";
import { BrowserHistory, createBrowserHistory } from "history";

// Can be used to manage navigation state outside of React components
// ex : Redux, Axios interceptors, ...
export const customHistory = createBrowserHistory();

export const CustomBrowserRouter: FC<BrowserRouterProps> = ({
	basename,
	children
}) => {
	const historyRef = useRef<BrowserHistory>();
	if (historyRef.current == null) {
		historyRef.current = customHistory;
	}
	const history = historyRef.current;
	const [state, setState] = useState({
		action: history.action,
		location: history.location
	});

	useLayoutEffect(() => history.listen(setState), [history]);

	return (
		<Router
			basename={basename}
			location={state.location}
			navigationType={state.action}
			navigator={history}
		>
			{children}
		</Router>
	);
};
