const router = require('koa-router')()
//引入MySQL数据库
const query = require('./MYSQL');
router.prefix('/bxtj');

// 返回楼管评价页面搜索按钮的数据
router.post('/search', async (ctx, next) => {
	console.log(ctx.request.body);
	let lynumber = ctx.request.body.lynumber;
	// 当前页数
	let pagenum = ctx.request.body.pagenum;
	// 当前页每页显示多少条数据
	let pagesize = ctx.request.body.pagesize;
	// 总条数
	let total = '';
	// 起始页索引
	let toppageIndex = (pagenum - 1) * pagesize;
	let a = '';
	let b = '';
	// 楼宇号
	let lyh = '';
	// 保修损耗
	let bxsh = '';
	// 材料购买
	let clgm = '';
	// 楼宇维护
	let lywh = '';
	if (lynumber == '') {
		// 查询总条数 转换为字符串类型
		b = JSON.stringify(await query('SELECT COUNT(*) FROM bxtj'));
		console.log(b);
		// 截取字符串，并转化为数字类型，得到总条数
		total = parseInt(b.substring(13, 15));
		//查询数据库
		a = await query('SELECT * FROM bxtj limit ' + toppageIndex + ',' + pagesize + '');
		// 查询楼宇号
		lyh = await query('SELECT lynumber FROM bxtj limit ' + toppageIndex + ',' + pagesize + '');
		// 查询保修损耗
		bxsh = await query('SELECT bxsh FROM bxtj limit ' + toppageIndex + ',' + pagesize + '');
		// 查询材料购买
		clgm = await query('SELECT clgm FROM bxtj limit ' + toppageIndex + ',' + pagesize + '');
		// 查询楼宇维护
		lywh = await query('SELECT lywh FROM bxtj limit ' + toppageIndex + ',' + pagesize + '');
		
	} else {
		// 查询数据库
		a = await query(
			`SELECT * FROM bxtj where lynumber = '${lynumber}' limit ${toppageIndex},${pagesize}`
		);
		b = await query(
			`SELECT * FROM bxtj where lynumber = '${lynumber}'`
		);
		// 格式化 b 的数据类型
		var dataString1 = JSON.stringify(b);
		var result1 = JSON.parse(dataString1);
		// console.log(result1);
		// 得到总页数
		total = result1.length;
		
		// 查询楼宇号
		lyh = await query(`SELECT lynumber FROM bxtj where lynumber = '${lynumber}' limit ${toppageIndex},${pagesize}`);
		// 查询保修损耗
		bxsh = await query(`SELECT bxsh FROM bxtj where lynumber = '${lynumber}' limit ${toppageIndex},${pagesize}`);
		// 查询材料购买
		clgm = await query(`SELECT clgm FROM bxtj where lynumber = '${lynumber}' limit ${toppageIndex},${pagesize}`);
		// 查询楼宇维护
		lywh = await query(`SELECT lywh FROM bxtj where lynumber = '${lynumber}' limit ${toppageIndex},${pagesize}`);
	}

	// 格式化 a 的数据类型
	var dataString = JSON.stringify(a);
	var result = JSON.parse(dataString);
	console.log(result);
	// 格式化 lyh 的数据类型
	var dataString2 = JSON.stringify(lyh);
	var lyhresult = JSON.parse(dataString2);
	console.log(lyhresult);
	
	// 转换为数组格式
	let lyharr = [];
	for (var i in lyhresult) {
		lyharr.push(lyhresult[i].lynumber)
	 }
	 console.log(lyharr);
	// 格式化 bxsh 的数据类型
	var dataString3 = JSON.stringify(bxsh);
	var bxshresult = JSON.parse(dataString3);
	console.log(bxshresult);
	
	let bxsharr = [];
	for (var i in bxshresult) {
		bxsharr.push(bxshresult[i].bxsh)
	 }
	// 格式化 clgm 的数据类型
	var dataString4 = JSON.stringify(clgm);
	var clgmresult = JSON.parse(dataString4);
	console.log(clgmresult);
	
	let clgmarr = [];
	for (var i in clgmresult) {
		clgmarr.push(clgmresult[i].clgm)
	 }
	// 格式化 lywh 的数据类型
	var dataString5 = JSON.stringify(lywh);
	var lywhresult = JSON.parse(dataString5);
	// console.log(lywhresult);
	
	let lywharr = [];
	for (var i in lywhresult) {
		lywharr.push(lywhresult[i].lywh)
	 }
	if (result.length > 0) {
		let data = {
			code: 200,
			total: total,
			data: result,
			lyh:lyharr,
			bxsh:bxsharr,
			clgm:clgmarr,
			lywh:lywharr
		};
		ctx.body = data;
	} else {
		let data = {
			code: 0
		};
		ctx.body = data;
	}
});

// 返回报修统计页面添加按钮的数据
router.post('/add', async (ctx, next) => {
	console.log(ctx.request.body);
	let lynumber = ctx.request.body.lyNumber;
	let name = ctx.request.body.name;
	let tel = ctx.request.body.tel;
	let bxsh = ctx.request.body.bxsh;
	let clgm = ctx.request.body.clgm;
	let lywh = ctx.request.body.lywh;
	// 计算总分
	let total = parseInt(bxsh)  + parseInt(clgm) + parseInt(lywh);
	console.log(total);
	// 将信息添加到数据库
	let a = await query(
		`insert into bxtj(lynumber,name,tel,bxsh,clgm,lywh,total) values('${lynumber}','${name}','${tel}','${bxsh}','${clgm}','${lywh}','${total}')`);
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


module.exports = router