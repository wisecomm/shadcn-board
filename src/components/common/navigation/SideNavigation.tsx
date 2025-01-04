"use client";

import { useGetTasks, useCreateTask } from "@/hooks/api";
import { Button, SearchBar } from "@/components/ui";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Task } from "@/types";

function SideNavigation() {
  // TASK 생성 함수
  const hadleCreateTask = useCreateTask();
  const { tasks, getTasks } = useGetTasks();
  const { id } = useParams();
  const router = useRouter();

  /** 검색 */
  const handleSearch = async (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => { };

  // 검색어 상태 업데이트
  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => { };

  // getTasks() 는 컴포 
  useEffect(() => {
    getTasks();
  }, [id]);

  return (
    <aside className="page__aside">
      <div className="flex flex-col h-full gap-3">
        {/* 검색창 UI */}
        <SearchBar
          placeholder="검색어를 입력하세요."
          onChange={handleSearchTermChange}
          onKeyDown={handleSearch}
        />
        {/* Add New Page 버턴 UI */}
        <Button
          className="text-[#790557] bg-white border border-[#E79057] hover:bg-[#fff9f5]"
          onClick={hadleCreateTask}
        >
          Add New Page
        </Button>
        {/* Task 목록 UI */}
        <div className="flex flex-col mt-4 gap-2">
          <small className="text-sm font-medium leading-none text-[#a6a6a6]">
            <span className="text-neurtal-700">9diji님</span>의 TASK
          </small>
          <ul className="flex flex-col">
            {tasks.length === 0 ? (
              <li className="bg-[#f5f5f5] min-h-9 items-center gap-2 rounded-sm text-sm cursor-pointer">
                <div className="h-[6px] w-[6px] rounded-full bg-neutral-100"></div>
                등록된 Task가 없습니다.
              </li>
            ) : (
              tasks.map((task: Task) => {
                return (
                  <li key={task.id} onClick={() => router.push(`/board/${task.id}`)}
                    className={`${task.id === Number(id) && "bg-[#F5F5F5]"}
                     min-h-9 flex items-center gap-2 py-2 px-[10px] rounded-sm text-sm cursor-pointer`}
                  >
                    <div className={`${task.id === Number(id) ? "bg-[#00F38D]" : "bg-netural-400"} h-[6px] w-[6px] round-full`}></div>
                    <span className={`${task.id !== Number(id) && "text-neutral-400"}`}>
                      {task.title ? task.title : "등록된 제목이 없습니다"}
                    </span>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      </div>
    </aside>
  );
}

export { SideNavigation };
