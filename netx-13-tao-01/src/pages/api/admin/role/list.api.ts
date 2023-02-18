import { PageConfig } from 'next';
import ctrls from '../../ctrls';
import { SysRoleParam2, SysRoleParam3 } from '../../controllers/sys/role';
import createHandler from '../../../../atoms/server/handler';
import mmLogger from '../../../../atoms/server/logger';

const logger = mmLogger('pages/api/admin/role/list.api');

export type Data = SysRoleParam3;

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

export type Message = SysRoleParam2;

/**
 * 获取角色列表
 */
const handler = createHandler<Result>();

handler.get(async (req, res) => {
	try {
		logger.debug('msg body:', req.query);
		const msg = req.query as Message;
		const { data, total } = await ctrls.sysRole.list(msg);
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
