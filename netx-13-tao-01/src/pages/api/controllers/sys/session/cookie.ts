import { createHash, randomBytes } from 'crypto';
import { IncomingMessage } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';
import api from '../../../../../atoms/api';
import mmLogger from '../../../../../atoms/server/logger';

const logger = mmLogger('pages/api/controllers/sys/session/cookie');

export type SysSessionCookieParam1 = NextApiResponse;
export type SysSessionCookieParam2 = NextApiRequest | (IncomingMessage & {
	cookies: NextApiRequestCookies;
});
export type SysSessionCookieParam3 = {
	maxAge?: number;
	signed?: boolean;
	expires?: Date;
	httpOnly?: boolean;
	path?: string;
	domain?: string;
	secure?: boolean;
	encode?: (val: string) => string;
	sameSite?: boolean | 'lax' | 'strict' | 'none';
};


const sysSessionCookie = {
	set<T extends {}>(res: SysSessionCookieParam1, name: string, value: T, options?: SysSessionCookieParam3) {
		const opt = this._getOptions();
		// Cookie加密
		const val = sign(value, opt.secret, { expiresIn: opt.expiresIn, algorithm: 'HS256' });
		res.setHeader('Set-Cookie', serialize(name, val, {
			sameSite: 'lax',
			httpOnly: true,
			path: api['/'],
			...options
		}));
	},
	del(res: SysSessionCookieParam1, name: string) {
		res.setHeader('Set-Cookie', serialize(name, '', {
			sameSite: 'lax',
			httpOnly: true,
			path: api['/'],
			expires: new Date(1)
		}));
	},
	get<T>(req: SysSessionCookieParam2, name: string) {
		const opt = this._getOptions();
		const token = req.cookies[name];
		return new Promise<T>((res) => {
			verify(token, opt.secret, {
				algorithms: ['HS256'],
				complete: false
			}, (err, decoded) => {
				if (err) {
					logger.error('failed verify token:', token, 'resion:', err.message);
					res(null);
				}
				const { exp, iat, ...rest } = decoded as JwtPayload;
				logger.debug('sccess verify token:', token, 'exp:', exp, 'iat:', iat, 'userinfo:', rest);
				// delete decoded.exp;iat
				res(rest as T); // todo we don't need as unknown here, just ignore ts error, this maybe an issue of typescript.
			});
		});
	},
	_getOptions() {
		const secret = process.env.SESSION_SECRET;
		const expiresIn = process.env.SESSION_EXPIRESIN;
		return {
			secret,
			expiresIn
		};
	},
	generateCsrf(req: SysSessionCookieParam2, res: SysSessionCookieParam1) {
		const csrf_name = process.env.SESSION_CSRF_TOKEN;
		const cookies = req.cookies;
		const csrf = cookies[csrf_name];

		if (!csrf) {
			// If no csrfToken - because it's not been set yet, or because the hash doesn't match
			// (e.g. because it's been modifed or because the secret has changed) create a new token.
			const csrfTokenFromCookie = randomBytes(32).toString('hex');
			const newCsrf = `${csrfTokenFromCookie}|${this._encodeCsrf(csrfTokenFromCookie)}`;
			// this.set(res, csrf_name, csrf, {
			// 	sameSite: 'lax',
			// 	httpOnly: true,
			// 	path: '/'
			// });
			res.setHeader('Set-Cookie', serialize(csrf_name, newCsrf, {
				sameSite: 'lax',
				httpOnly: true,
				path: api['/']
			}));
			return newCsrf;
		}
		return csrf;
	},
	checkCsrf(req: SysSessionCookieParam2) {
		const csrf_name = process.env.SESSION_CSRF_TOKEN;
		const csrf = req.cookies[csrf_name];
		logger.debug('cookie', req.cookies);
		if (csrf) {
			const [csrfTokenValue, csrfTokenHash] = csrf.split('|');
			return csrfTokenHash === this._encodeCsrf(csrfTokenValue);
		}
		return false;
	},
	_encodeCsrf(value: string) {
		const secret = process.env.SESSION_CSRF_SECRET;
		return createHash('sha256').update(`${value}${secret}`).digest('hex');
	}
};
export default sysSessionCookie;
