const touchZapros = window.matchMedia('((hover: none) and (pointer: coarse))');
let consecutivesCount = 3;
const CONSOLE_DEBUG = false;

let textStrings;
const language = document.querySelector('html').getAttribute('lang')
if (language == 'ru') {

	textStrings = {
		monthsNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
		event: 'Событие',
		date: 'Дата',
		time: 'Время',
		show: 'показать',
		error: 'Ошибка файла',
		choose: 'Выберите файл',
		chooseAnother: 'Выберите другой файл',
		choosed: 'Файл выбран',
		load: 'Загрузить',
		uploaded:'Обновлено',
		minute3:'минуты',
		minute2:'минуту',
		minute1:'минут',
		seconds:'секунд',
		ago:'назад',
		pilotsTab: {
			bestLap: 'Лучший круг',
			round: 'Раунд',
			heat: 'Группа',
			start: 'Старт',
			end: 'Конец',
			time: 'Время',
			bestConsecutive: `Лучшие ${consecutivesCount} круга`,
			average: 'Среднее время круга',
			totalLaps: 'Всего кругов',
			totalStarts: 'Всего Стартов',
			allLaps: 'Все круги',
			vs: 'Добавить к сравнению',
		},
		leaderboardTab: {
			lap: 'Круг',
			consecutive: `${consecutivesCount} Круга`,
			totalLaps: 'Всего кругов',
			average: 'Среднее время',
			name: 'Имя',
			round: 'Раунд',
			time: 'Время',
			starts: 'Стартов',
			laps: 'Кругов',
		},
		roundsTab: {
			heat: 'Группа',
			round: 'Раунд',
			view: 'Просмотр',
			statistic: 'Статистика',
			speed: 'Скорость',
			play: 'Старт',
			pause: 'Пауза',
			again: 'Начать заново',
			roundStart: 'Начало раунда',
			name: 'Имя пилота',
			laps: 'Круги',
			bestLap: 'Лучший круг',
			bestConsecutive: `Лучшие ${consecutivesCount} круга`,
			totalTime: 'Всего времени',
			holeShot: 'Старт',
			lap: 'Круг',
		},

		allLapsTab: {
			heat: 'Группа',
			round: 'Раунд',
			scale: 'Масштаб',
			roundNum: 'Номер раунда',
			lapNum: 'Номер круга',
			lapStart: 'Начало круга',
			lapEnd: 'Конец круга',
			lapTime: 'Время круга',
		},
		inRoundTab: {
			lap: 'Круг',
			heat: 'Группа',
			round: 'Раунд',
			roundStart: 'Начало раунда',
			lapNum: 'Номер круга',
			lapStart: 'Начало круга',
			lapEnd: 'Конец круга',
			lapsNum: 'Номера кругов',
			lapsStart: 'Начало кругов',
			lapsEnd: 'Конец кругов',
			lapTime: 'Время круга',
			goToRound: 'Перейти к раунду',

		},

		vsTab: {
			vs: 'vs',
			laps: 'Круги',
			statistic: 'Статистика',
			heat: 'Группа',
			round: 'Раунд',
			scale: 'Масштаб',
			roundNum: 'Номер раунда',
			roundStart: 'Старт Раунда',
			lapNum: 'Номер круга',
			lapTime: 'Время круга',
			bestLap: 'Лучший круг',
			bestConsecutive: `Лучшие ${consecutivesCount} круга`,
			totalLaps: 'Всего кругов',
			average: 'Среднее время',
			starts: 'Стартов',
			totalTime: 'Всего времени',
		}
	}
} else if (language == 'en') {

	textStrings = {
		monthsNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
		event: 'Event',
		date: 'Date',
		time: 'Time',
		show: 'Show',
		error: 'File error',
		choose: 'Choose file',
		chooseAnother: 'Choose another file',
		choosed: 'File choosed',
		load: 'Load',
		uploaded:'Updated',
		minute3:'minutes',
		minute2:'minutes',
		minute1:'minutes',
		seconds:'seconds',
		ago:'ago',

		pilotsTab: {
			bestLap: 'Best lap',
			round: 'Round',
			heat: 'Heat',
			start: 'Start',
			end: 'End',
			time: 'Time',
			bestConsecutive: `Best consecutive`,
			average: 'Average time',
			totalLaps: 'Total laps',
			totalStarts: 'Total starts',
			allLaps: 'All laps',
			vs: 'add to .Versus',
		},
		leaderboardTab: {
			lap: 'Lap',
			consecutive: `Consecutive`,
			totalLaps: 'Total laps',
			average: 'Average',
			name: 'Name',
			round: 'Round',
			time: 'Time',
			starts: 'Starts',
			laps: 'Laps',
		},
		roundsTab: {
			heat: 'Heat',
			round: 'Round',
			view: 'View',
			statistic: 'Statistic',
			speed: 'Speed',
			play: 'Start',
			pause: 'Pause',
			again: 'Again',
			roundStart: 'Round start',
			name: 'Pilot name',
			laps: 'Laps',
			bestLap: 'Best lap',
			bestConsecutive: `Best consecutive`,
			totalTime: 'Total time',
			holeShot: 'Hole shot',
			lap: 'Lap',
		},

		allLapsTab: {
			heat: 'Heat',
			round: 'Round',
			scale: 'Scale',
			roundNum: 'Round',
			lapNum: 'Lap number',
			lapStart: 'Lap start',
			lapEnd: 'Lap end',
			lapTime: 'Lap time',
		},
		inRoundTab: {
			lap: 'Lap',
			heat: 'Heat',
			round: 'Round',
			roundStart: 'Round start',
			lapNum: 'Lap number',
			lapStart: 'Lap start',
			lapEnd: 'Lap end',
			lapsNum: 'Laps numbers',
			lapsStart: 'Consecutive start',
			lapsEnd: 'Consecutive end',
			lapTime: 'Lap time',
			goToRound: 'Go to round',

		},

		vsTab: {
			vs: 'vs',
			laps: 'Laps',
			statistic: 'Statistic',
			heat: 'Heat',
			round: 'Round',
			scale: 'Scale',
			roundNum: 'Round',
			roundStart: 'Round start',
			lapNum: 'Lap number',
			lapTime: 'Lap time',
			bestLap: 'Best lap',
			bestConsecutive: `Best consecutive`,
			totalLaps: 'Total laps',
			average: 'Average',
			starts: 'Starts',
			totalTime: 'Total time',
		}
	}
}


if (touchZapros.matches) {			//Анимация кнопок на тач экранах
	document.addEventListener('click', function (event) {
		if (event.target.closest('button')) {
			event.target.classList.add('_active-animation');
			setTimeout(() => {
				event.target.classList.remove('_active-animation');///
			}, 100);
		}
	})
}


let filesJson = [];


//Проверка, есть ли ивент в url
const isEvent = new URLSearchParams(window.location.search).get('event')

const isLive = new URLSearchParams(window.location.search).get('uuid')



async function getLiveData(uuid) {
		const data = await fetch(`https://rh-results-viewer.vercel.app/api/getData?uuid=${uuid}`)
		
		if (!data.ok) throw new Error('Ошибка загрузки')
		const dataJson = await data.json();
	console.log('dataJsondataJson',dataJson);
	
		mainObj = dataJson.data.data.results
		return dataJson.data.data
}

async function getEventData(event) {
		const fileName = `${event}.json`
		// const url = fileName
		const url = `https://rh-results-viewer.vercel.app/api/proxy?path=results.jsons/${fileName}`
		const data = await fetch(url)
		if (!data.ok) throw new Error('Ошибка загрузки')
		mainObj = await data.json();
		
		console.log('EVENT',mainObj);
		
}



if (isLive) {
	const wrapperElement = document.querySelector('.wrapper')
	wrapperElement.classList.add('_hide')
	
	urlUpload('live');
	
	
}else if(isEvent){
	const wrapperElement = document.querySelector('.wrapper')
	wrapperElement.classList.add('_hide')
	urlUpload('event');
	console.log('urlEvent');

} else {
	const mainElement = document.querySelector('.main')
	mainElement.classList.remove('_hide');
	console.log('no event on url');
}

function getMinutesSinceUpload(uploadTimestamp) {
	if (!uploadTimestamp || typeof uploadTimestamp !== 'number') {
		 return 'Некорректный timestamp';
	}
	
	const now = Date.now();
	
	// Проверка на "timestamp из будущего"
	if (uploadTimestamp > now) {
		 return 'Timestamp не может быть из будущего';
	}
	
	const diffMs = now - uploadTimestamp;
	const diffMinutes = Math.floor(diffMs / 60000); // 60000 мс = 1 минута
	
	// Возвращаем текст с правильным склонением
	if (diffMinutes === 0) {
		 const diffSeconds = Math.floor(diffMs / 1000);
		 return `${textStrings.uploaded} ${diffSeconds} ${textStrings.seconds} ${textStrings.ago}`;
	}
	
	const lastDigit = diffMinutes % 10;
	const lastTwoDigits = diffMinutes % 100;
	
	let minuteWord = textStrings.minute1;
	if (lastTwoDigits < 11 || lastTwoDigits > 14) {
		 if (lastDigit === 1) minuteWord = textStrings.minute2;
		 if (lastDigit >= 2 && lastDigit <= 4) minuteWord = textStrings.minute3;
	}
	
	return `${textStrings.uploaded}: ${diffMinutes} ${minuteWord} ${textStrings.ago}`;
}

// Загрузка ивента по имени из url
async function urlUpload(type) {
	try {
		const eventUrl = new URL(window.location.href)
		const shareUrlElement = document.querySelector('.author__share-url')

		if (type=='live'){
			const fullLive = await getLiveData(isLive)
			makeRaceClassButtons();
			startFileView('live', '123');

			const mainDisplayName = document.querySelector('.main-tittle__display-name')
			const mainDate = document.querySelector('.main-tittle__date')
			const mainTime = document.querySelector('.main-tittle__time')

	
			mainDisplayName.innerHTML = `${fullLive.eventName}`;
			mainDate.innerHTML = getMinutesSinceUpload(fullLive.date)
			mainTime.remove();

			eventUrl.searchParams.set('uuid', `${isLive}`)
			shareUrlElement.textContent = eventUrl.href;
			if (language == 'ru') {
				const languageElement = document.querySelector('.language__EN')
				const newLanguageChangeLink = `${languageElement.getAttribute('href')}?uuid=${eventUrl.searchParams.get('uuid')}`
				languageElement.setAttribute('href', `${newLanguageChangeLink}`)
	
			} else if (language == 'en') {
				const languageElement = document.querySelector('.language__RU')
				const newLanguageChangeLink = `${languageElement.getAttribute('href')}?uuid=${eventUrl.searchParams.get('uuid')}`
				languageElement.setAttribute('href', `${newLanguageChangeLink}`)
			}

		}else if (type=='event'){			
			await getEventData(isEvent)
			makeRaceClassButtons();
			startFileView('url', isEvent);

			eventUrl.searchParams.set('event', `${isEvent}`)
			shareUrlElement.textContent = eventUrl.href;
			if (language == 'ru') {
				const languageElement = document.querySelector('.language__EN')
				const newLanguageChangeLink = `${languageElement.getAttribute('href')}?event=${eventUrl.searchParams.get('event')}`
				languageElement.setAttribute('href', `${newLanguageChangeLink}`)
	
			} else if (language == 'en') {
				const languageElement = document.querySelector('.language__RU')
				const newLanguageChangeLink = `${languageElement.getAttribute('href')}?event=${eventUrl.searchParams.get('event')}`
				languageElement.setAttribute('href', `${newLanguageChangeLink}`)
			}
		}
		
		


	
		

	} catch (error) {
		const wrapperElement = document.querySelector('.wrapper')
		wrapperElement.classList.add('_error')
	}
}


//Календарь///////////////////////////
let currentMonth = new Date();
const daysElement = document.querySelector('.calendar__days')


daysElement.addEventListener('click', function (e) {

	const day = e.target.closest('.calendar__day')

	if (e.target == day && day.classList.contains('_day__file')) {
		mainForm.subtittle.classList.add('_hidden')
		mainForm.label.classList.add('_hidden')
		const dateStr = e.target.id;
		getDayFiles(dateStr)
		e.target.classList.add('_active')
	}
})
const dateFilesItemsElement = document.querySelector('.date-files__items')


dateFilesItemsElement.addEventListener('click', function (e) {
	if (e.target.closest('.file__item')) {
		const fileItemElement = e.target.closest('.file__item');

		const fileName = fileItemElement.id
		const dateFileElements = document.querySelectorAll('.file__item')

		dateFileElements.forEach(elem => {
			if (elem != fileItemElement) {
				elem.classList.add('_hidden', '_no-event');
			}
		})
		const lastFileTittle = document.querySelector('.last-file__tittle')
		const calendarElement = document.querySelector('.calendar')
		const languageElement = document.querySelector('.language')

		languageElement.classList.add('_hidden')
		lastFileTittle.classList.add('_hidden')
		calendarElement.classList.add('_hidden');

		fileItemElement.classList.add('_active', 'flie-item_uploading');
		dateFileUpload(fileName);
	}
})


function calendarRender(filesloaded) {
	const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
	const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0)


	const monthHeaderElement = document.querySelector('.calendar__current-month')

	monthHeaderElement.innerHTML = `${textStrings.monthsNames[currentMonth.getMonth()]} ${currentMonth.getFullYear()}`


	// const nextMonthDays = 6 - lastDay.getDay() + ((firstDay.getDay() <= 4) && (firstDay.getDay() != 0) ? 1 + 7 : 1)

	const prevMonthDays = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;

	const totalDays = 42;
	const nextMonthDays = totalDays - lastDay.getDate() - prevMonthDays;




	const today = new Date();


	daysElement.innerHTML = '';

	for (let i = 1; i <= totalDays; i++) {
		const dayElement = document.createElement('button');
		dayElement.classList.add('calendar__day')

		let dayNumber, isCurrentMonth;

		if (i <= prevMonthDays) {
			dayNumber = new Date(
				currentMonth.getFullYear(),
				currentMonth.getMonth(),
				0
			).getDate() - prevMonthDays + i;
			isCurrentMonth = false;

		} else if (i > prevMonthDays + lastDay.getDate()) {
			dayNumber = i - (prevMonthDays + lastDay.getDate())
			isCurrentMonth = false;
		} else {
			dayNumber = i - prevMonthDays
			isCurrentMonth = true;
		}

		if (currentMonth.getFullYear() == today.getFullYear() &&
			currentMonth.getMonth() == today.getMonth() &&
			dayNumber == today.getDate() &&
			isCurrentMonth) {
			dayElement.classList.add('_day__today')

		}


		let isHaveFiles;
		filesJson.forEach(file => {
			if (file.year == currentMonth.getFullYear() &&
				file.month == currentMonth.getMonth() &&
				file.day == dayNumber &&
				isCurrentMonth) {
				isHaveFiles = true;
				dayElement.classList.add('_day__file');
			}
		})

		const dateStr = `${currentMonth.getFullYear()}-${currentMonth.getMonth()}-${dayNumber}`;


		if (isHaveFiles) dayElement.id = dateStr;



		if (!isCurrentMonth) {
			dayElement.classList.add('_day__other-month')
		}
		dayElement.innerHTML = dayNumber;

		if (!filesloaded) {
			dayElement.classList.add('_no-files');
		} else {
			const calendarHeaderElement = document.querySelector('.calendar__header')
			calendarHeaderElement.classList.remove('_no-files');
		}
		daysElement.append(dayElement);

	}

}


const prevButton = document.querySelector('.calendar__prev-month')
const nextButton = document.querySelector('.calendar__next-month')

async function moveMonth(start, stop) {
	prevButton.classList.add('_no-event');
	nextButton.classList.add('_no-event');

	const dateFilesElement = document.querySelector('.date-files__items')
	dateFilesElement.classList.add('_hidden')

	const monthHeaderElement = document.querySelector('.calendar__current-month')

	monthHeaderElement.classList.add(`_hidden-${start}`);
	daysElement.classList.add(`_hidden-${start}`);

	await new Promise(resolve => {
		daysElement.addEventListener('transitionend', resolve, { once: true })
	})

	daysElement.style.transition = 'none';
	monthHeaderElement.style.transition = 'none';
	daysElement.classList.remove(`_hidden-${start}`);
	monthHeaderElement.classList.remove(`_hidden-${start}`);
	monthHeaderElement.classList.add(`_hidden-${stop}`);
	daysElement.classList.add(`_hidden-${stop}`);

	await new Promise(resolve => requestAnimationFrame(resolve))

	if (start == 'right') {
		currentMonth.setMonth(currentMonth.getMonth() - 1)
	} else if (start == 'left') {
		currentMonth.setMonth(currentMonth.getMonth() + 1)
	}
	calendarRender(true);

	await new Promise(resolve => requestAnimationFrame(resolve))

	dateFilesElement.innerHTML = ''
	daysElement.style.transition = '';
	monthHeaderElement.style.transition = '';
	monthHeaderElement.classList.remove(`_hidden-${stop}`);
	daysElement.classList.remove(`_hidden-${stop}`);
	prevButton.classList.remove('_no-event');
	nextButton.classList.remove('_no-event');
}

prevButton.addEventListener('click', () => moveMonth('right', 'left'))
nextButton.addEventListener('click', () => moveMonth('left', 'right'))


//////////////////////////////////////////


//Файлы для календаря//////////////


async function filesJsonLoad() {
	calendarRender(false);
	let responseDataFiles;

	try {

		const url = `https://rh-results-viewer.vercel.app/api/proxy?path=files.json`

		// const url = `files.json`


		const response = await fetch(url);

		if (!response.ok) throw new Error("Ошибка загрузки");
		const responseData = await response.json();

		// console.log('responseData', responseData);
		responseDataFiles = responseData.files;

		responseDataFiles.forEach(file => {			///Собираем объект всех файлов из репозитория
			const obj = {};
			const [datePart, timePart, displayName] = file.split('_');
			const isoString = `${datePart}T${timePart.replace('-', ':')}`;
			const date = new Date(isoString);
			obj.displayName = displayName.split('.')[0].replace(/-/g, ' ')
			obj.date = date;
			obj.fileName = file;
			obj.year = date.getFullYear();
			obj.month = date.getMonth();
			obj.monthName = textStrings.monthsNames[date.getMonth()];
			obj.day = date.getDate();
			obj.hours = date.getHours();
			obj.minutes = date.getMinutes();
			filesJson.push(obj);
		});

		const spanLoadeingElement = document.querySelector('._no-files-span');
		const daysElement = document.querySelector('.calendar__days')
		spanLoadeingElement.classList.add('_hidden')
		daysElement.classList.add('_hide-loading')

		spanLoadeingElement.addEventListener('transitionend', function (e) {
			if (e.propertyName == 'opacity') {
				const lastFileItemElement = document.querySelector('.last-file__item')
				lastFileItemElement.classList.remove('_no-files')
				daysElement.classList.remove('_hide-loading')
				const calendarDaysElement = document.querySelector('.calendar__days');
				calendarDaysElement.classList.remove('_no-files');
			}
		})

		const lastFileNameElement = document.querySelector('.last-file__file-name-value')
		const lastFileDateElement = document.querySelector('.last-file__date-value')
		const lastFileTimeElement = document.querySelector('.last-file__time-value')

		const lastFile = filesJson[filesJson.length - 1]
		lastFileNameElement.innerHTML = lastFile.displayName;
		lastFileDateElement.innerHTML = `${lastFile.day} ${lastFile.monthName} ${lastFile.year}`
		lastFileTimeElement.innerHTML = `${lastFile.hours}:${lastFile.minutes}`

		calendarRender(true);

		console.log('filessss', filesJson);

	} catch (error) {
		console.error("Не удалось загрузить файл:", error);

	}
}

filesJsonLoad();



function getDayFiles(date) {
	const dayButtons = document.querySelectorAll('.calendar__day')
	dayButtons.forEach(button => {
		if (button.classList.contains('_active')) button.classList.remove('_active')
	})

	const dateFilesElement = document.querySelector('.date-files__items')
	if (!dateFilesElement.classList.contains('_hidden')) dateFilesElement.classList.add('_hidden')

	setTimeout(() => {
		dateFilesElement.innerHTML = '';

		filesJson.forEach(file => {
			const fileDateArr = `${file.year}-${file.month}-${file.day}`;

			if (date == fileDateArr) {

				const fileItemElement = {
					item: document.createElement('div'),
					name: document.createElement('div'),
					nameTittle: document.createElement('div'),
					nameValue: document.createElement('div'),
					date: document.createElement('div'),
					dateTittle: document.createElement('div'),
					dateValue: document.createElement('div'),
					time: document.createElement('div'),
					timeTittle: document.createElement('div'),
					timeValue: document.createElement('div'),
				}

				fileItemElement.item.classList.add('file__item', 'pseudo-button')
				fileItemElement.item.id = file.fileName;
				fileItemElement.name.classList.add('file__file-name')
				fileItemElement.nameTittle.classList.add('file__file-name-tittle')
				fileItemElement.nameValue.classList.add('file__file-name-value')
				fileItemElement.date.classList.add('file__date')
				fileItemElement.dateTittle.classList.add('file__date-tittle')
				fileItemElement.dateValue.classList.add('file__date-value')
				fileItemElement.time.classList.add('file__time')
				fileItemElement.timeTittle.classList.add('file__time-tittle')
				fileItemElement.timeValue.classList.add('file__time-value')

				fileItemElement.nameTittle.innerHTML = `${textStrings.event}:`
				fileItemElement.nameValue.innerHTML = file.displayName

				fileItemElement.dateTittle.innerHTML = `${textStrings.date}:`
				fileItemElement.dateValue.innerHTML = `${file.day} ${file.monthName} ${file.year}`

				fileItemElement.timeTittle.innerHTML = `${textStrings.time}:`
				fileItemElement.timeValue.innerHTML = `${file.hours}:${file.minutes}`


				fileItemElement.item.append(fileItemElement.name, fileItemElement.date, fileItemElement.time)
				fileItemElement.name.append(fileItemElement.nameTittle, fileItemElement.nameValue)
				fileItemElement.date.append(fileItemElement.dateTittle, fileItemElement.dateValue)
				fileItemElement.time.append(fileItemElement.timeTittle, fileItemElement.timeValue)




				dateFilesElement.append(fileItemElement.item)

			}


		})
		setTimeout(() => {
			dateFilesElement.classList.remove('_hidden')
		}, 20);
	}, 310);

}


async function dateFileUpload(fileName) {
	const fileItemElement = document.querySelector('.flie-item_uploading')
	const loadTimer = setTimeout(() => {
		fileItemElement.classList.add('_loading');
	}, 500);

	try {

		const url = `https://rh-results-viewer.vercel.app/api/proxy?path=results.jsons/${fileName}`


		const data = await fetch(url)
		if (!data.ok) throw new Error('Ошибка загрузки')
		mainObj = await data.json();

		makeRaceClassButtons();

		setTimeout(() => {
			fileItemElement.classList.add('_hidden');
			fileItemElement.addEventListener('transitionend', function (e) {
				if (e.propertyName == 'opacity') {
					window.scrollTo({
						top: 0,
						behavior: 'smooth'
					})
					startFileView('date', fileName);

					const eventUrl = new URL(window.location.href)
					eventUrl.searchParams.set('event', `${fileName.slice(0, -5)}`)

					history.pushState({},'',eventUrl)


					const shareUrlElement = document.querySelector('.author__share-url')
					shareUrlElement.textContent = eventUrl.href;
					

				}
			})

		}, 400);


	} catch (error) {

		fileItemElement.classList.remove('_loading');
		fileItemElement.classList.add('_loading-error');
	}
	clearTimeout(loadTimer);


}

////////////////////////////



const lastFileButton = document.querySelector('.last-file__item');

let currentClass;   //Переменная класса
let currentClassChoosed = false;   //Первый класс не выбран

let notParsedJson; // переменная НЕспарсинного файла
let mainObj; // переменная спарсинного файла
let parsedOK = false; // Флаг успешного парсинга файла


//////////////////////////////////////////////////////




async function lastFileUpload() {
	const lastFileButton = document.querySelector('.last-file__item')
	const loadTimer = setTimeout(() => {
		lastFileButton.classList.add('_loading');
	}, 500);

	try {
		const fileName = filesJson[filesJson.length - 1].fileName;
		const url = `https://rh-results-viewer.vercel.app/api/proxy?path=results.jsons/${fileName}`

		// const fileName = `2025-06-24_19-31_Whoopclub.json`
		// const url = fileName

		const data = await fetch(url);



		if (!data.ok) throw new Error('Ошибка загрузки');

		mainObj = await data.json();

		makeRaceClassButtons();
		lastFileButton.classList.remove('_loading');
		lastFileButton.classList.add('_move');

		lastFileButton.addEventListener('transitionend', function (e) {
			if (e.propertyName === 'transform') {
				startFileView('local', filesJson[filesJson.length - 1].fileName);

				const eventUrl = new URL(window.location.href)
				eventUrl.searchParams.set('event', `${fileName.slice(0, -5)}`)

				history.pushState({},'',eventUrl)

				const shareUrlElement = document.querySelector('.author__share-url')
				shareUrlElement.textContent = eventUrl.href;

			}
		})
	} catch (error) {
		lastFileButton.classList.remove('_loading');
		lastFileButton.classList.add('_loading-error');

	}
	clearTimeout(loadTimer);

}




lastFileButton.addEventListener('click', function () {
	const lastFileTittle = document.querySelector('.last-file__tittle');
	const calendarElement = document.querySelector('.calendar')
	const mainSubtittleElement = document.querySelector('.main-subtittle')
	const mainForm = document.querySelector('.main-form');
	const dateFilesElement = document.querySelector('.date-files')
	const labelElement = document.querySelector('.main-form__label')
	const languageElement = document.querySelector('.language')

	languageElement.classList.add('_hidden')
	dateFilesElement.classList.add('_hidden')
	labelElement.classList.add('_hidden')
	mainSubtittleElement.classList.add('_hidden')
	mainForm.classList.add('_hidden')
	calendarElement.classList.add('_hidden')
	lastFileTittle.classList.add('_hidden')

	lastFileButton.classList.add('_active')
	lastFileUpload();

});



const mainForm = {
	tittle: document.querySelector('.main-tittle'),
	form: document.querySelector('.main-form'),
	input: document.querySelector('.main-form__file'),
	label: document.querySelector('.main-form__label'),
	button: document.querySelector('.main-form__button'),
	subtittle: document.querySelector('.main-subtittle'),
}

const buttons = {
	element: document.querySelector('.buttons'),
	container: document.querySelector('.buttons__container'),
	pilots: document.querySelector('.buttons__pilots'),
	leaderboard: document.querySelector('.buttons__leaderboard'),
	rounds: document.querySelector('.buttons__rounds'),
	statistic: document.querySelector('.round__statistic-button'),
	view: document.querySelector('.round__view-button'),
}


let tabsMain;
let graphMouseFlag;
let akcentArr;
let lapsIdData = [];
let pilotsVsDuel = [];



mainForm.input.addEventListener('change', async function () {			//Событие добавление файла
	const file = mainForm.input.files[0];

	if (file) {			//Проверяем, добавился ли файл
		if (CONSOLE_DEBUG) console.log('файле есть');
		mainForm.button.classList.add('_ready');
		mainForm.label.innerHTML = textStrings.choosed;
		mainForm.label.classList.add('_active');
		mainForm.button.classList.add('_active');
		if (mainForm.label.classList.contains('_error-parsing')) {			//Если добавляем файл после ошибки парсинга, убираем стили ошибки
			mainForm.label.classList.remove('_error-parsing');
		}
	} else {			// Если не добавился, убираем стили того, как добавился, т.к. они могут быть
		if (CONSOLE_DEBUG) console.log('файл нет');
		mainForm.label.classList.remove('_active')
		mainForm.label.innerHTML = textStrings.choose;
		mainForm.button.classList.remove('_ready');
	}
})


async function fileLoading(fileToUpload) {		//процесс загрузки файла
	const stringJson = await fileProcessUpload(fileToUpload);
	return stringJson;			// возвращаем значение прочитанного файла из промисса
}

function fileProcessUpload(fileToUpload) { // здесь делаем промис, который fullfilled когда файл загрузится
	return new Promise(function (resolve, reject) {
		let reader = new FileReader();

		reader.readAsText(fileToUpload);

		reader.onload = function () {
			const data = reader.result;
			resolve(data);
		};

		reader.onerror = function () {
			const error = reader.error;
			reject(error)
		};

	})
}

function fileToParse(stringJson) { // Парсим файл, ставим флаг ОК, если Ок
	let data;
	try {
		data = JSON.parse(stringJson);
		if (CONSOLE_DEBUG) console.log(data);

		parsedOK = true;
		return data;
	} catch {
		if (CONSOLE_DEBUG) console.log('Ошибка Парсинга');
		parsedOK = false;
	}
}






async function startButtonClick(e) { 	//Нажатие на кнопку Загрузить - Самое начало
	e.preventDefault();
	const file = mainForm.input.files[0];

	if (file) {				//Проверяем, есть ли файл

		notParsedJson = await fileLoading(file); //Здесь читаем файл и записываем его в переменную
		if (CONSOLE_DEBUG) console.log(notParsedJson);
		mainObj = fileToParse(notParsedJson); // Здесь парсим эту переменную
		if (parsedOK) {			//Проверяем, норм ли спарсилось, и если да, убираем форму ввода и показываем дальнейшие кнопки



			makeRaceClassButtons();
			startFileView('load');

		} else {			//Если не спарсилось, рисуем ошибку
			mainForm.button.innerHTML = textStrings.error;
			mainForm.button.classList.add('_error-parsing');
			mainForm.label.innerHTML = textStrings.chooseAnother;
			mainForm.label.classList.add('_error-parsing');
			mainForm.button.classList.remove('_ready');
			setTimeout(() => {
				smoothTextChange(mainForm.button, textStrings.load)
				mainForm.button.classList.remove('_error-parsing');
			}, getAnimationDurationTime(mainForm.button));
		}
	} else {			//Если нет файла, показываем, как его нет и куда добавить
		if (CONSOLE_DEBUG) console.log('Файла нет');
		mainForm.label.classList.add('_error');
		setTimeout(() => {
			mainForm.label.classList.remove('_error');
		}, getAnimationDurationTime(mainForm.label));

	}
}


function makeRaceClassButtons() {
	//Делаем кнопки Классов
	const classButtonsContainer = document.querySelector('.class-switch-buttons__container');
	const raceClasses = mainObj.classes;

	// let tabsClasses = [];
	for (let raceClass in raceClasses) {
		if (mainObj.heats_by_class[raceClass].length != 0) {

			const classSwitchButton = document.createElement('button')
			classSwitchButton.classList.add(`class-switch-buttons__class-${raceClass}`, '_button', 'class-switch-buttons__button');
			classSwitchButton.innerHTML = raceClasses[raceClass].name;
			classButtonsContainer.append(classSwitchButton);
			classSwitchButton.setAttribute('value', `${raceClass}`)
			classSwitchButton.addEventListener('click', classSwitch)

			// if (!currentClassChoosed) {			//С таким учловием будет выбран 1 класс 
			// 	currentClass = raceClass
			// 	classSwitchButton.classList.add('_active', '_no-event')
			// 	currentClassChoosed = true;
			// }
		}
	}
	const classSwitchButtons = document.querySelectorAll('.class-switch-buttons__button')
			const lastClassButtonSwitch = classSwitchButtons[classSwitchButtons.length-1]
			lastClassButtonSwitch.classList.add('_active', '_no-event')

			currentClass=lastClassButtonSwitch.getAttribute('value')

}

function startFileView(fileType, fileName) {

	try {
		consecutivesCount = mainObj.consecutives_count;
	} catch (error) {
		if (CONSOLE_DEBUG) console.log('Не найдена информация о consecutives count');
	}



	const tabWrapper = document.querySelector('.tabs-wrapper');
	tabWrapper.append(writePilotsHTML(), writeLeaderboardHTML(), writeRoundsHTML());			//добавляем HTML пилоты, круги, подряд и раунды


	//определяем вкладки, чтобы навесить на них событие, тут же информация для tabSwitch функции
	tabsMain = [
		{ name: 'pilots', opened: false, element: document.querySelector('.pilots'), },
		{ name: 'leaderboard', opened: false, element: document.querySelector('.leaderboard'), },
		{ name: 'rounds', opened: false, element: document.querySelector('.rounds'), },
	]

	tabsLeader = [
		{ name: 'lap', opened: false, element: document.querySelector('.leaderboard-lap'), },
		{ name: 'consecutive', opened: false, element: document.querySelector('.leaderboard-consecutive'), },
		{ name: 'count', opened: false, element: document.querySelector('.leaderboard-count'), },
		{ name: 'average', opened: false, element: document.querySelector('.leaderboard-average'), },
	]
	buttons.lap = document.querySelector('.leaderboard__lap-button');
	buttons.consecutive = document.querySelector('.leaderboard__consecutive-button');
	buttons.count = document.querySelector('.leaderboard__count-button');
	buttons.average = document.querySelector('.leaderboard__average-button');



	tabsRounds = getTabsRounds();

	tabsRounds.forEach(tab => {
		const tabName = tab.name
		buttons[tabName] = document.querySelector(`.rounds__${tabName}`);
	})


	tabsMain[0].element.addEventListener('click', pilotTabAction);			//открываем события вкладки Pilots
	tabsMain[1].element.addEventListener('click', leaderboardTabAction);			//открываем события вкладки Leaderboard

	tabsMain[2].element.addEventListener('click', roundsTabAction)			//открываем события вкладки Rounds


	tabSwitch(tabsLeader[0].name, tabsLeader);
	const leaderboardItemsElement = document.querySelector('.leaderboard__items');
	tabHeightChange(tabsLeader[0].element, leaderboardItemsElement, true)


	tabSwitch(tabsRounds[0].name, tabsRounds);
	const roundsItemsElement = document.querySelector('.rounds__items');

	tabHeightChange(tabsRounds[0].element, roundsItemsElement, true)


	if (fileType != 'classSwitch') {
		const shareElement = document.querySelector('.author__share')

		shareElement.classList.remove('_hide')

		shareElement.addEventListener('click', async function () {

			const urlToCopy = document.querySelector('.author__share-url').textContent;
			try {
				await navigator.clipboard.writeText(urlToCopy)

				shareElement.classList.add('_success')
				const timer = setTimeout(() => {
					shareElement.classList.remove('_success')
					clearTimeout(timer)
				}, 1000);
			} catch (error) {
				shareElement.classList.add('_error')
				const timer = setTimeout(() => {
					shareElement.classList.remove('_error')
					clearTimeout(timer)
				}, 1000);
			}
		})


		const windowWidth = window.innerWidth;			// ширина окна, сколько надо проехаться кнопками за границу
		const buttonWidth = mainForm.button.offsetWidth;			//ширина кнопки, чтобы не торчали края
		const labelWidth = mainForm.label.offsetWidth;			//ширина label чтобы не торчали края

		const lastFileElement = document.querySelector('.last-file')
		const dateFilesElement = document.querySelector('.date-files')
		const calendarElement = document.querySelector('.calendar')


		if (fileType == 'load') {
			lastFileElement.classList.add('_hidden')
			mainForm.button.style.transition = 'all 1s ease';
			mainForm.button.style.transform = `translate(${windowWidth / 2 + buttonWidth}px, 0px)`;			//едем
			mainForm.label.style.transition = 'all 1s ease';
			mainForm.label.style.transform = `translate(-${windowWidth / 2 + labelWidth}px, 0px)`;			//едем
			mainForm.subtittle.classList.add('_hidden');
			dateFilesElement.classList.add('_hidden')
			setTimeout(() => {
				window.scrollTo({
					top: 0,
					behavior: 'smooth'
				})
			}, 300);
		}

		mainForm.subtittle.classList.add('_hidden');


		setTimeout(() => {			//меняем после анимации кнопки и label, которые ниже.
			const mainDisplayName = document.querySelector('.main-tittle__display-name')
			const mainDate = document.querySelector('.main-tittle__date')
			const mainTime = document.querySelector('.main-tittle__time')
			if (fileType != 'load'&&fileType != 'live') {
				const [datePart, timePart, displayName] = fileName.split('_');
				const isoString = `${datePart}T${timePart.replace('-', ':')}`;
				const date = new Date(isoString);
				console.log('date', date);

				mainDisplayName.innerHTML = displayName.split('.')[0].replace(/-/g, ' ')
				mainDate.innerHTML = `${date.getDate()} ${textStrings.monthsNames[date.getMonth()]} ${date.getFullYear()}`
				mainTime.innerHTML = `${date.getHours()}:${date.getMinutes()}`
			} else if (fileType == 'load') {
				const day = getDateinfo('day')
				const year = getDateinfo('year')
				const time = getDateinfo('time')
				mainDisplayName.innerHTML = `${textStrings.event}`;
				mainDate.innerHTML = `${day} ${year}`
				mainTime.innerHTML = `${time}`
			}
			mainForm.tittle.classList.remove('_hidden');
			lastFileElement.remove();
			calendarElement.remove();
			dateFilesElement.remove();
			if (fileType == 'url'||fileType == 'live') {
				const mainElement = document.querySelector('.main')
				const wrapperElement = document.querySelector('.wrapper')

				mainElement.classList.remove('_hide')
				wrapperElement.classList.add('_to-hide')
				const hideEnd = setTimeout(() => {
					wrapperElement.classList.remove('_to-hide')
					wrapperElement.classList.remove('_hide')
					clearTimeout(hideEnd);
				}, 1000);
			}
		}, 500);

		setTimeout(() => {
			const classButtonsContainer = document.querySelector('.class-switch-buttons__container');
			mainForm.button.remove();
			mainForm.form.remove();
			mainForm.subtittle.remove();
			buttons.container.classList.add('_active');
			classButtonsContainer.classList.add('_active')

			const homeElement = document.querySelector('.home')
			homeElement.classList.remove('_hidden')

		}, 500);
	} else {

		setTimeout(() => {
			const buttonsContainer = document.querySelector('.class-switch-buttons__container');
			buttonsContainer.classList.remove('_no-event');

			const buttonPilots = document.querySelector('.buttons__pilots')
			const buttonLeaderboard = document.querySelector('.buttons__leaderboard')
			const buttonRounds = document.querySelector('.buttons__rounds')
			buttonPilots.classList.add('_ready')
			buttonLeaderboard.classList.add('_ready')
			buttonRounds.classList.add('_ready')
		}, 450);
	}
	setTimeout(() => {
		tabSwitch(tabsMain[1].name, tabsMain);
	}, 550);
}

mainForm.form.addEventListener('submit', startButtonClick);			//событие нажатия на кнопку



function pilotTabAction(e) {			//Это события вкладки Pilots

	if (e.target.closest('.pilots__pilot-name')) {			//если нажата с именем делаем spoilerOn;
		const pilotItem = e.target.parentNode;
		const stats = e.target.nextElementSibling;
		const statsChildren = stats.children;
		if (CONSOLE_DEBUG) console.log(statsChildren);

		for (let i = 2; i < statsChildren.length - 2; i++) {
			statsChildren[i].classList.toggle('_active')
		}
		e.target.classList.toggle('_active');
		pilotItem.classList.toggle('_active');
		spoilerOnOff(stats, e.target);
	}


	if (e.target.closest('._button-spoiler')) {			//если нажат спойлер, делам spoilerOn и анимация спойлера
		const parentElement = e.target.parentNode;

		const statsToOpen = e.target.nextElementSibling;
		const allStats = statsToOpen.querySelectorAll('._stat-item');
		const bestTimes = parentElement.querySelectorAll('.pilots__best-lap-time-value');
		const bestConsecutives = parentElement.querySelectorAll('.pilots__best-consecutives-time-value');

		if (CONSOLE_DEBUG) console.log('STAT', statsToOpen);

		let mainTime;
		const firstTime = allStats[0];
		const firstTimePosition = firstTime.offsetTop;
		let mainTimePosition;

		if (statsToOpen.classList.contains('pilots__best-lap-items')) {
			mainTime = bestTimes[0]
			mainTimePosition = mainTime.offsetTop;

		} else if (statsToOpen.classList.contains('pilots__best-consecutives-items')) {
			mainTime = bestConsecutives[0]
			mainTimePosition = mainTime.offsetTop;
		}

		if (statsToOpen.classList.contains('_active')) {
			mainTime.style.top = null;
		} else {
			if (CONSOLE_DEBUG) console.log(mainTime);

			if (CONSOLE_DEBUG) console.log('top', firstTimePosition - mainTimePosition + 10 + 5);

			mainTime.style.top = `${firstTimePosition - mainTimePosition + 10 + 5}px`
		}

		spoilerButtonAnimation(e.target);
		spoilerOnOff(statsToOpen, e.target);
		const statsTittle = statsToOpen.querySelector('.stats-tittles');
		statsTittle.classList.toggle('_active');
		allStats.forEach((stat, index) => {
			if (index != allStats.length - 1) {
				stat.classList.toggle('_active')
			}
		})
	}


	if (e.target.closest('.pilots__all-laps-button')) {			//если нажата все круги
		const parent = e.target.closest('.pilots__item');
		const nameElement = parent.querySelector('.pilots__pilot-name')
		const name = nameElement.innerHTML;			//ищем имя

		const tabWrapper = document.querySelector('.tabs-wrapper')
		tabWrapper.after(writeAllLapsHTML(name));			//добавляем HTML все круги

		const allLapsElement = document.querySelector('.all-laps')
		const exitButton = document.querySelector('.all-laps__exit-button')
		const allLapsArea = document.querySelector('.all-laps__laps-area');
		const allLapsLaps = document.querySelector('.all-laps__laps');
		const allLapsLap = document.querySelectorAll('.all-laps__lap');
		const pseudoLap = document.querySelector('.all-laps__pseudo-lap')
		const plusBtn = document.querySelector('.all-laps__plus');
		const minusBtn = document.querySelector('.all-laps__minus');
		const slider = document.querySelector('.all-laps__slider');

		//Здесь считаем начальную ширину графика, чтобы влез в контейнер.
		//величину области показа, минус псевдо круг и финальный круг и падинги делим на количество кругов
		//получаем ширину одног круга для Grid
		allLapsLaps.style.gridTemplateColumns = `7px repeat(${allLapsLap.length - 1},${((allLapsArea.offsetWidth - pseudoLap.offsetWidth - allLapsLap[allLapsLap.length - 1].offsetWidth - (parseInt(getComputedStyle(allLapsArea).paddingLeft) * 2) - 10) / (allLapsLap.length - 1))}px)7px`

		setTimeout(() => {			//небольшая задержка для подстраховки, чтоб отрисовался html, а потом показывать
			modalOnOff(allLapsElement, true)			//Показываем контейнеры
			allLapsShow(allLapsElement, e.target, name)
		}, 10);

		minusBtn.classList.add('_no-event')			//Запрещаем кнопку МИНУС, так как это самый маленький масштаб

		plusBtn.addEventListener('click', () => allLapsGraphScale('plus'));
		minusBtn.addEventListener('click', () => allLapsGraphScale('minus'));
		slider.addEventListener('input', () => allLapsGraphChoosing(name, '_active'));

		allLapsArea.addEventListener('scroll', function () {			//при скролле двигаются цифры... сомнительно
			const averageLine = document.querySelector('.all-laps__average-line')
			const maxLine = document.querySelector('.all-laps__max-line')
			const averageValue = averageLine.querySelector('span')
			const maxValue = maxLine.querySelector('span')
			averageValue.style.transform = `translate(${allLapsArea.scrollLeft}px, 0)`
			maxValue.style.transform = `translate(${allLapsArea.scrollLeft}px, 0)`
		})



		allLapsArea.addEventListener('click', function (e) {			//клик по графику
			const laps = document.querySelectorAll('.all-laps__lap');
			if ((e.target.closest('.all-laps__lap-graph')) || (e.target.closest('.all-laps__lap-graph-obj'))) {
				const currentLap = e.target.closest('.all-laps__lap');
				let currentIndex;
				laps.forEach((element, index) => {
					if (element == currentLap) {
						currentIndex = index;
						return
					}
				})
				slider.value = currentIndex;
				allLapsGraphChoosing(name, '_active');
			}
		})

		allLapsArea.addEventListener('touchstart', function (e) {			//старт перетаскивания ползунка
			const currentLap = e.target.closest('.all-laps__lap');
			if (currentLap.classList.contains('_choosed')) {
				currentLap.classList.add('_hold')
				const allLapsAreaHeight = allLapsArea.offsetHeight;
				const allLapsAreaHeightScroll = allLapsArea.clientHeight;
				allLapsArea.style.paddingBottom = `${allLapsAreaHeight - allLapsAreaHeightScroll}px`
				allLapsArea.classList.add('_lock');
				graphTouchFlag = true;
			}
		})

		allLapsArea.addEventListener('touchend', function (e) {			//отпустили ползунок
			const allLaps = document.querySelectorAll('.all-laps__lap')
			allLaps.forEach(element => {
				element.classList.remove('_choosed');
				element.classList.remove('_hold');

				if ((element.classList.contains('_active')) || element.classList.contains('_active-permanent')) {
					element.classList.add('_choosed');
				}
			})
			allLapsArea.classList.remove('_lock');
			allLapsArea.style.paddingBottom = null;
			graphTouchFlag = false;
		})

		allLapsArea.addEventListener('touchmove', function (e) {					//тащим ползунок	
			const allLapsAreaPosition = allLapsArea.offsetTop;
			const allLapsAreaHalfHeight = allLapsArea.offsetHeight / 2;
			const elem = document.elementFromPoint(e.touches[0].clientX, (allLapsAreaPosition + allLapsAreaHalfHeight));
			if (graphTouchFlag) {
				if (CONSOLE_DEBUG) console.log('ELEM', elem);

				const laps = document.querySelectorAll('.all-laps__lap');
				const currentLap = elem.closest('.all-laps__lap');
				let currentIndex;
				laps.forEach((element, index) => {
					if (element == currentLap) {
						currentIndex = index;
						return
					}
				})
				slider.value = currentIndex;
				allLapsGraphChoosing(name, '_active-permanent');
			}
		})

		exitButton.addEventListener('click', function () {			//Нажимае на крест - выходим
			modalOnOff(allLapsElement, false);
			setTimeout(() => {
				allLapsElement.remove();
			}, 500);
		})
	}


	if (e.target.closest('._button-time')) {			// Нажатие кнопки времени, готовимся отрисовать inRound

		const parent = e.target.closest('.pilots__item');			//Собираем  информацию о раунде
		const nameElement = parent.querySelector('.pilots__pilot-name')
		const name = nameElement.innerHTML;

		const heat = getHeat(name);


		let lapData;			//выбраный круг
		let otherLapData;			//круги в раунде выбранного

		//Проверяем, круг или подряд
		if (e.target.classList.contains('pilots__best-lap-time-value')) {

			lapData = getLapData(e.target.innerHTML, 'lap', name, heat, 'current');			//получаем выбранный кргу 
			if (CONSOLE_DEBUG) console.log('LAP DATA', e.target.innerHTML);

			otherLapData = getLapData(e.target.innerHTML, 'lap', name, heat, 'other');			//получаем отсальные круги раунда

			if (CONSOLE_DEBUG) console.log('G E T L A P', lapData);
			if (CONSOLE_DEBUG) console.log('G E T O T H E R', otherLapData);

		}

		//Проверяем, круг или подряд
		if (e.target.classList.contains('pilots__best-consecutives-time-value')) {

			lapData = getLapData(e.target.innerHTML, 'consecutive', name, heat, 'current');		//получаем выбранные круги подряд
			otherLapData = getLapData(e.target.innerHTML, 'consecutive', name, heat, 'other');			//получаем остальные круги раунда

			if (CONSOLE_DEBUG) console.log('G E T C O N S', lapData);
			if (CONSOLE_DEBUG) console.log('G E T O T H E R', otherLapData);

		}
		if (CONSOLE_DEBUG) console.log('NAME BEFORE INROUND', lapData);

		buttons.element.after(writeInRoundHTML(lapData, otherLapData, name));			//Отрисовываем inRound

		const inRoundElement = document.querySelector('.in-round');

		setTimeout(() => {			// таймаут 10мс, чтобы HTML успел отрисоваться, а потом пошла анимация появления
			modalOnOff(inRoundElement, true);
			inRoundShow(inRoundElement, e.target);
		}, 10)

		const exitButton = inRoundElement.querySelector('._button-exit');
		const inRoundArea = inRoundElement.querySelector('.in-round__round-area-laps')

		inRoundArea.addEventListener('click', function (e) {				//Нажимае на круг - показывается время
			if (e.target.closest('.in-round__lap-column')) {
				const column = e.target;
				const lap = e.target.parentNode;
				const lapNode = lap.nextElementSibling;

				lapNodeShow(lapNode, column, 3000)
			}
		})

		exitButton.addEventListener('click', function () {			//Нажимае на крест - выходим
			modalOnOff(inRoundElement, false);
			setTimeout(() => {
				inRoundElement.remove();
			}, 500);
		})


		const addButton = document.querySelector('.in-round__to-round-button')

		addButton.addEventListener('click', function () {
			fromInRoundToRoundAction(addButton);
		});

	}


	if (e.target.classList.contains('label__span')) {
		const labelSpan = e.target;
		const labelElement = e.target.parentNode;
		const InputElement = labelElement.nextElementSibling;

		labelElement.classList.toggle('_active');
		InputElement.checked = !InputElement.checked;
		if (CONSOLE_DEBUG) console.log('labelSpan', labelSpan);
		if (CONSOLE_DEBUG) console.log('labelElement', labelElement);
		if (CONSOLE_DEBUG) console.log('InputElement', InputElement.name);
		if (CONSOLE_DEBUG) console.log('InputElementCheck', InputElement.checked);

		const pilotsVsLabels = document.querySelectorAll('.pilots-vs-form-input__label');
		const pilotsVsInputs = document.querySelectorAll('.pilots-vs-form-input');

		pilotsVsInputs.forEach((value, key) => {
			if ((pilotsVsInputs[key].checked) && (pilotsVsInputs[key].name != pilotsVsDuel[0])) {
				pilotsVsDuel.push(value.name);
			} else if ((!pilotsVsInputs[key].checked) && (pilotsVsInputs[key].name == InputElement.name)) {
				pilotsVsDuel = [];
			}

		})


		if (pilotsVsDuel.length == 2) {
			console.log(pilotsVsDuel[0]);
			console.log(pilotsVsDuel[1]);

			console.log('pilotsVsDuel[0], pilotsVsDuel[1]', pilotsVsDuel[0], pilotsVsDuel[1]);

			pilotsVsActions(pilotsVsDuel[0], pilotsVsDuel[1])

			setTimeout(() => {

				pilotsVsLabels.forEach(label => {
					label.classList.remove('_active')
				})
				pilotsVsInputs.forEach((value, key) => {
					pilotsVsInputs[key].checked = false;
					pilotsVsDuel = []
				})

			}, 500);

		}






	}

	// const pilotsVsInputs = document.querySelectorAll('.pilots-vs-form-input');
	// const pilotsVsLabels = document.querySelectorAll('.pilots-vs-form-input__label');
	// pilotsVsLabels.forEach(label => {
	// 	const labelSpan = label.querySelector('span')
	// 	labelSpan.addEventListener('click', function () {
	// 		label.classList.toggle('_active')
	// 	})
	// })

}


function fromInRoundToRoundAction(buttonPressed) {

	// const tittleName = document.querySelector('.in-round__tittle-name')
	// const tittleRound = document.querySelector('.in-round__tittle-round')
	// const nameText = tittleName.firstElementChild.innerHTML;
	// const roundText = tittleRound.firstElementChild.innerHTML;

	// const heatNum = getHeat(nameText)
	// const roundNum = getNumFromText(roundText)

	// if(CONSOLE_DEBUG)console.log('tittleName', heatNum);
	// if(CONSOLE_DEBUG)console.log('tittleRound', roundNum);

	const heatNumElement = document.querySelector('.in-round__heatNum')
	const roundNumElement = document.querySelector('.in-round__roundNum')

	if (CONSOLE_DEBUG) console.log('VALLLLLLLLUW-123123-1-23-12-312', heatNumElement.getAttribute('value'));
	const roundNum = roundNumElement.getAttribute('value')
	const heatNum = heatNumElement.getAttribute('value')

	goToRoundAction(roundNum, heatNum, buttonPressed)


	//Если надо убрать

	// setTimeout(() => {
	// 	const inRoundElement = document.querySelector('.in-round')
	// 	modalOnOff(inRoundElement, false);
	// 	setTimeout(() => {
	// 		inRoundElement.remove();
	// 	}, 50);
	// }, 500);


}

function leaderboardTabAction(e) {
	const itemsElement = document.querySelector('.leaderboard__items');
	if (e.target.closest('.leaderboard__lap-button')) {

		tabSwitch(tabsLeader[0].name, tabsLeader);

		tabHeightChange(tabsLeader[0].element, itemsElement, false)

		// setTimeout(() => {
		// 	const tabWidth = tabsLeader[0].element.offsetHeight;
		// 	const itemElementWidth = itemsElement.offsetHeight;

		// 	if (tabWidth > itemElementWidth) itemsElement.style.height = `${ tabWidth + 20 } px`

		// }, getTransitionDurationTime(tabsLeader[0].element));

	}
	if (e.target.closest('.leaderboard__consecutive-button')) {
		tabSwitch(tabsLeader[1].name, tabsLeader);

		tabHeightChange(tabsLeader[1].element, itemsElement, false)

		// setTimeout(() => {
		// 	const tabWidth = tabsLeader[1].element.offsetHeight;
		// 	const itemElementWidth = itemsElement.offsetHeight;

		// 	if (tabWidth > itemElementWidth) itemsElement.style.height = `${ tabWidth + 20 } px`

		// }, getTransitionDurationTime(tabsLeader[1].element));

	}
	if (e.target.closest('.leaderboard__count-button')) {
		tabSwitch(tabsLeader[2].name, tabsLeader);

		tabHeightChange(tabsLeader[2].element, itemsElement, false)

		// setTimeout(() => {
		// 	const tabWidth = tabsLeader[2].element.offsetHeight;
		// 	const itemElementWidth = itemsElement.offsetHeight;

		// 	if (tabWidth > itemElementWidth) itemsElement.style.height = `${ tabWidth + 20 } px`
		// }, getTransitionDurationTime(tabsLeader[2].element));

	}
	if (e.target.closest('.leaderboard__average-button')) {
		tabSwitch(tabsLeader[3].name, tabsLeader);


		tabHeightChange(tabsLeader[3].element, itemsElement, false)

		// setTimeout(() => {
		// 	const tabWidth = tabsLeader[3].element.offsetHeight;
		// 	const itemElementWidth = itemsElement.offsetHeight;

		// 	if (tabWidth > itemElementWidth) itemsElement.style.height = `${ tabWidth + 20 } px`

		// }, getTransitionDurationTime(tabsLeader[3].element));
	}

	if (e.target.closest('._button-time')) {
		const parent = e.target.parentNode;			//Собираем  информацию о раунде
		const nameElement = parent.firstElementChild;
		const name = nameElement.children[1].innerHTML;
		// if(CONSOLE_DEBUG)console.log(name);

		const heat = getHeat(name);

		let lapData;			//выбраный круг
		let otherLapData;			//круги в раунде выбранного

		//Проверяем, круг или подряд
		if (e.target.classList.contains('leaderboard-lap__time')) {

			lapData = getLapData(e.target.innerHTML, 'lap', name, heat, 'current');			//получаем выбранный кргу 
			if (CONSOLE_DEBUG) console.log('LAP DATA', e.target.innerHTML);

			otherLapData = getLapData(e.target.innerHTML, 'lap', name, heat, 'other');			//получаем отсальные круги раунда

			if (CONSOLE_DEBUG) console.log('G E T L A P', lapData);
			if (CONSOLE_DEBUG) console.log('G E T O T H E R', otherLapData);

		}

		//Проверяем, круг или подряд
		if (e.target.classList.contains('leaderboard-consecutive__time')) {

			lapData = getLapData(e.target.innerHTML, 'consecutive', name, heat, 'current');		//получаем выбранные круги подряд
			otherLapData = getLapData(e.target.innerHTML, 'consecutive', name, heat, 'other');			//получаем остальные круги раунда

			if (CONSOLE_DEBUG) console.log('G E T C O N S', lapData);
			if (CONSOLE_DEBUG) console.log('G E T O T H E R', otherLapData);

		}

		if (CONSOLE_DEBUG) console.log('NAME BEFORE INROUND', lapData);

		buttons.element.after(writeInRoundHTML(lapData, otherLapData, name));			//Отрисовываем inRound

		const inRoundElement = document.querySelector('.in-round');

		setTimeout(() => {			// таймаут 10мс, чтобы HTML успел отрисоваться, а потом пошла анимация появления
			modalOnOff(inRoundElement, true);
			inRoundShow(inRoundElement, e.target);
		}, 10)

		const exitButton = inRoundElement.querySelector('._button-exit');
		const inRoundArea = inRoundElement.querySelector('.in-round__round-area-laps')

		inRoundArea.addEventListener('click', function (e) {				//Нажимае на круг - показывается время
			if (e.target.closest('.in-round__lap-column')) {
				const column = e.target;
				const lap = e.target.parentNode;
				const lapNode = lap.nextElementSibling;
				lapNodeShow(lapNode, column, 3000)
			}
		})


		exitButton.addEventListener('click', function () {			//Нажимае на крест - выходим
			modalOnOff(inRoundElement, false);
			setTimeout(() => {
				inRoundElement.remove();
			}, 500);
		})

		const addButton = document.querySelector('.in-round__to-round-button')

		addButton.addEventListener('click', function () {
			fromInRoundToRoundAction(addButton);
		});


	}
}

function goToRoundAction(round, heat, buttonPressed) {

	const tabWrap = document.querySelector('.tabs-wrapper');
	currentRoundInfo = getRound(+round, +heat)
	tabWrap.after(writeRound(+round, +heat));
	const roundElement = document.querySelector('.round')
	const exitButton = document.querySelector('.round__exit-button')

	setTimeout(() => {
		modalOnOff(roundElement, true)
		roundShow(roundElement, buttonPressed)
	}, 10);
	const pilotsElement = document.querySelector('.round__graph-area-pilots')
	const pilotsPadding = parseInt(getComputedStyle(pilotsElement).paddingRight);
	const scrollWidth = pilotsElement.offsetWidth - pilotsElement.clientWidth

	pilotsElement.style.paddingRight = `${pilotsPadding - scrollWidth}px`



	const pilots = document.querySelectorAll('.round__graph-area-pilot');


	pilots.forEach((pilotElement, pilotIndex) => {
		const pilotName = pilotElement.querySelector('.round__graph-area-name').innerHTML;
		const pilotLaps = pilotElement.querySelectorAll('.round__graph-area-lap');
		intervals[pilotName] = [];
		lapState[pilotName] = [];
		pilotsIntervalCount[pilotName] = [];
		pilotsName.push(pilotName);
		if (CONSOLE_DEBUG) console.log(pilotName);
		if (CONSOLE_DEBUG) console.log(pilotLaps);
		let pilotLapsArr = [];

		pilotLaps.forEach((element, index) => {
			pilotLapsArr.push(element);
			intervals[pilotName].push(null);
			if (index == 0) {
				lapState[pilotName].push(false);
			} else {
				lapState[pilotName].push(false);
			}

			if (index == pilotLaps.length - 1) {
				lapsByPilot[pilotName] = pilotLapsArr;
			}
		})


		currentRoundInfo.forEach((element, index) => {
			if (element[element.length - 1] == pilotName) {
				const lapQuantity = element.length - 2;
				const times = [];
				for (let i = 0; i <= lapQuantity; i++) {
					if (i == 0) {
						const holeFloat = lapTimeConverter(element[i], 'float');
						const holeStep = +holeFloat;
						holeShots[pilotName] = {};
						holeShots[pilotName].timeout = +holeStep.toFixed(0) * 100;
						holeShots[pilotName].state = false;
						holeShots[pilotName].state = null;

					} else {
						const lapTimeFloat = lapTimeConverter(element[i].lapTime, 'float');
						const timeStep = +lapTimeFloat;
						if (CONSOLE_DEBUG) console.log('LAP TIMEEEEEEE', lapTimeFloat);

						times.push(+timeStep.toFixed(0))
						pilotsIntervalCount[pilotName].push(1)
					}
				}
				lapTimeStep[pilotName] = times;
			}
		})

	})

	const slider = document.querySelector('.round__slider')
	slider.oninput = () => speedChange(slider);

	speedChange(slider)

	tabsRound = [
		{ name: 'view', opened: false, element: document.querySelector('.round__view'), },
		{ name: 'statistic', opened: false, element: document.querySelector('.round__statistic'), },
	]

	buttons.rounds = document.querySelector('.buttons__rounds');
	buttons.statistic = document.querySelector('.round__statistic-button');
	buttons.view = document.querySelector('.round__view-button');



	const roundButtons = document.querySelector('.round__buttons')
	const roundPlayButton = document.querySelector('.round__play-button');
	const paragraph = roundPlayButton.firstElementChild;

	roundButtons.addEventListener('click', function (e) {
		const viewButton = roundButtons.querySelector('.round__view-button');
		const statisticButton = roundButtons.querySelector('.round__statistic-button');
		if (e.target == viewButton) {
			tabSwitch(tabsRound[0].name, tabsRound);
			// if (roundPlayState != 'end') {
			// 	textChange(paragraph, `< p > Пауза</ > `, 150);
			// 	startRound();
			// 	roundPlayState = 'play';
			// }
		}
		if (e.target == statisticButton) {
			tabSwitch(tabsRound[1].name, tabsRound)
			// if (roundPlayState != 'end') {
			// 	textChange(paragraph, `< p > Старт</ > `, 150);
			// 	pauseRound();
			// 	roundPlayState = 'pause';
			// }
		}
	})

	roundPlayButton.addEventListener('click', function (e) {
		const paragraph = roundPlayButton.firstElementChild;
		if (roundPlayState == 'play') {
			textChange(paragraph, `<p>${textStrings.roundsTab.play}</p>`, 150);
			pauseRound();
			roundPlayState = 'pause';
		} else if (roundPlayState == 'pause') {
			textChange(paragraph, `<p>${textStrings.roundsTab.pause}</p>`, 150);
			startRound();
			roundPlayState = 'play';

		} else if (roundPlayState == 'end') {
			for (nameForLap in lapsByPilot) {
				const laps = lapsByPilot[nameForLap]
				laps.forEach(lap => {
					lap.style.transition = `all 0.8s ease`;
					lap.style.width = `0%`
					lap.classList.remove('_akcent')
					setTimeout(() => {
						lap.style.transition = null;
					}, 800);
				})
			}

			const roundPlayButton = document.querySelector('.round__play-button');
			const slider = document.querySelector('.round__slider')
			roundPlayButton.classList.add('_no-event');
			slider.classList.add('_no-event');

			setTimeout(() => {
				textChange(paragraph, `<p>${textStrings.roundsTab.pause}</p>`, 250);
			}, 300);
			setTimeout(() => {
				startRound();
			}, 800);
			roundPlayState = 'play'
		}
	})

	exitButton.addEventListener('click', function () {			//Нажимае на крест - выходим
		pauseRound();
		modalOnOff(roundElement, false);
		setTimeout(() => {
			clearInterval(intervalButtonsAccept)
			for (holeNames in holeShots) {
				const holeObj = holeShots[holeNames];
				clearInterval(holeObj.interval)
				if (CONSOLE_DEBUG) console.log('holeObj', holeObj);
			}

			lastHoleShot = false;
			tabsRound = []
			pilotsName = [];
			lapsByPilot = {};
			intervals = {};
			lapTimeStep = {};
			lapState = {};
			holeShots = {};
			pilotsIntervalCount = {};
			currentRoundInfo = null;
			roundPlayState = 'pause';
		}, 400);

		setTimeout(() => {
			roundElement.remove();
		}, 500);
	})


	tabSwitch(tabsRound[0].name, tabsRound);
	roundStatsStrokeWidthChange();
}

let tabsRound = []
let pilotsName = [];
let lapsByPilot = {};
let intervals = {};
let lapTimeStep = {};
let lapState = {};
let holeShots = {};
let pilotsIntervalCount = {};
let currentRoundInfo = null;
let roundSpeed = 1.5;
let roundPlayState = 'pause';
let intervalButtonsAccept;
const speedNames = {
	'3': 0.3,
	'2': 0.5,
	'1.1': 1,
	// '1': 2.5,
	'1': 2,
};
const speedValues = [3, 2, 1.1, 1];


function getNumFromText(text) {
	let num;
	const textArr = [...text]
	const textNums = []
	textArr.forEach((el, index) => {
		if (el == el.match(/\d+/g)) {
			textNums.push(el)
		}
		if (index == textArr.length - 1) {
			num = textNums.join('')
		}
	})
	return num;
}


function roundsTabAction(e) {
	const itemsElement = document.querySelector('.rounds__items');

	const heatTabs = getTabsRounds();

	heatTabs.forEach((heat, index) => {
		if (e.target.closest(`.rounds__${heat.name} `)) {
			if (CONSOLE_DEBUG) console.log(`${textStrings.roundsTab.heat} ${heat.name} `);
			tabSwitch(tabsRounds[index].name, tabsRounds)
			tabHeightChange(tabsRounds[index].element, itemsElement, false)
		}
	})

	if (e.target.closest('.rounds__item')) {
		// let roundNum;
		// let heatNum;

		const roundText = e.target.innerHTML;
		let heatText;
		heatTabs.forEach(heat => {
			if (heat.element.classList.contains('_active')) {
				// const tabName = heat.name;
				// heatText = buttons[tabName].innerHTML;
				heatText = heat.name

			}
		})


		const roundNum = getNumFromText(roundText)
		const heatNum = getNumFromText(heatText);

		// const heatArr = [...heatText]
		// const heatNums = []
		// heatArr.forEach((el, index) => {
		// 	if (el == el.match(/\d+/g)) {
		// 		heatNums.push(el)
		// 	}
		// 	if (index == heatArr.length - 1) {
		// 		heatNum = heatNums.join('')
		// 	}
		// })


		if (CONSOLE_DEBUG) console.log(heatNum);
		if (CONSOLE_DEBUG) console.log(roundNum);


		goToRoundAction(roundNum, heatNum, e.target)

	}

}



buttons.pilots.addEventListener('click', function () {
	tabSwitch(tabsMain[0].name, tabsMain);
})



function tabSwitch(toOpen, tabss) {			//функция смены вкладок
	let closingtime = 0;			//время смены вкладок - перед открытием первой ровна нулю

	const buttonsWrapper = document.querySelectorAll('._buttons-wrapper');
	buttonsWrapper.forEach(btn => {			//запрещаем нажатия кнопок, чтобы не открыть 2 вкладки
		btn.classList.add('_no-event')
	})

	tabss.forEach(tab => {
		if (buttons[tab.name].classList.contains('_ready')) {
			if (CONSOLE_DEBUG) console.log('TRUUUUUE');
			buttons[tab.name].classList.remove('_ready')
		}
	})

	tabss.forEach(tab => {
		if (tab.opened) {			//ищем открытую вкладку, чтобы закрыть
			const tabItems = tab.element.firstElementChild;
			tab.element.classList.remove('_active')
			tabItems.classList.remove('_active')

			closingtime = (getTransitionDurationTime(tab.element) / 1.5);			//берем время на открытие следующей
			tab.opened = false;			//закрыта
			buttons[tab.name].classList.remove('_active', '_no-event');			//отжимаем кнопку вкладки и позволяем нажиматься

			if (CONSOLE_DEBUG) console.log('T A B C L O S I N G', tab.element);
		}
	})

	tabss.forEach(tab => {
		if (toOpen == tab.name) {			//ищем вкладку, которую открыть
			buttons[tab.name].classList.add('_active', '_no-event');			//сразу красим кнопку и запрещаем нажиматься
			const tabItems = tab.element.firstElementChild;
			setTimeout(() => {
				tab.element.classList.add('_active');
				tabItems.classList.add('_active');
				tab.opened = true;

				buttonsWrapper.forEach(btn => {			//возвращаем кнопки
					btn.classList.remove('_no-event')
				})
				if (CONSOLE_DEBUG) console.log('T A B O P E N', tab);
			}, closingtime);
		}
	})

	if (toOpen == 'closeAll') {
		setTimeout(() => {
			buttonsWrapper.forEach(btn => {			//возвращаем кнопки
				btn.classList.remove('_no-event')
			})
		}, 500);
	}
}


function tabHeightChange(tabElement, tabItemsElement, firstState) {
	setTimeout(() => {
		const tabWidth = tabElement.offsetHeight;
		const itemElementWidth = tabItemsElement.offsetHeight;

		if (tabWidth > itemElementWidth || firstState) tabItemsElement.style.height = `${tabWidth + 20}px`

	}, getTransitionDurationTime(tabElement));

}

buttons.leaderboard.addEventListener('click', function () {

	tabSwitch(tabsMain[1].name, tabsMain);

})



buttons.rounds.addEventListener('click', function () {
	tabSwitch(tabsMain[2].name, tabsMain);
})




function writePilotsHTML() {		// Рисуем страницу пилотов
	const pilots = {
		pilots: document.createElement('div'),
		container: document.createElement('div'),
		items: document.createElement('div'),
	}
	pilots.pilots.classList.add('pilots', 'tab');
	pilots.container.classList.add('pilots__container', '_container', 'tab-items');
	pilots.items.classList.add('pilots__items');

	pilots.pilots.append(pilots.container);
	pilots.container.append(pilots.items);

	const pilotsData = getPilotsStats();			//получаем список пилотов


	pilotsData.sort((a, b) => a.name > b.name ? 1 : -1);			//сортируем по алфавиту


	for (let pilot of pilotsData) {			//рисуем элемент каждого пилота
		if (pilot.laps) {


			const lapsToShow = 5;			//Сколько кругов показывать;
			const unableRound = '-'
			const unableDate = '--:--:--'
			const unableTime = '-:--.---'

			const item = {
				container: document.createElement('div'),
				pilotName: document.createElement('button'),
				stats: document.createElement('div'),

				bestlap: document.createElement('div'),
				bestLapText: document.createElement('div'),
				bestLapButton: document.createElement('button'),
				bestLapMainTime: document.createElement('button'),

				bestLapItems: document.createElement('div'),

				bestLapTittles: document.createElement('div'),
				bestLapTittlesRound: document.createElement('div'),
				bestLapTittlesStart: document.createElement('div'),
				bestLapTittlesEnd: document.createElement('div'),
				bestLapTittlesTime: document.createElement('div'),

				bestLapItem: document.createElement('div'),
				bestLapItemRound: document.createElement('div'),
				bestLapItemStart: document.createElement('div'),
				bestLapItemEnd: document.createElement('div'),
				bestLapItemTime: document.createElement('button'),



				bestConsecutives: document.createElement('div'),
				bestConsecutivesText: document.createElement('div'),
				bestConsecutivesButton: document.createElement('button'),
				bestConsecutivesMainTime: document.createElement('button'),
				bestConsecutivesItems: document.createElement('div'),


				bestConsecutivesTittles: document.createElement('div'),
				bestConsecutivesTittlesRound: document.createElement('div'),
				bestConsecutivesTittlesStart: document.createElement('div'),
				bestConsecutivesTittlesEnd: document.createElement('div'),
				bestConsecutivesTittlesTime: document.createElement('div'),

				bestConsecutivesItem: document.createElement('div'),
				bestConsecutivesItemRound: document.createElement('div'),
				bestConsecutivesItemStart: document.createElement('div'),
				bestConsecutivesItemEnd: document.createElement('div'),
				bestConsecutivesItemTime: document.createElement('button'),

				quantityLap: document.createElement('div'),
				quantityLapText: document.createElement('div'),
				quantityLapValue: document.createElement('div'),
				quantityStarts: document.createElement('div'),
				quantityStartsText: document.createElement('div'),
				quantityStartsValue: document.createElement('div'),
				averageLap: document.createElement('div'),
				averageLapText: document.createElement('div'),
				averageLapValue: document.createElement('div'),
				// lap: document.createElement('div'),
				// lapText: document.createElement('div'),
				// lapValue: document.createElement('div'),
				// consecutive: document.createElement('div'),
				// consecutiveText: document.createElement('div'),
				// consecutiveValue: document.createElement('div'),



				allLapsButton: document.createElement('button'),

			}
			item.container.classList.add('pilots__item');
			item.pilotName.classList.add('pilots__pilot-name', '_button');
			item.stats.classList.add('pilots__stats');


			item.bestlap.classList.add('pilots__best-lap');
			item.bestLapText.classList.add('pilots__best-lap-text', '_stat-text');
			item.bestLapButton.classList.add('pilots__best-lap-button', '_button-spoiler');
			item.bestLapMainTime.classList.add('pilots__best-lap-time-value', '_button-time', '_main-time');

			item.bestLapItems.classList.add('pilots__best-lap-items');

			item.bestLapTittles.classList.add('pilots__best-lap-stats-tittles', 'stats-tittles');
			item.bestLapTittlesRound.classList.add('pilots__best-lap-round-text', '_stat-text')
			item.bestLapTittlesStart.classList.add('pilots__best-lap-start-text', '_stat-text')
			item.bestLapTittlesEnd.classList.add('pilots__best-lap-end-text', '_stat-text')
			item.bestLapTittlesTime.classList.add('pilots__best-lap-time-text', '_stat-text')

			item.bestLapItem.classList.add('pilots__best-lap-item', '_stat-item')
			item.bestLapItemRound.classList.add('pilots__best-lap-round-value', '_stat-value')
			item.bestLapItemStart.classList.add('pilots__best-lap-start-value', '_stat-value')
			item.bestLapItemEnd.classList.add('pilots__best-lap-end-value', '_stat-value')
			item.bestLapItemTime.classList.add('pilots__best-lap-time-value', '_button-time')


			item.bestConsecutives.classList.add('pilots__best-consecutives');
			item.bestConsecutivesText.classList.add('pilots__best-consecutives-text', '_stat-text');
			item.bestConsecutivesButton.classList.add('pilots__best-consecutives-button', '_button-spoiler');
			item.bestConsecutivesMainTime.classList.add('pilots__best-consecutives-time-value', '_button-time', '_main-time');
			item.bestConsecutivesItems.classList.add('pilots__best-consecutives-items');

			item.bestConsecutivesTittles.classList.add('pilots__best-consecutives-stats-tittles', 'stats-tittles');
			item.bestConsecutivesTittlesRound.classList.add('pilots__best-consecutives-round-text', '_stat-text')
			item.bestConsecutivesTittlesStart.classList.add('pilots__best-consecutives-start-text', '_stat-text')
			item.bestConsecutivesTittlesEnd.classList.add('pilots__best-consecutives-end-text', '_stat-text')
			item.bestConsecutivesTittlesTime.classList.add('pilots__best-consecutives-time-text', '_stat-text')



			item.bestConsecutivesItem.classList.add('pilots__best-consecutives-item', '_stat-item')
			item.bestConsecutivesItemRound.classList.add('pilots__best-consecutives-round-value', '_stat-value')
			item.bestConsecutivesItemStart.classList.add('pilots__best-consecutives-start-value', '_stat-value')
			item.bestConsecutivesItemEnd.classList.add('pilots__best-consecutives-end-value', '_stat-value')
			item.bestConsecutivesItemTime.classList.add('pilots__best-consecutives-time-value', '_button-time')


			item.quantityLap.classList.add('pilots__quantity-lap');
			item.quantityLapText.classList.add('pilots__quantity-lap-text', '_stat-text');
			item.quantityLapValue.classList.add('pilots__quantity-lap-value', '_stat-value');
			item.quantityStarts.classList.add('pilots__quantity-starts');
			item.quantityStartsText.classList.add('pilots__quantity-starts-text', '_stat-text');
			item.quantityStartsValue.classList.add('pilots__quantity-starts-value', '_stat-value');
			item.allLapsButton.classList.add('pilots__all-laps-button', '_button')
			item.averageLap.classList.add('pilots__average-lap');
			item.averageLapText.classList.add('pilots__average-lap-text', '_stat-text');
			item.averageLapValue.classList.add('pilots__average-lap-value', '_stat-value');

			// item.lap.classList.add('pilots__lap');
			// item.lapText.classList.add('pilots__lap-text', '_stat-text');
			// item.lapValue.classList.add('pilots__lap-value', '_stat-value');
			// item.consecutive.classList.add('pilots__consecutive');
			// item.consecutiveText.classList.add('pilots__consecutive-text', '_stat-text');
			// item.consecutiveValue.classList.add('pilots__consecutive-value', '_stat-value');


			item.pilotName.innerHTML = pilot.name;			//Имя пилота

			item.allLapsButton.innerHTML = textStrings.pilotsTab.allLaps;
			const lapsData = getLapsByName(pilot.name, pilot.heat, true);			//берем круги пилота

			item.bestLapText.innerHTML = textStrings.pilotsTab.bestLap;
			try {
				item.bestLapMainTime.innerHTML = lapsData[0].lapTime;

			} catch (error) {
				item.bestLapMainTime.innerHTML = unableTime;

			}
			item.bestLapButton.innerHTML = '<span></span>';			//кнопка спойлер


			item.bestLapTittlesRound.innerHTML = textStrings.pilotsTab.round;
			item.bestLapTittlesStart.innerHTML = textStrings.pilotsTab.start;
			item.bestLapTittlesEnd.innerHTML = textStrings.pilotsTab.end;
			item.bestLapTittlesTime.innerHTML = textStrings.pilotsTab.time;

			item.bestLapItems.append(item.bestLapTittles);
			item.bestLapTittles.append(item.bestLapTittlesRound, item.bestLapTittlesStart, item.bestLapTittlesEnd, item.bestLapTittlesTime)

			for (let i = 1; i <= lapsToShow; i++) {			//здесь рисуем круги под спойлером помимо основного
				const itemElement = item.bestLapItem.cloneNode(true);
				const roundElement = item.bestLapItemRound.cloneNode(true);
				const startElement = item.bestLapItemStart.cloneNode(true);
				const endElement = item.bestLapItemEnd.cloneNode(true);
				const timeElement = item.bestLapItemTime.cloneNode(true);

				try {
					roundElement.innerHTML = lapsData[i - 1].round;
					startElement.innerHTML = lapsData[i - 1].lapTimeStart;
					endElement.innerHTML = lapsData[i - 1].lapTimeEnd;
					timeElement.innerHTML = lapsData[i - 1].lapTime;

				} catch (err) {
					roundElement.innerHTML = unableRound
					startElement.innerHTML = unableDate
					endElement.innerHTML = unableDate
					timeElement.innerHTML = unableTime
					// if(CONSOLE_DEBUG)console.log(`У ${ pilot.name } нет лучшего круга номер ${ i } `);
					// if(CONSOLE_DEBUG)console.log(err);
				}
				itemElement.append(roundElement, startElement, endElement, timeElement);
				item.bestLapItems.append(itemElement);
			}

			const consecutivesData = getConsecutivesByName(pilot.name, pilot.heat, true);		//берем круги подряд пилота

			// if(CONSOLE_DEBUG)console.log(`consecutives от ${ pilot.name } `, consecutivesData);

			item.bestConsecutivesText.innerHTML = textStrings.pilotsTab.bestConsecutive;
			try {
				item.bestConsecutivesMainTime.innerHTML = consecutivesData[0].lapTime;
			} catch (error) {
				item.bestConsecutivesMainTime.innerHTML = unableTime;
			}
			item.bestConsecutivesButton.innerHTML = '<span></span>';

			item.bestConsecutivesTittlesRound.innerHTML = textStrings.pilotsTab.round;
			item.bestConsecutivesTittlesStart.innerHTML = textStrings.pilotsTab.start;
			item.bestConsecutivesTittlesEnd.innerHTML = textStrings.pilotsTab.end;
			item.bestConsecutivesTittlesTime.innerHTML = textStrings.pilotsTab.time;

			item.bestConsecutivesItems.append(item.bestConsecutivesTittles);
			item.bestConsecutivesTittles.append(item.bestConsecutivesTittlesRound, item.bestConsecutivesTittlesStart, item.bestConsecutivesTittlesEnd, item.bestConsecutivesTittlesTime)


			for (let i = 1; i <= lapsToShow; i++) {			//здесь рисуем круги подряд под спойлером помимо основного
				const itemElement = item.bestConsecutivesItem.cloneNode(true);
				const roundElement = item.bestConsecutivesItemRound.cloneNode(true);
				const startElement = item.bestConsecutivesItemStart.cloneNode(true);
				const endElement = item.bestConsecutivesItemEnd.cloneNode(true);
				const timeElement = item.bestConsecutivesItemTime.cloneNode(true);

				try {
					roundElement.innerHTML = consecutivesData[i - 1].round;
					startElement.innerHTML = consecutivesData[i - 1].lapTimeStart;
					endElement.innerHTML = consecutivesData[i - 1].lapTimeEnd;
					timeElement.innerHTML = consecutivesData[i - 1].lapTime;

				} catch (err) {
					roundElement.innerHTML = unableRound
					startElement.innerHTML = unableDate
					endElement.innerHTML = unableDate
					timeElement.innerHTML = unableTime
					// if(CONSOLE_DEBUG)console.log(`У ${ pilot.name } нет лучшего круга номер ${ i } `);
					// if(CONSOLE_DEBUG)console.log(err);
				}
				itemElement.append(roundElement, startElement, endElement, timeElement);
				item.bestConsecutivesItems.append(itemElement);
			}


			item.quantityLapText.innerHTML = textStrings.pilotsTab.totalLaps;
			item.quantityLapValue.innerHTML = pilot.laps;

			item.quantityStartsText.innerHTML = textStrings.pilotsTab.totalStarts;
			item.quantityStartsValue.innerHTML = pilot.starts;

			item.averageLapText.innerHTML = textStrings.pilotsTab.average;
			item.averageLapValue.innerHTML = pilot.averageLap;

			// item.lapText.innerHTML = 'Лучший круг';

			// item.consecutiveText.innerHTML = 'Лучшие 3 круга';

			// try {
			// 	item.lapValue.innerHTML = lapsData[0].lapTime;
			// } catch (error) {
			// 	item.lapValue.innerHTML = unableTime;
			// }

			// try {
			// 	item.consecutiveValue.innerHTML = consecutivesData[0].lapTime;
			// } catch (error) {
			// 	item.consecutiveValue.innerHTML = unableTime;
			// }

			const pilotsVsInput = document.createElement('input');
			const pilotsVsInputLabel = document.createElement('label');
			const pilotsVsInputContainer = document.createElement('div');

			pilotsVsInputContainer.classList.add('pilots-vs-form-input__container')

			pilotsVsInput.classList.add('pilots-vs-form-input')
			pilotsVsInput.setAttribute("form", "pilots-vs-form");
			pilotsVsInput.setAttribute("type", "checkbox");
			pilotsVsInput.setAttribute("name", `${pilot.name}`);

			pilotsVsInputLabel.classList.add('pilots-vs-form-input__label')
			pilotsVsInputLabel.setAttribute('for', `${pilot.name}`)
			pilotsVsInputLabel.innerHTML = `<p> ${textStrings.pilotsTab.vs}</p><span class="label__span"></span>`
			pilotsVsInputContainer.append(pilotsVsInputLabel, pilotsVsInput)




			pilots.items.append(item.container);			//Начинаем складывать HTML
			item.container.append(item.pilotName, item.stats);
			item.stats.append(item.bestlap, item.bestConsecutives, item.averageLap, item.quantityLap, item.quantityStarts, item.allLapsButton, pilotsVsInputContainer);
			item.bestlap.append(item.bestLapText, item.bestLapMainTime, item.bestLapButton, item.bestLapItems);
			item.bestConsecutives.append(item.bestConsecutivesText, item.bestConsecutivesMainTime, item.bestConsecutivesButton, item.bestConsecutivesItems);
			item.quantityLap.append(item.quantityLapText, item.quantityLapValue);
			item.quantityStarts.append(item.quantityStartsText, item.quantityStartsValue);
			item.averageLap.append(item.averageLapText, item.averageLapValue);
		}
	}

	// if(CONSOLE_DEBUG)console.log(pilots.pilots);

	return pilots.pilots;
}



function pilotsVsActions(nameForFunctions1, nameForFunctions2) {


	const html = writePilotsVs(nameForFunctions1, nameForFunctions2);
	const tabwrap = document.querySelector('.tabs-wrapper')
	tabwrap.after(html)
	setAkcentValues(akcentArr);

	const pilotsVsElement = document.querySelector('.pilots-vs')
	const pilotsVsPseudoLap = document.querySelector('.pilots-vs__pseudo-lap')
	const pilotsVsAllLapsArea = document.querySelector('.pilots-vs__laps-area');
	const pilotsVsAllLapsLaps = document.querySelector('.pilots-vs__laps');
	const pilotsVsAllLapsLap = document.querySelectorAll('.pilots-vs__lap');
	const pilotsVsExitBtn = document.querySelector('.pilots-vs__exit-button')
	buttons.pilotsVsAllLaps = document.querySelector('.pilots-vs__all-laps-button')
	buttons.pilotsVsStatistic = document.querySelector('.pilots-vs__statistic-button')
	const name1 = document.querySelector('.pilots-vs_name1')
	const name2 = document.querySelector('.pilots-vs_name2')

	pilotsVsAllLapsLaps.style.gridTemplateColumns = `7px repeat(${pilotsVsAllLapsLap.length - 1},${((pilotsVsAllLapsArea.offsetWidth - pilotsVsPseudoLap.offsetWidth - pilotsVsAllLapsLap[pilotsVsAllLapsLap.length - 1].offsetWidth - (parseInt(getComputedStyle(pilotsVsAllLapsArea).paddingLeft) * 2) - 10) / (pilotsVsAllLapsLap.length - 1))}px)7px`
	setTimeout(() => {			//небольшая задержка для подстраховки, чтоб отрисовался html, а потом показывать
		modalOnOff(pilotsVsElement, true)			//Показываем контейнеры
		pilotsVsShow(pilotsVsElement)
	}, 10);

	tabsPilotsVs = [
		{ name: 'pilotsVsAllLaps', opened: false, element: document.querySelector('.pilots-vs__all-laps-tab'), },
		{ name: 'pilotsVsStatistic', opened: false, element: document.querySelector('.pilots-vs__statistic-tab'), },
	]

	tabSwitch(tabsPilotsVs[0].name, tabsPilotsVs);
	name1.classList.add('_active')
	name2.classList.add('_active')


	buttons.pilotsVsAllLaps.addEventListener('click', () => {
		tabSwitch(tabsPilotsVs[0].name, tabsPilotsVs);
		name1.classList.add('_active')
		name2.classList.add('_active')
	})
	buttons.pilotsVsStatistic.addEventListener('click', () => {
		tabSwitch(tabsPilotsVs[1].name, tabsPilotsVs);
		name1.classList.remove('_active')
		name2.classList.remove('_active')
	})

	const otherLaps = document.querySelector('.pilots-vs__stat-stroke_best-lap-others');
	const otherCons = document.querySelector('.pilots-vs__stat-stroke_best-consecutive-others');
	const spoilerPilotsVs = document.querySelectorAll('.pilots-vs__spoiler-button');

	spoilerPilotsVs[0].addEventListener('click', () => {
		spoilerPilotsVs[0].classList.toggle('_active');
		spoilerOnOff(otherLaps, spoilerPilotsVs[0]);

	})
	spoilerPilotsVs[1].addEventListener('click', () => {
		spoilerPilotsVs[1].classList.toggle('_active');
		spoilerOnOff(otherCons, spoilerPilotsVs[1]);
	})

	pilotsVsGraphChoosing(nameForFunctions1, nameForFunctions2, '_active');


	const pilotsVsPlusBtn = document.querySelector('.pilots-vs__plus');
	const pilotsVsMinusBtn = document.querySelector('.pilots-vs__minus');
	const sliderPilotsVs = document.querySelector('.pilots-vs__slider');

	pilotsVsMinusBtn.classList.add('_no-event')


	pilotsVsPlusBtn.addEventListener('click', () => pilotsVsGraphScale('plus'));
	pilotsVsMinusBtn.addEventListener('click', () => pilotsVsGraphScale('minus'));
	sliderPilotsVs.addEventListener('input', () => pilotsVsGraphChoosing(nameForFunctions1, nameForFunctions2, '_active'));


	pilotsVsAllLapsArea.addEventListener('scroll', function () {			//при скролле двигаются цифры... сомнительно
		const averageLine = document.querySelector('.pilots-vs__average-line')
		const maxLine = document.querySelector('.pilots-vs__max-line')
		const averageValue = averageLine.querySelector('span')
		const maxValue = maxLine.querySelector('span')
		averageValue.style.transform = `translate(${pilotsVsAllLapsArea.scrollLeft}px, 0)`
		maxValue.style.transform = `translate(${pilotsVsAllLapsArea.scrollLeft}px, 0)`
	})


	pilotsVsAllLapsArea.addEventListener('click', function (e) {			//клик по графику
		const laps = document.querySelectorAll('.pilots-vs__lap');

		if ((e.target.closest('.pilots-vs__lap-graph')) || (e.target.closest('.pilots-vs__lap-graph-obj'))) {
			const currentLap = e.target.closest('.pilots-vs__lap');
			let currentIndex;
			laps.forEach((element, index) => {
				if (element == currentLap) {
					currentIndex = index;
					return
				}
			})
			sliderPilotsVs.value = currentIndex;
			if (CONSOLE_DEBUG) console.log('sliderPilotsVs.value', sliderPilotsVs.value);

			pilotsVsGraphChoosing(nameForFunctions1, nameForFunctions2, '_active');
		}
	})

	pilotsVsAllLapsArea.addEventListener('touchstart', function (e) {			//старт перетаскивания ползунка
		const currentLap = e.target.closest('.pilots-vs__lap');
		if (currentLap.classList.contains('_choosed')) {
			currentLap.classList.add('_hold')
			const allLapsAreaHeight = pilotsVsAllLapsArea.offsetHeight;
			const allLapsAreaHeightScroll = pilotsVsAllLapsArea.clientHeight;
			pilotsVsAllLapsArea.style.paddingBottom = `${allLapsAreaHeight - allLapsAreaHeightScroll}px`
			pilotsVsAllLapsArea.classList.add('_lock');
			graphTouchFlag = true;
		}
	})

	pilotsVsAllLapsArea.addEventListener('touchend', function (e) {			//отпустили ползунок
		const allLaps = document.querySelectorAll('.pilots-vs__lap')

		allLaps.forEach(element => {
			element.classList.remove('_hold');
			element.classList.remove('_choosed');
			if ((element.classList.contains('_active')) || element.classList.contains('_active-permanent')) {
				element.classList.add('_choosed');
			}
		})

		pilotsVsAllLapsArea.classList.remove('_lock');
		pilotsVsAllLapsArea.style.paddingBottom = null;
		graphTouchFlag = false;
	})


	pilotsVsAllLapsArea.addEventListener('touchmove', function (e) {					//тащим ползунок	


		// const pilotsVsAreaPosition = pilotsVsAllLapsArea.offsetTop;
		// const pilotsVsAreaHalfHeight = pilotsVsAllLapsArea.offsetHeight / 2;
		const tabContainer = document.querySelector('.pilots-vs__statistic-tab-container')

		const pilotsVsAreaPosition = tabContainer.offsetTop;
		const pilotsVsAreaHalfHeight = tabContainer.offsetHeight / 2;


		const elem = document.elementFromPoint(e.touches[0].clientX, (pilotsVsAreaPosition + pilotsVsAreaHalfHeight));
		if (graphTouchFlag) {
			if (CONSOLE_DEBUG) console.log('ELEM', elem);

			const laps = document.querySelectorAll('.pilots-vs__lap');
			const currentLap = elem.closest('.pilots-vs__lap');

			let currentIndex;
			laps.forEach((element, index) => {
				if (element == currentLap) {
					currentIndex = index;
					return
				}
			})
			sliderPilotsVs.value = currentIndex;
			pilotsVsGraphChoosing(nameForFunctions1, nameForFunctions2, '_active-permanent');
		}
	})



	pilotsVsExitBtn.addEventListener('click', function () {			//Нажимае на крест - выходим
		modalOnOff(pilotsVsElement, false);
		setTimeout(() => {
			lapsIdData = [];
			pilotsVsElement.remove();
		}, 500);
	})


}




function writePilotsVs(nameToVs1, nameToVs2) {

	const pilotsVs = {
		pilotsVs: document.createElement('div'),
		container: document.createElement('div'),
		tittle: document.createElement('div'),
		tittleText: document.createElement('div'),
		exitBtn: document.createElement('div'),

		tabsButtons: document.createElement('div'),
		allLapsButton: document.createElement('button'),
		statisticButton: document.createElement('button'),

		tabsWrapper: document.createElement('div'),
		allLapsTab: document.createElement('div'),
		allLapsTabContainer: document.createElement('div'),
		statisticTab: document.createElement('div'),
		statisticTabContainer: document.createElement('div'),
	}


	const pilotsVsAllLaps = {
		lapsArea: document.createElement('div'),
		laps: document.createElement('div'),
		solidAnimation: document.createElement('div'),
		slider: document.createElement('input'),

		averageLine: document.createElement('div'),
		maxLine: document.createElement('div'),
		pseudoLap: document.createElement('div'),

		buttons: document.createElement('div'),
		minus: document.createElement('button'),
		buttonsTittle: document.createElement('div'),
		plus: document.createElement('button'),

		stats: document.createElement('div'),
		roundCount: document.createElement('div'),
		roundCountText: document.createElement('div'),
		roundCountValue: document.createElement('div'),

		lapCount: document.createElement('div'),
		lapCountText: document.createElement('div'),
		lapCountValue: document.createElement('div'),

		lapStart: document.createElement('div'),
		lapStartText: document.createElement('div'),
		lapStartValue: document.createElement('div'),

		lapTime: document.createElement('div'),
		lapTimeText: document.createElement('div'),
		lapTimeValue: document.createElement('div'),
	}

	const pilotsVsStatistic = {
		names: document.createElement('div'),
		name1: document.createElement('div'),
		name2: document.createElement('div'),

		bestLap: document.createElement('div'),
		bestLapTittle: document.createElement('div'),
		bestLapSpoiler: document.createElement('div'),
		bestLapOther: document.createElement('div'),

		bestConsecutive: document.createElement('div'),
		bestConsecutiveTittle: document.createElement('div'),
		bestConsecutiveSpoiler: document.createElement('div'),
		bestConsecutiveOther: document.createElement('div'),

		average: document.createElement('div'),
		averageTittle: document.createElement('div'),

		totalLaps: document.createElement('div'),
		totalLapsTittle: document.createElement('div'),

		starts: document.createElement('div'),
		startsTittle: document.createElement('div'),

		totalTime: document.createElement('div'),
		totalTimeTittle: document.createElement('div'),


	}

	pilotsVs.pilotsVs.classList.add('pilots-vs', 'modal');
	pilotsVs.container.classList.add('pilots-vs__container', '_container', 'modal__container', '_no-event');
	pilotsVs.tittle.classList.add('pilots-vs__tittle', 'modal__tittle', '_hidden-tittle');
	pilotsVs.tittleText.classList.add('pilots-vs__tittle-text');
	pilotsVs.exitBtn.classList.add('pilots-vs__exit-button', '_button-exit');
	pilotsVs.tabsButtons.classList.add('pilots-vs__buttons', '_buttons-wrapper');
	pilotsVs.allLapsButton.classList.add('pilots-vs__all-laps-button', '_button');
	pilotsVs.statisticButton.classList.add('pilots-vs__statistic-button', '_button');

	pilotsVs.tabsWrapper.classList.add('pilots-vs__tabs-wrapper');
	pilotsVs.allLapsTab.classList.add('pilots-vs__all-laps-tab');
	pilotsVs.allLapsTabContainer.classList.add('pilots-vs__all-laps-tab-container');
	pilotsVs.statisticTab.classList.add('pilots-vs__statistic-tab');
	pilotsVs.statisticTabContainer.classList.add('pilots-vs__statistic-tab-container');


	pilotsVsAllLaps.lapsArea.classList.add('pilots-vs__laps-area', 'graph-area', '_hidden-vertical-stroke', '_lock');
	pilotsVsAllLaps.laps.classList.add('pilots-vs__laps', 'graph-area__elements');
	pilotsVsAllLaps.solidAnimation.classList.add('pilots-vs__solid-animation', '_hidden-graph')
	pilotsVsAllLaps.slider.classList.add('pilots-vs__slider', '_hidden-slider');
	pilotsVsAllLaps.slider.setAttribute("name", "pilots-vs__slider");
	pilotsVsAllLaps.slider.setAttribute("type", "range");
	pilotsVsAllLaps.slider.setAttribute("min", "0");
	pilotsVsAllLaps.slider.setAttribute("value", "0");
	pilotsVsAllLaps.slider.setAttribute("step", 1)
	pilotsVsAllLaps.averageLine.classList.add('pilots-vs__average-line', '_hidden-horizontal-stroke')
	pilotsVsAllLaps.maxLine.classList.add('pilots-vs__max-line', '_hidden-horizontal-stroke')
	pilotsVsAllLaps.pseudoLap.classList.add('pilots-vs__pseudo-lap')
	pilotsVsAllLaps.buttons.classList.add('pilots-vs__scale-buttons', '_hidden-buttons')
	pilotsVsAllLaps.minus.classList.add('pilots-vs__minus', '_button')
	pilotsVsAllLaps.buttonsTittle.classList.add('pilots-vs__buttons-tittle')
	pilotsVsAllLaps.plus.classList.add('pilots-vs__plus', '_button')

	pilotsVsAllLaps.stats.classList.add('pilots-vs__stats', 'modal__stats', '_hidden-stats')
	pilotsVsAllLaps.roundCount.classList.add('pilots-vs__round-count', 'modal__stat');
	pilotsVsAllLaps.roundCountText.classList.add('pilots-vs__round-count-text', '_stat-text');
	pilotsVsAllLaps.roundCountValue.classList.add('pilots-vs__round-count-value', '_stat-value')
	pilotsVsAllLaps.lapCount.classList.add('pilots-vs__lap-count', 'modal__stat');
	pilotsVsAllLaps.lapCountText.classList.add('pilots-vs__lap-count-text', '_stat-text');
	pilotsVsAllLaps.lapCountValue.classList.add('pilots-vs__lap-count-value', '_stat-value')
	pilotsVsAllLaps.lapStart.classList.add('pilots-vs__lap-start', 'modal__stat');
	pilotsVsAllLaps.lapStartText.classList.add('pilots-vs__lap-start-text', '_stat-text');
	pilotsVsAllLaps.lapStartValue.classList.add('pilots-vs__lap-start-value', '_stat-value')

	pilotsVsAllLaps.lapTime.classList.add('pilots-vs__lap-time', 'modal__stat');
	pilotsVsAllLaps.lapTimeText.classList.add('pilots-vs__lap-time-text', '_stat-text');
	pilotsVsAllLaps.lapTimeValue.classList.add('pilots-vs__lap-time-value', '_stat-value');

	pilotsVsStatistic.names.classList.add('pilots-vs__names');
	pilotsVsStatistic.name1.classList.add('pilots-vs__name', 'pilots-vs__name-1');
	pilotsVsStatistic.name2.classList.add('pilots-vs__name', 'pilots-vs__name-2');

	pilotsVsStatistic.bestLap.classList.add('pilots-vs__stat-stroke', 'pilots-vs__stat-stroke_best-lap');
	pilotsVsStatistic.bestLapTittle.classList.add('pilots-vs__stat-stroke-tittle', 'pilots-vs__stat-stroke-tittle_best-lap');
	pilotsVsStatistic.bestLapSpoiler.classList.add('pilots-vs__spoiler-button', '_button-spoiler');
	pilotsVsStatistic.bestLapOther.classList.add('pilots-vs__stat-stroke_best-lap-others');

	pilotsVsStatistic.bestConsecutive.classList.add('pilots-vs__stat-stroke', 'pilots-vs__stat-stroke_best-consecutive');
	pilotsVsStatistic.bestConsecutiveTittle.classList.add('pilots-vs__stat-stroke-tittle', 'pilots-vs__stat-stroke-tittle_best-consecutive');
	pilotsVsStatistic.bestConsecutiveSpoiler.classList.add('pilots-vs__spoiler-button', '_button-spoiler');
	pilotsVsStatistic.bestConsecutiveOther.classList.add('pilots-vs__stat-stroke_best-consecutive-others');

	pilotsVsStatistic.average.classList.add('pilots-vs__stat-stroke', 'pilots-vs__stat-stroke_average');
	pilotsVsStatistic.averageTittle.classList.add('pilots-vs__stat-stroke-tittle', 'pilots-vs__stat-stroke-tittle_average');

	pilotsVsStatistic.totalLaps.classList.add('pilots-vs__stat-stroke', 'pilots-vs__stat-stroke_total-laps');
	pilotsVsStatistic.totalLapsTittle.classList.add('pilots-vs__stat-stroke-tittle', 'pilots-vs__stat-stroke-tittle_total-laps');

	pilotsVsStatistic.starts.classList.add('pilots-vs__stat-stroke', 'pilots-vs__stat-stroke_starts');
	pilotsVsStatistic.startsTittle.classList.add('pilots-vs__stat-stroke-tittle', 'pilots-vs__stat-stroke-tittle_starts');

	pilotsVsStatistic.totalTime.classList.add('pilots-vs__stat-stroke', 'pilots-vs__stat-stroke_total-time');
	pilotsVsStatistic.totalTimeTittle.classList.add('pilots-vs__stat-stroke-tittle', 'pilots-vs__stat-stroke-tittle_total-time');

	pilotsVs.exitBtn.innerHTML = '<span></span>'
	pilotsVs.allLapsButton.innerHTML = textStrings.vsTab.laps
	pilotsVs.statisticButton.innerHTML = textStrings.vsTab.statistic



	pilotsVsAllLaps.buttonsTittle.innerHTML = textStrings.vsTab.scale
	pilotsVsAllLaps.plus.innerHTML = '+'
	pilotsVsAllLaps.minus.innerHTML = '-'
	pilotsVsAllLaps.roundCountText.innerHTML = textStrings.vsTab.roundNum
	pilotsVsAllLaps.lapCountText.innerHTML = textStrings.vsTab.lapNum
	pilotsVsAllLaps.lapStartText.innerHTML = textStrings.vsTab.roundStart
	pilotsVsAllLaps.lapTimeText.innerHTML = textStrings.vsTab.lapTime;




	const pilotsAverages = [];
	const pilotsHeats = [];
	let bestConsecutivesIds = [];
	let bestIds = [];






	pilotsVsStatistic.bestLapTittle.innerHTML = textStrings.vsTab.bestLap

	pilotsVsStatistic.bestConsecutiveTittle.innerHTML = textStrings.vsTab.bestConsecutive
	pilotsVsStatistic.averageTittle.innerHTML = textStrings.vsTab.average
	pilotsVsStatistic.totalLapsTittle.innerHTML = textStrings.vsTab.totalLaps
	pilotsVsStatistic.startsTittle.innerHTML = textStrings.vsTab.starts
	pilotsVsStatistic.totalTimeTittle.innerHTML = textStrings.vsTab.totalTime


	const bestLapOtherElements = [];
	const bestConsecutiveOtherElements = [];

	for (let i = 1; i < 5; i++) {
		const bestLapOtherElement = document.createElement('div');
		const bestConsecutiveOtherElement = document.createElement('div');
		bestLapOtherElement.classList.add('pilots-vs__stat-stroke_best-lap-others-item');
		bestConsecutiveOtherElement.classList.add('pilots-vs__stat-stroke_best-consecutive-others-item');
		bestLapOtherElements.push(bestLapOtherElement);
		bestConsecutiveOtherElements.push(bestConsecutiveOtherElement);

		pilotsVsStatistic.bestLapOther.append(bestLapOtherElements[`${i - 1}`]);
		pilotsVsStatistic.bestConsecutiveOther.append(bestConsecutiveOtherElements[`${i - 1}`]);
	}


	const pilotsVsArr = [nameToVs1, nameToVs2]

	pilotsVs.tittleText.innerHTML = `<p class="pilots-vs_name1">${pilotsVsArr[0]}</p>
	<p>vs</p>
	<p class="pilots-vs_name2">${pilotsVsArr[1]}</p>`


	pilotsVsStatistic.name1.innerHTML = `${pilotsVsArr[0]}`
	pilotsVsStatistic.name2.innerHTML = `${pilotsVsArr[1]}`

	const pilotsFloatTimes = [];

	pilotsVsArr.forEach((pilot, index) => {
		const pilotFloatTimes = {};
		const heat = getHeat(pilot);
		pilotsHeats.push(heat)

		const laps = getLapsByName(pilot, heat, true);
		if (CONSOLE_DEBUG) console.log('PilotsVSInfoLAPS', laps);

		let consecutives;
		try {
			consecutives = getConsecutivesByName(pilot, heat, true);

		} catch (error) {
			consecutives = [];
			if (CONSOLE_DEBUG) console.log('Нет 3 Подряд');

		}
		const pilotsInfo = getPilotsStats();
		if (CONSOLE_DEBUG) console.log('PilotsVSInfoPilots', pilotsInfo);

		const pilotInfo = pilotsInfo.filter(element => element.name == pilot)


		const bestLapElement = document.createElement('div')
		const bestConsecutiveElement = document.createElement('div')
		const averageElement = document.createElement('div')
		const totalLapsElement = document.createElement('div')
		const startsElement = document.createElement('div')
		const totalTimeElement = document.createElement('div')

		bestLapElement.classList.add('pilots-vs__stat-stroke-value', `pilots-vs__stat-stroke-value_best-lap-${index + 1}`)
		bestConsecutiveElement.classList.add('pilots-vs__stat-stroke-value', `pilots-vs__stat-stroke-value_best-consecutive-${index + 1}`)
		averageElement.classList.add('pilots-vs__stat-stroke-value', `pilots-vs__stat-stroke-value_average-${index + 1}`)
		totalLapsElement.classList.add('pilots-vs__stat-stroke-value', `pilots-vs__stat-stroke-value_total-laps-${index + 1}`)
		startsElement.classList.add('pilots-vs__stat-stroke-value', `pilots-vs__stat-stroke-value_starts-${index + 1}`)
		totalTimeElement.classList.add('pilots-vs__stat-stroke-value', `pilots-vs__stat-stroke-value_total-time-${index + 1}`)

		bestLapElement.innerHTML = laps[0].lapTime
		pilotFloatTimes.lapTime = lapTimeConverter(laps[0].lapTime, 'float');
		bestIds.push(laps[0].lapId)

		try {
			bestConsecutiveElement.innerHTML = consecutives[0].lapTime
			pilotFloatTimes.consecutiveTime = lapTimeConverter(consecutives[0].lapTime, 'float');
			bestConsecutivesIds.push(...consecutives[0].lapId);
		} catch (error) {
			bestConsecutiveElement.innerHTML = `-: --.--- `
		}

		averageElement.innerHTML = pilotInfo[0].averageLap;
		pilotFloatTimes.average = lapTimeConverter(pilotInfo[0].averageLap, 'float');
		pilotsAverages.push(pilotInfo[0].averageLap);

		totalLapsElement.innerHTML = pilotInfo[0].laps;
		pilotFloatTimes.totalLaps = pilotInfo[0].laps;

		pilotsFloatTimes.push(pilotFloatTimes);

		startsElement.innerHTML = pilotInfo[0].starts;
		totalTimeElement.innerHTML = pilotInfo[0].totalTime;

		pilotsVsStatistic.bestLap.append(bestLapElement);
		pilotsVsStatistic.bestConsecutive.append(bestConsecutiveElement);
		pilotsVsStatistic.average.append(averageElement);
		pilotsVsStatistic.totalLaps.append(totalLapsElement);
		pilotsVsStatistic.starts.append(startsElement);
		pilotsVsStatistic.totalTime.append(totalTimeElement);



		for (let i = 1; i < 5; i++) {
			const bestLapOtherItemElement = document.createElement('div');
			const bestConsecutiveOtherItemElement = document.createElement('div');

			bestLapOtherItemElement.classList.add('pilots-vs__stat-stroke-value', `pilots-vs__stat-stroke-value_best-lap-${index + 1}`)
			bestConsecutiveOtherItemElement.classList.add('pilots-vs__stat-stroke-value', `pilots-vs__stat-stroke-value_best-consecutive-${index + 1}`)
			try {
				bestLapOtherItemElement.innerHTML = `${laps[i].lapTime} `
			} catch (error) {
				bestLapOtherItemElement.innerHTML = `-: --.--- `
			}
			try {
				bestConsecutiveOtherItemElement.innerHTML = `${consecutives[i].lapTime} `
			} catch (error) {
				bestConsecutiveOtherItemElement.innerHTML = `-: --.--- `
			}

			bestLapOtherElements[`${i - 1}`].append(bestLapOtherItemElement);
			bestConsecutiveOtherElements[`${i - 1}`].append(bestConsecutiveOtherItemElement);
		}



	})



	akcentArr = [1, 1, 1, 1];

	let floatCounter = 0;

	for (let floatTimeName in pilotsFloatTimes[0]) {
		if (floatCounter < 3) {
			const pilot1Time = pilotsFloatTimes[0][floatTimeName];
			const pilot2Time = pilotsFloatTimes[1][floatTimeName];
			if (pilot1Time > pilot2Time) akcentArr[floatCounter] = 2;
			floatCounter++;
			if (CONSOLE_DEBUG) console.log('floatTime', pilotsFloatTimes[0][floatTimeName]);
		} else {
			const pilot1Time = pilotsFloatTimes[0][floatTimeName];
			const pilot2Time = pilotsFloatTimes[1][floatTimeName];
			if (pilot1Time < pilot2Time) akcentArr[floatCounter] = 2;
		}
	}




	const lapsPilot1 = getLapsByName(pilotsVsArr[0], pilotsHeats[0], false)
	const lapsPilot2 = getLapsByName(pilotsVsArr[1], pilotsHeats[1], false)


	const averageLineFloat = (+lapTimeConverter(pilotsAverages[0], 'float') + +lapTimeConverter(pilotsAverages[1], 'float')) / 2;
	const averageLineString = lapTimeConverter(averageLineFloat, 'string')
	const maxLinefloat = averageLineFloat * 2;
	const maxLineString = lapTimeConverter(maxLinefloat, 'string')

	const svgSecStep = (140) / (averageLineFloat);			//Тут считаем шаг секунды для svg графики



	/*			Тут счётчик раундов, теперь надо счётчик по Heatам.
		const roundByHeat = [];
		pilotsHeats.forEach(heat => {
			try {
				roundByHeat.push(mainObj.heats[heat].rounds.length)
			} catch (error) {
				roundByHeat.push(mainObj.Results.heats[heat].rounds.length)
	
			}
		})
		const roundsCount = Math.max(...roundByHeat);
	
		if(CONSOLE_DEBUG)console.log('roundByHeat', roundByHeat);
	
		if(CONSOLE_DEBUG)console.log('roundsCount', roundsCount);
	*/





	/* здесь пробовал сделать пары по хитам, но не получилось как-то, пото понял что не надо
	let checkedHeats1 = [];
	let checkedHeats2 = [];
	
	let heatsArr = [];
	
	
	
	if(CONSOLE_DEBUG)console.log('classHeats', classHeats);
	
	
	
	for (let i = 0; i < classHeats.length; i++) {
	
		let pilot1Heat = [];
		let pilot2Heat = [];
	
		let heatArr = [];
	
	
		if(CONSOLE_DEBUG)console.log('checkedHeats1', checkedHeats1);
	
		classHeats.forEach(function (heat) {
			lapsPilot1.forEach(function (lap) {
				if ((lap.heatId == heat) & (pilot1Heat.length != 1) & (!checkedHeats1.includes(heat))) {
					pilot1Heat.push(heat);
					checkedHeats1.push(heat);
				}
			})
		})
	
	
		classHeats.forEach(function (heat) {
			lapsPilot2.forEach(function (lap) {
				if ((lap.heatId == heat) & (pilot2Heat.length != 1) & (!checkedHeats2.includes(heat))) {
					pilot2Heat.push(heat);
					checkedHeats2.push(heat);
				}
			})
		})
	
		const twoPilotsHeat = [...pilot1Heat, ...pilot2Heat]
	
	
	
		heatsArr.push(twoPilotsHeat);
		if(CONSOLE_DEBUG)console.log('twoPilotsHeat', heatsArr);
	
	}
	
	
	
	// lapsPilot1.forEach(function (lap) {
	// 	if (lap.heatId == heat) return heatArr.push(heat);
	// })
	
	
	
	if(CONSOLE_DEBUG)console.log('heatsArrheatsArr', heatsArr);
	
*/



	const classHeats = mainObj.heats_by_class[currentClass];


	let lapsTimeData = [];
	let roundsInAllHeats1 = {};
	let roundsInAllHeats2 = {};
	let allRoundsInHeats = [];

	classHeats.forEach(function (heatNum) {		// здесь узнаем, в каком Heatе сколько Roundов;
		const lapsInHeatDataPilot1 = lapsPilot1.filter(lap => lap.heatId == heatNum)
		const lapsInHeatDataPilot2 = lapsPilot2.filter(lap => lap.heatId == heatNum)
		let roundsInHeats1;
		let roundsInHeats2;
		try {
			roundsInHeats1 = lapsInHeatDataPilot1[lapsInHeatDataPilot1.length - 1].roundId;
		} catch (error) {
			roundsInHeats1 = 0;
		}

		try {
			roundsInHeats2 = lapsInHeatDataPilot2[lapsInHeatDataPilot2.length - 1].roundId;
		} catch (error) {
			roundsInHeats2 = 0;
		}

		roundsInAllHeats1[heatNum] = roundsInHeats1;
		roundsInAllHeats2[heatNum] = roundsInHeats2;
		allRoundsInHeats.push(roundsInHeats1, roundsInHeats2)
	})


	if (CONSOLE_DEBUG) console.log('roundsInAllHeats1roundsInAllHeats1', roundsInAllHeats1);
	if (CONSOLE_DEBUG) console.log('roundsInAllHeats2roundsInAllHeats2', roundsInAllHeats2);



	const maxRoundsInHeats = Math.max(...allRoundsInHeats);

	for (let i = 1; i <= maxRoundsInHeats; i++) {

		classHeats.forEach(function (heatNum) {

			let heatTimeData = [];
			let heatIdData = [];

			const lapsInHeatDataPilot1 = lapsPilot1.filter(lap => lap.heatId == heatNum && lap.roundId == i)
			const lapsInHeatDataPilot2 = lapsPilot2.filter(lap => lap.heatId == heatNum && lap.roundId == i)
			//Гдето здесь остановился в самолете!
			//Some works...



			const maxLapsInRound = Math.max(lapsInHeatDataPilot1.length, lapsInHeatDataPilot2.length)


			for (let b = 0; b < maxLapsInRound; b++) {
				const lapTimeData = [];
				const lapIdData = [];
				let lapTime1;
				let lapTime2;
				let lapId1;
				let lapId2;

				try {
					lapTime1 = lapTimeConverter(lapsInHeatDataPilot1[b].lapTime, 'float')
					lapId1 = lapsInHeatDataPilot1[b].lapId;
				} catch (error) {
					lapTime1 = 0;
					lapId1 = '-';
				}
				try {
					lapTime2 = lapTimeConverter(lapsInHeatDataPilot2[b].lapTime, 'float')
					lapId2 = lapsInHeatDataPilot2[b].lapId;
				} catch (error) {
					lapTime2 = 0;
					lapId2 = '-';
				}




				lapTimeData.push(lapTime1, lapTime2);
				lapIdData.push(lapId1, lapId2)

				heatTimeData.push(lapTimeData);
				heatIdData.push(lapIdData);

			}

			lapsTimeData.push(...heatTimeData);
			lapsIdData.push(...heatIdData);

		})




		// if(CONSOLE_DEBUG)console.log('lapDataPilot1', lapDataPilot1);
		// if(CONSOLE_DEBUG)console.log('lapDataPilot2', lapDataPilot2);
		// if(CONSOLE_DEBUG)console.log('maxLapsInRound', maxLapsInRound);
		///////////////////

	}

	pilotsVsAllLaps.slider.style.gridColumn = `span ${lapsTimeData.length + 1}`;
	pilotsVsAllLaps.averageLine.style.gridColumn = `span ${lapsTimeData.length + 1}`
	pilotsVsAllLaps.maxLine.style.gridColumn = `span ${lapsTimeData.length + 1}`

	pilotsVsAllLaps.averageLine.innerHTML = `<span>${averageLineString}</span>`
	pilotsVsAllLaps.maxLine.innerHTML = `<span>${maxLineString}</span>`


	pilotsVsAllLaps.laps.append(pilotsVsAllLaps.slider, pilotsVsAllLaps.averageLine, pilotsVsAllLaps.maxLine, pilotsVsAllLaps.pseudoLap);


	for (let i = 0; i <= lapsTimeData.length - 1; i++) {
		const lapTimes = lapsTimeData[i];

		const lapElement = document.createElement('div');
		lapElement.classList.add('pilots-vs__lap');
		lapElement.innerHTML = '<span></span>'

		let svg;
		let colors = ["#9445a2", "#66fcf1"]
		let svgPostitions = [(lapTimes[0] * svgSecStep), (lapTimes[1] * svgSecStep)]
		let bestDotRadius = [0, 0]
		let circleRadius = [4, 4]


		lapTimes.forEach((value, index) => {
			if (value == 0) {
				colors[index] = "#0b0c10";
			} else if ((bestIds.indexOf(lapsIdData[i][index]) != -1) || (bestConsecutivesIds.indexOf(lapsIdData[i][index]) != -1)) {
				bestDotRadius[index] = 3;
				circleRadius[index] = 4;
			}
		})

		svg = `
		<span></span>
			<svg class=pilots-vs__lap-graph preserveAspectRatio="none" viewbox="0 0 8 280">
				<circle class=pilots-vs__lap-graph-obj fill=${colors[0]} r="${circleRadius[0]}" cx="4" cy="${svgPostitions[0]}" />
				<circle class=pilots-vs__lap-graph-obj fill=${colors[1]} r="${circleRadius[1]}" cx="4" cy="${svgPostitions[1]}" />
				<circle class=pilots-vs__lap-graph-obj fill="#0b0c10" r="${bestDotRadius[0]}" cx="4" cy="${svgPostitions[0]}" />
				<circle class=pilots-vs__lap-graph-obj fill="#0b0c10" r="${bestDotRadius[1]}" cx="4" cy="${svgPostitions[1]}" />

			</svg>
	`

		lapElement.innerHTML = svg;


		pilotsVsAllLaps.laps.append(lapElement);

		//не работает/////////////////////////////////

		/*const lapGraphCircle = document.createElement('svg');
		lapGraphCircle.classList.add('pilots-vs__lap-graph');
		lapGraphCircle.setAttribute(`preserveAspectRatio`, "none");
		lapGraphCircle.setAttribute("viewbox", "0 0 8 280");
		
		const svgHtml = document.createElement('circle');
		svgHtml.classList.add('pilots-vs__lap-graph-obj')
		svgHtml.setAttribute('fill', `${ '#f00' } `)
		svgHtml.setAttribute('r', `4`)
		svgHtml.setAttribute('cx', `4`)
		svgHtml.setAttribute('cy', `${ 111 } `)
		
		
			lapTimes.forEach((value, index) => {
		
				const startSvg = value * svgSecStep;
				let color;
				if (index) {
					color = '#66fcf1';
				} else {
					color = '#f00';
				}
		
				const svgHtml = document.createElement('circle');
				svgHtml.classList.add('pilots-vs__lap-graph-obj')
				svgHtml.setAttribute('fill', `${ color } `)
				svgHtml.setAttribute('r', `4`)
				svgHtml.setAttribute('cx', `4`)
				svgHtml.setAttribute('cy', `${ startSvg } `)
		
		
				lapGraphCircle.append(svgHtml)
			})*/
		//не работает/////////////////////////////////

	}

	// if(CONSOLE_DEBUG)console.log('lapsPilot1', lapsPilot1);
	// if(CONSOLE_DEBUG)console.log('lapsPilot2', lapsPilot2);

	// if(CONSOLE_DEBUG)console.log('lapsTimes', lapsTimeData);
	// if(CONSOLE_DEBUG)console.log('lapsIds', lapsIdData);
	// if(CONSOLE_DEBUG)console.log('bestIds', bestIds);


	pilotsVs.pilotsVs.append(pilotsVs.container);
	pilotsVs.container.append(pilotsVs.tittle, pilotsVs.tabsButtons, pilotsVs.tabsWrapper);

	pilotsVs.tittle.append(pilotsVs.tittleText, pilotsVs.exitBtn);
	pilotsVs.tabsButtons.append(pilotsVs.allLapsButton, pilotsVs.statisticButton)
	pilotsVs.tabsWrapper.append(pilotsVs.allLapsTab, pilotsVs.statisticTab);

	pilotsVs.allLapsTab.append(pilotsVs.allLapsTabContainer);
	pilotsVs.allLapsTabContainer.append(pilotsVsAllLaps.lapsArea, pilotsVsAllLaps.buttons, pilotsVsAllLaps.stats);
	pilotsVsAllLaps.lapsArea.append(pilotsVsAllLaps.laps, pilotsVsAllLaps.solidAnimation)
	pilotsVsAllLaps.buttons.append(pilotsVsAllLaps.minus, pilotsVsAllLaps.buttonsTittle, pilotsVsAllLaps.plus)
	pilotsVsAllLaps.stats.append(pilotsVsAllLaps.roundCount, pilotsVsAllLaps.lapCount, pilotsVsAllLaps.lapStart, pilotsVsAllLaps.lapTime)

	pilotsVsAllLaps.roundCount.append(pilotsVsAllLaps.roundCountText, pilotsVsAllLaps.roundCountValue)
	pilotsVsAllLaps.lapCount.append(pilotsVsAllLaps.lapCountText, pilotsVsAllLaps.lapCountValue)
	pilotsVsAllLaps.lapStart.append(pilotsVsAllLaps.lapStartText, pilotsVsAllLaps.lapStartValue)
	pilotsVsAllLaps.lapTime.append(pilotsVsAllLaps.lapTimeText, pilotsVsAllLaps.lapTimeValue)

	pilotsVs.statisticTab.append(pilotsVs.statisticTabContainer);
	pilotsVs.statisticTabContainer.append(pilotsVsStatistic.names, pilotsVsStatistic.bestLap, pilotsVsStatistic.bestLapOther, pilotsVsStatistic.bestConsecutive, pilotsVsStatistic.bestConsecutiveOther, pilotsVsStatistic.average, pilotsVsStatistic.totalLaps, pilotsVsStatistic.starts, pilotsVsStatistic.totalTime);
	pilotsVsStatistic.names.append(pilotsVsStatistic.name1, pilotsVsStatistic.name2)
	pilotsVsStatistic.bestLap.append(pilotsVsStatistic.bestLapTittle, pilotsVsStatistic.bestLapSpoiler)
	pilotsVsStatistic.bestConsecutive.append(pilotsVsStatistic.bestConsecutiveTittle, pilotsVsStatistic.bestConsecutiveSpoiler)
	pilotsVsStatistic.average.append(pilotsVsStatistic.averageTittle)
	pilotsVsStatistic.totalLaps.append(pilotsVsStatistic.totalLapsTittle)
	pilotsVsStatistic.starts.append(pilotsVsStatistic.startsTittle)
	pilotsVsStatistic.totalTime.append(pilotsVsStatistic.totalTimeTittle)




	return pilotsVs.pilotsVs
}


function setAkcentValues(akcentArrHere) {
	const akcentElements = {
		bestLap1: document.querySelector('.pilots-vs__stat-stroke-value_best-lap-1'),
		bestLap2: document.querySelector('.pilots-vs__stat-stroke-value_best-lap-2'),

		bestConsecutive1: document.querySelector('.pilots-vs__stat-stroke-value_best-consecutive-1'),
		bestConsecutive2: document.querySelector('.pilots-vs__stat-stroke-value_best-consecutive-2'),

		average1: document.querySelector('.pilots-vs__stat-stroke-value_average-1'),
		average2: document.querySelector('.pilots-vs__stat-stroke-value_average-2'),

		totalLaps1: document.querySelector('.pilots-vs__stat-stroke-value_total-laps-1'),
		totalLaps2: document.querySelector('.pilots-vs__stat-stroke-value_total-laps-2'),
	}

	if (CONSOLE_DEBUG) console.log('akcentElements', akcentArrHere[2]);
	// if(CONSOLE_DEBUG)console.log('');

	akcentElements[`bestLap${akcentArrHere[0]}`].classList.add('_akcent');
	akcentElements[`bestConsecutive${akcentArrHere[1]}`].classList.add('_akcent');
	akcentElements[`average${akcentArrHere[2]}`].classList.add('_akcent');
	akcentElements[`totalLaps${akcentArrHere[3]}`].classList.add('_akcent');

}




function writeInRoundHTML(lap, laps, name) {			//Рисуем 'В каком раунде'. lap - круг какой нажали. laps - все круги пилота;
	const inRound = {
		inRound: document.createElement('div'),
		container: document.createElement('div'),
		tittle: document.createElement('div'),
		tittleName: document.createElement('div'),
		tittleRound: document.createElement('div'),
		exitBtn: document.createElement('div'),
		area: document.createElement('div'),
		areaLaps: document.createElement('div'),
		stats: document.createElement('div'),
		start: document.createElement('div'),
		startText: document.createElement('div'),
		startValue: document.createElement('div'),
		lapStart: document.createElement('div'),
		lapStartText: document.createElement('div'),
		lapStartValue: document.createElement('div'),

		lapEnd: document.createElement('div'),
		lapEndText: document.createElement('div'),
		lapEndValue: document.createElement('div'),

		lapTime: document.createElement('div'),
		lapCount: document.createElement('div'),
		lapCountText: document.createElement('div'),
		lapCountValue: document.createElement('div'),
		button: document.createElement('button'),
		heatNum: document.createElement('div'),
		roundNum: document.createElement('div'),
	}
	inRound.inRound.classList.add('in-round', 'modal');
	inRound.container.classList.add('in-round__container', '_container', '_no-events', 'modal__container');
	inRound.tittle.classList.add('in-round__tittle', 'modal__tittle', '_hidden-tittle');
	inRound.tittleName.classList.add('in-round__tittle-name');
	inRound.tittleRound.classList.add('in-round__tittle-round');
	inRound.exitBtn.classList.add('in-round__exit-button', '_no-event', '_button-exit');
	inRound.area.classList.add('in-round__round-area', 'graph-area', '_hidden-vertical-bar', '_hidden-horizontal-bar');
	inRound.areaLaps.classList.add('in-round__round-area-laps', 'graph-area__elements');
	inRound.stats.classList.add('in-round__stats', 'modal__stats', '_hidden-stats');
	inRound.start.classList.add('in-round__round-start', 'modal__stat');
	inRound.startText.classList.add('in-round__round-start-text', '_stat-text');
	inRound.startValue.classList.add('in-round__round-start-value', 'modal__stat-value', '_stat-value');
	inRound.lapStart.classList.add('in-round__lap-start', 'modal__stat');
	inRound.lapStartText.classList.add('in-round__lap-start-text', '_stat-text');
	inRound.lapStartValue.classList.add('in-round__lap-start-value', 'modal__stat-value', '_stat-value');
	inRound.lapEnd.classList.add('in-round__lap-end', 'modal__stat');
	inRound.lapEndText.classList.add('in-round__lap-end-text', '_stat-text');
	inRound.lapEndValue.classList.add('in-round__lap-end-value', 'modal__stat-value', '_stat-value');

	inRound.lapCount.classList.add('in-round__lap-count', 'modal__stat');
	inRound.lapCountText.classList.add('in-round__lap-count-text', '_stat-text');
	inRound.lapCountValue.classList.add('in-round__lap-count-value', 'modal__stat-value', '_stat-value');

	inRound.lapTime.classList.add('in-round__lap-time', 'modal__stat');

	inRound.button.classList.add('in-round__to-round-button', '_no-event', '_button');

	inRound.roundNum.classList.add('in-round__roundNum')
	inRound.heatNum.classList.add('in-round__heatNum')

	inRound.tittleName.innerHTML = `<p>${name}</p>`			//Имя 
	inRound.tittleRound.innerHTML = `<p>${lap.round}</p>`			//номер раунда

	inRound.roundNum.setAttribute("value", `${lap.roundId}`)
	inRound.heatNum.setAttribute("value", `${lap.heatId}`)


	inRound.exitBtn.innerHTML = '<span></span>';

	let lapHeights = [];
	let lapHeightsSort = [];
	const akcentLap = lap.lapIndex;  	//Круг, который выбрали


	laps.forEach(lap => {			//Считаем круги и вымеряем для Grid
		const intTime = [...lap.lapTime];
		const minute = intTime.shift();
		intTime.shift();
		intTime.splice(2, 4);
		const seconds = intTime.join('');

		const fullSeconds = (+seconds) + (60 * minute);
		lapHeights.push(fullSeconds);
		lapHeightsSort.push(fullSeconds);
	})

	lapHeightsSort.sort();

	const heightStep = 100 / lapHeightsSort[lapHeightsSort.length - 1];

	for (let i = 0; i <= lapHeights.length; i++) {			//рисуем столбы 'круги', смотря сколько их
		if (i < lapHeights.length) {
			const roundLap = document.createElement('div');
			const roundColumn = document.createElement('div');
			const roundNode = document.createElement('div');

			roundLap.classList.add('in-round__lap', '_hidden-vertical-stroke', '_hidden-text');
			roundNode.classList.add('in-round__lap-node')
			roundColumn.classList.add('in-round__lap-column', '_hidden-columns')

			roundLap.innerHTML = `<span>${textStrings.inRoundTab.lap} ${i + 1}</span>`
			roundNode.innerHTML = laps[i].lapTime;			//номер круга

			roundColumn.style.height = `${(lapHeights[i] * heightStep) - 10}%`

			roundLap.append(roundColumn);
			inRound.areaLaps.append(roundLap, roundNode);
		} else if (i == lapHeights.length) {			//Добавляем ещё один круг, для замыкающей полоски;
			const roundLap = document.createElement('div');
			roundLap.classList.add('in-round__lap', '_hidden-vertical-stroke', '_hidden-bars', '_hidden-text');
			inRound.areaLaps.append(roundLap);
		}
	}

	inRound.startText.innerHTML = textStrings.inRoundTab.roundStart;
	inRound.startValue.innerHTML = lap.roundTimeStart;

	if (akcentLap.length == 1) {			// выбрали один круг
		inRound.lapStartText.innerHTML = textStrings.inRoundTab.lapStart;
		inRound.lapEndText.innerHTML = textStrings.inRoundTab.lapEnd;

	} else if (akcentLap.length > 1) {			//выбрали круги подряд
		inRound.lapStartText.innerHTML = textStrings.inRoundTab.lapsStart;
		inRound.lapEndText.innerHTML = textStrings.inRoundTab.lapsEnd;
	}
	inRound.lapStartValue.innerHTML = lap.lapTimeStart;
	inRound.lapEndValue.innerHTML = lap.lapTimeEnd;

	if (akcentLap.length == 1) {			// выбрали один круг
		inRound.lapCountText.innerHTML = textStrings.inRoundTab.lapNum
		inRound.lapCountValue.innerHTML = +akcentLap[0];
		const timeText = document.createElement('div')
		const timeValue = document.createElement('div')
		timeText.classList.add('in-round__lap-time-text', '_stat-text');
		timeValue.classList.add('in-round__lap-time-value', 'modal__stat-value', '_stat-value');
		timeText.innerHTML = textStrings.inRoundTab.lapTime;
		timeValue.innerHTML = lap.lapTime;
		inRound.lapTime.append(timeText, timeValue)
	} else if (akcentLap.length > 1) {				//выбрали круги подря
		inRound.lapCountText.innerHTML = textStrings.inRoundTab.lapsNum
		inRound.lapCountValue.innerHTML = `${+akcentLap[0]} -${+akcentLap[akcentLap.length - 1]}`;
		for (let i = 0; i < akcentLap.length; i++) {
			const timeText = document.createElement('div')
			const timeValue = document.createElement('div')
			timeText.classList.add('in-round__lap-time-text', '_stat-text');
			timeValue.classList.add('in-round__lap-time-value', 'modal__stat-value', '_stat-value');
			timeText.innerHTML = `${textStrings.inRoundTab.lapTime} ${i + 1} `;
			timeValue.innerHTML = lap.lapsData[i].lapTime;
			inRound.lapTime.append(timeText, timeValue)
		}
	}

	inRound.button.innerHTML = textStrings.inRoundTab.goToRound;

	//ищем совпадение лучшего круга и лучших кругов

	const heat = getHeat(name);

	const currentLapId = lap.lapId;



	try {
		const lapsData = getLapsByName(name, heat, true);
		const consecutivesData = getConsecutivesByName(name, heat, true);
		const bestLapId = lapsData[0].lapId;
		const bestConsecutiveId = consecutivesData[0].lapId;
		// if(CONSOLE_DEBUG)console.log('CURR ID', currentLapId);
		// if(CONSOLE_DEBUG)console.log('BEST LAP ID', bestLapId);
		// if(CONSOLE_DEBUG)console.log('BEST CONS ID', bestConsecutiveId);

	} catch (error) {
		if (CONSOLE_DEBUG) console.log('Чего-то нет', error);

	}




	inRound.inRound.append(inRound.container, inRound.roundNum, inRound.heatNum);			//собираем HTML
	inRound.container.append(inRound.tittle, inRound.area, inRound.stats, inRound.button);
	inRound.tittle.append(inRound.tittleName, inRound.tittleRound, inRound.exitBtn);
	inRound.area.append(inRound.areaLaps);
	inRound.stats.append(inRound.start, inRound.lapStart, inRound.lapEnd, inRound.lapTime, inRound.lapCount);
	inRound.start.append(inRound.startText, inRound.startValue);
	inRound.lapEnd.append(inRound.lapEndText, inRound.lapEndValue);
	inRound.lapStart.append(inRound.lapStartText, inRound.lapStartValue);
	inRound.lapCount.append(inRound.lapCountText, inRound.lapCountValue)



	akcentLap.forEach((lap, index) => {			// считаем, сколько ацентных кругов и добавляем акцетные классы
		setTimeout(() => {
			const laps = document.querySelectorAll('.in-round__lap');
			const nodes = document.querySelectorAll('.in-round__lap-node');
			const column = document.querySelectorAll('.in-round__lap-column');


			laps[lap - 1].classList.add('_akcent');
			nodes[lap - 1].classList.add('_akcent');
			column[lap - 1].classList.add('_akcent');
			setTimeout(() => {

				lapNodeShow(nodes[lap - 1], column[lap - 1], 666);
			}, 100 + (666 * index));			/// появление времени поочереди, когда кугов много
		}, 1800);
	})


	inRound.areaLaps.style.gridTemplateColumns = `repeat(${lapHeights.length}, 1fr) 2px`;			//2px для замыкающей полоски
	return inRound.inRound;
}




function writeAllLapsHTML(name) {
	const allLaps = {
		allLaps: document.createElement('div'),
		container: document.createElement('div'),
		tittle: document.createElement('div'),
		tittleText: document.createElement('div'),
		exitBtn: document.createElement('div'),

		lapsArea: document.createElement('div'),
		laps: document.createElement('div'),
		solidAnimation: document.createElement('div'),
		slider: document.createElement('input'),

		averageLine: document.createElement('div'),
		maxLine: document.createElement('div'),
		pseudoLap: document.createElement('div'),

		buttons: document.createElement('div'),
		minus: document.createElement('button'),
		buttonsTittle: document.createElement('div'),
		plus: document.createElement('button'),

		stats: document.createElement('div'),
		roundCount: document.createElement('div'),
		roundCountText: document.createElement('div'),
		roundCountValue: document.createElement('div'),

		lapCount: document.createElement('div'),
		lapCountText: document.createElement('div'),
		lapCountValue: document.createElement('div'),

		lapStart: document.createElement('div'),
		lapStartText: document.createElement('div'),
		lapStartValue: document.createElement('div'),

		lapEnd: document.createElement('div'),
		lapEndText: document.createElement('div'),
		lapEndValue: document.createElement('div'),


		lapTime: document.createElement('div'),
		lapTimeText: document.createElement('div'),
		lapTimeValue: document.createElement('div'),
	}

	allLaps.allLaps.classList.add('all-laps', 'modal');
	allLaps.container.classList.add('all-laps__container', '_container', 'modal__container', '_no-event');
	allLaps.tittle.classList.add('all-laps__tittle', 'modal__tittle', '_hidden-tittle');
	allLaps.tittleText.classList.add('all-laps__tittle-text');
	allLaps.exitBtn.classList.add('all-laps__exit-button', '_button-exit');

	allLaps.lapsArea.classList.add('all-laps__laps-area', 'graph-area', '_hidden-vertical-stroke', '_lock');
	allLaps.laps.classList.add('all-laps__laps', 'graph-area__elements');
	allLaps.solidAnimation.classList.add('all-laps__solid-animation', '_hidden-graph')
	allLaps.slider.classList.add('all-laps__slider', '_hidden-slider');
	allLaps.slider.setAttribute("name", "all-laps__slider");
	allLaps.slider.setAttribute("type", "range");
	allLaps.slider.setAttribute("min", "0");
	allLaps.slider.setAttribute("value", "0");
	allLaps.slider.setAttribute("step", "1");

	allLaps.averageLine.classList.add('all-laps__average-line', '_hidden-horizontal-stroke')
	allLaps.maxLine.classList.add('all-laps__max-line', '_hidden-horizontal-stroke')
	allLaps.pseudoLap.classList.add('all-laps__pseudo-lap')

	allLaps.buttons.classList.add('all-laps__buttons', '_hidden-buttons')
	allLaps.minus.classList.add('all-laps__minus', '_button')
	allLaps.buttonsTittle.classList.add('all-laps__buttons-tittle')
	allLaps.plus.classList.add('all-laps__plus', '_button')

	allLaps.stats.classList.add('all-laps__stats', 'modal__stats', '_hidden-stats');

	allLaps.roundCount.classList.add('all-laps__round-count', 'modal__stat');
	allLaps.roundCountText.classList.add('all-laps__round-count-text', '_stat-text');
	allLaps.roundCountValue.classList.add('all-laps__round-count-value', '_stat-value');

	allLaps.lapCount.classList.add('all-laps__lap-count', 'modal__stat');
	allLaps.lapCountText.classList.add('all-laps__lap-count-text', '_stat-text');
	allLaps.lapCountValue.classList.add('all-laps__lap-count-value', '_stat-value');

	allLaps.lapStart.classList.add('all-laps__lap-start', 'modal__stat');
	allLaps.lapStartText.classList.add('all-laps__lap-start-text', '_stat-text');
	allLaps.lapStartValue.classList.add('all-laps__lap-start-value', '_stat-value');

	allLaps.lapEnd.classList.add('all-laps__lap-end', 'modal__stat');
	allLaps.lapEndText.classList.add('all-laps__lap-end-text', '_stat-text');
	allLaps.lapEndValue.classList.add('all-laps__lap-end-value', '_stat-value');


	allLaps.lapTime.classList.add('all-laps__lap-time', 'modal__stat');
	allLaps.lapTimeText.classList.add('all-laps__lap-time-text', '_stat-text');
	allLaps.lapTimeValue.classList.add('all-laps__lap-time-value', '_stat-value');


	allLaps.tittleText.innerHTML = `<p>${name}</p>`			//Имя которое выбрали
	allLaps.exitBtn.innerHTML = `<span></span>`
	allLaps.lapsArea.innerHTML = `<span></span>`

	allLaps.minus.innerHTML = `- `
	allLaps.buttonsTittle.innerHTML = textStrings.allLapsTab.scale
	allLaps.plus.innerHTML = `+ `

	allLaps.roundCountText.innerHTML = textStrings.allLapsTab.roundNum;
	allLaps.roundCountValue.innerHTML = `0`

	allLaps.lapCountText.innerHTML = textStrings.allLapsTab.lapNum;
	allLaps.lapCountValue.innerHTML = `0`

	allLaps.lapStartText.innerHTML = textStrings.allLapsTab.lapStart
	allLaps.lapStartValue.innerHTML = `00:00:00`

	allLaps.lapEndText.innerHTML = textStrings.allLapsTab.lapEnd
	allLaps.lapEndValue.innerHTML = `00:00:00`


	allLaps.lapTimeText.innerHTML = textStrings.allLapsTab.lapTime
	allLaps.lapTimeValue.innerHTML = `0:00.000`


	const pilots = getPilotsStats();			//список пилотов

	let heat;
	let averageLineValueString;

	pilots.forEach(element => {			//тут среди пилотов по имени ищем данные нужного нам
		if (element.name == name) {
			averageLineValueString = element.averageLap;			//записываем средлний круг
			heat = element.heat			//записываем heat пилота
			return;
		}
	})


	const lapsData = getLapsByName(name, heat, false);			//берем все круги

	allLaps.slider.setAttribute("max", `${lapsData.length - 1}`);			//максимальные ползунковые движения
	allLaps.averageLine.innerHTML = `<span>${averageLineValueString}</span>`			//значение полоски среднего круга

	const lapsDataSorted = getLapsByName(name, heat, true);			//берем все круги сортированные, чтобы найти лучший
	const bestId = lapsDataSorted[0].lapId;			//id лучшего круга

	let bestConsecutivesId = []

	try {
		const consecutivesDataSorted = getConsecutivesByName(name, heat, true);			//берем все круги подряд сортированные, чтобы найти лучший
		bestConsecutivesId = consecutivesDataSorted[0].lapId;			//id лучшего consecutives
	} catch (error) {
		if (CONSOLE_DEBUG) console.log('Нет подряд');
	}


	const maxLinefloat = lapTimeConverter(averageLineValueString, 'float') * 2;
	const maxLineString = lapTimeConverter(maxLinefloat, 'string')
	allLaps.maxLine.innerHTML = `<span>${maxLineString}</span>`			//значени полоски максимального круга. Не максимального, а 2x среднего

	const averageLineValueFloat = lapTimeConverter(averageLineValueString, 'float')			//переводим среднее время во float

	const svgSecStep = (140) / (averageLineValueFloat);			//Тут считаем шаг секунды для svg графики


	allLaps.laps.append(allLaps.slider, allLaps.averageLine, allLaps.maxLine, allLaps.pseudoLap);			//тут добавляем во все все круги слайдер, псевдо круг, и 2 полоски

	allLaps.slider.style.gridColumn = `span ${lapsData.length + 1} `			//тут делаем полоски и слайдер шириной во все колонки
	allLaps.averageLine.style.gridColumn = `span ${lapsData.length + 1} `
	allLaps.maxLine.style.gridColumn = `span ${lapsData.length + 1} `

	for (let i = 0; i <= lapsData.length - 1; i++) {			//добавляем круги
		const currentTimeFloat = lapTimeConverter(lapsData[i].lapTime, 'float');			//время данного круга во float

		const startSvg = currentTimeFloat * svgSecStep;			//умножаем секунды на шаг для svg
		//тут записываем значения в svg разметку
		let color;
		if (lapsData[i].lapId == bestId) {
			color = '#66fcf1'
		} else if (bestConsecutivesId.indexOf(lapsData[i].lapId) != -1) {
			// color = '#ff0000'
			color = '#45a293'
		} else {
			// color = '#c5c6c7'
			color = '#324255'

		}

		const svg = `
		<span></span>
			<svg class=all-laps__lap-graph preserveAspectRatio="none" viewbox="0 0 8 280">
				<circle class=all-laps__lap-graph-obj fill=${color} r="4" cx="4" cy="${startSvg}" />
			</svg>
	`


		const lapElement = document.createElement('div');			//создаем элемент круга
		lapElement.classList.add('all-laps__lap');

		lapElement.innerHTML = svg;			//добавляем в него svg
		allLaps.laps.append(lapElement);		//закидываем его во все все круги

	}

	allLaps.allLaps.append(allLaps.container)
	allLaps.container.append(allLaps.tittle, allLaps.lapsArea, allLaps.buttons, allLaps.stats);
	allLaps.tittle.append(allLaps.tittleText, allLaps.exitBtn)
	allLaps.lapsArea.append(allLaps.laps, allLaps.solidAnimation);
	allLaps.buttons.append(allLaps.minus, allLaps.buttonsTittle, allLaps.plus)
	allLaps.stats.append(allLaps.roundCount, allLaps.lapCount, allLaps.lapStart, allLaps.lapEnd, allLaps.lapTime)
	allLaps.roundCount.append(allLaps.roundCountText, allLaps.roundCountValue)
	allLaps.lapCount.append(allLaps.lapCountText, allLaps.lapCountValue)
	allLaps.lapStart.append(allLaps.lapStartText, allLaps.lapStartValue)
	allLaps.lapEnd.append(allLaps.lapEndText, allLaps.lapEndValue)

	allLaps.lapTime.append(allLaps.lapTimeText, allLaps.lapTimeValue)

	return allLaps.allLaps
}


function writeLeaderboardHTML() {
	const leaderboard = {
		tab: document.createElement('div'),
		container: document.createElement('div'),
		buttons: document.createElement('div'),
		lapBtn: document.createElement('button'),
		consecutiveBtn: document.createElement('button'),
		countBtn: document.createElement('button'),
		averageBtn: document.createElement('button'),
		items: document.createElement('div'),
		item: document.createElement('div'),
	}

	const lapItem = {
		lap: document.createElement('div'),
		container: document.createElement('div'),
		items: document.createElement('div'),
		tittles: document.createElement('div'),
		tittlesName: document.createElement('div'),
		tittlesRound: document.createElement('div'),
		tittlesTime: document.createElement('div'),
	}
	const consecutiveItem = {
		consecutive: document.createElement('div'),
		container: document.createElement('div'),
		items: document.createElement('div'),
		tittles: document.createElement('div'),
		tittlesName: document.createElement('div'),
		tittlesRound: document.createElement('div'),
		tittlesTime: document.createElement('div'),
	}
	const countItem = {
		count: document.createElement('div'),
		container: document.createElement('div'),
		items: document.createElement('div'),
		tittles: document.createElement('div'),
		tittlesName: document.createElement('div'),
		tittlesStarts: document.createElement('div'),
		tittlesCounts: document.createElement('div'),
	}
	const averageItem = {
		average: document.createElement('div'),
		container: document.createElement('div'),
		items: document.createElement('div'),
		tittles: document.createElement('div'),
		tittlesName: document.createElement('div'),
		tittlesStarts: document.createElement('div'),
		tittlesLaps: document.createElement('div'),
		tittlesAverage: document.createElement('div'),
	}

	leaderboard.tab.classList.add('leaderboard', 'tab')
	leaderboard.container.classList.add('leaderboard__container', '_container', 'tab-items')
	leaderboard.buttons.classList.add('leaderboard__buttons', '_buttons-wrapper')
	leaderboard.lapBtn.classList.add('leaderboard__lap-button', '_button', '_leaderboard-buttons')
	leaderboard.consecutiveBtn.classList.add('leaderboard__consecutive-button', '_button', '_leaderboard-buttons')
	leaderboard.countBtn.classList.add('leaderboard__count-button', '_button', '_leaderboard-buttons')
	leaderboard.averageBtn.classList.add('leaderboard__average-button', '_button', '_leaderboard-buttons')
	leaderboard.items.classList.add('leaderboard__items')


	lapItem.lap.classList.add('leaderboard-lap', 'leaderboard__item')
	lapItem.container.classList.add('leaderboard-lap__container', '_container')
	lapItem.items.classList.add('leaderboard-lap__items')
	lapItem.tittles.classList.add('leaderboard-lap__tittles', '_leaderboard-tittles')
	lapItem.tittlesName.classList.add('leaderboard-lap__tittles-name', '_stat-text')
	lapItem.tittlesRound.classList.add('leaderboard-lap__tittles-round', '_stat-text')
	lapItem.tittlesTime.classList.add('leaderboard-lap__tittles-time', '_stat-text')

	consecutiveItem.consecutive.classList.add('leaderboard-consecutive', 'leaderboard__item')
	consecutiveItem.container.classList.add('leaderboard-consecutive__container', '_container')
	consecutiveItem.items.classList.add('leaderboard-consecutive__items')
	consecutiveItem.tittles.classList.add('leaderboard-consecutive__tittles', '_leaderboard-tittles')
	consecutiveItem.tittlesName.classList.add('leaderboard-consecutive__tittles-name', '_stat-text')
	consecutiveItem.tittlesRound.classList.add('leaderboard-consecutive__tittles-round', '_stat-text')
	consecutiveItem.tittlesTime.classList.add('leaderboard-consecutive__tittles-time', '_stat-text')

	countItem.count.classList.add('leaderboard-count', 'leaderboard__item')
	countItem.container.classList.add('leaderboard-count__container', '_container')
	countItem.items.classList.add('leaderboard-count__items')
	countItem.tittles.classList.add('leaderboard-count__tittles', '_leaderboard-tittles')
	countItem.tittlesName.classList.add('leaderboard-count__tittles-name', '_stat-text')
	countItem.tittlesStarts.classList.add('leaderboard-count__tittles-starts', '_stat-text')
	countItem.tittlesCounts.classList.add('leaderboard-count__tittles-counts', '_stat-text')

	averageItem.average.classList.add('leaderboard-average', 'leaderboard__item')
	averageItem.container.classList.add('leaderboard-average__container', '_container')
	averageItem.items.classList.add('leaderboard-average__items')
	averageItem.tittles.classList.add('leaderboard-average__tittles', '_leaderboard-tittles')
	averageItem.tittlesName.classList.add('leaderboard-average__tittles-name', '_stat-text')
	averageItem.tittlesStarts.classList.add('leaderboard-average__tittles-starts', '_stat-text')
	averageItem.tittlesLaps.classList.add('leaderboard-average__tittles-laps', '_stat-text')
	averageItem.tittlesAverage.classList.add('leaderboard-average__tittles-average', '_stat-text')



	leaderboard.tab.append(leaderboard.container);
	leaderboard.container.append(leaderboard.buttons, leaderboard.items);
	leaderboard.buttons.append(leaderboard.lapBtn, leaderboard.consecutiveBtn, leaderboard.countBtn, leaderboard.averageBtn)
	leaderboard.lapBtn.innerHTML = textStrings.leaderboardTab.lap
	leaderboard.consecutiveBtn.innerHTML = textStrings.leaderboardTab.consecutive;
	leaderboard.countBtn.innerHTML = textStrings.leaderboardTab.totalLaps;
	leaderboard.averageBtn.innerHTML = textStrings.leaderboardTab.average;
	leaderboard.items.append(lapItem.lap, consecutiveItem.consecutive, countItem.count, averageItem.average)

	lapItem.lap.append(lapItem.container);
	lapItem.container.append(lapItem.items);
	lapItem.items.append(lapItem.tittles);
	lapItem.tittles.append(lapItem.tittlesName, lapItem.tittlesRound, lapItem.tittlesTime);
	lapItem.tittlesName.innerHTML = textStrings.leaderboardTab.name
	lapItem.tittlesRound.innerHTML = textStrings.leaderboardTab.round
	lapItem.tittlesTime.innerHTML = textStrings.leaderboardTab.time

	consecutiveItem.consecutive.append(consecutiveItem.container);
	consecutiveItem.container.append(consecutiveItem.items);
	consecutiveItem.items.append(consecutiveItem.tittles);
	consecutiveItem.tittles.append(consecutiveItem.tittlesName, consecutiveItem.tittlesRound, consecutiveItem.tittlesTime);
	consecutiveItem.tittlesName.innerHTML = textStrings.leaderboardTab.name
	consecutiveItem.tittlesRound.innerHTML = textStrings.leaderboardTab.round
	consecutiveItem.tittlesTime.innerHTML = textStrings.leaderboardTab.time

	countItem.count.append(countItem.container);
	countItem.container.append(countItem.items);
	countItem.items.append(countItem.tittles);
	countItem.tittles.append(countItem.tittlesName, countItem.tittlesStarts, countItem.tittlesCounts);
	countItem.tittlesName.innerHTML = textStrings.leaderboardTab.name
	countItem.tittlesStarts.innerHTML = textStrings.leaderboardTab.starts
	countItem.tittlesCounts.innerHTML = textStrings.leaderboardTab.laps

	averageItem.average.append(averageItem.container);
	averageItem.container.append(averageItem.items);
	averageItem.items.append(averageItem.tittles);
	averageItem.tittles.append(averageItem.tittlesName, averageItem.tittlesLaps, averageItem.tittlesAverage);
	averageItem.tittlesName.innerHTML = textStrings.leaderboardTab.name
	averageItem.tittlesStarts.innerHTML = textStrings.leaderboardTab.starts
	averageItem.tittlesLaps.innerHTML = textStrings.leaderboardTab.laps
	averageItem.tittlesAverage.innerHTML = textStrings.leaderboardTab.time


	let lapArr = [];
	let consecutiveArr = [];
	let countArr = [];
	let averageArr = [];

	const pilots = getPilotsStats();
	if (CONSOLE_DEBUG) console.log('PILOT STAAATS', pilots);

	pilots.forEach(pilot => {
		if (pilot.laps) {


			let lapObj = {};
			let consecutiveObj = {};
			let countObj = {};
			let averageObj = {};
			const name = pilot.name;
			const heat = getHeat(pilot.name);


			let allLaps;
			lapObj.name = name;
			lapObj.lapRound = null;
			lapObj.LapTime = null;

			try {
				allLaps = getLapsByName(name, heat, true);
				lapObj.lapRound = allLaps[0].round;
				lapObj.LapTime = lapTimeConverter(allLaps[0].lapTime, 'float');
			} catch (error) {
				if (CONSOLE_DEBUG) console.log('Нет кругов', error);
			}



			let allConsecutives;
			consecutiveObj.name = name;
			consecutiveObj.consecutiveRound = null;
			consecutiveObj.consecutiveTime = null;

			try {
				allConsecutives = getConsecutivesByName(name, heat, true)
				consecutiveObj.consecutiveRound = allConsecutives[0].round;
				consecutiveObj.consecutiveTime = lapTimeConverter(allConsecutives[0].lapTime, 'float');
			} catch (error) {
				if (CONSOLE_DEBUG) console.log('Нет 3 подряд', error);
			}

			countObj.name = name;
			countObj.countStarts = pilot.starts;
			countObj.countLaps = pilot.laps;

			averageObj.name = name;
			averageObj.averageStarts = pilot.starts;
			averageObj.averageLaps = pilot.laps;
			averageObj.averageAverage = lapTimeConverter(pilot.averageLap, 'float');


			lapArr.push(lapObj);

			if (consecutiveObj.consecutiveTime) consecutiveArr.push(consecutiveObj);
			countArr.push(countObj);
			averageArr.push(averageObj);
		}
	})


	lapArr.sort((a, b) => +a.LapTime > +b.LapTime ? 1 : -1);
	consecutiveArr.sort((a, b) => +a.consecutiveTime > +b.consecutiveTime ? 1 : -1);

	countArr.sort((a, b) => +a.countLaps > +b.countLaps ? -1 : 1);
	averageArr.sort((a, b) => +a.averageAverage > +b.averageAverage ? 1 : -1);


	lapArr.forEach((element, index) => {
		const time = lapTimeConverter(+element.LapTime, 'string')

		const lapStroke = {
			item: document.createElement('div'),
			name: document.createElement('div'),
			round: document.createElement('div'),
			time: document.createElement('button'),
		}

		lapStroke.item.classList.add('leaderboard-lap__item', '_leaderboard-stroke');
		lapStroke.name.classList.add('leaderboard-lap__name', '_stat-value');
		lapStroke.round.classList.add('leaderboard-lap__round', '_stat-value');
		lapStroke.time.classList.add('leaderboard-lap__time', '_button-time');
		lapStroke.name.innerHTML = `<p>${index + 1}</p><p>${element.name}</p>`;
		lapStroke.round.innerHTML = element.lapRound;
		lapStroke.time.innerHTML = time;

		lapStroke.item.append(lapStroke.name, lapStroke.round, lapStroke.time)

		lapItem.items.append(lapStroke.item);
	})
	consecutiveArr.forEach((element, index) => {
		const time = lapTimeConverter(+element.consecutiveTime, 'string');

		const consecutiveStroke = {
			item: document.createElement('div'),
			name: document.createElement('div'),
			round: document.createElement('div'),
			time: document.createElement('button'),
		}

		consecutiveStroke.item.classList.add('leaderboard-consecutive__item', '_leaderboard-stroke');
		consecutiveStroke.name.classList.add('leaderboard-consecutive__name', '_stat-value');
		consecutiveStroke.round.classList.add('leaderboard-consecutive__round', '_stat-value');
		consecutiveStroke.time.classList.add('leaderboard-consecutive__time', '_button-time');
		consecutiveStroke.name.innerHTML = `<p>${index + 1}</p><p>${element.name}</p>`;
		consecutiveStroke.round.innerHTML = element.consecutiveRound;
		consecutiveStroke.time.innerHTML = time;
		consecutiveStroke.item.append(consecutiveStroke.name, consecutiveStroke.round, consecutiveStroke.time)

		consecutiveItem.items.append(consecutiveStroke.item);

	})

	countArr.forEach((element, index) => {
		const countStroke = {
			item: document.createElement('div'),
			name: document.createElement('div'),
			starts: document.createElement('div'),
			count: document.createElement('div'),
		}

		countStroke.item.classList.add('leaderboard-count__item', '_leaderboard-stroke');
		countStroke.name.classList.add('leaderboard-count__name', '_stat-value');
		countStroke.starts.classList.add('leaderboard-count__starts', '_stat-value');
		countStroke.count.classList.add('leaderboard-count__count', '_stat-value');
		countStroke.name.innerHTML = `<p>${index + 1}</p><p>${element.name}</p>`;
		countStroke.starts.innerHTML = element.countStarts;
		countStroke.count.innerHTML = element.countLaps;
		countStroke.item.append(countStroke.name, countStroke.starts, countStroke.count)

		countItem.items.append(countStroke.item);

	})

	averageArr.forEach((element, index) => {
		const time = lapTimeConverter(+element.averageAverage, 'string');
		const averageStroke = {
			item: document.createElement('div'),
			name: document.createElement('div'),
			starts: document.createElement('div'),
			laps: document.createElement('div'),
			time: document.createElement('div'),
		}

		averageStroke.item.classList.add('leaderboard-average__item', '_leaderboard-stroke');
		averageStroke.name.classList.add('leaderboard-average__name', '_stat-value');
		averageStroke.starts.classList.add('leaderboard-average__starts', '_stat-value');
		averageStroke.laps.classList.add('leaderboard-average__laps', '_stat-value');
		averageStroke.time.classList.add('leaderboard-average__average', '_stat-value');

		averageStroke.name.innerHTML = `<p>${index + 1}</p><p>${element.name}</p>`;
		averageStroke.starts.innerHTML = element.averageStarts;
		averageStroke.laps.innerHTML = element.averageLaps;
		averageStroke.time.innerHTML = time;

		averageStroke.item.append(averageStroke.name, averageStroke.laps, averageStroke.time)

		averageItem.items.append(averageStroke.item);

	})



	if (CONSOLE_DEBUG) console.log(leaderboard.tab);
	return leaderboard.tab;
}






function getRoundsByHeats() {
	const heatsObj = {};

	// let heats;

	// const fullData = mainObj;
	// for (objStroke in fullData) {
	// 	if (objStroke == 'heats') {
	// 		heats = fullData[objStroke];
	// 	} else if (fullData[objStroke].heats) {
	// 		heats = fullData[objStroke].heats
	// 	}
	// }

	const classHeats = mainObj.heats_by_class[currentClass];
	const heats = mainObj.heats;


	for (let heat in heats) {

		if (classHeats.includes(+heat)) {

			const rounds = []
			const heatNum = heat;
			const heatRounds = heats[heat].rounds;
			heatRounds.forEach(round => {
				rounds.push(round.id);
			})
			heatsObj[heatNum] = rounds;
		}
	}

	return heatsObj;

}

function getTabsRounds() {
	const heatObj = getRoundsByHeats();
	const tabsRounds = []

	for (let heat in heatObj) {
		const tabObj = {};
		tabObj.name = `heat-${heat} `
		tabObj.opened = false;
		tabObj.element = document.querySelector(`.rounds__rounds-heat-${heat}`)

		tabsRounds.push(tabObj)
	}

	return tabsRounds;
}

function writeRoundsHTML() {
	const rounds = {
		rounds: document.createElement('div'),
		container: document.createElement('div'),
		buttons: document.createElement('div'),
		items: document.createElement('div'),
	}
	rounds.rounds.classList.add('rounds', 'tab')
	rounds.container.classList.add('tab-items', '_container', 'rounds__container')
	rounds.buttons.classList.add('rounds__buttons', '_buttons-wrapper')
	rounds.items.classList.add('rounds__items')

	const heatsObj = getRoundsByHeats();

	// Будем сортировать Heatы по надписи display name
	let heatNamesArr = [];			//Сюда добавим heatId и Displayname, по которому будем сортирвать

	for (let heat in heatsObj) {
		const obj = {};
		obj.name = mainObj.heats[heat].displayname;
		obj.heatNum = heat
		heatNamesArr.push(obj)
	}

	const heatNamesArrSorted = heatNamesArr.sort((a, b) => {
		let firstDisplayName = a.name;
		let secondDisplayName = b.name;

		const firstArr = firstDisplayName.match(/\d+/g)			//Вытаскиваем из названия число или 2числа
		const secondArr = secondDisplayName.match(/\d+/g)
		const first = firstArr.join('')				//Соединяем, но не суммируем
		const second = secondArr.join('')

		return first - second;
	})


	let heatsIdsSorted = [];			//Сюда добавим сортированные heatId из heatNamesArrSorted;

	for (let heat in heatNamesArrSorted) {
		heatsIdsSorted.push(heatNamesArrSorted[heat].heatNum);
	}





	// for (let heat in heatsObj) {

	heatsIdsSorted.forEach(heatNum => {


		const heatButton = document.createElement('button');
		const heatClassString = `rounds__heat-${heatNum}`


		let groupName;
		try {
			const displayName = mainObj.heats[heatNum].displayname;
			groupName = displayName;
		} catch (error) {
			groupName = `${textStrings.roundsTab.heat} ${heatNum}`;
		}

		// const heatTextString = `Группа ${ heat } `;
		heatButton.classList.add('rounds__heat', '_button', `${heatClassString}`)
		heatButton.innerHTML = groupName;
		rounds.buttons.append(heatButton)


		const roundsElement = document.createElement('div')
		const roundsContainer = document.createElement('div')
		const roundsClassString = `rounds__rounds-heat-${heatNum}`
		roundsElement.classList.add('rounds__rounds', `${roundsClassString}`)
		roundsContainer.classList.add('rounds__rounds-container', '_container')
		rounds.items.append(roundsElement);
		roundsElement.append(roundsContainer);

		const roundsArr = heatsObj[heatNum];
		roundsArr.forEach(round => {
			const roundElement = document.createElement('button');
			roundElement.classList.add('rounds__item', '_button')
			roundElement.innerHTML = `${textStrings.roundsTab.round} ${round} `
			roundsContainer.append(roundElement);
		})

	})
	// }


	if (CONSOLE_DEBUG) console.log('rounds.itemsrounds.items', rounds.items);

	rounds.rounds.append(rounds.container)
	rounds.container.append(rounds.buttons, rounds.items)
	if (CONSOLE_DEBUG) console.log('ROUNDS', rounds.rounds);
	return rounds.rounds
}


//находим выбранный круг getLap=current, или все круги раунда по выбранному кругу getLap=other;
//lapOrConsecutive - выбранный один или подряд
//targetTime - выбранный круг
function getLapData(targetTime, lapOrConsecutive, name, heat, getLap) {
	let lapData;
	let lapsData;
	let otherLapData = [];
	const singleLapsData = getLapsByName(name, heat, true);		//находим все круги по имени для дальнейшего отбора otherLaps
	if (lapOrConsecutive == 'lap') {
		lapsData = singleLapsData;			//находим все круги для сравнение с выбранным(когда выбранный 'один круг' - это тоже самое, что все круги для отбора otherLaps)
	} else if (lapOrConsecutive == 'consecutive') {
		lapsData = getConsecutivesByName(name, heat, true);			//находим все круги для сравнение с выбранным(круги подряд)
	}
	lapsData.forEach((lap, index) => {
		// if(CONSOLE_DEBUG)console.log('I T E R A T I O N', index);
		if (lap.lapTime == targetTime) {			//перебирая все круги ищем совпадение по времени;
			lapData = lap;			//объект выбранного круга
			// if(CONSOLE_DEBUG)console.log('N A S H E L');
			if (getLap == 'current') return;			//если нам нужно вернуть выбранный круг - уходим

			singleLapsData.forEach(lap => {			//перебираем все круги и ищем совпадение по round с выбранным для otherLap
				if (CONSOLE_DEBUG) console.log('O T H E R L A P S');
				if (lap.round == lapData.round) {
					otherLapData.push(lap);			//добавляем найденный в массив otherLap
				}
			})
			if (CONSOLE_DEBUG) console.log('L A P = NE LAP');
		}
		if (CONSOLE_DEBUG) console.log('L A P D A T A');
	})
	if (CONSOLE_DEBUG) console.log('F I N A L R E T U R N');

	if (getLap == 'current') {			//возвращаем нужные значение
		return lapData;
	} else {
		otherLapData.sort((a, b) => a.lapIndex > b.lapIndex ? 1 : -1);
		return otherLapData;
	}


	// на потом придумать как сделать остановку, когда находится нужный круг
}



function getAnimationDurationTime(element) { // время анимации
	const time = parseFloat(getComputedStyle(element).animationDuration) * 1000;
	return time;
}
function getTransitionDurationTime(element) { //Время перехода
	const time = parseFloat(getComputedStyle(element).transitionDuration) * 1000;
	return time;
}


function smoothTextChange(elementToChange, text) { // исчезновление и появление текста
	elementToChange.style.color = 'rgba(255,255,255,0.0)'
	setTimeout(() => {
		elementToChange.innerHTML = text;
		elementToChange.style.color = null;
	}, getTransitionDurationTime(elementToChange));
}



function getRoundsStats(heat) {
	const data = mainObj.heats[heat].rounds;
	return data;
}


function getPilotsStats() {			//здесь список пилотов
	const fullData = mainObj;


	const classes = fullData.classes;

	// for (classNum in classes) {
	// 	currentClass = classNum;
	// 	if(CONSOLE_DEBUG)console.log('classesclasses', classes);
	// }



	const data = fullData.classes[currentClass].leaderboard.by_race_time;


	if (CONSOLE_DEBUG) console.log('datadatadata', data);

	let pilots = [];
	data.forEach(function (pilot) {
		pilotInfo = {}

		pilotInfo.averageLap = pilot.average_lap;
		pilotInfo.laps = pilot.laps;
		pilotInfo.starts = pilot.starts;
		pilotInfo.totalTime = pilot.total_time_laps;

		// try {
		// 	pilotInfo.heat = pilot.consecutives_source.heat;
		// } catch (error) {
		// 	if(CONSOLE_DEBUG)console.log(`Нет информации по heat для ${ pilot.callsign } `, error);
		// 	pilotInfo.heat = 0;
		// }

		pilotInfo.name = pilot.callsign;
		if (pilotInfo.laps) {
			pilots.push(pilotInfo);
		}
	})


	return pilots;
}


function getDateinfo(dateOrTime) {			//берем дату для заголовка
	try {			//try catch для момета, если даты там не будет...

		let dateString;

		const fullData = mainObj;
		for (objStroke in fullData) {
			if (objStroke == 'heats') {
				const heatsStroke = fullData[objStroke];
				dateString = heatsStroke[1].rounds[0].start_time_formatted
			} else if (fullData[objStroke].heats) {
				const heatsStroke = fullData[objStroke].heats
				dateString = heatsStroke[1].rounds[0].start_time_formatted
			}
		}



		// const dateString = mainObj.heats[1].rounds[0].start_time_formatted;			//string дата из первого раунда

		let year;
		let mounth;
		let day;
		let time;
		if (CONSOLE_DEBUG) console.log('ДАТА', dateString);

		// let monthArr;
		// if (language == 'ru') {
		// 	monthArr = ['января', 'феваля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

		// } else if (language == 'en') {
		// 	monthArr = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
		// }

		if (dateString) {			//Если дату нашли
			year = `${[...dateString].splice(0, 4).join('')} года`;			//Год первые 4 цифры и слово 'года'
			const monthNum = [...dateString].splice(5, 2).join('');			//номер месяца
			day = [...dateString].splice(8, 2).join('');			//число
			time = `${[...dateString].splice(11, 2).join('')}:00`;			//Час времени

			mounth = textStrings.monthsNames[parseInt(monthNum) - 1];			//меняем номер месяца на название

		} else {			//Если врдуг мы нашли дату, но она undefined;
			day = 'Дата ';
			mounth = 'не определена';
			year = '';
			time = 'Время не определено'
		}


		if (dateOrTime == 'day') {			//вовзрааем строку дня и месяца, или же 'Не определена'
			const date = `${day} ${mounth} `
			return date;
		}
		if (dateOrTime == 'year') {			//возвращаем строку года или пустую строку
			const yearString = `${year} `
			return yearString
		}

		if (dateOrTime == 'time') {			//Возвращаем время или 'не определено'
			return time;
		}
	} catch (error) {
		if (CONSOLE_DEBUG) console.log('Ошибка при формировании даты', error);
	}
}



function getLapsByName(name, noNeed, sorted) {

	/*  //Это было для файла, который не Results. Искали Heat. Теперь не надо.
	let data;
	const fullData = mainObj;
	
	for (objStroke in fullData) {
		if (objStroke == 'heats') {
			const heatsStroke = fullData[objStroke];
			data = heatsStroke[heat].rounds
		} else if (fullData[objStroke].heats) {
			const heatsStroke = fullData[objStroke].heats
			data = heatsStroke[heat].rounds
		}
	}
		*/


	// const data = mainObj.heats[heat].rounds;			//Когда искали в Heat, ниже будем искать во всех Heatах

	const heatsData = mainObj.heats;

	//Тут будет переменная для Heatов класса;
	const classHeats = mainObj.heats_by_class[currentClass];

	let allLapsFloat = [];
	let allLapsTime = [];
	let allLapsData = [];
	let allLapsDataSorted = [];

	let allRoundsData = [];		//Вместо раундов в одном Heatе, найдем все все раунды из всех heatов.

	for (heat in heatsData) {



		if (classHeats.includes(+heat)) {
			const heatName = heatsData[heat].displayname;
			const rounds = heatsData[heat].rounds;
			rounds.forEach(function (round) {
				round.heatName = heatName;
				round.heatId = heat;
				allRoundsData.push(round);
			})
		}
	}
	if (CONSOLE_DEBUG) console.log('allRounsData', allRoundsData);




	allRoundsData.forEach(function (round) { //Заходим в каждый раунд
		const node = round.nodes
		const roundStartTime = round.start_time_formatted;
		const roundStartTimeSpread = [...roundStartTime];
		roundStartTimeSpread.splice(0, 11);
		roundStartTimeSpread.splice(8, 4);
		const roundStartTimeFormated = roundStartTimeSpread.join('');

		let currentRound;
		if ((round.heatName.includes('Round')) || (round.heatName.includes('Раунд')) || (round.heatName.includes('round')) || (round.heatName.includes('раунд'))) {
			currentRound = round.heatName
		} else {
			currentRound = `${round.heatName} / ${textStrings.roundsTab.round} ${round.id}`
		}
		node.forEach(function (node) {	// Находим там ноду
			if (node.callsign == name) {	// в Ноде ищем определенного пилота
				const laps = node.laps		// и ищем его круги
console.log('lapslapslaps',laps);

				let lapCount;		//переменная чтобы считать круги
				let previousLapTime;			//Переменная для хранения предыдущего времени круга
				let previousLapTimeStart;			//переменная для хранения старта предущего круга

				laps.forEach(function (lap, index) {
					const lapDataObj = {};
					if (index == 0) {
						lapCount = 0;			//Начинаем считать круги заново, как только индекс круга 0

						const lapTimeSpread = [...lap.lap_time_formatted];
						lapTimeSpread.splice(0, 2);
						const lapFloat = parseFloat(lapTimeSpread.join(''));
						previousLapTime = lapFloat.toFixed(3);			//здесь начинаем брать Hole Shot за время предыдущего круга
						previousLapTimeStart = roundStartTimeFormated;
					}

					if (lap.deleted == false && index > 0) {			// отсекаем  Hole Shot и удаленные круги;
						lapDataObj.round = currentRound;			//Название раунда, который строка в роторхазарде
						lapDataObj.roundId = round.id;			//Id раунда
						lapDataObj.heatId = round.heatId;
						lapDataObj.roundTimeStart = roundStartTimeFormated;
						lapDataObj.lapId = lap.id;  			//Добавляем ID круга в глобальный объект по кругам
						const lapIndex = [++lapCount]; //Делаем массив из одного, чтобы одинаково считать 1 и подряд
						lapDataObj.lapIndex = lapIndex  //Добавляем Номер круга в раунде в глобальный объект по кругам
						lapDataObj.lapTimeStart = timeSumer(previousLapTimeStart, previousLapTime);			//Выставляем время старта круга
						lapDataObj.lapTime = lap.lap_time_formatted;			//Берем время
						const lapTimeSpread = [...lapDataObj.lapTime];			//Делим цифру на знаки
						const minute = lapTimeSpread.shift();			//Первую цифру времени удаляем, и записываем как минуту

						lapTimeSpread.shift();			//Тут удаляем двоеточие

						const lapFloat = parseFloat(lapTimeSpread.join(''));			//Здесь воссоединяем цифры без минут
						let fullLapFixed;
						if (minute > 0) {
							const fullLap = lapFloat + (60 * minute);
							fullLapFixed = fullLap.toFixed(3);
							allLapsFloat.push(fullLapFixed); // Записываем с минутами
						} else {
							const fullLap = lapFloat;
							fullLapFixed = fullLap.toFixed(3);
							allLapsFloat.push(fullLapFixed);		//Записываем без минут
						}
						lapDataObj.lapTimeEnd = timeSumer(lapDataObj.lapTimeStart, fullLapFixed);

						allLapsData.push(lapDataObj);		//добавляем созданый в этой итерации объект в массив
						previousLapTime = allLapsFloat[allLapsFloat.length - 1];			//Берем последние значения времени круга и старта круга из массива, как предыдущие значения
						previousLapTimeStart = allLapsData[allLapsData.length - 1].lapTimeStart;
					}
				})
			}
		})
	})


	if (sorted == false) {
		if (CONSOLE_DEBUG) console.log('allLapsData', allLapsData);

		return allLapsData;			//Возвращаем сортировкой по раундам
	} else {

		allLapsFloat.sort((a, b) => a - b);			//Сортировка по лучшим кругам, значения Float

console.log('FLOAT',allLapsFloat);

		allLapsTime = fromFloatToString(allLapsFloat);			//превращаем Float в человечиские цифры в виде String
console.log('allLapsTime',allLapsTime);



		let previousLapId = [];
		allLapsTime.forEach((element) => {		//Тут перебираем массив, где лежит сортированное человеческое время
			const currentLapTime = element;

			allLapsData.forEach(element => {			//тут перебираем массив, где лежат объекты кругов

				if ((element.lapTime == currentLapTime) && (previousLapId.indexOf(element.lapId)) == -1) {			//ждём, когда в массиве объектов найдётся элемент, где совпадает сортированное время и смотрим, чтобы не совпадал Id;
					allLapsDataSorted.push(element);			//найденный массив записыаем в новый массив
					previousLapId.push(element.lapId)		// сюда добавляем LapId, чтобы знать, какие круги уже есть в массиве;
					return;
				}
			})
		})


		return allLapsDataSorted;			//Возвращаем сортировкой по времени
	}
}




function getRound(roundNum, heatNum) {
	let roundPilotsLaps = [];			//массив пилотов, где хранятся объекты с кругами по пилотам
	let lapsCount = [];			//тут количество кругов каждого пилота, чтобы найти максимальные круги за раунд
	const allPilots = getPilotsStats();			//инфа по пилотам


	const currentRoundNodes = mainObj.heats[heatNum].rounds[roundNum - 1].nodes				//Ищем записи данного раунда


	const currentRoundPilotsCallsigns = [];			//вытащим из записей имена пилотов
	currentRoundNodes.forEach(function (node) {
		currentRoundPilotsCallsigns.push(node.callsign)
	})



	const roundInfo = {};			//инфа раунда
	roundPilotsLaps.push(roundInfo)			//добавялем инфу раунда в массив



	let heatPilots = [];					// выбираем пилотов нужной группы
	currentRoundPilotsCallsigns.forEach(function (name) {
		allPilots.forEach(function (pilot) {
			if (pilot.name == name) heatPilots.push(pilot)
		})
	})



	heatPilots.forEach(element => {			//проходимся по каждому пилоту
		const allLapsData = getLapsByName(element.name, heatNum, false);
		// if(CONSOLE_DEBUG)console.log('allLapsData---allLapsData', allLapsData);

		const roundLaps = allLapsData.filter(element => {			//избираем круги только нужного раунда
			return (element.roundId == roundNum) && (element.heatId == heatNum)
		})
		if (CONSOLE_DEBUG) console.log('roundLapsroundLaps--------===============================', roundLaps);


		if (roundLaps.length > 0) {			//Если круги есть в этом раунде у этого пилота, то....
			let currentRound;
			if ((roundLaps[0].round.includes('Round')) || (roundLaps[0].round.includes('Раунд')) || (roundLaps[0].round.includes('round')) || (roundLaps[0].round.includes('раунд'))) {
				currentRound = roundLaps[0].round
			} else {
				currentRound = `${roundLaps[0].round} / Раунд ${roundLaps[0].roundId}`
			}
			roundInfo.round = currentRound;
			roundInfo.roundStart = roundLaps[0].roundTimeStart;			//добавляем в инфу раунда время начало раунда

			const holeSHot = getHoldeShot(element.name, heatNum, roundNum);			//ищем круг до старта
			roundLaps.unshift(holeSHot);			//добавляем пустой круг в начало массива
			roundLaps.push(element.name);			//добавляем имя пилота в конец массива
			roundPilotsLaps.push(roundLaps);			//добавляем получившийся массив в общий массив по раунду

			lapsCount.push(roundLaps.length - 2);			//добавляем количество кругов в массив количества кругов
		}
	})


	roundInfo.maxLaps = Math.max(...lapsCount);			//ищем максимальное количество кругов и добавляем в инфу по раунду;
	if (CONSOLE_DEBUG) console.log('roundInfo=-===========================================,roundInfo', roundInfo);




	//тут будем сортировать по 3 лучшим кругам + holeshot
	// if(CONSOLE_DEBUG)console.log('roundPilotsLaps-------------------------------------------roundPilotsLaps', roundPilotsLaps);

	let roundPilotsLapsSortedNames = [];
	let fullTimePilots = [];			//сюда добавим фулл время и имена пилотов;
	let fullTimes = [];			//сюда добавим только фулл время;
	roundPilotsLaps.forEach(function (pilot, index) {
		if (index != 0) {
			let lapsTimeFloat = [];			//Массив, где все времена во float 1 пилот;
			lapsTimeFloat.push(+lapTimeConverter(pilot[0], 'float'));				//Добавляем Hole shot

			for (let i = 1; i <= consecutivesCount; i++) {				//Добавляем 3 круга (3 через consecutivesCount)
				try {
					lapsTimeFloat.push(+lapTimeConverter(pilot[i].lapTime, 'float'))
				} catch (error) {				//Если нет 3х кругов, то добавялем 1000 секунд
					lapsTimeFloat.push(1000)
				}
			}

			let pilotFullTimeArr = [];			//Здесь будет фулл время и имя пилота;
			let pilotFullTimeFloat = 0;			//переменная для фулл время, добавится в массив;

			lapsTimeFloat.forEach(function (lapTime) {				//складываем все времена в массиве;
				pilotFullTimeFloat += lapTime;
			})

			pilotFullTimeArr.push(pilotFullTimeFloat, pilot[pilot.length - 1])			//добавляем фулл время и имя;

			fullTimePilots.push(pilotFullTimeArr);
			fullTimes.push(pilotFullTimeFloat);
		}
	})

	const fullTimesSorted = fullTimes.sort((a, b) => a - b);			//Сортируем время;

	fullTimesSorted.forEach(function (time) {				//Проходимся по каждому времени и находим совпадение другом массиве с именем
		fullTimePilots.forEach(function (pilot) {
			if (pilot[0] == time) roundPilotsLapsSortedNames.push(pilot[1])			//Записываем найденое имя в новый массив;
		})
	})
	// if(CONSOLE_DEBUG)console.log('fullTimePilots-------------------------------fullTimePilots', fullTimePilots,);
	// if(CONSOLE_DEBUG)console.log('fullTimes-----------------------fullTimes', fullTimesSorted);
	// if(CONSOLE_DEBUG)console.log('roundPilotsLapsSortedNames------------roundPilotsLapsSortedNames', roundPilotsLapsSortedNames);

	let roundPilotsLapsSorted = [];

	roundPilotsLapsSorted.push(roundPilotsLaps[0]);

	roundPilotsLapsSortedNames.forEach(function (name) {
		roundPilotsLaps.forEach(function (pilot, index) {
			if (index != 0) {
				if (pilot[pilot.length - 1] == name) roundPilotsLapsSorted.push(pilot)
			}
		})

	})

	if (CONSOLE_DEBUG) console.log('roundPilotsLapsSortedroundPilotsLapsSortedroundPilotsLapsSortedroundPilotsLapsSorted', roundPilotsLapsSorted);


	return roundPilotsLapsSorted;

}

function getConsecutivesByName(name, heat, sorted) {


	let consecutivesCount;
	if (mainObj.consecutives_count) {
		consecutivesCount = mainObj.consecutives_count;
	} else {
		consecutivesCount = 3;
	}

	const allLapsData = getLapsByName(name, heat, false);
	let allConsecutivesFloat = [];
	let allConsecutivesTime = [];
	let allConsecutivesData = [];			//Переменная с конечным массивом всех 3 кругов
	let allConsecutivesDataSorted = [];			//А это сортированный
	let consecutiveId = 0;
	allLapsData.forEach((element, index) => {
		let consecutiveDataObj = {};			//Создаем объект, в котором будет хранится инфа по 3 кругам

		if (element.lapIndex >= consecutivesCount) {			//если номер круга больше чем количество Consecutives, значит сработали круги подряд;

			const lapsIndexArr = [];
			const lapsIdArr = [];
			const lapsData = [];
			const lapsTime = [];
			for (let i = 0; i < consecutivesCount; i++) {
				lapsIndexArr.unshift(allLapsData[index - i].lapIndex);
				lapsData.unshift(allLapsData[index - i]);
				lapsTime.unshift(allLapsData[index - i].lapTime);
				lapsIdArr.unshift(allLapsData[index - i].lapId)
			}


			consecutiveDataObj.consecutiveId = consecutiveId;			//Новое значение - уникальный номер подряд кругов
			consecutiveDataObj.round = element.round;			//Раунд, в котором произошел consecutives
			consecutiveDataObj.roundId = element.roundId;
			consecutiveDataObj.heatId = element.heatId;

			consecutiveDataObj.lapIndex = lapsIndexArr;			//Номера кругов в раунде
			consecutiveDataObj.lapId = lapsIdArr;				//номер Id кругов
			consecutiveDataObj.roundTimeStart = element.roundTimeStart;
			consecutiveDataObj.lapTimeStart = allLapsData[index - (consecutivesCount - 1)].lapTimeStart;			//Начало consecutives
			consecutiveDataObj.lapTime = lapTimeSumer(lapsTime, true);			//Записываем форматированное время в объект
			const float = lapTimeSumer(lapsTime, false);			//Берем Float время
			consecutiveDataObj.lapTimeEnd = timeSumer(consecutiveDataObj.lapTimeStart, float.toFixed(3));
			allConsecutivesFloat.push(float.toFixed(3))			//и записываем его в формате строки, чтобы 3 знака
			consecutiveDataObj.lapsData = lapsData;

			allConsecutivesData.push(consecutiveDataObj);
			consecutiveId++;
		}
	})

	if (sorted == false) {
		return allConsecutivesData;			//Возварщаем сортировкой по раундам
	} else {


		allConsecutivesFloat.sort((a, b) => a - b);			//Сортировка по лучшим кругам, значения Float

		allConsecutivesTime = fromFloatToString(allConsecutivesFloat);			//превращаем Float в человечиские цифры в виде String



		let previousLapsId = [];

		allConsecutivesTime.forEach((element) => {		//Тут перебираем массив, где лежит сортированное человеческое время
			const currentLapTime = element;
			allConsecutivesData.forEach((element, index) => {			//тут перебираем массив, где лежат объекты кругов
				if ((element.lapTime == currentLapTime) && (previousLapsId.indexOf(element.consecutiveId)) == -1) {			//ждём, когда в массиве объектов найдётся элемент, где совпадает сортированное время
					allConsecutivesDataSorted.push(element);			//найденный массив записываем в новый массив
					previousLapsId.push(element.consecutiveId);
					return;
				}
			})
		})
		return allConsecutivesDataSorted;			//Возвращаем сортировкой по времени;
	}
}

function getHoldeShot(name, heat, round) {
	if (CONSOLE_DEBUG) console.log('ИМЯяяя', name);

	let heats;

	const fullData = mainObj;
	for (objStroke in fullData) {
		if (objStroke == 'heats') {
			heats = fullData[objStroke];
		} else if (fullData[objStroke].heats) {
			heats = fullData[objStroke].heats
		}
	}


	const roundInfo = heats[heat].rounds[round - 1].nodes
	const roundByName = roundInfo.filter(element => {
		return element.callsign == name;
	})
	const holeShot = roundByName[0].laps[0].lap_time_formatted;
	return holeShot;
}

function timeSumer(previouseDate, previousLapTime) {			//посчитать время по дате и время круга;

	const previouseDateHour = +[...previouseDate].splice(0, 2).join('');
	const previouseDateMinutes = +[...previouseDate].splice(3, 2).join('');
	const previouseDateSecundes = +[...previouseDate].splice(6, 2).join('');

	let currentHour = previouseDateHour;
	let currentMinutes = previouseDateMinutes;
	let currentSecundes = Math.round(previouseDateSecundes + +previousLapTime);


	if (currentSecundes >= 60 && currentSecundes < 120) {
		currentMinutes += 1;
		currentSecundes = parseInt(currentSecundes - 60);
	} else if (currentSecundes >= 120 && currentSecundes < 180) {
		currentMinutes += 2;
		currentSecundes = parseInt(currentSecundes - 120);
	} else if (currentSecundes >= 180 && currentSecundes < 240) {
		currentMinutes += 3;
		currentSecundes = parseInt(currentSecundes - 180);
	}


	if (currentMinutes >= 60) {
		currentHour += 1;
		currentMinutes = parseInt(currentMinutes - 60);
	}
	if (currentHour >= 24) {
		currentHour = 0;
	}

	let hourString = currentHour;
	let minutesString = currentMinutes;
	let secundesString = currentSecundes;

	if (hourString < 10) hourString = `0${hourString}`;
	if (minutesString < 10) minutesString = `0${minutesString}`;
	if (secundesString < 10) secundesString = `0${secundesString}`;


	const lapStart = `${hourString}:${minutesString}:${secundesString}`

	return lapStart;
}


function lapTimeSumer(data = [], formfated) {			//посчитать несколько время кругов - для кругов подряд
	const lapsTime = data;
	const lapsTimeFloat = [];
	lapsTime.forEach(element => {			//В этом forEach записывает Float время в новый массив


		const lapTimeSpread = [...element];			//Делим цифру на знаки
		const minute = lapTimeSpread.shift();			//Первую цифру времени удаляем, и записываем как минуту

		lapTimeSpread.shift();			//Тут удаляем двоеточие

		const lapFloat = parseFloat(lapTimeSpread.join(''));			//Здесь воссоединяем цифры без минут

		if (minute > 0) {
			const fullLap = lapFloat + (60 * minute);
			const fullLapFixed = fullLap.toFixed(3);
			lapsTimeFloat.push(fullLapFixed); // Записываем с минутами
		} else {
			const fullLap = lapFloat;
			const fullLapFixed = fullLap.toFixed(3);
			lapsTimeFloat.push(fullLapFixed);		//Записываем без минут
		}
	})

	const consecutiveTimeFloat = lapsTimeFloat.reduce(function (a, b) {			//Складываем время в массиве
		return +a + +b
	})

	if (formfated == false) {			// тут время Float
		return consecutiveTimeFloat;
	} else {			//здесь время Человеческое
		let consecutiveMinute = 0;
		let consecutiveSecundes = +consecutiveTimeFloat;

		if (consecutiveSecundes >= 60 && consecutiveSecundes < 120) {
			consecutiveMinute = 1;
			consecutiveSecundes = consecutiveSecundes - 60;
		} else if (consecutiveSecundes >= 120 && consecutiveSecundes < 180) {
			consecutiveMinute = 2;
			consecutiveSecundes = consecutiveSecundes - 120;
		} else if (consecutiveSecundes >= 180 && consecutiveSecundes < 240) {
			consecutiveMinute = 3;
			consecutiveSecundes = consecutiveSecundes - 180;
		}


		if (consecutiveSecundes < 10) {
			return `${consecutiveMinute}:0${consecutiveSecundes.toFixed(3)}`
		} else {
			return `${consecutiveMinute}:${consecutiveSecundes.toFixed(3)}`
		}
	}
}


function fromFloatToString(array) {			//превращаем массив времени Float в массив человечиских цифр в виде String
	const allLapsTime = array.map((lap) => {
		if (lap < 60) {	
			if(lap<10){
				lap = `0:0${lap}`;
				return lap
			}
			lap = `0:${lap}`;
		} else if (lap >= 60 && lap < 120) {
			lapWithoutMinute = lap - 60;
			if (lapWithoutMinute < 10) {
				lap = `1:0${lapWithoutMinute.toFixed(3)}`;
			} else {
				lap = `1:${lapWithoutMinute.toFixed(3)}`;
			}
		} else {
			lapWithoutMinute = lap - 120;
			if (lapWithoutMinute < 10) {
				lap = `2:0${lapWithoutMinute.toFixed(3)}`;
			} else {
				lap = `2:${lapWithoutMinute.toFixed(3)}`;
			}
		}
		return lap;
	})
	return allLapsTime;
}




function allLapsShow(allLaps, allLapsButton, nameForSlider) {
	const element = {
		container: allLaps.firstElementChild,
		tittle: allLaps.querySelector('.all-laps__tittle'),
		lapsArea: allLaps.querySelector('.all-laps__laps-area'),
		solidAnimation: allLaps.querySelector('.all-laps__solid-animation'),
		slider: allLaps.querySelector('.all-laps__slider'),
		averageLine: allLaps.querySelector('.all-laps__average-line'),
		maxLine: allLaps.querySelector('.all-laps__max-line'),
		buttons: allLaps.querySelector('.all-laps__buttons'),
		stats: allLaps.querySelector('.all-laps__stats'),
	}
	allLapsButton.classList.add('_no-event');

	setTimeout(() => {		//удаляем классы 'скрыто'
		element.tittle.classList.remove('_hidden-tittle');
		element.buttons.classList.remove('_hidden-buttons');
		element.lapsArea.classList.remove('_hidden-vertical-stroke');
		element.slider.classList.remove('_hidden-slider');
	}, 500);

	setTimeout(() => {
		element.solidAnimation.classList.remove('_hidden-graph');
	}, 800);
	setTimeout(() => {
		element.solidAnimation.remove();
		element.averageLine.classList.remove('_hidden-horizontal-stroke')
		element.maxLine.classList.remove('_hidden-horizontal-stroke')
		if (CONSOLE_DEBUG) console.log('REMOVE');
		allLapsGraphChoosing(nameForSlider, '_active');

	}, 1400);
	setTimeout(() => {
		element.container.classList.remove('_no-event')
		allLapsButton.classList.remove('_no-event')
		element.lapsArea.classList.remove('_lock')
		element.stats.classList.remove('_hidden-stats');
	}, 1900);
}



function pilotsVsShow(allLaps) {
	const element = {
		container: allLaps.firstElementChild,
		tittle: allLaps.querySelector('.pilots-vs__tittle'),
		lapsArea: allLaps.querySelector('.pilots-vs__laps-area'),
		solidAnimation: allLaps.querySelector('.pilots-vs__solid-animation'),
		slider: allLaps.querySelector('.pilots-vs__slider'),
		averageLine: allLaps.querySelector('.pilots-vs__average-line'),
		maxLine: allLaps.querySelector('.pilots-vs__max-line'),
		buttons: allLaps.querySelector('.pilots-vs__scale-buttons'),
		stats: allLaps.querySelector('.pilots-vs__stats'),
	}

	setTimeout(() => {		//удаляем классы 'скрыто'
		element.tittle.classList.remove('_hidden-tittle');
		element.buttons.classList.remove('_hidden-buttons');
		element.lapsArea.classList.remove('_hidden-vertical-stroke');
		element.slider.classList.remove('_hidden-slider');
	}, 500);

	setTimeout(() => {
		element.solidAnimation.classList.remove('_hidden-graph');
	}, 800);
	setTimeout(() => {
		element.solidAnimation.remove();
		element.averageLine.classList.remove('_hidden-horizontal-stroke')
		element.maxLine.classList.remove('_hidden-horizontal-stroke')

	}, 1400);
	setTimeout(() => {

		element.container.classList.remove('_no-event')
		element.lapsArea.classList.remove('_lock')
		element.stats.classList.remove('_hidden-stats');
	}, 1900);
}

function roundShow(round, buttonRound) {

	const element = {
		container: round.firstElementChild,
		tittle: round.querySelector('.round__tittle'),
		graphArea: round.querySelector('.round__graph-area'),
		buttons: round.querySelector('.round__buttons'),
		exitBtn: round.querySelector('.round__exit-button'),
		slider: round.querySelector('.round__speed-slider'),


		playButton: round.querySelector('.round__play-button'),
		laps: round.querySelectorAll('.round__graph-area-lap-node'),
		names: round.querySelectorAll('.round__graph-area-name'),
	}

	buttonRound.classList.add('_no-event');			//запрещаем кнопку, где время

	setTimeout(() => {		//удаляем классы 'скрыто'
		element.buttons.classList.remove('_hidden-buttons');
		element.tittle.classList.remove('_hidden-tittle');
		element.graphArea.classList.remove('_hidden-graph-area');
		element.slider.classList.remove('_hidden-slider');
	}, 500);

	setTimeout(() => {
		element.names.forEach(name => {
			name.classList.remove('_hidden-graph-area-name')
		})
	}, 500);


	setTimeout(() => {
		let currentCount = 0;
		const maxCount = element.laps.length;
		const intervalTime = 80;
		let intervalFunction = setInterval(() => {			//полоски 'круги' Интервал чтобы поочереди
			element.laps[currentCount].classList.remove('_hidden-graph-area-lap-node');
			currentCount++;
			if (currentCount == maxCount) clearInterval(intervalFunction);
		}, intervalTime)
	}, 500);


	setTimeout(() => {
		element.container.classList.remove('_no-events')
		buttonRound.classList.remove('_no-event');
		element.buttons.classList.remove('_no-event')
		element.exitBtn.classList.remove('_no-event')
		element.playButton.classList.remove('_hidden-play-button');

		const paragraph = element.playButton.firstElementChild;
		textChange(paragraph, `<p>${textStrings.roundsTab.pause}</p>`, 150);
		startRound();
		roundPlayState = 'play';

	}, 1100);

}

function inRoundShow(inRound, buttonTime) {			//Анимация появления 'inRound'
	const element = {
		container: inRound.firstElementChild,
		tittle: inRound.querySelector('.in-round__tittle'),
		exitBtn: inRound.querySelector('.in-round__exit-button'),
		area: inRound.querySelector('.in-round__round-area'),
		areaLaps: inRound.querySelector('.in-round__round-area-laps'),
		laps: inRound.querySelectorAll('.in-round__lap'),
		nodes: inRound.querySelectorAll('.in-round__lap-node'),
		columns: inRound.querySelectorAll('.in-round__lap-column'),
		stats: inRound.querySelector('.in-round__stats'),
		addButton: inRound.querySelector('.in-round__to-round-button')
	}
	buttonTime.classList.add('_no-event');			//запрещаем кнопку, где время

	setTimeout(() => {		//удаляем классы 'скрыто'
		element.tittle.classList.remove('_hidden-tittle');
		element.stats.classList.remove('_hidden-stats');
		element.area.classList.remove('_hidden-horizontal-bar', '_hidden-vertical-bar');
	}, 500);

	setTimeout(() => {
		let currentCount = 0;
		const maxCount = element.laps.length;
		const intervalTime = 100;
		let intervalFunction = setInterval(() => {			//полоски 'круги' Интервал чтобы поочереди
			element.laps[currentCount].classList.remove('_hidden-vertical-stroke', '_hidden-text');
			currentCount++;
			if (currentCount == maxCount) clearInterval(intervalFunction);
		}, intervalTime)

	}, 500);

	setTimeout(() => {
		element.columns.forEach(column => {
			column.classList.remove('_hidden-columns')
		})
	}, 1300);

	setTimeout(() => {
		element.container.classList.remove('_no-events')
		buttonTime.classList.remove('_no-event');
		element.addButton.classList.remove('_no-event');
		element.exitBtn.classList.remove('_no-event');
	}, 1900);
}



function modalOnOff(element, flag) {			//включение и отключение модальных окон
	const container = element.firstElementChild;
	const bodyElement = document.body;

	const fullwidth = window.innerWidth;
	const bodyWidth = bodyElement.clientWidth;

	const modalOpened = document.querySelectorAll('.modal')

	if (flag) {
		element.classList.add('_active');
		container.classList.add('_active');
		bodyElement.classList.add('_lock')

		if (modalOpened.length == 1) {
			bodyElement.style.paddingRight = `${fullwidth - bodyWidth}px`
		}

	} else {
		element.classList.remove('_active');
		container.classList.remove('_active');
		if (modalOpened.length == 1) {
			setTimeout(() => {
				bodyElement.style.paddingRight = null;
				bodyElement.classList.remove('_lock');
			}, getTransitionDurationTime(element));
		}
	}
}



function spoilerButtonAnimation(button) {			//анимации кнопки Спойлер
	button.classList.add('_animation');
	button.classList.toggle('_active');
	setTimeout(() => {
		button.classList.remove('_animation');
	}, 200);
}


function spoilerOnOff(elementToOpen, buttonPushed) {			//открывание и закрывание спойлера
	buttonPushed.classList.add('_no-event');			//запрещаем нажатие кнопки
	if (elementToOpen.classList.contains('_active')) {
		const ElementHeight = elementToOpen.scrollHeight;			//считаем высоту открытого спойлера
		elementToOpen.style.maxHeight = `${ElementHeight}px`;		//добавляем его в Style
		elementToOpen.classList.remove('_active-height');			//тут удаляем fit-content, но из-за Style ничего не меняется
		setTimeout(() => {
			elementToOpen.style.maxHeight = null;			// а тут удаляем style, и он скрывается
			elementToOpen.classList.remove('_active');		//прозрачность добавляем
		}, 10);
	} else {
		elementToOpen.classList.add('_active');		//убираем прозрачность
		const ElementHeight = elementToOpen.scrollHeight;		//считаем скрытую высоту
		elementToOpen.style.maxHeight = `${ElementHeight}px`;		//добавялем её
		setTimeout(() => {
			elementToOpen.classList.add('_active-height')			//а тут добавляем fit-content, чтобы была адаптивная высота
		}, 520);
	}
	setTimeout(() => {
		buttonPushed.classList.remove('_no-event');			//разрешаем нажатие кнопки
	}, 520);
}


function lapNodeShow(node, column, time) {			//появление времени круга в 'inRound'
	let zIndex = 40;
	const allNode = document.querySelectorAll('.in-round__lap-node');
	const lap = column.parentNode;
	const lapLeft = lap.offsetLeft;
	const lapWidth = lap.offsetWidth;
	const columnHeight = column.offsetTop;
	if (CONSOLE_DEBUG) console.log(columnHeight);

	node.style.left = `${lapLeft + (lapWidth / 2)}px`;
	node.style.top = `${columnHeight}px`;

	allNode.forEach(node => {
		if (node.classList.contains('_active')) {
			zIndex++;
		}
	})

	node.classList.add('_active');
	node.style.zIndex = zIndex;
	setTimeout(() => {
		node.classList.remove('_active');
		node.style.zIndex = null;
	}, time);
}


// allLapsArea.addEventListener('mouseover', function (e) {
// 	const span = e.target.querySelector('span');
// 	if (e.target.closest('span')) {
// 		timeoutLapTime = setTimeout(() => {
// 			e.target.parentElement.classList.add('_active');
// 		}, 500);
// 	}
// })

// allLapsArea.addEventListener('mouseout', function (e) {
// 	const span = e.target.querySelector('span');
// 	if (e.target.closest('span')) {
// 		setTimeout(() => {
// 			clearTimeout(timeoutLapTime);
// 			e.target.parentElement.classList.remove('_active');
// 			if(CONSOLE_DEBUG)console.log(e.target.parentElement);
// 		}, 500);

// 	}
// })



function lapTimeShow(e) {
	if (e.target.closest('.all-laps__lap')) {
		const span = e.target.querySelector('span');
		span.classList.add('_active');
	}
}




function allLapsGraphScale(minusPlus) {			//масштабирование не самое удачое
	const buttons = {			//кнопки для блокирования нажатий
		all: document.querySelector('.all-laps__buttons'),
		minus: document.querySelector('.all-laps__minus'),
		plus: document.querySelector('.all-laps__plus'),
	}

	const averageLine = document.querySelector('.all-laps__average-line')			//цифры кругов
	const maxLine = document.querySelector('.all-laps__max-line')
	const averageValue = averageLine.querySelector('span')
	const maxValue = maxLine.querySelector('span')


	const laps = document.querySelectorAll('.all-laps__lap');			//каждый круг
	const allLaps = document.querySelector('.all-laps__laps');			//все все круги
	const allLapsArea = document.querySelector('.all-laps__laps-area');			//контейнер для всех всех кругов
	const pseudoLap = document.querySelector('.all-laps__pseudo-lap');			//пустой круг в начале - нужен для того, чтобы слайдер стоял ровно...
	const pseudoLapWidth = pseudoLap.offsetWidth;
	const finalLap = laps[laps.length - 1]			//последний круг, его ширина - ширина полоски span
	const finalLapWidth = finalLap.offsetWidth;
	const padding = parseInt(getComputedStyle(allLapsArea).paddingRight);			//отступ для контейнера
	const fullWidth = allLapsArea.offsetWidth - padding * 2;			//ширина контейнера
	let lapWidth = laps[0].offsetWidth;			//текущая ширина одного круга
	const scroll = allLapsArea.scrollLeft;			//текущее положение скроллла
	if (minusPlus == 'minus') {			//уменьшение масштаба
		const scaleStep = (lapWidth / 3);			//шаг уменьшения масштаба
		buttons.plus.classList.remove('_no-event')			//открываем кнопку ПЛЮС. иногда она может быть закрыта

		if ((lapWidth * (laps.length - 1) - scaleStep * (laps.length - 1)) > fullWidth) {			//если это уменьшение всё ещё больше, чем ширина контейнера

			let paddingScroll;			//переменные отступа и пустого круга, чтобы при 0 скролле никуда не перемещать
			let pseudoScroll;

			if (scroll) {
				paddingScroll = padding;
				pseudoScroll = pseudoLapWidth;
				averageValue.classList.add('_scroll');			//цифры кругов исчезают
				maxValue.classList.add('_scroll');
			} else {			//Если нет скролла, то отступы не считаем;
				paddingScroll = 0;
				pseudoScroll = 0;
			}

			const lapsHide = scroll / (lapWidth);			//считаем сколько кругов скрыто слева
			const scrollTo = scaleStep * lapsHide + paddingScroll + pseudoScroll;		//считаем увеличение ширины скрытых кругов слева, и плюс падинг и пустой круг
			buttons.all.classList.add('_no-event')			//блокируем кнопки


			allLaps.style.gridTemplateColumns = `7px repeat(${laps.length - 1},${lapWidth - scaleStep}px)7px`			//уменьшаем все все круги

			averageValue.style.transform = `translate(${scrollTo}px,0)`			//цифры кругов уходят влево
			maxValue.style.transform = `translate(${scrollTo}px,0)`
			allLaps.style.transform = `translate(${scrollTo}px,0)`			//перемещаем все все круги, чтобы они остались так же, как были

			setTimeout(() => {			//после анимации...
				allLaps.classList.add('_scroll')			//делаем transition 0s

				const scrollRightCompenstaion = allLaps.scrollWidth - allLapsArea.scrollLeft - allLaps.clientWidth;			//Если величина скролла больше, чем можно скролить - это вычтем

				allLaps.style.transform = null;			//удаляем перемещение

				if (scrollRightCompenstaion > 0) {
					allLapsArea.scrollBy(`-${scrollTo}`, 0);			//скроллим на величину перемещения
				} else {
					allLapsArea.scrollBy(`-${scrollTo + scrollRightCompenstaion}`, 0);			//скроллим на величину перемещения с вычетом компенсации
				}

				setTimeout(() => {
					averageValue.classList.remove('_scroll');			//цифры кругов появляются
					maxValue.classList.remove('_scroll');
					allLaps.classList.remove('_scroll');			//возвращаем transition time с небольшой задержкой для страховки
					buttons.all.classList.remove('_no-event')			//открывает возможность нажимать кнопки
				}, 25);
			}, 500);

		} else {			//если это уменьшение станет меньше, чем ширина контейнера, то...
			//делаем все все круги шириной контейнера,
			allLaps.style.gridTemplateColumns = `7px repeat(${laps.length - 1},${((fullWidth - pseudoLapWidth - finalLapWidth) / (laps.length - 1))}px)7px`
			buttons.minus.classList.add('_no-event')			//блокируем кнопку МИНУС, так как это финальное уменьшение
		}
	}


	if (minusPlus == 'plus') {			//увеличение масштаба
		const scaleStep = (lapWidth / 2);			//шаг увеличения
		buttons.minus.classList.remove('_no-event');			//открываем кнопку МИНУС. Иногда она может быть блокирована


		const slider = document.querySelector('.all-laps__slider');
		const lapsShow = fullWidth / (lapWidth + scaleStep);			//вычисляем, сколько сейчас влезает кругов в контейнер
		const lapChoosed = slider.value;			//круг, который выбран ползунком


		allLaps.style.gridTemplateColumns = `7px repeat(${laps.length - 1},${lapWidth + scaleStep}px)7px`			//увеличиваем все все круги

		if (scroll) {
			paddingScroll = padding;
			pseudoScroll = pseudoLapWidth;
			averageValue.classList.add('_scroll');
			maxValue.classList.add('_scroll');
		} else {			//Если нет скролла, то отступы не считаем;
			paddingScroll = 0;
			pseudoScroll = 0;
		}



		//вычисляем перемещение - берем новую ширину круга и умножаем её круг, который выбран. Выбраный круг будет в начале.
		//Вычитаем из этого половину кругов, которые влезут в контейнер, чтобы выбранный был посередине.
		//плюсуем падинг и пустой круг
		const translateWidth = ((lapWidth + scaleStep) * (lapChoosed)) - ((lapWidth + scaleStep) * (lapsShow / 2)) + paddingScroll + pseudoScroll;

		if (translateWidth > scroll) {		//делаем это, когда полученная ширина больше, чем ширина, которую уже проскролили. Иначе скролл будет меньше 0
			buttons.all.classList.add('_no-event')			//блокируем кнопки

			allLaps.style.transform = `translate(-${translateWidth - scroll}px,0)`;		//перемещаем на величину, вычитая проскроленную величину

			setTimeout(() => {			//после анимации...
				allLaps.classList.add('_scroll')			//делаем transition 0s

				allLaps.style.transform = null;			//убираем перемещение
				allLapsArea.scrollBy(translateWidth - scroll, 0);			//скроллим на величину перемещения
				setTimeout(() => {
					averageValue.classList.remove('_scroll');			//цифры кругов появляются
					maxValue.classList.remove('_scroll');
					allLaps.classList.remove('_scroll');			//возвращаем transition time
					buttons.all.classList.remove('_no-event');			//открываем кнопки
				}, 50);
			}, 500);
		}

		if ((lapWidth + scaleStep) * 3 > fullWidth - finalLapWidth) {			//если после увеличения кругов влезает только больше трех..
			buttons.plus.classList.add('_no-event')			//..то блокируем кнопку ПЛЮС. Последнее увеличение
		}
	}
}


function pilotsVsGraphScale(minusPlus) {			//масштабирование не самое удачое
	const buttons = {			//кнопки для блокирования нажатий
		all: document.querySelector('.pilots-vs__scale-buttons'),
		minus: document.querySelector('.pilots-vs__minus'),
		plus: document.querySelector('.pilots-vs__plus'),
	}

	const averageLine = document.querySelector('.pilots-vs__average-line')			//цифры кругов
	const maxLine = document.querySelector('.pilots-vs__max-line')
	const averageValue = averageLine.querySelector('span')
	const maxValue = maxLine.querySelector('span')


	const laps = document.querySelectorAll('.pilots-vs__lap');			//каждый круг
	const allLaps = document.querySelector('.pilots-vs__laps');			//все все круги
	const allLapsArea = document.querySelector('.pilots-vs__laps-area');			//контейнер для всех всех кругов
	const pseudoLap = document.querySelector('.pilots-vs__pseudo-lap');			//пустой круг в начале - нужен для того, чтобы слайдер стоял ровно...
	const pseudoLapWidth = pseudoLap.offsetWidth;
	const finalLap = laps[laps.length - 1]			//последний круг, его ширина - ширина полоски span
	const finalLapWidth = finalLap.offsetWidth;
	const padding = parseInt(getComputedStyle(allLapsArea).paddingRight);			//отступ для контейнера
	const fullWidth = allLapsArea.offsetWidth - padding * 2;			//ширина контейнера
	let lapWidth = laps[0].offsetWidth;			//текущая ширина одного круга
	if (CONSOLE_DEBUG) console.log('laps', laps[0]);

	const scroll = allLapsArea.scrollLeft;			//текущее положение скроллла
	if (minusPlus == 'minus') {			//уменьшение масштаба
		const scaleStep = (lapWidth / 3);			//шаг уменьшения масштаба
		buttons.plus.classList.remove('_no-event')			//открываем кнопку ПЛЮС. иногда она может быть закрыта

		if ((lapWidth * (laps.length - 1) - scaleStep * (laps.length - 1)) > fullWidth) {			//если это уменьшение всё ещё больше, чем ширина контейнера

			let paddingScroll;			//переменные отступа и пустого круга, чтобы при 0 скролле никуда не перемещать
			let pseudoScroll;

			if (scroll) {
				paddingScroll = padding;
				pseudoScroll = pseudoLapWidth;
				averageValue.classList.add('_scroll');			//цифры кругов исчезают
				maxValue.classList.add('_scroll');
			} else {			//Если нет скролла, то отступы не считаем;
				paddingScroll = 0;
				pseudoScroll = 0;
			}

			const lapsHide = scroll / (lapWidth);			//считаем сколько кругов скрыто слева
			const scrollTo = scaleStep * lapsHide + paddingScroll + pseudoScroll;		//считаем увеличение ширины скрытых кругов слева, и плюс падинг и пустой круг
			buttons.all.classList.add('_no-event')			//блокируем кнопки


			allLaps.style.gridTemplateColumns = `7px repeat(${laps.length - 1},${lapWidth - scaleStep}px)7px`			//уменьшаем все все круги

			averageValue.style.transform = `translate(${scrollTo}px,0)`			//цифры кругов уходят влево
			maxValue.style.transform = `translate(${scrollTo}px,0)`
			allLaps.style.transform = `translate(${scrollTo}px,0)`			//перемещаем все все круги, чтобы они остались так же, как были

			setTimeout(() => {			//после анимации...
				allLaps.classList.add('_scroll')			//делаем transition 0s

				const scrollRightCompenstaion = allLaps.scrollWidth - allLapsArea.scrollLeft - allLaps.clientWidth;			//Если величина скролла больше, чем можно скролить - это вычтем

				allLaps.style.transform = null;			//удаляем перемещение

				if (scrollRightCompenstaion > 0) {
					allLapsArea.scrollBy(`-${scrollTo}`, 0);			//скроллим на величину перемещения
				} else {
					allLapsArea.scrollBy(`-${scrollTo + scrollRightCompenstaion}`, 0);			//скроллим на величину перемещения с вычетом компенсации
				}

				setTimeout(() => {
					averageValue.classList.remove('_scroll');			//цифры кругов появляются
					maxValue.classList.remove('_scroll');
					allLaps.classList.remove('_scroll');			//возвращаем transition time с небольшой задержкой для страховки
					buttons.all.classList.remove('_no-event')			//открывает возможность нажимать кнопки
				}, 25);
			}, 500);

		} else {			//если это уменьшение станет меньше, чем ширина контейнера, то...
			//делаем все все круги шириной контейнера,
			allLaps.style.gridTemplateColumns = `7px repeat(${laps.length - 1},${((fullWidth - pseudoLapWidth - finalLapWidth) / (laps.length - 1))}px)7px`
			buttons.minus.classList.add('_no-event')			//блокируем кнопку МИНУС, так как это финальное уменьшение
		}
	}


	if (minusPlus == 'plus') {			//увеличение масштаба
		const scaleStep = (lapWidth / 2);			//шаг увеличения
		buttons.minus.classList.remove('_no-event');			//открываем кнопку МИНУС. Иногда она может быть блокирована
		if (CONSOLE_DEBUG) console.log('lapWidth', lapWidth);

		if (CONSOLE_DEBUG) console.log('scaleStep', scaleStep);


		const slider = document.querySelector('.pilots-vs__slider');
		const lapsShow = fullWidth / (lapWidth + scaleStep);			//вычисляем, сколько сейчас влезает кругов в контейнер
		const lapChoosed = slider.value;			//круг, который выбран ползунком
		if (CONSOLE_DEBUG) console.log('lapChoosed', lapChoosed);


		allLaps.style.gridTemplateColumns = `7px repeat(${laps.length - 1},${lapWidth + scaleStep}px)7px`			//увеличиваем все все круги

		if (scroll) {
			paddingScroll = padding;
			pseudoScroll = pseudoLapWidth;
			averageValue.classList.add('_scroll');
			maxValue.classList.add('_scroll');
		} else {			//Если нет скролла, то отступы не считаем;
			paddingScroll = 0;
			pseudoScroll = 0;
		}



		//вычисляем перемещение - берем новую ширину круга и умножаем её круг, который выбран. Выбраный круг будет в начале.
		//Вычитаем из этого половину кругов, которые влезут в контейнер, чтобы выбранный был посередине.
		//плюсуем падинг и пустой круг
		const translateWidth = ((lapWidth + scaleStep) * (lapChoosed)) - ((lapWidth + scaleStep) * (lapsShow / 2)) + paddingScroll + pseudoScroll;

		if (translateWidth > scroll) {		//делаем это, когда полученная ширина больше, чем ширина, которую уже проскролили. Иначе скролл будет меньше 0
			buttons.all.classList.add('_no-event')			//блокируем кнопки

			allLaps.style.transform = `translate(-${translateWidth - scroll}px,0)`;		//перемещаем на величину, вычитая проскроленную величину

			setTimeout(() => {			//после анимации...
				allLaps.classList.add('_scroll')			//делаем transition 0s

				allLaps.style.transform = null;			//убираем перемещение
				allLapsArea.scrollBy(translateWidth - scroll, 0);			//скроллим на величину перемещения
				setTimeout(() => {
					averageValue.classList.remove('_scroll');			//цифры кругов появляются
					maxValue.classList.remove('_scroll');
					allLaps.classList.remove('_scroll');			//возвращаем transition time
					buttons.all.classList.remove('_no-event');			//открываем кнопки
				}, 50);
			}, 500);
		}

		if ((lapWidth + scaleStep) * 3 > fullWidth - finalLapWidth) {			//если после увеличения кругов влезает только больше трех..
			buttons.plus.classList.add('_no-event')			//..то блокируем кнопку ПЛЮС. Последнее увеличение
		}
	}
}



function allLapsGraphChoosing(name, classForSpan) {
	const laps = document.querySelectorAll('.all-laps__lap');
	const slider = document.querySelector('.all-laps__slider');

	const heat = getHeat(name);
	const lapsData = getLapsByName(name, heat, false)

	const stat = {
		roundCount: document.querySelector('.all-laps__round-count-value'),
		lapCount: document.querySelector('.all-laps__lap-count-value'),
		lapStart: document.querySelector('.all-laps__lap-start-value'),
		lapEnd: document.querySelector('.all-laps__lap-end-value'),
		lapTime: document.querySelector('.all-laps__lap-time-value'),
	}

	const roundCount = lapsData[slider.value].round;
	const lapCount = lapsData[slider.value].lapIndex;
	const lapStart = lapsData[slider.value].lapTimeStart;
	const lapEnd = lapsData[slider.value].lapTimeEnd;
	const lapTime = lapsData[slider.value].lapTime;

	stat.roundCount.innerHTML = roundCount
	stat.lapCount.innerHTML = lapCount
	stat.lapStart.innerHTML = lapStart
	stat.lapEnd.innerHTML = lapEnd
	stat.lapTime.innerHTML = lapTime


	laps[slider.value].classList.add(classForSpan);
	laps.forEach((lap, index) => {
		if (index != slider.value) {
			lap.classList.remove('_active');
			lap.classList.remove('_active-permanent');

		}
	})
}

function pilotsVsGraphChoosing(name1, name2, classForSpan) {
	const laps = document.querySelectorAll('.pilots-vs__lap');
	const vsSlider = document.querySelector('.pilots-vs__slider');

	const heats = [getHeat(name1), getHeat(name2)]

	const lapsDatas = [getLapsByName(name1, heats[0], false), getLapsByName(name2, heats[1], false)]

	const stat = {
		roundCount: document.querySelector('.pilots-vs__round-count-value'),
		lapCount: document.querySelector('.pilots-vs__lap-count-value'),
		lapStart: document.querySelector('.pilots-vs__lap-start-value'),
		lapTime: document.querySelector('.pilots-vs__lap-time-value'),
	}

	const currentLapsId = lapsIdData[vsSlider.value];

	const currentLapsData = [];

	lapsDatas.forEach((arr, index) => {
		let lapData = arr.filter(el => el.lapId == currentLapsId[index])
		// if(CONSOLE_DEBUG)console.log('LAPPPPDATA', ...lapData);
		if (lapData == '') {
			lapData = ['-']
		}
		currentLapsData.push(...lapData);
	})





	// let roundCount;			Тут раунд был один и тот же у двух пилотов;
	// currentLapsData.forEach(lapData => {
	// 	const round = lapData.round
	// 	if (round) {
	// 		roundCount = round
	// 	}
	// })

	const roundCounts = {};
	currentLapsData.forEach((lapData, index) => {
		const roundCount = lapData.round
		if (CONSOLE_DEBUG) console.log('lapData.round', lapData.round);

		if (roundCount) {
			roundCounts[index] = roundCount
		} else {
			roundCounts[index] = '-'
		}
	})



	const lapCounts = {};
	currentLapsData.forEach((lapData, index) => {
		const lapCount = lapData.lapIndex
		if (lapCount) {
			lapCounts[index] = lapCount[0]
		} else {
			lapCounts[index] = '-'
		}
	})

	const lapStarts = {};
	currentLapsData.forEach((lapData, index) => {
		const lapStart = lapData.lapTimeStart
		if (lapStart) {
			lapStarts[index] = lapStart
		} else {
			lapStarts[index] = '--:--:--'
		}
	})

	const lapTimes = {};
	currentLapsData.forEach((lapData, index) => {
		const lapTime = lapData.lapTime
		if (lapTime) {
			lapTimes[index] = lapTime
		} else {
			lapTimes[index] = '-:--.---'
		}
	})

	// if(CONSOLE_DEBUG)console.log('roundCount', roundCount);

	// if(CONSOLE_DEBUG)console.log('lapTimes', lapTimes);
	// if(CONSOLE_DEBUG)console.log('lapStarts', lapStarts);
	// if(CONSOLE_DEBUG)console.log('lapCounts', lapCounts);



	// stat.roundCount.innerHTML = roundCount   Это когда раунд был один для двух пилотов
	stat.roundCount.innerHTML = `<p>${roundCounts[0]}</p><p>${roundCounts[1]}</p>`
	stat.lapCount.innerHTML = `<p>${lapCounts[0]}</p><p>${lapCounts[1]}</p>`
	stat.lapStart.innerHTML = `<p>${lapStarts[0]}</p><p>${lapStarts[1]}</p>`
	stat.lapTime.innerHTML = `<p>${lapTimes[0]}</p><p>${lapTimes[1]}</p>`


	laps[vsSlider.value].classList.add(classForSpan);
	if (CONSOLE_DEBUG) console.log('vsSlider.value', vsSlider.value);

	laps.forEach((lap, index) => {
		if (index != vsSlider.value) {
			lap.classList.remove('_active');
			lap.classList.remove('_active-permanent');
		}
	})
}


function lapTimeConverter(time, floatOrString) {
	if (floatOrString == 'float') {
		const lapTimeStringSpread = [...time];			//Делим цифру на знаки
		const minute = lapTimeStringSpread.shift();			//Первую цифру времени удаляем, и записываем как минуту

		lapTimeStringSpread.shift();			//Тут удаляем двоеточие

		const lapTimeFloat = parseFloat(lapTimeStringSpread.join(''));			//Здесь воссоединяем цифры без минут

		if (minute > 0) {
			const lapTimeFloatFull = lapTimeFloat + (60 * minute);
			const lapTimeFloatFullFixed = lapTimeFloatFull.toFixed(3);
			return lapTimeFloatFullFixed;
		} else {
			const lapTimeFloatFixed = lapTimeFloat.toFixed(3);
			return lapTimeFloatFixed;
		}
	} else if (floatOrString == 'string') {
		const minutesFloat = time / 60;
		const minutesSpread = [...minutesFloat.toString()];
		const minutes = minutesSpread[0]
		const secundesFloat = time - (minutes * 60);
		let secundes = secundesFloat.toFixed(3);
		if (secundesFloat < 10) secundes = `0${secundesFloat.toFixed(3)}`
		const fullTime = `${minutes}:${secundes}`;

		return fullTime;
	}
}


function getHeat(name) {
	const allPilots = getPilotsStats();
	let heat;
	allPilots.forEach(pilot => {			//Ищем Heat по имени
		if (pilot.name == name) {
			heat = pilot.heat;
		}
	})
	return heat;
}



let lastHoleShot;

function startRound() {
	if (CONSOLE_DEBUG) console.log('NAMES', pilotsName);
	if (CONSOLE_DEBUG) console.log('lapsByPilot', lapsByPilot);
	if (CONSOLE_DEBUG) console.log('intervals', intervals);
	if (CONSOLE_DEBUG) console.log('lapTimeStep', lapTimeStep);
	if (CONSOLE_DEBUG) console.log('holeShots', holeShots);
	if (CONSOLE_DEBUG) console.log('pilotsIntervalCount', pilotsIntervalCount);
	if (CONSOLE_DEBUG) console.log('lapState', lapState);
	if (CONSOLE_DEBUG) console.log('roundSpeed', roundSpeed);
	if (CONSOLE_DEBUG) console.log('playState', roundPlayState);

	if (!lastHoleShot) {
		intervalButtonsAccept = setInterval(() => {
			let holeFullArr = [];
			let holeTruedArr = [];

			pilotsName.forEach(name => {
				holeFullArr.push(lapState[name][0])
				holeTruedArr = holeFullArr.filter(el => el == true)
			})

			if (holeFullArr.length == holeTruedArr.length) {
				lastHoleShot = true;
			}

			if (lastHoleShot == true) {
				if (CONSOLE_DEBUG) console.log('RJYTWWWWW');
				const roundPlayButton = document.querySelector('.round__play-button');
				const slider = document.querySelector('.round__slider')
				roundPlayButton.classList.remove('_no-event');
				slider.classList.remove('_no-event');
				clearInterval(intervalButtonsAccept);
			}
		}, 100)

	}
	pilotsName.forEach(pilotName => {

		const laps = lapsByPilot[pilotName];

		laps.forEach((lap, lapIndex) => {

			const fixedRoundSpeed = roundSpeed.toFixed(2)
			const floatLapTimeStep = lapTimeStep[pilotName][lapIndex]
			const fixedLapTimeStep = floatLapTimeStep.toFixed(2)
			const floatIntervalTime = +fixedRoundSpeed * +fixedLapTimeStep;
			// const fixedIntervalTime = +floatIntervalTime.toFixed(2)

			const preFixedIntervalTime = +floatIntervalTime.toFixed(2);


			let fixedIntervalTime;
			if (preFixedIntervalTime < 10) {
				const fixedFullNum = preFixedIntervalTime.toFixed(0);
				fixedIntervalTime = `10.${fixedFullNum}`
			} else {
				fixedIntervalTime = +preFixedIntervalTime.toFixed(2)
			}


			if (!holeShots[pilotName].state) {
				if (CONSOLE_DEBUG) console.log('HOLESHOTTTTTTTTTT', pilotName);
				holeShots[pilotName].state = true;

				let timeoutMultiplier;
				if (roundSpeed == 1) {
					timeoutMultiplier = 0.5
				} else {
					timeoutMultiplier = 1;
				}

				holeShots[pilotName].interval = setTimeout(() => {
					lapState[pilotName][0] = true;
					// holeShots[pilotName].state = false;
					if (CONSOLE_DEBUG) console.log('SETT TIME');

				}, holeShots[pilotName].timeout * +fixedRoundSpeed * timeoutMultiplier)
			}

			// let currentCount = 0;
			// const maxCount = element.laps.length;
			// const intervalTime = 100;

			intervals[pilotName][lapIndex] = setInterval(() => {
				// if (pilotName == 'BeeHolder') if(CONSOLE_DEBUG)console.log('INTERVALLLL', lapIndex);


				if (lapState[pilotName][lapIndex]) {
					let pecrentMultiplaer;
					if (roundSpeed == 1) {
						pecrentMultiplaer = 2
					} else {
						pecrentMultiplaer = 1;
					}

					if (pilotsIntervalCount[pilotName][lapIndex] * 1 < 100) {
						lap.style.width = `${pilotsIntervalCount[pilotName][lapIndex] * 1}%`;
						pilotsIntervalCount[pilotName][lapIndex] += 1 * pecrentMultiplaer;
					} else {
						lap.style.width = '100%';
						pilotsIntervalCount[pilotName][lapIndex] = 100;
						clearInterval(intervals[pilotName][lapIndex]);

						lapState[pilotName][lapIndex + 1] = true;

						const allLapsState = [];

						for (counts in pilotsIntervalCount) {
							const pilotCounts = pilotsIntervalCount[counts]
							pilotCounts.forEach(count => {
								allLapsState.push(count)
							})
						}
						const fullWidthLaps = allLapsState.filter(el => el == 100)

						if (allLapsState.length == fullWidthLaps.length) {
							// if(CONSOLE_DEBUG)console.log('В С Ё!!!!');
							endRound();
							roundPlayState = 'end';
						}
					}
				}
				// if(CONSOLE_DEBUG)console.log('fixedIntervalTime', fixedIntervalTime);

			}, +fixedIntervalTime);
		})
	})
}

function pauseRound() {
	pilotsName.forEach(pilotName => {
		const intervalArr = intervals[pilotName];
		intervalArr.forEach(inter => {
			clearInterval(inter)
		})
	})
}

function endRound() {
	pauseRound();
	const roundPlayButton = document.querySelector('.round__play-button')
	const paragraph = roundPlayButton.firstElementChild;

	textChange(paragraph, `<p>${textStrings.roundsTab.again}</p>`, 150)

	for (lapp in lapsByPilot) {
		const laps = lapsByPilot[lapp]
		laps.forEach((lapp, index) => {
			laps[index].classList.add('_akcent')

		})
	}

	for (counts in pilotsIntervalCount) {
		const pilotCounts = pilotsIntervalCount[counts]
		pilotCounts.forEach((count, index) => {
			pilotCounts[index] = 0;
		})
	}

	for (lap in lapState) {
		const lapsStates = lapState[lap]
		lapsStates.forEach((states, index) => {
			lapsStates[index] = false;
		})
	}

	for (holeName in holeShots) {
		const holeObj = holeShots[holeName]
		holeObj.state = false;
	}

	lastHoleShot = false;
	clearInterval(intervalButtonsAccept);

}



function speedChange(sliderElement) {
	pauseRound();
	const speedValue = document.querySelector('.round__speed-value');
	const sliderValue = sliderElement.value;
	roundSpeed = speedValues[sliderValue];
	if (CONSOLE_DEBUG) console.log('LOGG', roundSpeed);

	speedValue.innerHTML = `x${speedNames[roundSpeed]}`


	if (roundPlayState == 'play') startRound();
}



// setInterval(() => {
// 	if(CONSOLE_DEBUG)console.log('NAMES', pilotsName);
// 	if(CONSOLE_DEBUG)console.log('lapsByPilot', lapsByPilot);
// 	if(CONSOLE_DEBUG)console.log('intervals', intervals);
// 	if(CONSOLE_DEBUG)console.log('lapTimeStep', lapTimeStep);
// 	if(CONSOLE_DEBUG)console.log('pilotsIntervalCount', pilotsIntervalCount);
// 	if(CONSOLE_DEBUG)console.log('lapState', lapState);
// 	if(CONSOLE_DEBUG)console.log('roundSpeed', roundSpeed);
// 	if(CONSOLE_DEBUG)console.log('playState', roundPlayState);

// }, 1000);




function textChange(elementWithText, textToChange, time) {

	elementWithText.style.opacity = 0;
	elementWithText.style.transform = `scale(0.9)`
	elementWithText.style.transition = `opacity ${time}ms ease ${time / 2}ms,transform ${time}ms ease 0ms`;
	setTimeout(() => {
		elementWithText.innerHTML = `${textToChange}`;
		elementWithText.style.opacity = 1;
		elementWithText.style.transform = `scale(1.0)`
		elementWithText.style.transition = `opacity ${time}ms ease 0ms,transform ${time}ms ease ${time / 2}ms`;

		setTimeout(() => {
			elementWithText.style.opacity = null;
			elementWithText.style.transform = null;
			elementWithText.style.transition = null;

		}, time);
	}, time);
}


function roundStatsStrokeWidthChange() {

	const statWindow = document.querySelector('.statistic__full-round');

	if (statWindow) {
		const allNames = document.querySelectorAll('.statistic__names-item');
		const statWindowWidth = statWindow.clientWidth;

		if (CONSOLE_DEBUG) console.log('statWindowWidth', statWindowWidth);

		const padding = parseInt(getComputedStyle(statWindow).paddingLeft);

		allNames.forEach(stroke => {
			const span = stroke.firstElementChild;
			span.style.width = `${statWindowWidth - padding * 2}px`
			if (CONSOLE_DEBUG) console.log('span', span);
		})
	}
}



window.addEventListener('resize', function () {
	roundStatsStrokeWidthChange();
})





function writeRound(roundRound, roundHeat) {
	const round = {
		round: document.createElement('div'),
		container: document.createElement('div'),
		tittle: document.createElement('div'),
		tittleRound: document.createElement('div'),
		tittleHeat: document.createElement('div'),
		exitBtn: document.createElement('div'),

		buttons: document.createElement('div'),
		viewBtn: document.createElement('button'),
		statBtn: document.createElement('button'),

		tabs: document.createElement('div'),
	}


	const view = {
		view: document.createElement('div'),
		graphArea: document.createElement('div'),
		lapsArea: document.createElement('div'),
		// lapNode:document.createElement('div'), //Здесь будут добавляться много кругов
		pilots: document.createElement('div'),
		// pilotsInfo:document.createElement('div'),  //А здесь инфа по пилоту
		speedSlider: document.createElement('div'),
		sliderInput: document.createElement('input'),
		speedText: document.createElement('div'),
		speedTittle: document.createElement('div'),
		speedValue: document.createElement('div'),
		playBtn: document.createElement('button'),
	}

	const statistic = {
		statistic: document.createElement('div'),
		container: document.createElement('div'),

		fullRoundTittle: document.createElement('div'),
		fullRound: document.createElement('div'),

		fullRoundNamesColumn: document.createElement('div'),
		fullRoundNamesTittle: document.createElement('div'),
		fullRoundNamesItems: document.createElement('div'),
		// names: document.createElement('div'),			//Здесь будут имена

		statsRow: document.createElement('div'),
		statsRowContainer: document.createElement('div'),

		lapsColumn: document.createElement('div'),
		lapsTittle: document.createElement('div'),
		lapsItems: document.createElement('div'),
		// laps: document.createElement('div'),			//Круги

		bestLapColumn: document.createElement('div'),
		bestLapTittle: document.createElement('div'),
		bestLapItems: document.createElement('div'),
		// bestLaps: document.createElement('div'),			//лучшие Круги

		consecutiveColumn: document.createElement('div'),
		consecutiveTittle: document.createElement('div'),
		consecutiveItems: document.createElement('div'),
		// consecutive: document.createElement('div'),			//Круги подряд 

		totalTimeColumn: document.createElement('div'),
		totalTimeTittle: document.createElement('div'),
		totalTimeItems: document.createElement('div'),
		// totalTime: document.createElement('div'),			//Все время

		singleLapsTittle: document.createElement('div'),
		singleLaps: document.createElement('div'),

		singleLapNamesColumn: document.createElement('div'),
		singleLapNamesTittle: document.createElement('div'),
		singleLapNamesItems: document.createElement('div'),
		// names: document.createElement('div'),			//Здесь будут имена

		singleLapsRow: document.createElement('div'),
		singleLapsRowContainer: document.createElement('div'),

		// singleLaps: document.createElement('div'),			//здесь порисуем круги 
	}

	round.round.classList.add('round', 'modal')
	round.container.classList.add('round__container', '_container', 'modal__container', '_no-events')

	round.tittle.classList.add('round__tittle', 'modal__tittle', '_hidden-tittle')
	round.tittleRound.classList.add('round__tittle-round')
	// round.tittleHeat.classList.add('round__tittle-heat')
	round.exitBtn.classList.add('round__exit-button', '_button-exit')

	round.buttons.classList.add('round__buttons', '_buttons-wrapper', '_no-event', '_hidden-buttons')
	round.viewBtn.classList.add('round__view-button', '_button')
	round.statBtn.classList.add('round__statistic-button', '_button')

	round.tabs.classList.add('round__tabs')




	view.view.classList.add('round__view')
	view.graphArea.classList.add('round__graph-area', '_hidden-graph-area')
	view.lapsArea.classList.add('round__graph-area-laps')
	view.pilots.classList.add('round__graph-area-pilots')

	view.speedSlider.classList.add('round__speed-slider', '_hidden-slider')
	view.sliderInput.classList.add('round__slider', '_no-event')
	view.sliderInput.setAttribute("name", "round__slider");
	view.sliderInput.setAttribute("type", "range");
	view.sliderInput.setAttribute("min", "0");
	view.sliderInput.setAttribute("max", "3");
	view.sliderInput.setAttribute("value", "2");
	view.sliderInput.setAttribute("step", "1");

	view.speedText.classList.add('round__speed-text')
	view.speedTittle.classList.add('round__speed-tittle')
	view.speedValue.classList.add('round__speed-value')

	view.playBtn.classList.add('round__play-button', '_button', '_hidden-play-button', '_no-event')



	statistic.statistic.classList.add('round__statistic', 'statistic')
	statistic.container.classList.add('statistic__container')

	statistic.fullRoundTittle.classList.add('statistic__full-round-tittle')
	statistic.fullRound.classList.add('statistic__full-round')
	statistic.fullRoundNamesColumn.classList.add('statistic__names-column', 'name__column')
	statistic.fullRoundNamesTittle.classList.add('statistic__names-tittle', 'statistic__tittle')
	statistic.fullRoundNamesItems.classList.add('statistic__names-items')

	statistic.statsRow.classList.add('statistic__stats-row')
	statistic.statsRowContainer.classList.add('statistic__stats-row-container')

	statistic.lapsColumn.classList.add('statistic__laps-column', 'statistic__column')
	statistic.lapsTittle.classList.add('statistic__laps-tittle', 'statistic__tittle')
	statistic.lapsItems.classList.add('statistic__laps-items')
	statistic.bestLapColumn.classList.add('statistic__best-lap-column', 'statistic__column')
	statistic.bestLapTittle.classList.add('statistic__best-lap-tittle', 'statistic__tittle')
	statistic.bestLapItems.classList.add('statistic__best-lap-items')
	statistic.consecutiveColumn.classList.add('statistic__best-consecutive-column', 'statistic__column')
	statistic.consecutiveTittle.classList.add('statistic__best-consecutive-tittle', 'statistic__tittle')
	statistic.consecutiveItems.classList.add('statistic__best-consecutive-items')
	statistic.totalTimeColumn.classList.add('statistic__total-time-column', 'statistic__column')
	statistic.totalTimeTittle.classList.add('statistic__total-time-tittle', 'statistic__tittle')
	statistic.totalTimeItems.classList.add('statistic__total-time-items')


	statistic.singleLapsTittle.classList.add('statistic__single-laps-main-tittle')
	statistic.singleLaps.classList.add('statistic__single-laps')

	statistic.singleLapNamesColumn.classList.add('statistic__names-column', 'name__column')
	statistic.singleLapNamesTittle.classList.add('statistic__names-tittle', 'statistic__tittle')
	statistic.singleLapNamesItems.classList.add('statistic__names-items')

	statistic.singleLapsRow.classList.add('statistic__single-laps-row')
	statistic.singleLapsRowContainer.classList.add('statistic__single-laps-row-container')



	// round.tittleHeat.innerHTML = `Группа ${roundHeat}`

	round.viewBtn.innerHTML = textStrings.roundsTab.view
	round.statBtn.innerHTML = textStrings.roundsTab.statistic

	view.speedTittle.innerHTML = textStrings.roundsTab.speed
	view.speedValue.innerHTML = `x2`
	view.playBtn.innerHTML = `<p>${textStrings.roundsTab.play}</p>`



	statistic.fullRoundNamesTittle.innerHTML = textStrings.roundsTab.name
	statistic.lapsTittle.innerHTML = textStrings.roundsTab.laps
	statistic.bestLapTittle.innerHTML = textStrings.roundsTab.bestLap
	statistic.consecutiveTittle.innerHTML = textStrings.roundsTab.bestConsecutive
	statistic.totalTimeTittle.innerHTML = textStrings.roundsTab.totalTime

	statistic.singleLapNamesTittle.innerHTML = textStrings.roundsTab.name


	const roundInfo = getRound(roundRound, roundHeat);
	// if(CONSOLE_DEBUG)console.log('Round IFONNNN', roundInfo);

	round.tittleRound.innerHTML = roundInfo[0].round


	const maxLaps = roundInfo[0].maxLaps

	statistic.fullRoundTittle.innerHTML = `${textStrings.roundsTab.roundStart} - ${roundInfo[0].roundStart}`
	statistic.singleLapsTittle.innerHTML = textStrings.roundsTab.laps


	view.lapsArea.style.gridTemplateColumns = `repeat(${maxLaps},1fr) 2px`
	view.pilots.style.gridTemplateColumns = `repeat(${maxLaps},1fr) 2px`
	for (let i = 0; i <= maxLaps; i++) {
		const lapElement = document.createElement('div')
		if (i != maxLaps) {
			lapElement.classList.add('round__graph-area-lap-node', '_hidden-graph-area-lap-node')
			lapElement.innerHTML = `${textStrings.roundsTab.lap} ${i + 1}<span></span>`
		} else {
			lapElement.classList.add('round__graph-area-lap-node', 'round__graph-area-lap-node-final', '_hidden-graph-area-lap-node')
			lapElement.innerHTML = `<span></span>`
		}
		view.lapsArea.append(lapElement);
	}

	const singleLapItems = {}

	for (let i = 0; i <= maxLaps; i++) {

		const singleLapColumn = document.createElement('div')
		const singleLapTittle = document.createElement('div')
		singleLapItems[i] = document.createElement('div')

		singleLapColumn.classList.add('statistic__single-laps-column', 'statistic__column')
		singleLapTittle.classList.add('statistic__single-laps-tittle', 'statistic__tittle')
		singleLapItems[i].classList.add('statistic__single-laps-items')
		if (i == 0) {
			singleLapTittle.innerHTML = textStrings.roundsTab.holeShot
		} else {
			singleLapTittle.innerHTML = `${textStrings.roundsTab.lap} ${i}`
		}
		singleLapColumn.append(singleLapTittle, singleLapItems[i]);
		statistic.singleLapsRowContainer.append(singleLapColumn)
	}

	if (CONSOLE_DEBUG) console.log('roundInfo---------------------', roundInfo);

	for (let i = 1; i < roundInfo.length; i++) {
		const pilotRoundInfo = roundInfo[i];
		const lapsQuantity = pilotRoundInfo.length - 2;
		const pilotName = pilotRoundInfo[pilotRoundInfo.length - 1];
		const pilotElement = document.createElement('div')
		const lapsAreaNameElement = document.createElement('div')
		// if(CONSOLE_DEBUG)console.log('PILOT ROUND', pilotRoundInfo);

		pilotElement.style.gridTemplateColumns = `repeat(${maxLaps},1fr) 2px`

		pilotElement.classList.add('round__graph-area-pilot');
		lapsAreaNameElement.classList.add('round__graph-area-name', '_hidden-graph-area-name');
		lapsAreaNameElement.innerHTML = pilotName
		view.pilots.append(pilotElement);
		pilotElement.append(lapsAreaNameElement);

		for (let i = 0; i <= lapsQuantity; i++) {
			const lapsAreaLapElement = document.createElement('div');
			if (i != lapsQuantity) {
				lapsAreaLapElement.classList.add('round__graph-area-lap')
			} else {
				lapsAreaLapElement.classList.add('round__graph-area-lap-final')
			}
			lapsAreaLapElement.innerHTML = `<span></span>`
			pilotElement.append(lapsAreaLapElement);
		}

		const laps = getLapsByName(pilotName, roundHeat, true)
		const roundLaps = laps.filter(el => (el.roundId == roundRound) && (el.heatId == roundHeat))
		let bestLap;
		try {
			bestLap = roundLaps[0].lapTime;
		} catch (error) {
			bestLap = '-:--.---'
		}

		const consecutive = getConsecutivesByName(pilotName, roundHeat, true)
		const roundConsecutive = consecutive.filter(el => (el.roundId == roundRound) && (el.heatId == roundHeat))
		let bestConsecutive;

		try {
			bestConsecutive = roundConsecutive[0].lapTime;
		} catch (error) {
			bestConsecutive = '-:--.---'
		}
		let totalTimeFloat = 0;

		roundLaps.forEach(lap => {
			const previousTime = totalTimeFloat;

			const time = lapTimeConverter(lap.lapTime, 'float')
			// if(CONSOLE_DEBUG)console.log('curr time', time);
			totalTimeFloat = +previousTime + +time;
		})
		const totalTimeString = lapTimeConverter(+totalTimeFloat, 'string')


		// if(CONSOLE_DEBUG)console.log('TOTAL TIME', totalTimeString);
		// if(CONSOLE_DEBUG)console.log('BEST', bestLap);
		// if(CONSOLE_DEBUG)console.log('CONST', bestConsecutive);

		const fullRoundPilot = {
			name: document.createElement('div'),
			laps: document.createElement('div'),
			bestLap: document.createElement('div'),
			consecutive: document.createElement('div'),
			totalTime: document.createElement('div'),
		}

		fullRoundPilot.name.classList.add('statistic__names-item', 'statistic__stat')
		fullRoundPilot.laps.classList.add('statistic__laps-item', 'statistic__stat')
		fullRoundPilot.bestLap.classList.add('statistic__best-lap-item', 'statistic__stat')
		fullRoundPilot.consecutive.classList.add('statistic__consecutive-item', 'statistic__stat')
		fullRoundPilot.totalTime.classList.add('statistic__total-time-item', 'statistic__stat')

		fullRoundPilot.name.innerHTML = `${pilotName}<span></span>`;
		fullRoundPilot.laps.innerHTML = lapsQuantity;
		fullRoundPilot.bestLap.innerHTML = bestLap;
		fullRoundPilot.consecutive.innerHTML = bestConsecutive;
		fullRoundPilot.totalTime.innerHTML = totalTimeString;

		statistic.fullRoundNamesItems.append(fullRoundPilot.name)
		statistic.lapsItems.append(fullRoundPilot.laps)
		statistic.bestLapItems.append(fullRoundPilot.bestLap)
		statistic.consecutiveItems.append(fullRoundPilot.consecutive)
		statistic.totalTimeItems.append(fullRoundPilot.totalTime)


		const singleLapName = document.createElement('div');
		singleLapName.classList.add('statistic__names-item', 'statistic__stat')
		singleLapName.innerHTML = `${pilotName}<span></span>`;
		statistic.singleLapNamesItems.append(singleLapName);
		const singleLaps = singleLapItems
		if (CONSOLE_DEBUG) console.log('SingleLAPS', singleLaps);

		for (let i = 0; i <= maxLaps; i++) {
			const singleLapItem = document.createElement('div');
			singleLapItem.classList.add('statistic__single-laps-item', 'statistic__stat')

			if (i == 0) {
				singleLapItem.innerHTML = pilotRoundInfo[i];
			} else {
				let time = null;
				try {
					time = pilotRoundInfo[i].lapTime;
				} catch (error) {
					time = '-:--.---'
				}
				if (time) {
					singleLapItem.innerHTML = time;
				} else {
					singleLapItem.innerHTML = '-:--.---';
				}
			}

			singleLapItems[i].append(singleLapItem);
		}

	}
	// for (let i = 1; i < roundInfo.length; i++) {
	// 	const roundArr = roundInfo[i];
	// 	const name = roundArr[roundArr.length - 1]
	// 	const nameItem = document.createElement('div')
	// 	nameItem.classList.add('statistic__names-item', 'statistic__stat')
	// 	nameItem.innerHTML = name;
	// 	statistic.fullRoundNamesItems.append(nameItem);
	// }








	round.round.append(round.container)
	round.container.append(round.tittle, round.buttons, round.tabs)

	round.tittle.append(round.tittleRound, round.exitBtn)
	round.buttons.append(round.viewBtn, round.statBtn)

	round.tabs.append(view.view, statistic.statistic)

	view.view.append(view.graphArea, view.speedSlider, view.playBtn)

	view.graphArea.append(view.lapsArea)
	view.lapsArea.append(view.pilots)

	view.speedSlider.append(view.sliderInput, view.speedText)
	view.speedText.append(view.speedTittle, view.speedValue)

	statistic.statistic.append(statistic.container)
	statistic.container.append(statistic.fullRoundTittle, statistic.fullRound, statistic.singleLapsTittle, statistic.singleLaps)

	statistic.fullRound.append(statistic.fullRoundNamesColumn, statistic.statsRow)
	statistic.fullRoundNamesColumn.append(statistic.fullRoundNamesTittle, statistic.fullRoundNamesItems)
	statistic.statsRow.append(statistic.statsRowContainer)
	statistic.statsRowContainer.append(statistic.lapsColumn, statistic.bestLapColumn, statistic.consecutiveColumn, statistic.totalTimeColumn)
	statistic.lapsColumn.append(statistic.lapsTittle, statistic.lapsItems)
	statistic.bestLapColumn.append(statistic.bestLapTittle, statistic.bestLapItems)
	statistic.consecutiveColumn.append(statistic.consecutiveTittle, statistic.consecutiveItems)
	statistic.totalTimeColumn.append(statistic.totalTimeTittle, statistic.totalTimeItems)

	statistic.singleLaps.append(statistic.singleLapNamesColumn, statistic.singleLapsRow)
	statistic.singleLapNamesColumn.append(statistic.singleLapNamesTittle, statistic.singleLapNamesItems)

	statistic.singleLapsRow.append(statistic.singleLapsRowContainer)


	if (CONSOLE_DEBUG) console.log('R O U N DDDD', round.round);
	return round.round
}



function classSwitch(e) {
	const curentButton = e.target
	const allButtons = document.querySelectorAll('.class-switch-buttons__button')
	const buttonsContainer = document.querySelector('.class-switch-buttons__container');
	const raceClassNum = curentButton.getAttribute('value')
	buttonsContainer.classList.add('_no-event');

	allButtons.forEach(button => {
		if (CONSOLE_DEBUG) console.log('button', button);
		button.classList.remove('_active', '_no-event');
	})
	curentButton.classList.add('_active', '_no-event')

	tabSwitch('closeAll', tabsMain)
	currentClass = raceClassNum;

	setTimeout(() => {
		const pilotsTab = document.querySelector('.pilots')
		const leaderboardTab = document.querySelector('.leaderboard')
		const roundsTab = document.querySelector('.rounds')
		pilotsTab.remove();
		leaderboardTab.remove();
		roundsTab.remove();

	}, 300);

	setTimeout(() => {
		startFileView('classSwitch');
	}, 350);




}
