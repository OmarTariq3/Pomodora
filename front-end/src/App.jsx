import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [post, setPost] = useState({
    author: '',
    title: '',
    content: '',
  });

  const [posts, setPosts] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };


  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/xxx');
      setPosts(response.data.data); // Assuming the server responds with an array of posts
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (post.author.trim() === '' || post.title.trim() === '' || post.content.trim() === '') {
      alert('Please fill all the fields');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/xxx', post, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Response from server:', response.data);

      fetchPosts(); //Unefficient Because it fetches all the posts again from the server, when we just need to fetch one post that was newly created

      setPost({
        author: '',
        title: '',
        content: '',
      });
    } catch (error) {
      console.error('Error sending post:', error);
    }
  };

  useEffect(() => {
    // Fetch posts from the server when the component mounts
    fetchPosts();
  }, []); // The empty dependency array ensures that the effect runs only once, similar to componentDidMount

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Author:
          <input type="text" name="author" value={post.author} onChange={handleChange} />
        </label>
        <br />
        <label>
          Title:
          <input type="text" name="title" value={post.title} onChange={handleChange} />
        </label>
        <br />
        <label>
          Content:
          <textarea name="content" value={post.content} onChange={handleChange}></textarea>
        </label>
        <br />
        <button type="submit">Post</button>
      </form>

      <ul>
      {console.log('Posts:', posts)}
        {posts.map((p) => (
          <li key={p._id}>
            <h3>{p.author}</h3>
            <h1>{p.title}</h1>
            <p>{p.content}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;

