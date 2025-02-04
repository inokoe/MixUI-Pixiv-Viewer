import { Switch } from '@/components/ui/switch'

const CheckSwitch = ({
  label,
  description,
  checked,
  onChange,
  disabled,
}: {
  label: string
  description: string
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
}) => {
  return (
    <div className='flex items-center justify-between p-2 hover:bg-gray-100 dark:hover:bg-neutral-800 rounded-md transition-colors border-b border-gray-100 dark:border-neutral-800'>
      <div className='text-neutral-700 dark:text-neutral-200 flex-1 flex-shrink-0'>
        <div className='text-lg'>{label}</div>
        <div className='text-sm w-5/6'>{description}</div>
      </div>
      <div className='flex items-center justify-center gap-2'>
        <div className='flex items-center justify-center'>
          <Switch
            onCheckedChange={onChange}
            checked={checked}
            disabled={disabled}
            className='bg-neutral-200 data-[state=checked]:bg-blue-600 dark:bg-white dark:data-[state=checked]:bg-blue-600'
          />
        </div>
        <div className='text-sm text-neutral-500 dark:text-neutral-400'>
          {checked ? '已开启' : '已关闭'}
        </div>
      </div>
    </div>
  )
}

export default CheckSwitch
