import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { useAppSelector } from "../../Store/Store";
import { currenyTRY } from "../../utils/FormatCurrency";

export default function Info(){

    const {card} = useAppSelector(state => state.card);
    const subTotal = card?.cardItems.reduce((toplam, item) => toplam + (item.quantity * item.price), 0) ?? 0;
    const imageurl="1.jpg";

    return (
        <>
            <Typography variant="subtitle2" sx={{color: "text.secondary"}}>Toplam</Typography>
            <Typography variant="h5" gutterBottom>
                {currenyTRY.format(subTotal) + " + KDV"}
            </Typography>
            <List>
                {card?.cardItems.map((item) => (
                    <ListItem key={item.productId} sx={{py: 1, px: 0}}>
                        <ListItemAvatar>
                            <Avatar variant="square" src={`http://localhost:5206/images/${imageurl}`}></Avatar>
                        </ListItemAvatar>
                        <ListItemText sx={{mr: 2}} primary={item.productName} secondary={`x ${item.quantity}`} />
                        {/* <ListItemText sx={{mr: 2}} primary={item.productName.substring(0,15) + "..."} secondary={`x ${item.quantity}`} /> */}
                        <Typography variant="body1">
                            {currenyTRY.format(item.price)}
                        </Typography>
                    </ListItem>
                ))}
            </List>
        </>
    );
}
