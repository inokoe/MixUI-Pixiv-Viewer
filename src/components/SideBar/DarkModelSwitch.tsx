import { Switch } from '@/components/ui/switch'
import { RootState } from '@/store'
import { setDarkModel } from '@/store/reducers/ui'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

interface DarkModelSwitchProps {
  className?: string
}

const DarkModelSwitch = ({ className }: DarkModelSwitchProps) => {
  const checked = useSelector((state: RootState) => state.ui.darkModel)
  const dispatch = useDispatch()
  const changeDarkModel = (checked: boolean) => {
    document.documentElement.classList.toggle('dark')
    dispatch(setDarkModel(checked))
  }

  useEffect(() => {
    if (checked) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [checked])

  return (
    <div className={className}>
      <Switch
        id='airplane-mode'
        onCheckedChange={changeDarkModel}
        className={className}
        checked={checked}
      />
    </div>
  )
}

export default DarkModelSwitch
