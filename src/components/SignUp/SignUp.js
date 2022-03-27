import "./SignUp.css"
import { useNavigate, Link as LinkUp } from 'react-router-dom';
import { useForm } from "react-hook-form";
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from "../Header/Header";
import About from "../About/About";
import SideBar from "../SideBar/SideBar";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from "react";
import api from "../../apis/axios_api";
import UserAceessTokenContext from "../../Contexts/UserAceessTokenContext";

const theme = createTheme({
    palette: {
        primary: {
            main: '#00cedc',
            contrastText: '#fff',
        },
        secondary: {
            main: '#00cedc',
            contrastText: '#fff',
        },
    },
});

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function SignUp() {
    const { setUserAccessToken } = React.useContext(UserAceessTokenContext)
    React.useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const {
        register,
        handleSubmit,
        getValues,
        reset,
        formState: { errors },
    } = useForm();
    const [isSignUp, setIsSignUp] = useState(true)
    let logUpDetails = {};
    const navigate = useNavigate();

    const onSubmit = () => {
        localStorage.removeItem("accessToken");
        setUserAccessToken("");
        logUpDetails = {
            username: getValues("username"),
            password: getValues("password"),
            email: getValues('email')
        }
        api
            .post("/users/register", logUpDetails)
            .then((res) => {
                localStorage.setItem('accessToken', res.data.accessToken)
                setUserAccessToken(res.data.accessToken)
                navigate('/')
            })
            .catch((e) => {
                console.log(e);
            })
        reset();
        setIsSignUp(false);
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: -8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <AccountCircleIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate
                        onSubmit={handleSubmit(onSubmit)}
                        sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    onFocus={() => setIsSignUp(true)}
                                    autoComplete="given-name"
                                    name="fullName"
                                    required
                                    fullWidth
                                    id="fullName"
                                    label="Full Name"
                                    autoFocus
                                    onError={(e) => { console.log(e); }}
                                    {...register("fullname", {
                                        required: true,
                                        minLength: 2,
                                        maxLength: 10,
                                    })}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="username"
                                    label="User Name"
                                    // value={setUsernameValue(usernameValue)}
                                    name="userName"
                                    autoComplete=" user-name"
                                    {...register("username", {
                                        required: true,
                                        minLength: 2,
                                        maxLength: 10,
                                    })}
                                />
                                {errors.username && (
                                    <div className="error-invalid-value">
                                        {" "}
                                        This field is required or the username is invalid
                                    </div>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    {...register("email", {
                                        required: true,
                                        minLength: 2,
                                        maxLength: 20,
                                    })}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    // value={setPasswordValue(passwordValue)}
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    {...register("password", {
                                        required: true,
                                        minLength: 4,
                                        maxLength: 10,
                                    })}
                                />
                                {errors.password && (
                                    <div className="error-invalid-value">
                                        This field is required or the password is invalid
                                    </div>
                                )}
                                {!isSignUp && (
                                    <div className='error-invalid-value'>
                                        Faild to sign up
                                    </div>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                {/* <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                /> */}
                            </Grid>
                        </Grid>
                        <Button
                            className="submit_button"
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <LinkUp to={'/Login'} id="LinkUp">
                                    Already have an account? Sign in
                                </LinkUp>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
        </ThemeProvider>
    );
}