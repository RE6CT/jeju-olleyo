'use client';

import PlaceModal from '@/components/features/plan/place-modal';
import PlanCardModal from '@/components/features/plan/plan-card-modal';
import { getBrowserClient } from '@/lib/supabase/client';
import { useState, useEffect } from 'react';

type Place = {
  address: string;
  category: string;
  content_type_id: number;
  id: number;
  image: string | null;
  lat: number;
  lng: number;
  place_id: number;
  title: string;
};

const TestPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState<
    'success' | 'isBack' | 'select' | 'isDelete'
  >('success');

  const [place, setPlace] = useState<Place | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlace = async () => {
      const supabase = getBrowserClient();
      const { data, error } = await supabase
        .from('places')
        .select('*')
        .eq('place_id', 2850913)
        .single();

      if (error) {
        setError('장소 불러오기 실패');
      } else {
        setPlace(data);
      }
    };

    fetchPlace();
  }, []);

  const handleOpenModal = (selectedMode: typeof mode) => {
    setMode(selectedMode);
    setModalOpen(true);
  };

  return (
    <>
      <div>
        플레이스모달테스트
        <div>
          {error && <div>{error}</div>}
          {place && <PlaceModal place={place} />}
        </div>
      </div>

      <div>
        알람모달테스트
        <div>
          <div className="flex gap-4 pt-20">
            <button onClick={() => handleOpenModal('success')}>저장하기</button>
            <button onClick={() => handleOpenModal('isBack')}>돌아가기</button>
            <button onClick={() => handleOpenModal('select')}>
              날짜선택 모달
            </button>
            <button onClick={() => handleOpenModal('isDelete')}>삭제</button>
          </div>

          <PlanCardModal
            open={modalOpen}
            onOpenChange={setModalOpen}
            mode={mode}
            onConfirm={() => setModalOpen(false)}
            onCancel={() => setModalOpen(false)}
          />
        </div>
      </div>
    </>
  );
};

export default TestPage;
