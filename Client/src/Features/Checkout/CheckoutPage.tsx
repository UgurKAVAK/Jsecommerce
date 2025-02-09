import { Box, Button, Grid2, Paper, Stack, Step, StepLabel, Stepper, Typography } from "@mui/material";
import Info from "./Info";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import { useState } from "react";
import { ChevronLeftRounded, ChevronRightRounded } from "@mui/icons-material";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import request from "../../api/request";
import { useAppDispatch } from "../../Store/Store";
import { clearCard } from "../Card/CardSlice";
import { LoadingButton } from "@mui/lab";

const steps = ["Delivery Information", "Payment", "Order Summary"];

function getStepContent(step: number){
    switch(step){
        case 0:
            return <AddressForm />;
        case 1:
            return <PaymentForm />;
        case 2:
            return <Review />;
        default:
            throw new Error("An Unknown Step");
    }
}

export default function CheckoutPage(){

    const [activeStep, setActiveStep] = useState(0);
    const methods = useForm();
    const [orderId, setOrderId] = useState(0);
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();

    async function handleNext(data: FieldValues){
        if (activeStep === 2) {
            setLoading(true);
            try {
                setOrderId(await request.Order.createOrder(data));
                setActiveStep(activeStep + 1);
                dispatch(clearCard());
                setLoading(false);
            } catch (error: any) {
                console.log(error);
                setLoading(false);
            }
        }
        else {
            setActiveStep(activeStep + 1);
        }
    }
    function handlePrevios(){
        setActiveStep(activeStep - 1);
    }

    return (

        <FormProvider {...methods}>
            <Paper>
                <Grid2 container spacing={10}>
                    {
                        activeStep !== steps.length && (
                            <Grid2 size={4} sx={{
                                borderRight: "5px solid",
                                borderColor: "divider",
                                p: 3
                            }}>
                                <Info/>
                            </Grid2>
                        )
                    }

                    <Grid2 size={ activeStep !== steps.length ? 8 : 12} sx={{p: 3}} >
                        <Box>
                            <Stepper activeStep={activeStep} sx={{height: 40, mb: 4}}>
                                { steps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                )) }
                            </Stepper>
                        </Box>
                        <Box>
                            {activeStep === steps.length ? (
                                <Stack spacing={2}>
                                    <Typography variant="h1"><img src="/images/YourOrderIs CompletedIcons.png" style={{ display: 'block', margin: '0', padding: '0', width: '50px', height: '50px' }}/></Typography>
                                    <Typography variant="h5">Teşekkür Ederiz :) Siparişini Aldık.</Typography>
                                    <Typography variant="body1" sx={{color: "text.secondary"}}>Sipariş Numaranız <strong>#{orderId}</strong>. Siparişiz Onaylandığında Size Bir E-Posta Göndereceğiz. </Typography>
                                    <Button sx={{alignSelf: "start", width: {xs: "100%", sm: "auto"}}} variant="contained">Siparişleri Listele</Button>
                                </Stack>
                            ) : (
                                <form onSubmit={methods.handleSubmit(handleNext)}>
                                    {getStepContent(activeStep)}
                                    <Box>
                                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                            <Button startIcon={<ChevronLeftRounded />} variant="contained" onClick={handlePrevios}  disabled={activeStep === 0}>Back</Button>
                                            <LoadingButton type="submit" loading={loading} startIcon={<ChevronRightRounded />} variant="contained" disabled={activeStep === steps.length - 0}>{activeStep == 2 ? "Siparişi Tamamla": "Next"}</LoadingButton>
                                        </Box>
                                    </Box>
                                </form>
                            )}
                        </Box>
                    </Grid2>
                </Grid2>
            </Paper>
        </FormProvider>
    );
}
