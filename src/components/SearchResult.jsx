import React, { useState } from "react";
import { gql, useQuery } from '@apollo/client';

const GIT_TOPICS = gql`
  query SearchTopics($search: String!) {
    search(query: $search, type: REPOSITORY, first: 10) {
      repositoryCount
      edges {
        node {
          ... on Repository {
            stargazers {
              totalCount
            }
            resourcePath
            repositoryTopics(first: 10) {
              totalCount
              nodes {
                topic {
                  name
                  stargazerCount
                  relatedTopics {
                    name
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;


  function SearchResult(props) {

    let searchTerm = props.value;
    const [newTopic, setTopic] = useState(searchTerm);
    let search;
    if(searchTerm===newTopic){
      search = `${searchTerm} stars:>10000`;
    }else{
      search = `${newTopic} stars:>10000`;
      searchTerm = newTopic;
      props.onChange(newTopic);
    }
    

    const { loading, error, data } = useQuery(GIT_TOPICS,
      {
        variables: { search}
      });
  
    if (loading){ 
      return (
        <div>
          <i className="fa fa-spinner fa-spin mr-4"/>
          <span>Searching for {search}</span>
        </div>
      );
    }
    if (error) return `Error! ${error.message}`;

    return (
      <>
        {data && data.search.edges &&  data.search.edges.map((edge, index) => (
          <ul className="list-group"  key={index}>
            <li className="list-group-item list-group-item-action">
              <div className="d-flex justify-content-between">
                <h5 aria-hidden="true">{edge.node.resourcePath}</h5>
                <span className="badge badge-success badge-pill badge-info badge-star">
                <i className="fa fa-star mr-2" aria-hidden="true" />{edge.node.stargazers.totalCount}</span>
              </div>
              <div>
                Related Topics:
                {edge.node.repositoryTopics.nodes.map((node,j)=>(
                  <button key={j}
                    onClick={() => setTopic(node.topic.name)}
                  type="button" className="btn btn-outline-primary btn-sm mx-1 my-1">{node.topic.name}  
                  <span className="badge badge-light badge-pill"><i className="fa fa-star m1-2" aria-hidden="true" />
                  {node.topic.stargazerCount}</span></button>
                   ))}
              </div>
            </li>
          </ul>
        ))}
      </>
    );
  }

export default SearchResult;