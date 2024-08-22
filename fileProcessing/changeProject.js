/**
 * 切换项目
 * 运行命令 pnpm run change -- 项目名称
 *
 */

const fs = require('fs')
const path = require('path')
const dayjs = require('dayjs')
const child_process = require('child_process')

const projectName = process.argv[3]

// 判断是否有传入项目名称
if (!projectName) {
  console.log('请输入项目名称')
  process.exit(1)
}

// 判断项目是否存在
const projectPath = path.resolve(__dirname, `../packages/pages/${projectName}`)

if (!fs.existsSync(projectPath)) {
  console.log('项目不存在')
  process.exit(1)
}

// -转换成大驼峰
const projectNameToHump = projectName
  .split('-')
  .map(item => item.charAt(0).toUpperCase() + item.slice(1))
  .join('')

// 获取当前的时间
const currentTimer = dayjs().format('YYYY-MM-DD HH:mm:ss')
// 读取当前 git 的 name
const gitName = child_process.execSync('git config user.name').toString().trim()

// 修改 components.js 文件
const componentsPath = path.resolve(__dirname, '../packages/core/components.js')
const componentsContent = `
import { ${projectNameToHump} } from '@ktb-packages-project/pages'

export default [${projectNameToHump}]


// 最后修改时间 : ${currentTimer}
// 修改人 : ${gitName}
`

fs.writeFileSync(componentsPath, componentsContent)

// 修改 pages index.js 文件
const pagesIndexPath = path.resolve(__dirname, '../packages/pages/index.js')
const pagesIndexContent = `
export * from './${projectName}'

// 最后修改时间 : ${currentTimer}
// 修改人 : ${gitName}
`

fs.writeFileSync(pagesIndexPath, pagesIndexContent)

// 修改 App.vue 文件
const playAppPath = path.resolve(__dirname, '../packages/play/src/App.vue')
const playAppContent = `
<template>
  <${projectName}/>

  <!-- 最后修改时间 : ${currentTimer} -->
  <!-- 修改人 : ${gitName} -->
</template>
`

fs.writeFileSync(playAppPath, playAppContent)

// 修改 router/index.js 文件
const playRouterPath = path.resolve(__dirname, '../packages/play/src/router/index.js')

const playRouterContent = `
import router from '@ktb-packages-project/pages/${projectName}/router'

export default router

// 最后修改时间 : ${currentTimer}
// 修改人 : ${gitName}
`
fs.writeFileSync(playRouterPath, playRouterContent)

console.log('项目切换成功')
