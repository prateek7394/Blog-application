import { useState } from "react";
import { createContext } from "react";

export const DataContext = createContext(null);

const DataProvider = (props) => {

    const[account, setAccount ] = useState({name: '', username: ''})
    return <DataContext.Provider value={{
        account,
        setAccount
    }}>
        {props.children}
    </DataContext.Provider>
}

export default DataProvider;