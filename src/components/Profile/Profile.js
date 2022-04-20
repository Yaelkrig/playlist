import "./Profile.css";
import { useContext } from "react";
import UserAceessTokenContext from "../../Contexts/UserAceessTokenContext";
import jwt_decode from "jwt-decode";

const Profile = () => {
    const { userAccessToken } = useContext(UserAceessTokenContext);
    const userDet = userAccessToken ? jwt_decode(userAccessToken) : null;

    console.log(userDet);
    return (
        <div className="profile_container">
            {userAccessToken ?
                <>
                    <h3>profile</h3>
                    <span>name- {userDet.username}</span>
                    <br />
                    <span>Email- {userDet.email}</span>
                    {/* to add- numbers of playlists????? */}
                </>
                : <div>
                    no connected user</div>}
        </div>
    )
}
export default Profile;