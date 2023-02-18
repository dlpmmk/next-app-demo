import { PageConfig } from 'next';
import ctrls from '../../ctrls';
import { SysUserParam6 } from '../../controllers/sys/user';
import createHandler from '../../../../atoms/server/handler';
import mmLogger from '../../../../atoms/server/logger';

const logger = mmLogger('pages/api/admin/user/list.api');

export type Data = SysUserParam6;

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
	// 当前页面
	page: string;
	// 用户状态：启用1 ，停用0
	status: string;
	// 用户查询关键字
	keyword: string;
};

/**
 * 查询用户
 */
const handler = createHandler<Result>();

handler.get(async (req, res) => {
	try {
		logger.debug('msg body:', req.query);
		const msg = req.query as Message;
		const page = parseInt(msg.page || '1', 10);
		const { data, total } = await ctrls.sysUser.list(msg.keyword, page, msg.status);
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
