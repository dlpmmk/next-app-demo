import { PageConfig } from 'next';
import ctrls from '../ctrls';
import { SysTbimpexpParam3 } from '../controllers/sys/tbimpexp';
import createHandler from '../../../atoms/server/handler';
import mmLogger from '../../../atoms/server/logger';

const logger = mmLogger('pages/api/file/exp-data.api');

export type Data = {
};

export type Result = {
	ok: true;
	data: Data;
} | {
	ok: false;
	message: string;
};

export type Message = SysTbimpexpParam3;

/**
 * 导出表数据
 */
const handler = createHandler<Result>();

handler.get(async (req, res) => {
	try {
		logger.debug('msg body:', req.query);
		const msg = req.query as Message;
		await ctrls.sysTbimpexp.exp(res, msg);
	} catch (error) {
		logger.error(error);
		logger.trace(error);
		res.status(200).json({ ok: false, message: (error as Error).message });
	}
});

export const config: PageConfig = {};

export default handler;
