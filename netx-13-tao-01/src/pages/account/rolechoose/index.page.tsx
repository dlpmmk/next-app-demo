import { GetServerSideProps, NextPage, PageConfig } from 'next';
import Head from 'next/head';
import { SysUserParam10, SysUserParam3, SysUserParam8 } from '../../api/controllers/sys/user';
import ctrls from '../../api/ctrls';
import Body from './body';

interface IProps {
	// 用户角色列表数据
	data: SysUserParam8[];
	redirect: string;
}

/**
 * 多用户角色选择页面
 */
const Page: NextPage<IProps> = ({ data, redirect }) => {
	return (
		<>
			<Head>
				<title>多用户角色选择页面</title>
			</Head>
			<Body data={data} redirect={redirect} />
		</>
	);
};

export const config: PageConfig = {
	amp: false
};

export default Page;

// pre-render this page on each request
export const getServerSideProps: GetServerSideProps<IProps> = async (context) => {
	// 获取所有用户的角色
	const { redirect = '' } = context.query as SysUserParam10;
	const data = await ctrls.sysUser.getRoles(context.req as SysUserParam3);
	return {
		props: {
			data,
			redirect
		}
	};
};
