import React, { Dispatch, SetStateAction } from "react";
import { Button } from "react-bootstrap";
import { useAppDispatch } from "../hooks/hooks";
import { ITodo } from "../interfaces/interfaces";
import { deleteCurrentTodoId, getCurrentTodoId } from "../store/todo/actions";
import classes from "../styles/styles.module.css";
import { convertedDate } from "../utility/dateFormat";

interface Props {
  t: ITodo;
  setShow: Dispatch<SetStateAction<boolean>>;
}

const TodoRowComponent: React.FC<Props> = (props: Props) => {
  const dispatch = useAppDispatch();
  const handleShow = () => {
    dispatch(getCurrentTodoId(props.t.id));
    props.setShow(true);
  };

  const handleDelete = () => {
    dispatch(deleteCurrentTodoId(props.t.id));
  };

  return (
    <tr>
      <td colSpan={2} className={classes.table__data}>
        {props.t.description}
      </td>
      <td colSpan={1} className={classes.table__data}>
        <div className={classes.space__between}>
          {convertedDate(new Date(props.t.createdAt))}
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
              <Button variant="danger" size="sm" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          }
        </div>
      </td>
    </tr>
  );
};
export default TodoRowComponent;
