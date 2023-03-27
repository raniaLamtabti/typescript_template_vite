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
import { Category } from "../interfaces";

const CreateTask = () => {
  const titleRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const cateRef = React.useRef() as React.MutableRefObject<HTMLSelectElement>;
  const dateRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const timeRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;

  const queryClient = useQueryClient();

  const [urgent, setUrgent] = React.useState(false);
  const [urgentVal, setUrgentVal] = React.useState(false);

  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: (data) => {
      queryClient.setQueryData(["tasks", data.id], data);
      queryClient.invalidateQueries(["tasks"]);
    },
  });

  function handleSubmitTask(e: { preventDefault: () => void }) {
    e.preventDefault();
    const date = new Date(dateRef.current.value);
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
  }
  const handleInputChange = () => {
    setUrgent(!urgent);
    setUrgentVal(!urgentVal);
  };
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Flex gap="30px" wrap="wrap">
        <Button
          onClick={onOpen}
          bgColor={"gray.50"}
          color={"blue"}
          border="none"
          _hover={{
            background: "gray.50",
            color: "blue",
          }}
        >
          + Task
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
                  {categoriesQuery.data?.map((cat: Category) => (
                    <option value={cat.id} key={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </Select>
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
                bgColor={"blue"}
                color={"white"}
                _hover={{
                  background: "gray.50",
                  color: "blue",
                }}
                type={"submit"}
              >
                {createTaskMutation.isLoading ? "Loading..." : "Add"}
              </Button>
              <Button
                bgColor={"pink.400"}
                color={"white"}
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

export default CreateTask;
