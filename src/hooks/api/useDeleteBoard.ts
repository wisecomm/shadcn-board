import { taskAtom } from "@/stores/atoms";
import { useAtom } from "jotai";
import { useGetTaskById } from "./useGetTaskById";
import { toast } from "../use-toast";
import { supabase } from "@/lib/supabase/client";

function useDeleteBoard(taskId: number, boardId: string) {
    const [task]= useAtom(taskAtom);
    const { getTaskById } = useGetTaskById(taskId);

  const deleteBoard = async () => {
    try {
      const { status, error } = await supabase
        .from("tasks")
        .update({
            boards: task?.boards?.filter((board) => board.id !== boardId),
        })
        .eq("id", taskId);

      if (status === 204) {
        toast({
          title: "보드를 삭제했습니다.",
          description: "삭제한 보드를 되돌릴 수 없습니다.",
        });

        getTaskById();
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
  }

  return deleteBoard;
}

export { useDeleteBoard };