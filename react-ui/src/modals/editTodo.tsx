import { Formik } from "formik";
import React, { Dispatch, SetStateAction } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { IDescription, IUser } from "../interfaces/interfaces";
import { editTodo } from "../store/todo/actions";
import classes from "../styles/styles.module.css";
import { todoSchema } from "../validation/todoValidation";

interface Props {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

const EditTodo: React.FC<Props> = ({ show, setShow }) => {
  const todo = useAppSelector((state) => state.todoModal);
  const name = useAppSelector((state) => state.todoModal.user as IUser);
  const handleClose = () => setShow(false);
  const dispatch = useAppDispatch();

  const initialValues = {
    description: "",
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={todoSchema}
      onSubmit={async (values: IDescription) => {
        await dispatch(editTodo(todo.id, values));
      }}
    >
      {(props) => (
        <Modal show={show} onHide={handleClose} backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title>Current User: {name.name}</Modal.Title>
          </Modal.Header>
          <Form onSubmit={props.handleSubmit}>
            <Modal.Body>
              <div className={classes.justify__form__center}>
                <Form.Group controlId="description">
                  <Form.Control
                    type="text"
                    placeholder={todo.description}
                    className={classes.form__edit__control}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.description}
                  />
                </Form.Group>
                {props.errors.description && props.touched.description && (
                  <div id="descriptionEdit" className={classes.text__center}>
                    {props.errors.description}
                  </div>
                )}
                <Button
                  variant="danger"
                  size="sm"
                  type="submit"
                  className={classes.button__small}
                >
                  Add todo
                </Button>
              </div>
            </Modal.Body>
          </Form>
        </Modal>
      )}
    </Formik>
  );
};

export default EditTodo;
