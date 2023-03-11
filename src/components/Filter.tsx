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

const categoriesQuery = useQuery({
  queryKey: ["categories"],
  queryFn: getCategories,
});

const Filter = () => {
  return (
    <Flex gap="30px" wrap="wrap">
      <FormControl w={"max-content"}>
        <FormLabel>
          <Text as="b">Category</Text>
        </FormLabel>
        <Select placeholder="Select option">
          {categoriesQuery.data.map((cat: any) => (
            <option value={cat.id}>{cat.name}</option>
          ))}
        </Select>
      </FormControl>
      <FormControl w={"max-content"}>
        <FormLabel htmlFor="isChecked">
          <Text as="b">Urgent</Text>
        </FormLabel>
        <Switch id="isChecked" />
      </FormControl>
      <FormControl w={"max-content"}>
        <FormLabel>
          <Text as="b">Date</Text>
        </FormLabel>
        <Input type="date" />
      </FormControl>
      <FormControl w={"max-content"}>
        <FormLabel>
          <Text as="b">Time</Text>
        </FormLabel>
        <Input type="time" />
      </FormControl>
    </Flex>
  );
};

export default Filter;
