import { useState } from "react";
import Header from "@components/Header";
import * as S from "./styles";
import Highlight from "@components/Highlight";
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { useNavigation } from "@react-navigation/native";

export function NewGroup() {
  const [group, setGroup] = useState("");
  const navigation = useNavigation();

  const handleNew = () => {
    navigation.navigate("players", { group });
  };

  return (
    <S.Container>
      <Header showBackButton />
      <S.Content>
        <S.Icon />
        <Highlight
          title="Nova turma"
          subtitle="Crie a turma para adicionar as pessoas"
        />
        <Input placeholder="Nova turma" onChangeText={setGroup} />
        <Button title="Criar" onPress={handleNew} />
      </S.Content>
    </S.Container>
  );
}
