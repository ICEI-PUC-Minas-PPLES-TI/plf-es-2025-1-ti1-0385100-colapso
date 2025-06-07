const tasks = [
    { id: 1, title: "Estudar capítulo 3 de Matemática", deadline: "2025-05-20", done: false },
    { id: 2, title: "Enviar trabalho de História", deadline: "2025-05-22", done: false },
    { id: 3, title: "Revisar conteúdos para prova de Química", deadline: "2025-05-25", done: false },
];

const tasksList = document.getElementById('tasks');

function renderTasks() {
    tasksList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');

        const title = document.createElement('span');
        title.className = 'task-title';
        title.textContent = task.title;

        const deadline = document.createElement('span');
        deadline.className = 'task-deadline';
        deadline.textContent = new Date(task.deadline).toLocaleDateString('pt-BR');

        const btn = document.createElement('button');
        btn.className = 'complete-btn';
        btn.textContent = task.done ? 'Concluída' : 'Marcar como concluída';
        btn.disabled = task.done;
        btn.onclick = () => {
            task.done = true;
            renderTasks();
        };

        li.appendChild(title);
        li.appendChild(deadline);
        li.appendChild(btn);

        tasksList.appendChild(li);
    });
}

renderTasks();

const ctx = document.getElementById('gradesChart').getContext('2d');
const gradesChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Matemática', 'Português', 'História', 'Biologia'],
        datasets: [{
            label: 'Notas',
            data: [8.5, 7.2, 9.0, 6.8],
            backgroundColor: '#b30000',
            borderColor: '#800000',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                max: 10
            }
        },
        plugins: {
            legend: {
                display: false
            }
        }
    }
});
