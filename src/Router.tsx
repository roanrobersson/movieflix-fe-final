import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "pages/Auth";
import Login from "pages/Auth/components/Login";
import Catalog from "pages/Catalog";
import MovieDetails from "pages/Catalog/components/MovieDetails";

import Navbar from "components/Navbar";
import { CustomBrowserRouter } from "components/Routes/CustomBrowserRouter";
import PrivateRoute from "components/Routes/PrivateRoute";

const Router = () => (
	<CustomBrowserRouter>
		<Navbar />
		<Routes>
			<Route path={"/"} element={<Navigate to="/auth/login" />} />
			<Route path="/auth" element={<Auth />}>
				<Route path="/auth/login" element={<Login />} />
			</Route>
			<Route
				path="/movies"
				element={
					<PrivateRoute>
						<Catalog />
					</PrivateRoute>
				}
			/>
			<Route
				path="/movies/:movieId"
				element={
					<PrivateRoute>
						<MovieDetails />
					</PrivateRoute>
				}
			/>
		</Routes>
	</CustomBrowserRouter>
);

export default Router;
