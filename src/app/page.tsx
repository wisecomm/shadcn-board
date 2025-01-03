"use client";

import { useCreateTask } from "@/hooks/api";
import { Button } from "@/components/ui";

function InitPage() {
  // TASK 생성 함수
  const handleCreateTesk = useCreateTask();

  return (
    <div className="w-fyll h-full flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-5 mb-6">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tighter">
          How To Start
        </h3>
        <div className="flex flex-col items-center gap-3">
          <small className="text-sm font-normal leading-none">
            1. Createe a page
          </small>
          <small className="text-sm font-normal leading-none">
            2. Add boards to page
          </small>
        </div>
        {/* 페이지 추가 버턴 */}
        <Button
          variant="outline"
          className="text-[#E79057] bg-transparent board-[#E79057] hover:bg-[#FFF9F5] w-[180px]"
          onClick={handleCreateTesk}
        >
          메인 New Page
        </Button>
      </div>
    </div>
  );
}

export default InitPage;
