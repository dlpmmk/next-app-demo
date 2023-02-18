import { PageConfig } from 'next';
import ctrls from '../../ctrls';
import { SysGroupParam1 } from '../../controllers/sys/group';
import createHandler from '../../../../atoms/server/handler';
import mmLogger from '../../../../atoms/server/logger';

const logger = mmLogger('pages/api/admin/group/list.api');

export type Data = SysGroupParam1;

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
 * 查询组
 */
const handler = createHandler<Result>();

handler.get(async (req, res) => {
	try {
		logger.debug('msg body:', req.query);
		const { keyword, page = '1' } = req.query as Message;
		const { data, total } = await ctrls.sysGroup.list(keyword, parseInt(page, 10));
		res.status(200).json({
			ok: true,
			data: {
				data,
				total
			}
		});
	} catch (error) {
		logger.error(error);
		logger.trace(error);
		res.status(200).json({ ok: false, message: (error as Error).message });
	}
});

export const config: PageConfig = {};

export default handler;
