import React from "react";
import { Grid, CircularProgress } from '@material-ui/core';
import Post from "./Post/Post";
import useStyles from './styles';
import { useSelector } from "react-redux";

const Posts = () => {
    const posts = useSelector((state) => state.posts);
    const classes = useStyles();
    return (
        !posts.length ? <CircularProgress /> : (
            <Grid className={classes.mainContainer} container alignItems="stretch" spacing={3}>
                {
                    posts.map((post) =>
                        <Grid item key={post._id} xs={12} sm={4}>
                            <Post post={post} />
                        </Grid>
                    )
                }
            </Grid>
        )
    )
}

export default Posts;