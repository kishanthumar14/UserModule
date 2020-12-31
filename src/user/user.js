import React, { Component } from "react";
import { UserWrapper } from "./userWrapper";
import 'bootstrap/dist/css/bootstrap.min.css';
import NewUser from "./newUser";
class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: Math.floor(Math.random() * 100),
            users: [
                { user_name: "CCCCC", email_id: "k@mail.com", mo_num: 909090909, id: 1 },
                { user_name: "bbbbb", email_id: "k@mail.com", mo_num: 909090909, id: 2 },
                { user_name: "AAAAAA", email_id: "k@mail.com", mo_num: 909090909, id: 3 }
            ],
            userData: {},
            validEmail: false,
            validNum: false,
            validName: false,
            visibleModel: false,
            type: "new",submitted:false,selectedId:1
        }
    }
    delete = (i) => {
        const { users } = this.state;
        if (window.confirm('Delete the User?')) {
            users.splice(i, 1);
            this.setState({ users });
        }
    }

    setData = (e, type) => {
            this.setState({ submitted: false });
        const userData = { ...this.state.userData };
        if (type === "user_name") {
            const re = /^[a-zA-Z_-_.,]{1,16}$/;
            if (((re.test(e)))) {
                userData[type] = e;
                this.setState({ userData, validName: false });
            } else {
                if (!e) {
                    userData[type] = e;
                }
                this.setState({ userData, validName: true });
            }
        }
        if (type === "email_id") {
            const email1 = /[^@]+@[^@]+\.[^@]+/;
            if (((email1.test(e)))) {
                userData[type] = e;
                this.setState({ userData, validEmail: false });
            } else {
                // if (!e) {
                userData[type] = e;
                // }
                this.setState({ userData, validEmail: true });
            }
        }
        else if (type === "mo_num") {
            const u1 = /^[0-9\b]+$/;
            if (((u1.test(e))) && e.length <= 10) {
                userData[type] = e;
                this.setState({ userData, validNum: false });
            } else {
                if (!e) {
                    userData[type] = e;
                }
                this.setState({ userData, validNum: true });
            }
        }
        else {
            if (e !== " ") {
                userData[type] = e;
                this.setState({ userData });
            }
        }


    }
    filter = (e) => {
        var table, tr, td, i, txtValue;
        table = document.getElementById("myTable");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(e.target.value.toUpperCase()) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    }

    submit = () => {
        const { userData, users, user_id, type,selectedId } = this.state;

        this.setState({ submitted: true });
        const { user_name,mo_num,email_id } = this.state.userData;
        if (!(user_name && mo_num && email_id)) {
            return;
        }
        let re = /[^@]+@[^@]+\.[^@]+/;
        let number = /^[0-9\b]+$/;
        let u1 = /^[a-z0-9_-_,.]{1,16}$/;
        if (u1.test(user_name) === true) {
            this.setState({ validName: false });
        }

        if (
            re.test(email_id) === false &&
            number.test(mo_num) === false
        ) {
            this.setState({ validEmail: true, validNum: true });
            return;
        }
        if (re.test(email_id) === true) {
            this.setState({ validEmail: false });
        }
        if (re.test(email_id) === false) {
            this.setState({ validEmail: true, validNum: false });
            return;
        }
        if (number.test(mo_num) === false) {
            this.setState({ validNum: true, validEmail: false });
            return;
        }
        if (type === 'new') {
            userData["user_id"] = user_id;
            users.push(userData);
            this.setState({ visibleModel: false, users, userData: {},submitted:false })
        }
       
        if (type === 'edit') {
            let updateIndex = users.findIndex(e => e.id === selectedId);
            users.splice(updateIndex, 1);
           users.push(userData)
            this.setState({ visibleModel: false, users, userData: {},submitted:false })
        }
    }



  
    openModel = (e,id) => {
        const { users } = this.state;
        if (e === "edit") {
            let updateIndex = users.findIndex(e => e.id === id);
this.setState({userData:users[updateIndex],selectedId:id})
        }
         this.setState({ visibleModel: true,selectedId:1, type: e, validEmail: false, validName: false, validNum: false,submitted:false })
    }
    handleClose = () => [
        this.setState({ visibleModel: false,selectedId:1,validEmail: false, validName: false, validNum: false,submitted:false })
    ]
    render() {
        const { users, userData,submitted, validEmail, type, validNum, validName, visibleModel } = this.state;
        return (
            <UserWrapper>
<h2>User Module</h2>

                <button type="button" className="btn btn-info" onClick={() => this.openModel("new")}>Add User</button>
                <input style={{ margin: "10px" }} value={undefined} id="myInput" placeholder="Search.." onChange={(e) => this.filter(e)} />
                <table id="myTable">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Number</th>
                            <th>Action</th></tr>
                    </thead>
                    <tbody>
                        {users.map((a, i) =>
                            <tr key={i}>
                                <td>{a.user_name}</td>
                                <td>{a.email_id}</td>
                                <td>{a.mo_num}</td>
                                <td><button onClick={(e) => this.openModel("edit",a.id)} className="buttonStyle"><i className="fa fa-edit" size="sm"></i></button>
                                    <button onClick={(e) => this.delete(i)} className="buttonStyle"><i className="fa fa-remove" size="sm"></i></button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <NewUser
                    validNum={validNum}
                    validEmail={validEmail}
                    validName={validName}
                    setData={this.setData}
                    handleClose={this.handleClose}
                    submit={this.submit}
                    type={type}
                    submitted={submitted}
                    userData={userData}
                    visibleModel={visibleModel}
                />
            </UserWrapper>
        )
    }
}
export default User;
