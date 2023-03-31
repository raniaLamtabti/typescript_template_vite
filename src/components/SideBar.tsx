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
  useColorModeValue,
} from "@chakra-ui/react";
import { getCategories } from "../api/categories";
import { useQuery } from "@tanstack/react-query";
import { Category } from "../interfaces";
import { BsFillCalendarCheckFill, BsCalendarWeekFill } from "react-icons/bs";
import { MdOutlineRemoveDone } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import CreateCategory from "./CreateCategory";

const SideBar = () => {
  const navigate = useNavigate();
  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const handleNavigate = (userId: number) => {
    navigate(`/tas/${userId}`, { state: { from: "dashboard" } });
  };

  const bgGray = useColorModeValue("bgGrayLight", "bgGrayDark");
  const text = useColorModeValue("textLight", "textDark");

  return (
    <Box w="300px" px="50px" py="50px" bgColor={bgGray} color={text}>
      <Text as="b" mb="20px">
        Hi You
      </Text>
      <Stack spacing={"20px"} mt={"50px"}>
        <Link
          onClick={() => navigate("/")}
          display={"flex"}
          gap="20px"
          alignItems={"center"}
          _hover={{ textDecoration: "none" }}
          fontSize="18px"
        >
          <BsFillCalendarCheckFill color="green" /> Today
        </Link>
        <Link
          onClick={() => navigate("/upcoming")}
          display={"flex"}
          gap="20px"
          alignItems={"center"}
          _hover={{ textDecoration: "none" }}
          fontSize="18px"
        >
          <BsCalendarWeekFill color="#3182CE" /> Upcoming
        </Link>
        <Link
          onClick={() => navigate("/notDone")}
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
                _focus={{
                  bgcolor: "none",
                  border: "none",
                  outline: "none",
                }}
                _hover={{ bgcolor: "none", border: "none" }}
                pl="0px"
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
              gap="10px"
              pl="0px"
            >
              {categoriesQuery.data?.map((cat: Category) => (
                <Link
                  onClick={() => navigate(`/tasks/${cat.name}/${cat.id}`)}
                  key={cat.id}
                  _hover={{ textDecoration: "none" }}
                  fontSize="18px"
                  display={"flex"}
                  gap="10px"
                >
                  <Box>{cat.emoji}</Box>
                  {cat.name}
                </Link>
              ))}
              <CreateCategory />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Stack>
    </Box>
  );
};

export default SideBar;
