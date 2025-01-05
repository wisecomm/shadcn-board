"use client";

import { Button, LabelDatePicker, Progress } from "@/components/ui";
import styles from "./page.module.scss";
import { useParams, useRouter } from "next/navigation";
import { nanoid } from "nanoid";
import { ChevronLeft } from "lucide-react";
import { Board } from "@/types";
import { useGetTaskById, useCreateBoard, useGetTasks } from "@/hooks/api";
import { BoardCard } from "@/components/common/board-card/BoardCard";
import Image from 'next/image';
import { useEffect, useState } from "react";
import { DeleteTaskPopup } from "@/components/common";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase/client";

function TaskPage() {
    const router = useRouter();
    const { id } = useParams();
    const { task } = useGetTaskById(Number(id));
    const createBoard = useCreateBoard();
    const { getTasks } = useGetTasks();
    
    const [title, setTitle] = useState("");
    const [startDate, setStartDate] = useState<Date | undefined>(undefined);
    const [endDate, setEndDate] = useState<Date | undefined>(undefined);
    const [boards, setBoards] = useState<Board[]>([]);
    
    const hadleAddBoard = () => {
        const newBoard: Board = {
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
        console.log("newBoards newBoards =====:", newBoards);
        createBoard(Number(id), newBoards);
    };

    const handleDelete = async () => { };
    const handleSave = async () => {
        if(!title || !startDate || !endDate) {
            alert('제목, 시작일, 종료일은 필수 입력값입니다.');
            return;
        }

        try {
            const { status, error } = await supabase.from('tasks').update({
                title,
                start_date: startDate,
                end_date: endDate,
            }).eq('id', id).select();

            if (status === 200) {
                toast({
                    title: 'TODO를 저장했습니다.',
                    description: 'TODO가 성공적으로 저장되었습니다.',
                });

                // 사이드네비게이션 실시간 업데이터
                getTasks();
            }

            if (error) {
                toast({
                    variant: "destructive",
                    title: "에러가 발생했습니다.",
                    description: `Supabase 오류: ${error.message || "알 수 없는 오류"}`,
                });
            }

        } catch (error) {
            console.error(error);
            toast({
                variant: "destructive",
                title: "네트워크 오류",
                description: "서버와 연결할 수 없습니다. 다시 시도해주세요!",
            });
        }
        
     };

    useEffect(() => {
        if (task) {
            setTitle(task.title || '');
            setStartDate(task.start_date ? new Date(task.start_date) : undefined);
            setEndDate(task.end_date ? new Date(task.end_date) : undefined);
            setBoards(task.boards);
        }
    }, [task]);

    return (
        <>
            <div className={styles.header}>
                <div className={styles[`header__btn-box`]}>
                    <Button value={"outline"} size={"icon"} onClick={() => router.push("/")}>
                        <ChevronLeft />
                    </Button>
                    <div className="flex items-center gap-2">
                        <Button variant={"secondary"} onClick={() => handleSave()}>
                            저장
                        </Button>
                        <DeleteTaskPopup>
                            <Button className="text-rose-600 bg-red-50 hover:bg-rose-50" onClick={() => handleDelete()}>삭제</Button>
                        </DeleteTaskPopup>
                    </div>
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
                            <LabelDatePicker label={"Fron"} value={startDate} onChange={setStartDate} />
                            <LabelDatePicker label={"To"} value={endDate} onChange={setEndDate} />
                        </div>
                        <Button
                            className="flex hover:bg-[E79057 ] hover:bg-[#E79057] hover:ring-[#79057] hover-ring-offset-1 active:bg-[#5753D"
                            onClick={hadleAddBoard}
                        >
                            Add New Button
                        </Button>
                    </div>
                </div>
            </div>
            <div className={styles.body}>
                {boards.length !== 0 ? (
                    <div className={styles.body__isData}>
                        {/* Add New Board 버튼 클릭으로 인한 Board 데이터가 있을 경우 */}
                        {boards.map((board: Board) => {
                            return <BoardCard key={board.id} board={board} />;
                        })}
                    </div>
                ) : (
                    <div className={styles.body__noData}>
                        {/* Add New Board 버튼 클릭으로 인한 Board 데이터가 없을 경우 */}
                        <h3 className='scroll-m-20 text-2xl font-semibold tracking-tight'>There is no board yet.</h3>
                        <small className='text-sm font-medium leading-none text-[#6d6d6d] mt-3 mb-7'>Click the Buttion and start flashing!</small>
                        <button onClick={hadleAddBoard}>
                            <Image src={'/assets/images/round-button.svg'} width={74} height={74} alt='round-button' />
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

export default TaskPage;
