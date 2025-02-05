import { CircularProgress, Divider, Grid2, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { IProduct } from "../../Model/IProduct";
import request from "../../api/request";
import NotFound from "../../errors/NotFound";
import { LoadingButton } from "@mui/lab";
import { AddShoppingCart } from "@mui/icons-material";
import { useCardContext } from "../../context/CardContext";
import { toast } from "react-toastify";
import { currenyTRY } from "../../utils/FormatCurrency";

export default function ProductDetailsPage(){

    const {card, setCard} = useCardContext();
    const imageurl="1.jpg";
    const {id} = useParams<{id: string}>();
    const [product, setProduct] = useState<IProduct | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAdded, setIsAdded] = useState(false);
    const item = card?.cardItems.find(i => i.productId == product?.id);

    useEffect(() =>{
        id && request.Catalog.details(parseInt(id))
        .then(data => setProduct(data))
        .catch(error => console.log(error))
        .finally(() => setLoading(false));
    }, [id]);

    function handleAddItem(id: number){
        setIsAdded(true);
        request.Card.addItem(id)
        .then(card => {
            setCard(card);
            toast.success("Sepetinize Eklenmiştir.");
        })
        .catch(error => console.log(error))
        .finally(() => setIsAdded(false));
    }

    if(loading) return <CircularProgress />
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
                    <LoadingButton variant="outlined" loadingPosition="start" startIcon={<AddShoppingCart />} loading={isAdded} onClick={() => handleAddItem(product.id)}>Sepete Ekle</LoadingButton>
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
