import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Practice() {
  const [student, setStudent] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/student")
      .then((res) => setStudent(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete("http://localhost:3001/student/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-content-center">
      <div className="w-50 bg-white rounded p-3">
        <Link to="/create" className="btn btn-success">
          Add
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {student.map((data, i) => (
              <tr key={i}>
                <td>{data.id}</td>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>
                  <Link to={`update/${data.id}`} className="btn btn-primary">
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={(e) => handleDelete(data.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Practice;
