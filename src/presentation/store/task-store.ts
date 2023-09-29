import create from "zustand";
import {
  addTask1,
  deleteTask2,
  fetchTasksFromAPI2,
  toggleTaskDone,
} from "../../utils";

const useTaskStore = create((set) => ({
  tasks: [],

  fetchTasks: async () => {
    try {
      //const data = await fetchTasksFromAPI();
      const data = await fetchTasksFromAPI2();
      console.log(data);

      set({ tasks: data });
    } catch (error) {
      // Manejar el error de la solicitud de la API
    }
  },
  addTask: async (task) => {
    console.log("/////////////////////", task);

    try {
      set((state) => ({ tasks: [task, ...state.tasks] }));
      const newTask = await addTask1(task);
      console.log(newTask);
    } catch (error) {
      console.log("Error al añadir la tarea:", error);
    }
  },
  toggleTaskDone: async (taskId) => {
    try {
      // Intenta actualizar la tarea en la API primero.
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${taskId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ completed: true }), // Asegúrate de que la propiedad es "completed" y no "done" si eso es lo que la API espera.
        }
      );

      if (!response.ok) {
        throw new Error("Error al actualizar una tarea en la API");
      }
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        ),
      }));
    } catch (error) {
      console.log(error);
    }
  },
  deleteTask: async function (taskId) {
    console.log({ taskId });

    try {
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== taskId),
      }));
      await deleteTask2(taskId);

      // Después de eliminar con éxito del servidor, actualiza el estado local
    } catch (error) {
      console.log("error al eleminar tarea", error);
    }
  },
}));

export default useTaskStore;
