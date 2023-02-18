import { PageConfig } from 'next';
import ctrls from '../ctrls';
import createHandler from '../../../atoms/server/handler';
import mmLogger from '../../../atoms/server/logger';

const logger = mmLogger('pages/api/getfile/[id]');

export type Result = void;

export type Message = {
	id: string;
	download?: string;
}

const handler = createHandler<Result>();

handler.get(async (req, res) => {
	try {
		const msg = req.query as Message;
		const { id, download } = msg;
		await ctrls.sysFile.download({
			req,
			res,
			id,
			download
		});
	} catch (error) {
		logger.trace(error);
		res.status(404).end((error as Error).message);
	}
});

export const config: PageConfig = {};

export default handler;
