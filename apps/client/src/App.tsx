import type { User } from "./types/user";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef, useEffect } from "react";

// 사용자 데이터 API 호출 함수 (페이지네이션)
const fetchUsers = async ({ pageParam = 1 }): Promise<User[]> => {
  const res = await fetch(
    `https://randomuser.me/api/?page=${pageParam}&results=30`
  );
  const data = await res.json();
  return data.results;
};

const App = () => {
  // 무한 스크롤을 위한 useInfiniteQuery 훅
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["users"],
      queryFn: fetchUsers,
      initialPageParam: 1,
      getNextPageParam: (_lastPage, allPages) =>
        allPages.length < 100 ? allPages.length + 1 : undefined,
    });

  const users = data?.pages.flat() ?? [];

  // 가상 스크롤: 뷰포트 참조용 ref
  const parentRef = useRef<HTMLDivElement | null>(null);

  // 가상 스크롤 Virtualizer 설정
  const rowVirtualizer = useVirtualizer({
    count: users.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 30, // 각 줄의 예상 높이
    overscan: 0, // 추가로 렌더링할 줄 수
  });

  // 스크롤이 끝에 가까워졌을 때 → 다음 페이지 요청
  useEffect(() => {
    const lastItem = rowVirtualizer.getVirtualItems().at(-1);
    if (
      lastItem &&
      lastItem.index >= users.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage(); // 무한스크롤 트리거
    }
  }, [rowVirtualizer.getVirtualItems(), hasNextPage, isFetchingNextPage]);

  return (
    <>
      <h1>가상 + 무한스크롤</h1>

      {/* 가상 스크롤 뷰포트 (필수로 높이 고정) */}
      <div
        ref={parentRef}
        style={{
          height: "500px", // 고정 높이 → 가상스크롤 기준
          overflow: "auto", // 내부 스크롤 생성
        }}
      >
        {/* 전체 스크롤 높이를 확보하기 위한 래퍼 */}
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`, // 전체 가상 높이
            position: "relative",
          }}
        >
          {/* 실제로 렌더링되는 가상 항목들 */}
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const user = users[virtualRow.index];
            if (!user) return null;

            return (
              <div
                key={user.login.uuid}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                  fontSize: "14px",
                }}
              >
                {virtualRow.index + 1}. {user.name.first} {user.name.last} —{" "}
                {user.email}
              </div>
            );
          })}
        </div>

        {/* 로딩, 종료 표시 */}
        {isFetchingNextPage && <div>로딩 중...</div>}
        {!hasNextPage && <div>더 이상 데이터 없어유</div>}
      </div>
    </>
  );
};

export default App;
