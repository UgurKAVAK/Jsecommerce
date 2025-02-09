import { Grid2, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function AddressForm(){

    const {register, formState: {errors}} = useFormContext();

    return (
        <Grid2 container spacing={3}>
            <Grid2 size={{xs: 12, md: 6}}>
                <TextField {...register("firstname", {required: "FirstName İs Required", minLength:{value:2, message: "Min Length is 2 Characters"}})} label="Enter FirstName" fullWidth autoFocus sx={{mb:2}} size="small" error={!!errors.firstname}></TextField>
            </Grid2>
            <Grid2 size={{xs: 12, md: 6}}>
                <TextField {...register("lastname", {required: "LastName İs Required", minLength:{value:2, message: "Min Length is 2 Characters"}})} label="Enter LastName" fullWidth sx={{mb:2}} size="small" error={!!errors.lastname}></TextField>
            </Grid2>
            <Grid2 size={{xs: 12, md: 6}}>
                <TextField {...register("phonenumber", {required: "PhoneNumber İs Required", minLength:{value:11, message: "Min Length is 11 Characters"}})} label="Enter PhoneNumber" fullWidth sx={{mb:2}} size="small" error={!!errors.phonenumber}></TextField>
            </Grid2>
            <Grid2 size={{xs: 12, md: 6}}>
                <TextField {...register("city", {required: "City İs Required", minLength:{value:5, message: "Min Length is 5 Characters"}})} label="Enter City" fullWidth sx={{mb:2}} size="small" error={!!errors.city}></TextField>
            </Grid2>
            <Grid2 size={{xs: 12 }}>
                <TextField {...register("addressline", {required: "AddressLine İs Required", minLength:{value:15, message: "Min Length is 15 Characters"}})} label="Enter AddressLine" fullWidth multiline rows={4} sx={{mb:2}} size="small" error={!!errors.addressline}></TextField>
            </Grid2>
        </Grid2>
    );
}
