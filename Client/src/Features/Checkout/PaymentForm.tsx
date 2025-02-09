import { Grid2, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function PaymentForm(){

    const {register, formState: {errors}} = useFormContext();

    return (
        <Grid2 container spacing={3}>
            <Grid2 size={{xs: 12, md: 6}}>
                <TextField {...register("cardname", {required: "Card Name İs Required", minLength:{value:5, message: "Min Length is 5 Characters"}})} label="Enter Card Name" fullWidth autoFocus sx={{mb:2}} size="small" error={!!errors.cardname}></TextField>
            </Grid2>
            <Grid2 size={{xs: 12, md: 6}}>
                <TextField {...register("cardnumber", {required: "Card Number İs Required", minLength:{value:16, message: "Min Length is 16 Characters"}})} label="Enter Card Number" fullWidth sx={{mb:2}} size="small" error={!!errors.cardnumber}></TextField>
            </Grid2>
            <Grid2 size={{xs: 6, md: 4}}>
                <TextField {...register("cardexpiremonth", {required: "Card Expiry Month İs Required", maxLength:{value:2, message: "Max Length is 2 Characters"}, minLength:{value:2, message: "Min Length is 2 Characters"}})} label="Enter Card Expiry Month" fullWidth sx={{mb:2}} size="small" error={!!errors.cardexpiremonth}></TextField>
            </Grid2>
            <Grid2 size={{xs: 6, md: 4}}>
                <TextField {...register("cardexpireyear", {required: "Card Expiry Year İs Required", maxLength:{value:4, message: "Max Length is 4 Characters"}, minLength:{value:4, message: "Min Length is 4 Characters"}})} label="Enter Card Expiry Year" fullWidth sx={{mb:2}} size="small" error={!!errors.cardexpireyear}></TextField>
            </Grid2>
            <Grid2 size={{xs: 12, md: 4}}>
                <TextField {...register("cardcvv", {required: "Card Cvv İs Required", minLength:{value:3, message: "Min Length is 3 Characters"}})} label="Enter Card Cvv" fullWidth sx={{mb:2}} size="small" error={!!errors.cardcvv}></TextField>
            </Grid2>
        </Grid2>
    );
}
