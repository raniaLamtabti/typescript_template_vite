import { Routes, Route, Outlet } from "react-router-dom";
import { Box, Flex, Heading, Stack } from "@chakra-ui/react";
import Dashboard from "./pages/Dashboard";
import Upcoming from "./pages/Upcoming";
import NotDone from "./pages/NotDone";
import CategoryTasks from "./pages/CategoryTasks";
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";
import "./App.css";

const Template = () => {
  return (
    <Flex bgColor={"white"} minH="100vh" minW={"100vw"}>
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
    <Box className="app" h={"100vh"} bgColor="white">
      <Routes>
        <Route element={<Template />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="/notDone" element={<NotDone />} />
          <Route path="/tasks/:catName/:catId" element={<CategoryTasks />} />
        </Route>
      </Routes>
    </Box>
  );
}

export default App;
