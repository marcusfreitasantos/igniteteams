import { TextInputProps } from "react-native";
import * as S from "./styles";
import { useTheme } from "styled-components";

export function Input({ ...rest }: TextInputProps) {
  const { COLORS } = useTheme();
  return <S.Container placeholderTextColor={COLORS.GRAY_300} {...rest} />;
}
