import React, { useState, useEffect } from 'react';

interface Repository {
  id: number;
  name: string;
}

interface Props {
  userId: string;
}

function RepositoryList({ userId }: Props) {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`https://api.github.com/users/${userId}/repos`);
        const data = await response.json();
        setRepositories(data);
        setLoading(false);
      } catch (err: any) {
        setError(err);
        setLoading(false);
      }
    }
    fetchData();
  }, [userId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>An error occurred: {error.message}</p>;
  }

  return (
    <ul>
      {repositories.map(repository => (
        <li key={repository.id}>{repository.name}</li>
      ))}
    </ul>
  );
}

export default RepositoryList;
