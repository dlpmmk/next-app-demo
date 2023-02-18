import { PageConfig } from 'next';
import ctrls from '../../../ctrls';
import { SysGroupParam1 } from '../../../controllers/sys/group';
import createHandler from '../../../../../atoms/server/handler';
import mmLogger from '../../../../../atoms/server/logger';

const logger = mmLogger('pages/api/admin/role/union-user/list-group.api');

export type Data = SysGroupParam1;

export type Result = {
	ok: true;
	data: Data[];
} | {
	ok: false;
	message: string;
};

export type Message = {
};

/**
 * 查询用户组
 */
const handler = createHandler<Result>();

handler.get(async (req, res) => {
	try {
		logger.debug('msg body:', req.query);
		const data = await ctrls.sysGroup.listAll();
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
