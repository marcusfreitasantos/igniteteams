import { useState } from "react";
import { FlatList } from "react-native";
import * as S from "./styles";
import Header from "@components/Header";
import Highlight from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard";
import ListEmpty from "@components/ListEmpty";
import { Button } from "@components/Button";
import { useRoute } from "@react-navigation/native";

type RouteParams = {
  group: string;
};

export function NewPlayers() {
  const route = useRoute();
  const { group } = route.params as RouteParams;
  const [teamsList, setTeamsList] = useState(["Time A", "Time B", "Time C"]);
  const [currentTeam, setCurrentTeam] = useState("Time A");
  const [players, setPlayers] = useState(["Marcus", "Aninha"]);

  return (
    <S.Container>
      <Header showBackButton />

      <Highlight title={group} subtitle="Adicione a galera e separe os times" />

      <S.Form>
        <Input placeholder="Nome da pessoa" autoCorrect={false} />

        <ButtonIcon icon="add" />
      </S.Form>

      <S.ListHeader>
        <FlatList
          data={teamsList}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              onPress={() => setCurrentTeam(item)}
              isActive={item === currentTeam}
            />
          )}
          horizontal
          ListEmptyComponent={() => (
            <ListEmpty message="Crie seu primeiro grupo" />
          )}
        />

        <S.NumberOfPlayers>{players.length}</S.NumberOfPlayers>
      </S.ListHeader>

      <FlatList
        data={players}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <PlayerCard name={item} onRemove={() => console.log(item)} />
        )}
        ListEmptyComponent={() => (
          <ListEmpty message="Não há pessoas nesse grupo." />
        )}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 },
        ]}
      />

      <Button title="Remover Turma" type="SECONDARY" />
    </S.Container>
  );
}
