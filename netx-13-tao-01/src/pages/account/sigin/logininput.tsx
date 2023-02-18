
import { useRouter } from 'next/router';
import { useState } from 'react';
import pages from '../../../atoms/pages';
import res from '../../../atoms/res';
import ui from '../../../atoms/ui';
import Ui from '../../../components/ui';
import apiAccountsigin, { Message as M1 } from '../../api/account/sigin';

export default function Logininput({
	redirect
}: {
	redirect: string;
}) {
	const init = {
		userid: '',
		password: ''
	} as M1;
	//账号密码
	//admin
	//123456
	const router = useRouter();
	const [user, setuser] = useState(init);
	//输入图标改变
	const [accFlag, setAccflag] = useState(false);
	const [psdFlag, setPsdflag] = useState(false);
	//登录
	async function doLogin() {
		//账号验证
		if (!user.userid) {
			ui.Message.error({
				content: '账号不能为空！',
			});
			return;
		}
		//密码验证
		if (!user.password) {
			ui.Message.error({
				content: '密码不能为空！',
				closable: true
			});
			return;
		}
		//验证通过，调用登录服务
		try {
			const data = await apiAccountsigin(user);
			if (data) {
				await router.push({
					pathname: pages['/account/pagejump'],
					query: {
						redirect
					}
				});
			}
		} catch (error) {
			ui.Message.error({
				content: (error as Error).message,
				closable: true
			});
		}
	}
	return <>
		<div className='loginv'>
			<div className='inpv'>
				<img className='imgacc' src={accFlag ? `${res['/images/sys/acc1.png']}` : `${res['/images/sys/acc.png']}`} />
				<Ui.Form.Item.Input
					maxLength={20}
					placeholder='请输入您的账号'
					value={user.userid}
					onChange={(e) => {
						setuser({ ...user, userid: e });
						setAccflag(Boolean(e));
					}}
					onPressEnter={async () => {
						await doLogin();
					}}
				// style={{ marginLeft: '0px', border: 'none', backgroundColor: '#FFF', fontSize: '14px', color: '#8692A6' }}
				/>
			</div>
			<div className='inpv'>
				<img className='imgpwd' src={psdFlag ? `${res['/images/sys/mima1.png']}` : `${res['/images/sys/mima.png']}`} />
				<Ui.Form.Item.Password
					placeholder='请输入您的密码'
					value={user.password}
					onChange={(e) => {
						setuser({ ...user, password: e });
						setPsdflag(Boolean(e));
					}}
					onPressEnter={async () => {
						await doLogin();
					}}
				// style={{ marginLeft: '1px', border: 'none', backgroundColor: '#FFF', fontSize: '14px', color: '#8692A6' }}
				/>
			</div>
			<input type='button' value='登    录' className='btn' onClick={doLogin} />
			<style jsx>{`
.loginv{
display: flex;
flex-direction: column;
align-items: center;
}
.inpv{
display: flex;
height: 45px;
width: 390px;
align-items: center;
border: 0.06rem solid #8692A6;
border-radius: 0.375rem;
margin: 10px 0;
}
.imgacc{
margin-left: 0.9rem;
}
.imgpwd{
margin-left: 1rem;
}
.inp{
width: 100%;
border-style: none;
margin-left: 0.2rem;
font-size: 0.875rem;
font-weight: 290;
}
.btn{
height: 49px;
width: 395px;
cursor: pointer;
text-align: center;
background-color: #1565D8;
color: #FFFFFF;
font:normal 400 24px/30px normal;
border-radius: 0.375rem;
border-style: none;
margin-top: 10px;
}
			`}</style>
		</div>
	</>;
}

