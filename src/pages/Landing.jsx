import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'
import { Link } from 'react-router-dom'
import { homeProjects } from '../services/allApis'

function Landing() {
    const [token, setToken] = useState("")
    const [projects,setProjects]=useState([])

    useEffect(() => {
        setToken(sessionStorage.getItem("token"))
        getHomeProjects()
        
    },[])
    const getHomeProjects=async()=>{
        const result=await homeProjects()
        // console.log(result);
        if(result.status==200){
            setProjects(result.data)

        }
        else{
            console.log(result.response.data);
        }
    }
    console.log(projects);

    return (
        <>
            <div className="w-100 p-5 align-items-center d-flex " style={{ height: '100vh', backgroundColor: 'rgb(20,137,247)' }}>
                <Row>
                    <Col className='d-flex align-items-center '>
                        <div>
                            <h1 className="display-4 mb-2 text-light">Projecr Fair 2024</h1>

                            <p style={{ textAlign: 'justify' }}>There are many variations of passages of Lorem Ipsum available,
                                but the majority have suffered alteration in some form, by injected humour, or randomised words
                                which don't look even slightly believable. </p>

                            {/* <button className="btn btn-success"></button> */}
                            {
                                token ?
                                    <Link className='btn btn-warning' to={'/dash'}>Manage your projects</Link>
                                    :
                                    <Link className='btn btn-success' to={'/Auth'}>Start to explore...</Link>

                            }
                           
                        </div>
                    </Col>
                    <Col>
                        <img className='img-fluid' src="https://tse4.mm.bing.net/th?id=OIP.qq2W7eoOA_9n9z5b5lLjxwHaDz&pid=Api&P=0&h=180" alt="" />
                    </Col>
                </Row>
            </div>
            <div className="p-5 w-100">
                <h2 className="text-center mt-3 mb-3">Projects for you...</h2>

                <marquee behavior="" direction="">
                    <div className="d-flex justify-content-evenly mt-2">

                        {
                            projects.length>0?
                            projects.map(item=>(
                                <ProjectCard project={item}/>
                            ))
                            :
                            <h5>No projects available...</h5>
                        }
                        
                        
                    </div>
                </marquee>
                <div className="text-center">
                    <Link to={'/projects'}>Click for more...</Link>
                </div>
            </div>

        </>

    )
}

export default Landing