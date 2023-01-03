import React, { useEffect, useState } from 'react'
import { Disclosure } from '@headlessui/react'
import { CalendarIcon, ChartBarIcon, FolderIcon, HomeIcon, InboxIcon, UsersIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'


function Sidebar() {


const navigation = [
    { name: 'Dashboard', icon: HomeIcon, current: true, href: '/admin/dashbord' },
    { name: 'Users', icon: UsersIcon, current: false, href: '/admin/user' },
    {
      name: 'Product',
      icon: FolderIcon,
      current: false,
      children: [
        { name: 'All',current: false, href: '/admin/allproducts' },
        { name: 'Create', href: '/admin/createproduct' },
        { name: 'Create Category', href: '/admin/createcategory' },
      ],
    },
    { name: 'Orders', icon: CalendarIcon, current: false, href: '/admin/Orders' },
    { name: ' Reviews', icon: InboxIcon, current: false, href: '/admin/Reviews' },
  ]

  const [currents, setCurrents] = useState(false)
  console.log("🚀 ~ file: Sidebar.js:29 ~ Sidebar ~ currents", currents)


  return (
    <>
      <div className='flex min-h-0 flex-1 flex-col'>
        <div className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-white pt-5 pb-4">
          <div className="mt-5 flex flex-grow flex-col">
            <nav className="flex-1 space-y-1 bg-white px-2" aria-label="Sidebar">
              {navigation.map((item) =>
                !item.children ? (
                  <div key={item.name}>
                    
                    <Link
                      to={item.href}
                      className={`${item.current
                        ? 'bg-gray-100 text-gray-900'
                        : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900'}'group w-full flex items-center pl-2 py-2 text-sm font-medium rounded-md'`
                      }
                    >
                      <button onClick={()=>setCurrents(true)}>
                      <item.icon
                        className={`${item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500'}
                      'mr-3 flex-shrink-0 h-6 w-6'`
                        }

                        aria-hidden="true"
                        />
                        </button>
                      {item.name}
                    </Link>
                  </div>
                ) : (
                  <Disclosure as="div" key={item.name} className="space-y-1">
                    {({ open }) => (
                      <>
                        <Disclosure.Button
                          className={`${item.current
                            ? 'bg-gray-100 text-gray-900'
                            : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900'}'group w-full flex items-center pl-2 pr-1 py-2 text-left text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'`
                          }
                        >
                          <item.icon
                            className="mr-3 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"
                          />
                          <span className="flex-1">{item.name}</span>
                          <svg
                            className={`${open ? 'text-gray-400 rotate-90' : 'text-gray-300'}'ml-3 h-5 w-5 flex-shrink-0 transform transition-colors duration-150 ease-in-out group-hover:text-gray-400'`
                            }
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                          >
                            <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                          </svg>
                        </Disclosure.Button>
                        <Disclosure.Panel className="space-y-1">
                          {item.children.map((subItem) => (
                            <Link to={subItem.href}
                            className={`${item.current
                              ? 'bg-gray-100 text-gray-900'
                              : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900'}'group w-full flex items-center pl-2 py-2 text-sm font-medium rounded-md'`
                            }
                             >

                              <Disclosure.Button
                                key={subItem.name}
                                className="group flex w-full items-center rounded-md py-2 pl-11 pr-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                              >
                                {subItem.name}
                              </Disclosure.Button>
                            </Link>
                          ))}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                )
              )}
            </nav>
            {/* <h1 onClick={setCurrent[0].current(false)}>hhhh</h1> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
