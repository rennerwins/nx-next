import Link from 'next/link';
import { GetStaticProps } from 'next/types';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import { useTheme } from 'next-themes';

const getPokemons = async () => {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon');
  const data = await res.json();
  return data.results;
};

export function Index() {
  const { data } = useQuery('pokemons', getPokemons);
  const { setTheme } = useTheme();

  return (
    <div className="bg-background">
      <button>Change theme</button>

      <ul>
        {data.map((pokemon) => (
          <Link href={`/pokemon/${pokemon.name}`} key={pokemon.name}>
            <a>
              <li>{pokemon.name}</li>
            </a>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery('pokemons', getPokemons);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Index;
