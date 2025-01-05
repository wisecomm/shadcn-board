"use client";

import {
  Button,
  Checkbox,
  LabelDatePicker,
  Separator,
} from "@/components/ui";
import MarkdownEditor from "@uiw/react-md-editor";
import { MarkdownDialog } from "@/components/common/markdown/MarkdownDialog";
import { Card } from "@/components/ui/card/card";

import { Board } from "@/types";
import { useDeleteBoard } from "@/hooks/api";
import { useParams } from "next/navigation";

interface Props {
  board: Board;
}

function BoardCard({ board }: Props) {
  const { id } = useParams();
  const handelDeleteBoard = useDeleteBoard(Number(id), board.id);

  return (
     <Card className='w-full flex flex-col items-center p-5'>
        {/* 게시물 카드 제목 영역  */}
        <div className='w-full flex items-center justify-start gap-2'>
            <Checkbox className='h-5 w-5' checked={board.isCompleted} />
            <input type="text" placeholder='등록된 제목이 없습니다.' value={board.title} className='w-full text-xl outline-none bg-transparent' disabled={true} />
        </div>
        {/* 캘린더 및 버턴 박스 영역 */}
        <div className='flex items-center justify-between'>
            {/* 캘린더 박스 */}
            <div className='flex items-center gap-5'>
            <LabelDatePicker label='From' value={board.startDate} isReadOnly={true} />
            <LabelDatePicker label='To' value={board.endDate} isReadOnly={true}/>
            </div>
            {/* 버턴 박스 */}
            <div className='flex items-center'>
            <Button variant={'ghost'} className='font-normal text-[#6d6d6d'>Duplicate</Button>
            <Button variant={'ghost'} className='font-normal text-rose-600 hover:text-rose-600 hover: bg-red-50' onClick={handelDeleteBoard}>Delete</Button>
            </div>
        </div>
        <MarkdownEditor className="w-full" value={board.content} />
            <Separator className="my-3" />
            {/* Add Contents 버튼 영역 */}
            <MarkdownDialog board={board}>
                <Button variant={"ghost"} className="font-normal text-[#6D6D6D]">
                    {board.title ? "Update Contents" : "Add Contents"}
                </Button>
            </MarkdownDialog>
      </Card>
  );
}

export { BoardCard };
