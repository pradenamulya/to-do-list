document.getElementById("currentDate").innerText = new Date().toLocaleDateString("id-ID", {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
});

function addTask() {
    const task = document.getElementById("task").value.trim();
    const priority = document.getElementById("priority").value;
    const taskDate = document.getElementById("taskDate").value;

    if (!task || !taskDate) {
        alert("Harap isi tugas dan tanggal.");
        return;
    }

    const table = document.getElementById("todoTableBody");
    const row = table.insertRow();
    const statusCell = row.insertCell(0);
    const taskCell = row.insertCell(1);
    const priorityCell = row.insertCell(2);
    const dateCell = row.insertCell(3);
    const actionCell = row.insertCell(4);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("form-check-input");
    checkbox.onclick = function () {
        if (checkbox.checked) {
            taskCell.classList.add("done");
            moveToDone(task, priority, taskDate);
            checkbox.disabled = true;
        }
    };
    statusCell.appendChild(checkbox);

    taskCell.innerText = task;
    priorityCell.innerText = priority;
    dateCell.innerText = new Date(taskDate).toLocaleDateString("id-ID");

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn btn-sm btn-danger";
    deleteBtn.innerText = "Hapus";
    deleteBtn.onclick = function () {
        table.deleteRow(row.rowIndex - 1);
    };
    actionCell.appendChild(deleteBtn);

    document.getElementById("task").value = "";
    document.getElementById("taskDate").value = "";
}

function moveToDone(task, priority, taskDate) {
    const doneContainer = document.getElementById("doneListContainer");
    const card = document.createElement("div");
    card.className = "card-done";

    const taskDateObj = new Date(taskDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    taskDateObj.setHours(0, 0, 0, 0);

    let isOverdue = today > taskDateObj;

    card.innerHTML = `
        <div><strong>Tugas:</strong> ${task}</div>
        <div><strong>Prioritas:</strong> ${priority}</div>
        <div><strong>Tanggal:</strong> ${taskDateObj.toLocaleDateString("id-ID")}</div>
        ${isOverdue ? '<div class="overdue">Status: Overdue</div>' : '<div></div>'}
    `;

    doneContainer.appendChild(card);
}

function clearAll() {
    document.getElementById("todoTableBody").innerHTML = "";
    document.getElementById("doneListContainer").innerHTML = "";
}