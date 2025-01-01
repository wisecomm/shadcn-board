'use client'

import { Button } from '@/components/ui/button'
import styles from './page.module.scss'
import { Progress } from '@/components/ui/progress'
import LabelCalendar from '@/components/common/calendar/LabelCalendar'
import Image from 'next/image'
import BasicBoard from '@/components/common/board/BasicBoard'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '@/utils/supabase'
import { Content } from 'next/font/google'
import { get } from 'http'
import { nanoid } from 'nanoid'
import { ChevronLeft } from 'lucide-react'

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

        // if (boards?.contents) {
        //     console.log('2222 contents:', contents)

        //     const { error, status } = await supabase.from('todos').update([
        //         {
        //             contents: contents
        //         }
        //     ])
        //         .eq('id', pathname.split('/')[2])
        //         .select()

        //     if (error) {
        //         console.log('error:', error)
        //     }
        //     if (status === 200) {
        //         console.log('업데이트 완료 status:', status)
        //         getDatas()
        //     }

        // } else {
        //     console.log('1111 contents:', contents)
        //     const { error, status } = await supabase.from('todos').insert([
        //         {
        //             contents: contents
        //         }
        //     ])
        //         .select()

        //     if (error) {
        //         console.log('error:', error)
        //     }
        //     if (status === 201) {
        //         console.log('생성 완료 status:', status)
        //         getDatas()
        //     }


        // }

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
        console.log('pathname:', pathname)
        console.log('boards?.contents:', boards?.contents.length)

        if (todos !== null) {
            todos.forEach((todo: Todo) => {
                console.log('todo.id:', todo.id)
                console.log('todo.pathname.split:', pathname.split('/')[2])
                if (todo.id === Number(pathname.split('/')[2])) {
//                    if (todo.contents) {
//                        if (todo.contents && todo.contents.length > 0) {
                            setBoards(todo)
 //                   }
                }
            })
        }
    }

    const onSave = () => {
        console.log('onSave')
    }

    useEffect(() => {
        getDatas()
    }, [])


    return (
        <div className={styles.container}>
            <header className={styles.container__header}>
                <div className='top-6 left-7 flex items-center gap-2'>
                    <Button variant={'outline'} size={'icon'} onClick={() => router.back()}>
                        <ChevronLeft />
                    </Button>
                    <Button variant={'outline'} onClick={() => onSave()}>
                        저장
                    </Button>
                </div>
                <div className={styles.container__header__contents}>
                    <input type="text" placeholder='Enter Title Hear' className={styles.input} />
                    <div className={styles.progressBar}>
                        <span className={styles.container_progressBar__status}>0/10 complated</span>
                        {/* 프로그램스 바 UI */}
                        <Progress value={33} className='w-[30%] h-2' indicatorColor='bg-green-400' />
                    </div>
                    <div className={styles.calendarBox}>
                        <div className={styles.calendarBox__calendar}>
                            {/* 캘린더 UI */}
                            <LabelCalendar label='From' handleDate={setStartDate}/>
                            <LabelCalendar label='To' handleDate={setEndDate} readonly={true} />
                        </div>
                        <Button variant={'outline'} className='w-[15%] border-orange-500 bg-orange-100'
                            onClick={createBoard}>
                            Add New Board
                        </Button>
                    </div>
                </div>
            </header>
            <main className={styles.container__body}>
                {!boards?.contents || boards?.contents.length === 0 ? (
                    <div className={styles.container__body__infoBox}>
                        <span className={styles.title}>There is no board yet.</span>
                        <span className={styles.subTitle}>Click the button and start flashing!</span>
                        <button className={styles.button} onClick={createBoard}>
                            <Image src='/assets/images/button.svg' alt='' width={74} height={74} />
                        </button>
                    </div>
                ) : (
                    <div className={'flex flex-col items-center justify-start w-full h-full overflow-y-scroll'}>
                        {boards?.contents.map((board: BoardContent) => {
                            return <BasicBoard key={board.boardId} data={board} handleBords={setBoards}/>
                        })}
                    </div>
                )
                }
                {/* <BasicBoard /> */}
            </main>
        </div>
    )
}

export default page