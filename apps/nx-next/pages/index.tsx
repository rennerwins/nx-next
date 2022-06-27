const arr = ['h', 'c', 'e', 'a'];

export function Index() {
  return (
    <div>
      {arr.map((d, i) => (
        <h1 key={d}>{d}</h1>
      ))}
    </div>
  );
}

export default Index;
