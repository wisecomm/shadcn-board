"use client";

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import styles from './page.module.scss'
import { supabase } from '@/utils/supabase';

function Home() {
  const router = useRouter()

  // 페이지 생성 및 supabse 데이터 연동
  const onCreate = async () => {
    const { error, status } = await supabase.from('todos').insert([
      { title: '', start_date: new Date(), end_date: new Date(), contents: [] 
      }
    ])
    .select()

    if(error) {
      console.log('error:', error)
    }

    // id 값이
    let { data } = await supabase.from('todos').select()
    if(status === 201) {
      console.log('생성 완료 status:', status)
      if(data) {
        console.log('data 123:', data)
        router.push(`/create/${data[data.length -1].id}`)
      } else {
        console.log('error data:', data)
      }
    }


  }

  return (
    <div className={styles.container}>
      <div className={styles.container__onBoarding}>
        <span className={styles.container__onBoarding__title}> How To Start</span>
        <div className={styles.container__onBoarding__steps}>
          <span>1. Createe a page</span>
          <span>2. Add boards to page</span>
        </div>
        { /* 페이지 추가 버턴 */}
        <Button variant="outline" className='w-full bg-transparent text-orange-500 border-orang-400 '
        onClick={(onCreate)}>메인 New Page</Button>
      </div>
    </div>
  )
}

export default Home