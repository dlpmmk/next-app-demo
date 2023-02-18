import { NextApiResponse } from 'next';
import mmLogger from '../../../../atoms/server/logger';
import RoleType from '../../../../db/01factory/type/role';
import { IVUserRole } from '../../../../db/01factory/view/userrole';
import ctrls from '../../ctrls';
import { SysSessionCookieParam2 } from './session/cookie';

const logger = mmLogger('pages/api/controllers/sys/session');

export type SysSessionParam1 = SysSessionCookieParam2;
export type SysSessionParam2 = IVUserRole;
export type SysSessionParam3 = NextApiResponse;

const sysSession = {
	_getToken() {
		return process.env.NEXT_SESSION_TOKEN;
	},
	getUser(req: SysSessionParam1) {
		// 该数据视图中不包含 role_id 
		return ctrls.sysSessionCookie.get<SysSessionParam2>(req, this._getToken());
	},
	async clear(req: SysSessionParam1, res: SysSessionParam3) {
		const user = await this.getUser(req);
		if (user) {
			ctrls.sysSessionCookie.del(res, this._getToken());
		}
	},
	setUser(user: SysSessionParam2, res: SysSessionParam3) {
		logger.debug('userlogin success', user);

		// 设置Cookie 
		return ctrls.sysSessionCookie.set(res, this._getToken(), user);
	},
	async switchRole(req: SysSessionParam1, res: SysSessionParam3, roleid: RoleType, rolename: string) {
		const user = await this.getUser(req);
		this.setUser({
			...user,
			roleid,
			rolename
		}, res);
	}
};
export default sysSession;
