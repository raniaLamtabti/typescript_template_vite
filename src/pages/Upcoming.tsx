import {
  Stack,
  Box,
  Text,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useColorModeValue,
} from "@chakra-ui/react";
import Task from "../components/Task";
import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../api/tasks";
import { Task as TaskInterface, Category } from "../interfaces";
import { useFilterStore } from "../store";
import { getCategories } from "../api/categories";
import TasksByDate from "../components/TasksByDate";

const Upcoming = () => {
  // Tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  const isoStringTomorrow = tomorrow.toISOString();

  // After Tomorrow
  const afterTomorrow = new Date();
  afterTomorrow.setDate(afterTomorrow.getDate() + 2);
  afterTomorrow.setHours(0, 0, 0, 0);
  const isoStringAfterTomorrow = afterTomorrow.toISOString();

  return (
    <Stack spacing={"50px"} h="-webkit-fit-content">
      <TasksByDate date={isoStringTomorrow} label="Tomorrow" />
      <TasksByDate date={isoStringAfterTomorrow} label="After Tomorrow" />
    </Stack>
  );
};

export default Upcoming;
