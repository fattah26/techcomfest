import { Suspense } from 'react'
import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'

async function TodoList() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)
  const { data: todos } = await supabase.from('todos').select()

  return (
    <ul>
      {todos?.map((todo) => (
        <li key={todo.id}>{JSON.stringify(todo)}</li>
      ))}
    </ul>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<p>Memuat data...</p>}>
      <TodoList />
    </Suspense>
  )
}