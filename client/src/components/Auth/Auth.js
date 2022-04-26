import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Avatar, Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import GoogleLogin from 'react-google-login';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './Input';
import Icon from './icon';
import { AUTH } from '../../constants/actionTypes';
import { signin, signup } from '../../actions/auth';

const initFormData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    comfirmPassword: ''
};

const Auth = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initFormData);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignUp) {
            dispatch(signup(formData, history));
        } else {
            dispatch(signin(formData, history));
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleShowPassword = () => setShowPassword((prev) => !prev);

    const switchMode = () => setIsSignUp((prev) => !prev);

    const googleSuccess = (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({
                type: AUTH,
                payload: { result, token }
            });
            history.push('/');
        } catch (error) {
            console.log(error);
        }
    };

    const googleFailure = (error) => {
        console.log(error);
        console.log('Google Sign In was unsuccessful. Try Again Later.');
    };

    return (
        <Container component='main' maxWidth='xs'>
            <Paper className={classes.paper} elevation={6}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {isSignUp && (
                            <>
                                <Input
                                    name='firstName'
                                    label='First Name'
                                    handleChange={handleChange}
                                    autoFocus
                                    half
                                />
                                <Input
                                    name='lastName'
                                    label='Last Name'
                                    handleChange={handleChange}
                                    half
                                />
                            </>
                        )}
                        <Input
                            name='email'
                            label='Email Address'
                            handleChange={handleChange}
                            type='email'
                        />
                        <Input
                            name='password'
                            label='Password'
                            handleChange={handleChange}
                            type={showPassword ? 'text' : 'password'}
                            handleShowPassword={handleShowPassword}
                        />
                        {isSignUp && (
                            <Input
                                name='comfirmPassword'
                                label='Repeat Password'
                                handleChange={handleChange}
                                type={showPassword ? 'text' : 'password'}
                            />
                        )}
                    </Grid>
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        className={classes.submit}
                    >
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <GoogleLogin
                        clientId='819674689693-cq3mj0akvnt1p1lq3clngvm6u9o248fm.apps.googleusercontent.com'
                        render={(renderProps) => (
                            <Button
                                variant='contained'
                                fullWidth
                                color='primary'
                                className={classes.googleButton}
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                startIcon={<Icon />}
                            >
                                Google Sign In
                            </Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy={'single_host_origin'}
                    />
                    <Grid container justify='flex-end'>
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignUp
                                    ? 'Already have an account? Sign In'
                                    : "Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default Auth;
