"use client";

import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "../use-toast";

function useCreateTask() {
  const router = useRouter();

  const createTask = async () => {
    try {
      //      const { data, error, status } = await supabase.from("tasks").select("*");

      const { data, error, status } = await supabase
        .from("tasks")
        .insert([
          {
            title: null,
            start_date: null,
            end_date: null,
            boards: [],
          },
        ])
        .select("*");

      if (data && status === 201) {
        console.log("생성 완료 status:", status);
        toast({
          title: "Task 생성 완료",
          description: "Task 생성 완료",
        });
        router.push(`/task/${data[0].id}`);
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
  return createTask;
}

export { useCreateTask };
