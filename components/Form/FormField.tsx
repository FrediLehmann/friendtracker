import {
  chakra,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
} from "@chakra-ui/react";
import { useField } from "formik";

function FormField({
  name,
  label,
  type,
  placeholder,
  helperText,
  helperPosition,
  isRequired = false,
  hideLabel = false,
  leftAddon,
  rightAddon,
  ...props
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  helperText?: string;
  helperPosition?: "before" | "after";
  isRequired?: boolean;
  hideLabel?: boolean;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
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
      <InputGroup>
        {leftAddon && <InputLeftAddon px="0">{leftAddon}</InputLeftAddon>}
        <Input
          id={name}
          type={type}
          placeholder={placeholder}
          {...field}
          {...props}
        />
        {rightAddon && <InputRightAddon px="0">{rightAddon}</InputRightAddon>}
      </InputGroup>
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
