import { Alert, Box, Button, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Delete } from "@mui/icons-material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import CardSummary from "./CardSummary";
import { currenyTRY } from "../../utils/FormatCurrency";
import { addItemToCard, deleteItemFromCard } from "./CardSlice";
import { useAppDispatch, useAppSelector } from "../../Store/Store";

export default function ShoppingCardPage(){
    
    const {card, status} = useAppSelector(state => state.card);
    const dispatch = useAppDispatch();
    
    if( !card || card?.cardItems.length === 0) return <Alert severity="warning">Sepetinizde Ürün Yoktur.</Alert>

    return (
      <>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Ürün</TableCell>
                <TableCell>Ürün</TableCell>
                <TableCell align="right">Fiyat</TableCell>
                <TableCell align="right">Adet</TableCell>
                <TableCell align="right">Toplam Fiyat</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {card?.cardItems.map((item) => (
                <TableRow
                  key={item.productId}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                   <TableCell component="th" scope="row">
                    <img src={`http://localhost:5206/images/${item.imageUrl}`} style={{height: 60}} />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {item.productName}
                  </TableCell>
                  <TableCell align="right">{currenyTRY.format(item.price)}</TableCell>
                  <TableCell align="right">
                    <LoadingButton loading={status === "pendingDeleteItem" + item.productId + "single"} onClick={() => dispatch(deleteItemFromCard({productId: item.productId, quantity: 1, key: "single"}))}>
                        <RemoveCircleIcon></RemoveCircleIcon>
                    </LoadingButton>
                      {item.quantity}
                    <LoadingButton loading={status === "pendingAddItem" + item.productId} onClick={() => dispatch(addItemToCard({productId: item.productId}))}>
                        <AddCircleIcon></AddCircleIcon>
                    </LoadingButton>
                  </TableCell>
                  <TableCell align="right">{currenyTRY.format(item.price * item.quantity)}</TableCell>
                  <TableCell align="right">
                    <LoadingButton color="error" loading={status === "pendingDeleteItem" + item.productId + "all"} onClick={() => {dispatch(deleteItemFromCard({productId: item.productId, quantity: item.quantity, key: "all"})); toast.error("Ürün Sepetinizden Silinmiştir.")}}>
                       <Delete /> 
                    </LoadingButton> 
                  </TableCell>
                </TableRow>
              ))}
              <CardSummary></CardSummary>
            </TableBody>
          </Table>
        </TableContainer>
        <Box display="flex" justifyContent="flex-end" sx={{mt: 3}}>
          <Button component={Link} href="/checkout" variant="contained" color="primary">Checkout</Button>
        </Box>
      </>
      );
}
