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