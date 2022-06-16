import { Dispatch, SetStateAction, useState } from "react";
import { Button, Modal } from "react-bootstrap";

interface Props {
  show?: boolean;
  setShow?: Dispatch<SetStateAction<boolean>>;
  handleShow?: Dispatch<SetStateAction<boolean>>;
}

const EditTodo: React.FC<Props> = () => {
  //   const [show, setShow] = useState(false);
  //   const handleClose = () => setShow(false);
  //   const handleShow = () => setShow(true);

  return (
    <>
      <Modal>
        <Modal.Header>
          <Modal.Title>Edit Description</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Description to be added</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger">Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditTodo;
