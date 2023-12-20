import React from 'react'
import { useState } from 'react';

const Pagination = ({totalPosts, postsPerPage, setCurrentPage}) => {
    let pages = [];
    const [colorState, setcolorState] = useState("active");

    //console.log(totalPosts, postsPerPage)

    for(let i=1; i<=Math.ceil(totalPosts / postsPerPage); i++){
        pages.push(i);
    }
    console.log(pages)
  return (
    <div className='text-center'>
      {
        pages.map((page, index) => {
            return <button className='text-white h-[50px] w-[50px] border-4 border-green-900 border-solid focus:bg-black
            bg-green-400' onClick={() => setCurrentPage(page)} key={index}>{page}</button>
        })
      }

    </div>
  )
}

export default Pagination
