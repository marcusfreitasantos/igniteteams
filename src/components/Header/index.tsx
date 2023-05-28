import React from "react";
import * as S from "./styles";
import logoImg from "@assets/logo.png";

type Props = {
  showBackButton?: boolean;
};

export default function Header({ showBackButton = false }: Props) {
  return (
    <S.Container>
      {showBackButton && (
        <S.BackButton>
          <S.BackIcon />
        </S.BackButton>
      )}

      <S.Logo source={logoImg} />
    </S.Container>
  );
}
