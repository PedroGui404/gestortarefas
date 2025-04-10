// Dados iniciais
const people = {
    maria: {
        name: "Maria Silva",
        role: "Gerente de Projetos",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        tasks: [
            { id: 1, description: "Revisar relatório trimestral", status: "andamento" },
            { id: 2, description: "Agendar reunião com a equipe", status: "concluida" }
        ]
    },
    joao: {
        name: "João Santos",
        role: "Desenvolvedor Sênior",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        tasks: [
            { id: 1, description: "Implementar novo módulo de autenticação", status: "andamento" },
            { id: 2, description: "Corrigir bug na página de login", status: "pausada" }
        ]
    },
    ana: {
        name: "Ana Oliveira",
        role: "Designer UX/UI",
        image: "https://randomuser.me/api/portraits/women/63.jpg",
        tasks: [
            { id: 1, description: "Criar wireframes para novo projeto", status: "concluida" },
            { id: 2, description: "Atualizar guia de estilo", status: "andamento" }
        ]
    }
};

let currentPerson = null;

// Mostrar tarefas de uma pessoa
function showPersonTasks(personId) {
    currentPerson = personId;
    const person = people[personId];
    
    // Atualizar informações da pessoa
    document.getElementById('personImage').src = person.image;
    document.getElementById('personName').textContent = person.name;
    document.getElementById('personRole').textContent = person.role;
    
    // Atualizar lista de tarefas
    renderTasks();
    
    // Alternar telas
    document.getElementById('homeScreen').classList.add('hidden');
    document.getElementById('tasksScreen').classList.remove('hidden');
}

// Voltar para a tela inicial
function backToHome() {
    document.getElementById('homeScreen').classList.remove('hidden');
    document.getElementById('tasksScreen').classList.add('hidden');
    currentPerson = null;
}

// Renderizar tarefas
function renderTasks() {
    const tasksList = document.getElementById('tasksList');
    tasksList.innerHTML = '';
    
    const person = people[currentPerson];
    
    person.tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = 'flex items-center justify-between bg-slate-50 p-4 rounded-md';
        
        // Status classes
        let statusClass = '';
        let statusText = '';
        switch(task.status) {
            case 'andamento':
                statusClass = 'status-andamento';
                statusText = 'Em Andamento';
                break;
            case 'concluida':
                statusClass = 'status-concluida';
                statusText = 'Concluída';
                break;
            case 'pausada':
                statusClass = 'status-pausada';
                statusText = 'Pausada';
                break;
        }
        
        taskElement.innerHTML = `
            <div class="flex items-center">
                <input type="text" value="${task.description}" 
                    class="bg-transparent border-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 rounded px-2 py-1 mr-2 w-64"
                    onchange="updateTask(${task.id}, this.value)">
                
                <select class="text-sm px-2 py-1 rounded ${statusClass} border-none focus:ring-2 focus:ring-indigo-500"
                    onchange="updateTaskStatus(${task.id}, this.value)">
                    <option value="andamento" ${task.status === 'andamento' ? 'selected' : ''}>Em Andamento</option>
                    <option value="concluida" ${task.status === 'concluida' ? 'selected' : ''}>Concluída</option>
                    <option value="pausada" ${task.status === 'pausada' ? 'selected' : ''}>Pausada</option>
                </select>
            </div>
            <button onclick="deleteTask(${task.id})" class="text-slate-400 hover:text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
            </button>
        `;
        
        tasksList.appendChild(taskElement);
    });
}

// Adicionar nova tarefa
function addTask() {
    const input = document.getElementById('newTaskInput');
    const select = document.getElementById('statusSelect');
    
    if (input.value.trim() === '') return;
    
    const newTask = {
        id: Date.now(), // Usamos timestamp como ID simples
        description: input.value.trim(),
        status: select.value
    };
    
    people[currentPerson].tasks.push(newTask);
    renderTasks();
    
    // Limpar input
    input.value = '';
}

// Atualizar descrição da tarefa
function updateTask(taskId, newDescription) {
    const task = people[currentPerson].tasks.find(t => t.id === taskId);
    if (task) {
        task.description = newDescription;
    }
}

// Atualizar status da tarefa
function updateTaskStatus(taskId, newStatus) {
    const task = people[currentPerson].tasks.find(t => t.id === taskId);
    if (task) {
        task.status = newStatus;
        renderTasks(); // Re-render para atualizar classes de status
    }
}

// Excluir tarefa
function deleteTask(taskId) {
    people[currentPerson].tasks = people[currentPerson].tasks.filter(t => t.id !== taskId);
    renderTasks();
}