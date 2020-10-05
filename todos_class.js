/*
 * 1) TODO'ya tekrar basılınca, todo durumu eski haline gelsin
 *    İpucu (Tek bir satırda değişiklik yapılacak)
 *
 * 2) Todo silme operasyonu
 **/

const todoList = [];

class TodoList {
  constructor(listElementParam) {
    this.todoListElement = listElementParam;
  }

  add(todoText) {
    const todoObject = {
      id: todoList.length,
      todoText: todoText,
      isDone: false,
    };

    todoList.push(todoObject);
    this.display();
  }

  delete(todoId) {
    const selectedTodoIndex = todoList.findIndex((item) => item.id == todoId);
    if (selectedTodoIndex > -1) {
      todoList.splice(selectedTodoIndex, 1);
    }

    this.display();
  }

  done(todoId) {
    const selectedTodoIndex = todoList.findIndex((item) => item.id == todoId);
    todoList[selectedTodoIndex].isDone = true;

    this.display();
  }

  undone(todoId) {
    const selectedTodoIndex = todoList.findIndex((item) => item.id == todoId);
    todoList[selectedTodoIndex].isDone = false;

    this.display();
  }

  display() {
    this.todoListElement.innerHTML = "";

    todoList.forEach((item) => {
      const listElement = document.createElement("li");
      const delButton = document.createElement("button");

      listElement.innerText = item.todoText;
      listElement.setAttribute("data-id", item.id);

      listElement.appendChild(delButton);
      delButton.classList.add("delBtn");
      delButton.innerText = "Delete";
      delButton.setAttribute("data-id", item.id);

      delButton.addEventListener("click", function (e) {
        const selectedId = e.target.getAttribute("data-id");
        myTodoList.delete(selectedId);
      });

      if (item.isDone) {
        listElement.classList.add("checked");
      }

      if (! item.isDone) {
      listElement.addEventListener("click", function (e) {
        const selectedId = e.target.getAttribute("data-id");
        myTodoList.done(selectedId);
      });
    }

      if (item.isDone) {
      listElement.addEventListener("click", function (e) {
        const selectedId = e.target.getAttribute("data-id");
        myTodoList.undone(selectedId);
    });
    }

      this.todoListElement.appendChild(listElement);
    });
  }
}

const listSection = document.querySelector("#myUL");

const myTodoList = new TodoList(listSection);

document.querySelector("#todo_button").addEventListener("click", function () {
  const todoText = document.querySelector("#myInput").value;

  myTodoList.add(todoText);
});
