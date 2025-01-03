"use client";

import { Button, LabelDatePicker, Progress } from "@/components/ui";
import styles from "./page.module.scss";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/client";
import { nanoid } from "nanoid";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/negivation";
import { Task, Board } from "@/types";
import { useCreateBoard } from "@/hooks/api";

function TaskPage() {
  const router = useRouter();
  const [boards, setBoards] = useState<Board[]>([]);
  const { id } = useParams();

  const createBoard = useCreateBoard();

  const hadleAddBoard = () => {
    let newBoard: Board = {
      id: nanoid(),
      isCompleted: false,
      title: "",
      startDate: undefined,
      endDate: undefined,
      content: "",
    };

    const newBoards = [...boards, newBoard];
    setBoards(newBoards);
    console.log("newBoards id =====:", id);
    createBoard(Number(id), newBoards);
  };

  const handleDelete = async () => {};
  const handleSave = async () => {};

  return (
    <div className={styles.header}>
      <div className={styles["header__btn-box"]}>
        <Button
          value={"outline"}
          size={"icon"}
          onClick={() => router.push("/")}
        >
          <ChevronLeft />
        </Button>
        <div className="flex items-center gap-2">
          <Button variant={"secondary"} onClick={() => handleSave()}>
            저장
          </Button>
          <Button
            className="text-rose-600 bg-red-50 hover:bg-rose-50"
            onClick={() => handleDelete()}
          >
            삭제
          </Button>
        </div>
        <div className={styles.header__top}>
          {/* 제목 입력 input 섹션 */}
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Enter Title Here!"
            className={styles.header__top__input}
          />
          {/* 진행사항 척도 그래프 섹션 */}
          <div className="flex items-center justify-start gap-4">
            <small className="text-sm font-medium leading-none text-[#6d6d6d]">
              1/10 Completed
            </small>
            <Progress className="w-60 h-[10px] bg-primary-[#00EA88]" value={33}>
              {" "}
            </Progress>
          </div>
          {/* 캘린더 + Add New Board 버턴 섹션 */}
          <div className={styles.header__bottom}>
            <div className="flex items-center gap-5">
              <LabelDatePicker label={"Fron"} />
              <LabelDatePicker label={"To"} />
            </div>
            <Button className="flex hover:bg-[E79057 ] hover:bg-[#E79057] hover:ring-[#79057] hover-ring-offset-1 active:bg-[#5753D">
              Add New Button{" "}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskPage;
