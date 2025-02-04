import './App.css'
import { RouterProvider } from 'react-router-dom'
import router from '@/router'
import { Toaster } from '@/components/ui/sonner'

function App() {
  return (
    <>
      <Toaster />
      <div className='h-[100vh] w-[100vw] bg-gray-100 dark:bg-neutral-800'>
        <RouterProvider
          router={router}
          future={{
            v7_startTransition: true,
          }}
        />
      </div>
    </>
  )
}

export default App
