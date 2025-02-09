import { Divider, Stack, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PaymentIcon from '@mui/icons-material/Payment';

function maskCardNumber(cardNumber: string) {
    if (!cardNumber || cardNumber.length < 12) return "Invalid Card";
    return `${cardNumber.slice(0, 4)} **** **** ${cardNumber.slice(-4)}`;
}

function maskCVV(cvv: string) {
    if (!cvv || cvv.length < 3) return "***";
    return `${cvv[0]}*${cvv[cvv.length - 1]}`;
}

export default function Review(){

    const {getValues} = useFormContext();
    const cardNumber = maskCardNumber(getValues("cardnumber") || "");
    const cardCVV = maskCVV(getValues("cardcvv") || "");

    return (
        <Stack spacing={2} sx={{mb: 3}}>
            <Stack direction={"column"} divider={<Divider />} spacing={2} sx={{my: 2}}>
                <div>
                    <Typography variant="subtitle2" gutterBottom sx={{display: "flex", alignItems: "center", mb: 1}}><LocalShippingIcon color="primary" sx={{mr: 1}}/> Delivery Information</Typography>
                    <Typography gutterBottom sx={{color: "text.secondary"}}>{getValues("firstname")} {getValues("lastname")}</Typography>
                    <Typography gutterBottom sx={{color: "text.secondary"}}>{getValues("phonenumber")}</Typography>
                    <Typography gutterBottom sx={{color: "text.secondary"}}>{getValues("addressline")} / {getValues("city")}</Typography>
                </div>
                <div>
                    <Typography variant="subtitle2" gutterBottom sx={{display: "flex", alignItems: "center", mb: 1}}><PaymentIcon color="primary" sx={{mr: 1}}/> Payment Information</Typography>
                    <Typography gutterBottom sx={{color: "text.secondary"}}>{getValues("cardname")}</Typography>
                    <Typography gutterBottom sx={{color: "text.secondary"}}>{cardNumber}</Typography>
                    <Typography gutterBottom sx={{color: "text.secondary"}}>{getValues("cardexpiremonth")}/{getValues("cardexpireyear")} - {cardCVV}</Typography>
                </div>
            </Stack>
        </Stack>
    );
}
