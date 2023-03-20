import { Routes, Route, Outlet } from "react-router-dom";
import { Box, Flex, Heading, Stack } from "@chakra-ui/react";
import Dashboard from "./pages/Dashboard";
import Filter from "./components/Filter";
import CreateTask from "./components/CreateTask";
import CreateCategory from "./components/CreateCategory";
import "./App.css";

const Template = () => {
  return (
    <Box bgColor={"brand.primary"} minH="100vh">
      <Flex
        h={"30vh"}
        w={"100vw"}
        className="dashBg"
        justifyContent={"center"}
        alignItems={"center"}
        color="#FFF"
      >
        <Heading>Hi , You</Heading>
      </Flex>
      <Stack
        spacing={"20px"}
        bgColor={"brand.white"}
        mx={"10%"}
        position="absolute"
        top={"25vh"}
        w="80%"
        h={"70vh"}
        borderRadius="3xl"
        p="20px"
      >
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Filter />
          <Flex gap={"20px"}>
            <CreateCategory />
            <CreateTask />
          </Flex>
        </Flex>
        <Box py={"5px"}>
          <Outlet />
        </Box>
      </Stack>
    </Box>
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
