import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../redux/themeSlice';
import Container from '../Container/Container';
import s from './Header.module.scss';

const Header = () => {
  const theme: string = useSelector((state: any) => state.theme.theme);
  const dispatch = useDispatch();

  return (
    <header
      className={[s.header, theme === 'light' ? s.lightThemeHeader : s.darkThemeHeader].join(' ')}>
      <Container>
        <div className={s.flexRow}>
          <h1 className={s.title}>TODO</h1>
          <button
            className={[
              s.toggleTheme,
              theme === 'light' ? s.lightThemeToggle : s.darkThemeToggle,
            ].join(' ')}
            onClick={() => {
              dispatch(toggleTheme());
              document.body.classList.toggle('lightTheme');
              document.body.classList.toggle('darkTheme');
            }}></button>
        </div>
      </Container>
    </header>
  );
};

export default Header;
