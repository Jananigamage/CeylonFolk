import React, { useState, useEffect } from 'react';
// import { Grid } from '@material-ui/core';
import { Grid, Typography, Box,Select, MenuItem, InputLabel, FormControl} from '@material-ui/core';
import { useForm, Form } from '../../components/Reusable/useForm';
import Controls from '../../components/Reusable/Controls';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import useStyles from './style2';
import { useDispatch, useSelector } from "react-redux";
import { fetchColors } from '../../_actions/colorActions';
import { viewOrderDetail, cancelOrderItem } from '../../_actions/orderHistory.action';
import Notification from '../../components/Reusable/Notification';
import ConfirmDialog from '../../components/Reusable/ConfirmDialog';

const EditOrderForm = ({ selectedOrderToEdit }) => {
    console.log(selectedOrderToEdit)
    
   
    const classes = useStyles();
    const [size, setSize] = useState()
    const [quantity, setQuantity] = useState();
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' });
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' });

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchColors());
    }, []);


    let history = useHistory();

    function onFormSubmit(e){
        e.preventDefault();
   
        const data = {
            oId: selectedOrderToEdit.oId,
            itemId: selectedOrderToEdit.itemId,
            quantity: quantity,
            size: size,
            sizeLabel: '',
            prevSizeLabel: selectedOrderToEdit.size,
            orderitemId: selectedOrderToEdit.orderitemId,
            prevQuantity: selectedOrderToEdit.quantity,
            uid: localStorage.getItem("userId"),
            uname: localStorage.getItem("fullname"),
        }

        if(size == undefined){
            data.size = selectedOrderToEdit.sizeId
         }

         if(quantity == undefined){
            data.quantity = selectedOrderToEdit.quantity
        }
        for(let i=0;i<=productO.length-1;i++){
            if(productO[i].sizeId==data.size){
                data.sizeLabel = productO[i].size
            }
        }


        axios.put("http://localhost:3001/order/updateOrder/",data).then((response) => {
            if(response.data.error){
                setNotify({
                    isOpen: true,
                    message: 'Not successfully edited !',
                    type: 'error'
                  });
            }else{
                setNotify({
                    isOpen: true,
                    message: 'Successfully edited !',
                    type: 'success'
                  });
            }
           
            dispatch(viewOrderDetail(selectedOrderToEdit.oId))
            
        });
        console.log(productO)
    };

    const [productO, setProductO] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/order/byIdForUpdate/${selectedOrderToEdit.itemId}`).then((response) => {
          setProductO(response.data);
        
        });
    }, []);

    const [margin, setMargin] = useState();
    const [quantityError, setQuantityError] = useState(false)

    const changeSize = (e) => {
        var selectedSizeArray = productO.find(item => item.sizeId == e.target.value)
        console.log(selectedSizeArray)
        setSize(e.target.value)
        console.log(e.target.value)
        setMargin(selectedSizeArray.quantity)
        console.log(selectedSizeArray.quantity)
       
    }

    const [quantityErrorMsg,setQuantityErrorMsg] = useState()
    const [isDisable, setIsDisable] = useState(false)

    const changeQuantity = (e) => {
        setQuantity(e.target.value);
        console.log(e.target.value);
        console.log(margin)
        var selectedSizeArray;
        if(margin==undefined){
            selectedSizeArray = productO.find(item => item.sizeId == selectedOrderToEdit.sizeId)
            setMargin(selectedSizeArray.quantity)
            console.log(selectedSizeArray)
        } 
        console.log(quantity)
        if(e.target.value > margin){
            console.log("error")
            var msg = "Cannot exceed available quantity: "+margin
            console.log(margin)
            setQuantityErrorMsg(msg)
            setQuantityError(true)
            setIsDisable(true)
        }else{
            setQuantityError(false)
            setQuantityErrorMsg('')
            setIsDisable(false)
        }
    };


    return (
        <div>
            <div>
                <form>
                                <Grid container>

                                    <Grid item xs={4}>

                                        <Controls.Input
                                            variant="outlined"
                                            label="Order ID"
                                            name="orderId"
                                            defaultValue={selectedOrderToEdit.oId}
                                            InputProps={{
                                                readOnly: true,
                                              }}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                    <Controls.Input
                                            variant="outlined"
                                            label="Quantity"
                                            name="quantity"
                                            defaultValue={selectedOrderToEdit.quantity}
                                            onChange={changeQuantity}
                                            error={quantityError}
                                           
                                        />
                                       
                                    </Grid>
                                    
                                    <Grid item xs={4}>
                                    <FormControl variant="outlined"  >
                                    <InputLabel id="demo-simple-select-outlined-label" >Size</InputLabel>
                                        <Select
                                                    labelId="demo-simple-select-outlined-label"
                                                    id="demo-simple-select-outlined"
                                                    defaultValue={selectedOrderToEdit.sizeId}
                                                    onChange={changeSize}
                                                    label="Size"
                                                    className={classes.formControl}
                                                >
                                                    {productO
                                                        .map((value, index) => {
                                                            return (
                                                                <MenuItem

                                                                    value={value && value.sizeId > 0 ? value.sizeId : 0}>{value && value.size != null ? value.size : null}

                                                                </MenuItem>
                                                            );
                                                        })}
                                                            </Select>
                                            </FormControl>
                                               
                                    </Grid>
                                   <Grid item md = {12}>
                                        <Typography style={{color:"red"}}>{quantityErrorMsg}</Typography>
                                    </Grid>
                                    <Grid item md={12} >
                                        <Controls.Button
                                            type="submit"
                                            text="Confrim Edit"
                                            style={{marginTop:"10px",marginLeft:"40%"}}
                                            onClick={onFormSubmit}
                                            disabled={isDisable}
                                        />
                                    </Grid>


                                </Grid>

                </form>
            </div>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />

            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </div >


    );
};

export default EditOrderForm;