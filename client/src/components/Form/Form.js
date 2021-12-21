import React, { useState, useEffect } from "react";
import useStyles from './styles';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from '../../actions/posts';
import { SET_CURRENT_ID } from '../../constants/actionTypes';
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from 'draftjs-to-html';
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import { TextField, Button, Typography, Paper, IconButton } from "@material-ui/core";

const Form = ({ open, closeForm }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const post = useSelector((state) => state.posts.find((value) => state.app.currentId === value._id));
    const data = useSelector((state) => state.posts);

    const [postData, setPostData] = useState({
        creator: '',
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    })
    let editorState = EditorState.createEmpty();
    const [description, setDescription] = useState(editorState);

    const onEditorStateChange = (editorState) => {
        setDescription(editorState);
    }
    console.log(data);
    console.log(postData);
    console.log(post);
    useEffect(() => {
        console.log(post);
        if (post) {
            setPostData({ ...post });
            let editorState = EditorState.createWithContent(
                ContentState.createFromBlockArray(
                    convertFromHTML(post.message)));
            setDescription(editorState)

        }
    }, [post])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!post) {
            dispatch(createPost(postData));
            clear();
        } else {
            dispatch(updatePost(post._id, postData));
            clear();
        }
    };
    const handleClose = () => {
        closeForm(false);
        console.log(post);
        console.log(data);
        dispatch({ type: SET_CURRENT_ID, payload: '' })
    };
    const clear = () => {

    }


    // console.log(description);
    return (
        <Dialog fullScreen open={(post || open) ? true : false}>
            <DialogTitle>Creating a Task
                {handleClose ? (
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        style={{
                            'position': 'absolute',
                            'top': '8px',
                            'right': '33px'
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                ) : null}
            </DialogTitle>
            <DialogContent>
                <Paper className={classes.paper}>
                    <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                        <TextField
                            name="creator"
                            variant="outlined"
                            label="Creator"
                            fullWidth value={postData.creator}
                            onChange={(e) => setPostData({ ...postData, creator: e.target.value })}>
                        </TextField>
                        <TextField
                            name="title"
                            variant="outlined"
                            label="Title"
                            fullWidth value={postData.title}
                            onChange={(e) => setPostData({ ...postData, title: e.target.value })}>
                        </TextField>
                        <Editor
                            editorState={description}
                            onEditorStateChange={onEditorStateChange}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                        />
                        <textarea style={{ display: 'none' }} disabled ref={(val) => {
                            if (val) {
                                postData.message = val.value
                            }
                            else {
                                postData.message = val
                            }
                        }}
                            value={draftToHtml(convertToRaw(description.getCurrentContent()))} />
                        <TextField
                            name="tags"
                            variant="outlined"
                            label="Tags"
                            fullWidth value={postData.tags}
                            onChange={(e) => setPostData({ ...postData, tags: e.target.value })}>
                        </TextField>
                        <div className={classes.fileInput}>
                            <FileBase
                                type="file"
                                multiple={false}
                                onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
                            />
                        </div>
                        <DialogActions>
                            <Button className={classes.buttonSubmit} variant="contained" color="primary" size="small" type="submit" fullWidth>Submit</Button>
                            <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
                        </DialogActions>
                    </form>
                </Paper>
            </DialogContent>
        </Dialog>

    )
}

export default Form;


{/* <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog> */}