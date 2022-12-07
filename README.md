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

#### User Management 

|entry key|source path (js file)| web path| writer | desp |
|:--:|:--:|:--:|:--:|:--:|
|index|./src/index.js|index.html| tp | 测试主页 |
|login|./src/user-management-module/pages/login.js|login| tp | 登录界面 |
|admin_home|./src/user-management-module/pages/admin_home.js|admin| tp | 管理员主页 |
|user_home|./src/user-management-module/pages/user_home.js|user| tp | 用户主页 |
|register_page|./src/user-management-module/pages/lregister_page.js|register| tp | 用户注册 |
|    check_page    |    ./src/user-management-module/pages/check_page.js    |    check    | tp | 用户查验 |
| user_manage_page | ./src/user-management-module/pages/user_manage_page.js | user_manage | tp | 用户管理 |

#### Course Mangement Module

|  entry key  |                source path (js file)                | web path | writer |   desp   |
| :---------: | :-------------------------------------------------: | :------: | :----: | :------: |
| course_page | ./src/course-management-module/pages/course_page.js |  course  |   tp   | 课程主页 |
|             |                                                     |          |        |          |
|             |                                                     |          |        |          |

#### Experiment Mangement Module

| entry key | source path (js file) | web path | write | desp |
| :-------: | :-------------------: | :------: | :---: | :--: |
|           |                       |          |       |      |
|           |                       |          |       |      |
|           |                       |          |       |      |

#### Score Mangement Module

| entry key | source path (js file) | web path | writer | desp |
| :-------: | :-------------------: | :------: | :----: | :--: |
|           |                       |          |        |      |
|           |                       |          |        |      |
|           |                       |          |        |      |

#### Resource Lib Module

| entry key |            source path (js file)            | web path |       module        | writer | desp       |
| :-------: | :-----------------------------------------: | :------: | :-----------------: | :----: | ---------- |
| lib_home  | ./src/resource-lib-module/pages/lib_home.js |   Lib    | Resource Lib Module |   tp   | 资料库主页 |
|           |                                             |          |                     |        |            |
|           |                                             |          |                     |        |            |

