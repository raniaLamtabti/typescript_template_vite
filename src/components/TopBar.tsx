import { Flex, Button } from "@chakra-ui/react";
import CreateTask from "./CreateTask";
import CreateCategory from "./CreateCategory";
import Filter from "./Filter";
import ToggleColorMode from "./ToggleColorMode";

const SideBar = () => {
  return (
    <Flex w="100%" py="10px" px="20px" justifyContent={"flex-end"} gap="10px">
      <CreateTask />
      <CreateCategory />
      <Filter />
      <ToggleColorMode />
    </Flex>
  );
};

export default SideBar;
