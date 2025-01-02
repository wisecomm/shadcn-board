"use client";

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui'
import { supabase } from '@/utils/supabase';

function InitPage() {
  const router = useRouter()

  // 페이지 생성 및 supabse 데이터 연동
  const handleCreateTesk = async () => {
    const { error, status } = await supabase.from('todos').insert([
      {
        title: '', start_date: new Date(), end_date: new Date(), contents: []
      }
    ])
      .select()

    if (error) {
      console.log('error:', error)
    }

    // id 값이
    let { data } = await supabase.from('todos').select()
    if (status === 201) {
      console.log('생성 완료 status:', status)
      if (data) {
        console.log('data 123:', data)
        router.push(`/create/${data[data.length - 1].id}`)
      } else {
        console.log('error data:', data)
      }
    }


  }

  return (
    <div className='w-fyll h-full flex flex-col items-center justify-center'>
      <div className='flex flex-col items-center justify-center gap-5 mb-6'>
        <h3 className='scroll-m-20 text-2xl font-semibold tracking-tighter'>How To Start</h3>
        <div className='flex flex-col items-center gap-3'>
          <small className='text-sm font-normal leading-none'>1. Createe a page</small>
          <small className='text-sm font-normal leading-none'>2. Add boards to page</small>
        </div>
        { /* 페이지 추가 버턴 */}
        <Button variant="outline" className='text-[#E79057] bg-transparent board-[#E79057] hover:bg-[#FFF9F5] w-[180px]'
          onClick={(handleCreateTesk)}>메인 New Page</Button>
      </div>
    </div>
  )
}

export default InitPage