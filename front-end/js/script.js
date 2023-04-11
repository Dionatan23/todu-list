const tbody = document.querySelector('tbody')
const addForm = document.querySelector('.add-form')
const inputTask = document.querySelector('.input-tasks')


const fetchTasks = async () => { 
   const response = await fetch('http://localhost:3333/tasks')
   const tasks = await response.json()
   return tasks
}

const addTasks = async (event) => {
    event.preventDefault()

    const tasks = { title: inputTask.value }
    
    await fetch('http://localhost:3333/tasks', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tasks),
    })

    loadsTasks();
    inputTask.value = '';
}

const deleteTask = async (id) => {
    await fetch(`http://localhost:3333/tasks/${id}`, {
        method: 'delete'
    })

    loadsTasks()
}

const updateTask = async ({ id, title, status }) => {

    await fetch(`http://localhost:3333/tasks/${id}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, status })
    })

    loadsTasks();
}

const formatDate = (dateUTC) => {
    const option = { dateStyle: 'long', timeStyle: 'short' }
    const date = new Date(dateUTC).toLocaleString('pt-br', option)
    return date
}

// Cria as tags 
const creatElement = (tag, innerText = ' ') => {
    const element = document.createElement(tag)
    element.innerText = innerText;

    return element
}
const creatBTN = (tag, innerHTML = ' ') => {
    const elementBTN = document.createElement(tag)
    elementBTN.innerHTML = innerHTML;

    return elementBTN
}

const creatSelect = (value) => {
    const options = `
        <option value="pendente">Pendente</option>
        <option value="em andamento">Em andamento</option>
        <option value="concluido">Concluido</option>
    `;
    const select = creatBTN('select', options)
    select.value = value
    return select
}

const creatRow = (task) => {

    const { id, title, created_at, status } = task
    // Cria os elementos HTML
    const tr = creatElement('tr')
    const tdTitle = creatElement('td', title,)
    const tdCreatedAt = creatElement('td', formatDate(created_at))
    const tdStatus = creatElement('td')
    const tdActions = creatElement('td')

    const select =  creatSelect(status)
    select.addEventListener('change', ({ target }) => updateTask({ id, title, created_at, status: target.value }))

    const editBTN = creatBTN('button', '<span class="material-symbols-outlined">edit</span>')
    const deleteBTN = creatBTN('button','<span class="material-symbols-outlined"> delete </span>')

    // Formulario para edição da task criada
    const editForm = creatElement('form')
    const editInput = creatElement('input')

    editInput.value = title
    editForm.appendChild(editInput)

    editForm.addEventListener('submit', (event) => {
        event.preventDefault()
        updateTask({ id, title: editInput.value, status })
    })

    editBTN.addEventListener('click', () => {
        tdTitle.innerText = ''
        tdTitle.appendChild(editForm)
    })

    editBTN.classList.add('btn-action')
    deleteBTN.classList.add('btn-action')

    deleteBTN.addEventListener('click', () => deleteTask(id))

    // Monta os elementos HTML no front
    tdStatus.appendChild(select)

    tdActions.appendChild(editBTN)
    tdActions.appendChild(deleteBTN)

    tr.appendChild(tdTitle)
    tr.appendChild(tdCreatedAt)
    tr.appendChild(tdStatus)
    tr.appendChild(tdActions)

    return tr
}

const loadsTasks = async () => {
    const tasks = await fetchTasks();

    tbody.innerHTML = ''

    tasks.forEach(task => {
        const tr = creatRow(task)
        tbody.appendChild(tr)
    });
}

addForm.addEventListener('submit', addTasks)
loadsTasks();