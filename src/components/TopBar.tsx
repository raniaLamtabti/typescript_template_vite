import {
  Flex,
  Heading,
  Select,
  FormControl,
  FormLabel,
  Switch,
  Input,
  Text,
  Stack,
  Box,
  Link,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
} from "@chakra-ui/react";
import { getCategories } from "../api/categories";
import { useQuery } from "@tanstack/react-query";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Category } from "../interfaces";
import { useFilterStore } from "../store";
import { BsFillCalendarCheckFill, BsCalendarWeekFill } from "react-icons/bs";
import { MdOutlineRemoveDone } from "react-icons/md";
import CreateTask from "./CreateTask";
import CreateCategory from "./CreateCategory";

const SideBar = () => {
  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  return (
    <Flex w="100%" py="10px" px="20px" justifyContent={"flex-end"} gap="10px">
      <CreateTask />
      <CreateCategory />
      <Button>
        <SunIcon color="orange.200" />
      </Button>
    </Flex>
  );
};

export default SideBar;
