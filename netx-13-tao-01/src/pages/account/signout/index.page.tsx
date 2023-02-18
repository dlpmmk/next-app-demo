import { GetServerSideProps, NextApiRequest, NextApiResponse, NextPage, PageConfig } from 'next';
import Head from 'next/head';
import pages from '../../../atoms/pages';
import redirect from '../../../atoms/redirect';
import ctrls from '../../api/ctrls';
import { SysSessionParam1, SysSessionParam3 } from '../../api/controllers/sys/session';

interface IProps {
}

/**
 * 退出登录
 */
const Page: NextPage<IProps> = () => {
	return (
		<>
			<Head>
				<title>退出登录</title>
			</Head>
		</>
	);
};

export const config: PageConfig = {
	amp: false
};

export default Page;

// pre-render this page on each request
export const getServerSideProps: GetServerSideProps<IProps> = async (context) => {
	await ctrls.sysSession.clear(context.req as SysSessionParam1, context.res as SysSessionParam3);
	return redirect(pages['/account/sigin']);
};
