import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Container } from '@material-ui/core';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';

const App = () => {
    return (
        <BrowserRouter>
            <Container maxWidth='lg'>
                <Navbar />
                <Switch>
                    <Route exact path='/' component={() => <Redirect to='/posts' />} />
                    <Route exact path='/posts' component={Home} />
                    <Route exact path='/posts/search' component={Home} />
                    <Route exact path='/posts/:id' component={PostDetails} />
                    <Route exact path='/auth' component={Auth} />
                </Switch>
            </Container>
        </BrowserRouter>
    );
};

export default App;
