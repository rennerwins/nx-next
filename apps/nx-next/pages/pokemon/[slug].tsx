import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next/types';
import { dehydrate, QueryClient, useQuery } from 'react-query';

const getPokemonByName = async (name: string) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const data = await res.json();
  return data;
};

export const PokemonPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  const { data } = useQuery(['pokemon', slug], () =>
    getPokemonByName(slug as string)
  );

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return <div>Pokemon: {data.name}</div>;
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(['pokemon', slug], () =>
    getPokemonByName(slug as string)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      revalidate: 1,
    },
  };
};

export default PokemonPage;
