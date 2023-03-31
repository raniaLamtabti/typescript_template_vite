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

const Dashboard = () => {
  const dateTime = new Date();
  // Today
  dateTime.setHours(0, 0, 0, 0);
  const isoString = dateTime.toISOString();

  const filter = useFilterStore((state) => {
    const filterObj = {
      categoryId: state.categoryId,
      date: isoString,
      isUrgent: state.isUrgent,
    };
    return filterObj;
  });

  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const tasksQuery = useQuery({
    queryKey: ["tasks", filter],
    queryFn: () => getTasks(filter),
  });

  const tasksCategories = tasksQuery.data?.map(
    (task: TaskInterface) => task.categoryId
  );
  const uniqueSet = new Set(tasksCategories);
  const uniqueCategories = Array.from(uniqueSet);

  if (tasksQuery.status === "loading") return <h1>Loading...</h1>;
  if (tasksQuery.status === "error") {
    return <h1>{JSON.stringify(tasksQuery.error)}</h1>;
  }

  const text = useColorModeValue("textLight", "textDark");
  return (
    // Today
    <Stack spacing={"20px"} h="-webkit-fit-content">
      <Heading color={text}>Today Tasks</Heading>
      <Accordion defaultIndex={[0]} allowMultiple>
        {categoriesQuery.data
          ?.filter((cat: Category) => uniqueCategories.includes(cat.id))
          .map((cat: Category) => (
            <AccordionItem key={cat.id}>
              <h2>
                <AccordionButton
                  _focus={{
                    bgcolor: "none",
                    border: "none",
                    outline: "none",
                  }}
                  _hover={{ bgcolor: "none", border: "none" }}
                >
                  <Box as="span" flex="1" textAlign="left">
                    <Text as="b" fontSize={"20px"}>
                      {cat.name}
                    </Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {tasksQuery.data
                  .filter((task: TaskInterface) => task.categoryId == cat.id)
                  .map((task: TaskInterface) => (
                    <Task
                      key={task.id}
                      idTask={task.id}
                      state={task.isUrgent}
                      name={task.title}
                      catColor={task.categoryId}
                      cat={task.categoryId}
                      time={task.time}
                      date={task.date}
                      done={task.isDone}
                    />
                  ))}
              </AccordionPanel>
            </AccordionItem>
          ))}
      </Accordion>
    </Stack>

    // Upcoming
    // <Stack spacing={"50px"} h="-webkit-fit-content" overflowY={"scroll"}>
    //   <Stack spacing={"20px"} h="-webkit-fit-content" overflowY={"scroll"}>
    //     <Heading color={"blue"}>Tomorrow</Heading>
    //     <Accordion defaultIndex={[0]} allowMultiple>
    //       {categoriesQuery.data?.map((cat: Category) => (
    //         <AccordionItem key={cat.id}>
    //           <h2>
    //             <AccordionButton
    //               _focus={{ bgcolor: "none", border: "none", outline: "none" }}
    //               _hover={{ bgcolor: "none", border: "none" }}
    //             >
    //               <Box as="span" flex="1" textAlign="left">
    //                 <Text as="b" fontSize={"20px"}>
    //                   {cat.name}
    //                 </Text>
    //               </Box>
    //               <AccordionIcon />
    //             </AccordionButton>
    //           </h2>
    //           <AccordionPanel pb={4}>
    //             {tasksQuery.data
    //               .filter(
    //                 (task: TaskInterface) => task.date == isoStringTomorrow
    //               )
    //               .filter((task: TaskInterface) => task.categoryId == cat.id)
    //               .map((task: TaskInterface) => (
    //                 <Task
    //                   key={task.id}
    //                   idTask={task.id}
    //                   state={task.isUrgent}
    //                   name={task.title}
    //                   catColor={task.categoryId}
    //                   cat={task.categoryId}
    //                   time={task.time}
    //                   done={task.isDone}
    //                 />
    //               ))}
    //           </AccordionPanel>
    //         </AccordionItem>
    //       ))}
    //     </Accordion>
    //   </Stack>
    //   <Stack spacing={"20px"} h="-webkit-fit-content" overflowY={"scroll"}>
    //     <Heading color={"blue"}>After Tomorrow</Heading>
    //     <Accordion defaultIndex={[0]} allowMultiple>
    //       {categoriesQuery.data?.map((cat: Category) => (
    //         <AccordionItem key={cat.id}>
    //           <h2>
    //             <AccordionButton
    //               _focus={{ bgcolor: "none", border: "none", outline: "none" }}
    //               _hover={{ bgcolor: "none", border: "none" }}
    //             >
    //               <Box as="span" flex="1" textAlign="left">
    //                 <Text as="b" fontSize={"20px"}>
    //                   {cat.name}
    //                 </Text>
    //               </Box>
    //               <AccordionIcon />
    //             </AccordionButton>
    //           </h2>
    //           <AccordionPanel pb={4}>
    //             {tasksQuery.data
    //               .filter(
    //                 (task: TaskInterface) => task.date == isoStringAfterTomorrow
    //               )
    //               .filter((task: TaskInterface) => task.categoryId == cat.id)
    //               .map((task: TaskInterface) => (
    //                 <Task
    //                   key={task.id}
    //                   idTask={task.id}
    //                   state={task.isUrgent}
    //                   name={task.title}
    //                   catColor={task.categoryId}
    //                   cat={task.categoryId}
    //                   date={task.date}
    //                   done={task.isDone}
    //                 />
    //               ))}
    //           </AccordionPanel>
    //         </AccordionItem>
    //       ))}
    //     </Accordion>
    //   </Stack>
    // </Stack>

    // Not done
    // <Stack spacing={"50px"} h="-webkit-fit-content" overflowY={"scroll"}>
    //   <Stack spacing={"20px"} h="-webkit-fit-content" overflowY={"scroll"}>
    //     <Heading color={"blue"}>Not Done</Heading>
    //     <Accordion defaultIndex={[0]} allowMultiple>
    //       {categoriesQuery.data?.map((cat: Category) => (
    //         <AccordionItem key={cat.id}>
    //           <h2>
    //             <AccordionButton
    //               _focus={{ bgcolor: "none", border: "none", outline: "none" }}
    //               _hover={{ bgcolor: "none", border: "none" }}
    //             >
    //               <Box as="span" flex="1" textAlign="left">
    //                 <Text as="b" fontSize={"20px"}>
    //                   {cat.name}
    //                 </Text>
    //               </Box>
    //               <AccordionIcon />
    //             </AccordionButton>
    //           </h2>
    //           <AccordionPanel pb={4}>
    //             {tasksQuery.data
    //               .filter((task: TaskInterface) => task.date < isoString)
    //               .filter((task: TaskInterface) => task.categoryId == cat.id)
    //               .filter((task: TaskInterface) => task.isDone == false)
    //               .map((task: TaskInterface) => (
    //                 <Task
    //                   key={task.id}
    //                   idTask={task.id}
    //                   state={task.isUrgent}
    //                   name={task.title}
    //                   catColor={task.categoryId}
    //                   cat={task.categoryId}
    //                   date={task.date}
    //                   time={task.time}
    //                   done={task.isDone}
    //                 />
    //               ))}
    //           </AccordionPanel>
    //         </AccordionItem>
    //       ))}
    //     </Accordion>
    //   </Stack>
    // </Stack>

    //By Category
    // <Stack spacing={"50px"} h="-webkit-fit-content" overflowY={"scroll"}>
    //   <Heading color={"blue"}>Category</Heading>
    //   <Stack spacing={"20px"} h="-webkit-fit-content" overflowY={"scroll"}>
    //     {tasksQuery.data
    //       .filter((task: TaskInterface) => task.date >= isoString)
    //       .filter((task: TaskInterface) => task.categoryId == 1)
    //       .map((task: TaskInterface) => (
    //         <Task
    //           key={task.id}
    //           idTask={task.id}
    //           state={task.isUrgent}
    //           name={task.title}
    //           catColor={task.categoryId}
    //           cat={task.categoryId}
    //           date={task.date}
    //           time={task.time}
    //           done={task.isDone}
    //         />
    //       ))}
    //   </Stack>
    // </Stack>
  );
};

export default Dashboard;
