import { bindActionCreators } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { connect, ConnectedProps } from "react-redux";
import { IDescription, ITodo, IUser } from "../interfaces/interfaces";
import { AppDispatch, RootState } from "../store/store";
import { getTodoList, addTodo } from "../store/todo/actions";
import classes from "../styles/styles.module.css";
import TodoCard from "../UI/TodoCard";
import { Formik } from "formik";
import { todoSchema } from "../validation/todoValidation";
import EditTodo from "../modals/editTodo";

const mapStateToProps = (state: RootState) => ({
  user: state.user,
  todo: state.todo.toDo,
});

const mapDispatchToProps = (dispatch: AppDispatch) =>
  bindActionCreators({ getTodoList, addTodo }, dispatch);

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

const Todo: React.FC<Props> = ({ user, getTodoList, todo, addTodo }) => {
  const [show, setShow] = useState(false);

  const initialValues = {
    description: "",
  };

  useEffect(() => {
    getTodoList();
  }, [getTodoList]);
  console.log("another todo", todo);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={todoSchema}
      onSubmit={async (values: IDescription) => {
        await addTodo(values);
      }}
    >
      {(props) => (
        <>
          <Container className="container">
            <div className={classes.bigger__container}>
              <Form onSubmit={props.handleSubmit}>
                <div className={classes.justify__center}>
                  <Form.Group controlId="description">
                    <Form.Control
                      className={classes.form__control}
                      type="text"
                      placeholder="Enter Description"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.description}
                    />
                  </Form.Group>
                  <Button variant="dark" size="sm" type="submit">
                    Add todo
                  </Button>
                </div>
                {props.errors.description && props.touched.description && (
                  <div id="descriptionConfirm" className={classes.text__center}>
                    {props.errors.description}
                  </div>
                )}
              </Form>
              <br />
              <TodoCard todo={todo} />
            </div>
          </Container>
        </>
      )}
    </Formik>
  );
};

export default connector(Todo);
