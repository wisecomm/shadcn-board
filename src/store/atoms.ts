import { Task } from '@/types'
import { atom } from 'jotai'

// 전체 task 목록 조회
export const tasksAtom = atom<Task[]>([])

// 단일 task 조회
export const taskAtom = atom<Task | null>(null)
