/**
 * 创建项目
 * 运行命令 pnpm run create -- 项目名称
 *
 */

const fs = require('fs')
const path = require('path')
const projectName = process.argv[3]

// 判断是否有传入项目名称
if (!projectName) {
  console.log('请输入项目名称')
  process.exit(1)
}

// 判断项目是否已存在
const projectPath = path.resolve(__dirname, `../packages/pages/${projectName}`)
if (fs.existsSync(projectPath)) {
  console.log('项目已存在')
  process.exit(1)
}

// -转换成大驼峰
const projectNameToHump = projectName
  .split('-')
  .map(item => item.charAt(0).toUpperCase() + item.slice(1))
  .join('')

// 大驼峰转成下划线 ProjectNameToHump => project_name_to_hump
const projectNameToHumpToUnderline = projectNameToHump
  .replace(/([A-Z])/g, '_$1')
  .toLowerCase()
  .slice(1)

// 创建项目
fs.mkdirSync(projectPath)

// 创建 index.js 文件
const indexContent = `
import ktbProjectPage from './index.vue'
import { withInstall } from '@ktb-packages-project/utils'

export const ${projectNameToHump} = withInstall(ktbProjectPage)
`

fs.writeFileSync(path.resolve(projectPath, 'index.js'), indexContent)

// 创建 index.vue 文件
const vueContent = `
<script setup>
defineOptions({
  name: '${projectName}',
})

</script>

<template>
  <div class='${projectNameToHumpToUnderline}'>
    <router-view/>
  </div>
</template>

<style>
@import "./style.less";
</style>
`

fs.writeFileSync(path.resolve(projectPath, 'index.vue'), vueContent)

// 创建 style.less 文件
const lessContent = `
.${projectNameToHumpToUnderline} {
  width:100%;
}
`

fs.writeFileSync(path.resolve(projectPath, 'style.less'), lessContent)

// 创建 router 文件夹 和 index.js 文件
fs.mkdirSync(path.resolve(projectPath, 'router'))
const routerContent = `
import { createMemoryHistory, createRouter } from 'vue-router'

import HomeView from '../home.vue'
import AboutView from '../about.vue'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  { path: '/home', component: HomeView },
  { path: '/about', component: AboutView }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

export default router
`

fs.writeFileSync(path.resolve(projectPath, 'router/index.js'), routerContent)

// 创建 home.vue 文件
const homeContent = `
<template>
  <div>home</div>
  <router-link to='about' > 跳转到 about </router-link>
</template>
`

fs.writeFileSync(path.resolve(projectPath, 'home.vue'), homeContent)

// 创建 about.vue 文件
const aboutContent = `
<template>
  <div>about</div>
  <router-link to='home' > 跳转到 home </router-link>
</template>
`

fs.writeFileSync(path.resolve(projectPath, 'about.vue'), aboutContent)

// 创建 assets 文件夹
fs.mkdirSync(path.resolve(projectPath, 'assets'))

// 创建 components 文件夹
fs.mkdirSync(path.resolve(projectPath, 'components'))

console.log('项目创建成功')
