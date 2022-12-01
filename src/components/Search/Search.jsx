import React, { useState, useEffect } from 'react';
import { getAllRooms } from '../../http';
const Search = (Search) => {
    const [query, setQuery] = useState('')
    getAllRooms.filter(data => {
        if (query === '') {
          return data;
        } else if (data.title.toLowerCase().includes(query.toLowerCase())) {
          return data;
        }
      })
  return (
    <div>
            {/* <input type="text" setQuery={on} /> */}
    </div>
  )
}

export default Search