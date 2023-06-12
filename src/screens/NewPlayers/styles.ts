import { SafeAreaView } from "react-native-safe-area-context";
import styled, { css } from "styled-components/native";

export const Container = styled(SafeAreaView)`
  ${({ theme }) => css`
    flex: 1;
    background-color: ${theme.COLORS.GRAY_600};
    padding: 24px;
  `}
`;

export const Form = styled.View`
  ${({ theme }) => css`
    width: 100%;
    background-color: ${theme.COLORS.GRAY_700};
    flex-direction: row;
    justify-content: center;
    border-radius: 6px;
  `}
`;

export const ListHeader = styled.View`
  flex-direction: row;
  margin: 24px 0;
  align-items: center;
`;

export const NumberOfPlayers = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.GREEN_700};
    font-family: ${theme.FONT_FAMILY.REGULAR};
    font-size: ${theme.FONT_SIZE.SM}px;
    flex: 1;
    text-align: right;
  `}
`;
