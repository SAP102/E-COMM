import { useSelector } from "react-redux"

export default function Filter() {

  const { category } = useSelector(state => state.category)

  const filters = [
    {
      id: 'price',
      name: 'Price',
      options: [
        { value: '0', label: '$0 - $25', checked: false },
        { value: '25', label: '$25 - $50', checked: false },
        { value: '50', label: '$50 - $75', checked: false },
        { value: '75', label: '$75+', checked: false },
      ],
    },
    {
      id: 'category',
      name: 'Category',
      options: 
        category?.map((val) => {
          return ({ value: `${val?.name}`, label: `${val?.name}` })
        })
       ,
    }
  ]

  return (
    <div className="bg-white">
      <div>
        <div className="lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-1">
          <aside>
            <div className="hidden lg:block">
              <form className="space-y-10 divide-y divide-gray-200">
                {filters.map((section, sectionIdx) => (
                  <div key={section.name} className={sectionIdx === 0 ? null : 'pt-10'}>
                    <fieldset>
                      <legend className="block text-sm font-medium text-gray-900">{section.name}</legend>
                      <div className="space-y-3 pt-6">
                        {section?.options?.map((option, optionIdx) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              id={`${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              defaultValue={option?.value}
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label htmlFor={`${section.id}-${optionIdx}`} className="ml-3 text-sm text-gray-600">
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </fieldset>
                  </div>
                ))}
              </form>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
