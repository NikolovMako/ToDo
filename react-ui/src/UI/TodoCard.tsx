import { convertedDate } from "../utility/dateFormat";
import Table from "react-bootstrap/Table";
import { Button } from "react-bootstrap";
import classes from "../styles/styles.module.css";
import { ITodo } from "../interfaces/interfaces";
import EditTodo from "../modals/editTodo";
import { useState } from "react";

interface Props {
  todo: ITodo[];
}

const TodoCard: React.FC<Props> = (todo: Props) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  console.log(todo.todo, "todoCARD");
  return (
    <Table
      bordered
      variant="dark"
      responsive="lg"
      className={classes.rounded__table}
    >
      {show ? <EditTodo show={show} setShow={setShow} /> : null}
      <thead>
        <tr>
          <th colSpan={2}>Description</th>
          <th colSpan={1}>Date</th>
        </tr>
      </thead>
      <tbody>
        {todo.todo.map((t: ITodo) => {
          return (
            <tr key={t.id}>
              <td colSpan={2} className={classes.table__data}>
                {t.description}
              </td>
              <td colSpan={1} className={classes.table__data}>
                <div className={classes.space__between}>
                  {convertedDate(new Date(t.createdAt))}
                  {
                    <div className={classes.align__right}>
                      <Button
                        variant="warning"
                        size="sm"
                        className={classes.little__marg}
                        onClick={handleShow}
                      >
                        Edit
                      </Button>
                      <Button variant="danger" size="sm">
                        Delete
                      </Button>
                    </div>
                  }
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default TodoCard;
