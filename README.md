# SE-Frontend 
Front-end page of **Experiment Management System** by React.

### 相关配置版本
- npm 8.19.2
- React 18.2.0
- Bootstrap 5.2.3
- Bootstrap React 2.6.0
- Ant Design 5.0.3
- Axios 1.2.1

### 开发环境运行
```
git clone https://github.com/Tptrix29/SE-Frontend
cd SE-Frontend/system-fronend
npm install
npm run dev
```

### 生产环境运行

修改`system-fronend/src/config/backend-config.js`中的host为目标服务器域名，然后运行：

```shell
git clone https://github.com/Tptrix29/SE-Frontend
cd SE-Frontend/system-fronend
npm install 
npm run build
```

转移`system-fronend/dist`文件下文件到Nginx服务器网页文件夹下，即可访问相关页面。

### 改进点
前端：
- 使用`React-Router`代替Webpack多页面配置，简化数据页面内的数据传递过程。
- 改进token验证流程，通过axios拦截器简化权限请求过程。
服务端：
- 使用Nginx进行负载均衡配置，缓解频繁访问的模块的服务压力（如用户管理模块）。

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
|register_page|./src/user-management-module/pages/register_page.js|admin/register| tp | 用户注册 |
|    check_page    |    ./src/user-management-module/pages/check_page.js    |    admin/check    | tp | 用户查验 |
| user_manage_page | ./src/user-management-module/pages/user_manage_page.js | admin/user_manage | tp | 用户管理 |

#### Course Mangement Module

|  entry key  |                source path (js file)                | web path | writer |   desp   |
| :---------: | :-------------------------------------------------: | :------: | :----: | :------: |
| course_page | ./src/course-management-module/pages/course_page.js |  course  |   tp   | 课程主页 |

#### Experiment Mangement Module

|  entry key   |                  source path (js file)                  |    web path    | Writer |   desp   |
| :----------: | :-----------------------------------------------------: | :------------: | :----: | :------: |
|   exp_page   |  ./src/experiment-management-module/pages/exp_page.js   |   course/exp   |   tp   | 实验信息 |
| add_exp_page | ./src/experiment-management-module/pages/add_exp_page.j | course/exp/add |   tp   | 实验添加 |

#### Score Mangement Module

|      entry key      |                    source path (js file)                    |       web path        | writer |   desp   |
| :-----------------: | :---------------------------------------------------------: | :-------------------: | :----: | :------: |
|   attendance_page   |   ./src/score-management-module/pages/attendance_page.js    |   course/attendance   |   tp   | 考勤信息 |
| add_attendance_page | ./src/score-management-module/pages/ad d_attendance_page.js | course/attendance/add |   tp   | 考勤添加 |
|   assignment_page   |   ./src/score-management-module/pages/assignment_page.js    |   course/assignment   |   tp   | 作业信息 |
| add_assignment_page | ./src/score-management-module/pages/ad d_assignment_page.js | course/assignment/add |   tp   | 作业添加 |
|  score_report_page  |  ./src/score-management-module/pages/score_report_page.js   |  course/score_report  |   tp   | 成绩报告 |

#### Resource Lib Module

| entry key |            source path (js file)            | web path |       module        | writer | desp       |
| :-------: | :-----------------------------------------: | :------: | :-----------------: | :----: | ---------- |
| lib_home  | ./src/resource-lib-module/pages/lib_home.js |   Lib    | Resource Lib Module |   tp   | 资料库主页 |



