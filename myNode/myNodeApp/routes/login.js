const router = require('koa-router')()
//引入MySQL数据库
const query = require('./MYSQL');
router.prefix('/login');

router.get('/', function(ctx, next) {
	ctx.body = '这是登录页面'
});

//登录页面，查询数据库是否有该用户并返回前端请求的数据
router.post('/', async (ctx, next) => {
	console.log(ctx.request.body);
	let name = ctx.request.body.name;
	let pass = ctx.request.body.password;
	//根据用户名和密码查询数据库
	let a = await query(`SELECT * FROM user where uname = '${name}' and pass = '${pass}'`);
	// console.log(a);
	// console.log(a.length);
	// 格式化数据类型
	var dataString = JSON.stringify(a);
	var result = JSON.parse(dataString);
	console.log(result);
	
	var data;
	if (result.length > 0) {
		// 得到用户的角色  0:超级管理员  1:楼管  2: 学生
		var roler = result[0].roler;
		console.log(roler);
		// 定义 超级管理员 的权限列表
		var routerlist0 = [{
				id: 1,
				authName: "个人中心",
				path: "grzx",
				children: [{
					id: "1.1",
					authName: "个人信息",
					path: "xgmm",
					children: []
				}]
			},
			{
				id: 2,
				authName: "楼宇管理",
				path: "lygl",
				children: [{
					id: "2.1",
					authName: "楼宇列表",
					path: "newly",
					children: []
				}]
			},
			{
				id: 3,
				authName: "宿舍管理",
				path: "ssgl",
				children: [{
						id: "3.1",
						authName: "宿舍列表",
						path: "sslb",
						children: []
					}]
			},
			{
				id: 4,
				authName: "用户权限管理",
				path: "yhqxgl",
				children: [{
						id: "4.1",
						authName: "用户权限列表",
						path: "yhlb",
						children: []
					}
				]
			},
			{
				id: 5,
				authName: "学生管理",
				path: "xsgl",
				children: [{
					id: "5.1",
					authName: "学生列表",
					path: "xslb",
					children: []
				}]
			},
			{
				id: 6,
				authName: "后勤服务",
				path: "hqfw",
				children: [{
						id: "6.1",
						authName: "损坏报修",
						path: "shbx",
						children: []
					},
					{
						id: "6.2",
						authName: "报修列表",
						path: "bxlb",
						children: []
					}
				]
			},
			{
				id: 7,
				authName: "生活服务",
				path: "shfw",
				children: [{
						id: "7.1",
						authName: "电费充值",
						path: "jdf",
						children: []
					},
					{
						id: "7.2",
						authName: "校园网充值",
						path: "xyw",
						children: []
					},
					{
						id: "7.3",
						authName: "校园一卡通",
						path: "xyykt",
						children: []
					}
				]
			},
			{
				id: 8,
				authName: "统计中心",
				path: "tjzx",
				children: [{
						id: "8.1",
						authName: "宿舍评分",
						path: "sspf",
						children: []
					},
					{
						id: "8.2",
						authName: "报修统计",
						path: "bxtj",
						children: []
					},
					{
						id: "8.3",
						authName: "楼管评价",
						path: "lgdf",
						children: []
					}
				]
			}
		]
		// 定义 楼管人员 的权限列表
		var routerlist1 = [{
				id: 1,
				authName: "个人中心",
				path: "grzx",
				children: [{
					id: "1.1",
					authName: "个人信息",
					path: "xgmm",
					children: []
				}]
			},
			{
				id: 3,
				authName: "宿舍管理",
				path: "ssgl",
				children: [{
						id: "3.1",
						authName: "宿舍列表",
						path: "sslb",
						children: []
					}
				]
			},
			{
				id: 5,
				authName: "学生管理",
				path: "xsgl",
				children: [{
					id: "5.1",
					authName: "学生列表",
					path: "xslb",
					children: []
				}]
			},
			{
				id: 6,
				authName: "后勤服务",
				path: "hqfw",
				children: [{
						id: "6.1",
						authName: "损坏报修",
						path: "shbx",
						children: []
					},
					{
						id: "6.2",
						authName: "报修列表",
						path: "bxlb",
						children: []
					}
				]
			},
			{
				id: 7,
				authName: "生活服务",
				path: "shfw",
				children: [{
						id: "7.1",
						authName: "电费充值",
						path: "jdf",
						children: []
					},
					{
						id: "7.2",
						authName: "校园网充值",
						path: "xyw",
						children: []
					},
					{
						id: "7.3",
						authName: "校园一卡通",
						path: "xyykt",
						children: []
					}
				]
			},
			{
				id: 8,
				authName: "统计中心",
				path: "tjzx",
				children: [{
						id: "8.1",
						authName: "宿舍评分",
						path: "sspf",
						children: []
					},
					{
						id: "8.2",
						authName: "报修统计",
						path: "bxtj",
						children: []
					},
					{
						id: "8.3",
						authName: "楼管评价",
						path: "lgdf",
						children: []
					}
				]
			}
		]
		// 定义 学生 权限路由表
		var routerlist2 = [{
				id: 1,
				authName: "个人中心",
				path: "grzx",
				children: [{
					id: "1.1",
					authName: "个人信息",
					path: "xgmm"
				}]
			},
			{
				id: 6,
				authName: "后勤服务",
				path: "hqfw",
				children: [{
					id: "6.1",
					authName: "损坏报修",
					path: "shbx"
				}]
			},
			{
				id: 7,
				authName: "生活服务",
				path: "shfw",
				children: [{
						id: "7.1",
						authName: "电费充值",
						path: "jdf"
					},
					{
						id: "7.2",
						authName: "校园网充值",
						path: "xyw"
					},
					{
						id: "7.3",
						authName: "校园一卡通",
						path: "xyykt"
					}
				]
			},
		]
		if(roler == 0){
			// 超级管理员
			data = {
				code: 200,
				data: result,
				route: routerlist0
			};
		}else if(roler == 1){
			// 楼管人员
			data = {
				code: 200,
				data: result,
				route: routerlist1
			};
		}else{
			// 学生用户
			data = {
				code: 200,
				data: result,
				route: routerlist2
			};
		}
		
		ctx.body = data;
	} else {
		let data = {
			code: 0
		};
		ctx.body = data;
	}
});
// 修改用户信息
router.post('/update', async (ctx, next) => {
	console.log(ctx.request.body);
	let id = ctx.request.body.id;
	let pass = ctx.request.body.pass;
	let xueyuan = ctx.request.body.xueyuan;
	let banji = ctx.request.body.banji;
	let tel = ctx.request.body.tel;
	let lynumber = ctx.request.body.lynumber;
	let sushe = ctx.request.body.sushe;
	//根据用户id值更新数据
	let a = await query(
		`update user set pass = '${pass}',xueyuan ='${xueyuan}',banji = '${banji}',tel = '${tel}',lynumber = '${lynumber}',sushe = '${sushe}' where id = ${id}`
	);
	console.log(a);

	if (a.changedRows == 1) {
		// 更新成功
		//根据id查询数据库,返回前端
		let newA = await query(`SELECT * FROM user WHERE id = ${id}`);
		// 格式化数据类型
		var newDataString = JSON.stringify(newA);
		var newResult = JSON.parse(newDataString);
		console.log(newResult);
		// 200代表更新成功
		let data = {
			code: 200,
			newResult
		};
		ctx.body = data;
	} else {
		let data = {
			code: 0
		};
		ctx.body = data;
	}
});



module.exports = router
