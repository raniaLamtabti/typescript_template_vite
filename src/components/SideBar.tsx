import {
  Box,
  Flex,
  Text,
  IconButton,
  useDisclosure, //   Flex,
  Heading,
  Select,
  FormControl,
  FormLabel,
  Switch,
  Input,
  Stack,
  Link,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  border,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { getCategories } from "../api/categories";
import { getTasks } from "../api/tasks";
import { useQuery } from "@tanstack/react-query";
import { Task as TaskInterface, Category } from "../interfaces";
import { BsFillCalendarCheckFill, BsCalendarWeekFill } from "react-icons/bs";
import { MdOutlineRemoveDone } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import CreateCategory from "./CreateCategory";

import { useFilterStore } from "../store";
import React, { useState } from "react";

const SidebarContent = () => {
  const navigate = useNavigate();

  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  const filter = useFilterStore((state) => {
    const filterObj = {
      categoryId: undefined,
      date: undefined,
      isUrgent: undefined,
    };
    return filterObj;
  });

  const tasksQuery = useQuery({
    queryKey: ["tasks", filter],
    queryFn: () => getTasks(filter),
  });

  const tasksCategories = tasksQuery.data?.map(
    (task: TaskInterface) => task.categoryId
  );

  // const counts = tasksCategories.reduce(
  //   (counts: { [key: number]: number }, curr: number) => {
  //     if (!(curr in counts)) {
  //       counts[curr] = 0;
  //     }
  //     counts[curr]++;
  //     return counts;
  //   },
  //   {}
  // );

  const text = useColorModeValue("textLight", "textDark");
  const textGray = useColorModeValue("textGrayLight", "textGrayDark");
  return (
    <>
      <Stack spacing={"20px"} mt={"50px"}>
        <Stack spacing={"20px"} px="30px">
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
        </Stack>
        <Accordion allowToggle>
          <AccordionItem px="30px">
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
                  display={"flex"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  fontSize={"18px"}
                  fontWeight={"normal"}
                >
                  <Flex gap="10px">
                    <Box>{cat.emoji}</Box>
                    {cat.name}
                  </Flex>
                  {/* <Text color={textGray} fontSize={"16px"}>
                    {counts[cat.id] === undefined ? "0" : counts[cat.id]}
                  </Text> */}
                </Link>
              ))}
              <CreateCategory />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Stack>
    </>
  );
};

const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgGray = useColorModeValue("bgGrayLight", "bgGrayDark");

  return (
    <>
      <IconButton
        size="lg"
        variant="ghost"
        aria-label="Open Menu"
        icon={<HamburgerIcon />}
        onClick={onOpen}
        display={{ base: "block", md: "none" }}
        mt={"-60px"}
      />
      <Box
        h={"100vh"}
        mt={"-60px"}
        zIndex={"1"}
        bgColor={bgGray}
        display={{ base: "none", md: "block" }}
        width={{ md: "300px" }}
        pt={"50px"}
      >
        <IconButton
          aria-label="Close Menu"
          icon={<CloseIcon />}
          position="absolute"
          top={2}
          right={3}
          onClick={onClose}
          display={{ base: "block", md: "none" }}
        />
        <SidebarContent />
      </Box>
      {isOpen && (
        <Box
          bgColor={bgGray}
          position="fixed"
          top={0}
          left={0}
          bottom={0}
          zIndex={10}
          width="80%"
          height="100%"
          pt={"50px"}
        >
          <IconButton
            aria-label="Close Menu"
            icon={<CloseIcon />}
            position="absolute"
            top={2}
            right={3}
            onClick={onClose}
          />
          <SidebarContent />
        </Box>
      )}
    </>
  );
};
export default Sidebar;
