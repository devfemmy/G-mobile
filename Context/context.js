import React from 'react';

const Context = React.createContext();

const Provider = (props) => {
    const [apploaded, setApploaded] = React.useState(false);
 
    return (
        <Context.Provider>
            {props.children}
        </Context.Provider>
    )
}
const Consumer = Context.Consumer;

export {Provider, Consumer};