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
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashbord