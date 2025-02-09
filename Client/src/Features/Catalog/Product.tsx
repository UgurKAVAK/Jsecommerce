import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';
import { IProduct } from "../../Model/IProduct";
import { Link } from "react-router";
import { LoadingButton } from "@mui/lab";
import { currenyTRY } from "../../utils/FormatCurrency";
import { addItemToCard } from "../Card/CardSlice";
import { useAppDispatch, useAppSelector } from "../../Store/Store";

interface Props {
    product: IProduct
}

export default function Product({product}: Props){

  const {status} = useAppSelector(state => state.card); 
  const dispatch = useAppDispatch();
  const imageurl="1.jpg";
    return(
      <Card>
        <CardMedia sx={{height:160, backgroundSize:"contain"}} image={`http://localhost:5206/images/${imageurl}`}/>
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2" color="text.secondary">
            {product.name}
          </Typography>
          <Typography variant="body2" color="secondary">
            {currenyTRY.format(product.price)}
          </Typography>
        </CardContent>
        <CardActions>
          {/* <Button variant="outlined" size="small" startIcon={<AddShoppingCart/>} color="success" onClick={() => handleAddItem(product.id)}>Add To Card</Button> */}
          <LoadingButton size="small" variant="outlined" loadingPosition="start" startIcon={<AddShoppingCart/>} loading={status === "pendingAddItem" + product.id} onClick={() => dispatch(addItemToCard({productId: product.id}))}>Add To Card</LoadingButton>
          <Button component={Link} to={`/catalog/${product.id}`} variant="outlined" size="medium" color="primary" startIcon={<SearchIcon/>}>Search</Button>
        </CardActions>
      </Card>
    );
  }