import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: 0,
    cover: "",
  });

  const navigate = useNavigate();
  const { id: bookId } = useParams();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books/" + bookId);
        console.log("API response:", res.data); // Gelen veriyi görelim
        console.log("bookId:", bookId); // ID'yi kontrol edelim
        if (res.data && res.data[0]) {
          setBook(res.data[0]);
          console.log("Set book:", res.data[0]); // State'e ne set edilmiş görelim
        } else {
          console.log("No data received from API");
        }
      } catch (err) {
        console.log("Error fetching book:", err);
      }
    };
    fetchBook();
  }, []);

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:8800/books/" + bookId, book);
      navigate("/");
    } catch (err) {
      console.log("An error occurred while adding a book: ", err);
    }
  };

  return (
    <div className='form'>
      <h1>Update the Book</h1>
      <input
        type='text'
        placeholder='title'
        onChange={handleChange}
        name='title'
        value={book.title || ""}
      />
      <input
        type='text'
        placeholder='desc'
        onChange={handleChange}
        name='desc'
        value={book.desc || ""}
      />
      <input
        type='number'
        placeholder='price'
        onChange={handleChange}
        name='price'
        value={book.price || 0}
      />
      <input
        type='text'
        placeholder='cover'
        onChange={handleChange}
        name='cover'
        value={book.cover || ""}
      />
      <button className='formButton' onClick={handleClick}>
        Update
      </button>
    </div>
  );
};

export default Update;
