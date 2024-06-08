import React from 'react'
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import {Row,Col} from 'react-bootstrap'
import server_url from '../services/server_url'

function ProjectCard({project}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <>
     <Card style={{ width: '18rem' }}>
      <Card.Img style={{height:'250px'}} onClick={handleShow} variant="top" src={project.image?`${server_url}/uploads/${project.image}`:"https://www.shutterstock.com/image-photo/presentation-project-management-areas-knowledge-600nw-706715482.jpg"} />
      <Card.Body>
        <Card.Title>{project.title}</Card.Title>
      </Card.Body>
    </Card>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{project.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                <Col>
                    <img style={{height:'250px'}} src={project.image?`${server_url}/uploads/${project.image}`:"https://www.shutterstock.com/image-photo/presentation-project-management-areas-knowledge-600nw-706715482.jpg"} alt="" className="img-fluid" />
                </Col>
                <Col>
                    <h4>{project.title}</h4>
                    <p>{project.overview}</p>
                    <h6>{project.language}</h6>
                    <div className="mt-3 p-5 d-flex justify-content-between">
                        <a href={project.github}>
                            <i className="fa-brands fa-github fa-xl"></i>
                        </a>
                        <a href={project.demo}>
                            <i className="fa-solid fa-link fa-xl"></i>
                        </a>
                    </div>
                </Col>
            </Row>
        </Modal.Body>
        
      </Modal>
    </>
  )
}

export default ProjectCard