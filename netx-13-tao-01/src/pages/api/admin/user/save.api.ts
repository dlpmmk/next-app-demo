import { PageConfig } from 'next';
import { SysUserParam5 } from '../../controllers/sys/user';
import ctrls from '../../ctrls';
import createHandler from '../../../../atoms/server/handler';
import mmLogger from '../../../../atoms/server/logger';

const logger = mmLogger('pages/api/admin/user/save.api');

export type Data = {
};

export type Result = {
	ok: true;
	data: Data;
} | {
	ok: false;
	message: string;
};

export type Message = SysUserParam5 & { userid: string; };

/**
 * 保存用户信息
 */
const handler = createHandler<Result>();

handler.post(async (req, res) => {
	try {
		logger.debug('msg body:', req.body);
		const { userid, ...msg } = req.body as Message;
		await ctrls.sysLog.log(req, 'tb01user', '修改', '修改用户信息');
		await ctrls.sysUser.modify(userid, msg);
		res.status(200).json({
			ok: true,
			data: {}
		});
	} catch (error) {
		logger.error(error);
		logger.trace(error);
		res.status(200).json({ ok: false, message: (error as Error).message });
	}
});

export const config: PageConfig = {};

export default handler;
