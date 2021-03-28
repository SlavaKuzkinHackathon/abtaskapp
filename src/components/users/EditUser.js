import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory, useParams, Link } from 'react-router-dom'

const EditUser = () => {
  let history = useHistory();
  const { id } = useParams();
  const [user, setUser] = useState({
    date_Registration: "",
    date_Last_Activity: ""
  })

  const { date_Registration, date_Last_Activity } = user
  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async e => {
    e.preventDefault();
    await axios.put(`https://localhost:5001/api/users/${id}`, user);
    history.push("/");
  };


  const loadUser = async () => {
    const result = await axios.get(`https://abtask.azurewebsites.net/api/users/${id}`);
    setUser(result.data);
  };
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h3 className="text-center mb-4"> Edit UserID : {id}</h3>
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
          <button className="btn btn-warning btn-block">Update User</button>
        </form>
        <br />
        <div>
          <Link className="btn btn-success" to="/">
            back to Home
          </Link>
        </div>
      </div>

    </div>
  );
}

export default EditUser
