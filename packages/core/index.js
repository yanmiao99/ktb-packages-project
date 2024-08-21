import { makeInstaller } from '@ktb-packages-project/utils'
import components from './components'
import '@ktb-packages-project/styles/index.css'

const installer = makeInstaller(components)

export * from '@ktb-packages-project/pages'
export default installer
