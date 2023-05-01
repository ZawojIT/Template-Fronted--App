import IncrementButton from "@/sections/Dashboard/IncrementButton/IncrementButton";
import LogButton from "@/components/Buttons/LogButton";
import DashboardLayout from "@/layouts/Dashboard/DashboardLayout";
import { Box, Button } from "@mui/material";
import { useDispatch } from "@/redux/store";
import { getProducts } from "@/redux/slices/product";
import { useSelector } from "react-redux";
import { IProductState } from "@/types/product";
import ProductsList from "@/sections/Dashboard/Products/productsList";

//! Page do not have any state, so there is no unnecessary re-rendering
const Dashboard = () => {
  const dispatch = useDispatch();
  // ! useSlector re-renders the page when the state changes.
  // const products = useSelector(
  //   (state: { product: IProductState }) => state.product.products
  // );

  dispatch(
    getProducts({
      size: 10,
    })
  );

  console.log("Dashboard Page");

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <LogButton
          label='Log Text'
          logText='This is a log text'
          variant='contained'
          onLoadLogText='This is a log text from onLoadLogText'
        />

        <IncrementButton />
        <Button
          variant='contained'
          onClick={() => {
            // Dispatching an action do not re-render the page
            dispatch(
              getProducts({
                size: 10,
              })
            );
          }}
        >
          Get Products
        </Button>
        <ProductsList />
      </Box>
    </>
  );
};

Dashboard.getLayout = (page: React.ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Dashboard;
