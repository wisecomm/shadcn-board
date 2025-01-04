"use clinet";

import { supabase } from "@/utils/supabase/client";
import { toast } from "../use-toast";
import { useRouter } from "next/navigation";

function useDeleteTask() {
    const router = useRouter();
    const deleteTask = async (taskId: number) => {
        try {
            const {status, error } = await supabase
            .from("tasks")
            .delete()
            .eq("id", taskId);

            if (status === 204) {
                toast({
                    title: "TODO를 삭제했습니다.",
                    description: "삭제한 TODO를 되돌릴 수 없습니다.",
                });
                router.push("/");
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
        };
    }
    return deleteTask;
}

export { useDeleteTask }; 
