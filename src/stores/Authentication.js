import { create } from "zustand";

export default create((set) => ({
	isAuthenticated:false,
	doLogin: () => {
		set((state) => ({isAuthenticated: true}));
	},
	doLogout:() => {
		set((state) => ({isAuthenticated: false}));
	}
}));