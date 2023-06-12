import React from "react";
import * as S from "./styles";
import logoImg from "@assets/logo.png";
import { useNavigation } from "@react-navigation/native";

type Props = {
  showBackButton?: boolean;
};

export default function Header({ showBackButton = false }: Props) {
  const navigation = useNavigation();

  const handleBackToHome = () => {
    navigation.navigate("groups");
  };

  return (
    <S.Container>
      {showBackButton && (
        <S.BackButton onPress={handleBackToHome}>
          <S.BackIcon />
        </S.BackButton>
      )}

      <S.Logo source={logoImg} />
    </S.Container>
  );
}
