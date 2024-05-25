import React, { useState } from 'react'
import { BsSearch } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { searchActions } from '../store/searchSlice';

export default function Search({onSearch}) {
  let [search, setSearch] = useState("");
const dispatch = useDispatch()
    const handleSearch = (e) => {
        dispatch(searchActions.setSearch(search))
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          handleSearch();
        }
      };
  return (
    <div id="search" className="relative p-3 rounded-lg w-96 max-w-lg">
    <input
      type="text"
      className="rounded-md p-3 w-full"
      placeholder="Search..."
      onChange={(e)=>setSearch(e.target.value)}
      onKeyDown={handleKeyDown}
    />

    <button type="submit" className="absolute right-6 top-6" onClick={handleSearch}>
      <BsSearch className="w-6 h-6" />
    </button>
  </div>
  )
}
