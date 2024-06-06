import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button, { SelectButton } from './Button';
import styles from '../styles/modules/app.module.scss';
import TodoModal from './TodoModal';
import { updateFilterStatus, updateSortType } from '../slices/todoSlice';

function AppHeader() {
  const [modalOpen, setModalOpen] = useState(false);
  const initialFilterStatus = useSelector((state) => state.todo.filterStatus);
  const initialSortType = useSelector((state) => state.todo.sortType);
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

  return (
    <div className={styles.appHeader}>
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
      <TodoModal type="add" modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  );
}

export default AppHeader;
