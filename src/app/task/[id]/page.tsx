'use client'

import { Button, LabelDatePicker, Progress } from '@/components/ui'
import styles from './page.module.scss'
import Image from 'next/image'
import BasicBoard from '@/components/common/board/BasicBoard'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabase'
import { Content } from 'next/font/google'
import { get } from 'http'
import { nanoid } from 'nanoid'
import { ChevronLeft } from 'lucide-react'
import { useAtom } from 'jotai'
import { sidebarStateAtom } from '@/store/index'

interface Todo {
    id: number
    title: string
    start_date: string | Date
    end_date: string | Date
    contents: BoardContent[]
}

interface BoardContent {
    boardId: string | number
    isComplated: boolean
    title: string
    startDate: string | Date
    endDate: string | Date
    content: string
}

function page() {
    const router = useRouter()
    const pathname = usePathname()

    const [sidebarState, setSidebarState] = useAtom(sidebarStateAtom)
    const [title, setTitle] = useState<string | undefined>('')
    const [boards, setBoards] = useState<Todo>()
    const [startDate, setStartDate] = useState<Date | undefined>(new Date())
    const [endDate, setEndDate] = useState<Date | undefined>(new Date())

    const insertRowData = async (contents: BoardContent[]) => {
        // supabase database row create
        const { error, status } = await supabase.from('todos').update([
            {
                contents: contents
            }
        ])
            .eq('id', pathname.split('/')[2])

        if (error) {
            console.log('error:', error)
        }
        if (status === 204) {
            console.log('업데이트 완료 status:', status)
            getDatas()
        }
    }

    const createBoard = () => {
        let newContents: BoardContent[] = []
        console.log('boards:', boards)

        const BoardContent = {
            boardId: nanoid(),
            isComplated: false,
            title: '',
            startDate: new Date(),
            endDate: new Date(),
            content: ''
        }

        if (boards && boards.contents.length > 0) {
            newContents = [...boards.contents]
            newContents.push(BoardContent)
            insertRowData(newContents)
        } else if (boards && boards.contents.length === 0) {
            newContents.push(BoardContent)
            insertRowData(newContents)
        }

    }

    const getDatas = async () => {
        let { data: todos, error, status } = await supabase.from('todos').select('*')

        console.log('todos:', todos)

        if (todos !== null) {
            todos.forEach((todo: Todo) => {
                if (todo.id === Number(pathname.split('/')[2])) {
                    setBoards(todo)
                    setTitle(todo.title)
                }
            })
        }
    }

    const handleDelete = async () => {
        const { data, error, status } = await supabase.from('todos').update({
                title: title
            })
            .eq('id', pathname.split('/')[2])

        if (error) {
            console.log('error:', error)
        } else {
            console.log('업데이트 완료')
        }

        if (error) {
            console.log('error:', error)
        }
        if (status === 204) {
            console.log('업데이트 완료 status:', status)
            getDatas()

            setSidebarState('update')
        }
    }
    const handleSave = async () => {
        const { data, error, status } = await supabase.from('todos').update({
                title: title
            })
            .eq('id', pathname.split('/')[2])

        if (error) {
            console.log('error:', error)
        } else {
            console.log('업데이트 완료')
        }

        if (error) {
            console.log('error:', error)
        }
        if (status === 204) {
            console.log('업데이트 완료 status:', status)
            getDatas()

            setSidebarState('update')
        }
    }

    useEffect(() => {
        getDatas()
    }, [])


    return (
        <div className={styles.header}>
            <div className={styles['header__btn-box']}>
                <Button value={'outline'} size={'icon'} onClick={()=>router.push('/')}>
                    <ChevronLeft />
                </Button>
                <div className='flex items-center gap-2'>
                <Button variant={'secondary'} onClick={()=>handleSave()}>
                        저장
                    </Button>
                    <Button className='text-rose-600 bg-red-50 hover:bg-rose-50' onClick={()=>handleDelete()}>
                        삭제
                    </Button>
                </div>
                <div className={styles.header__top}>
                    {/* 제목 입력 input 섹션 */}
                    <input type="text" value={title} onChange={(event)=>setTitle(event.target.value)} placeholder='Enter Title Here!'
                    className={styles.header__top__input} />
                    {/* 진행사항 척도 그래프 섹션 */}
                    <div className='flex items-center justify-start gap-4'>
                        <small className='text-sm font-medium leading-none text-[#6d6d6d]'>1/10 Completed</small>
                        <Progress className='w-60 h-[10px] bg-primary-[#00EA88]' value={33}> </Progress>
                    </div>
                    {/* 캘린더 + Add New Board 버턴 섹션 */}
                    <div className={styles.header__bottom}>
                        <div className='flex items-center gap-5'>
                            <LabelDatePicker label={'Fron'} />
                            <LabelDatePicker label={'To'} />
                        </div>
                        <Button className='flex hover:bg-[E79057 ] hover:bg-[#E79057] hover:ring-[#79057] hover-ring-offset-1 active:bg-[#5753D'>Add New Button </Button>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default page