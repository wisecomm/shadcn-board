import { atom } from 'jotai'
import { Task, User } from "@/types";

// 전체 task 목록 조회
export const tasksAtom = atom<Task[]>([])

// 단일 task 조회
export const taskAtom = atom<Task | null>(null)

/** 유저(User) 상태 */
export const userAtom = atomWithStorage<User | null>("user", null);
function atomWithStorage<T>(arg0: string, arg1: null) {
    throw new Error('Function not implemented.');
}

