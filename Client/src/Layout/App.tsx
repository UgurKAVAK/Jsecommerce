import { useEffect, useState } from "react";
import { CircularProgress, Container, CssBaseline } from "@mui/material";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch } from "../Store/Store";
import { getUser } from "../Features/Account/AccountSlice";
import { getCard } from "../Features/Card/CardSlice";
import Header from "./Header";

function App() {

  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const initApp = async () => {
    await dispatch(getUser());
    await dispatch(getCard());
  }

  useEffect(() => {
    initApp().then(() => setLoading(false));
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
