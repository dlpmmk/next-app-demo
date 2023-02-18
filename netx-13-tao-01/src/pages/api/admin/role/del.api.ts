import { PageConfig } from 'next';
import ctrls from '../../ctrls';
import createHandler from '../../../../atoms/server/handler';
import mmLogger from '../../../../atoms/server/logger';

const logger = mmLogger('pages/api/admin/role/del.api');

export type Data = {
};

export type Result = {
	ok: true;
	data: Data;
} | {
	ok: false;
	message: string;
};

export type Message = {
	roleid: string;
};

/**
 * 删除角色
 */
const handler = createHandler<Result>();

handler.delete(async (req, res) => {
	try {
		logger.debug('msg body:', req.body);
		const msg = req.body as Message;
		await ctrls.sysLog.log(req, 'tb01role', '删除', '删除角色');
		await ctrls.sysRole.delByID(msg.roleid);
		// logger.debug(13);
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
