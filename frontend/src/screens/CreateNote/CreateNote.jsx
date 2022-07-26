import React from 'react'
import MainScreen from '../../components/MainScreen';
import ReactMarkdown from "react-markdown"
import { Button, Card, Form } from 'react-bootstrap';
import { useState } from 'react';
import Loading from '../../components/Loading/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createNote} from "../../actions/notesAction";
import ErrorMessage from '../ErrorMessage/ErrorMessage';


const CreateNote = () => {

    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
    const [category,setCategory] = useState("");
    const navigate = useNavigate()
    
    
    const resetHandler = () =>{
        setTitle("");
        setCategory("");
        setContent("");
    }


    const dispatch = useDispatch();
    const noteCreate=useSelector(state => state.noteCreate)
    const {loading,error,note} = noteCreate;

    const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(createNote(title, content, category));
      if (!title || !content || !category) return;

      resetHandler();
      navigate("/mynotes");
    };

  return (
    <MainScreen title="CREATE NEW NOTE">
      <Card>
        <Card.Header>New Note</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                value={title}
                placeholder="Enter the title"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="content">
              <Form.Label>content</Form.Label>
              <Form.Control
                as="textarea"
                value={content}
                placeholder="Enter the content"
                rows={4}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            {content && (
              <Card>
                <Card.Header>Note Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}

            <Form.Group controlId="content">
              <Form.Label>category</Form.Label>
              <Form.Control
                type="content"
                value={category}
                placeholder="Enter the category"
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>

            {loading && <loading size={50} />}
            <Button
              type="submit"
              variant="primary"
              style={{ marginTop: " 15px" }}
            >
              Create Note
            </Button>
            <Button
              className="mx-2"
              onClick={resetHandler}
              variant="danger"
              style={{ marginTop: " 15px" }}
            >
              Reset Feilds
            </Button>
          </Form>
        </Card.Body>
        <Card.Footer className="text-muted">
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
}

export default CreateNote;