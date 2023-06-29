import axios from 'axios';
import React, { useEffect, useState } from 'react';
import style from './home.module.css'

const Home = () => {
  const [content, setcontent] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [search, setSearch] = useState('');
  const [filteredContent, setFilteredContent] = useState([]);

  const fetchPeople = async (currentPage, searchQuery = '') => {
    try {
      const response = await axios.get(`https://swapi.dev/api/people/?page=${currentPage}&search=${searchQuery}`);
      const { results, count } = response.data;
      setcontent(results);
      setFilteredContent(results); // Set the filtered content initially
      const totalPages = Math.ceil(count / 10);
      setTotalPages(totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchPeople(nextPage, search);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      fetchPeople(prevPage, search);
    }
  };

  const handlePersonClick = (person) => {
    setSelectedPerson(person);
  };

  const formhandle = (name, height, mass, haircolor, skincolor) => {
    axios.post(`http://localhost:3000/Name`, { name, height, mass, haircolor, skincolor })
      .then(() => { console.log("Data is posted") })
      .catch(() => { console.log("Data is not posted") })
  }

  const handleSearch = (e) => {
    const filteredResults = content.filter(person => person.name.toLowerCase().includes(search.toLowerCase()));
    setFilteredContent(filteredResults);
    setSearch(e.target.value)
  };

  useEffect(() => {
    fetchPeople(currentPage, search);
  }, [currentPage, search]);

  return (
    <div id={style.home}>
      <div id={style.table}>
        <input type="text" placeholder='Enter Name...' id={style.search} value={search} onChange={handleSearch} />
        <table>
          <thead>
            <tr>
              <th>SL No.</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredContent && filteredContent.map((person, index) => (
              <tr key={index}>
                <td id={style.slno}>{index + 1}</td>
                <td id={style.name} style={{ cursor: 'pointer' }} onClick={() => handlePersonClick(person)}>{person.name}</td>
                <td id={style.btn}><button onClick={() => formhandle(person.name, person.height, person.mass, person.hair_color, person.skin_color)}>Set as Favorite</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div id={style.page}>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous Page</button>
        <div id={style.pagecount}>{currentPage}/{totalPages}</div>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next Page</button>
      </div>

      <div id={style.details}>
        {selectedPerson && (
          <div>
            <h2>Details of {selectedPerson.name}</h2>
            <p><b>Name:</b> {selectedPerson.name}</p>
            <p><b>Height:</b> {selectedPerson.height}</p>
            <p><b>Mass:</b> {selectedPerson.mass}</p>
            <p><b>Hair Color:</b> {selectedPerson.hair_color}</p>
            <p><b>Skin Color:</b> {selectedPerson.skin_color}</p>
            <p><b>Eye Color:</b> {selectedPerson.eye_color}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
