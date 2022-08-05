import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.scss';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Tasks from './components/Tasks/Tasks';
import { setTheme } from './redux/themeSlice';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setTheme('light'));
    document.body.classList.add('lightTheme');
  }, []);
  return (
    <div className="App">
      <Header />
      <Tasks />
      <Footer />
    </div>
  );
}

export default App;
