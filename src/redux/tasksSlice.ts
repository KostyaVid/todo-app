import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ITask {
  id: number;
  description: string;
  isCompleted: boolean;
  onClose: boolean;
  isHide: boolean;
}

export interface ITaskDrag {
  task: ITask;
  offsetX: number;
  offsetY: number;
}

export interface ITasksState {
  tasks: Array<ITask>;
  tasksLeft: number;
  lastID: number;
  taskDrag: number | null;
}

const initialState: ITasksState = {
  tasks: [
    {
      id: 0,
      description: 'Complete online JavaScript course',
      isCompleted: true,
      onClose: false,
      isHide: false,
    },
    {
      id: 1,
      description: 'Jog around the park 3x',
      isCompleted: false,
      onClose: false,
      isHide: false,
    },
    {
      id: 2,
      description: '10 minutes meditation',
      isCompleted: false,
      onClose: false,
      isHide: false,
    },
    {
      id: 3,
      description: 'Road for 1 hour',
      isCompleted: false,
      onClose: false,
      isHide: false,
    },
    {
      id: 4,
      description: 'Pick up groceries',
      isCompleted: false,
      onClose: false,
      isHide: false,
    },
    {
      id: 5,
      description: 'Complete Todo App on Frontend Mentor',
      isCompleted: false,
      onClose: false,
      isHide: false,
    },
  ],
  tasksLeft: 5,
  lastID: 5,
  taskDrag: null,
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state: ITasksState, action: PayloadAction<string>) => {
      state.lastID++;
      state.tasksLeft++;
      let task: ITask = {
        id: state.lastID,
        description: action.payload,
        isCompleted: false,
        onClose: false,
        isHide: false,
      };
      state.tasks.push(task);
    },

    clearCompletedTasks: (state: ITasksState) => {
      let j = state.tasks.length;
      for (let i = 0; i < j; i++) {
        if (state.tasks[i].isCompleted) {
          state.tasks.splice(i, 1);
          j--;
          i--;
        }
      }
    },
    toggleCompleteByID: (state: ITasksState, action: PayloadAction<number>) => {
      let posInArray = 0;
      state.tasks.some((task: ITask, index: number) => {
        if (task.id === action.payload) {
          posInArray = index;
          return true;
        }
        return false;
      });

      state.tasks[posInArray].isCompleted = !state.tasks[posInArray].isCompleted;
      state.tasks[posInArray].isCompleted ? (state.tasksLeft -= 1) : (state.tasksLeft += 1);
    },
    deleteTaskByID: (state: ITasksState, action: PayloadAction<number>) => {
      let posInArray = 0;
      state.tasks.some((task: ITask, index: number) => {
        if (task.id === action.payload) {
          posInArray = index;
          return true;
        }
        return false;
      });
      if (!state.tasks[posInArray].isCompleted) state.tasksLeft -= 1;
      state.tasks[posInArray].onClose = true;
    },

    deleteAndRemoveTaskByID: (state: ITasksState, action: PayloadAction<number>) => {
      let posInArray = 0;
      state.tasks.some((task: ITask, index: number) => {
        if (task.id === action.payload) {
          posInArray = index;
          return true;
        }
        return false;
      });
      state.tasks.splice(posInArray, 1);
    },
    setDragID: (state: ITasksState, action: PayloadAction<number | null>) => {
      state.taskDrag = action.payload;
    },
    toggleTasksByDrag: (state: ITasksState, action: PayloadAction<number>) => {
      if (state.taskDrag != null) {
        let tempTask: ITask | undefined = undefined;
        let tempTaskID = 0;
        for (let j = 0; j < state.tasks.length; j++) {
          if (state.tasks[j].id === state.taskDrag) {
            tempTask = { ...state.tasks[j] };
            tempTaskID = j;
            break;
          }
        }
        if (tempTask) {
          for (let i = 0; i < state.tasks.length; i++) {
            if (state.tasks[i].id === action.payload) {
              state.tasks.splice(tempTaskID, 1);
              state.tasks.splice(i, 0, tempTask);
              return;
            }
          }
        }
      }
    },
  },
});

export const {
  addTask,
  deleteTaskByID,
  toggleCompleteByID,
  clearCompletedTasks,
  deleteAndRemoveTaskByID,
  setDragID,
  toggleTasksByDrag,
} = tasksSlice.actions;
export default tasksSlice.reducer;
