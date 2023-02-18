import { PageConfig } from 'next';
import ctrls from '../../ctrls';
import createHandler from '../../../../atoms/server/handler';
import mmLogger from '../../../../atoms/server/logger';

const logger = mmLogger('pages/api/admin/group/del.api');

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
	groupid: string;
};

/**
 * 删除组
 */
const handler = createHandler<Result>();

handler.delete(async (req, res) => {
	try {
		logger.debug('msg body:', req.body);
		const msg = req.body as Message;
		await ctrls.sysGroup.delByID(msg.groupid);
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
