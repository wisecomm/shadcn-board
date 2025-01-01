'use client'

import { Button } from '@/components/ui/button'
import { Dot, Search } from 'lucide-react'
// CSS
import styles from './SideNavigation.module.scss'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { supabase } from '@/utils/supabase'
import { useEffect, useState } from 'react'
import { get } from 'http'

function SideNavigation() {
  const router = useRouter()

  const [todos, setTodos] = useState<any>([])

  const onCreate = async () => {
    console.log('onCreate')
    // supabase database row create
    const { error, status } = await supabase.from('todos').insert([
      {
        title: '',
        start_date: new Date(),
        end_date: new Date,
        contents: [],
      }
    ])

    if (error) {
      console.log('error:', error)
    }

    if (status === 201) {
      console.log('생성 완료 status:', status)

      let { data } = await supabase.from('todos').select()
      if(data) {
        router.push(`/create/${data[data.length -1].id}`)
        getTodos()
      }
    }

  }

  // supbase 기존 생성된 페이지가 있는지 확인
const getTodos = async () => {
  console.log('getTodos')
  let { data: todos, error, status } = await supabase.from('todos').select('*')
  if(status === 200) {
    console.log('todos:', todos)
    setTodos(todos)
  }
}

useEffect(() => {
  getTodos()
}, [])

  return (
    <div className={styles.container}>
      {/* 검색창  */}
      <div className={styles.container__searchBox}>
        <Input type='text' placeholder='검색어를 입력해주세요.'></Input>
        <Button variant={"outline"} size={"icon"}>
          <Search className='w-4 h-4' />
        </Button>
        {/* 깃허브 콤포넌트 참조 
        <SearchBar></SearchBar> */}
      </div>
      <div className={styles.container__buttonBox}>
        <Button variant='outline' className='w-full bg-transparent text-orange-500 border-orange-400 hover:target:text-orange-500'
          onClick={onCreate}>
          Add New Page
        </Button>
      </div>
      <div className={styles.container_todos}>
        <span className={styles.container__todos__label}>Your To do</span>
        {/* Is Supabase */}
        <div className={styles.container__todos__list}>
        {todos && 
          todos.map((todo: any) => (
            <div className='flex items-center py-2 bg-[#f5f5f5] rounded-sm cursor-pointer' key={todo.id}>
              <Dot className={'mr-1 text-green-400'}></Dot>
              <span className='text-sm'>{todo.title === "" ? '제목없음' : todo.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SideNavigation