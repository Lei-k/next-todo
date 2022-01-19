import type { NextPage } from 'next';
import { useEffect, useState } from "react";

import { User } from 'models/user';
import { Todo } from "models/todo";

const Home: NextPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  const [userName, setUserName] = useState('');

  const [selected, setSelected] = useState<User>();

  const [todos, setTodos] = useState<Todo[]>([]);

  const [title, setTitle] = useState('');

  const [desc, setDesc] = useState('');

  const fetchUsers = async () => {
    let resp = await fetch('/api/users');

    let users = await resp.json() as User[];

    if (users.length > 0) {
      setSelected(users[0]);
    }

    setUsers(users);
  }

  const addUser = async (userName: string) => {
    let resp = await fetch('api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: userName
      })
    });

    await resp.json();
  }

  const deleteUser = async (userId: string) => {
    let resp = await fetch(`/api/users/${userId}`, {
      method: 'DELETE'
    });

    await resp.json();
  }

  const addTodo = async (userId: string, todo: any) => {
    let resp = await fetch(`/api/users/${userId}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
    });

    await resp.json();
  }

  const fetchTodos = async (userId: string) => {
    let resp = await fetch(`/api/users/${userId}/todos`);

    let todos = await resp.json();

    console.log(todos)

    setTodos(todos);
  }

  const deleteTodo = async (todoId: string) => {
    let resp = await fetch(`/api/todos/${todoId}`, {
      method: 'DELETE'
    });

    await resp.json();
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if(!selected) return;

    fetchTodos(selected.id);
  }, [selected])

  return (
    <div className="font-mono">
      <header className="px-4 py-4 bg-cyan-300 flex justify-center">
        <h1 className="text-3xl text-white">Todo App</h1>
      </header>

      <main className="mt-4">
        <div className="flex">
          <div className="px-4 py-2 w-4/12">

            <div className="flex px-2 py-2">
              <input value={userName} className="text-xl border border-gray-300 w-56 rounded px-2" onChange={(evt) => {
                setUserName(evt.target.value);
              }}></input>

              <button className="ml-2 rounded-3xl bg-cyan-300 px-3 py-3 w-24 text-white text-2xl" onClick={() => {
                addUser(userName).then(() => {
                  fetchUsers();
                })
              }}>+</button>
            </div>

            <div className="border border-gray-500 px-2 rounded">
              <div className="flex justify-center py-2 border-b border-gray-400">
                <h3 className="text-2xl">User List</h3>
              </div>

              <div className="py-2">
                <ul className="">
                  {
                    users.map((user, idx) => (
                      <li key={idx} className="px-1 text-xl flex justify-between hover:bg-cyan-200 py-2 rounded-xl cursor-pointer" onClick={() => {
                        setSelected(user);
                      }}>
                        <h5>{user.name}</h5>

                        <button className="rounded-2xl bg-red-500 text-white text-sm px-3 py-1"
                          onClick={() => {
                            deleteUser(user.id).then(() => {
                              fetchUsers();
                            })
                          }}>Delete</button>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
          </div>

          <div className="px-4 py-2 w-8/12">
            <div className="flex flex-col">
              <div>
                <h3 className="text-xl">Title:</h3>

                <input value={title} className="rounded-xl border border-gray-300 text-2xl w-full mt-2 px-2 py-2"
                onChange={(evt) => {
                  setTitle(evt.target.value);
                }}></input>
              </div>

              <div className="mt-2">
                <h3 className="text-xl">Desc:</h3>

                <textarea value={desc} className="rounded-xl border border-gray-300 text-2xl w-full mt-2 px-2 py-2"
                onChange={(evt) => {
                  setDesc(evt.target.value);
                }}></textarea>
              </div>

              <button className="rounded-3xl bg-cyan-300 px-3 py-1 text-white text-2xl w-full block" onClick={() => {
                if(selected) {
                  addTodo(selected.id, {
                    title,
                    desc
                  }).then(() => {
                    fetchTodos(selected.id);
                  })
                }
              }}>+</button>
            </div>

            <div className="mt-2">
              <h3 className="text-xl px-1">List:</h3>
              <div className="border border-gray-500 px-2 py-2 rounded-xl mt-2">
                <div className="w-full min-h-6">
                  <ul>
                    {
                      todos.map(todo => (
                        <li className="text-sm flex justify-between mb-3">
                          <div className="flex items-center">
                            <h5 className="text-xl mr-2">{todo.title}</h5>
                            -
                            <span className="text-sm ml-2">{todo.desc}</span>
                          </div>

                          <button className="rounded-2xl bg-red-500 text-white text-sm px-3 py-1"
                            onClick={() => {
                              deleteTodo(todo.id).then(() => {
                                if(selected) {
                                  fetchTodos(selected.id)
                                }
                              })
                            }}>Delete</button>
                        </li>
                      ))
                    }
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
