import './Login.css'
import { Button, createTheme, TextField } from '@mui/material'
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
    const navigate = useNavigate()
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    let LoginDetails = {};

    const handleSubmit = (event) => {

        const callServer = (loginDetails) => {
            localStorage.removeItem("accessToken");
            fetch('http://localhost:3001/users/login', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(loginDetails),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    if (data.message === 'dont exist' || data.message === 'invalid credential') {
                        setPassword("");
                    } else {
                        localStorage.setItem('accessToken', data)
                        navigate("/")
                    }
                })
        }
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        LoginDetails = { username: data.get('username'), password: data.get('password') }
        console.log({
            LoginDetails
        });
        callServer(LoginDetails);
        LoginDetails = {};
    };

    return (
        <ThemeProvider theme={theme}>
            <Header />
            <SideBar />
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
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
                        />
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
                        />
                        {/* <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
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
            <About />
        </ThemeProvider>
    );
}
