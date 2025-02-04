import { cn } from '@/lib/utils'
import CommonCard from '../CommonCard'
import Skeleton from '@/components/ui/skeleton'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { memo, useMemo } from 'react'
import PerformanceMap from '../Map'
import TextNode from '@/components/common/Text/TextNode'
import H2Title from '@/components/common/Text/H2Title'

interface PerformanceIpProps {
  className?: string
}

const PerformanceIp = memo(({ className }: PerformanceIpProps) => {
  const ipInfo = useSelector((state: RootState) => state.performance.ipInfo)

  const { usefulInfo, isDev } = useMemo(() => {
    const info = {
      title: ipInfo.vercel?.region?.includes('dev') ? '💻 开发环境' : '🛰️ Info ',
      ip: ipInfo.vercel?.ip || ipInfo.api?.query || '',
      flag: ipInfo.vercel?.flag || '',
      countryCode: ipInfo.vercel?.country || ipInfo.api?.countryCode || '',
      region: ipInfo.vercel?.region || ipInfo.api?.region || '',
      city: ipInfo.vercel?.city || ipInfo.api?.city || '',
      isp: ipInfo.api?.isp || '',
      org: ipInfo.api?.org || '',
      as: ipInfo.api?.as || '',
      latitude: ipInfo.vercel?.latitude || ipInfo.api?.lat || '',
      longitude: ipInfo.vercel?.longitude || ipInfo.api?.lon || '',
    }

    const isDev = ipInfo.vercel?.region?.includes('dev') || false

    return { usefulInfo: info, isDev }
  }, [ipInfo])

  const cardInfo = useMemo(
    () => ({
      CardTitle: 'IP 信息',
      CardDescription: '🎯 您当前的IP与位置信息',
      SubTitle: '仅供参考',
      SubDescription: 'IP地理位置基于IP地址库数据',
    }),
    []
  )

  const renderIpInfo = useMemo(() => {
    if (isDev) return null
    return (
      <>
        <TextNode
          label='IP Address'
          value={usefulInfo.ip}
        />
        <TextNode
          label='Country'
          value={`${usefulInfo.flag} ${usefulInfo.countryCode}`}
        />
        <TextNode
          label='City'
          value={usefulInfo.city}
        />
        <TextNode
          label='ISP'
          value={usefulInfo.isp}
        />
        <TextNode
          label='Organization'
          value={usefulInfo.org}
        />
        <TextNode
          label='AS'
          value={usefulInfo.as}
        />
      </>
    )
  }, [isDev, usefulInfo])

  const shouldShowMap = !isDev && usefulInfo.latitude && usefulInfo.longitude

  return (
    <div>
      <CommonCard info={cardInfo}>
        <div className={cn('flex h-auto gap-2 flex-col md:flex-row', className)}>
          <div className='flex w-full md:w-1/2 justify-center items-center flex-col gap-2'>
            <H2Title>{usefulInfo.title}</H2Title>
            {renderIpInfo}
          </div>
          <div className='flex h-1/2 md:h-full w-full md:w-1/2 rounded-lg overflow-hidden'>
            {shouldShowMap ? (
              <PerformanceMap
                latitude={Number(usefulInfo.latitude)}
                longitude={Number(usefulInfo.longitude)}
              />
            ) : (
              <Skeleton className='w-full h-full' />
            )}
          </div>
        </div>
      </CommonCard>
    </div>
  )
})

PerformanceIp.displayName = 'PerformanceIp'

export default PerformanceIp
