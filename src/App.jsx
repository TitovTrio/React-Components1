import { useState } from 'react';
import styles from './app.module.css';
import moment from 'moment';

export const App = () => {
	const [value, setValue] = useState('');
	const [list, setList] = useState([]);
	const [error, setError] = useState('');

	let isValueVaild = value < 3 ? false : true;

	const onInputButtonClick = () => {
		const promptValue = prompt();
		if (promptValue.length < 3) {
			setError('Введенное значение должно содержать минимум 3 символа');
		} else {
			setValue(promptValue);
			setError('');
		}
	};

	const onAddButtonClick = () => {
		if (value.length > 2) {
			setList([
				...list,
				{
					id: Date.now(),
					value: value,
					date: String(moment().format('D.M.YYYY hh:mm:ss')),
				},
			]); // не понятно зачем здесь апдейтер функция, если работает и без нее, но так написано в ТЗ
			setValue('');
			setError('');
		}
	};

	return (
		<div className={styles.app}>
			<h1 className={styles['page-heading']}>Ввод значения</h1>
			<p className={styles['no-margin-text']}>
				Текущее значение <code>value</code>:
				<output className={styles['current-value']}> {value}</output>
			</p>
			{error != '' && <div className={styles.error}>{error}</div>}
			<div className={styles['buttons-container']}>
				<button className={styles.button} onClick={onInputButtonClick}>
					Ввести новое
				</button>
				<button
					className={styles.button}
					disabled={!isValueVaild}
					onClick={onAddButtonClick}
				>
					Добавить в список
				</button>
			</div>
			<div className={styles['list-container']}>
				<h2 className={styles['list-heading']}>Список:</h2>
				<p className={styles['no-margin-text']}>Нет добавленных элементов</p>
				<ul className={styles.list}>
					{list ? (
						list.map(({ id, value, date }) => (
							<li className={styles['list-item']} key={id}>
								{date + ' - ' + value}
							</li>
						))
					) : (
						<li className={styles['list-item']}>Нет добавленных элементов</li>
					)}
				</ul>
			</div>
		</div>
	);
};
