import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory, Link } from 'react-router-dom'


const AddUser = () => {
  let history = useHistory();
  const [user, setUser] = useState({
    name: "",
    date_Registration: "",
    date_Last_Activity: ""
  })
  const { date_Registration, date_Last_Activity } = user
  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const onSubmit = async e => {
    e.preventDefault()
    await axios.post(`https://abtask.azurewebsites.net/api/users`, user);
    history.push("/")
  }

  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add New User</h2>
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="date"
              className="form-control form-control-lg"
              name="date_Registration"
              value={date_Registration}
              onChange={e => onInputChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="date"
              className="form-control form-control-lg"
              name="date_Last_Activity"
              value={date_Last_Activity}
              onChange={e => onInputChange(e)}
            />
          </div>
          <button className="btn btn-warning btn-block">Add User</button>
        </form>
        <br/>
        <div>
          <Link className="btn btn-success" to="/">
            back to Home
        </Link>
        </div>
      </div>
    </div>
  );
};


export default AddUser
