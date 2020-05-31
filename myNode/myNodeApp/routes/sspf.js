const router = require('koa-router')()
//引入MySQL数据库
const query = require('./MYSQL');
router.prefix('/sspf');

// 返回宿舍评分搜索按钮的数据
router.post('/search', async (ctx, next) => {
	console.log(ctx.request.body);
	let lynumber = ctx.request.body.lynumber;
	let sushe = ctx.request.body.sushe;
	let xueyuan = ctx.request.body.xueyuan;
	let banji = ctx.request.body.banji;
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
	// 宿舍号
	let ssh = '';
	// 卫生分
	let wsf = '';
	// 纪律分
	let jlf = '';
	// 宿舍文化分
	let whf = '';
	if (lynumber == '' && sushe == '' && xueyuan == '' && banji == '') {
		// 查询总条数 转换为字符串类型
		b = JSON.stringify(await query('SELECT COUNT(*) FROM sspf'));
		console.log(b);
		// 截取字符串，并转化为数字类型，得到总条数
		total = parseInt(b.substring(13, 15));
		//查询数据库
		a = await query('SELECT * FROM sspf limit ' + toppageIndex + ',' + pagesize + '');
		// 查询宿舍号
		ssh = await query('SELECT sushe FROM sspf limit ' + toppageIndex + ',' + pagesize + '');
		// 查询卫生分
		wsf = await query('SELECT health FROM sspf limit ' + toppageIndex + ',' + pagesize + '');
		// 查询纪律分
		jlf = await query('SELECT discipline FROM sspf limit ' + toppageIndex + ',' + pagesize + '');
		// 查询宿舍文化分
		whf = await query('SELECT dormitoryculture FROM sspf limit ' + toppageIndex + ',' + pagesize + '');
		
	} else {
		// 查询数据库
		a = await query(
			`SELECT * FROM sspf where lynumber = '${lynumber}' and sushe = '${sushe}' or xueyuan = '${xueyuan}' and banji = '${banji}' limit ${toppageIndex},${pagesize}`
		);
		b = await query(
			`SELECT * FROM sspf where sushe = '${sushe}' or xueyuan = '${xueyuan}' or lynumber = '${lynumber}' or banji = '${banji}'`
		);
		// 格式化 b 的数据类型
		var dataString1 = JSON.stringify(b);
		var result1 = JSON.parse(dataString1);
		// console.log(result1);
		// 得到总页数
		total = result1.length;
		
		// 查询宿舍号
		ssh = await query(`SELECT sushe FROM sspf where lynumber = '${lynumber}' and sushe = '${sushe}' or xueyuan = '${xueyuan}' and banji = '${banji}' limit ${toppageIndex},${pagesize}`);
		// 查询卫生分
		wsf = await query(`SELECT health FROM sspf where lynumber = '${lynumber}' and sushe = '${sushe}' or xueyuan = '${xueyuan}' and banji = '${banji}' limit ${toppageIndex},${pagesize}`);
		// 查询纪律分
		jlf = await query(`SELECT discipline FROM sspf where lynumber = '${lynumber}' and sushe = '${sushe}' or xueyuan = '${xueyuan}' and banji = '${banji}' limit ${toppageIndex},${pagesize}`);
		// 查询宿舍文化分
		whf = await query(`SELECT dormitoryculture FROM sspf where lynumber = '${lynumber}' and sushe = '${sushe}' or xueyuan = '${xueyuan}' and banji = '${banji}' limit ${toppageIndex},${pagesize}`);
	}

	// 格式化 a 的数据类型
	var dataString = JSON.stringify(a);
	var result = JSON.parse(dataString);
	console.log(result);
	// 格式化 ssh 的数据类型
	var dataString2 = JSON.stringify(ssh);
	var sshresult = JSON.parse(dataString2);
	console.log(sshresult);
	
	// 转换为数组格式
	let ssharr = [];
	for (var i in sshresult) {
		ssharr.push(parseInt(sshresult[i].sushe))
	 }
	 console.log(ssharr);
	// 格式化 wsf 的数据类型
	var dataString3 = JSON.stringify(wsf);
	var wsfresult = JSON.parse(dataString3);
	console.log(wsfresult);
	
	let wsfarr = [];
	for (var i in wsfresult) {
		wsfarr.push(wsfresult[i].health)
	 }
	// 格式化 jlf 的数据类型
	var dataString4 = JSON.stringify(jlf);
	var jlfresult = JSON.parse(dataString4);
	console.log(jlfresult);
	
	let jlfarr = [];
	for (var i in jlfresult) {
		jlfarr.push(jlfresult[i].discipline)
	 }
	// 格式化 whf 的数据类型
	var dataString5 = JSON.stringify(whf);
	var whfresult = JSON.parse(dataString5);
	console.log(whfresult);
	
	let whfarr = [];
	for (var i in whfresult) {
		whfarr.push(whfresult[i].dormitoryculture)
	 }
	if (result.length > 0) {
		let data = {
			code: 200,
			total: total,
			data: result,
			ssh:ssharr,
			wsf:wsfarr,
			jlf:jlfarr,
			whf:whfarr
		};
		ctx.body = data;
	} else {
		let data = {
			code: 0
		};
		ctx.body = data;
	}
})




module.exports = router
