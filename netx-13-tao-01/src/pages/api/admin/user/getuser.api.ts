import { PageConfig } from 'next';
import ctrls from '../../ctrls';
import { SysUserParam6 } from '../../controllers/sys/user';
import createHandler from '../../../../atoms/server/handler';
import mmLogger from '../../../../atoms/server/logger';

const logger = mmLogger('pages/api/admin/user/getuser.api');

export type Data = SysUserParam6;

export type Result = {
	ok: true;
	data: Data;
} | {
	ok: false;
	message: string;
};

export type Message = {
	userid: string;
};

/**
 * 获取用户信息
 */
const handler = createHandler<Result>();

handler.get(async (req, res) => {
	try {
		logger.debug('msg body:', req.query);
		const { userid } = req.query as Message;
		const data = await ctrls.sysUser.getByID(userid);
		logger.debug('user', req.body, data);
		res.status(200).json({
			ok: true,
			data
		});
	} catch (error) {
		logger.error(error);
		logger.trace(error);
		res.status(200).json({ ok: false, message: (error as Error).message });
	}
});

export const config: PageConfig = {};

export default handler;
