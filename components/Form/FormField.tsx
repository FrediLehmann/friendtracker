import {
  chakra,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useField } from "formik";

function FormField({
  name,
  label,
  helperText,
  helperPosition,
  isRequired = false,
  type,
  ...props
}: {
  name: string;
  label: string;
  helperText?: string;
  helperPosition?: "before" | "after";
  type?: string;
  isRequired?: boolean;
}) {
  const [field, meta] = useField({ name, ...props });

  return (
    <FormControl
      isInvalid={!!meta.error && !!meta.touched}
      isRequired={isRequired}
    >
      <FormLabel htmlFor={name}>{label}</FormLabel>
      {helperText && helperPosition === "before" && (
        <FormHelperText fontSize={["sm", "md"]} mb="3">
          {helperText}
        </FormHelperText>
      )}
      <Input id={name} type={type} {...field} {...props} />
      {helperText && helperPosition === "after" && (
        <FormHelperText fontSize={["sm", "md"]} mb="3">
          {helperText}
        </FormHelperText>
      )}
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
}

export default chakra(FormField);
