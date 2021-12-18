import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, AppBar, Typography, Grow, Grid, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { getPosts } from './actions/posts';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import Search from './components/Search';
import Tool from './images/tool-box.png';
import useStyles from './styles';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import './index.css';

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    fontSize: 13,
    display4: {
      fontSize: 13,
    },
    display3: {
      fontSize: 13,
    },
    display2: {
      fontSize: 13,
    },
    display1: {
      fontSize: 13,
    },
    headline: {
      fontSize: 13,
    },
    title: {
      fontSize: 13,
    },
    subheading: {
      fontSize: 13,
    },
    body2: {
      fontSize: 13,
    },
    body1: {
      fontSize: 13,
    },
    caption: {
      fontSize: 13,
    },
    button: {
      fontSize: 13,
    },
  }
});


function App() {

  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);

  };
  const handleClose = () => {
    setOpen(false);

  };
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch])
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth='lg'>
        <AppBar className={classes.appBar} position='static' color='inherit'>
          <div className={classes.headingContainer}>
            <Typography className={classes.heading} variant='h3' align='center'>TaskBot</Typography>
            <img className={classes.image} src={Tool} alt="memories" height="60"></img>
          </div>
          <div className={classes.headingBtn}>
            {/* <Button variant="contained" onClick={() => { }} startIcon={<AddIcon />}>
            Login
          </Button> */}
            <Button variant="contained" onClick={handleClickOpen} startIcon={<AddIcon />}>
              Create
            </Button>
          </div>

        </AppBar>
        <Grow in>
          <Container>
            <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
              <Grid item xs={12} sm={8}>
                <Posts />
              </Grid>
              {/* <Grid item xs={12} sm={4}>
              <Search />
            </Grid> */}
            </Grid>
          </Container>

        </Grow>
        <Form open={open} closeForm={handleClose} />
      </Container>
    </ThemeProvider>
  );
}

export default App;
