import { Checkbox } from '@/components/ui/checkbox'
import styles from './BasicBoard.module.scss'
import { Button } from '@/components/ui/button'
import { ChevronUp } from 'lucide-react'
import LabelCalendar from '../calendar/LabelCalendar'
import MarkdownDialog from '../dialog/MarkdownDialog'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { supabase } from '@/utils/supabase'
import { usePathname } from 'next/navigation'
import { Card } from '@/components/ui/card'
import MDEditor, { commands } from "@uiw/react-md-editor";

import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"

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

interface Props {
    data: BoardContent
    handleBords: (data: Todo) => void
}

function BasicBoard({ data, handleBords }: Props) {
    const pathname = usePathname()
    const { toast } = useToast()
    
    const getDatas = async () => {
        let { data: todos, error } = await supabase.from('todos').select('*')

        console.log('XXXXXXXX:', 'xxxx')
        toast({
            title: "Scheduled: Catch up ",
            description: "Friday, February 10, 2023 at 5:57 PM",
            action: (
              <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
            ),
          })        
        toast({ title: 'error', description: 'error' })
        if (error) {
            console.log('error:', error)
            toast({ title: 'error', description: 'error' })
        }
        console.log('todos:', todos)
        console.log('pathname:', pathname)

        if (todos !== null) {
            todos.forEach((todo: Todo) => {
                handleBords(todo)
            })
        }
    }

    
  const handleDelete = async (id: string | number) => {
    // 해당 보드에 대한 데이터만 수정 삭제
    let { data: todos } = await supabase.from('todos').select('*')
    if (todos !== null) {
      todos.forEach(async (todo: Todo) => {
        if (todo.id === Number(pathname.split('/')[2])) {
            let newContents = todo.contents.filter((element: BoardContent) => element.boardId !== id)
            // supabase
            const { error, status } = await supabase.from('todos').update([
                {
                    contents: newContents
                }
            ])
                .eq('id', todo.id) 
            if (error) {
                console.log('error:', error)
            }
            if (status === 204) {
                console.log('삭제 완료 status:', status)
                getDatas()
            }
        }
      })
    }
    }

  return (
    <div className={styles.container}>
        <div className={styles.container__header}>
            <div className={styles.container__header__titleBox}>
                <Checkbox className='w-5 h-5'>  </Checkbox>
                {data.title !== '' ? <h3 className='scroll-m-20 text-2xl font-semibold tracking-tighter'>{data.title} </h3> 
                    : <h3 className='scroll-m-20 text-2xl font-semibold tracking-tighter text-gray-400'>Please enter a title for the board</h3>}
                    {data.title}
            </div>
            <Button variant='ghost'>
                <ChevronUp className='w-5 h-5 text-gray-400'></ChevronUp>
            </Button>
        </div>
        <div className={styles.container__body}>
            <div className={styles.container__body__calendarBox}>
                <div className='flex items-center gap-3'>
                    <span className='text-[#6d6d6d]'>From</span>
                    <Input value={ typeof data.startDate === 'string' ? data.startDate.split('T')[0] : 'date' } disabled></Input>
                </div>
                <div className='flex items-center gap-3'>
                    <span className='text-[#6d6d6d]'>To</span>
                    <Input value={ typeof data.endDate === 'string' ? data.endDate.split('T')[0] : 'date' } disabled></Input>
                </div>
            </div>
            <div className={styles.container__body__buttonBox}>
                <Button variant={'ghost'} className='font-normal text-gray-400 hover:bg-green-50 hover:text-green-500' >
                    Duplicate
                </Button>
                <Button variant={'ghost'} className='font-normal text-gray-400 hover:bg-red-50 hover:text-red-500' 
                     onClick={() => handleDelete(data.boardId)}>
                    Delete
                </Button>
            </div>
            {data.content && (
                <Card className='w-full p-4 mb-3'>
                    <MDEditor value={data.content} height={100 + '%'} />
                </Card> )
            }
            <div className={styles.cotainer__footer}>
                <MarkdownDialog data={data}></MarkdownDialog>
            </div>
        </div>
    </div>
  )
}

export default BasicBoard