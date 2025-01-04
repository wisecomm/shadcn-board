'use client';
  
import { useParams } from "next/navigation";
import { useDeleteTask } from "@/hooks/api";
/** UI 컴포넌트 */
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui";



interface Props {
    children: React.ReactNode;
}

function DeleteTaskPopup({ children }: Props) {
  const { id } = useParams();
  const handleDeleteTask = useDeleteTask();

  return (
    <AlertDialog>
        <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
        <AlertDialogContent  className="visually-hidden">
          <AlertDialogHeader>
            <AlertDialogHeader>삭제하시겠습니까?</AlertDialogHeader>
            <AlertDialogDescription>삭제된 데이터는 복구할 수 없습니다. 
              <br /> 게시물이 영구적으로 삭제됩니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDeleteTask(Number(id))} className="bg-red-600 hover:bg-rose-600">
                        삭제
                    </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
          </AlertDialog>
  );
}

export { DeleteTaskPopup };