import React, { useState } from 'react';
import { usePaginatedQuery } from 'react-query';
import Planet from './Planet';

const fetchPlanets = async (key, page) => {
  const res = await fetch(`http://swapi.dev/api/planets/?page=${page}`);

  return res.json();
};

const Planets = () => {
  const [page, setPage] = useState(1);
  // first item in the array corresponds to the key arg
  const { resolvedData, latestData, status } = usePaginatedQuery(
    ['planets', page],
    fetchPlanets
  );
  return (
    <div>
      <h2>Planets</h2>

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
            {resolvedData.results.map((planet, index) => (
              <Planet key={index} planet={planet}></Planet>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Planets;
