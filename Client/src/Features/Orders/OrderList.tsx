import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper,Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Order } from "../../Model/IOrders";
import request from "../../api/request";
import { currenyTRY } from "../../utils/FormatCurrency";
import ArrowRightIcon from "@mui/icons-material/ArrowRight"
import CloseIcon from "@mui/icons-material/Close";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';


const orderStatus =  ["Pending","PaymentFailed","Approved","InCargo","Completed"]

export default function OrderList(){

    const [orders, setOrders] = useState<Order[] | null>(null);
    const [loadind, setLoading] = useState(false);
    const [selecdOrder, setSelectedOrder] = useState<Order | null>(null);
    const [open, setOpen] = useState(false);
    const subTotal = selecdOrder?.orderItems.reduce((toplam, item) => toplam + (item.quantity * item.price), 0) ?? 0;
    const tax = subTotal * 0.2;
    const total = subTotal + tax;

    function handleDialogOpen(order: Order){
        setOpen(true);
        setSelectedOrder(order);
    }
    function handleDialogClose(){
        setOpen(false);
        setSelectedOrder(null);
    }

    useEffect(() =>{
        setLoading(true);
        request.Order.getOrders()
            .then(orders => setOrders(orders))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, [])

    if (loadind) {
        return <CircularProgress />
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Order Id</TableCell>
                            <TableCell>Order Status</TableCell>
                            <TableCell>Order Date</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders?.map((order) => (
                            <TableRow key={order.id}>
                                <TableCell component="th" scope="row">{order.id}</TableCell>
                                <TableCell component="th" scope="row">{orderStatus[order.orderStatus]}</TableCell>
                                <TableCell component="th" scope="row">{new Date(order.orderDate).toLocaleString()}</TableCell>
                                <TableCell component="th" scope="row">{currenyTRY.format(order.subTotal)}</TableCell>
                                <TableCell component="th" scope="row" sx={{width: 100}}>
                                    <Button onClick={() => handleDialogOpen(order)} size="small" variant="contained" endIcon={<ArrowRightIcon />}>Details</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog onClose={handleDialogClose} open={open} fullWidth maxWidth="lg" aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle>
                    Order Number: #{selecdOrder?.id}
                </DialogTitle>
                <IconButton onClick={handleDialogClose} sx={{position: "absolute",right: 8,top: 8}}>
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers >
                    <Paper sx={{p: 3, mb: 3}}>
                        <Typography variant="subtitle2" gutterBottom sx={{display: "flex", alignItems: "center", mb: 1}}><LocalShippingIcon color="primary" sx={{mr: 1}}/> Delivery Information</Typography>
                        <Typography gutterBottom>{selecdOrder?.firstName} {selecdOrder?.lastName}</Typography>
                        <Typography gutterBottom>{selecdOrder?.phoneNumber}</Typography>
                        <Typography gutterBottom>{selecdOrder?.addressLine} / {selecdOrder?.city}</Typography>
                    </Paper>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead id="alert-dialog-title">
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell align="right">Fiyat</TableCell>
                                    <TableCell align="right">Adet</TableCell>
                                    <TableCell align="right">Toplam</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {selecdOrder?.orderItems.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell><img src={`http://localhost:5206/images/${item.productImage}`} style={{height: 60}} /></TableCell>
                                        <TableCell>{item.productName}</TableCell>
                                        <TableCell align="right">{currenyTRY.format(item.price)}</TableCell>
                                        <TableCell align="right">{item.quantity}</TableCell>
                                        <TableCell align="right">{currenyTRY.format(item.price * item.quantity)}</TableCell>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell align="right" colSpan={4}>Sub Total</TableCell>
                                    <TableCell align="right" colSpan={4}>{currenyTRY.format(subTotal)}</TableCell>
                                </TableRow>      
                                <TableRow>
                                    <TableCell align="right" colSpan={4}>VAT (%20)</TableCell>
                                    <TableCell align="right" colSpan={4}>{currenyTRY.format(tax)}</TableCell>
                                </TableRow> 
                                <TableRow>
                                    <TableCell align="right" colSpan={4}>Total Paid</TableCell>
                                    <TableCell align="right" colSpan={4}>{currenyTRY.format(total)}</TableCell>
                                </TableRow>                          
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>Close</Button>
                </DialogActions>
            </Dialog>

        </>
    );
}
