import { useSelector, useDispatch } from 'react-redux'
import CheckSwitch from './CheckSwitch'
import { RootState } from '@/store'
import { setSetting, SettingKey } from '@/store/reducers/Setting'

const SettingBody = () => {
  const dispatch = useDispatch()
  const settingConfig = useSelector((state: RootState) => state.setting)
  return (
    <div className='w-full'>
      {(Object.keys(settingConfig).filter(key => key !== '_persist') as SettingKey[]).map(key => (
        <CheckSwitch
          key={key}
          label={settingConfig[key].label}
          description={settingConfig[key].description}
          checked={settingConfig[key].checked}
          disabled={key === 'developmentMode'}
          onChange={(checked: boolean) => {
            dispatch(setSetting({ [key]: { checked } }))
          }}
        />
      ))}
    </div>
  )
}

export default SettingBody
