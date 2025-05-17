import type { User } from "./types/user";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRef, useEffect } from "react";

// 사용자 데이터를 비동기로 받아오는 함수 (한 페이지에 30명)
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
      queryKey: ["users"], // 쿼리 캐싱 키
      queryFn: fetchUsers, // 데이터 요청 함수
      initialPageParam: 1, // 초기 페이지 번호
      getNextPageParam: (_lastPage, allPages) => {
        // 전체 페이지가 100개 미만일 때 다음 페이지 요청
        return allPages.length < 100 ? allPages.length + 1 : undefined;
      },
    });

  // 여러 페이지에서 받아온 유저 목록을 평탄화
  const users = data?.pages.flat() ?? [];

  // 스크롤 하단 감지를 위한 ref
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // IntersectionObserver를 이용해 스크롤 하단 도달 시 다음 페이지 요청
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <>
      <h1>무한 스크롤</h1>

      {/* 사용자 목록 출력 */}
      {users.map((user, index) => (
        <div key={user.login.uuid}>
          {index + 1} {user.name.first} {user.name.last} --- {user.email}
        </div>
      ))}

      {/* 마지막 요소: 화면에 나타나면 다음 페이지 요청 트리거 */}
      <div ref={bottomRef} style={{ height: "1px" }} />

      {/* 로딩, 종료 표시 */}
      {isFetchingNextPage && <p>로딩 중...</p>}
      {!hasNextPage && <p>더 이상 데이터 없음</p>}
    </>
  );
};

export default App;
