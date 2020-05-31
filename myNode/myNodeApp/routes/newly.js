const router = require('koa-router')()
//引入MySQL数据库
const query = require('./MYSQL');
router.prefix('/newly');

// router.get('/', function (ctx, next) {
//   ctx.body = '这是新区楼宇界面'
// });

//查询所有的楼宇信息并返回前端请求的数据
router.post('/', async (ctx, next) => {
	console.log(ctx.request.body);
	// 当前页码
	let pagenum = ctx.request.body.pagenum;
	// 每页显示的条数
	let pagesize = ctx.request.body.pagesize;
	// 查询总条数 转换为字符串类型
	let b = JSON.stringify(await query('SELECT COUNT(*) FROM lynumber where state = 1'));
	console.log(b);
	// 截取字符串，并转化为数字类型，得到总条数
	let total = parseInt(b.substring(13, 15));
	// 判断总页数是否整除每页的条数
	// if(total % pagesize == 0){
	// 	pagenum = total/pagesize;
	// }
	// 起始页索引
	let toppageIndex = (pagenum - 1) * pagesize;


	//查询数据库
	let a = await query('SELECT * FROM lynumber where state = 1 limit ' + toppageIndex + ',' + pagesize + '');
	// console.log(a);
	console.log(a.length);
	// 格式化数据类型
	var dataString = JSON.stringify(a);
	var result = JSON.parse(dataString);
	// console.log(result);

	if (result.length > 0) {
		let data = {
			code: 200,
			total: total,
			data: result
		};
		ctx.body = data;
	} else {
		let data = {
			code: 0
		};
		ctx.body = data;
	}
});

// 查询所有的楼宇名字
router.post('/lyname', async (ctx, next) => {
	console.log(ctx.request.body);
	//查询数据库
	let a = await query('SELECT lynumber FROM lynumber where state = 1');
	// console.log(a);
	// 格式化数据类型
	var dataString = JSON.stringify(a);
	var result = JSON.parse(dataString);
	console.log(result);
	if (result.length > 0) {
		let data = {
			code: 200,
			data: result
		};
		ctx.body = data;
	} else {
		let data = {
			code: 0
		};
		ctx.body = data;
	}
});

// 搜索按钮点击事件搜索相应内容并返回
router.post('/search', async (ctx, next) => {
	// console.log('--------------------------------------------');
	console.log(ctx.request.body);
	let lynumber = ctx.request.body.lynumber;
	let userName = ctx.request.body.userName;
	var a = '';
	if (userName == '') {
		//根据楼宇号查询数据库
		a = await query(`SELECT * FROM lynumber where state = 1 && lynumber = '${lynumber}'`);
	} 
	 if (lynumber == '') {
		//根据姓名模糊查询数据库
		a = await query(`SELECT * FROM lynumber where leader like '%${userName}%' && state = 1`);
	} 
	 if(lynumber == '' && userName == ''){
		//查询全部数据库
		a = await query(`SELECT * FROM lynumber where state = 1`);
	}

	// console.log(a);
	// 格式化数据类型
	var dataString = JSON.stringify(a);
	var result = JSON.parse(dataString);
	console.log(result);
	if (result.length > 0) {
		let data = {
			code: 200,
			data: result
		};
		ctx.body = data;
	} else {
		let data = {
			code: 0
		};
		ctx.body = data;
	}
});

// 添加楼宇信息
router.post('/add', async (ctx, next) => {
	console.log(ctx.request.body);
	let lynumber = ctx.request.body.lynumber;
	let leader = ctx.request.body.leader;
	let sex = ctx.request.body.sex;
	let tel = ctx.request.body.tel;
	// 将信息添加到数据库
	let a = await query(
		`insert into lynumber(lynumber,leader,sex,tel,state) values('${lynumber}','${leader}','${sex}','${tel}',1)`);
	console.log(a);
	if (a.affectedRows == 1) {
		// 代表插入成功
		let data = {
			code: 200,
			msg:'插入成功'
		};
		ctx.body = data;
	}else{
		let data = {
			code: 0,
			msg:'插入失败'
		};
		ctx.body = data;
	}
});
// 根据id修改楼管信息
router.post('/edit', async (ctx, next) => {
	console.log('===========================');
	console.log(ctx.request.body);
	let id = ctx.request.body.id;
	let leader = ctx.request.body.leader;
	let sex = ctx.request.body.sex;
	let tel = ctx.request.body.tel;
	// 根据楼管id修改数据
	let a = await query(`update lynumber set leader = '${leader}',sex = '${sex}',tel = '${tel}' where id = ${id}`);
	console.log(a);
	if (a.changedRows == 1 && a.affectedRows == 1) {
		let data = {
			code: 200,
			msg:'更新成功'
		};
		ctx.body = data;
	}else if(a.changedRows == 0 && a.affectedRows == 1){
			let data = {
				code: 100,
				msg:'与原数据一致'
			};
			ctx.body = data;
		}else if(a.changedRows == 0 && a.affectedRows == 0){
			let data = {
				code: 0,
				msg:'更新失败'
			};
			ctx.body = data;
		}
	
	});
	
	// 根据id查看该楼管信息
	router.post('/show', async (ctx, next) => {
		console.log(ctx.request.body);
		let id = ctx.request.body.id;
		// 根据楼管id修改数据
		let a = await query('SELECT * FROM lynumber where state = 1 && id = '+id+'');
		console.log(a);
		// 格式化数据类型
		var dataString = JSON.stringify(a);
		var result = JSON.parse(dataString);
		console.log(result);
		if (result.length > 0) {
			let data = {
				code: 200,
				data: result
			};
			ctx.body = data;
		} else {
			let data = {
				code: 0
			};
			ctx.body = data;
		}
		
		});

// 根据传过来的id值删除对应的信息
router.post('/delete', async (ctx, next) => {
	console.log(ctx.request.body);
	let id = ctx.request.body.id;
	// 当前页码
	let pagenum = ctx.request.body.pagenum;
	// 每页显示的条数
	let pagesize = ctx.request.body.pagesize;

	//根据用户id值更新对应楼宇的状态，用来控制该楼宇是否被删除
	let a = await query(`update lynumber set state = 0 where id = ${id}`);
	// console.log(a);

	// 查询总条数 转换为字符串类型
	let b = JSON.stringify(await query('SELECT COUNT(*) FROM lynumber where state = 1'));
	// console.log(b);
	// 截取字符串，并转化为数字类型，得到总条数
	let total = parseInt(b.substring(13, 15));
	// 判断真实的页数与传过来的页数是否相等
	// if(total/pagesize < pagenum){
	// 	pagenum = total/pagesize;
	// }
	// 起始页索引
	let toppageIndex = (pagenum - 1) * pagesize;
	if (a.changedRows == 1) {
		// 更新成功
		// console.log(toppageIndex);
		// console.log(pagesize);

		//查询数据库,返回前端
		let newA = await query('SELECT * FROM lynumber where state = 1 limit ' + toppageIndex + ',' + pagesize + '');
		console.log(newA);
		// 格式化数据类型
		var newDataString = JSON.stringify(newA);
		var newResult = JSON.parse(newDataString);
		// console.log(newResult);
		// 200代表更新成功
		let data = {
			code: 200,
			newResult,
			'total': total
		};
		ctx.body = data;
	} else {
		let data = {
			code: 0
		};
		ctx.body = data;
	}
});

// 导入excel
router.post('/addexl', async (ctx, next) => {
	console.log('+++++++++++++++++++++++++++++++++++++++');
	console.log(ctx.request.body);
	console.log('+++++++++++++++++++++++++++++++++++++++');
})




module.exports = router
