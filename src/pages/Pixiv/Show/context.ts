import { createContext } from 'react'
import { Illust } from '@/api/http/base.types'

export const DataContext = createContext<Illust | null>(null)
