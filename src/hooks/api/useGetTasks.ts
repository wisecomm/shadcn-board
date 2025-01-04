'use client';

import { tasksAtom } from "@/store/atoms";
import { supabase } from "@/utils/supabase/client";
import { useAtom } from "jotai";
import { toast } from "../use-toast";

function useGetTasks() {
    const [tasks, setTasks] = useAtom(tasksAtom);
    const getTasks = async () => {
        try {
            const { data, error, status } = await supabase.from("tasks").select("*");

            // 성공적으로 데이터가 반화 되었을 때
            if(data && status === 200) {
                setTasks(data);
            }
            if(error) {
                console.error("error:", error);
                toast({
                    variant: "destructive",
                    title: "에러가 발생했습니다.",
                    description: `Supabase 에러 : ${error.message} || '에러가 발생했습니다.'`,
                });
            }
        } catch (error) {
            console.error("error:", error);
            toast({
                variant: "destructive",
                title: "네트워크 오류",
                description: "서버와 연결할 수 없습니다.",
            });
        }
    }
    return { getTasks, tasks};
}

export { useGetTasks };
