import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) {
        setUser(data.user);
        fetchTasks();
      }
    };
    getUser();
  }, []);

  const signUp = async () => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
    else {
      setUser(data.user);
      fetchTasks();
    }
  };

  const signIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
    else {
      setUser(data.user);
      fetchTasks();
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setTasks([]);
  };

  const fetchTasks = async () => {
    const { data } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) setTasks(data);
  };

  const addTask = async () => {
    if (!title) return;

    const { data: { user } } = await supabase.auth.getUser();

    await supabase.from('tasks').insert([
      { title, due_date: dueDate, user_id: user.id }
    ]);

    setTitle('');
    setDueDate('');
    fetchTasks();
  };

  const toggleComplete = async (task) => {
    await supabase
      .from('tasks')
      .update({ completed: !task.completed })
      .eq('id', task.id);

    fetchTasks();
  };

  const deleteTask = async (id) => {
    await supabase.from('tasks').delete().eq('id', id);
    fetchTasks();
  };

  if (user) {
    return (
      <div className="app">
        <div className="card">
          <h1>Nucleus 🧠</h1>
          <p style={{ textAlign: 'center', opacity: 0.7 }}>{user.email}</p>

          <input
  placeholder="What needs your focus today?"

            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <input
            type="date"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
          />

         <button onClick={addTask}>Add Task ➕</button>

          <button onClick={signOut}>Logout</button>

          <ul>
            {tasks.map(task => (
              <li
                key={task.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  opacity: task.completed ? 0.5 : 1,
                  textDecoration: task.completed ? 'line-through' : 'none'
                }}
              >
                <span onClick={() => toggleComplete(task)} style={{ cursor: 'pointer' }}>
                  {task.completed ? '✔️' : '⭕'} {task.title}
                  {task.due_date && (
                    <small style={{ marginLeft: '8px', opacity: 0.6 }}>
                      📅 {task.due_date}
                    </small>
                  )}
                </span>

                <button
                  onClick={() => deleteTask(task.id)}
                  style={{ width: 'auto', padding: '0.3rem 0.6rem' }}
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="card">
        <h1>Nucleus 🧠</h1>

        <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />

        <button onClick={signUp}>Sign Up</button>
        <button onClick={signIn}>Login</button>
      </div>
    </div>
  );
}

export default App;
