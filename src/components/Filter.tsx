import {
  Flex,
  Select,
  FormControl,
  FormLabel,
  Switch,
  Input,
  Text,
} from "@chakra-ui/react";
import { getCategories } from "../api/categories";
import { useQuery } from "@tanstack/react-query";
import { Category } from "../interfaces";
import { useFilterStore } from "../store";

const Filter = () => {
  const changeCategory = useFilterStore((state) => state.changeCategory);
  const changeUrgent = useFilterStore((state) => state.changeUrgent);
  const changeDate = useFilterStore((state) => state.changeDate);
  const categoryId = useFilterStore((state) => state.categoryId);
  const isUrgent = useFilterStore((state) => state.isUrgent);
  const date = useFilterStore((state) => state.date);
  const categoriesQuery = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  return (
    <Flex gap="30px" wrap="wrap">
      <FormControl w={"max-content"}>
        <FormLabel>
          <Text as="b">Category</Text>
        </FormLabel>
        <Select
          placeholder="Select option"
          onChange={(e) => {
            changeCategory(
              e.target.value == "all" ? undefined : parseInt(e.target.value)
            );
          }}
        >
          <option value="all" selected={categoryId == undefined ? true : false}>
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
          <option value="all" selected={isUrgent == undefined ? true : false}>
            all
          </option>
          <option value="true" selected={isUrgent == true ? true : false}>
            True
          </option>
          <option value="false" selected={isUrgent == false ? true : false}>
            false
          </option>
        </Select>
      </FormControl>
      <FormControl w={"max-content"}>
        <FormLabel>
          <Text as="b">Date</Text>
        </FormLabel>
        <Input
          type="date"
          value={date ? new Date(date).toISOString().substr(0, 10) : ""}
          onChange={(e) =>
            changeDate(
              e.target.value == ""
                ? undefined
                : new Date(e.target.value).toISOString()
            )
          }
        />
      </FormControl>
    </Flex>
  );
};

export default Filter;
