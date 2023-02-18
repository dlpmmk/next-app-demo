import { GetServerSideProps, NextPage, PageConfig } from 'next';
import Head from 'next/head';
import { SysUserParam10 } from '../../api/controllers/sys/user';
import ctrls from '../../api/ctrls';
import Body from './body';

interface IProps {
	name: string;
	redirect: string;
}

/**
 * 登录页面
 */
const Page: NextPage<IProps> = ({ name, redirect }) => {
	return (
		<>
			<Head>
				<title>登录页面</title>
			</Head>
			<Body name={name} redirect={redirect} />
		</>
	);
};

export const config: PageConfig = {
	amp: false
};

export default Page;

// pre-render this page on each request
// eslint-disable-next-line require-await, @typescript-eslint/require-await
export const getServerSideProps: GetServerSideProps<IProps> = async (context) => {
	const query = context.query as Record<string, string>;
	const { redirect = '' } = query as SysUserParam10;
	const name = await ctrls.sysConfig.getSysName();
	return {
		props: {
			name,
			redirect
		}
	};
};

