import { useState, useEffect, useRef } from "react";
import { FlatList, Alert, TextInput } from "react-native";
import * as S from "./styles";
import Header from "@components/Header";
import Highlight from "@components/Highlight";
import { ButtonIcon } from "@components/ButtonIcon";
import { Input } from "@components/Input";
import { Filter } from "@components/Filter";
import { PlayerCard } from "@components/PlayerCard";
import ListEmpty from "@components/ListEmpty";
import { Button } from "@components/Button";
import { useRoute, useNavigation } from "@react-navigation/native";
import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { AppError } from "@utils/AppError";
import { playersGetByGroupAndTeam } from "@storage/player/playersGetByGroupAndTeam";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";
import Loading from "@components/Loading";

type RouteParams = {
  group: string;
};

export function NewPlayers() {
  const route = useRoute();
  const { group } = route.params as RouteParams;
  const [teamsList, setTeamsList] = useState(["Time A", "Time B"]);
  const [currentTeam, setCurrentTeam] = useState("Time A");
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
  const [playerName, setNewPlayerName] = useState("");
  const newPlayerNameInputRef = useRef<TextInput>(null);
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(true);

  async function fetchPlayersByTeam() {
    try {
      const playersByTeam = await playersGetByGroupAndTeam(group, currentTeam);
      setPlayers(playersByTeam);
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Pessoas",
        "Não foi possível carregar as pessoas do time selecionado."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleAddPlayer() {
    if (playerName.trim().length === 0) {
      return Alert.alert("Novo membro.", "Informe o nome da pessoa!");
    }

    const newPlayer = {
      name: playerName,
      team: currentTeam,
    };

    try {
      await playerAddByGroup(newPlayer, group);
      fetchPlayersByTeam();
      newPlayerNameInputRef.current?.blur();
      setNewPlayerName("");
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert("Nova pessoa", error.message);
      } else {
        console.log(error);
        Alert.alert("Nova pessoa", "Não foi possível adicionar!");
      }
    }
  }

  async function handlePlayerRemove(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group);
      fetchPlayersByTeam();
    } catch (error) {
      console.log(error);
      Alert.alert("Remover Pessoa", "Não foi possível remover essa pessoa.");
    }
  }

  async function groupRemove() {
    try {
      await groupRemoveByName(group);
      navigation.navigate("groups");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleGroupRemove() {
    Alert.alert("Remover", "Desseja remover o grupo?", [
      { text: "Sim", onPress: () => groupRemove() },
      { text: "Não", style: "cancel" },
    ]);
  }

  useEffect(() => {
    fetchPlayersByTeam();
  }, [currentTeam]);

  return (
    <S.Container>
      <Header showBackButton />

      <Highlight title={group} subtitle="Adicione a galera e separe os times" />

      <S.Form>
        <Input
          inputRef={newPlayerNameInputRef}
          placeholder="Nome da pessoa"
          value={playerName}
          autoCorrect={false}
          onChangeText={(t) => setNewPlayerName(t)}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />

        <ButtonIcon icon="add" onPress={handleAddPlayer} />
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

      {isLoading ? (
        <Loading />
      ) : (
        <FlatList
          data={players}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <PlayerCard
              name={item.name}
              onRemove={() => handlePlayerRemove(item.name)}
            />
          )}
          ListEmptyComponent={() => (
            <ListEmpty message="Não há pessoas nesse grupo." />
          )}
          contentContainerStyle={[
            { paddingBottom: 100 },
            players.length === 0 && { flex: 1 },
          ]}
        />
      )}

      <Button
        title="Remover Turma"
        type="SECONDARY"
        onPress={handleGroupRemove}
      />
    </S.Container>
  );
}
