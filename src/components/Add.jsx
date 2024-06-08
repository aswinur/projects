import React, { useContext } from 'react'
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import { Row, Col } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form'
import { toast } from 'react-toastify';
import { addProject } from '../services/allApis';
import { addProjectResponseContext } from '../Context Api/Contextapi';

function Add() {

    const {addProjectResponse,setAddProjectResponse}= useContext(addProjectResponseContext)
    console.log(useContext(addProjectResponseContext));
    const [show, setShow] = useState(false);
    const [preview, setPreview] = useState("");
    const [projectData, setProjectData] = useState({
        title: "", overview: "", language: "", github: "", demo: "", projectImage: ""
    })

    const [imageStatus, setImageStatus] = useState(false)

    useEffect(() => {
        console.log(projectData);
        if (projectData.projectImage.type == "image/jpg" || projectData.projectImage.type == "image/png" || projectData.projectImage.type == "image/jpeg") {
            // console.log("Image is correct format");
            // console.log(URL.createObjectURL(projectData.projectImage));
            setImageStatus(false)
            setPreview(URL.createObjectURL(projectData.projectImage))
        }
        else {
            console.log("invalid image format... image should be jpg,png or jpeg");
            setImageStatus(true)
            setPreview("")
        }
    }, [projectData.projectImage])

    const handleAddProject = async() => {
        const { title, overview, language, github, demo, projectImage } = projectData
        if (!title || !overview || !language || !github || !demo || !projectImage) {
            toast.warning("Invalid inputs... Enter valid input data in every fielde...")
        }
        else {
            const formData = new FormData()
            formData.append("title", title)
            formData.append("overview", overview)
            formData.append("language", language)
            formData.append("github", github)
            formData.append("demo", demo)
            formData.append("image", projectImage)

            const token =sessionStorage.getItem("token")
            const requestHeader = { 
                "Content-Type": "multipart/form-data" ,
                "Authorization": `Bearer ${token}`
            }
            
            const result=await addProject(formData,requestHeader)
            if(result.status==200){
                toast.success("Project added successfully")
                setProjectData({
                    title:"",overview:"",language:"",github:"",demo:"",projectImage:""
                })
                handleClose()
                setAddProjectResponse(result)
            }
            else{
                toast.error(result.response.data)
            }
        }
    }


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <button className="btn btn-info mb-4" onClick={handleShow}>Add Project</button>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop='static'
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Project 1</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div>
                        <Row>
                            <Col>
                                <label >
                                    <input type="file" onChange={(e) => { setProjectData({ ...projectData, projectImage: e.target.files[0] }) }} style={{ display: 'none' }} />
                                    <img src={preview ? preview : "https://pixsector.com/cache/517d8be6/av5c8336583e291842624.png"} alt="im" className="img-fluid" />
                                </label>
                                {
                                    imageStatus &&
                                    <p className='text-danger'> Invalid file format...Image should be jpg,png or jpeg </p>
                                }

                            </Col>
                            <Col>
                                <div>
                                    <FloatingLabel controlId="titleinp" label="Title" className="mb-3">
                                        <Form.Control type="text" onChange={(e) => setProjectData({ ...projectData, title: e.target.value })} placeholder="Project Title" />
                                    </FloatingLabel>

                                    <FloatingLabel controlId="overview" label="overview">
                                        <Form.Control type="text" onChange={(e) => setProjectData({ ...projectData, overview: e.target.value })} placeholder="Brief about project" />
                                    </FloatingLabel>

                                    <FloatingLabel controlId="langinp" label="Languages">
                                        <Form.Control type="text" onChange={(e) => setProjectData({ ...projectData, language: e.target.value })} placeholder="Languages used" />
                                    </FloatingLabel>

                                    <FloatingLabel controlId="githubinp" label="GitHub Url">
                                        <Form.Control type="text" onChange={(e) => setProjectData({ ...projectData, github: e.target.value })} placeholder="GitHub Url" />
                                    </FloatingLabel>
                                </div>
                            </Col>

                            <FloatingLabel controlId="demoinp" label="Demo Url">
                                <Form.Control type="text" onChange={(e) => setProjectData({ ...projectData, demo: e.target.value })} placeholder="Demo Url" />
                            </FloatingLabel>

                        </Row>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>Close</Button>
                    <Button variant='primary' onClick={handleAddProject}>Save</Button>
                </Modal.Footer>

            </Modal>
        </>
    )
}

export default Add