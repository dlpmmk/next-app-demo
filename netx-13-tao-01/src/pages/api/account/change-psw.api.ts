import { PageConfig } from 'next';
import ctrls from '../ctrls';
import { SysUserParam4 } from '../controllers/sys/user';
import createHandler from '../../../atoms/server/handler';
import mmLogger from '../../../atoms/server/logger';

const logger = mmLogger('pages/api/account/change-psw.api');

export type Data = {
};

export type Result = {
	ok: true;
	data: Data;
} | {
	ok: false;
	message: string;
};

export type Message = SysUserParam4;

/**
 * 修改密码
 */
const handler = createHandler<Result>();

handler.post(async (req, res) => {
	try {
		logger.debug('msg body:', req.body);
		const msg = req.body as Message;
		await ctrls.sysLog.log(req, 'tb01user', '修改', JSON.stringify(msg), '修改密码');
		await ctrls.sysUser.changePassword(req, msg);
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
