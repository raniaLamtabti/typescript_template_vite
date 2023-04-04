import {
  Select,
  FormControl,
  FormLabel,
  Button,
  Input,
  Text,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { getCategories } from "../api/categories";
import { useQuery } from "@tanstack/react-query";
import { Category } from "../interfaces";
import { useFilterStore } from "../store";
import { BiFilterAlt } from "react-icons/Bi";
import { useLocation } from "react-router-dom";
import React, { useEffect } from "react";
import { queryClient } from "../queryClient";

const Filter = () => {
  const changeCategory = useFilterStore((state) => state.changeCategory);
  const changeUrgent = useFilterStore((state) => state.changeUrgent);
  const changeDate = useFilterStore((state) => state.changeDate);
  const categoryId = useFilterStore((state) => state.categoryId);
  const isUrgent = useFilterStore((state) => state.isUrgent);
  const date = useFilterStore((state) => state.date);
  const resetFilter = useFilterStore((state) => state.reset);

  const reset = () => {
    resetFilter();
    queryClient.invalidateQueries(["tasks"]);
  };

  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const bgGray = useColorModeValue("bgGrayLight", "bgGrayDark");
  const text = useColorModeValue("textLight", "textDark");

  const { pathname } = useLocation();
  useEffect(() => {
    reset();
  }, [pathname]);

  return (
    <>
      <Button ref={btnRef} colorScheme="gray" onClick={onOpen}>
        <BiFilterAlt />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bg={bgGray} color={text}>
          <DrawerCloseButton />
          <DrawerHeader>Filter</DrawerHeader>

          <DrawerBody>
            <Stack spacing={"20px"}>
              <FormControl w={"max-content"}>
                <FormLabel>
                  <Text as="b">Category</Text>
                </FormLabel>
                <Select
                  placeholder="Select option"
                  onChange={(e) => {
                    changeCategory(
                      e.target.value == "all"
                        ? undefined
                        : parseInt(e.target.value)
                    );
                  }}
                >
                  <option
                    value="all"
                    selected={categoryId == undefined ? true : false}
                  >
                    all
                  </option>
                  {categoriesQuery.data?.map((cat: Category) => (
                    <option
                      value={cat.id}
                      key={cat.id}
                      selected={cat.id == categoryId ? true : false}
                    >
                      {cat.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl w={"max-content"}>
                <FormLabel htmlFor="isChecked">
                  <Text as="b">Urgent</Text>
                </FormLabel>
                <Select
                  placeholder="Select option"
                  onChange={(e) =>
                    changeUrgent(
                      e.target.value == "true"
                        ? true
                        : e.target.value == "false"
                        ? false
                        : undefined
                    )
                  }
                >
                  <option
                    value="all"
                    selected={isUrgent == undefined ? true : false}
                  >
                    all
                  </option>
                  <option
                    value="true"
                    selected={isUrgent == true ? true : false}
                  >
                    True
                  </option>
                  <option
                    value="false"
                    selected={isUrgent == false ? true : false}
                  >
                    false
                  </option>
                </Select>
              </FormControl>
              <FormControl
                w={"max-content"}
                display={
                  pathname != "/" && pathname != "/upcoming" ? "block" : "none"
                }
              >
                <FormLabel>
                  <Text as="b">Date</Text>
                </FormLabel>
                <Input
                  type="date"
                  value={date ? new Date(date).toISOString() : ""}
                  onChange={(e) =>
                    changeDate(
                      e.target.value == ""
                        ? undefined
                        : new Date(e.target.value).toISOString()
                    )
                  }
                />
              </FormControl>
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={(e) => {
                e.preventDefault();
                reset();
              }}
            >
              Reset
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Filter;
