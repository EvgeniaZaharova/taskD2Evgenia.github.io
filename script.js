let events = []
let eventID = 0

let calendar = $('#calendar')
let monthNames = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

let current = new Date()
let currentYear = current.getFullYear();
let currentMonth = current.getMonth();

renderCalendar(current.getMonth(), current.getFullYear())

function renderCalendar(month, year) {
	$('#calendarTable').html('')

	$('#currentDate').html(`${monthNames[month]} ${year}`)

	let daysInMonth = getDaysInMonth(month, year)
	let firstDay = new Date(year, month).getDay()
	if (firstDay == 0) firstDay = 7

	let currentMonthStartingDay = new Date(currentYear, currentMonth).getDay()

	let daysInPreviousMonth = getDaysInMonth(month - 1, year)
	let previousMonthStartingDay = 0;
	if (currentMonthStartingDay == 0) {
		previousMonthStartingDay = daysInPreviousMonth - 5
	} else {
		previousMonthStartingDay = daysInPreviousMonth - currentMonthStartingDay + 2
	}

	let counter = 1;
	let nextMonth = 1;
	let date = 1

	for (let row = 0; row < 7; row++) {
		let i = $(`<div></div>`).appendTo('#calendarTable')

		for (let cell = 0; cell < 7; cell++) {
			if (row === 0 && cell < firstDay - 1) {
				i.append(`<span class="gray">${previousMonthStartingDay}</span>`)
				previousMonthStartingDay++

			}
			else if (date > getDaysInMonth(month, year)) {
				i.append(`<span class="gray">${nextMonth++}</span>`)
			}
			else {
				if (date === current.getDate() && month === current.getMonth() && year === current.getFullYear()) {
					i.append(`<span class="current" onclick="addEvent(${date}, ${currentMonth}, ${currentYear})">${date}</span>`)
				} else {
					i.append(`<span onclick="addEvent(${date}, ${currentMonth}, ${currentYear})">${date}</span>`)
				}
				date++
				counter++;
			}
		}
		if (counter > getDaysInMonth(month, year))
			break;
	}
}

function next() {
	currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
	currentMonth = (currentMonth + 1) % 12;
	renderCalendar(currentMonth, currentYear);
}

function previous() {
	currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
	currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
	renderCalendar(currentMonth, currentYear);
}

function getDaysInMonth(month, year) {
	return 32 - new Date(year, month, 32).getDate();
}

function addEvent(day, month, year) {
	events.push(
		{
			id: eventID++,
			day: day,
			month: month,
			year: year,
			text: ''
		}
	)
	renderEvents()
}

function renderEvents() {
	$('#eventsList').html('')
	events.forEach((event) => {
		let el = $(`<div class="cell"></div>`).appendTo('#eventsList')
		el.append(`<p>${event.day}.${(event.month + 1)}.${event.year}</p>`)
		event.text == '' ? el.append(`<textarea onchange="changeEventText(${event.id}, this.value)" placeholder="Текст..."></textarea>`) : el.append(`<textarea onchange="changeEventText(${event.id}, this.value)" placeholder="Текст...">${event.text}</textarea>`)
		$('#eventsList').append('<hr />')	
	})
}

function changeEventText(id, value) {
	events[id].text = value;
	renderEvents()
}