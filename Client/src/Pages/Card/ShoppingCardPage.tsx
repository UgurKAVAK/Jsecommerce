import { useEffect, useState } from "react"
import request from "../../api/request";
import { CircularProgress, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Card } from "../../Model/ICard";
import { Delete } from "@mui/icons-material";

export default function ShoppingCardPage(){
    
    const [card, setCard] = useState<Card | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        request.Card.get()
        .then(card => setCard(card))
        .catch(error => console.log(error))
        .finally(() => setLoading(false))
    }, []);

    if(loading) return <CircularProgress />

    if(!card) return <h1>There are no items in your cart</h1>

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
              {card.cardItems.map((item) => (
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
                  <TableCell align="right">{item.price} ₺</TableCell>
                  <TableCell align="right">{item.quantity}</TableCell>
                  <TableCell align="right">{item.price * item.quantity} ₺</TableCell>
                  <TableCell align="right">
                    <IconButton color="error">
                       <Delete /> 
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
}
