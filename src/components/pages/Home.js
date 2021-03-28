import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'


const Home = () => {
  const [users, setUser] = useState([])

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    const result = await axios.get(`https://abtask.azurewebsites.net/api/users`);
    setUser(result.data.reverse())
  }

  const deleteUser = async id => {
    await axios.delete(`https://abtask.azurewebsites.net/api/users/${id}`)
    loadUsers()
  }

  return (

    <div className="container">
      <div className="py-4">
        <div class="btn-toolbar mb-3" role="toolbar" aria-label="Toolbar with button groups">
          <h3 class="btn-group mr-2" role="group">Users</h3>
          <div class="btn-group mr-2" role="group" aria-label="First group">
            <div class="btn-group mr-2" role="group">
              <Link className="btn btn-success" exact to="/graph">
                Graph
          </Link>
            </div>
            <div class="btn-group mr-2" role="group">
              <Link className="btn btn-info" to="/users/add">Add User</Link>
            </div>
          </div>
        </div>
        <table class="table border shadow">
          <thead class="thead-dark">
            <tr>
              <th scope="col">UserID</th>
              <th scope="col">Date Registration</th>
              <th scope="col">Date Last Activity</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td><Moment format="DD.MM.YYYY">{user.date_Registration}</Moment></td>
                <td><Moment format="DD.MM.YYYY">{user.date_Last_Activity}</Moment></td>
                <td>
                  <Link class="btn btn-primary mr-2" to={`/users/${user.id}`}>
                    View
                    </Link>
                  <Link class="btn btn-outline-primary mr-2" to={`/users/edit/${user.id}`} >
                    Edit
                    </Link>
                  <Link class="btn btn-danger mr-2" onClick={() => deleteUser(user.id)}>
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
      </div>
    </div>
  )
}

export default Home
