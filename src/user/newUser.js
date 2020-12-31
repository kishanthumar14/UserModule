import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import { UserWrapper } from "./userWrapper";

const newUser=(props)=> {
    const {visibleModel,handleClose,validName,submitted,validEmail,validNum,userData,setData,submit,type}=props;
    return (
     
        <Modal show={visibleModel} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{type === "edit" ? "Edit User" : "Add User" }</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <UserWrapper>
                    <div>
                        <label className="lab">User Name</label>
                        <input style={{ margin: "10px" }} value={userData.user_name ? userData.user_name : ""} placeholder="UserName" onChange={(e) => setData(e.target.value, "user_name")} />
                        {validName ?<div className="error">Enter valid Name</div>: submitted && !userData.user_name ? <div className="error">Name Required</div> : ""}
                    </div>
                    <div>
                        <label className="lab">Mobile Num</label>
                        <input style={{ margin: "10px" }} value={userData.mo_num ? userData.mo_num : ""} placeholder="Mobile Number" onChange={(e) => setData(e.target.value, "mo_num")} />
                        {validNum ?<div className="error">Enter valid Number</div>: submitted && !userData.mo_num ? <div className="error">Number Required</div> : ""}
                    </div>
                    <div>
                        <label className="lab">Email id</label>

                        <input style={{ margin: "10px" }} value={userData.email_id ? userData.email_id : ""} placeholder="Email Id" onChange={(e) => setData(e.target.value, "email_id")} />
                        {validEmail ?<div className="error">Enter valid Email</div>: submitted && !userData.email_id ? <div className="error">Email Required</div> : ""}

                    </div>
                    </UserWrapper>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={submit}>Submit</Button>{' '}
                <Button onClick={handleClose}>Close</Button>{' '}
            </Modal.Footer>
        </Modal>
  
    )
}

export default newUser;
