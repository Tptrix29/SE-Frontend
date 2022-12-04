# SE-Frontend 
Front-end page of **Experiment Management System** by React.

### 相关配置版本
- npm 8.19.2
- React 18.2.0

### 开发环境运行
```
git clone https://github.com/Tptrix29/SE-Frontend
cd SE-Frontend/system-fronend
npm run dev
```

### 新增页面测试
修改webpack.config.js: (详细操作见配置文件注释)
1. entry中添加渲染配置文件
2. plugin中新增HtmlPlugin对象

页面测试完成后，建议回退相关配置，并将页面信息填写到[页面配置表格](#页面配置)。

### 页面配置
|entry-key|source path (js file)| web path|module
|--|--|--|--|
|index|./src/index.js|index.html|-|
|login|./src/user-management-module/pages/login.js|login/index.html|User Management|




