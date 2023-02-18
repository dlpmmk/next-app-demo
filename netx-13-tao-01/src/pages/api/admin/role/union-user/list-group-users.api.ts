import { PageConfig } from 'next';
import { SysGroupParam3 } from '../../../controllers/sys/group';
import ctrls from '../../../ctrls';
import createHandler from '../../../../../atoms/server/handler';
import mmLogger from '../../../../../atoms/server/logger';

const logger = mmLogger('pages/api/admin/role/union-user/list-group-users.api');

export type Data = SysGroupParam3;

export type Result = {
	ok: true;
	data: Data[];
} | {
	ok: false;
	message: string;
};

export type Message = {
	groupid: string;
};

/**
 * 获取分组下的用户
 */
const handler = createHandler<Result>();

handler.get(async (req, res) => {
	try {
		logger.debug('msg body:', req.query);
		const msg = req.query as Message;
		const data = await ctrls.sysGroup.listGroupUsers(msg.groupid);
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
