import { Fragment } from "react";

export default function UserInfo({
    userName,
    userAddress,
    userPhone,
    userEmail
}) {

    return(
        <Fragment>
            <section className="news-card-container in-column">
                <p className="in-line">Name: {userName}</p>
                <p className="in-line">Address: {userAddress}</p>
                <p className="in-line">Phone: {userPhone}</p>
                <p className="in-line">E-mail: {userEmail}</p>
            </section>
        </Fragment>
    )
}