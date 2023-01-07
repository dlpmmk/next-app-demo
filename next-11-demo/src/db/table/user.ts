import dataWrap from '@mmstudio/an000060';
import getDb from '../db';

const db = getDb();

/**
 * 用户表
 */
export interface ITbuser {
	/**
	 * 用户名
	 */
	userid: string;	// text
	/**
	 * 姓名
	 */
	name: string;	// text
	/**
	 * 性别：0 女 1 男
	 */
	sex: number;	// smallint
	/**
	 * 密码
	 */
	password: string;	// text
	/**
	 * 手机号
	 */
	phone: string;	// text
	/**
	 * 邮箱
	 */
	email: string;	// text
	/**
	 * 用户头像
	 */
	avatar: string;	// text
	/**
	 * 逻辑删除标识：0 删除 1 在用
	 */
	state: number;	// smallint
	/**
	 * 更新人姓名
	 */
	update_name: string;	// text
	/**
	 * 更新时间
	 */
	update_time: string;	// bigint
}

type IData = ITbuser;
const tableName = 'user';

/**
 * 用户表
 */
export default function tbuser() {
	return dataWrap<IData>(db, tableName);
	// return {
	// 	/**
	// 	 * sql查询 ！！！ 慎用
	// 	 */
	// 	raw<T = any>(sql: string, ...bindings: any[]) {
	// 		return db.raw(sql, ...bindings) as unknown as T;
	// 	},
	// 	...dataWrap<IData>(db, tableName)
	// };
}
