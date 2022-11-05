import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import { ITodo } from "../interfaces/interfaces";
import EditTodo from "../modals/editTodo";
import classes from "../styles/styles.module.css";
import TodoRowComponent from "./TodoRowComponent";
import { Button, Form, Modal } from "react-bootstrap";
interface Props {
  todo: ITodo[];
}


const TodoCard: React.FC<Props> = ({ todo }) => {

const [isModal,setIsModal] = useState<boolean>(true)

  const [show, setShow] = useState(false);

  return (
    <Table
    bordered
    variant="dark"
    responsive="lg"
    className={classes.rounded__table}
    >
     

      {/* {show ? <EditTodo show={show} setShow={setShow} /> : null} */}
      <thead>
        <tr>
          <th colSpan={2}>Description</th>
          <th colSpan={1}>Date</th>
        </tr>
      </thead>
      {/* <Modal show={show} onHide={handleClose}></Modal> */}
      <tbody>
        {todo.map((t: ITodo) => {
          return <TodoRowComponent key={t.id} t={t} setShow={setShow} />;
        })}
      </tbody>
      <Button variant="primary" onClick={() => setIsModal(true)}>
          Launch demo modal
        </Button>
      {isModal ? 
        <Modal backdrop show={isModal} onHide={() => setIsModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setIsModal(false)}>
                Close
              </Button>
           
            </Modal.Footer>
          </Modal>
    
    : null}
    </Table>
    
  );
};

export default TodoCard;
