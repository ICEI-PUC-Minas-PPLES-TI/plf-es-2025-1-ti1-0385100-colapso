const monthYearDisplay = document.getElementById('monthYear');
const calendarDays = document.getElementById('calendarDays');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');

let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

function renderCalendar() {
    calendarDays.innerHTML = '';

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();

    const firstDayOfWeek = firstDayOfMonth.getDay();

    monthYearDisplay.textContent = new Date(currentYear, currentMonth).toLocaleString('pt-BR', {
        month: 'long',
        year: 'numeric'
    });

    const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate();
    for (let i = firstDayOfWeek; i > 0; i--) {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('other-month-day');
        dayDiv.textContent = prevMonthLastDay - i + 1;
        calendarDays.appendChild(dayDiv);
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const dayDiv = document.createElement('div');
        dayDiv.textContent = i;
        dayDiv.classList.add('current-month-day');

        if (i === new Date().getDate() &&
            currentMonth === new Date().getMonth() &&
            currentYear === new Date().getFullYear()) {
            dayDiv.classList.add('today');
        }

        dayDiv.addEventListener('click', () => {
            alert(`Você clicou no dia ${i} de ${new Date(currentYear, currentMonth).toLocaleString('pt-BR', { month: 'long' })} de ${currentYear}`);
        });

        calendarDays.appendChild(dayDiv);
    }

    const totalCells = firstDayOfWeek + daysInMonth;
    const remainingCells = 42 - totalCells;
    const nextMonthStartDay = 1;

    for (let i = 0; i < remainingCells && (totalCells + i) % 7 !== 0; i++) {
         const dayDiv = document.createElement('div');
         dayDiv.classList.add('other-month-day');
         dayDiv.textContent = nextMonthStartDay + i;
         calendarDays.appendChild(dayDiv);
    }
}

function prevMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar();
}

function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar();
}

prevMonthBtn.addEventListener('click', prevMonth);
nextMonthBtn.addEventListener('click', nextMonth);

window.addEventListener('load', renderCalendar);