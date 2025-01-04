"use client";

import { useEffect, useState } from "react";
import { toast } from "@/hooks/use-toast";

import {
  Button,
  Checkbox,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  LabelDatePicker,
  Separator,
} from "@/components/ui";
import { useParams } from "next/navigation";
import MDEditor from "@uiw/react-md-editor";
import { Board } from "@/types";
import { useCreateBoard } from "@/hooks/api";
import { useAtom } from "jotai";
import { taskAtom } from "@/store/atoms";

interface Props {
  children: React.ReactNode;
  board: Board;
}

function MarkdownDialog({ children, board }: Props) {
  const { id } = useParams();

  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [title, setTitle] = useState<string | undefined>("");
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const [content, setContent] = useState<string | undefined>(
    "**Hello world!!!**"
  );
  const [task] = useAtom(taskAtom);
  const updateBoards = useCreateBoard();

  // 상태값 초기화
  const initState = () => {
    console.log("board==========kkkk:", board);
    setIsCompleted(board.isCompleted ? board.isCompleted : false);
    setTitle(board.title || "");
    setStartDate(board.startDate ? new Date(board.startDate) : undefined);
    setEndDate(board.endDate ? new Date(board.endDate) : undefined);
    setContent(board.content ? board.content : "*** Hello world!!! ***");
  }

  useEffect(() => {
    initState();
  }, [board]);
  
  // superbase save
  const hadleSumit = async (boardId: string) => {

    if (!title || !content) {
      toast({
        variant: "destructive",
        title: "입력되지 않은 데이터가 있습니다.",
        description: "제목과 내용을 입력해주세요.",
      });
      return;
    }

    try {
      // boards 배열에서 해당 boardId를 가진 데이터를 찾아서 수정
      const newBoards = task?.boards.map((board: Board) => {
        if (board.id === boardId) {
          return { ...board, isCompleted, title, startDate, endDate, content };
        }
        return board;
      });

      await updateBoards(Number(id), newBoards);
      handleCloseDialog();

    } catch (error) {
      console.error("error:", error);
      toast({
        variant: "destructive",
        title: "네트워크 오류",
        description: "서버와 연결할 수 없습니다.",
      });
    }
 };

     /** 취소 버튼 클릭 시, 다이얼로그 닫기 */
     const handleCloseDialog = () => {
      setIsDialogOpen(false);
      initState();
  };

return (
  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} >
      <DialogTrigger asChild>{children}</DialogTrigger>
    <DialogContent className="w-full max-w-3xl h-auto">
      <DialogHeader className="flex flex-col">
        <DialogTitle>
          <div className='flex items-center justify-start gap-2 '>
            <Checkbox className="w-5 min-w-0.5 h-5" checked={isCompleted} onCheckedChange={(checked)=> {
                  console.log("checked111:", checked);
                  if (typeof checked === "boolean") {
                  console.log("checked333:", checked);
                  setIsCompleted(checked);
                }
            }} />
            <input type="text" placeholder="게시물의 ㅈ제목을 입력하세요." className='w-full text-xl outline-none bg-transparent'value={title} onChange={(Event) => setTitle(Event.target.value)} />
          </div>
        </DialogTitle>
        <DialogDescription>마크다운 에디터를 사용하여 TODO-BOARD를 예쁘게 꾸며보세요.</DialogDescription>
      </DialogHeader>
      {/* 캘린더 박스 */}
      <div className='flex items-center gap-5'>
        <LabelDatePicker label="Form" value={startDate}></LabelDatePicker>
        <LabelDatePicker label="To" value={startDate}></LabelDatePicker>
      </div>
      <Separator />
      {/* 마크다운 에디터 UI 부분 */}
      <MDEditor height={100 + '%'} value={content} onChange={setContent} />
      <DialogFooter>
        <DialogClose asChild>
          <Button variant={'outline'}>취소</Button>
        </DialogClose>
        <Button type={'submit'} className="font-normal border-orange-500 bg-orange-400 text-white0 hover:bg-orang-400 hover:text-orang-500" onClick={() => hadleSumit(board.id)}>
          등록
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog >
);
}

export { MarkdownDialog };
