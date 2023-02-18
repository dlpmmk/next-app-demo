import { createHash } from 'crypto';
import { NextApiRequest, NextApiResponse } from 'next';
import tbTb01user, { ITb01user } from '../../../../db/01factory/table/tb01user';
import ctrls from '../../ctrls';
import pagesize from '../../../../atoms/pagesize';
import viewUserRole, { IVUserRole } from '../../../../db/01factory/view/userrole';
import redirect from '../../../../atoms/redirect';
import pages from '../../../../atoms/pages';
import { ITb01menu } from '../../../../db/01factory/table/tb01menu';
import mmLogger from '../../../../atoms/server/logger';

const logger = mmLogger('pages/api/controllers/sys/user');

export type SysUserParam1 = {
	userid: string;
	password: string;
};
export type SysUserParam2 = NextApiResponse;
export type SysUserParam3 = NextApiRequest;
export type SysUserParam4 = {
	/**
	 * 原密码
	 */
	oldpsw: string;
	/**
	 * 新密码
	 */
	newpsw: string;
};
export type SysUserParam5 = Partial<Pick<ITb01user, 'username' | 'password' | 'phone' | 'sex' | 'state' | 'ext'>>;
export type SysUserParam6 = ITb01user;
export type SysUserParam7 = Partial<Pick<ITb01user, 'username' | 'phone' | 'sex' | 'ext'>> & Pick<ITb01user, 'userid'>;
export type SysUserParam8 = IVUserRole;
export type SysUserParam9 = ITb01menu;
export type SysUserParam10 = {
	redirect: string;
};

const sysUser = {
	async sigin(body: SysUserParam1, res: SysUserParam2) {
		logger.debug('msg body:', body);
		const { userid, ...msg } = body;
		const user = await tbTb01user().first({
			userid: userid,
			password: md5(msg.password)
		});
		logger.debug('user', user);
		if (!user) {
			throw new Error('帐户名或密码错误');
		}
		const { password, ...data } = user;
		if (data.state != 1) {
			throw new Error('账户已作废,请联系管理员');
			// const msg = '账户已作废,请联系管理员';
			// res.statusMessage = encodeURIComponent(msg);
			// res.status(500).end(msg);
		}
		ctrls.sysSession.setUser({
			...data,
			roleid: null,
			rolename: null,
			description: null
		}, res);
	},
	async changePassword(req: SysUserParam3, msg: SysUserParam4) {
		const user = await ctrls.sysSession.getUser(req);
		if (!msg.oldpsw || !msg.newpsw) {
			throw new Error('密码不能为空');
		}
		const tb = tbTb01user();
		const data = await tb
			.first({
				userid: user.userid,
				password: md5(msg.oldpsw)
			});
		if (!data) {
			throw new Error('密码错误');
		}
		if (data.password === msg.newpsw) {
			throw new Error('原密码和新密码一致，请重新输入');
		}
		await tb.update({ password: md5(msg.newpsw) }, { userid: user.userid });
	},
	async resetPassword(userid: string) {
		if (!userid) {
			throw new Error('useid is required!');
		}
		const tb = tbTb01user();
		const u = await tb.first({
			userid
		});
		if (!u) {
			throw new Error('User not exist!');
		}
		await tb.update({
			password: md5('123456')
		}, {
			userid
		});
	},
	async modify(userid: string, user: SysUserParam5) {
		if (userid) {
			await tbTb01user().update({
				username: user.username,
				sex: user.sex,
				phone: user.phone,
				ext: user.ext
			}, { userid });
		}
	},
	async enable(userid: string) {
		if (userid) {
			await tbTb01user().update({
				state: 1
			}, { userid });
		}
	},
	async disable(userid: string) {
		if (userid) {
			await tbTb01user()
				.update({
					state: 0
				}, { userid });
		}
	},
	listAll(keyword: string, page: number) {
		return tbTb01user()
			.list(['userid', 'username', 'phone'], keyword, page, pagesize(), {
				state: 1
			}, (qb) => {
				return qb.orderBy('userid', 'asc');
			});
	},
	list(keyword: string, page: number, state?: string) {
		return tbTb01user()
			.list(['userid', 'username', 'phone'], keyword, page, pagesize(), {}, (qb) => {
				return qb.orderBy('userid', 'asc');
			}, (qb) => {
				if (state) {
					void qb.where('state', parseInt(state));
				}
				return qb.whereNot('userid', 'admin');
			});
	},
	async add(user: SysUserParam7) {
		// 通过first 判断用户名userid是否唯一
		const data = await tbTb01user()
			.first({ userid: user.userid });
		if (data) {
			logger.debug('error', data);
			throw new Error('用户名重复！');
		} else {
			await tbTb01user().insert({
				...user,
				password: md5('123456'),
				state: 1
			});
		}
	},
	async getRolesByUserID(userid: string) {
		const data = await viewUserRole()
			.query()
			.orderBy('userid', 'asc')
			.where({ userid: userid });
		const count = data.length;
		return { data, count };
	},
	all() {
		return tbTb01user()
			.query({
				state: 1
			});
	},
	async search(keyword: string) {
		const { data } = await tbTb01user()
			.list(['username'], keyword, 1, 0, {}, (qb) => {
				return qb.orderBy('userid', 'asc');
			});
		return data;
	},
	getByID(userid: string) {
		return tbTb01user().first({ userid });
	},
	async redirectAfterLogin(req: SysUserParam3, res: SysUserParam2, { redirect: redirectUrl = '' }: SysUserParam10) {
		try {
			// 从Cookie中取到数据
			const u = await ctrls.sysSession.getUser(req as NextApiRequest);
			logger.debug('1111111111111', u);
			if (!u) {
				return redirect(pages['/account/sigin']);
			}
			logger.debug('11111111111112222222', u);
			// 判断 只有一个角色,再次跳转回来，查找角色的menuid
			if (u.roleid) {
				logger.debug('111111111111133333', u);
				// 根据角色id 查找 角色菜单关联表，找到所有的菜单id
				const data = await ctrls.sysMenu.getByRoleID(u.roleid);

				logger.debug('1111111111114444444', u, redirectUrl);
				// 要跳转的页面是否有权限
				if (redirectUrl) {
					const url = redirectUrl.replace(/\?.*/, '');
					if (data.some((menu) => {
						logger.debug('222222222222', url, menu);
						return menu.url === url;
					})) {
						return redirect(redirectUrl);
					} else {
						return redirect(pages['/403']);
					}
				}
				logger.debug('333333', u);

				function getFirstMenu(menus: Pick<SysUserParam9, 'menuid' | 'pid' | 'url'>[], pid: string | null): string | null {
					if (menus == null) {
						return null;
					}
					for (let i = 0; i < menus.length; ++i) {
						const menu = menus[i];
						if (menu.pid === pid) {
							if (menu.url) {
								return menu.url;
							}
							const url = getFirstMenu(menus, menu.menuid);
							if (url) {
								return url;
							}
						}
					}
					return null;
				}

				const url = getFirstMenu(data, null);
				// const url = oneTest(menus, null, null);
				// const url = twoTest(menus);
				logger.debug('3333333333', data, url);
				if (url) {
					return redirect(url);
				}
				return redirect(pages['/admin/sys/nomenu']);
			}

			// 调服务查询 该用户拥有多少角色
			const data = await ctrls.sysUser.getRolesByUserID(u.userid);
			logger.debug('222222222', data);
			// 逻辑判断
			const destination = (() => {
				if (data.count == 0) {
					return pages['/account/norolepage'];
				}
				if (data.count > 1) {
					return `${pages['/account/rolechoose']}?redirect=${redirectUrl}`;
				}
				const [role] = data.data;
				logger.debug('sssssssssssssssss', u);
				// 只有一个角色,再次跳转回来，查找角色的menuid
				ctrls.sysSession.setUser({
					...u,
					roleid: role.roleid,
					rolename: role.rolename
				}, res);
				return `${pages['/account/pagejump']}?redirect=${redirectUrl}`;
			})();
			return redirect(destination);
		} catch (error) {
			logger.error(error);
			return redirect(pages['/500']);
		}
	},
	async getRoles(req: SysUserParam3) {
		// 从Cookie中获取 user.userid
		const u = await ctrls.sysSession.getUser(req);
		// 获取所有用户的角色
		const data = await ctrls.sysUser.getRolesByUserID(u.userid);
		return data.data;
	}
};

export default sysUser;

function md5(value: string) {
	return createHash('md5').update(value).digest('hex');
}
