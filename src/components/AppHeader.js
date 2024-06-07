import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button, { SelectButton } from './Button';
import styles from '../styles/modules/app.module.scss';
import TodoModal from './TodoModal';
import { updateFilterStatus, updateSortType } from '../slices/todoSlice';
import { isPast } from 'date-fns';

function AppHeader() {
  const [modalOpen, setModalOpen] = useState(false);
  const initialFilterStatus = useSelector((state) => state.todo.filterStatus);
  const initialSortType = useSelector((state) => state.todo.sortType);
  const todoList = useSelector((state) => state.todo.todoList);
  const [filterStatus, setFilterStatus] = useState(initialFilterStatus);
  const [sortType, setSortType] = useState(initialSortType);
  const dispatch = useDispatch();

  const updateFilter = (e) => {
    setFilterStatus(e.target.value);
    dispatch(updateFilterStatus(e.target.value));
  };

  const handleSortChange = (e) => {
    setSortType(e.target.value);
    dispatch(updateSortType(e.target.value));
  };

  const incompleteTasks = todoList.filter(todo => todo.status === 'incomplete').length;
  const completedTasks = todoList.filter(todo => todo.status === 'complete').length;
  const overdueTasks = todoList.filter(todo => todo.status === 'incomplete' && isPast(new Date(todo.dueDate))).length;

  return (
    <div className={styles.appHeader}>
      <div className={styles.counters}>
        <span>Zadania do zrobienia: {incompleteTasks}</span>
        <span>Zadania zakończone: {completedTasks}</span>
        <span className={overdueTasks > 0 ? styles.overdue : ''}>
          Zadania po czasie: {overdueTasks}
        </span>
      </div>
      <div className={styles.controls}>
        <Button variant="primary" onClick={() => setModalOpen(true)}>
          Dodaj zadanie
        </Button>
        <SelectButton
          id="status"
          onChange={(e) => updateFilter(e)}
          value={filterStatus}
        >
          <option value="all">Wszystkie</option>
          <option value="incomplete">Nieukończone</option>
          <option value="complete">Ukończone</option>
        </SelectButton>
        <SelectButton id="sortType" onChange={handleSortChange} value={sortType}>
          <option value="dateAdded">Data dodania</option>
          <option value="dueDate">Data zakończenia</option>
        </SelectButton>
      </div>
      <TodoModal type="add" modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  );
}

export default AppHeader;
