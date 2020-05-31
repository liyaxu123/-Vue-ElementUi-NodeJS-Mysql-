const router = require('koa-router')()
//引入MySQL数据库
const query = require('./MYSQL');
router.prefix('/lgpf');


// 返回楼管评价页面搜索按钮的数据
router.post('/search', async (ctx, next) => {
	console.log(ctx.request.body);
	let lynumber = ctx.request.body.lynumber;
	let name = ctx.request.body.name;
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
	// 姓名
	let lgname = '';
	// 品格分
	let pgf = '';
	// 服务分
	let fwf = '';
	// 责任心分
	let zrx = '';
	if (lynumber == '' && name == '') {
		// 查询总条数 转换为字符串类型
		b = JSON.stringify(await query('SELECT COUNT(*) FROM lgpf'));
		console.log(b);
		// 截取字符串，并转化为数字类型，得到总条数
		total = parseInt(b.substring(13, 15));
		//查询数据库
		a = await query('SELECT * FROM lgpf limit ' + toppageIndex + ',' + pagesize + '');
		// 查询姓名
		lgname = await query('SELECT name FROM lgpf limit ' + toppageIndex + ',' + pagesize + '');
		// 查询品格分
		pgf = await query('SELECT pgf FROM lgpf limit ' + toppageIndex + ',' + pagesize + '');
		// 查询服务分
		fwf = await query('SELECT fwf FROM lgpf limit ' + toppageIndex + ',' + pagesize + '');
		// 查询责任心分
		zrx = await query('SELECT zrx FROM lgpf limit ' + toppageIndex + ',' + pagesize + '');
		
	} else {
		// 查询数据库
		a = await query(
			`SELECT * FROM lgpf where lynumber = '${lynumber}' or name = '${name}' limit ${toppageIndex},${pagesize}`
		);
		b = await query(
			`SELECT * FROM lgpf where lynumber = '${lynumber}' or name = '${name}'`
		);
		// 格式化 b 的数据类型
		var dataString1 = JSON.stringify(b);
		var result1 = JSON.parse(dataString1);
		// console.log(result1);
		// 得到总页数
		total = result1.length;
		
		// 查询姓名
		lgname = await query(`SELECT name FROM lgpf where lynumber = '${lynumber}' or name = '${name}' limit ${toppageIndex},${pagesize}`);
		// 查询品格分
		pgf = await query(`SELECT pgf FROM lgpf where lynumber = '${lynumber}' or name = '${name}' limit ${toppageIndex},${pagesize}`);
		// 查询服务分
		fwf = await query(`SELECT fwf FROM lgpf where lynumber = '${lynumber}' or name = '${name}' limit ${toppageIndex},${pagesize}`);
		// 查询责任心分
		zrx = await query(`SELECT zrx FROM lgpf where lynumber = '${lynumber}' or name = '${name}' limit ${toppageIndex},${pagesize}`);
	}

	// 格式化 a 的数据类型
	var dataString = JSON.stringify(a);
	var result = JSON.parse(dataString);
	console.log(result);
	// 格式化 lgname 的数据类型
	var dataString2 = JSON.stringify(lgname);
	var lgnameresult = JSON.parse(dataString2);
	console.log(lgnameresult);
	
	// 转换为数组格式
	let lgnamearr = [];
	for (var i in lgnameresult) {
		lgnamearr.push(lgnameresult[i].name)
	 }
	 console.log(lgnamearr);
	// 格式化 pgf 的数据类型
	var dataString3 = JSON.stringify(pgf);
	var pgfresult = JSON.parse(dataString3);
	console.log(pgfresult);
	
	let pgfarr = [];
	for (var i in pgfresult) {
		pgfarr.push(pgfresult[i].pgf)
	 }
	// 格式化 fwf 的数据类型
	var dataString4 = JSON.stringify(fwf);
	var fwfresult = JSON.parse(dataString4);
	console.log(fwfresult);
	
	let fwfarr = [];
	for (var i in fwfresult) {
		fwfarr.push(fwfresult[i].fwf)
	 }
	// 格式化 zrx 的数据类型
	var dataString5 = JSON.stringify(zrx);
	var zrxresult = JSON.parse(dataString5);
	// console.log(zrxresult);
	
	let zrxarr = [];
	for (var i in zrxresult) {
		zrxarr.push(zrxresult[i].zrx)
	 }
	if (result.length > 0) {
		let data = {
			code: 200,
			total: total,
			data: result,
			lgname:lgnamearr,
			pgf:pgfarr,
			fwf:fwfarr,
			zrx:zrxarr
		};
		ctx.body = data;
	} else {
		let data = {
			code: 0
		};
		ctx.body = data;
	}
});

// 返回楼管评价页面添加按钮的数据
router.post('/add', async (ctx, next) => {
	console.log(ctx.request.body);
	let lynumber = ctx.request.body.lyNumber;
	let name = ctx.request.body.name;
	let pgf = ctx.request.body.pgf;
	let fwf = ctx.request.body.fwf;
	let zrx = ctx.request.body.zrx;
	let data = ctx.request.body.data;
	let time1= ctx.request.body.time;
	let time = data +' ' +time1;
	// 计算总分
	let total = parseInt(pgf)  + parseInt(fwf) + parseInt(zrx);
	console.log(total);
	// 将信息添加到数据库
	let a = await query(
		`insert into lgpf(lynumber,name,pgf,fwf,zrx,time,total) values('${lynumber}','${name}','${pgf}','${fwf}','${zrx}','${time}','${total}')`);
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