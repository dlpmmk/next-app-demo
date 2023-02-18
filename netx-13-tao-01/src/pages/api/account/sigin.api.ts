import { PageConfig } from 'next';
import ctrls from '../ctrls';
import { SysUserParam1 } from '../controllers/sys/user';
import createHandler from '../../../atoms/server/handler';
import mmLogger from '../../../atoms/server/logger';

const logger = mmLogger('pages/api/account/sigin.api');

export type Data = {
};

export type Result = {
	ok: true;
	data: Data;
} | {
	ok: false;
	message: string;
};

export type Message = SysUserParam1;

/**
 * 登录
 */
const handler = createHandler<Result>();

handler.post(async (req, res) => {
	try {
		logger.debug('msg body:', req.body);
		const msg = req.body as Message;
		await ctrls.sysLog.log(req, 'tb01user', '未知', '用户登录');
		await ctrls.sysUser.sigin(req.body, res);

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
