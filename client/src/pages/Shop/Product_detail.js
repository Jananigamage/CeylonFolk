import React from 'react';
// import { CssBaseline } from '@material-ui/core';
import CommonNav from '../../components/Navbars/CommonNav';
import Footer from '../../components/Footer/Footer';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { IconButton, Collapse, CardActions, CardContent } from '@material-ui/core';
import Collection1 from '../../images/ts1.jpg';
import butter2 from '../../images/butter2.jpg';
import NumericInput from 'react-numeric-input';
import './styles.css'
import { useParams } from 'react-router';
import { Card, Container, CardActionArea, CardMedia } from '@material-ui/core';
import useStyles from './style';
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useHistory } from 'react-router';
import * as Yup from 'yup';
import { actionAddToCart, actionGetTotal, sendProductsToDB, calculateCartCount, incrementCartCount } from '../../_actions/index';
import { useDispatch, useSelector } from "react-redux";
import { selectedProduct, fetchProduct, removeSelectedProduct } from '../../_actions/productAction';
import Notification from '../../components/Reusable/Notification';
import ceylonforkapi from '../../api/index'
import Popup from "../../components/Reusable/Popup";
import sizeTshirt from "../../images/sizeTshirt.jpg";
import sizeKids from "../../images/sizeKids.jpg";
import sizeCropTop from "../../images/sizeCropTop.jpg";
import { NavLink } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Product_detail() {

  const dispatch = useDispatch();
  const classes = useStyles();
  let { id } = useParams();
  const [productO, setProductO] = useState([]);
  const [imageArray, setImageArray] = useState([]);
  const [imagePreview, setImagePreview] = useState();
  const [mapSize, setMapSize] = useState();
  const [quantity, setQuantity] = useState();
  const oneProduct = useSelector((state) => state.selectProductReducer)
  const { coverImage, design_name, price, discountedPrice, type_id } = oneProduct;
  const [productSize, setProductSize] = useState();
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
  const [rate, setrate] = useState();
  const [email, setemail] = useState('')
  const [openSleevePopup, setopenSleevePopup] = useState(false);


  var isSizeRequired = false;


  useEffect(() => {
    if (id && id !== '') dispatch(fetchProduct(id));
    return () => {
      dispatch(removeSelectedProduct());
    }
  }, [id]);

  useEffect(() => {
    axios.get(`http://localhost:3001/ProductDetails/byId/${id}`).then((response) => {
      setProductO(response.data);
    });

    axios.get(`http://localhost:3001/ProductDetails/byIdImages/${id}`).then((response) => {
      setImageArray(response.data);
    });

    axios.get(`http://localhost:3001/ProductDetails/rate/${id}`).then((response) => {
      setrate(response.data[0].rate);
    });

    // axios.get(`http://localhost:3001/ProductDetails/byPid/${id}`).then((response) => {
    //   setProduct(response.data);
    //   // console.log(response)
    // });

    axios.get(`http://localhost:3001/ProductDetails/imagesArray/${id}`).then((response) => {
      setImagePreview(response.data);
      // console.log(response)
    });

    axios.get(`http://localhost:3001/ProductDetails/mapSize/${id}`).then((response) => {
      setMapSize(response.data);
      // console.log(response)
    });

    axios.get(`http://localhost:3001/ProductDetails/quantity/${id}`).then((response) => {
      setQuantity(response.data);
    });

  }, []);

  const changeemail = (e) => {
    setemail(e.target.value)

  }


  // console.log('hello from product store')

  //  console.log(products)


  // const [mapSize,setMapSize] = useState();

  // useEffect(() => {
  //     axios.get(`http://localhost:3001/ProductDetails/mapSize/${id}`).then((response) => {
  //       setMapSize(response.data);
  //         console.log(response)
  //     });
  // },[]);

  //   const [sizet,setSizet] = useState([]);
  //   const [colort,setColort] = useState([]);

  //   sizeOptions = mapSize.map((p) => p.sizet).filter((v, i, a) => a.indexOf(v) === i).map((sizet) => ({ label: sizet, value: sizet }));
  // colorOptions = mapSize.filter((p) => sizet && p.sizet === sizet.value).map((p) => p.colort).filter((v, i, a) => a.indexOf(v) === i).map((colort) => ({ label: colort, value: colort }));

  var [index, setIndex] = useState(0);
  //console.log(index)

  var handleTab = index => {
    // alert(index)
    setIndex(index)
    //console.log(index)
  }

  var [index1, setIndex1] = useState(0);


  var [sizeSelect, setSizeSelect] = useState(false);
  var [selectedSizeValue, setSelectedSizeValue] = useState(false);

  var handleTab1 = (index1) => {
    // alert(index1)

    setIndex1(index1)

  }

  const [toggleState, setToggleState] = useState(0);

  let history = useHistory();

  const toggleTab = (index) => {
    setToggleState(index);
  };

  // const color = 'Black';

  // console.log(color);

  // const [sizeObject,setSizeObject] = useState([]);

  // useEffect(() => {
  //   const url = 'http://localhost:3001/ProductDetails/size/'+color;
  //     axios.get(url).then((response) => {
  //         setSizeObject(response.data);
  //         console.log(response.data.size)
  //     });
  // },[]);


  const initialValues = {

    email: '',
  }

  const validationSchema = Yup.object().shape({

    email: Yup.string().email("Email is not valid").required("Email is required"),

  });


  const setSize = (event) => {
    setProductSize(event.target.value);
    setIsSizeSelected(false)
    if (event.target.value != undefined) {
      setSizeSelect(true)
    } else {
      setSizeSelect(false)
    }
  }

  const sendEmail = (data, props) => {
    var uid = localStorage.getItem("userId");
    var uname = localStorage.getItem("fullname");

    var data = {

      productId: id,
      userId: uid,
      userName: uname,
      size: productSize,
      email: email,
    }


    axios.post("http://localhost:3001/ProductDetails/stockrefill", data).then((response) => {
      console.log(data);
      if (response.data.error) {
        setNotify({
          isOpen: true,
          message: 'Message Not Sent !',
          type: 'error'
        });
      }
      else {
        setNotify({
          isOpen: true,
          message: 'Message Sent Successfully !',
          type: 'success'
        });
        setTimeout(function () {
          history.push("/shop")
        }, 1000);
      }
    });
    console.log(data);

  };


  var itemQuantity = 1
  const getQty = (event) => {
    itemQuantity = event
  }

  const [isSizeSelected, setIsSizeSelected] = useState(false)
  const [typ, settyp] = useState('')

  const addToCart = () => {
    if (productSize == undefined) {
      setIsSizeSelected(true)
      return
    } else {
      setIsSizeSelected(false)
    }
    var uid = localStorage.getItem("userId");
    if (uid != '0') {
      var dummyItem = {
        image: coverImage,
        productId: id,
        quantity: itemQuantity,
        userId: uid,
        size: productSize,
        price: discountedPrice == null ? price : discountedPrice,
        discountedPrice: discountedPrice,
        totals: discountedPrice == null ? itemQuantity * price : itemQuantity * discountedPrice
      }
      // var result = dispatch(sendProductsToDB(dummyItem))
      ceylonforkapi.post("/check/addToCart/", dummyItem).then((response) => {
        if (response.data.data == 0) {
          setNotify({
            isOpen: true,
            message: 'Adding Failed !',
            type: 'error'
          });
        }
        else {
          dispatch(incrementCartCount());
          dispatch(actionAddToCart(dummyItem));
          setNotify({
            isOpen: true,
            message: 'Added Successfully !',
            type: 'success'
          });
        }
      });
    }
    else {
      var dummyItem = {
        name: design_name,
        image: coverImage,
        productId: id,
        quantity: itemQuantity,
        userId: uid,
        size: productSize,
        discountedPrice: discountedPrice,
        actualPrice: price,
        price: discountedPrice == null ? price : discountedPrice,
        totals: discountedPrice == null ? itemQuantity * price : itemQuantity * discountedPrice,
        stockMargin: quantity[index1].quantity
      }
      // dummyItem.totals = dummyItem.price * dummyItem.quantity;
      dispatch(actionAddToCart(dummyItem));
      dispatch(actionGetTotal(dummyItem.totals));
      dispatch(incrementCartCount())
      setNotify({
        isOpen: true,
        message: 'Added Successfully !',
        type: 'success'
      });
    }
  };

  const sizeGuide = (type) => {
    settyp(type)
    setopenSleevePopup(true);

  }

  return (
    <div>
      <CssBaseline />
      <CommonNav />
      <Grid container className={classes.productContainer}>
        <CssBaseline></CssBaseline>
        {Object.keys(oneProduct).length == 0 ? (<div>Loading...</div>) : (
          <div style={{ display: 'flex' }}>
            <Grid item xs={2} sm={8} md={6} elevation={6} square style={{ display: 'flex' }} className>
              {/* <Card className={classes.card}>
          <CardMedia><img src={Collection1} style={{width:'100%'}}/></CardMedia>
          <CardMedia><img src={butter2} style={{width:'100%'}}/></CardMedia>
          </Card> */}
              <Grid Container>
                {/* <CardMedia
              className={classes.media}
              style={{ backgroundImage: `url(${designImage})` }}
              title="Snowy"
          /> */}
                <Box><img src={'http://localhost:3001/' + coverImage} style={{ width: '100%' }} /></Box>
                {/* <Box>{imagePreview && <img src={imagePreview[index].designImage} style={{ width: '100%' }} />}</Box> */}
              </Grid>
            </Grid>

            <Grid item xs={2} sm={8} md={6} elevation={6} square>
              <Formik>
                <Box className={classes.productDetails}>


                  <Box className={classes.goback}>
                    
                    <IconButton style={{borderRadius: '0px',fontSize: '18px', color:'black', padding: '0px'}} onClick={() => { history.goBack() }}>
                    <ArrowBackIcon style={{marginRight:'10px'}}/>
                      <span>Go Back</span>
                    </IconButton>
                  </Box>
                  <Box>
                    <Typography className={classes.productTitle}>{design_name}</Typography>
                    {discountedPrice === null ?
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="h2"
                        className={classes.productPrice}
                      >
                        {"LKR " + price + '.00'}
                      </Typography>
                      :
                      <div>
                        <div style={{ display: 'flex' }}>
                          <Typography
                            gutterBottom
                            variant="h6"
                            component="h2"
                            className={classes.productPrice}
                          >

                            {"LKR " + discountedPrice + '.00'}

                          </Typography>
                          <div>
                            <span className={classes.offer22}
                              style={{ padding: '0.6rem 0' }}
                            >
                              {rate}%
                            </span>

                          </div>
                        </div>
                        <Typography
                          gutterBottom
                          variant="h6"
                          component="h2"
                          className={classes.productPrice}
                        >
                          <s>{"LKR " + price + '.00'}</s>
                        </Typography>

                      </div>

                    }
                    {/* <Box><Typography className={classes.productColor}>COLOR</Typography></Box> */}
                    <Box>
                      <Box style={{ display: 'flex' }}>
                        <label style={{ cursor: 'pointer' }}>
                          <input type="radio" className={classes.spaninput} onClick={() => handleTab(index)}></input>
                          <Card className={classes.card}>
                            {imageArray.map((value, index) => {
                              return (
                                <CardMedia style={{ marginRight: '10px' }} onClick={() => handleTab(index)}>
                                  <Link to={'http://localhost:3000/productDetails/' + id}>
                                    <img src={value.designImage} key={index} style={{ width: '100%' }} />
                                  </Link>
                                </CardMedia>
                              );
                            })}
                            {/* <CardMedia><img src={butter2} style={{width:'100%'}}/></CardMedia> */}
                          </Card>
                          {/* <Box className={classes.spanback}><img src={Collection1} style={{width:'100%'}}/></Box> */}
                        </label>
                      </Box>
                    </Box>

                    <Box className={classes.tBox}>
                      <Typography className={classes.productColor}>SIZE</Typography>
                      {/* <select value={sizet} onChange={setSizet} options={sizeOptions} />
                    <select
                      value={colort}
                      onChange={setColort}
                      options={colorOptions}
                      isDisabled={!sizet}
                    /> */}
                      <Box style={{ display: 'flex' }}>
                        {productO.map((value, index) => {
                          return (
                            <ul className={classes.clrsboxSize}>
                              <li className={classes.lbl}>
                                <label style={{ cursor: 'pointer' }}>
                                  <div>
                                    <div style={{ paddingBottom: '10px' }} onClick={() => toggleTab(1)} >

                                      <input type="radio" onClick={setSize} name="size" className={classes.sizeOption} value={value.size} checked />

                                      <span className={classes.swatchVisible} onClick={() => handleTab1(index)} style={{ background: sizeSelect && productSize === value.size == true ? "#31c5ee" : "" }}>{value.size}</span>
                                    </div>
                                    {/* <div key={value.inventoryId}className={toggleState === 1 ? classes.activeQuantity : classes.quantity}><span className={classes.swatchVisible}>{value.quantity}</span></div> */}
                                  </div>
                                  {/* <input type="radio" name="size" className={classes.sizeOption} dataOptionId="2" value="UK6" checked  onClick={() => toggleTab(value.designId)}/>
                          <span className={classes.swatchVisible}>S</span> */}
                                </label>
                              </li>
                            </ul>
                          );
                        })}

                        {/* <div>{quantity && <span className={classes.swatchVisible}>{quantity[index1].quantity}</span>}</div> */}

                        <Button
                          className={classes.slevebtn}
                          onClick={() => {
                            // setopenSleevePopup(true);
                            sizeGuide(type_id)
                          }}
                        >Size Guide</Button>
                      </Box>
                      {/* <div className={toggleState === 1 ? classes.activeQuantity : classes.quantity}>{quantity && <span>{quantity[index].quantity + " in stock"}</span>}</div> */}
                      <div className={toggleState === 1 ? classes.activeQuantity : classes.quantity}>{quantity && <span>{quantity[index1].quantity + " in stock"}</span>}</div>
                      <div style={{ visibility: isSizeSelected == true ? "visible" : "hidden" }}><Typography style={{ color: "red" }}>*You should select a size*</Typography></div>
                    </Box>

                    <Popup
                      title="Size Guide"
                      openPopup={openSleevePopup}
                      setOpenPopup={setopenSleevePopup}
                    >
                      <center>
                      <Typography style={{fontSize:'16px', padding:'10px', fontWeight:'700'}}>MATERIAL : SINGLE JERSEY 190 GSM</Typography>
                        {typ === 6 ? <img src={sizeTshirt} style={{ width: '30%' }} /> : typ === 8 ? <img src={sizeCropTop} style={{ width: '30%' }} /> : typ === 9 ? <img src={sizeKids} style={{ width: '30%' }} /> : null}
                      </center>
                    </Popup>

                    


                    {quantity &&
                      <Box className={productSize == undefined && quantity[index1].quantity === 0 ? classes.activeQuantity : classes.quantity}>


                        <Box className={classes.tBox}>
                          <Typography className={classes.productColor}>QUANTITY</Typography>
                          <div>{quantity && <NumericInput mobile min={1} max={quantity[index1].quantity} value={1} size={1} onChange={getQty} />}</div>
                        </Box>

                        <Button style={{ background: '#2c2d2d', color: 'white' }} onClick={addToCart}>ADD TO CART</Button>
                      </Box>}


                    {quantity &&
                      <Box className={quantity[index1].quantity > 0 ? classes.activeQuantity : classes.quantity}>

                        <Box className={classes.tBox}>
                          <Typography className={classes.productColor}>QUANTITY</Typography>
                          <div><NumericInput mobile min={1} max={quantity[index1].quantity} value={1} size={1} onChange={getQty} /></div>
                        </Box>

                        <Button style={{ background: '#2c2d2d', color: 'white' }} onClick={addToCart}>ADD TO CART</Button>


                      </Box>}

                    {quantity &&
                      <Box className={quantity[index1].quantity === 0 && productSize != undefined ? classes.activeQuantity : classes.quantity}>

                        <Typography>Enter your email. We will be notify you after replenish</Typography>

                        <TextField
                          className={classes.textField}
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                          onChange={changeemail}
                          helperText={<ErrorMessage name="email" />}
                        />
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          color="primary"
                          className={classes.submit}
                          onClick={sendEmail}
                        >Send Email</Button>



                      </Box>}

                  </Box>
                  {/* 
                  <div className={toggleState === 1 ? classes.activeQuantity : classes.quantity}>{quantity && <span>{quantity[index1].quantity + " in stock"}</span>}</div>                */}


                </Box>
              </Formik>


            </Grid>
          </div>
        )}
      </Grid>


      <Footer />

      <Notification
        notify={notify}
        setNotify={setNotify}
      />
    </div>
  );
};
