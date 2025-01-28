import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';
import { IProduct } from "../../Model/IProduct";
import { Link } from "react-router";

interface Props {
    product: IProduct
}

export default function Product({product}: Props){
  const imageurl="1.jpg";
    return(
      <Card>
        <CardMedia sx={{height:160, backgroundSize:"contain"}} image={`http://localhost:5206/images/${imageurl}`}/>
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2" color="text.secondary">
            {product.name}
          </Typography>
          <Typography variant="body2" color="secondary">
            {(product.price / 1).toFixed(2)} ₺
          </Typography>
        </CardContent>
        <CardActions>
          <Button color="secondary" startIcon={<AddShoppingCart/>}>Add To Card</Button>
          <Button component={Link} to={`/catalog/${product.id}`} variant="outlined" size="medium" color="primary" startIcon={<SearchIcon/>}>Search</Button>
        </CardActions>
      </Card>
    );
  }