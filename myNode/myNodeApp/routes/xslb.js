const router = require('koa-router')()
//引入MySQL数据库
const query = require('./MYSQL');
router.prefix('/xslb');

// 搜索按钮点击事件搜索相应内容并返回
router.post('/search', async (ctx, next) => {
	console.log(ctx.request.body);
	let uname = ctx.request.body.studentNumber;
	let name = ctx.request.body.studentName;
	let sushe = ctx.request.body.susheNumber;
	let xueyuan = ctx.request.body.xueyuan;
	let lynumber = ctx.request.body.lyNumber;
	let banji = ctx.request.body.className;
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
	if(uname == '' && name == '' && sushe == '' && xueyuan == '' && lynumber == '' && banji == ''){
		console.log("1232312122+++++++++++++++++++++++++++++++++++++++++++++++++++++")
		// 查询总条数 转换为字符串类型
		b = JSON.stringify(await query('SELECT COUNT(*) FROM user where state = 1'));
		console.log(b);
		// 截取字符串，并转化为数字类型，得到总条数
		total = parseInt(b.substring(13, 15));
		//查询数据库
		a = await query('SELECT * FROM user where state = 1 limit ' + toppageIndex + ',' + pagesize + '');
	}else{
		// 查询数据库
		a = await query(
			`SELECT * FROM user where uname = '${uname}' or name = '${name}' or sushe = '${sushe}' or xueyuan = '${xueyuan}' or lynumber = '${lynumber}' or banji = '${banji}' and state = 1 limit ${toppageIndex},${pagesize}`
		);
		b = await query(
			`SELECT * FROM user where uname = '${uname}' or name = '${name}' or sushe = '${sushe}' or xueyuan = '${xueyuan}' or lynumber = '${lynumber}' or banji = '${banji}' and state = 1`
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
});

// 添加学生
router.post('/add', async (ctx, next) => {
	console.log(ctx.request.body);
	let pass = ctx.request.body.pass;
	let state = ctx.request.body.state;
	let uname = ctx.request.body.stuNumber;
	let name = ctx.request.body.stuName;
	let sex = ctx.request.body.sex;
	let tel = ctx.request.body.tel;
	let sushe = ctx.request.body.sushe;
	let xueyuan = ctx.request.body.xueyuan;
	let banji = ctx.request.body.banji;
	let lynumber = ctx.request.body.lyNumber;
	let fdy = ctx.request.body.fdy;
	let fdytel = ctx.request.body.fdytel;
	let family = ctx.request.body.family;
	let familytel = ctx.request.body.familytel;
	// 将信息添加到数据库
	let a = await query(
		`insert into user(pass,state,uname,name,sex,tel,sushe,xueyuan,banji,lynumber,fdy,fdytel,family,familytel) values('${pass}','${state}','${uname}','${name}','${sex}','${tel}','${sushe}','${xueyuan}','${banji}','${lynumber}','${fdy}','${fdytel}','${family}','${familytel}')`);
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

// 根据学生 ID 修改 学生信息
router.post('/edit', async (ctx, next) => {
	console.log(ctx.request.body);
	let id = ctx.request.body.id;
	let uname = ctx.request.body.uname;
	let name = ctx.request.body.name;
	let sex = ctx.request.body.sex;
	let tel = ctx.request.body.tel;
	let sushe = ctx.request.body.sushe;
	let xueyuan = ctx.request.body.xueyuan;
	let lynumber = ctx.request.body.lynumber;
	let fdy = ctx.request.body.fdy;
	let fdytel = ctx.request.body.fdytel;
	let family = ctx.request.body.family;
	let familytel = ctx.request.body.familytel;
	// 根据楼管id修改数据
	let a = await query(`update user set uname = '${uname}',name = '${name}',sex = '${sex}',tel = '${tel}',sushe = '${sushe}',xueyuan = '${xueyuan}',lynumber = '${lynumber}',fdy = '${fdy}',fdytel = '${fdytel}',family = '${family}',familytel = '${familytel}' where id = ${id}`);
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

// 根据学生 ID 删除学生信息
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
