import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Context, server } from '../main';
import { toast } from 'react-toastify';
import Tasks from '../components/Tasks.jsx';
import { Navigate } from 'react-router-dom';

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const { isAuthenticated } = useContext(Context)

  const updateHandler = async (id) => {
    try {
      const { data } = await axios.put(`${server}/tasks/${id}`, {}, {
        withCredentials: true,
      });
      toast.success(data.message);
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`${server}/tasks/${id}`, {
        withCredentials: true,
      });
      toast.success(data.message);
      setTasks((prevTasks) => prevTasks.filter(task => task._id !== id));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`${server}/tasks/new`, {
        title, description
      },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json"
          },
        });
      toast.success(data.message);
      setLoading(false);
      setTitle("");
      setDescription("");
      setRefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    axios.get(`${server}/tasks/my`, {
      withCredentials: true,
    })
      .then((res) => {
        setTasks(res.data.tasks);
      }).catch(error => {
        toast.error(error.response.data.message);
      });
  }, [refresh]);

  if (!isAuthenticated) return <Navigate to="/" />

  return (
    <div className='container'>
      <div className="login">
        <section>
          <form onSubmit={submitHandler}>
            <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder='Title' required />
            <input value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder='Description' required />
            <button disabled={loading} className='submit'>Add Task</button>
          </form>
        </section>
      </div>

      <section className='todosContainer'>
        {tasks.map((i) => (
          <Tasks
            key={i._id}
            title={i.title}
            description={i.description}
            isCompleted={i.isCompleted}
            updateHandler={updateHandler}
            deleteHandler={deleteHandler}
            id={i._id}
          />
        ))}
      </section>
    </div>
  )
}

export default Home;
