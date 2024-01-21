import { FC, PropsWithChildren } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { isAllowedByRole, isAuthenticated, Role } from "utils/auth";

type Props = PropsWithChildren & {
	allowedRoles?: Role[];
};

const PrivateRoute: FC<Props> = ({ allowedRoles, children }) => {
	const location = useLocation();

	if (!isAuthenticated()) {
		return <Navigate to="/auth/login" state={{ from: location }} />;
	} else if (isAuthenticated() && !isAllowedByRole(allowedRoles)) {
		return <Navigate to="/movies" />;
	}
	return children;
};

export default PrivateRoute;
