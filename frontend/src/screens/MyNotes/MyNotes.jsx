import React, { useEffect } from 'react'
import Button from 'react-bootstrap/esm/Button'
import Container from 'react-bootstrap/esm/Container'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import MainScreen from '../../components/MainScreen'
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import Accordion from "react-bootstrap/Accordion";
import axios from "axios"
import { useState } from 'react'
import {useDispatch,useSelector} from "react-redux"
import Loading from "../../components/Loading/Loading"
import { deleteNoteAction, listNotes } from '../../actions/notesAction'
import Error from '../../screens/ErrorMessage/ErrorMessage'
const MyNotes = ({search}) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

    const noteList = useSelector((state)=>state.noteList)
    const {loading,notes,error} = noteList;

    const noteUpdate = useSelector((state) => state.noteUpdate);
    const { success:successUpdate } = noteUpdate;

    const userLogin = useSelector((state=>state.userLogin));
    const {userInfo} = userLogin;


    const noteDelete = useSelector(state=>state.noteDelete)
    const {loading:loadingDelete,error:errorDelete,success:successDelete} = noteDelete
    
    const noteCreate = useSelector((state) => state.noteCreate);
    const { success:successCreate } = noteCreate;

    const deleteHandler = (id) => {
      if (window.confirm("Are you sure?")) {
        dispatch(deleteNoteAction(id));
      }
    };

    useEffect(() => {
      dispatch(listNotes())
      if(!userInfo){
        navigate('/')
      }
    }, [dispatch,navigate,successCreate,userInfo,successUpdate,successDelete])
    

  return (
    <MainScreen title={`Welcome back ${userInfo.name}`}>
      <Link to="/createnote">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create New Note
        </Button>
      </Link>
      {error && <Error/>}
      {loading && <Loading />}
      {notes?.reverse().filter((filterNote)=>
       filterNote.title.toLowerCase().includes(search)
    ).map((note) => {
        return (
          <Accordion defaultActiveKey="0" key={note._id}>
            <Accordion.Item eventkey="0">
              <Card style={{ margin: 10 }}>
                <Card.Header style={{ display: "flex" }}>
                  <span
                    style={{
                      color: "black",
                      textDecoration: "none",
                      flex: 1,
                      cursor: "pointer",
                      alignSelf: "center",
                      fontSize: 18,
                    }}
                  >
                    <Accordion.Button as={Card.Text} variant="link">
                      {note.title}
                    </Accordion.Button>
                  </span>

                  <div>
                    <Button href={`/note/${note._id}`}>Edit</Button>
                    <Button
                      onClick={() => deleteHandler(note._id)}
                      variant="danger"
                      className="mx-2"
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Header>
                <Accordion.Collapse>
                  <Card.Body>
                    <h4>
                      <Badge bg="success">{note.category}</Badge>
                    </h4>

                    <blockquote className="blockquote mb-0">
                      <p>{note.content}</p>
                      <footer className="blockquote-footer">
                
                        <cite title='Source Title'>
                          {note.createdAt.substring(0,10)}
                        </cite>
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion.Item>
          </Accordion>
        );
      })}
    </MainScreen>
  );
}

export default MyNotes