import { PageConfig } from 'next';
import ctrls from '../../../ctrls';
import { SysGroupParam2 } from '../../../controllers/sys/group';
import createHandler from '../../../../../atoms/server/handler';
import mmLogger from '../../../../../atoms/server/logger';

const logger = mmLogger('pages/api/admin/group/union-user/list-user.api');

export type Data = SysGroupParam2;

export type Result = {
	ok: true;
	data: {
		data: Data[];
		total: number;
	};
} | {
	ok: false;
	message: string;
};

export type Message = {
	keyword: string;
	page: string;
};

/**
 * 查询用户
 */
const handler = createHandler<Result>();

handler.get(async (req, res) => {
	try {
		logger.debug('msg body:', req.query);
		const { page, keyword } = req.query as Message;
		const data = await ctrls.sysGroup.listUsers(keyword, page);
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
