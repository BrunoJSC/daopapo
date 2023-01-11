import { Input as NativeInput, IInputProps } from "native-base";

type Props = IInputProps & {};

export function Input({ ...rest }: Props) {
  return (
    <NativeInput
      bg="gray.600"
      h={35}
      px={4}
      borderWidth={0}
      fontFamily="body"
      color="white"
      _focus={{ bg: "gray.700", borderColor: "darkBlue.600", borderWidth: 1 }}
      {...rest}
    />
  );
}
