import "./SideBar.css"
import { Link as LinkUp } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import { Tooltip } from "@mui/material";
import { useContext, useState } from "react";
import UserAceessTokenContext from "../../Contexts/UserAceessTokenContext";

const SideBar = () => {
    const { userAccessToken, setUserAccessToken } = useContext(UserAceessTokenContext)
    const [isOpen, setIsOpen] = useState(false);
    const handleLogOut = () => {
        localStorage.removeItem("accessToken");
        setUserAccessToken("")
    }
    return (
        <div className="Side"
            onClick={() => { setIsOpen(prevValue => !prevValue) }}
            onMouseLeave={() => {
                setIsOpen(false)
            }} >
            <Tooltip title="Menu" placement="right-start">
                <MenuIcon className="icon menu"
                    onMouseOver={() => {
                        setIsOpen(true)
                    }}
                />
            </Tooltip>
            {isOpen &&
                <div className="openMenue"
                >
                    <Tooltip title="Home" placement="right-start">
                        <LinkUp to={'/'} >
                            <HomeIcon className="icon" />
                        </LinkUp>
                    </Tooltip>
                    {!userAccessToken && <Tooltip title="Login" placement="right-start">
                        <LinkUp to={'/Login'} color="inherit">
                            <LoginIcon className="icon" />
                        </LinkUp>
                    </Tooltip>}
                    {userAccessToken && <Tooltip title="Logout" placement="right-start">
                        <LinkUp to={'/Login'} color="inherit" >
                            <LogoutIcon className="icon" onClick={() => {
                                handleLogOut();
                            }} />
                        </LinkUp>
                    </Tooltip>}
                    <Tooltip title="Sign Up" placement="right-start">
                        <LinkUp to={'/SignUp'} color="inherit" >
                            <AccountCircleIcon className="icon" />
                        </LinkUp>
                    </Tooltip>
                    <Tooltip title="Help" placement="right-start">
                        <LinkUp to={'/help'} color="inherit" >
                            <HelpOutlineOutlinedIcon className="icon" />
                        </LinkUp>
                    </Tooltip>
                    <Tooltip title="Information" placement="right-start">
                        <LinkUp to={'/about'} color="inherit" >
                            <InfoOutlinedIcon className="icon" />
                        </LinkUp>
                    </Tooltip>
                </div>
            }
        </div>
    )
}

export default SideBar;