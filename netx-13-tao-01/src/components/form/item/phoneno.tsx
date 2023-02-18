import { Input, Message } from '@arco-design/web-react';
import FormItem, { IFormItemProps } from '../item';

/**
 * 手机号
 */
export default function FormItemPhoneNo({
	value,
	disabled,
	onChange,
	...itemProps
}: {
	value?: string;
	disabled?: boolean;
	onChange?(value: string): void;
} & IFormItemProps) {
	return <FormItem label='手机号' {...itemProps}><Input
		allowClear
		disabled={disabled}
		placeholder='请输入手机号'
		style={{ width: '100%' }}
		value={value}
		maxLength={11}
		onChange={(v) => {
			if (!onChange) {
				return;
			}
			if (v) {
				const temp = parseInt(v);
				if (temp && temp > 0 && temp < 19999999999) {
					onChange(v.toString());
				}
			} else {
				onChange('');
			}
		}}
		onBlur={(v) => {
			const val = v.target.value;
			if (!/1\d{10}/.test(val)) {
				Message.error('手机号格式不合法');
			}
		}}
	/>
	</FormItem>;
}
