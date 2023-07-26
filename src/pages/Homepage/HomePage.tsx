import Card from "../../components/Card";
import Loading from "../../components/loading";
import { useGetProductsQuery } from "../../redux/book/bookApi";
import { book } from "../../types/bookInterfact";

const HomePage = () => {
  const { data, isLoading } = useGetProductsQuery("?limit=10");
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <Loading></Loading>
      </div>
    );
  }
  return (
    <div className="flex flex-wrap  justify-evenly gap-4 mx-auto">
      {data?.data?.map((book: book) => (
        <Card book={book}></Card>
      ))}
    </div>
  );
};

export default HomePage;
