import { useEffect, useState } from 'react';
import pages from '../../../../atoms/pages';
import pagesize from '../../../../atoms/pagesize';
import res from '../../../../atoms/res';
import Ui from '../../../../components/ui';
import apiAdminGroupUnionUserListUser, { Data as D1, Message as M1, Result as R1 } from '../../../api/admin/group/union-user/list-user';
import apiAdminGroupUnionUserSave, { Data as D2, Message as M2, Result as R2 } from '../../../api/admin/group/union-user/save';

type Data = D1 & { checked: boolean; };

export default function Body({ groupid, groupname, initquery }: { groupid: string; groupname: string; initquery: M1; }) {
	const [query, setquery] = useState(initquery);
	const [checkedAll, setcheckedAll] = useState(false);
	const [data, setdata] = useState([] as Data[]);
	const [total, settotal] = useState(0);
	const [indeterminate, setindeterminate] = useState(false);
	const selected = data.filter((it) => {
		return it.checked;
	});
	useEffect(() => {
		if (data.length === 0) {
			setcheckedAll(false);
			setindeterminate(false);
			return;
		}
		const ac = selected.length === data.length;
		setcheckedAll(selected.length === data.length);
		setindeterminate(selected.length > 0 && !ac);
	}, [data, selected]);
	useEffect(() => {
		void (async () => {
			const data = await apiAdminGroupUnionUserListUser(query);
			setdata(data.data.map((it) => {
				const idx = it.groups.findIndex((group) => {
					return group.groupid === groupid;
				});
				console.log(it.groups, groupid, idx);
				return {
					...it,
					checked: it.groups.findIndex((group) => {
						return group.groupid === groupid;
					}) >= 0
				};
			}));
			settotal(data.total);
		})();
	}, [query]);
	return <Ui.MainContainer
		title='关联用户'
		parents={[{
			name: '组别管理',
			url: pages['/admin/group']
		}]}
		icon={res['/images/sys/group.svg']}
	>
		<div className='container'>
			<Ui.Form>
				<Ui.Form.Row>
					<Ui.Form.Column span={8}>
						<Ui.Form.Item.Input
							label={'组别名称'}
							value={groupname}
							disabled
						/>
					</Ui.Form.Column>
					<Ui.Form.Column offset={14} span={2}>
						<Ui.Button.Save
							onClick={async () => {
								await apiAdminGroupUnionUserSave({
									groupid,
									users: selected.map((user) => {
										return user.userid;
									})
								});
							}}
						/>
					</Ui.Form.Column>
				</Ui.Form.Row>
				<Ui.Form.Row>
					<Ui.Form.Column span={12}>
						<Ui.Form.Row>
							<Ui.Form.Column offset={1} span={20}>
								<div className='title'>
									搜索范围
								</div>
							</Ui.Form.Column>
						</Ui.Form.Row>
						<Ui.Form.Row>
							<Ui.Form.Column offset={1} span={20}>
								<Ui.Form.Item.Search
									searchButton='搜索'
								/>
							</Ui.Form.Column>
						</Ui.Form.Row>
						<Ui.Form.Row>
							<Ui.Form.Column>
								<Ui.Table
									data={data}
									keyField={'userid'}
									columns={[{
										dataIndex: 'userid',
										title: <Ui.Form.Item.Checkbox checked={checkedAll} indeterminate={indeterminate} onChange={(v) => {
											setdata(data.map(({ checked, ...rest }) => {
												return {
													...rest,
													checked: v
												};
											}));
										}} >用户名</Ui.Form.Item.Checkbox>,
										render(_val, row) {
											return <Ui.Form.Item.Checkbox
												checked={row.checked}
												onChange={(v) => {
													setdata(data.map((it) => {
														if (it.userid === row.userid) {
															return {
																...it,
																checked: v
															};
														}
														return it;
													}));
												}}
											>{row.userid}</Ui.Form.Item.Checkbox>;
										}
									}, {
										dataIndex: 'username',
										title: '用户姓名'
									}]}
									pagination={{
										current: parseInt(query.page || '1', 10),
										total,
										pageSize: pagesize(),
										onChange(pageNumber) {
											setquery({
												...query,
												page: pageNumber.toString()
											});
										},
									}}
								/>
							</Ui.Form.Column>
						</Ui.Form.Row>
					</Ui.Form.Column>
					<Ui.Form.Column span={12}>
						<Ui.Form.Row>
							<Ui.Form.Column span={12}>已选择:({selected.length}个)</Ui.Form.Column>
							<Ui.Form.Column offset={8} span={4}>
								<Ui.Button.Icon
									title='清空'
									icon={res['/images/sys/del.png']}
									onClick={() => {
										setdata(data.map((it) => {
											return {
												...it,
												checked: false
											};
										}));
									}}
								/>
							</Ui.Form.Column>
						</Ui.Form.Row>
						<Ui.Form.Row>
							<Ui.Form.Column>
								<Ui.Table
									data={selected}
									keyField={'userid'}
									showHeader={false}
									border={false}
									borderCell={false}
									stripe={false}
									columns={[{
										dataIndex: 'username',
										title: '用户姓名',
										render(v, row) {
											return `${v}(${row.userid})`;
										}
									}, {
										dataIndex: 'userid',
										title: '操作',
										render(val, row) {
											return <Ui.Table.ButtonGroup>
												<Ui.Button.Icon
													title='删除'
													icon={res['/images/sys/del2.png']}
													onClick={() => {
														setdata(data.map((it) => {
															if (it.userid === val) {
																return {
																	...it,
																	checked: false
																};
															}
															return it;
														}));
													}}
												/>
											</Ui.Table.ButtonGroup>;
										}
									}]}
									pagination={false}
								/>
							</Ui.Form.Column>
						</Ui.Form.Row>
					</Ui.Form.Column>
				</Ui.Form.Row>
			</Ui.Form>
		</div>
		<style jsx>{`
.container{
width: 100%;
background-color: #fff;
padding: 2rem;
}
.title{
padding: 1rem;
}
`}</style>
	</Ui.MainContainer>;
}
