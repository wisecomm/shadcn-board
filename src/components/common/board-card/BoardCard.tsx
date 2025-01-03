import styles from "./BasicBoard.module.scss";
import { ChevronUp } from "lucide-react";
import {
  Button,
  Checkbox,
  Input,
  LabelDatePicker,
  Separator,
} from "@/components/ui";
import MarkdownDialog from "../dialog/MarkdownDialog";
import { useState } from "react";
import { supabase } from "@/utils/supabase/client";
import { usePathname } from "next/navigation";
import { Card } from "@/components/ui/card/card";
import MDEditor, { commands } from "@uiw/react-md-editor";

import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast/toast";
import { Board, Task } from "@/types";

function BoardCard() {
  const pathname = usePathname();
  const { toast } = useToast();

  return (
    <div className={styles.container}>
      <div className={styles.container__header}>
        <div className={styles.container__header__titleBox}>
          <Checkbox className="w-5 h-5"> </Checkbox>
          {data.title !== "" ? (
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tighter">
              {data.title}{" "}
            </h3>
          ) : (
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tighter text-gray-400">
              Please enter a title for the board
            </h3>
          )}
          {data.title}
        </div>
        <Button variant="ghost">
          <ChevronUp className="w-5 h-5 text-gray-400"></ChevronUp>
        </Button>
      </div>
      <div className={styles.container__body}>
        <div className={styles.container__body__calendarBox}>
          <div className="flex items-center gap-3">
            <span className="text-[#6d6d6d]">From</span>
            <Input
              value={
                typeof data.startDate === "string"
                  ? data.startDate.split("T")[0]
                  : "date"
              }
              disabled
            ></Input>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[#6d6d6d]">To</span>
            <Input
              value={
                typeof data.endDate === "string"
                  ? data.endDate.split("T")[0]
                  : "date"
              }
              disabled
            ></Input>
          </div>
        </div>
        <div className={styles.container__body__buttonBox}>
          <Button
            variant={"ghost"}
            className="font-normal text-gray-400 hover:bg-green-50 hover:text-green-500"
          >
            Duplicate
          </Button>
          <Button
            variant={"ghost"}
            className="font-normal text-gray-400 hover:bg-red-50 hover:text-red-500"
            onClick={() => handleDelete(data.boardId)}
          >
            Delete
          </Button>
        </div>
        {data.content && (
          <Card className="w-full p-4 mb-3">
            <MDEditor value={data.content} height={100 + "%"} />
          </Card>
        )}
        <div className={styles.cotainer__footer}>
          <MarkdownDialog data={data} updateBoards={getDatas}></MarkdownDialog>
        </div>
      </div>
    </div>
    <Card className='w-full flex flex-col items-center p-5'>
        {/* 게시물 카드 제목 영역  */}
        <div className='w-full flex items-center justify-start gap-2'>
            <CheckBox className='h-5 w-5' chechked={true} />
            <input type="text" placeholder='등록된 제목이 없습니다.' className='w-full text-xl outline-none bg-transparent' disabled={true} />
        </div>
        {/* 캘린더 및 버턴 박스 영역 */}
        <div className='flex items-center justify-between'>
            {/* 캘린더 박스 */}
            <div className='flex items-center gap-5'>
            <LabelDatePicker label='From' />
            <LabelDatePicker label='To' />
            </div>
            {/* 버턴 박스 */}
            <div className='flex items-center'>
            <Button variant={'ghost'} className='font-normal text-[#6d6d6d'>Duplicate</Button>
            <Button variant={'ghost'} className='font-normal text-rose-600 hover:text-rose-600 hover: bg-red-50'>Delete</Button>
            </div>
        </div>
        <Separator className='my-3'>
            <Button variant={'ghost'} className='font-normal yext-[6d6d6d6]'>
                Add Contents
            </Button>
        </Separator>
    </Card>
  );
}

export { BoardCard };
