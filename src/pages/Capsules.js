import { useState, useEffect } from "react"
import { Loading } from "../components"
import Pagination from '../components/Pagination'

export default function Capsules() {
  const [TempData, setTempData] = useState([]);
  const [capsules, setCapsules] = useState([])
  const [searchedValue, setSearchedValue] = useState('');
  const [FilteredItems, setFilteredItems] = useState([]);
  const [capsuleTemp, setcapsuleTemp] = useState([]);

  // Pagination -> Section
   const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setpostsPerPage] = useState(10);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  const currentPosts = capsules.slice(firstPostIndex, lastPostIndex)

  //console.log(currentPosts)

  function handlePageChange(){
    setCurrentPage()
  }

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Value",searchedValue)

    const filteredData = TempData.filter(capsule => 
      (capsule.status.toLowerCase().includes(searchedValue.toLowerCase())) || 
      (capsule.type.toLowerCase().trim().includes(searchedValue.toLowerCase().trim()))
    )


    if(filteredData.length === 0)  {
      setCapsules([]);
      alert("No data Found")
      //console.log(filteredData)
    } 
    else{
      setFilteredItems(filteredData);
      setCapsules(filteredData);
      console.log(filteredData)
      setSearchedValue('');
      e.target.reset();
    // console.log("Filtered Items", capsules)
     }
  }

  const changeHandler = (e) => {
    const {value} = e.target;
    if(!value){
      return setCapsules(capsules);
    }
    //console.log(value)
    //value.length <= 0 ? setCapsules(capsules) : console.log("hello");
    setSearchedValue(value);
  }

  // console.log("search  value", searchedValue)

  useEffect(() => {
    const fetchCapsules = async () => {
      const res = await fetch("https://api.spacexdata.com/v4/capsules")
      const data = await res.json()
      setTempData(data);
      setcapsuleTemp(data);
      FilteredItems.length > 0 ? setCapsules(FilteredItems) : setCapsules(data)
    }

    //console.log("All capsules Data", capsules)

    fetchCapsules()
  })

  return (
    <>
      {!capsules ? (
        <Loading />
      ) : (
        <section className="py-32 flex flex-col justify-center gap-[30px]">

          <form onSubmit={submitHandler} className="flex justify-center items-center">
            <input onChange={changeHandler} className="w-[500px] bg-gray-50 border border-gray-300 mx-4 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" placeholder="Search by Status, Type" />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-[-3]">Submit</button>
          </form>

          <h1 className="heading text-center mb-10">Capsules</h1>
          <h1 className="text-white text-xl text-center ">Only Ten posts. Change page to view other contents</h1>
          <div className="max-width grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 px-5">
          
            { 
                  
                  currentPosts.map(
                    ({
                      id,
                      type,
                      status,
                      serial,
                      launches,
                      last_update,
                      land_landings,
                      water_landings,
                      reuse_count,
                    }) => (
                      <article key={id} className="articles">
                        <h2 className="text-xl font-bold mb-5">
                          {type},{" "}
                          <span className="text-base opacity-75 font-light">
                            {serial}
                          </span>
                        </h2>
                        <ul>
                          <li className="mb-1">{launches.length} launches</li>
                          <li className="mb-1">{land_landings} land landings</li>
                          <li className="mb-1">{water_landings} water landings</li>
                          <li className="mb-1">Reused {reuse_count} times</li>
                          {status === "active" ? (
                            <li className="text-emerald-500">Active</li>
                          ) : (
                            <li className="text-rose-500">Retired</li>
                          )}
                        </ul>
      
                        <p className="mt-5 opacity-75">{last_update}</p>
                      </article>
                    )
                  )
                

            }
          </div>
        </section>
      )}

      <Pagination totalPosts={capsules.length}
      postsPerPage={postsPerPage}
      setCurrentPage={setCurrentPage}
      ></Pagination>

  
    </>
  )
}
