import AuthImage from "assets/images/auth.svg";

import "./styles.scss";

import { Outlet } from "react-router-dom";

const Auth = () => (
	<div className="container auth-container">
		<div className="auth-info">
			<h1 className="auth-info-title"> Avalie Filmes</h1>
			<p className="auth-info-subtitle">
				Diga o que você achou do seu filme favorito
			</p>
			<AuthImage className="main-image" />
		</div>
		<div className="auth-content">
			<Outlet />
		</div>
	</div>
);

export default Auth;
