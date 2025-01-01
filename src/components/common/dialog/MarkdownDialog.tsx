'use client'

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import styles from './MarkdownDialog.module.scss'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import LabelCalendar from "../calendar/LabelCalendar"
import { Separator } from "@/components/ui/separator"
import { supabase } from "@/utils/supabase"
import { usePathname } from "next/navigation"
import path from "path"
import MDEditor from "@uiw/react-md-editor"

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
}

function MarkdownDialog({ data }: Props) {
  const pathname = usePathname()
  const [open, setOpen] = useState<boolean>(false)
  const [title, setTitle] = useState<string | undefined>('')
  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const [endDate, setEndDate] = useState<Date | undefined>(new Date())

  const [content, setContent] = useState<string | undefined>('**Hello world!!!**')


  // superbase save 
  const onSumit = async (id : string | number ) => {
    console.log('title:', title)

    if (!title || !startDate || !endDate || !content) {
      console.log('기입되지 않은 데이터가 있습니다.:', title)
      return
    } else {
      let { data: todos } = await supabase.from('todos').select('*')

      if (todos !== null) {
        todos.forEach(async (todo: Todo) => {
          if (todo.id === Number(pathname.split('/')[2])) {
            todo.contents.forEach((element: BoardContent) => {
              if (element.boardId ===id) {
                element.title = title
                element.startDate = startDate
                element.endDate = endDate
                element.content = content
              } 
            })
          }

          const { data, error, status } = await supabase
            .from('todos')
            .update({ contents: todo.contents })
            .eq('id', pathname.split('/')[2])

          if (error) {
            console.log('error:', error)
          }

          if (status === 204) {
            console.log('등록후 다이얼로그 닫기')

            setOpen(false)
          }

          console.log('todo:', todo)
        })
      } else {
        console.log('todos:', todos)
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {data.title ? (
        <DialogTrigger asChild>
          <span className='font-normal text-graw-400 hover:text-gray-500 cursor-pointer'>
            Update Contents
          </span>
        </DialogTrigger>
      ) : (
        <DialogTrigger asChild>
          <span className='font-normal text-graw-400 hover:text-gray-500 cursor-pointer'>
            Add Contents
          </span>
        </DialogTrigger>
      )}

      <DialogContent className={'max-w-fit'}>
        <DialogHeader>
          <DialogTitle>
            <div className={styles.dialog__titleBox}>
              <Checkbox className='w-5 h-5' />
              <input type='text' placeholder='Write a title fro your board.' value={data.title ? data.title : title } className={styles.dialog__titleBox__title}
                onChange={(Event) => setTitle(Event.target.value)} />
            </div>
          </DialogTitle>
          <div className={styles.dialog__calendarBox}>
            <LabelCalendar label='Form' handleDate={setStartDate}></LabelCalendar>
            <LabelCalendar label='To' handleDate={setEndDate}></LabelCalendar>
          </div>
          <Separator></Separator>
          <div className={styles.dialog__markdown}>
            <MDEditor value={data.content ? data.content : content} height={100 + '%'}>
            </MDEditor>
          </div>
        </DialogHeader>
        <DialogFooter>
          <div className={styles.dialog__buttonBox}>
            <DialogClose asChild>
              <Button variant={'ghost'} className='font-normal text-gray-500 hover:bg-gray-50 hover:text-gray-500'>
                Cancel
              </Button>
            </DialogClose>
            <Button variant={'ghost'} className='font-normal border-orange-500 bg-orange-400 text-white0 hover:bg-orang-400 hover:text-orang-500'
              onClick={() => onSumit(data.boardId)}>
              Done
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default MarkdownDialog