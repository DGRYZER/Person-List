import axios from 'axios';
import React, { useEffect, useState } from 'react';
import style from'./home.module.css'

const Favourite = () => {
  const [content, setcontent] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('http://localhost:3000/Name')
      .then((response) => {
        setcontent(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deletePerson = (id) => {
    axios.delete(`http://localhost:3000/Name/${id}`)
      .then(() => {fetchData()})    // Refresh the data after successful deletion
      .catch((error) => {console.log(error)});
  };

  return (
    <div id={style.fav}>
      <div id={style.favtable}>
        <table>
          <thead>
            <tr>
              <th>Sl No.</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {content.map((person, index) => (
              <tr key={index}>
                <td id={style.favslno}>{index + 1}</td>
                <td id={style.favname}>{person.name}</td>
                <td id={style.delete}><button onClick={() => deletePerson(person.id)}>DELETE</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Favourite;
