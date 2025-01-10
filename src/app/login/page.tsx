import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
} from "@/components/ui";
import { Eye } from "lucide-react";
import React from "react";

function page() {
  return (
    <div className="page">
      <Card className="w-[400px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">로그인</CardTitle>
          <CardDescription>로그인을 위한 정보를 입력해주세요.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="grid gap-2">
            <p>이메일</p>
            <Input
              id="email"
              type="email"
              required
              placeholder="이메일을 입력해주세요."
            ></Input>
          </div>
          <div className="relative grid gap-2">
            <div className="flex justify-between">
              <p>비밀번호</p>
              <p className="underline cursor-pointer">비밀번호를 잊으셨나요?</p>
            </div>
            <Input
              id="password"
              type="password"
              required
              placeholder="비밀번호을 입력해주세요."
            ></Input>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-[#E79057] hover:bg-[#E26F24] hover:ring-1 hover:ring-[#E26F24] hover:ring-offset-1 active:bg-[#D5753D] hover:shadow-lg">
            로그인
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default page;
