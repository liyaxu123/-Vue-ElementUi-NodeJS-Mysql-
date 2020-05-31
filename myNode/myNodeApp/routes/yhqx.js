const router = require('koa-router')()
//引入MySQL数据库
const query = require('./MYSQL');
router.prefix('/yhqx');
// 搜索按钮点击事件搜索相应内容并返回
router.post('/search', async (ctx, next) => {
	console.log(ctx.request.body);
	let name = ctx.request.body.query;
	// 当前页数
	let pagenum = ctx.request.body.pagenum;
	// 当前页每页显示多少条数据
	let pagesize = ctx.request.body.pagesize;
	// 总条数
	let total = '';
	let a = '';
	let b = '';
	// 起始页索引
	let toppageIndex = (pagenum - 1) * pagesize;
	if(name == ''){
		// 查询总条数 转换为字符串类型
		b = JSON.stringify(await query('SELECT COUNT(*) FROM yhqx where state = 1'));
		console.log(b);
		// 截取字符串，并转化为数字类型，得到总条数
		total = parseInt(b.substring(13, 15));
		//查询数据库
		a = await query('SELECT * FROM yhqx where state = 1 limit ' + toppageIndex + ',' + pagesize + '');
	}else{
		// 查询数据库
		a = await query(
			`SELECT * FROM yhqx where name = '${name}' and state = 1 limit ${toppageIndex},${pagesize}`
		);
		b = await query(
			`SELECT * FROM yhqx where name = '${name}' and state = 1`
		);
		// 格式化 b 的数据类型
		var dataString1 = JSON.stringify(b);
		var result1 = JSON.parse(dataString1);
		// console.log(result1);
		// 得到总页数
		total = result1.length;
	}
	// 格式化 a 的数据类型
	var dataString = JSON.stringify(a);
	var result = JSON.parse(dataString);
	console.log(result);
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
})

// 添加按钮点击事件搜索相应内容并返回
router.post('/add', async (ctx, next) => {
	console.log(ctx.request.body);
	let name = ctx.request.body.userName;
	let sex = ctx.request.body.sex;
	let tel = ctx.request.body.telephone;
	let roler = ctx.request.body.role;
	let state = 1;
	// 将信息添加到数据库
	let a = await query(
		`insert into yhqx(name,sex,tel,roler,state) values('${name}','${sex}','${tel}','${roler}','${state}')`);
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
})

// 修改按钮点击事件搜索相应内容并返回
router.post('/edit', async (ctx, next) => {
	console.log(ctx.request.body);
	let id = ctx.request.body.id;
	let name = ctx.request.body.name;
	let tel = ctx.request.body.tel;
	let roler = ctx.request.body.roler;
	// 根据id修改数据
	let a = await query(`update yhqx set tel = '${tel}',roler = '${roler}' where id = ${id}`);
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
// 根据 ID 删除信息
router.post('/del', async (ctx, next) => {
	console.log(ctx.request.body);
	var id = ctx.request.body.id;
	//根据用户id值更新对应学生的状态，用来控制该学生是否被删除
	let a = await query(`update yhqx set state = 0 where id = ${id}`);

	if (a.changedRows == 1) {
		let data = {
			code: 200,
			msg:'删除成功'
		};
		ctx.body = data;
	} else {
		let data = {
			code: 0,
			msg:'删除失败'
		};
		ctx.body = data;
	}

})

module.exports = router