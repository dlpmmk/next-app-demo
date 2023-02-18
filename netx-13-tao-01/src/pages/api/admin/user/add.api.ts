import { PageConfig } from 'next';
import ctrls from '../../ctrls';
import { SysUserParam7 } from '../../controllers/sys/user';
import createHandler from '../../../../atoms/server/handler';
import mmLogger from '../../../../atoms/server/logger';

const logger = mmLogger('pages/api/admin/user/add.api');

export type Data = {
};

export type Result = {
	ok: true;
	data: Data;
} | {
	ok: false;
	message: string;
};

export type Message = SysUserParam7;

/**
 * 新增用户
 */
const handler = createHandler<Result>();

handler.put(async (req, res) => {
	try {
		logger.debug('msg body:', req.body);
		const msg = req.body as Message;
		await ctrls.sysLog.log(req, 'tb01user', '新增');
		await ctrls.sysUser.add(msg);
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
