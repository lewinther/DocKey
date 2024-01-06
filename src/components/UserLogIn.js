// Fragment
// Wrap elements in <Fragment> to group them together in situations where you need a single element
// useful because grouping elements with a Fragment has no effect on layout or styles, instead of adding a div element to the DOM

// everything with use is a hook

// useEffect Hook
// Effects let you run some code after rendering so that you can synchronize your component with some system outside of React

// useState Hook
// useState is a Hook that lets you add state variables to components
// state is a way to preserve values between function calls
// component-specific memory is called state
// use state when component needs to remember something between renderings
import { Fragment, useEffect, useState } from "react";

//import store
// works because we made an default export in UserStore.js (useUserStore never mentioned in UserStore.js)
import useUserStore from "../stores/UserStore";

//import style
import "../../src/styles.css";

//import assets
import CloseButton from "../assets/IconCloseButton"; 
import logo5 from "../assets/logo5.png";


export default function UserLogin() {
    // dockNumber, password, ... are state variables
    // setDockNumber and setPassword are setter functions for the state variables
    const [dockNumber, setDockNumber] = useState('');
    const [password, setPassword] = useState('');
    const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
    
    // useUserStore returns the global state and the setter functions
    const doLogin = useUserStore((state) => state.doLogin);
    const user = useUserStore((state) => state.user);
    const passwordError = useUserStore((state) => state.passwordError);

    useEffect(() => {
        if (user) {
            // if user is logged in
            // clear the state variables
            setDockNumber("");
            setPassword("");
        } else {
            // if user is not logged in
            // check if there is a stored dockNumber and password in local storage
            const storedDockNumber = localStorage.getItem('dockNumber');
            const storedPassword = localStorage.getItem('password');
            // if there is a stored dockNumber and password, 
            // set the state variables to the stored values
            if (storedDockNumber && storedPassword) {
                setDockNumber(storedDockNumber);
                setPassword(storedPassword);
            }
        }
    }, [user]); // only run this effect when user changes


    // EVENT HANDLERS
    // calls doLogin from UserStore.js with the state variables as arguments
    const handleLogin = async () => {
        await doLogin(dockNumber, password);
    };

    // if showForgotPasswordModal is true, returns a modal (= window/dialog box)
    const renderForgotPasswordModal = () => {
        if (!showForgotPasswordModal) return null;

        return (
            <div className="modal-overlay">
                <div className="modal-content">
                    <button className="modal-close-button" onClick={() => setShowForgotPasswordModal(false)}>
                        <CloseButton />
                    </button>
                    <p className="modal-title">Forgot Password?</p>
                    <p>Please contact your Harbor Office at:</p>
                    <p>Phone: XXXXXXXXXX</p>
                    <p>Email: XXXXXXXXXX</p>
                </div>
            </div>
        );
    };

    return (
        <Fragment>
            <div className="login-container">
                <h1>Welcome to Dockey</h1>
                <div className="image-container-logo">
                    <img src={logo5} alt="Logo" />
                </div>

                <div className="login-fields-container">
					<input
						className="login-input"
						type="text"
						placeholder="Dock Number"
						value={dockNumber}
						onChange={(e) => setDockNumber(e.target.value.toUpperCase())}
					/>

					<input
						className="login-input"
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					{passwordError && <p className="error-messages">{"*" + passwordError}</p>}
				</div>
                
                <div className="button-container">
					<button className="login-button" onClick={handleLogin}>
						Log in
					</button>
				</div>

                <div className="login-options">
                    <p className="forgot-password" onClick={() => setShowForgotPasswordModal(true)}>
                        Forgot Password?
                    </p>
                </div>

                <div className="account-info">
                    <strong>Don’t have an account?</strong><br />
                    This page is for boat owners only, contact your harbor administration if in doubt.
                </div>
            </div>
            {renderForgotPasswordModal()}
        </Fragment>
    );
}
