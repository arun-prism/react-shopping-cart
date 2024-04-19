import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_CHARACTERS = gql`
  query GetCharacters {
    characters {
      results {
        id
        name
        image
      }
    }
  }
`;

export function CharactersList() {

    const { loading, error, data } = useQuery(GET_CHARACTERS);

    console.log(loading, error, data);
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    
    return data.characters.results.map(({ id, name, image }: any) => (
        <div key={id}>
        <p>
            {name}: {image}
        </p>
        </div>
    ));


}