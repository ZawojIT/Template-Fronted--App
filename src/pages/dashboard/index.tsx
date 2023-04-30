import IncrementButton from "@/sections/Dashboard/IncrementButton/IncrementButton";
import LogButton from "@/components/Buttons/LogButton";
import DashboardLayout from "@/layouts/Dashboard/DashboardLayout";
import { Box } from "@mui/material";

//! Page do not have any state, so there is no unnecessary re-rendering
const Dashboard = () => {
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
      </Box>
    </>
  );
};

Dashboard.getLayout = (page: React.ReactElement) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Dashboard;
