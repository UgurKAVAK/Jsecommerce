import { LockOutlined } from "@mui/icons-material";
import { Avatar, Box, Container, Paper, TextField, Typography } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { loginUser } from "./AccountSlice";
import { useLocation, useNavigate } from "react-router";
import { useAppDispatch } from "../../Store/Store";
import { getCard } from "../Card/CardSlice";

export default function LoginPage(){

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const {register, handleSubmit, formState: {errors, isSubmitting, isValid}} = useForm({
        defaultValues: {
            username: "",
            password: ""
        }
    });

    async function submitForm(data: FieldValues){
        await dispatch(loginUser(data));
        await dispatch(getCard());
        navigate(location.state?.from || "/catalog");
    }

    return (
        <Container maxWidth="xs">
            <Paper elevation={24} square={false} sx={{marginTop: 8, padding: 2}}>
                <Avatar sx={{mx: "auto", color:"secondary.main", textAlign:"center", mb:1}}>
                    <LockOutlined />
                </Avatar>
                <Typography component="h1" variant="h5" sx={{textAlign: "center"}}>Login</Typography>
                <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{mt:2}}>
                    <TextField {...register("username", {required: "Username İs Required", minLength:{value:4, message: "Min Length is 4 Characters"}})} label="Enter UserName" fullWidth required autoFocus sx={{mb:2}} size="small" error={!!errors.username} helperText={errors.username?.message}></TextField>
                    {/* {errors.username?.message} bunu yazmak yerine  helperText={errors.username?.message} kullanıldı. Kütüphane ile (@mui/material)*/}
                    <TextField {...register("password", {required: "Password İs Required", minLength:{value:8, message: "Min Length is 10 Characters"}})} label="Enter Password" type="password" fullWidth required sx={{mb:2}} size="small" error={!!errors.password} helperText={errors.password?.message}></TextField>
                    {/* {errors.password?.message} */}
                    <LoadingButton loading={isSubmitting} disabled={!isValid} type="submit" variant="contained" fullWidth sx={{mt:1}}>Login</LoadingButton>
                </Box>
            </Paper>
        </Container>
    );
}
