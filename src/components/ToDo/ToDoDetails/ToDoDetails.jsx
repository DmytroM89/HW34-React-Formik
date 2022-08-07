import './ToDoDetails.scss';
import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import {Button, Container, Divider} from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {useDispatch} from "react-redux";
import {getTodoAction, updateToDoInfo} from "../../../store/actions";
import {ErrorMessage, Form, Formik} from "formik";
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';

function ToDoDetails() {
  let { id } = useParams();
  const [todo, setTodo] = useState({
    name: '',
    done: false
  });
  const dispatch = useDispatch();

    useEffect(() => {
      async function getTodoInfo() {
        const todoInfo = await dispatch(getTodoAction(id));
        setTodo(todoInfo);
      }

      getTodoInfo();
    }, [id])

    function onSubmit(value) {
      dispatch(updateToDoInfo(id, value));
    }

    function validation(values) {
      const errors = {};

      if (!values.name.length) {
        errors.name = 'Field is required';
      }

      return errors;
    }

    return (
      <Container className="main-container" maxWidth="sm">
        <Link to="/" underline="none">
            <Button variant="contained" startIcon={<ArrowBackIosIcon />}>Back</Button>
        </Link>

        <Divider />

        <h3>Todo info</h3>
        <p><strong>Name:</strong> {todo.name}</p>
        <p><strong>Status:</strong> {todo.done ? 'Completed' : 'Not completed'}</p>

        <Divider />

        <Formik enableReinitialize={true}
                initialValues={todo}
                onSubmit={onSubmit}
                validate={validation}>
          {
            (formik) => (
              <Form>
                <TextField name="name" value={formik.values.name} onChange={formik.handleChange} variant="standard"/>
                <Checkbox name="done" checked={formik.values.done} onChange={formik.handleChange} />
                <Button color="success" variant="contained" type="submit" disabled={formik.isSubmitting || !formik.dirty}>
                  Submit
                </Button>
              </Form>
            )
          }
        </Formik>

      </Container>
    );
}

export default ToDoDetails;
