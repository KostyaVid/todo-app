import { keyboard } from '@testing-library/user-event/dist/types/keyboard';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../../redux/tasksSlice';
import s from './Input.module.scss';

const Input = () => {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.currentTarget.value.length < 40) setValue(event.currentTarget.value);
  }
  function onClick() {
    if (value) {
      dispatch(addTask(value));
      setValue('');
    }
  }

  return (
    <div className={s.input}>
      <button className={s.send} onClick={onClick}>
        +
      </button>
      <input
        className={s.inputForm}
        placeholder="Create a new todo..."
        value={value}
        onChange={onChange}
        onKeyDown={(ev) => {
          if (ev.key === 'Enter') onClick();
        }}
      />
    </div>
  );
};

export default Input;
