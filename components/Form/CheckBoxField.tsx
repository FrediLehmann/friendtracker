import {
  chakra,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/react";
import { useField } from "formik";

function CheckBoxField({
  name,
  label,
  helperText,
  helperPosition,
  showLabel = false,
  isRequired = false,
  children,
  ...props
}: {
  name: string;
  label: string;
  helperText?: string;
  helperPosition?: "before" | "after";
  showLabel?: boolean;
  isRequired?: boolean;
  children: any;
}) {
  const [field, meta] = useField({ name, ...props });

  return (
    <FormControl
      isInvalid={!!meta.error && !!meta.touched}
      isRequired={isRequired}
    >
      <FormLabel htmlFor={name} hidden={!showLabel}>
        {label}
      </FormLabel>
      {helperText && helperPosition === "before" && (
        <FormHelperText fontSize={["sm", "md"]} mb="3">
          {helperText}
        </FormHelperText>
      )}
      <Checkbox {...field} {...props}>
        {children}
      </Checkbox>
      {helperText && helperPosition === "after" && (
        <FormHelperText fontSize={["sm", "md"]} mb="3">
          {helperText}
        </FormHelperText>
      )}
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
}

export default chakra(CheckBoxField);
