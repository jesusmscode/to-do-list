import { Task } from "./task";

export async function fetchTasksFromAPI() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users/100/todos"
    );
    if (!response.ok) {
      throw new Error("Error al obtener datos de la API");
    }
    //const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
export async function fetchTasksFromAPI2() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users/10/todos"
    );
    if (!response.ok) {
      throw new Error("Error al obtener datos de la API");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function addTask1(task: Task) {
  try {
    const response = await fetch(
      "https://my-json-server.typicode.com/jesusmscode/server-to-do-list/tasks",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      }
    );
    if (!response.ok) {
      throw new Error("Error al agregar una tarea a la API");
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function toggleTaskDone(taskId: number) {
  console.log("******");

  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${taskId}`,
      {
        method: "PATCH", // Usar PATCH para actualizar el estado "done"
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: true }), // Cambiar a true para marcar como "done"
      }
    );
    if (!response.ok) {
      throw new Error("Error al actualizar una tarea en la API");
    }
  } catch (error) {
    console.log(error);
  }
}
export async function deleteTask2(taskId: number) {
  try {
    const perro = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${taskId}`,
      {
        method: "DELETE",
      }
    );
  } catch (error) {
    console.log("erro muy guapo", error);
  }
}
