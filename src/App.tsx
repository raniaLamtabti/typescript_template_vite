import { Routes, Route, Outlet } from "react-router-dom";
import { Box, Flex, Heading, Stack } from "@chakra-ui/react";
import Dashboard from "./pages/Dashboard";
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";
import Filter from "./components/Filter";
import CreateTask from "./components/CreateTask";
import CreateCategory from "./components/CreateCategory";
import "./App.css";

const Template = () => {
  return (
    <Flex bgColor={"brand.white"} minH="100vh" minW={"100vw"}>
      <SideBar />
      <Box py={"5px"} w={"-webkit-fill-available"}>
        <TopBar />
        <Box p={"50px"}>
          <Outlet />
        </Box>
      </Box>
    </Flex>
  );
};

function App() {
  return (
    <Box className="app" h={"100vh"}>
      <Routes>
        <Route element={<Template />}>
          <Route path="/" element={<Dashboard />} />
        </Route>
      </Routes>
    </Box>
  );
}

export default App;
