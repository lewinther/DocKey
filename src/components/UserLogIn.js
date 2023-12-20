import { Fragment, useEffect, useState } from "react";

//import store
import useUserStore from "../stores/UserStore";

//import style
import "../../src/styles.css";

//import assets
import CloseButton from "../assets/IconCloseButton"; 
import logo5 from "../assets/logo5.png";


export default function UserLogin() {
    const [dockNumber, setDockNumber] = useState('');
    const [password, setPassword] = useState('');
    const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

    const doLogin = useUserStore((state) => state.doLogin);
    const user = useUserStore((state) => state.user);
    const passwordError = useUserStore((state) => state.passwordError);

    useEffect(() => {
        if (user) {
            setDockNumber("");
            setPassword("");
        } else {
            const storedDockNumber = localStorage.getItem('dockNumber');
            const storedPassword = localStorage.getItem('password');
            if (storedDockNumber && storedPassword) {
                setDockNumber(storedDockNumber);
                setPassword(storedPassword);
            }
        }
    }, [user]);

    const handleLogin = async () => {
        await doLogin(dockNumber, password);
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
