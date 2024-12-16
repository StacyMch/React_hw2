import styles from './app.module.css';
import './index.css';
import { useState } from 'react';

export const App = () => {
	const [value, setValue] = useState('');
	const [list, setList] = useState([]);
	const [error, setError] = useState('');
	const [isValueVaild, setIsValueValid] = useState(false);
	//console.log(list);

	const getCurrentDateTime = () => {
		const now = new Date();

		const day = String(now.getDate()).padStart(2, '0');
		const month = String(now.getMonth() + 1).padStart(2, '0');
		const year = now.getFullYear();

		const hours = String(now.getHours()).padStart(2, '0');
		const minutes = String(now.getMinutes()).padStart(2, '0');
		const seconds = String(now.getSeconds()).padStart(2, '0');

		return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
	};

	const onInputButtonClick = () => {
		let promptValue = prompt();
		if (!promptValue || promptValue.length < 3) {
			setError('Введенное значение должно содержать минимум 3 символа');
			setIsValueValid(false);
			//console.log(isValueVaild);
		} else {
			//console.log(promptValue);
			setValue(promptValue);
			setError('');
			setIsValueValid(true);
			//console.log(isValueVaild);
		}
	};

	const onAddButtonClick = () => {
		if (isValueVaild) {
			let newEntry = {};
			newEntry.id = Date.now();
			newEntry.value = value;
			newEntry.dateTime = getCurrentDateTime();

			//let updatedList = [...list, newEntry];
			setList((prev) => [...prev, newEntry]);
			//setList(updatedList);

			setValue('');
			setError('');
			setIsValueValid(false);
		}
	};

	return (
		<div className={styles.app}>
			<h1 className={styles['page-heading']}>Ввод значения</h1>
			<p className={styles['no-margin-text']}>
				Текущее значение <code>value</code>: "
				<output className={styles['current-value']}>{value}</output>"
			</p>
			{error !== '' && <div className={styles.error}>{error}</div>}
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
				{list.length === 0 && (
					<p className={styles['no-margin-text']}>Нет добавленных элементов</p>
				)}
				{list.length > 0 && (
					<ul className={styles.list}>
						{list.map(({ id, value, dateTime }) => (
							<li key={id} className={styles['list-item']}>
								{value} ({dateTime})
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};
