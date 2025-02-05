import { useEffect, useState } from "react";
import Header from "./Header";
import { CircularProgress, Container, CssBaseline } from "@mui/material";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import request from "../api/request";
import { useAppDispatch } from "../Hooks/Hooks";
import { setCard } from "../Features/Card/CardSlice";

function App() {

  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    request.Card.get()
    .then(card => dispatch(setCard(card)))
    .catch(error => console.log(error))
    .finally(() => setLoading(false))
  }, []);

  if(loading) return <CircularProgress />

  return (
    <>
    <ToastContainer position="bottom-right" hideProgressBar theme="colored"/>
      <CssBaseline />
      <Header />
      <Container>
        <Outlet />
      </Container>
    </>
  )
}

export default App
