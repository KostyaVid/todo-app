import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ITasksState, setDragID } from '../../redux/tasksSlice';
import Container from '../Container/Container';
import EmptyTask from '../EmptyTask/EmptyTask';
import FooterMobile from '../FooterTaks/FooterMobile/FooterMobile';
import FooterTasks from '../FooterTaks/FooterTasks';
import Input from '../Input/Input';
import OpacityTask from '../OpacityTask/OpacityTask';
import Task from '../Task/Task';
import s from './Tasks.module.scss';

const Tasks = () => {
  const [mobileSize, setMobileSize] = useState(
    document.documentElement.clientWidth < 591 ? true : false,
  );
  const filter = useSelector((state: any) => state.filter.filter);

  const tasks: ITasksState = useSelector((state: { tasks: ITasksState }) => state.tasks);
  const dispatch = useDispatch();

  function onMouseLeave() {
    if (tasks.taskDrag !== null) {
      dispatch(setDragID(null));
    }
  }

  const renderTasks = tasks.tasks.map((elem) => {
    if (elem.onClose) {
      return <OpacityTask key={elem.id} />;
    } else {
      switch (filter) {
        case 'all':
          return (
            <Task
              key={elem.id}
              isCompleted={elem.isCompleted}
              description={elem.description}
              id={elem.id}
            />
          );

        case 'active':
          return (
            <Task
              key={elem.id}
              isCompleted={elem.isCompleted}
              description={elem.description}
              id={elem.id}
              isHide={elem.isCompleted ? true : false}
            />
          );
          break;

        case 'completed':
          return (
            <Task
              key={elem.id}
              isCompleted={elem.isCompleted}
              description={elem.description}
              id={elem.id}
              isHide={elem.isCompleted ? false : true}
            />
          );
          break;
      }
    }
  });

  useEffect(() => {
    const resize = () => {
      if (window.innerWidth < 591) {
        if (!mobileSize) setMobileSize(true);
      } else {
        if (mobileSize) setMobileSize(false);
      }
    };

    window.addEventListener('resize', () => resize());
    return window.removeEventListener('resize', () => resize());
  }, [mobileSize]);

  return (
    <main className={s.main}>
      <Container>
        <div className={s.tasksList}>
          <Input />
          <div className={s.renderTasks} onMouseLeave={onMouseLeave}>
            {renderTasks}
            <EmptyTask />
          </div>
          <FooterTasks />
          {mobileSize && <FooterMobile />}
        </div>
      </Container>
    </main>
  );
};

export default Tasks;
