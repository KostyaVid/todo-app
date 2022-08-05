import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../../redux/filterSlice';
import s from './FooterMobile.module.scss';

const FooterMobile = () => {
  const dispatch = useDispatch();
  const filter = useSelector((state: any) => state.filter.filter);

  const classFilter = [s.filter, s.active].join(' ');

  return (
    <div className={s.footerMobile}>
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
  );
};

export default FooterMobile;
