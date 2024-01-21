import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { getAccessTokenDecoded, logout } from "utils/auth";

import "./styles.scss";

const Navbar = () => {
	const [currentUser, setCurrentUser] = useState("");
	const location = useLocation();

	const handleLogout = () => {
		logout();
	};

	useEffect(() => {
		const currentUserData = getAccessTokenDecoded();
		setCurrentUser(currentUserData.user_name);
	}, [location]);

	return (
		<nav className="bg-primary main-nav">
			<Link to="/" className="nav-logo-text">
				<h4>MovieFlix</h4>
			</Link>

			<div className="user-info-dnone text-right">
				{currentUser && (
					<button
						type="button"
						className="btn-out btn-outline-secondary btn"
						onClick={handleLogout}
					>
						Sair
					</button>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
