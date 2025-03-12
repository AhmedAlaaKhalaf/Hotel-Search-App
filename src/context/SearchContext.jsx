import { createContext, useState } from "react";

export let searchContext = createContext();

export default function SearchProvider (props) {
    const [searchParams, setSearchParams] = useState({
        destination: '',
        checkin: '',
        checkout: '',
        adults: 1,
        children: 0,
        roomType: '',
      });

      return <searchContext.Provider value={{searchParams, setSearchParams}}>
        {props.children}
      </searchContext.Provider>
}

