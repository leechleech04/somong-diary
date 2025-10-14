import DreamListEmpty from '@/components/DreamListEmpty';
import DreamListItem from '@/components/DreamListItem';
import { DreamDiaryType } from '@/types/dream';
import { getAccessTokenFromMemory } from '@/utils/authToken';
import { colors } from '@/utils/colors';
import { BasicContainer } from '@/utils/utilComponents';
import { Ionicons } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import axios from 'axios';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import styled from 'styled-components/native';

const List = () => {
  const router = useRouter();

  const [dreamList, setDreamList] = useState<DreamDiaryType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cursor, setCursor] = useState<number>(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchDreamList = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    const apiUrl = `${process.env.EXPO_PUBLIC_API_BASE_URL}/dreams/list?cursor=${cursor}`;

    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${await getAccessTokenFromMemory()}`,
        },
      });

      if (response.data.dreamDiaries.length === 0) {
        setIsLoading(false);
        return;
      }

      setDreamList((prevDreams) => [
        ...prevDreams,
        ...response.data.dreamDiaries,
      ]);

      if (response.data.nextCursor) {
        setCursor(response.data.nextCursor);
      } else {
        setHasMore(false);
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching dream list:', error);
      alert('꿈 일기 목록을 불러오는데 실패했습니다. 다시 시도해 주세요.');
    }
  }, [cursor, hasMore, isLoading]);

  useFocusEffect(
    useCallback(() => {
      setDreamList([]);
      setCursor(0);
      setHasMore(true);
      fetchDreamList();
    }, [])
  );

  return (
    <BasicContainer>
      {isLoading && dreamList.length === 0 ? (
        <ActivityIndicator color={colors.lightPurple} />
      ) : (
        <FlashList
          data={dreamList}
          renderItem={({ item }) => <DreamListItem dream={item} />}
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          ListEmptyComponent={() => <DreamListEmpty />}
          onEndReached={fetchDreamList}
          ListFooterComponent={() => {
            if (isLoading && dreamList.length > 0) {
              return <ActivityIndicator color={colors.lightPurple} />;
            } else {
              return null;
            }
          }}
        />
      )}
      <WriteDreamButton
        onPress={() => {
          router.push('/(tabs)/diary/new');
        }}
      >
        <WriteDreamIcon />
      </WriteDreamButton>
    </BasicContainer>
  );
};

const WriteDreamButton = styled.Pressable`
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 32px;
  right: 24px;
  width: 64px;
  height: 64px;
  border-radius: 32px;
  background-color: ${colors.lightPurple};
`;

const WriteDreamIcon = styled(Ionicons).attrs({
  name: 'pencil',
  size: 32,
  color: colors.white,
})``;

export default List;
