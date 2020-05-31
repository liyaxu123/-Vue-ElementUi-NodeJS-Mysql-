const router = require('koa-router')()
//引入MySQL数据库
const query = require('./MYSQL');
router.prefix('/shbx');

// 添加报修
router.post('/add', async (ctx, next) => {
	console.log(ctx.request.body);
	let uname = ctx.request.body.name;
	let tel = ctx.request.body.tel;
	let lynumber = ctx.request.body.lyNumber;
	let sushe = ctx.request.body.sushe;
	let bxdata = ctx.request.body.data;
	let bxtime = ctx.request.body.time;
	let bxdel = ctx.request.body.detail;
	let state = 1;
	let switchon = 1;
	// 将信息添加到数据库
	let a = await query(
		`insert into bxlb(uname,tel,lynumber,sushe,bxdata,bxtime,bxdel,state,switchon) values('${uname}','${tel}','${lynumber}','${sushe}','${bxdata}','${bxtime}','${bxdel}','${state}','${switchon}')`
	);
	console.log(a);
	if (a.affectedRows == 1) {
		// 代表插入成功
		let data = {
			code: 200,
			msg: '添加成功'
		};
		ctx.body = data;
	} else {
		let data = {
			code: 0,
			msg: '添加失败'
		};
		ctx.body = data;
	}
})

// 返回报修列表数据
router.post('/search', async (ctx, next) => {
	console.log(ctx.request.body);
	// 当前页数
	let pagenum = ctx.request.body.pagenum;
	// 当前页每页显示多少条数据
	let pagesize = ctx.request.body.pagesize;
	// 总条数
	let total = '';
	// 起始页索引
	let toppageIndex = (pagenum - 1) * pagesize;
	// 查询总条数 转换为字符串类型
	let b = JSON.stringify(await query('SELECT COUNT(*) FROM bxlb where state = 1'));
	console.log(b);
	// 截取字符串，并转化为数字类型，得到总条数
	total = parseInt(b.substring(13, 15));
	//查询数据库
	let a = await query('SELECT * FROM bxlb where state = 1 limit ' + toppageIndex + ',' + pagesize + '');
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

// 处理开关状态请求
router.post('/onoff', async (ctx, next) => {
	console.log(ctx.request.body);
	let id = ctx.request.body.id;
	let switchon = ctx.request.body.switchon;
	let a = await query(`update bxlb set switchon = '${switchon}' where id = ${id}`);
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
})

// 根据 id 报修信息
router.post('/del', async (ctx, next) => {
	console.log(ctx.request.body);
	let id = ctx.request.body.id;
	let a = await query(`update bxlb set state = 0 where id = ${id}`);
	console.log(a);
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
