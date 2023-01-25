import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, deleteUser, getAllUsers } from '../../actions/userAction';
import { DELETE_USER_RESET } from '../../constants/userConstants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './Sidebar'
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import DeletePopup from '../page/DeletePopup';

function User() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [searchField, setSearchField] = useState("")
  const [delPage, setDelPage] = useState(false)
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [picture, setpicture] = useState('')
  const { error, users } = useSelector((state) => state.allUsers);
  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const hendelDelete = (id, picture, name) => {
    // dispatch(deleteUser(id));
    setId(id)
    setDelPage(!delPage)
    setName(name)
    setpicture(picture)
  }

  const searchHandler = (event) => {
    setSearchField(event.target.value)
  }

  useEffect(() => {
    dispatch(getAllUsers())
    if (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 1500,
      });
      dispatch(clearErrors())
    }
    if (deleteError) {
      toast.error(deleteError, {
        position: "top-right",
        autoClose: 1500,
      });
      dispatch(clearErrors())
    }
    if (isDeleted) {
      toast.success(message, {
        position: "top-right",
        autoClose: 1500,
      });
      // navigate("/admin/user")
      dispatch({
        type: DELETE_USER_RESET
      })
    }
  }, [dispatch, error, deleteError, isDeleted, message])

  return (
    <>
      <div className="flex min-h-[640px] bg-gray-100">
        <div className="flex w-64 flex-col">
          <Sidebar />
        </div>
        <div className="w-full">
          <div className="mx-auto max-w-full py-[2.5%] px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-xl font-semibold text-gray-900">Users</h1>
                <p className="mt-2 text-sm text-gray-700">
                  A list of all the users in your account including their name, title, email and role.
                </p>
              </div>
            </div>
            <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
              <div className="flex items-center px-6 py-4 md:mx-auto md:max-w-3xl lg:mx-0 lg:max-w-none xl:px-0">
                <div className="w-full">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-indigo-500 focus:text-gray-900 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                      placeholder="Search"
                      type="search"
                      onChange={searchHandler}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 flex flex-col">
              <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                            Name
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Title
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Status
                          </th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                            Role
                          </th>
                          <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                            <span className="sr-only">Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {users.filter((val) => {
                          if (searchField === "") {
                            return val;
                          } else if (val.name.toLowerCase().includes(searchField.toLowerCase())) {
                            return val;
                          } else if (val.role.toLowerCase().includes(searchField.toLowerCase())) {
                            return val;
                          } else {
                            return false;
                          }
                        }).map((person) => (
                          <tr key={person._id}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                              <div className="flex items-center">
                                <div className="h-10 w-10 flex-shrink-0">
                                  <img className="h-10 w-10 rounded-full" src={person?.avatar.url} alt="" />
                                </div>
                                <div className="ml-4">
                                  <div className="font-medium text-gray-900">{person.name}</div>
                                  <div className="text-gray-500">{person.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <div className="text-gray-900">{person.title}</div>
                              <div className="text-gray-500">{person.department}</div>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                Active
                              </span>
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.role}</td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <button className="text-indigo-600 hover:text-indigo-900">
                                Edit
                              </button>
                            </td>
                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                              <button onClick={() => hendelDelete(person._id, person?.avatar.url, person.name)} className="text-indigo-600 hover:text-indigo-900">
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAl0lEQVR4nO2WUQqAIAyGfepSdQj3g0eKLpqdIfdiGBEUEeUqqPbDHlS2fWwqM0alylAP2AB0DMSV+XRm7hYDfiP5DPEEQEx2dF+ciC+y9wFcUVZxW1gBsCyhdC1uASsAtAXQSxj1GfKvP6Kz+gSAn4KUp32trUZfojYbIBA10kkoAHU2QHSumCD2JuFtI2pT8hQjG0D1eQ37A1bctuA+ggAAAABJRU5ErkJggg==" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>

      {
        delPage && <DeletePopup delPage={delPage} setDelPage={setDelPage} picture={picture} name={name} id={id} />
      }
    </>
  )
}

export default User
