import { Transaction } from '@mmstudio/an000049';
import { dataWrapTrx } from '@mmstudio/an000060';
import { ITbuser } from './user';
import getDb from '../db';

const db = getDb();

type IData = ITbuser;
const tableName = 'user';

/**
 * 用户表-带事务
 */
export default async function tbuserTrx(trxOrTimeout?: Transaction | number) {
	return dataWrapTrx<IData>(db, tableName, trxOrTimeout);
	// return {
	// 	/**
	// 	 * sql查询 ！！！ 慎用
	// 	 */
	// 	raw<T = any>(sql: string, ...bindings: any[]) {
	// 		return db.raw(sql, ...bindings) as unknown as T;
	// 	},
	// 	... await dataWrapTrx<IData>(db, tableName, trxOrTimeout)
	// };
}
