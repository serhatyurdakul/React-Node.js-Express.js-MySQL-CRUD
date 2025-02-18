import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  console.log("book: ", book);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/books", book);
      navigate("/");
    } catch (err) {
      console.log("An error occurred while adding a book: ", err);
    }
  };

  return (
    <div className='form'>
      <h1>Add New Book</h1>
      <input
        type='text'
        placeholder='title'
        onChange={handleChange}
        name='title'
      />
      <input
        type='text'
        placeholder='desc'
        onChange={handleChange}
        name='desc'
      />
      <input
        number='text'
        placeholder='price'
        onChange={handleChange}
        name='price'
      />
      <input
        type='text'
        placeholder='cover'
        onChange={handleChange}
        name='cover'
      />
      <button className='formButton' onClick={handleClick}>
        Add
      </button>
    </div>
  );
};

export default Add;
