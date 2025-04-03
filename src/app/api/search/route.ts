import { NextResponse } from 'next/server';

export async function GET() {
  // 이달의 챔피언 키값 불러오기
  const rotationsRes = await fetch(
    'https://br1.api.riotgames.com/lol/platform/v3/champion-rotations',
    {
      headers: {
        'X-Riot-Token': process.env.NEXT_PUBLIC_RIOT_API_KEY!,
      },
    },
  );
  const rotationData = await rotationsRes.json();
  const championIds: Array<number> = rotationData.freeChampionIds;

  // 챔피언 데이터 불러오기
  const ddragonRes = await fetch(
    'https://ddragon.leagueoflegends.com/cdn/15.5.1/data/ko_KR/champion.json',
  );
  const ddragonData = await ddragonRes.json();
  const allChampions = Object.values(ddragonData.data) as Champion[];

  // 불러온 챔피언 데이터에서 일치하는 키값 골라내기
  const championInfo = championIds
    .map((champId) => {
      const selectedChampion = allChampions.find(
        (champ) => champ.key === String(champId),
      );
      if (selectedChampion) {
        return {
          key: selectedChampion.key,
          id: selectedChampion.id,
          name: selectedChampion.name,
          title: selectedChampion.title,
          image: selectedChampion.image.full,
        };
      }
      return null;
    })
    .filter((champ) => champ !== null);

  return NextResponse.json(championInfo);
}
