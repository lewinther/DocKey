import { Fragment, useEffect, useState } from "react";

//import store
import useUserStore from "../stores/UserStore";

//import style
import "../../src/styles.css";

//import assets
import CloseButton from "../assets/IconCloseButton"; 
import logo5 from "../assets/logo5.png";


export default function UserLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

    const {user, signIn, passwordError} = useUserStore();

    useEffect(() => {
        if (user) {
            setUsername("");
            setPassword("");
        } else {
            const storedUsername = localStorage.getItem('username');
            const storedPassword = localStorage.getItem('password');
            if (storedUsername && storedPassword) {
                setUsername(storedUsername);
                setPassword(storedPassword);
            }
        }
    }, [user]);

    const handleLogin = async () => {
        await signIn(username, password);
    };

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
						value={username}
						onChange={(e) => setUsername(e.target.value.toUpperCase())}
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
