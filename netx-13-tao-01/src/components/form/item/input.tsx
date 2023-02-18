import { Input } from '@arco-design/web-react';
import { CSSProperties } from 'react';
import FormItem, { IFormItemProps } from '../item';
import FormItemInputNumber from './number';
import FormItemID from './id';

/**
 * 输入框
 */
export default function FormItemInput({
	value,
	placeholder,
	maxLength,
	disabled,
	onChange,
	onPressEnter,
	style,
	...itemProps
}: {
	value?: string;
	placeholder?: string;
	maxLength?: number | {
		length: number;
		errorOnly?: boolean;
	};
	disabled?: boolean;
	style?: CSSProperties;
	onChange?(value: string): void;
	onPressEnter?(): void;
} & IFormItemProps) {
	return <FormItem {...itemProps}><Input
		allowClear
		disabled={disabled}
		placeholder={placeholder}
		style={{
			width: '100%',
			...style
		}}
		value={value}
		maxLength={maxLength}
		onChange={onChange}
		onPressEnter={onPressEnter}
	/>
	</FormItem>;
}

/**
 * 数字输入框
 */
FormItemInput.Number = FormItemInputNumber;

/**
 * 搜索框
 */
FormItemInput.Search = Input.Search;

/**
 * 身份证
 */
FormItemInput.ID = FormItemID;
