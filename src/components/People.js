import React, { useState } from 'react';
import { usePaginatedQuery } from 'react-query';
import Person from './Person';

const fetchPeople = async (key, page) => {
  const res = await fetch(`http://swapi.dev/api/people/?page=${page}`);

  return res.json();
};
const People = () => {
  const [page, setPage] = useState(1);
  const { resolvedData, latestData, status } = usePaginatedQuery(
    ['people', page],
    fetchPeople
  );

  return (
    <div>
      <h2>People</h2>
      {status === 'loading' && <div>Loading data...</div>}
      {status === 'error' && <div>Error fetching data</div>}
      {status === 'success' && (
        <>
          <button
            onClick={() => setPage((oldPage) => Math.max(oldPage - 1, 1))}
            disabled={page === 1}
          >
            Previous
          </button>
          <span>{page}</span>
          <button
            onClick={() =>
              setPage((oldPage) =>
                !latestData || !latestData.next ? oldPage : oldPage + 1
              )
            }
            disabled={!latestData || !latestData.next}
          >
            Next
          </button>
          <div>
            {resolvedData.results.map((person, index) => (
              <Person key={index} person={person}></Person>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default People;
