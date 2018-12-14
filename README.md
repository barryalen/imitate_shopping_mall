仿商城--移动端

About
此demo是 JQ + MUI + nodejs + mysql 构建的仿商城项目

实现功能:
	首页		静态展示页面模块
	分类		一级分类、二级分类
	商品		搜索中心、商品列表、商品详情
	购物车		购物车管理，商品编辑
	用户		登录、注册、账户管理
	收货地址	展示、添加、编辑、删除

  
项目启动:
	1.下载源码需要依赖的外部文件，其实就是包。
		npm i  或者  npm install
	2.创建数据库，初始化数据
		docs/dataSql.text
	3.修改数据库连接
		//修改models文件夹里面的db.js中的数据库链接信息
		const pool  = mysql.createPool({
			host : '127.0.0.1',
			user : '',
			password : '',
			database : ''
		});
		//a)	host 数据库的ip地址
		//b)	user 数据库的用户名
		//c)	password 数据库密码
		//d)	database 数据库的库名
	4.启动项目
		npm start 
