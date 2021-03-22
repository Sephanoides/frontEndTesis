import React from 'react'
import { useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';


export const ListItems = () => {

    const { usuarios, items, aspectos } = useSelector(state => state.algoritmos)
    const classes = useStyles();

    return (
        <List component="nav" className={classes.root} aria-label="mailbox folders">
            <ListItem button>
                <ListItemText primary={`Usuarios: ${usuarios}`} />
            </ListItem>
            <Divider className={classes.divider}/>
            <ListItem button divider>
                <ListItemText primary={`ítems: ${items}`} />
            </ListItem>
            <Divider className={classes.divider}/>
            <ListItem button>
                <ListItemText primary={`Aspectos: ${aspectos}`} />
            </ListItem>
        </List>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 250,
        backgroundColor: '#EAEAEA',
        marginTop: '40px',
        color: 'black',
        borderRadius: '4px' 
        
    },
    divider:{
        backgroundColor: '#D2D2D5'
    }
}));

