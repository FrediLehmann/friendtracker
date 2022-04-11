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
  placeholder,
  helperText,
  helperPosition,
  isRequired = false,
  type,
  hideLabel = false,
  ...props
}: {
  name: string;
  label: string;
  placeholder?: string;
  helperText?: string;
  helperPosition?: "before" | "after";
  type?: string;
  hideLabel?: boolean;
  isRequired?: boolean;
}) {
  const [field, meta] = useField({ name, ...props });

  return (
    <FormControl
      isInvalid={!!meta.error && !!meta.touched}
      isRequired={isRequired}
    >
      <FormLabel htmlFor={name} hidden={hideLabel}>
        {label}
      </FormLabel>
      {helperText && helperPosition === "before" && (
        <FormHelperText fontSize={["sm", "md"]} mb="3">
          {helperText}
        </FormHelperText>
      )}
      <Input
        id={name}
        type={type}
        placeholder={placeholder}
        {...field}
        {...props}
      />
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
