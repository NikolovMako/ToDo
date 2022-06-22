import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import { ITodo } from "../interfaces/interfaces";
import EditTodo from "../modals/editTodo";
import classes from "../styles/styles.module.css";
import TodoRowComponent from "./TodoRowComponent";

interface Props {
  todo: ITodo[];
}

const TodoCard: React.FC<Props> = ({ todo }) => {
  const [show, setShow] = useState(false);

  return (
    <Table
      bordered
      variant="dark"
      responsive="lg"
      className={classes.rounded__table}
    >
      <thead>
        <tr>
          <th colSpan={2}>Description</th>
          <th colSpan={1}>Date</th>
        </tr>
      </thead>
      {show ? <EditTodo show={show} setShow={setShow} /> : null}
      <tbody>
        {todo.map((t: ITodo) => {
          return <TodoRowComponent key={t.id} t={t} setShow={setShow} />;
        })}
      </tbody>
    </Table>
  );
};

export default TodoCard;
