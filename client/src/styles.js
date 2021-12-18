import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    appBar: {
        borderRadius: 15,
        margin: '30px 0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'transparent',
        boxShadow: 'none'
    },
    headingContainer: {
        display: 'flex'
    },
    heading: {
        color: '#fff',
    },
    image: {
        marginLeft: '15px',
    },
}));