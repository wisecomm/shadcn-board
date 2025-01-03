"use client";

import { supabase } from "@/utils/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Board } from "@/types";

function useCreateBoard() {
  const createBoard = async (taskId: number, newValue: Board[]) => {
    try {
      const { data, error, status } = await supabase
        .from("boards")
        .update({
          boards: newValue,
        })
        .eq("id", taskId)
        .select("*");

      if (data && status === 200) {
        toast({
          title: "새로운 TODO-BOARD 생성 완료",
          description: "새로운 TODO-BOARD 알차게 채워보세요",
        });
      }

      if (error) {
        console.error("error:", error);
        toast({
          variant: "destructive",
          title: "에러가 발생했습니다.",
          description: `Supabase 에러 : ${error.message} ||  '에러가 발생했습니다.'`,
        });
      }
    } catch (error) {
      console.error("error:", error);
      toast({
        variant: "destructive",
        title: "네트워크 오류.",
        description: '서버와 연결할 수 없습니다. "네트워크 오류."',
      });
    }
  };

  return createBoard;
}

export { useCreateBoard };
