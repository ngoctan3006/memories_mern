import React, { useEffect, useState } from 'react';
import { Container, Grid, Grow, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import Form from '../Form/Form';
import Posts from '../Posts/Posts';
import { getPosts } from '../../actions/posts';
import useStyles from './styles';
import Pagination from '../Pagination';

const Home = () => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const [currentId, setCurrentId] = useState(null);

    useEffect(() => {
        dispatch(getPosts());
    }, [currentId, dispatch]);
    return (
        <Grow in>
            <Container>
                <Grid
                    container
                    className={classes.mainContainer}
                    justify='space-between'
                    alignItems='stretch'
                    spacing={3}
                >
                    <Grid item xs={12} sm={7}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        <Paper className={classes.pagination} elevation={6}>
                            <Pagination />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
};

export default Home;
