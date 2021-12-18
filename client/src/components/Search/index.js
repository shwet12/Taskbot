import React, { useState, useEffect } from "react";
import useStyles from './styles';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from '../../actions/posts';
import { SET_CURRENT_ID } from '../../constants/actionTypes';
import { TextField, Button, Typography, Paper } from "@material-ui/core";

const Search = ({ open, closeForm }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const handleSubmit = async (e) => {
        e.preventDefault();
    };

    return (
        <Paper className={classes.paper}>
            <Typography className={classes.heading} variant='h6'>Search Items</Typography>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <TextField
                    name="creator"
                    variant="outlined"
                    label="Search"
                    fullWidth
                    onChange={(e) => { }}>
                </TextField>

                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="small" type="submit" >Submit</Button>
            </form>
        </Paper>

    )
}

export default Search;