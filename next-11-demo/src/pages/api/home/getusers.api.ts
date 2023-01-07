import { PageConfig } from 'next';
import anylogger from 'anylogger';
import '@mmstudio/an000042';
import an48 from '@mmstudio/an000048';
import tbuser from '../../../db/table/user';

const logger = anylogger('pages/api/home/getusers.api');

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

};

/**
 * 获取所有用户
 */
const handler = an48<Result>();

handler.get(async (req, res) => {
	try {
		logger.debug('msg body:', req.query);
		const msg = req.query as Message;

		// 获取所有用户
		const userdata = await tbuser().query();
		logger.debug("users:", userdata)

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

export const config = {} as PageConfig;

export default handler;
