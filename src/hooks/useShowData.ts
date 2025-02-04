import { Illust, PixivShowResponse } from '@/api/http/base.types'
import getShow from '@/api/http/show'
import { useParams } from 'react-router-dom'
import { useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

const useShowData = () => {
  const [result, setResult] = useState<Illust | null>(null)
  const flag = useRef(true)
  const { id } = useParams()

  const requestShowData = useCallback(async () => {
    if (!id) return
    let retryCound = 3
    while (retryCound > 0) {
      const res = (await getShow(id)) as PixivShowResponse
      if ('illusts' in res.api && !Array.isArray(res.api.illusts)) {
        setResult(res.api.illusts)
        return
      } else {
        toast('查看详情请求失败', {
          description: '⚠️将在1秒后重试',
        })
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
      retryCound--
    }
    toast('请求次数限制', {
      description: '⚠️无法获取更多数据，可能已经全部加载了喔',
    })
  }, [id])

  useEffect(() => {
    if (id && /^\d+$/.test(id)) {
      if (flag.current) {
        requestShowData()
        flag.current = false
      }
    } else {
      toast('ID错误', {
        description: '⚠️请检查ID是否正确',
      })
    }
  }, [requestShowData])

  return result
}

export default useShowData
