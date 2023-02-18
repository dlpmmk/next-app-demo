import pagesize from '../../../../atoms/pagesize';
import mmLogger from '../../../../atoms/server/logger';
import uuid from '../../../../atoms/server/uuid';
import tbTb01group, { ITb01group } from '../../../../db/01factory/table/tb01group';
import tb01usergroup from '../../../../db/01factory/table/tb01usergroup';
import viewGroupUserRole, { IVGroupUserRole } from '../../../../db/01factory/view/groupuserrole';
import viewUserGroup, { IVUserGroup } from '../../../../db/01factory/view/usergroup';

const logger = mmLogger('pages/api/controllers/sys/group');

export type SysGroupParam1 = ITb01group;
export type SysGroupParam2 = IVUserGroup;
export type SysGroupParam3 = IVGroupUserRole;
// export type SysGroupParam4 = Pick<ITb01usergroup, 'userid'> & Pick<ITb01user, 'username'>;
export type SysGroupParam5 = Pick<ITb01group, 'groupname'>;
export type SysGroupParam8 = Pick<ITb01group, 'groupid'> & Partial<ITb01group>;

const sysGroup = {
	// async list(keyword: string) {
	// 	logger.debug('keyword', keyword);
	// 	const data = await tbTb01group()
	// 		.query();
	// 	const { data: group_user } = await viewUserGroup()
	// 		.list(['groupname', 'username'], keyword, 1, 0, {});
	// 	const data1 = data.map((it) => {
	// 		return {
	// 			groupid: it.groupid,
	// 			pid: it.pid,
	// 			groupname: it.groupname
	// 		} as SysGroupParam1;
	// 	});
	// 	const data2 = group_user.map((it) => {
	// 		const dd = data.find((d) => {
	// 			return d.groupid === it.groupid;
	// 		});
	// 		return {
	// 			groupid: it.userid,
	// 			pid: dd.groupid,
	// 			groupname: it.username,
	// 		} as SysGroupParam1;
	// 	});
	// 	return [...data1, ...data2];
	// },
	// async getDetails(roleid: string) {
	// 	const data = await tbTb01group()
	// 		.query();
	// 	// 获取全部组别用户
	// 	const group_user = await viewUserGroup()
	// 		.query();
	// 	// 构造树结构
	// 	const newdata = [] as SysGroupParam1[];
	// 	const rightdata = [] as SysGroupParam1[];
	// 	data.forEach((it) => {
	// 		newdata.push({
	// 			groupid: it.groupid,
	// 			pid: it.pid,
	// 			groupname: it.groupname
	// 		} as SysGroupParam1);
	// 	});
	// 	group_user.forEach((it) => {
	// 		const dd = data.find((d) => {
	// 			return d.groupid === it.groupid;
	// 		});
	// 		newdata.push({
	// 			groupid: it.userid,
	// 			pid: dd.groupid,
	// 			groupname: it.groupname,
	// 		} as SysGroupParam1);
	// 	});
	// 	logger.debug('1111111', newdata);
	// 	// user-role表
	// 	const user_role = await tbTb01userrole()
	// 		.query({
	// 			roleid
	// 		});
	// 	// 叶子节点
	// 	const rdata = newdata.filter((it) => {
	// 		return user_role.find((d) => {
	// 			return d.userid === it.id;
	// 		});
	// 	});
	// 	return rightdata;
	// },
	// async setUserGroup(groupid: string, userids: string[]) {
	// 	if (!groupid && !userids) {
	// 		throw new Error('无效参数');
	// 	}
	// 	const tb = await tbTb01usergroupTrx();
	// 	try {
	// 		// 新增数据插入,已有数据进行修改
	// 		const data = await tb
	// 			.first({ groupid });
	// 		logger.debug('1111', data);
	// 		if (data) {
	// 			// 先执行删除,再进行重新插入
	// 			await tb
	// 				.delete({
	// 					groupid
	// 				});
	// 			logger.debug('11312', userids);
	// 		}
	// 		const now = Date.now().toString();
	// 		await tb.insert(userids.map((userid) => {
	// 			return {
	// 				groupid: groupid,
	// 				userid: userid,
	// 				update_time: now
	// 			};
	// 		}));
	// 		await tb.commit();
	// 	} catch (error) {
	// 		await tb.rollback();
	// 		throw error;
	// 	}
	// },
	// async searchByGroupID(groupid: string, keyword: string) {
	// 	// todo 函数名不确切
	// 	const d = await ctrls.sysUser.search(keyword);
	// 	const rdata = await tbTb01usergroup()
	// 		.query()
	// 		.whereNot({ groupid });
	// 	logger.debug('1111', d);
	// 	return {
	// 		data: d,
	// 		rdata: rdata
	// 	};
	// },
	// async queryByIDWithName(groupid: string) {
	// 	if (!groupid) {
	// 		throw new Error('无效参数');
	// 	}
	// 	const data = await tbTb01usergroup()
	// 		.query({
	// 			groupid
	// 		});
	// 	return Promise.all(data.map(async (it) => {
	// 		const da = await ctrls.sysUser.getByID(it.userid);
	// 		return {
	// 			...it,
	// 			username: da.username
	// 		} as SysGroupParam4;
	// 	}));
	// },
	async saveUsers(groupid: string, users: string[]) {
		await tb01usergroup().transaction(async (trx) => {
			const tb = tb01usergroup().useTransaction(trx);
			await tb.delete({
				groupid
			});
			await tb.insert(users.map((userid) => {
				return {
					groupid,
					userid
				};
			}));
		});
	},
	listUsers(keyword: string, page: string) {
		return viewUserGroup()
			.list(['username'], keyword, page || '1', pagesize(), {}, (qb) => {
				return qb.orderBy('userid', 'asc');
			});
	},
	async listGroupUsers(groupid: string) {
		const { data } = await viewGroupUserRole()
			.list([], '', '1', 0, {
				groupid
			}, (qb) => {
				return qb.orderBy('userid', 'asc');
			});
		return data;
	},
	async add(msg: SysGroupParam5) {
		if (!msg.groupname) {
			throw new Error('组别名为必填项,请填写完整');
		}
		const data = await tbTb01group()
			.first({
				groupname: msg.groupname
			});
		if (data) {
			throw new Error('该组别已存在，请重新输入');
		}
		await tbTb01group()
			.insert({
				groupid: uuid(),
				groupname: msg.groupname,
			});
	},
	list(keyword: string, page: number) {
		return tbTb01group()
			.list(['groupname'], keyword, page, pagesize(), {}, (qb) => {
				return qb.orderBy('groupid', 'asc');
			});
	},
	async listAll() {
		const { data } = await tbTb01group()
			.list([], '', 1, 0, {}, (qb) => {
				return qb.orderBy('groupid', 'asc');
			});
		return data;
	},
	async delByID(groupid: string) {
		if (!groupid) {
			throw new Error('该组别不存在');
		}
		await tbTb01group().transaction(async (trx) => {
			const tbGroup = tbTb01group().useTransaction(trx);
			const tbUserGroup = tb01usergroup().useTransaction(trx);
			await tbUserGroup.delete({
				groupid
			});
			await tbGroup.delete({
				groupid
			});
		});
	},
	async modify({ groupid, ...msg }: SysGroupParam8) {
		if (!groupid) {
			throw new Error('该组别不存在');
		}
		await tbTb01group()
			.update({
				...msg
			}, {
				groupid
			});
	},
	getByID(groupid: string) {
		if (!groupid) {
			throw new Error('未找到该组别');
		}
		return tbTb01group().first({
			groupid
		});
	}
};
export default sysGroup;
