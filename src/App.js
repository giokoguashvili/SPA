import "./styles.css";
import React from "react";
import TodoListController from "./ToDoListController.js";
import { Subject } from "rxjs";
import {
  Table,
  Button,
  InputGroup,
  FormControl,
  Container,
  Row,
  Col
} from "react-bootstrap";

function inputValueChanged(inputValue) {
  return { action: arguments.callee.name, payload: inputValue };
}
function addButtonClicked() {
  return { action: arguments.callee.name };
}

function App({ state, dispatch }) {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <InputGroup className="mb-3">
              <FormControl
                onChange={(e) => dispatch(inputValueChanged(e.target.value))}
                placeholder="Todos"
                aria-label="Todos"
                aria-describedby="basic-addon2"
                value={state.inputState}
              />
              <Button
                onClick={() => dispatch(addButtonClicked())}
                variant="outline-secondary"
                id="button-addon2"
              >
                Button
              </Button>
            </InputGroup>
          </Col>
        </Row>
      </Container>

      <ul>
        {state.todos.map((e, i) => (
          <li key={i}>{e.title}</li>
        ))}
      </ul>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan="2">Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default () => App(TodoListController());
