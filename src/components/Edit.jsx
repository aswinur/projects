import React, { useContext } from 'react'
import { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import { Row, Col } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form'
import base_url from '../services/server_url';
import { editProject } from '../services/allApis';
import { toast } from 'react-toastify';
import { editProjectResponseContext } from '../Context Api/Contextapi';

function Edit({ project }) {
    const { editProjectResponse, setEditProjectResponse } = useContext(editProjectResponseContext)
    // const [show, setShow] = useState(false)

    // const handleClose = () => setShow(false)
    // const handleShow = () => setShow(true)
    // console.log(project,"from edit");

    // const [imageStatus, setImageStatus] = useState(false)
    // const [preview, setPreview] = useState("")

    const [projectData, setProjectData] = useState({
        id: project._id, title: project.title, overview: project.overview, language: project.language, github: project.github, demo: project.demo, projectImage: ""
    })
    // console.log(projectData);
    const [imgStatus, setImgStatus] = useState(false)
    const [preview, setPreview] = useState("")

    useEffect(() => {
        if (projectData.projectImage.type == "image/jpg" || projectData.projectImage.type == "image/jpeg" || projectData.projectImage.type == "image/png") {
            setImgStatus(false)
            setPreview(URL.createObjectURL(projectData.projectImage))
        }
        else {
            setImgStatus(true)
            setPreview("")
        }
    }, [projectData.projectImage])

    const handleUpdate = async () => {
        console.log(projectData);
        const { title, overview, language, demo, github } = projectData
        if (!title || !overview || !language || !github || !demo) {
            toast.warning("Invalid inputs... Enter valid input data in every fielde...")
        }
        else {
            const formData = new FormData()
            formData.append("title", title)
            formData.append("overview", overview)
            formData.append("language", language)
            formData.append("github", github)
            formData.append("demo", demo)
            preview ? formData.append("image", projectData.projectImage) : formData.append("image", project.image)

            const token = sessionStorage.getItem("token")
            if (preview) {
                const requestHeader = {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
                const result=await editProject(projectData.id,formData,requestHeader)
                if(result.status==200){
                    toast.success(`project ${projectData.title} updated successfully`)
                    handleClose()
                    setEditProjectResponse(result)
                }
                else{
                    toast.warning(result.response.data)
                }
            }
            else {
                const requestHeader = {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
                const result=await editProject(projectData.id,formData,requestHeader)
                if(result.status==200){
                    toast.success(`project ${projectData.title} updated successfully`)
                    handleClose()
                    setEditProjectResponse(result)
                }
                else{
                    toast.warning(result.response.data)
                }
            }

        }
    }

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        setPreview("")
        setProjectData({
            id: project._id, title: project.title, overview: project.overview, language: project.language, github: project.github, demo: project.demo, projectImage: ""
        })
    }

    const handleShow = () => setShow(true);
    return (
        <>
            <button className="btn me-3" onClick={handleShow}><i className="fa-solid fa-pen-to-square fa-2xl" /> </button>

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
                                    <input onChange={(e) => { setProjectData({ ...projectData, projectImage: e.target.files[0] }) }} type="file" name='' id='in' style={{ display: 'none' }} />
                                    <img src={preview ? preview : `${base_url}/uploads/${project.image}`} alt="im" className="img-fluid" />
                                </label>
                                {
                                    imgStatus &&
                                    <p className="text-danger">Image extension invalid! Image should be jpg ,png or jpeg!!</p>
                                }
                            </Col>
                            <Col>
                                <div>
                                    <FloatingLabel controlId="titleinp" label="Title" className="mb-3">
                                        <Form.Control type="text" onChange={(e) => { setProjectData({ ...projectData, title: e.target.value }) }} value={projectData.title} placeholder="Project Title" />
                                    </FloatingLabel>

                                    <FloatingLabel controlId="overviewinp" label="overview">
                                        <Form.Control type="text" onChange={(e) => { setProjectData({ ...projectData, overview: e.target.value }) }} value={projectData.overview} placeholder="Brief about project" />
                                    </FloatingLabel>

                                    <FloatingLabel controlId="langinp" label="Languages">
                                        <Form.Control type="text" onChange={(e) => { setProjectData({ ...projectData, language: e.target.value }) }} value={projectData.language} placeholder="Languages used" />
                                    </FloatingLabel>

                                    <FloatingLabel controlId="githubinp" label="GitHub Url">
                                        <Form.Control type="text" onChange={(e) => { setProjectData({ ...projectData, github: e.target.value }) }} value={projectData.github} placeholder="GitHub Url" />
                                    </FloatingLabel>
                                </div>
                            </Col>

                            <FloatingLabel controlId="demoinp" label="Demo Url">
                                <Form.Control type="text" onChange={(e) => { setProjectData({ ...projectData, demo: e.target.value }) }} placeholder="Demo Url" value={projectData.demo} />
                            </FloatingLabel>

                        </Row>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>Close</Button>
                    <Button variant='primary' onClick={handleUpdate}>Update</Button>
                </Modal.Footer>

            </Modal>
        </>
    )
}

export default Edit