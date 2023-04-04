import { Routes, Route, Outlet } from "react-router-dom";
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import Dashboard from "./pages/Dashboard";
import Upcoming from "./pages/Upcoming";
import NotDone from "./pages/NotDone";
import CategoryTasks from "./pages/CategoryTasks";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import { useTheme } from "@chakra-ui/react";
import "./App.css";

const Template = () => {
  const bg = useColorModeValue("bgLight", "bgDark");
  return (
    <Box bgColor={bg} minH="100vh" minW={"100vw"}>
      <TopBar />
      <Flex minW={"100vw"}>
        <Sidebar />
        <Box
          pr={"8%"}
          pl={{ base: "0%", md: "8%" }}
          py={"50px"}
          w={"-webkit-fit-content"}
          flex="1"
        >
          <Outlet />
        </Box>
      </Flex>
    </Box>
  );
};

function App() {
  return (
    <Box className="app" h={"100vh"}>
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
