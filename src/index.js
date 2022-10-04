import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import "font-awesome/css/font-awesome.css";
import { InMemoryCache, ApolloClient, ApolloProvider} from '@apollo/client';


const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  cache: new InMemoryCache(),
  headers:{
    authorization:  `Bearer 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`
    //authorization:  `Bearer place_bearer_token_here`;
  }
});

ReactDOM.render(

    <ApolloProvider client={client}>
        <React.StrictMode><App /></React.StrictMode>    
    </ApolloProvider>,
  
  document.getElementById('root')
);