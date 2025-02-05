import { Alert, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useCardContext } from "../../context/CardContext";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import request from "../../api/request";
import { toast } from "react-toastify";
import CardSummary from "./CardSummary";
import { currenyTRY } from "../../utils/FormatCurrency";

export default function ShoppingCardPage(){
    
    const {card, setCard} = useCardContext();
    const [status, setStatus] = useState({loading: false, id: ""});
    
    function handleAddItem(productId: number, id: string){
      setStatus({loading: true, id:id});
      request.Card.addItem(productId)
      .then(card => setCard(card))
      .catch(error => console.log(error))
      .finally(() => setStatus({loading: false, id: ""}));
    }
    function handleDeleteItem(productId: number, id: string, quantity = 1){
      setStatus({loading: true, id:id});
      request.Card.deleteItem(productId,quantity)
      .then((card) => setCard(card))
      .catch(error => console.log(error))
      .finally(() => setStatus({loading: false, id: ""}));
    }

    if(card?.cardItems.length === 0) return <Alert severity="warning">Sepetinizde Ürün Yoktur.</Alert>

    return (
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
                    <LoadingButton loading={status.loading && status.id === "del" + item.productId} onClick={() => handleDeleteItem(item.productId, "del" + item.productId)}>
                        <RemoveCircleIcon></RemoveCircleIcon>
                    </LoadingButton>
                      {item.quantity}
                    <LoadingButton loading={status.loading && status.id === "add" + item.productId} onClick={() => handleAddItem(item.productId, "add" + item.productId)}>
                        <AddCircleIcon></AddCircleIcon>
                    </LoadingButton>
                  </TableCell>
                  <TableCell align="right">{currenyTRY.format(item.price * item.quantity)}</TableCell>
                  <TableCell align="right">
                    <LoadingButton color="error" loading={status.loading && status.id === "del_all" + item.productId} onClick={() => {handleDeleteItem(item.productId, "del" + item.productId, item.quantity); toast.error("Ürün Sepetinizden Silinmiştir.")}}>
                       <Delete /> 
                    </LoadingButton> 
                  </TableCell>
                </TableRow>
              ))}
              <CardSummary></CardSummary>
            </TableBody>
          </Table>
        </TableContainer>
      );
}
