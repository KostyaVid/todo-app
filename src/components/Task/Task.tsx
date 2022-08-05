import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteAndRemoveTaskByID,
  deleteTaskByID,
  ITasksState,
  setDragID,
  toggleCompleteByID,
  toggleTasksByDrag,
} from '../../redux/tasksSlice';
import s from './Task.module.scss';

interface ITaskProps {
  isCompleted: boolean;
  description: string;
  id: number;
  isHide?: boolean;
}

const Task = ({ isCompleted, description, id, isHide = false }: ITaskProps) => {
  const [mouseDown, setMouseDown] = useState(false);
  const taskDrag = useSelector((state: { tasks: ITasksState }) => state.tasks.taskDrag);
  const dispatch = useDispatch();
  function onClose() {
    if (taskDrag === null) {
      dispatch(deleteTaskByID(id));
      setTimeout(() => {
        dispatch(deleteAndRemoveTaskByID(id));
      }, 300);
    }
  }

  function onCompleted() {
    if (taskDrag === null) dispatch(toggleCompleteByID(id));
  }

  function onMouseDown() {
    if (taskDrag === null) {
      setMouseDown(true);
    }
  }
  function onMouseMove() {
    if (mouseDown && taskDrag === null) {
      dispatch(setDragID(id));
    }
  }
  function onMouseUp() {
    if (mouseDown) {
      setMouseDown(false);
    }
    if (taskDrag != null) dispatch(setDragID(null));
  }

  function onMouseEnter() {
    if (taskDrag != null && taskDrag != id) {
      dispatch(toggleTasksByDrag(id));
    }
  }

  return (
    <article
      className={[s.task, isHide ? s.animTaskRemove : '', taskDrag === id ? s.animDrag : ''].join(
        ' ',
      )}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}>
      <div className={[s.taskContent, isHide ? s.animTaskRemoveContent : ''].join(' ')}>
        <div
          className={[s.check, isCompleted ? s.completeCheck : ''].join(' ')}
          onClick={onCompleted}></div>
        <p className={[s.nameTask, isCompleted ? s.completeText : ''].join(' ')}>{description}</p>
        <button
          className={[s.deleteIcon, taskDrag ? s.dragActive : ''].join(' ')}
          onClick={onClose}>
          <img src="./images/icon-cross.svg" alt="Delete" />
        </button>
      </div>
    </article>
  );
};

export default Task;
