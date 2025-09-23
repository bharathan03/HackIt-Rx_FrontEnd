# Web App Frontend

基于 Next.js 的现代化前端应用。

## 技术栈

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Axios (HTTP 客户端)

## 功能特性

- 现代化的 React 应用架构
- TypeScript 类型安全
- Tailwind CSS 样式框架
- 响应式设计
- API 集成
- 自动代码分割
- 服务端渲染 (SSR)

## 快速开始

### 前置要求

- Node.js 18+ 
- npm 或 yarn

### 安装和运行

1. 克隆项目
```bash
git clone <repository-url>
cd web-app-frontend
```

2. 安装依赖
```bash
npm install
# 或
yarn install
```

3. 启动开发服务器
```bash
npm run dev
# 或
yarn dev
```

应用将在 http://localhost:3000 启动

### 构建生产版本

```bash
npm run build
npm start
# 或
yarn build
yarn start
```

## 项目结构

```
src/
├── app/                    # App Router (Next.js 13+)
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 首页
├── components/            # 可复用组件
├── lib/                   # 工具函数和配置
│   └── api.ts            # API 配置
└── types/                # TypeScript 类型定义
    └── index.ts          # 公共类型
```

## API 集成

应用配置了与后端 API 的集成：

- 默认 API 地址：`http://localhost:8080`
- 支持环境变量配置：`NEXT_PUBLIC_API_URL`
- 自动请求/响应拦截器
- 错误处理

### 环境变量

创建 `.env.local` 文件来配置环境变量：

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
```

## 主要功能

### 用户管理

- 用户列表展示
- 响应式卡片布局
- 加载状态处理
- 错误处理
- 数据刷新

### 样式系统

使用 Tailwind CSS 提供：
- 响应式设计
- 现代化 UI 组件
- 暗色主题支持
- 自定义样式扩展

## 开发指南

### 添加新页面

在 `src/app` 目录下创建新的文件夹和 `page.tsx` 文件：

```tsx
// src/app/about/page.tsx
export default function About() {
  return (
    <div>
      <h1>关于我们</h1>
    </div>
  )
}
```

### 创建组件

在 `src/components` 目录下创建可复用组件：

```tsx
// src/components/Button.tsx
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export default function Button({ children, onClick, className }: ButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={`px-4 py-2 bg-blue-500 text-white rounded ${className}`}
    >
      {children}
    </button>
  )
}
```

### API 调用

使用配置好的 axios 实例进行 API 调用：

```tsx
import { api } from '@/lib/api'

// 获取用户列表
const fetchUsers = async () => {
  try {
    const response = await api.get('/users')
    return response.data
  } catch (error) {
    console.error('获取用户失败:', error)
    throw error
  }
}
```

## 脚本命令

- `npm run dev` - 启动开发服务器
- `npm run build` - 构建生产版本
- `npm run start` - 启动生产服务器
- `npm run lint` - 运行 ESLint 检查

## 配置文件

### Next.js 配置 (`next.config.js`)

- API 代理配置
- 实验性功能启用
- 构建优化

### TypeScript 配置 (`tsconfig.json`)

- 路径映射 (`@/*` -> `./src/*`)
- 编译选项
- 包含/排除规则

### Tailwind 配置 (`tailwind.config.ts`)

- 内容路径配置
- 主题扩展
- 插件配置

## 部署

### Vercel 部署

1. 连接 GitHub 仓库到 Vercel
2. 配置环境变量
3. 自动部署

### 其他平台

构建静态文件：
```bash
npm run build
npm run export  # 如果需要静态导出
```

## 性能优化

- 自动代码分割
- 图片优化
- 字体优化
- 静态生成 (SSG)
- 服务端渲染 (SSR)

## 许可证

MIT License
