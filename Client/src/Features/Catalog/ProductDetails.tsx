import { CircularProgress, Divider, Grid2, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router";
import NotFound from "../../errors/NotFound";
import { LoadingButton } from "@mui/lab";
import { AddShoppingCart } from "@mui/icons-material";
import { currenyTRY } from "../../utils/FormatCurrency";
import { addItemToCard } from "../Card/CardSlice";
import { fetchProductsById, selectProductById } from "./CatalogSlice";
import { useAppDispatch, useAppSelector } from "../../Store/Store";

export default function ProductDetailsPage(){

    const {card, status} = useAppSelector(state => state.card);
    const dispatch = useAppDispatch();
    const imageurl="1.jpg";
    const {id} = useParams<{id: string}>();
    const product = useAppSelector(state => selectProductById(state, Number(id)));
    const {status: loading} = useAppSelector(state => state.catalog);
    const item = card?.cardItems.find(i => i.productId == product?.id);

    useEffect(() =>{
        if (!product && id) {
            dispatch(fetchProductsById(parseInt(id)))
        }
    }, [id]);

    function handleAddItem(id: number){
        dispatch(addItemToCard({productId: id}));
    }

    if(loading === "pendingFetchProductById") return <CircularProgress />
    if(!product) return <NotFound />;

    return (
        <Grid2 container spacing={6}>
            <Grid2 size={{xl:3, lg:4, md:5, sm:6, xs:12}}>
                <img src={`http://localhost:5206/images/${imageurl}`} style={{width: "100%"}}/>
            </Grid2>
            <Grid2 size={{xl:9, lg:8, md:7, sm:6, xs:12}}>
                <Typography variant="h3">{product.name}</Typography>
                <Divider sx={{mb:2}} />
                <Typography variant="h4" color="secondary">{currenyTRY.format(product.price)}</Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Urun İsmi</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Urun Açıklaması</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Urun Stok</TableCell>
                                <TableCell>{product.stock}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Stack direction="row" spacing={2} sx={{mt: 3}} alignItems="center">
                    <LoadingButton variant="outlined" loadingPosition="start" startIcon={<AddShoppingCart />} loading={status === "pendingAddItem" + product.id} onClick={() => dispatch(addItemToCard({productId: product.id }))}>Sepete Ekle</LoadingButton>
                    {
                        item?.quantity! > 0 && (
                            <Typography variant="body2">Sepetinize {item?.quantity} Adet Eklenmiştir</Typography>
                        )
                    }
                </Stack>
            </Grid2>
        </Grid2>
    );
}
