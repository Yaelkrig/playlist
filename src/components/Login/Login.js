import './Login.css'
import { Button, createTheme, TextField } from '@mui/material';
import { useForm } from "react-hook-form";
import { Box } from '@mui/system';
import { useState } from 'react';
import { useNavigate, Link as LinkUp } from 'react-router-dom';
import Header from '../Header/Header';
import About from '../About/About';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import LoginIcon from '@mui/icons-material/Login';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@emotion/react';
import SideBar from '../SideBar/SideBar';
import api from '../../apis/axios_api';

const theme = createTheme({
    palette: {
        primary: {
            main: '#d35c89',
        },
        secondary: {
            main: '#616161',
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

export default function LogIn() {
    const {
        register,
        handleSubmit,
        getValues,
        reset,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loged, setLoged] = useState(true);
    let LoginDetails = {};

    const onSubmit = () => {
        setLoged(true);
        LoginDetails = {
            username: getValues("username"),
            password: getValues("password"),
        };
        localStorage.removeItem("accessToken");
        api
            .post('/users/login', LoginDetails)
            .then((res) => {
                if (res.data) {
                    localStorage.setItem('accessToken', res.data);
                    navigate("/");
                }
            })
            .catch((e) => {
                console.log(e);
            });
        reset({
            password: "",
            LoginDetails: {},
        });
        setPassword("");
        setLoged(false);
    }
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box className="login_box"
                    sx={{
                        marginTop: -8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LoginIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form"
                        onSubmit={handleSubmit(onSubmit)}
                        sx={{ mt: 1 }}>
                        <TextField
                            value={username}
                            onInput={(e) => {
                                setUsername(e.target.value)
                            }}
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="User Name"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            onError={(e) => { console.log(e); }}
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
                        <TextField
                            value={password}
                            onInput={(e) => {
                                setPassword(e.target.value)
                            }}
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
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
                        {!loged && (
                            <div className='error-invalid-value'>
                                User information is invalid
                            </div>
                        )}
                        {/* <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                            onChange={(e) => console.log(e.target.checked)}
                        /> */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <LinkUp to={'/SignUp'} id='link'>
                                    {"Don't have an account? Sign Up"}
                                </LinkUp>

                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}
