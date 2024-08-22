import { makeInstaller } from '@ktb-packages-project/utils'
import '@ktb-packages-project/styles/index.css'
import components from './components'

const installer = makeInstaller(components)

export * from '@ktb-packages-project/pages'
export default installer
