# SE-Frontend 
Front-end page of **Experiment Management System** by React.

### 相关配置版本
- npm 8.19.2
- React 18.2.0
- Bootstrap 5.2.3

### 开发环境运行
```
git clone https://github.com/Tptrix29/SE-Frontend
cd SE-Frontend/system-fronend
npm run dev
```

### 新增页面测试
修改`webpack.config.js`文件: (详细操作见配置文件注释)
1. entry中添加渲染配置文件
2. plugin中新增`HtmlPlugin`对象

页面测试完成后，建议回退相关配置，并将页面信息填写到[页面配置表格](#页面配置)。

### 页面配置
|entry key|source path (js file)| web path|module|writer|desp|
|:--:|:--:|:--:|:--:|:--:|:--:|
|index|./src/index.js|index.html|-|-|系统主页|
|login|./src/user-management-module/pages/login.js|login|User Management|tp|登录页面|
|admin_home|./src/user-management-module/pages/admin_home.js|admin|User Management|tp|管理员主页|
|user_home|./src/user-management-module/pages/user_home.js|User|User Management|tp|用户（非管理员）主页|
|register_page|./src/user-management-module/pages/lregister_page.js|register|User Management|tp|用户注册页面|
|course_page|./src/course-management-module/pages/course_page.js|course|Course Management|tp|课程主页|



