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
  border,
} from "@chakra-ui/react";
import { getCategories } from "../api/categories";
import { useQuery } from "@tanstack/react-query";
import { Category } from "../interfaces";
import { useFilterStore } from "../store";
import { BsFillCalendarCheckFill, BsCalendarWeekFill } from "react-icons/bs";
import { MdOutlineRemoveDone } from "react-icons/md";
import { useNavigate } from "react-router";

const SideBar = () => {
  let navigate = useNavigate();
  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  return (
    <Box w="300px" px="50px" py="50px" bgColor={"gray.50"}>
      <Text as="b" mb="20px">
        Hi You
      </Text>
      <Stack spacing={"20px"} mt={"50px"}>
        <Link
          display={"flex"}
          gap="20px"
          alignItems={"center"}
          _hover={{ textDecoration: "none" }}
          fontSize="18px"
        >
          <BsFillCalendarCheckFill color="green" /> Today
        </Link>
        <Link
          display={"flex"}
          gap="20px"
          alignItems={"center"}
          _hover={{ textDecoration: "none" }}
          fontSize="18px"
        >
          <BsCalendarWeekFill color="#3182CE" /> Upcoming
        </Link>
        <Link
          display={"flex"}
          gap="20px"
          alignItems={"center"}
          _hover={{ textDecoration: "none" }}
          fontSize="18px"
        >
          <MdOutlineRemoveDone color="red" /> Not Done
        </Link>
        <Accordion allowToggle>
          <AccordionItem>
            <h2>
              <AccordionButton
                _focus={{ bgColor: "none", border: "none", outline: "none" }}
                _hover={{ bgColor: "none", border: "none" }}
              >
                <Box as="span" flex="1" textAlign="left">
                  <Text fontSize="18px" as="b">
                    List
                  </Text>
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel
              pb={4}
              display={"flex"}
              flexDirection="column"
              gap="20px"
            >
              {categoriesQuery.data?.map((cat: Category) => (
                <Link
                  key={cat.id}
                  _hover={{ textDecoration: "none" }}
                  fontSize="18px"
                >
                  {cat.name}
                </Link>
              ))}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Stack>
    </Box>
  );
};

export default SideBar;
