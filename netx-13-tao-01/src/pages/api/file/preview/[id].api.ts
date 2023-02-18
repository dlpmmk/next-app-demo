import { PageConfig } from 'next';
import ctrls from '../../ctrls';
import createHandler from '../../../../atoms/server/handler';
import mmLogger from '../../../../atoms/server/logger';

const logger = mmLogger('pages/api/file/preview/[id].api');

export type Data = {
};

export type Result = {
	ok: true;
	data: Data;
} | {
	ok: false;
	message: string;
};


/**
 * 文件预览
 */
const handler = createHandler<Result>();

handler.get((req, res) => {
	try {
		logger.debug('msg body:', req.query);
		ctrls.sysFile.preview({ req, res });
	} catch (error) {
		logger.error(error);
		logger.trace(error);
		res.status(200).json({ ok: false, message: (error as Error).message });
	}
});

export const config: PageConfig = {};

export default handler;
