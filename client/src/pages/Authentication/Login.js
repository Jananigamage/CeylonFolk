import React from 'react'
import useStyles from './style';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { TextField, Link, Button } from '@material-ui/core';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";

function Login() {
    const classes = useStyles();

    var cart = [];
    cart = useSelector(state => state.cart);

    let history = useHistory();



    const initialLoginValues = {
        loginEmail: '',
        loginPassword: '',
    }

    const loginValidation = Yup.object().shape({
        loginEmail: Yup.string().email("Email is not valid").required("Email is required"),
        loginPassword: Yup.string().required('Password is required'),
    });


    const login = (data, props) => {
        axios.post("http://localhost:3001/auth/login", data).then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            }
            else if (response.data.user_type_id == 1) {
                localStorage.setItem("userId", response.data.id);
                localStorage.setItem("email", response.data.email);
                history.push("/admin");
            }
            else if (response.data.user_type_id == 3) {
                localStorage.setItem("userId", response.data.id);
                localStorage.setItem("email", response.data.email);
                history.push("/manager");
            }
            else if (response.data.user_type_id == 4) {
                localStorage.setItem("userId", response.data.id);
                localStorage.setItem("email", response.data.email);
                history.push("/assistant");
            }
            else {
                console.log(response.data)
                // sessionStorage.setItem("accessToken", response.data)
                var uid = localStorage.getItem("userId");

                if (uid == '0' && cart.cart.length > 0) {
                    console.log("login")
                    const url = "http://localhost:3001/check/addToCartBatchwise/"
                    var data = { uid: response.data.id, cart: cart.cart };
                    axios.post(url, data).then((response) => {
                        if (response.data.error) alert(response.data.error);

                    });
                }

                localStorage.setItem("userId", response.data.id);
                localStorage.setItem("fullname", response.data.firstName+' '+response.data.lastName)
                localStorage.setItem("userEmail", response.data.email);

                if (localStorage.getItem("fromTheCart") == "true") {
                    history.push("/cart");
                    localStorage.setItem("fromTheCart", false);
                } else if(localStorage.getItem("fromTheEmail") == "true"){
                    history.push("/deposit");
                }else if(localStorage.getItem("from") == "email"){
                    history.push("/myOrders");
                }
            }
        });
        props.resetForm();
    }
    return (
        <div>
            <Formik initialValues={initialLoginValues} onSubmit={login} validationSchema={loginValidation}>
                {(props) => (
                    <Form className={classes.form}>
                        <Field as={TextField}
                            className={classes.textField}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="loginEmail"
                            label="Email Address"
                            name="loginEmail"
                            autoComplete="off"
                            helperText={<ErrorMessage name="loginEmail" />}
                        />
                        <Field as={TextField}
                            className={classes.textField}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="loginPassword"
                            label="Password"
                            name="loginPassword"
                            type="password"
                            autoComplete="current-password"
                            helperText={<ErrorMessage name="loginPassword" />}
                        />
                        <Link href="#" className={classes.forgot}>Forgot Password</Link>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={!props.isValid}
                        >Login</Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default Login
