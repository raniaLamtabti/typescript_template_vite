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
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { createCategory } from "../api/categories";
import { AiOutlinePlus } from "react-icons/Ai";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

const CreateCategory = () => {
  const nameRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;
  const colorRef = React.useRef() as React.MutableRefObject<HTMLSelectElement>;

  const queryClient = useQueryClient();

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
      emoji: currentEmoji,
      id: Date.now(),
    });
  }
  const { isOpen, onOpen, onClose } = useDisclosure();

  const bgGray = useColorModeValue("bgGrayLight", "bgGrayDark");
  const bg = useColorModeValue("gray.100", "bgDark");
  const text = useColorModeValue("textLight", "textDark");

  const [isPickerVisible, setPickerVisible] = useState(false);
  const [currentEmoji, setCurrentEmoji] = useState(null);

  return (
    <Box>
      <Flex gap="30px" wrap="wrap">
        <Button
          onClick={onOpen}
          bgColor={"transparent"}
          border="none"
          display="flex"
          gap="10px"
          p="0px"
          fontWeight={"normal"}
          fontSize={"18px"}
          _hover={{
            background: "transparent",
            color: text,
          }}
        >
          <Text color={"primary"} fontSize="24px">
            <AiOutlinePlus />
          </Text>
          <Text color={text}>New Category</Text>
        </Button>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        {createCategoryMutation.isError &&
          JSON.stringify(createCategoryMutation.error)}
        <form onSubmit={handleSubmitCategory}>
          <ModalContent bg={bgGray}>
            <ModalHeader>Add Category</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack spacing={"20px"}>
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
                  <Button onClick={() => setPickerVisible(!isPickerVisible)}>
                    Open Picker {currentEmoji || ""}
                  </Button>
                  <Box display={isPickerVisible ? "block" : "none"}>
                    <Picker
                      data={data}
                      previewPosition="none"
                      onEmojiSelect={(e) => {
                        setCurrentEmoji(e.native);
                        setPickerVisible(isPickerVisible);
                      }}
                    />
                  </Box>
                </FormControl>
              </Stack>
            </ModalBody>

            <ModalFooter>
              <Button
                mr={3}
                bgColor={"primary"}
                color={"text"}
                _hover={{
                  background: "#F9F9F9",
                  color: "primary",
                }}
                type={"submit"}
              >
                {createCategoryMutation.isLoading ? "Loading..." : "Add"}
              </Button>
              <Button
                bgColor={bg}
                color={text}
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
