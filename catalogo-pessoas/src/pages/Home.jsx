import { usePersons } from "../hooks/usePersons";
import PersonList from "../components/PersonList";
import SkeletonLoading from "../components/SkeletetonLoading";

export default function Home() {
  const { persons, loading } = usePersons();

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Catálogo de Pessoas</h1>

      {loading ? (
        <SkeletonLoading />
      ) : (
        <PersonList persons={persons} />
      )}
    </div>
  );
}