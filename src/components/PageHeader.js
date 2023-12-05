import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Parse from "parse";

// Stores (has to be first)
import useUserStore from "../stores/UserStore";
// CSS import
import "../../src/styles.css";

// Components
import UserLogin from "./UserLogIn";

export default function Header(){
	const user = useUserStore((state) => state.user);
	const doRestoreSession = useUserStore((state) => state.doRestoreSession);
	const doLogout = useUserStore((state) => state.doLogout);

	useEffect(() => {
		if(!user) {
			doRestoreSession();
		} 
	}, [])
	return(
		<>
		{user !== undefined && (
			<h3 onClick={async () => await doLogout()} className="h3-home">Log out</h3>
		  )}
		  {user === undefined && (
			<UserLogin/>
		  )} 
		  </>
		
	);

}