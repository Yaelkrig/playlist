import './Login.css';
import { Button, createTheme, FilledInput, FormControl, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { useForm } from "react-hook-form";
import { Box } from '@mui/system';
import { useState } from 'react';
import { useNavigate, Link as LinkUp } from 'react-router-dom';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import LoginIcon from '@mui/icons-material/Login';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@emotion/react';
import api from '../../apis/axios_api';
import UserAceessTokenContext from '../../Contexts/UserAceessTokenContext';
import { Message, Visibility, VisibilityOff } from '@mui/icons-material';

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

export default function LogIn() {
    const [showPassword, setShowPassword] = useState(false)
    const { setUserAccessToken } = React.useContext(UserAceessTokenContext)
    React.useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const {
        register,
        handleSubmit,
        setError,
        getValues,
        reset,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loged, setLoged] = useState(true);
    let LoginDetails = {};

    const onSubmit = () => {
        setLoged(true);
        LoginDetails = {
            email: getValues("email"),
            password: getValues("password"),
        };
        localStorage.removeItem("accessToken");
        api
            .post('/users/login', LoginDetails)
            .then((res) => {
                if (res.data) {
                    console.log(res.data);
                    localStorage.setItem('accessToken', res.data);
                    setUserAccessToken(res.data);
                    navigate("/");
                }
            })
            .catch((e) => {
                console.log(e);
                if (e.response) {
                    e.response.status === 400 ? setError('password', { type: Message, message: "do not exist" }) : console.log(e.response.status);
                    console.log(e.response);
                }
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
                        <FormControl sx={{ m: 1, width: '45ch' }} variant="outlined">
                            <InputLabel htmlFor="email">Email</InputLabel>
                            <OutlinedInput
                                id="email"
                                autoFocus
                                name="email"
                                type='text'
                                value={email}
                                onInput={(e) => {
                                    setEmail(e.target.value)
                                }}
                                {...register("email", {
                                    required: true,
                                    minLength: 4,
                                })}
                                autoComplete="email"
                                onError={(e) => { console.log(e); }}
                                {...register("email", {
                                    required: true,
                                    minLength: 2,
                                })}
                                label="Email"
                            />
                        </FormControl>
                        {errors.email && (
                            <div className="error-invalid-value">
                                {" "}
                                This field is required or the email is invalid
                            </div>
                        )}
                        <FormControl sx={{ m: 1, width: '45ch' }} variant="outlined">
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <OutlinedInput
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onInput={(e) => { setPassword(e.target.value) }}
                                margin="normal"
                                fullWidth
                                {...register("password", {
                                    required: true,
                                    minLength: 4,
                                    maxLength: 10,
                                })}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPassword(preValue => !preValue)}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                        {errors.password && (
                            <div className="error-invalid-value">
                                This field is required or the password is invalid
                            </div>
                        )}
                        {/* {!loged && (
                            <div className='error-invalid-value'>
                                User information is invalid
                            </div>
                        )} */}
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
        </ThemeProvider >
    );
}
