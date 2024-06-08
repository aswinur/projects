import React from 'react'
import { Link } from 'react-router-dom'
import {Row,Col} from 'react-bootstrap'


function Footer() {
  return (
    <>
      <div className="p-5 w-100 bg-dark">
        <Row>
          <Col>
            <h3 className="text-light">Project Fair 2024</h3>
            <p style={{textAlign:'justify'}} className='text-light'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters</p>
          </Col>

          <Col className='d-flex flex-column align-items-center'>
            <h3 className="text-light">Links   </h3>
              <Link to={'/'}>Landing</Link>
              <Link to={'/log'}>Login</Link>
              <Link to={'/reg'}>Register</Link>
         
          </Col>

          <Col className='d-flex flex-column align-items-center'>
            <h3 className="text-light">References</h3>
            <a href="https://react.dev/" target='_blank'>React</a>
            <a href="https://react-bootstrap.netlify.app/" target='_blank'>React-Bootstrap</a>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Footer