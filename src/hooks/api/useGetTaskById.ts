"use client";

import { taskAtom } from "@/stores/atoms";
import { supabase } from "@/lib/supabase/client";
import { useAtom } from "jotai";
import { toast } from "../use-toast";
import { useEffect } from "react";

function useGetTaskById(taskId: number) {
    const [task, setTask] = useAtom(taskAtom);

    const getTaskById = async () => {
        try {
            const { data, error, status } = await supabase.from("tasks").select("*").eq("id", taskId);
            if(data && status === 200) {
                setTask(data[0]);
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
    };

    useEffect(() => {
        if(taskId) {
            getTaskById();
        }
    }, [taskId]);

    return { getTaskById, task };
}

export { useGetTaskById };
