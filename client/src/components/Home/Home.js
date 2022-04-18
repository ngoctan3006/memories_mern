import React, { useState } from 'react';
import { AppBar, Button, Container, Grid, Grow, Paper, TextField } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ChipInput from 'material-ui-chip-input';
import Form from '../Form/Form';
import Posts from '../Posts/Posts';
import { getPostsBySearch } from '../../actions/posts';
import useStyles from './styles';
import Pagination from '../Pagination';

const useQuery = () => new URLSearchParams(useLocation().search);

const Home = () => {
    const [currentId, setCurrentId] = useState(null);
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);
    const dispatch = useDispatch();
    const classes = useStyles();
    const query = useQuery();
    const history = useHistory();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');

    const handleKeyPress = (e) => {
        if (e.charCode === 13) {
            console.log(e);
        }
    };

    const handleAdd = (tag) => setTags([...tags, tag]);

    const handleDelete = (tag) => setTags(tags.filter((t) => t !== tag));

    const searchPost = () => {
        if (search.trim() || tags.length) {
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
            history.push(`/posts/search?searchQuery=${search}&tags=${tags.join(',')}`);
        } else {
            history.push('/');
        }
    };

    return (
        <Grow in>
            <Container maxWidth='xl'>
                <Grid
                    container
                    className={classes.gridContainer}
                    justify='space-between'
                    alignItems='stretch'
                    spacing={3}
                >
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                            <TextField
                                name='search'
                                variant='outlined'
                                label='Search Memories'
                                fullWidth
                                onKeyPress={handleKeyPress}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <ChipInput
                                style={{ margin: '10px 0' }}
                                value={tags}
                                onAdd={handleAdd}
                                onDelete={handleDelete}
                                label='Search Tags'
                                variant='outlined'
                            />
                            <Button
                                onClick={searchPost}
                                className={classes.searchButton}
                                color='primary'
                                variant='contained'
                            >
                                Search
                            </Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        {!searchQuery && !tags.length && (
                            <Paper className={classes.pagination} elevation={6}>
                                <Pagination page={page} />
                            </Paper>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
};

export default Home;
