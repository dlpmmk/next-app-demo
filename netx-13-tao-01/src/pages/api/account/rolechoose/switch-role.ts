import api from '../../../../atoms/api';
import smartfetch from '../../../../atoms/smart-fetch';
import { Message, Result } from './switch-role.api';

export type { Data, Message, Result } from './switch-role.api';

export default async function apiAccountRolechooseSwitchRole(msg: Message) {
	const ret = await smartfetch<Result, Message>(api['/api/account/rolechoose/switch-role'], 'post', msg);
	if (ret.ok === true) {
		return ret.data;
	}
	throw new Error(ret.message);
}
