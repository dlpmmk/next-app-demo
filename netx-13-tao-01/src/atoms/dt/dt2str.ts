import toDate from './to-date';

export default function dt2str(tm: any, type: 'date' | 'time' | 'datetime') {
	if (!tm) {
		return '';
	}
	const dt = toDate(tm);
	switch (type) {
		case 'date':
			return dt.toLocaleDateString();
		case 'time':
			return dt.toLocaleTimeString();
		default:
			return dt.toLocaleString();
	}
}

// return moment(time).format(format);
