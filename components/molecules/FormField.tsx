import {
  chakra,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useField } from "formik";

function FormField({
  name = "email",
  label,
  isRequired = false,
  ...props
}: {
  name: string;
  label: string;
  isRequired: boolean;
}) {
  const [field, meta] = useField({ name, ...props });

  return (
    <FormControl
      isInvalid={!!meta.error && !!meta.touched}
      isRequired={isRequired}
    >
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input id={name} {...field} {...props} />
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
}

export default chakra(FormField);
