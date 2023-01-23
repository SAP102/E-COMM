import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from './Sidebar'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut, Line } from "react-chartjs-2";
import {  useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../actions/userAction';
import { getAllProduct } from '../../actions/productAction';

function Dashbord() {

  const dispatch = useDispatch();

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  }

  const labels = ['Initial Amount', 'Emount Erned'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Total Amount',
        data: [0, 1000],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };

  const doughnutchart = {
    labels: ['Out of Stoke', 'InStoke'],
    datasets: [
      {
        label: '# of Votes',
        data: [2, 10],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const recentHires = [
    {
      name: 'Leonard Krasner',
      handle: 'leonardkrasner',
      imageUrl:
        'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      href: '#',
    },
    {
      name: 'Floyd Miles',
      handle: 'floydmiles',
      imageUrl:
        'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      href: '#',
    },
    {
      name: 'Emily Selman',
      handle: 'emilyselman',
      imageUrl:
        'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      href: '#',
    },
    {
      name: 'Kristin Watson',
      handle: 'kristinwatson',
      imageUrl:
        'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      href: '#',
    },
  ]

  const { users } = useSelector((state) => state.allUsers);
  const {allProduct} = useSelector(state => state.allProduct)

  useEffect(()=>{
    dispatch(getAllUsers())
    dispatch(getAllProduct())
  },[dispatch])

  return (
    <>
      <div className="flex min-h-[640px] bg-gray-100">
        <div className="flex w-64 flex-col">
          <Sidebar />
        </div >
        <div className="w-full">
          <div className="mx-auto max-w-full px-4 sm:px-6 lg:px-8">
            {/* <h3 className="text-lg font-medium  leading-6 text-gray-900">Dashbord</h3> */}
            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">

              <Link to='/admin/allproducts'>
                <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                  <dt className="truncate text-sm font-medium text-gray-500">Products</dt>
                  <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{allProduct.length}</dd>
                </div>
              </Link>
              <Link to='/admin/Orders'>
                <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                  <dt className="truncate text-sm font-medium text-gray-500">Orders</dt>
                  <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">7</dd>
                </div>
              </Link>
              <Link to='/admin/user'>
                <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
                  <dt className="truncate text-sm font-medium text-gray-500">Users</dt>
                  <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">{users.length}</dd>
                </div>
              </Link>

            </dl>
            <div className='flex items-center justify-between w-full mt-9 rounded-lg border-4 border-dashed border-gray-200 p-2'>
              <div className='w-1/2'>
                <Line options={options} data={data} />
              </div>
              <div className=''>
                <Doughnut data={doughnutchart} width={350} />
              </div>
            </div>
            <section aria-labelledby="recent-hires-title">
                  <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="p-6">
                      <h2 className="text-base font-medium text-gray-900" id="recent-hires-title">
                        Recent Hires
                      </h2>
                      <div className="mt-6 flow-root">
                        <ul role="list" className="-my-5 divide-y divide-gray-200">
                          {recentHires.map((person) => (
                            <li key={person.handle} className="py-4">
                              <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                  <img className="h-8 w-8 rounded-full" src={person.imageUrl} alt="" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="truncate text-sm font-medium text-gray-900">{person.name}</p>
                                  <p className="truncate text-sm text-gray-500">{'@' + person.handle}</p>
                                </div>
                                <div>
                                  <a
                                    href={person.href}
                                    className="inline-flex items-center rounded-full border border-gray-300 bg-white px-2.5 py-0.5 text-sm font-medium leading-5 text-gray-700 shadow-sm hover:bg-gray-50"
                                  >
                                    View
                                  </a>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-6">
                        <a
                          href="#"
                          className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                        >
                          View all
                        </a>
                      </div>
                    </div>
                  </div>
                </section>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashbord