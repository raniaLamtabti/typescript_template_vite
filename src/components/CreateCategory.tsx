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
import { createCategory } from "../api/categories";
import { getColors } from "../api/colors";
import { Color } from "../interfaces";

const CreateCategory = () => {
  const nameRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const colorRef = React.useRef() as React.MutableRefObject<HTMLSelectElement>;

  const queryClient = useQueryClient();

  const colorsQuery = useQuery({
    queryKey: ["colors"],
    queryFn: getColors,
  });

  const createCategoryMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: (data) => {
      queryClient.setQueryData(["categories", data.id], data);
      queryClient.invalidateQueries(["categories"]);
    },
  });

  function handleSubmitCategory(e: { preventDefault: () => void }) {
    e.preventDefault();
    createCategoryMutation.mutate({
      name: nameRef.current.value,
      color: colorRef.current.value,
      id: Date.now(),
    });
  }
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Flex gap="30px" wrap="wrap">
        <Button
          onClick={onOpen}
          bgColor={"brand.gray"}
          color={"brand.primary"}
          border="none"
          _hover={{
            background: "brand.gray",
            color: "brand.primary",
          }}
        >
          + Category
        </Button>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        {createCategoryMutation.isError &&
          JSON.stringify(createCategoryMutation.error)}
        <form onSubmit={handleSubmitCategory}>
          <ModalContent>
            <ModalHeader>+ Category</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>
                  <Text as="b">Name of the cat</Text>
                </FormLabel>
                <Input
                  type="text"
                  id="name"
                  ref={nameRef as React.RefObject<HTMLInputElement>}
                />
              </FormControl>
              <FormControl>
                <FormLabel>
                  <Text as="b">Color</Text>
                </FormLabel>
                <Select
                  placeholder="Select option"
                  id="color"
                  ref={colorRef as React.RefObject<HTMLSelectElement>}
                >
                  {colorsQuery.data?.map((color: Color) => (
                    <option value={color.color} key={color.id}>
                      {color.color}
                    </option>
                  ))}
                </Select>
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
                {createCategoryMutation.isLoading ? "Loading..." : "Add"}
              </Button>
              <Button
                bgColor={"brand.accent"}
                color={"brand.white"}
                onClick={onClose}
                disabled={createCategoryMutation.isLoading}
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

export default CreateCategory;
