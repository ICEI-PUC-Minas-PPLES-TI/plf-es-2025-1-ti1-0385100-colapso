document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.querySelector('.header-menu .fa-bars');
    const sidebar = document.querySelector('.sidebar');
    const closeSidebarBtn = document.querySelector('.close-sidebar');

    if (menuIcon && sidebar && closeSidebarBtn) {
        menuIcon.addEventListener('click', () => {
            sidebar.classList.add('active');
        });

        closeSidebarBtn.addEventListener('click', () => {
            sidebar.classList.remove('active');
        });
    }

    const newTaskInput = document.getElementById('new-task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const clearCompletedTasksBtn = document.getElementById('clear-completed-tasks');
    const taskListContainer = document.querySelector('.task-list-container');

    function createInfoCard(iconClass, text) {
        const div = document.createElement('div');
        div.classList.add('info-card');
        div.innerHTML = `<i class="${iconClass}"></i><span>${text}</span>`;
        return div;
    }

    function createObservationItem(title, status) {
        const div = document.createElement('div');
        div.classList.add('observation-item');
        div.innerHTML = `
            <p><i class="fas fa-check-circle"></i>${title}</p>
            <span class="completion-status">${status}</span>
        `;
        return div;
    }

    if (taskListContainer) {
        const taskListHeader = taskListContainer.querySelector('.task-list-header');

        taskListContainer.insertBefore(createInfoCard('fas fa-chart-bar', 'Visualizar fluxo do curso'), taskListHeader);
        taskListContainer.insertBefore(createInfoCard('fas fa-calendar-alt', 'Visualizar calendário do curso'), taskListHeader);
        taskListContainer.insertBefore(createInfoCard('fas fa-bell', 'Visualizar notificações do curso'), taskListHeader);

        const taskListHeaderH3 = taskListContainer.querySelector('.task-list-header h3');
        if (taskListHeaderH3) {
            taskListHeaderH3.classList.add('section-title-sidebar');
        }

        const obsTitle = document.createElement('h3');
        obsTitle.textContent = 'Observações recentes';
        obsTitle.classList.add('section-title-sidebar');
        taskListContainer.appendChild(obsTitle);

        taskListContainer.appendChild(createObservationItem('Aulas de Matemática', 'Capítulo 5 iniciado'));
        taskListContainer.appendChild(createObservationItem('Revisão de Biologia', 'Capítulo 3 concluído'));
    }

    function addTask(mainText, detailsText = '', dateText = '') {
        const textToUse = mainText || newTaskInput.value.trim();
        if (textToUse === '') {
            alert('Por favor, digite uma tarefa!');
            return;
        }

        const listItem = document.createElement('li');
        listItem.classList.add('task-item');

        listItem.innerHTML = `
            <span>
                <a href="#" class="task-link">${textToUse}</a>
                ${detailsText ? `<small>${detailsText}</small>` : ''}
                ${dateText ? `<small>${dateText}</small>` : ''}
            </span>
            <button class="delete-task-btn"><i class="fas fa-times"></i></button>
        `;

        taskList.appendChild(listItem);
        newTaskInput.value = '';

        listItem.addEventListener('click', (event) => {
            if (!event.target.closest('.delete-task-btn') && !event.target.closest('.task-link')) {
                if (listItem.classList.contains('completed')) {
                    listItem.classList.remove('completed');
                    listItem.style.opacity = '';
                    listItem.style.transform = '';
                    listItem.style.height = '';
                    listItem.style.marginBottom = '';
                    listItem.style.paddingTop = '';
                    listItem.style.paddingBottom = '';
                    listItem.style.overflow = '';
                    listItem.style.pointerEvents = '';
                } else {
                    listItem.classList.add('completed');
                    setTimeout(() => {
                        listItem.remove();
                    }, 1000);
                }
            }
        });

        const deleteBtn = listItem.querySelector('.delete-task-btn');
        deleteBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            listItem.remove();
        });
    }

    addTaskBtn.addEventListener('click', () => addTask());
    newTaskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    clearCompletedTasksBtn.addEventListener('click', () => {
        const completedTasks = taskList.querySelectorAll('.task-item');
        
        completedTasks.forEach(task => {
            if (!task.classList.contains('completed')) {
                task.classList.add('completed');
            }
            setTimeout(() => {
                task.remove();
            }, 1000);
        });
    });

    addTask(
        'Revisar Capítulo 5 de Matemática',
        'Funções do 2º Grau - Turma A',
        'Data de entrega: 30 de Junho'
    );
    addTask(
        'Trabalho de Química',
        'Pesquisa sobre Tabela Periódica - 1º ano C',
        'Para 05 Julho | Valor: 10 pontos'
    );
    addTask(
        'Leitura de Português',
        'Capítulo 3 do livro "Dom Casmurro" - Análise de Personagens',
        'Concluir até 02 Julho'
    );
    addTask(
        'Exercícios de Física',
        'Movimento Retilíneo Uniforme - Páginas 45-47',
        'Prazo: 29 Junho'
    );
});