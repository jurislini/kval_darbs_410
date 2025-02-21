window.addEventListener("load", () => {
  const form = document.querySelector("#new-task-form");
  const input = document.querySelector("#new-task-input");
  const list_el = document.querySelector("#tasks");

  // Function to load tasks from localStorage
  const loadTasksFromLocalStorage = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => {
      const task_el = createTaskElement(task.content);
      list_el.appendChild(task_el);
    });
  };

  // Function to save tasks to localStorage
  const saveTasksToLocalStorage = () => {
    const tasks = Array.from(list_el.children).map((taskEl) => {
      return {
        content: taskEl.querySelector(".text").value,
      };
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  // Function to create a task element
  const createTaskElement = (taskContent) => {
    const task_el = document.createElement("div");
    task_el.classList.add("task");

    const task_content_el = document.createElement("div");
    task_content_el.classList.add("content");

    const task_input_el = document.createElement("input");
    task_input_el.classList.add("text");
    task_input_el.type = "text";
    task_input_el.value = taskContent;
    task_input_el.setAttribute("readonly", "readonly");

    task_content_el.appendChild(task_input_el);
    task_el.appendChild(task_content_el);

    const task_actions_el = document.createElement("div");
    task_actions_el.classList.add("actions");

    const task_edit_el = document.createElement("button");
    task_edit_el.classList.add("edit");
    task_edit_el.innerText = "Edit";

    const task_delete_el = document.createElement("button");
    task_delete_el.classList.add("delete");
    task_delete_el.innerText = "Delete";

    task_actions_el.appendChild(task_edit_el);
    task_actions_el.appendChild(task_delete_el);
    task_el.appendChild(task_actions_el);

    // Event listener for edit button
    task_edit_el.addEventListener("click", () => {
      if (task_edit_el.innerText.toLowerCase() === "edit") {
        task_edit_el.innerText = "Save";
        task_input_el.removeAttribute("readonly");
        task_input_el.focus();
      } else {
        task_edit_el.innerText = "Edit";
        task_input_el.setAttribute("readonly", "readonly");
        saveTasksToLocalStorage(); // Save tasks to localStorage after editing
      }
    });

    // Event listener for delete button
    task_delete_el.addEventListener("click", () => {
      list_el.removeChild(task_el);
      saveTasksToLocalStorage(); // Save tasks to localStorage after deletion
    });

    return task_el;
  };

  // Load tasks from localStorage on page load
  loadTasksFromLocalStorage();

  // Event listener for form submission (adding new task)
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const task = input.value;
    const task_el = createTaskElement(task);
    list_el.appendChild(task_el);
    input.value = "";

    saveTasksToLocalStorage(); // Save tasks to localStorage after adding a new task
  });
});
