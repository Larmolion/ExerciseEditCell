import mockJs from "mockjs"

const Mock = {
	// 模拟获取订单数据
	// type：订单类型，0为普通订单，1为秒杀订单，2为今日推荐
	getOrder(type, pageSize) {
		let array = [];
		for (let i = 0; i < pageSize; i++) {
			array.push(mockJs.mock({
				'name': (type == 0 ? '普通商品' : '秒杀商品') + type + i,
				'price': mockJs.Random.integer(20, 500) + '元',
				'buyer': mockJs.Random.cname(),
				// mock的日期格式与element支持的格式有稍微地不同，注意修改
				'time': mockJs.Random.datetime('yyyy-MM-dd HH:mm:ss'),
				'role': mockJs.Random.boolean(),
				'state': mockJs.Random.boolean(),
				'payType': mockJs.Random.boolean(),
				'phone': mockJs.mock(/(1)\d{10}/)
			}))
		}
		return array;
	},
	// 模拟获取商品数据
	// type：订单类型，0为普通订单，1为秒杀订单，2为今日推荐
	getGoods(type) {
		let array = [];
		for (let i = 0; i < mockJs.Random.integer(5, 10); i++) {
			array.push(mockJs.mock({
				'name': (type == 0 ? '普通商品' : type === 1 ? '秒杀商品' : "今日推荐") + i,
				'img': mockJs.Random.dataImage('60x100', '商品示例图'),
				'price': mockJs.Random.integer(20, 500) + '元',
				'sellCount': mockJs.Random.integer(10, 100),
				'count': mockJs.Random.integer(10, 100),
				'back': mockJs.Random.integer(10, 100),
				'backPrice': mockJs.Random.integer(10, 5000) + '元',
				'owner': mockJs.Random.cname(),
				'time': mockJs.Random.datetime('yyyy-MM-dd A HH:mm:ss'),
				'state': mockJs.Random.boolean(),
			}))
		}
		return array;
	},
	// 模拟店长数据
	getManagerList() {
		let array = [];
		for (let i = 0; i < mockJs.Random.integer(5, 10); i++) {
			array.push(mockJs.mock({
				'people': mockJs.Random.csentence(),
				'weixin': mockJs.Random.string(1, 10),
				'state': mockJs.Random.boolean(),
				'income': mockJs.Random.integer(0, 500000) + '元' + '元',
				'back': mockJs.Random.integer(0, 1000) + '元',
				'backPrice': mockJs.Random.csentence() + '元',
				'source': '站内',
				'customer': mockJs.Random.integer(0, 50),
				'time': mockJs.Random.datetime('yyy-MM-dd A HH:mm:ss'),
			}))
		}
		return array
	}
}

export default Mock;

// git clone https://user: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@ghproxy.com/https://github.com/Larmolion/ExerciseEditCell.git
