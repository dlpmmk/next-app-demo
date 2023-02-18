import { PageConfig } from 'next';
import ctrls from '../ctrls';
import createHandler from '../../../atoms/server/handler';
import mmLogger from '../../../atoms/server/logger';

const logger = mmLogger('pages/api/getfile/[...ids]');

export type Result = void;

export type Query = {
	id: string;
	download?: string;
}

/**
 * 静态图片展示,用于统一处理静态图片和图片文件id的图片展示
 */
const handler = createHandler<Result>();

handler.get((req, res) => {
	try {
		ctrls.sysFile.downloadMultiple({ req, res });
	} catch (error) {
		logger.trace(error);
		res.status(404).end((error as Error).message);
	}
});

export const config: PageConfig = {};

export default handler;
