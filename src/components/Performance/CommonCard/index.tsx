'use client'

import { memo } from 'react'
import { TrendingUp } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface CommonCardProps {
  info: {
    CardTitle: string
    CardDescription: string
    SubTitle: string
    SubDescription: string
  }
  children: React.ReactNode
  className?: string
}

const CommonCard = memo(({ info, children }: CommonCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{info.CardTitle}</CardTitle>
        <CardDescription>{info.CardDescription}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <div className='flex w-full items-start gap-2 text-sm'>
          <div className='grid gap-2'>
            <div className='flex items-center gap-2 font-medium leading-none'>
              {info.SubTitle} <TrendingUp className='h-4 w-4' />
            </div>
            <div className='flex items-center gap-2 leading-none text-muted-foreground'>
              {info.SubDescription}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
})

CommonCard.displayName = 'CommonCard'

export default CommonCard
