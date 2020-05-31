const router = require('koa-router')()
//引入MySQL数据库
const query = require('./MYSQL');
router.prefix('/dormList');

// 搜索按钮点击事件搜索相应内容并返回
router.post('/search', async (ctx, next) => {
	console.log(ctx.request.body);
	let lynumber = ctx.request.body.lynumber;
	let lgname = ctx.request.body.lgname;
	let ssnumber = ctx.request.body.ssnumber;
	// 当前页数
	let pagenum = ctx.request.body.pagenum;
	// 当前页每页显示多少条数据
	let pagesize = ctx.request.body.pagesize;
	// 根据楼宇号查询
	let a = await query(`SELECT * FROM lynumber where state = 1 && lynumber = '${lynumber}'`);
	// 格式化 a 的数据类型
	var dataString = JSON.stringify(a);
	var result = JSON.parse(dataString);
	// console.log(result);
	// console.log(result[0].id);
	// 得到lyid
	let lyid = result[0].id;
	// 根据lyid 在宿舍表中查找对应楼宇的所有宿舍
	var b = '';
	if (ssnumber == '') {
		// 根据lyid 在宿舍表中查找对应楼宇的所有宿舍
		b = await query(`SELECT * FROM sushe where lyid = '${lyid}'`);
	} else if (lynumber != '' && ssnumber != '') {
		// 根据lyid 和宿舍号 在宿舍表中查找对应楼宇的所有宿舍
		b = await query(`SELECT * FROM sushe where lyid = '${lyid}' and sushe = ${ssnumber}`);
	}

	// 格式化 b 的数据类型
	var dataString2 = JSON.stringify(b);
	var result2 = JSON.parse(dataString2);
	// console.log(result2.length);
	// 页码总条数
	var pagetotal = result2.length;
	// 起始页索引
	let toppageIndex = (pagenum - 1) * pagesize;

	// 分页查询
	//查询数据库
	var c = '';
	if (ssnumber == '') {
		// 根据楼宇号在宿舍表中查找对应楼宇的所有宿舍
		c = await query('SELECT * FROM sushe where lyid = ' + lyid + ' limit ' + toppageIndex + ',' + pagesize + '');
	} else if (lynumber != '' && ssnumber != '') {
		// 根据lyid 和宿舍号 在宿舍表中查找对应楼宇的所有宿舍
		c = await query('SELECT * FROM sushe where lyid = ' + lyid + ' and sushe = ' + ssnumber + ' limit ' + toppageIndex +
			',' + pagesize + '');
	}
	console.log(c);
	console.log(c.length);
	// 格式化数据类型
	var dataString3 = JSON.stringify(c);
	var result3 = JSON.parse(dataString3);
	console.log('++++++++++++++++++++++++++++++++++')
	console.log(result3);

	// console.log('----------------------------------------');
	// result2 就是最后根据楼宇号查询到的宿舍信息
	// console.log(result2);
	// for循环再根据查询到的宿舍查询，将查询到的宿舍人员信息添加到 result3 的children 中
	for (var i = 0; i < result3.length; i++) {
		// console.log('+++++++++++++++++++++++++++++++++++++++++++');
		// console.log(result2[i].sushe);
		// 根据宿舍号和楼宇号查询该宿舍的人员信息
		let ssry = await query(
			`SELECT * FROM user WHERE state = 1 && sushe = ${result3[i].sushe} && lynumber = '${lynumber}'`);
		// 格式化 ssry 的数据类型
		var ssryDataString = JSON.stringify(ssry);
		var ssryResult = JSON.parse(ssryDataString);
		// console.log('========================================================');
		// ssryResult 就是最后查询到的该楼宇中每个宿舍中的人员信息
		// console.log(ssryResult);
		// 将 ssryResult 添加到 result2 每个对象中的children 属性中
		result3[i].child = ssryResult;
		// console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
		// console.log(result2);
	}

	if (result.length > 0) {
		let data = {
			code: 200,
			data: result3,
			pagetotal: pagetotal
		};
		ctx.body = data;
	} else {
		let data = {
			code: 0
		};
		ctx.body = data;
	}
});

// 向宿舍中添加（分配）学生
router.post('/adduser', async (ctx, next) => {
	console.log(ctx.request.body);
	var name = ctx.request.body.name;
	var uname = ctx.request.body.studentId;
	var tel = ctx.request.body.tel;
	var fdy = ctx.request.body.fdy;
	var fdytel = ctx.request.body.fdytel;
	var xueyuan = ctx.request.body.xueyuan;
	var banji = ctx.request.body.banji;
	var sex = ctx.request.body.sex;
	var pass = ctx.request.body.pass;
	var lyid = ctx.request.body.lyid;
	var sushe = ctx.request.body.sushe;
	var state = 1;
	// 根据 lyid 查询到楼宇号
	let a = await query(`SELECT lynumber FROM lynumber where state = 1 && id = '${lyid}'`);
	// 格式化 a 的数据类型
	var dataString = JSON.stringify(a);
	var result = JSON.parse(dataString);
	console.log(result);
	let lynumber = result[0].lynumber;
	console.log('+++++++++++++++++++++++++++++');
	// 得到楼宇号
	console.log(lynumber);
	// 将前端传过来的信息添加到数据库
	let insertMysql = await query(
		`insert into user(uname,pass,name,sex,xueyuan,banji,tel,sushe,lynumber,fdy,fdytel,state) values('${uname}','${pass}','${name}','${sex}','${xueyuan}','${banji}','${tel}','${sushe}','${lynumber}','${fdy}','${fdytel}',1)`
	);
	console.log(insertMysql);
	if (insertMysql.affectedRows == 1) {
		// 代表插入成功
		let data = {
			code: 200,
			msg: '插入成功'
		};
		ctx.body = data;
	} else {
		let data = {
			code: 0,
			msg: '插入失败'
		};
		ctx.body = data;
	}
})

// 根据 id 删除学生信息
router.post('/del', async (ctx, next) => {
	console.log(ctx.request.body);
	var id = ctx.request.body.id;
	//根据用户id值更新对应学生的状态，用来控制该学生是否被删除
	let a = await query(`update user set state = 0 where id = ${id}`);

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
