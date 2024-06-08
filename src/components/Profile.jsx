import React, { useEffect, useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form'
import server_url from '../services/server_url'
import { toast } from 'react-toastify';
import { updateProfile } from '../services/allApis';

function Profile() {
    const [user, setUser] = useState({
        id: "", username: "", email: "", password: "", github: "", linkdin: "", profile: ""
    })

    const [open, setOpen] = useState(false)
    const [preview, setPreview] = useState()
    const [existingProfile, setExistingprofile] = useState("")
    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            const userDetails = JSON.parse(sessionStorage.getItem('userDetails'))
            setUser({
                id: userDetails._id, username: userDetails.username, email: userDetails.email, password: userDetails.password,
                github: userDetails.github, linkdin: userDetails.linkdin, profile: ""
            })
            setExistingprofile(userDetails.profile)
        }
    }, [open])

    useEffect(() => {
        if (user.profile) {
            setPreview(URL.createObjectURL(user.profile))
        }
        else {
            setPreview("")
        }
    }, [user.profile])
    console.log(user);

    const handleUpdate =async () => {
        console.log(user);
        const {username,password,email,github,linkdin,profile}=user
        if(!username || !password || !email || !github || !linkdin){
            toast.error("Enter valid inputs")

        }
        else{
            const formData=new FormData()
            formData.append("username",username)
            formData.append("password",password)
            formData.append("email",email)
            formData.append("github",github)
            formData.append("linkdin",linkdin)
            preview?formData.append("profile",profile):formData.append("profile",existingProfile)

            const header={
                "Authorization":`Bearer ${sessionStorage.getItem('token')}`,
                "Content-Type":preview?"multipart/form-data":"application/json"
            }

            const result=await updateProfile(header,formData)
            if(result.status==200){
                console.log(result.data);
                toast.success("Profile successfully updated")
                sessionStorage.setItem("userDetails",JSON.stringify(result.data))
                setOpen(!open)
            }
            else{
                toast.error(result.response.data)
            }
        }
    }

    return (
        <>
            <div className='p-5 border shadow border-3 m-3'>
                <div className='d-flex justify-content-between'>
                    <h4>Profile</h4>
                    <button className="btn">
                        <i className="fa-solid fa-down-long" onClick={() => { setOpen(!open) }} />
                    </button>
                </div>
                {
                    open &&
                    <div>
                        <label>
                            <input type="file" onChange={(e) => setUser({ ...user, profile: e.target.files[0] })} name='' id='in' style={{ display: 'none' }} />
                            {
                                existingProfile == "" ?
                                    <img src={preview ? preview : "https://png.pngtree.com/png-vector/20191110/ourmid/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg"} alt="im" className="img-fluid" />
                                    :
                                    <img src={preview ? preview : `${server_url}/uploads/${existingProfile}`} alt="im" className="img-fluid" />

                            }
                        </label>

                        <FloatingLabel controlId="username" label="Username" className="mb-3">
                            <Form.Control type="text" placeholder="Username" value={user?.username} onChange={(e) => setUser({ ...user, username: e.target.value })} />
                        </FloatingLabel>
                        <FloatingLabel controlId="git" label="GitLink" className="mb-3">
                            <Form.Control type="text" placeholder=" Git account url" value={user?.github} onChange={(e) => setUser({ ...user, github: e.target.value })} />
                        </FloatingLabel>
                        <FloatingLabel controlId="Linkdin" label="LinkdIn Url" className="mb-3">
                            <Form.Control type="text" placeholder="LinkdIn Url" value={user?.linkdin} onChange={(e) => setUser({ ...user, linkdin: e.target.value })} />
                        </FloatingLabel>
                        <div className="d-grid mt-3">
                            <button className="btn btn-warning btn-block" onClick={handleUpdate}>Update</button>
                        </div>
                    </div>
                }


            </div>

        </>
    )
}

export default Profile