import { TableCell, TableRow } from "@mui/material";
import { useCardContext } from "../../context/CardContext";
import { currenyTRY } from "../../utils/FormatCurrency";

export default function CardSummary(){

    const {card} = useCardContext();
    const subTotal = card?.cardItems.reduce((toplam, item) => toplam + (item.quantity * item.price), 0) ?? 0;
    const tax = subTotal * 0.2;
    const total = subTotal + tax;

    return (
        <>
        <TableRow>
            <TableCell align="right" colSpan={4}>Ara Toplam</TableCell>
            <TableCell align="right">{currenyTRY.format(subTotal)}</TableCell>
        </TableRow> 
        <TableRow>
            <TableCell align="right" colSpan={4}>KDV (%20)</TableCell>
            <TableCell align="right">{currenyTRY.format(tax)}</TableCell>
        </TableRow> 
        <TableRow>
            <TableCell align="right" colSpan={4}>Toplam Ödenecek Fiyat</TableCell>
            <TableCell align="right">{currenyTRY.format(total)}</TableCell>
        </TableRow> 
       </>
    );
}
