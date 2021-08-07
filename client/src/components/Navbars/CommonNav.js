import React, { useEffect, useState } from 'react';
import { AppBar, Typography, Button, IconButton, Toolbar, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import logo from '../../images/logo.png';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import axios from 'axios';
import {useDispatch, useSelector} from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Segoe UI',
        color: 'white',
        textDecoration: 'none'
    },
    appbar: {
        display: 'flex',
        padding: '5px',
        width: '100%',
        justifyContent: 'spaceBetween',
        alignItems: 'center',
        background: 'white'

    },
    appbarsolid: {
        backgroundColor: 'black'

    },
    icon: {
        color: 'black',
        fontSize: '1.5rem',
        marginLeft: '24px',
        marginRight: '10px',
        fontWeight: '300',
    },
    appbarTitle: {
        flexGrow: '1',
        color: '#fff',
        display: 'flex',
        fontFamily: 'Work Sans',
        textDecoration: 'none'
    },
    appbarTitle2: {
        flexGrow: '1',
        color: 'black',
        justifyContent: 'center',
        textDecoration: 'none'
    },
    appbarWrapper: {
        color: 'black',
        width: '100%',
        margin: '0 auto',
        height: '10px'
    },
    colorText: {
        color: 'black'
    },
    navbartext: {
        color: 'black',
        fontFamily: 'Segoe UI',
        textTransform: 'none',
        fontSize: '15px',
        textDecoration: 'none'
    },
    goDown: {
        color: '#fff',
        fontSize: '1rem',
    },

    appbarLeft: {
        display: 'flex',
        color: 'black',
        fontColor: 'black',
        fontFamily: 'Work Sans',
        textDecoration: 'none',
        marginLeft: '10px',
        marginRight: '10px'
    },

    appbarMiddle: {
        display: 'flex',
        flexGrow: '1',
        color: '#fff',
        justifyContent: 'center',
        textDecoration: 'none'
    },
    appbarRight: {
        display: 'flex',
        flexGrow: '1',
        justifyContent: 'right',
    },

    appbarlink: {
        color: 'black',
        position: 'relative',
        textTransform: 'uppercase',
        fontWeight: '600',
        fontSize: '15px',
        paddingLeft: '10px',
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'none'
        }
    },
    appbarlink2: {
        color: 'black',
        position: 'relative',
        textTransform: 'uppercase',
        fontWeight: '600',
        fontSize: '15px',
        paddingLeft: '10px',
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'none'
        }
    },

    count: {
        background: 'cornflowerblue',
        padding: '5px',
        margin: '3px',
        borderRadius: '8px',
        position: 'absolute',
        top: '0%',
        right: '5.5%'
    }

}))

const CommonNav = (props) => {
    const classes = useStyles();
    const cartcount = useSelector(state => state.cartCount)
  const dispatch = useDispatch();
    const [countDetails, countOfItems] = useState([]);
    useEffect(() => {
    var id = localStorage.getItem("userId");
    if(id!='0'){
        const url = "http://localhost:3001/check/count/" + id;
        axios.get(url).then((response) => {
        countOfItems(response.data);
    });
    }else{
        var cart = [];
        cart = JSON.parse(localStorage.getItem("cart"));
        var count = 0;
        var countArray = [];
        for (let i = 0; i < cart.length; i++) {
        count++;
      }
      countArray.push({count:count});
      countOfItems(countArray);
    }
      
  }, []);

    return (
        <div className={classes.root}>
            <AppBar className={classes.appbar} elevation={0}>
                <Toolbar className={classes.appbarWrapper}>
                    <div className={classes.appbarLeft}>
                        <Link href="/" className={classes.appbarlink}> <Typography className={classes.appbarlink2}>Home</Typography></Link>
                        <Link href="/shop" className={classes.appbarlink}>
                            <Typography
                                className={classes.appbarlink2}
                                endIcon={<KeyboardArrowDownIcon>
                                    fontSize="0.5rem"
                                </KeyboardArrowDownIcon>}
                            >
                                Shop
                            </Typography>
                        </Link>
                        <Link href="/contactus" className={classes.appbarlink}><Typography className={classes.appbarlink2}>Contact</Typography></Link>
                        <Link href="/aboutUs" className={classes.appbarlink}><Typography className={classes.appbarlink2}>About Us</Typography></Link>
                    </div>


                    <div className={classes.appbarMiddle}>
                        <Link href="/"><img src={require('../../images/logo.png').default} alt="CeylonFolk" height="30px" /></Link>
                    </div>

                    <div style={{ paddingLeft: '106px' }}>
                        <Link href="/shop"><SearchOutlinedIcon className={classes.icon} /></Link>
                        <Link href="/wishlist"><FavoriteBorderOutlinedIcon className={classes.icon} /></Link>
                        
                        <Link href="/cart"><LocalMallOutlinedIcon className={classes.icon} /><span className={classes.count}>
                       {cartcount}</span>
                    </Link>
                        <Link href="/auth"><PermIdentityOutlinedIcon className={classes.icon} /></Link>
                    </div>

                </Toolbar>

            </AppBar>

        </div>
    );
};

export default CommonNav;