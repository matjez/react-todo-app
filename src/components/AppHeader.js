import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button, { SelectButton } from "./Button";
import styles from "../styles/modules/app.module.scss";
import TodoModal from "./TodoModal";
import { updateFilterStatus } from "../slices/todoSlice";

function AppHeader() {
  // Dodaj stan dla sortowania
  const [modalOpen, setModalOpen] = useState(false);
  const initialFilterStatus = useSelector((state) => state.todo.filterStatus);
  const [filterStatus, setFilterStatus] = useState(initialFilterStatus);
  const dispatch = useDispatch();

  const [sortType, setSortType] = useState("dateAdded");

  const updateFilter = (e) => {
    setFilterStatus(e.target.value);
    dispatch(updateFilterStatus(e.target.value));
  };

  const handleSortChange = (e) => {
    setSortType(e.target.value);
    // Przekaż informację o typie sortowania do store/redux (jeśli używasz)
  };

  return (
    <div className={styles.appHeader}>
      <Button variant="primary" onClick={() => setModalOpen(true)}>
        Add Task
      </Button>
      <SelectButton
        id="status"
        onChange={(e) => updateFilter(e)}
        value={filterStatus}
      >
        <option value="all">All</option>
        <option value="incomplete">Incomplete</option>
        <option value="complete">Completed</option>
      </SelectButton>
      {/* Dodaj SelectButton dla sortowania */}
      <SelectButton id="sortType" onChange={handleSortChange} value={sortType}>
        <option value="dateAdded">Date Added</option>
        <option value="dueDate">Due Date</option>
      </SelectButton>
      <TodoModal type="add" modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  );
}

export default AppHeader;
