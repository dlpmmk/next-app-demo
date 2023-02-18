import { PageConfig } from 'next';
import ctrls from '../../../ctrls';
import createHandler from '../../../../../atoms/server/handler';
import mmLogger from '../../../../../atoms/server/logger';

const logger = mmLogger('pages/api/file/preview/imgs/[ids].api');

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
	ids: string;
}

/**
 * 预览多张图片
 */
const handler = createHandler<Result>();

handler.get((req, res) => {
	try {
		ctrls.sysFile.previewImages({ req, res });
	} catch (error) {
		logger.error(error);
		logger.trace(error);
		res.status(200).json({ ok: false, message: (error as Error).message });
	}
});

export const config: PageConfig = {};

export default handler;
