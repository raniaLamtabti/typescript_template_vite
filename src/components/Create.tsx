import {
  Flex,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Text,
  FormControl,
  FormLabel,
  Input,
  Select,
  Stack,
  Switch,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getCategories } from "../api/categories";
import { createTask } from "../api/tasks";

const Create = () => {
  const titleRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const cateRef = React.useRef() as React.MutableRefObject<HTMLSelectElement>;
  const dateRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const timeRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const urgentRef = React.useRef() as React.MutableRefObject<HTMLScriptElement>;

  const queryClient = useQueryClient();

  const [urgent, setUrgent] = React.useState(false);
  const [urgentVal, setUrgentVal] = React.useState(false);

  console.log(urgentRef.valueOf);
  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  console.log("urgent 1:", urgent);
  console.log("urgentVal 1:", urgentVal);

  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: (data) => {
      queryClient.setQueryData(["tasks", data.id], data);
      queryClient.invalidateQueries(["tasks"], { exact: true });
    },
  });

  function handleSubmitTask(e: { preventDefault: () => void }) {
    e.preventDefault();
    const date = new Date(dateRef.current.value);
    console.log("hi");
    createTaskMutation.mutate({
      title: titleRef.current.value,
      categoryId: parseInt(cateRef.current.value),
      date: date,
      time: timeRef.current.value,
      id: Date.now(),
      isDone: false,
      isUrgent: urgent,
    });
    setUrgent(false);
    setUrgentVal(false);
    console.log("urgent3:", urgent);
    console.log("urgentVal3:", urgentVal);
  }
  const handleInputChange = () => {
    setUrgent(!urgent);
    setUrgentVal(!urgentVal);
    console.log("urgent:", urgent);
    console.log("urgentVal:", urgentVal);
  };
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Flex gap="30px" wrap="wrap">
        <Button
          onClick={onOpen}
          bgColor={"brand.primary"}
          color={"brand.white"}
          border="none"
          _hover={{
            background: "brand.gray",
            color: "brand.primary",
          }}
        >
          Add Task
        </Button>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        {createTaskMutation.isError && JSON.stringify(createTaskMutation.error)}
        <form onSubmit={handleSubmitTask}>
          <ModalContent>
            <ModalHeader>Add Task</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>
                  <Text as="b">Name of the task</Text>
                </FormLabel>
                <Input
                  type="text"
                  id="title"
                  ref={titleRef as React.RefObject<HTMLInputElement>}
                />
              </FormControl>
              <FormControl>
                <FormLabel>
                  <Text as="b">Category</Text>
                </FormLabel>
                <Select
                  placeholder="Select option"
                  id="category"
                  ref={cateRef as React.RefObject<HTMLSelectElement>}
                >
                  <option value="1">Home</option>
                </Select>
                {/*<Select placeholder="Select option" ref={cateRef}>
                  {categoriesQuery.data.map((cat: any) => (
                    <option value={cat.id}>{cat.name}</option>
                  ))}
                  </Select>*/}
              </FormControl>
              <FormControl>
                <FormLabel>
                  <Text as="b">Date</Text>
                </FormLabel>
                <Input
                  type="date"
                  id="date"
                  ref={dateRef as React.RefObject<HTMLInputElement>}
                />
              </FormControl>
              <FormControl>
                <FormLabel>
                  <Text as="b">Time</Text>
                </FormLabel>
                <Input
                  type="time"
                  id="time"
                  ref={timeRef as React.RefObject<HTMLInputElement>}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="isChecked">
                  <Text as="b">Urgent</Text>
                </FormLabel>
                <Switch
                  id="isChecked"
                  isChecked={urgentVal}
                  onChange={handleInputChange}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                mr={3}
                bgColor={"brand.primary"}
                color={"brand.white"}
                _hover={{
                  background: "brand.gray",
                  color: "brand.primary",
                }}
                type={"submit"}
              >
                {createTaskMutation.isLoading ? "Loading..." : "Close"}
              </Button>
              <Button
                bgColor={"brand.accent"}
                color={"brand.white"}
                onClick={onClose}
                disabled={createTaskMutation.isLoading}
              >
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </Box>
  );
};

export default Create;
