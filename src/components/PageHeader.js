import React from "react";

// Stores (has to be first)
import useUserStore from "../stores/UserStore";

// CSS import
import "../../src/styles.css";

// Components
import UserLogin from "./UserLogIn";

export default function Header(){
	const user = useUserStore((state) => state.user);

	return(
		<>

		  {user === undefined && (
			<UserLogin/>
		  )} 
		  </>
		
	);

}