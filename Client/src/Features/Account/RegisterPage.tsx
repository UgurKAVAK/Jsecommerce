
import { LockOutlined } from "@mui/icons-material";
import { Avatar, Box, Container, Paper, TextField, Typography } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router";
import request from "../../api/request";
import { toast } from "react-toastify";

export default function RegisterPage(){

    const navigate = useNavigate();

    const {register, handleSubmit, setError, formState: {errors, isSubmitting, isValid}} = useForm({
        defaultValues: {
            username: "",
            name: "",
            email: "",
            password: ""
        },
        mode: "onTouched"
    });

    async function submitForm(data: FieldValues){
        request.Account.register(data)
            .then(() => {
                toast.success("User Created."),
                navigate("/login")
            })
            .catch(error => {
                console.log(error.data);
                const {data: errors} = error;
                errors.forEach((error: any) => {
                    if (error.code == "DuplicateUserName") {
                        setError("username", {message: error.description});
                        //setError("username", {message: "Bu Kullanıcı İsmine Sahip Kullanıcı Bulunuyor."});
                    }
                    else if (error.code == "DuplicateEmail") {
                        setError("email", {message: error.description});
                        //setError("email", {message: "Bu EMaile Ait Bir Kullanıcı Bulu nuyor."});
                    }
                })
            })
    }

    return (
        <Container maxWidth="xs">
            <Paper elevation={24} square={false} sx={{marginTop: 8, padding: 2}}>
                <Avatar sx={{mx: "auto", color:"secondary.main", textAlign:"center", mb:1}}>
                    <LockOutlined />
                </Avatar>
                <Typography component="h1" variant="h5" sx={{textAlign: "center"}}>Register</Typography>
                <Box component="form" onSubmit={handleSubmit(submitForm)} noValidate sx={{mt:2}}>
                    <TextField {...register("username", {required: "Username İs Required", minLength:{value:4, message: "Min Length is 4 Characters"}})} label="Enter UserName" fullWidth autoFocus sx={{mb:2}} size="small" error={!!errors.username} helperText={errors.username?.message}></TextField>
                    {/* {errors.username?.message} bunu yazmak yerine  helperText={errors.username?.message} kullanıldı. Kütüphane ile (@mui/material)*/}
                    <TextField {...register("name", {required: "Name İs Required"})} label="Enter Name" fullWidth sx={{mb:2}} size="small" error={!!errors.name} helperText={errors.name?.message}></TextField>
                    <TextField {...register("email", {required: "EMail İs Required", pattern: {value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: "EMail İs Valid"}})} label="Enter EMail" fullWidth sx={{mb:2}} size="small" error={!!errors.email} helperText={errors.email?.message}></TextField>
                    <TextField {...register("password", {required: "Password İs Required", minLength:{value:8, message: "Min Length is 10 Characters"}})} label="Enter Password" type="password" fullWidth sx={{mb:2}} size="small" error={!!errors.password} helperText={errors.password?.message}></TextField>
                    {/* {errors.password?.message} */}
                    <LoadingButton loading={isSubmitting} disabled={!isValid} type="submit" variant="contained" fullWidth sx={{mt:1}}>Register</LoadingButton>
                </Box>
            </Paper>
        </Container>
    );
}
