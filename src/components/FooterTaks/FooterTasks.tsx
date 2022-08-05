import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../redux/filterSlice';
import { clearCompletedTasks, ITasksState } from '../../redux/tasksSlice';
import s from './FooterTasks.module.scss';

const FooterTasks = () => {
  const lefItems: number = useSelector((state: { tasks: ITasksState }) => state.tasks.tasksLeft);
  const filter = useSelector((state: any) => state.filter.filter);
  const classFilter = [s.filter, s.active].join(' ');

  const dispatch = useDispatch();
  function clearCompleted() {
    dispatch(clearCompletedTasks());
  }

  return (
    <div className={s.footerTask}>
      {lefItems === 1 ? (
        <div className={s.itemsLeft}>1 item left</div>
      ) : (
        <div className={s.itemsLeft}>{lefItems + ' items left'}</div>
      )}
      <div className={s.filterTasks}>
        <div
          className={filter === 'all' ? classFilter : s.filter}
          onClick={() => {
            dispatch(setFilter({ filter: 'all' }));
          }}>
          All
        </div>
        <div
          className={filter === 'active' ? classFilter : s.filter}
          onClick={() => {
            dispatch(setFilter({ filter: 'active' }));
          }}>
          Active
        </div>
        <div
          className={filter === 'completed' ? classFilter : s.filter}
          onClick={() => {
            dispatch(setFilter({ filter: 'completed' }));
          }}>
          Completed
        </div>
      </div>
      <button className={s.clear} onClick={clearCompleted}>
        Clear Completed
      </button>
    </div>
  );
};

export default FooterTasks;
