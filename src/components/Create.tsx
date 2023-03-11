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
import React, { useRef } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getCategories } from "../api/categories";
import { createTask } from "../api/tasks";

const Create = () => {
  const titleRef = React.createRef();
  const cateRef = React.createRef();
  const dateRef = React.createRef();
  const timeRef = React.createRef();
  const urgentRef = React.createRef();

  const queryClient = useQueryClient();

  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: (data) => {
      queryClient.setQueryData(["tasks", data.id], data);
      queryClient.invalidateQueries(["tasks"], { exact: true });
    },
  });

  function handleSubmitTask(e) {
    e.preventDefault();
    console.log("hi");
    createTaskMutation.mutate({
      title: titleRef.current.value,
      categoryId: cateRef.current.value,
      date: dateRef.current.value,
      time: timeRef.current.value,
    });
  }

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
                <Switch id="isChecked" />
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
              >
                Add
              </Button>
              <Button
                bgColor={"brand.accent"}
                color={"brand.white"}
                onClick={onClose}
                disabled={createTaskMutation.isLoading}
              >
                {createTaskMutation.isLoading ? "Loading..." : "Create"}
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
