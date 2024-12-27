import Banner from '../components/Banner';
import BookCategories from '../components/BookCategories';
import PopularBooks from '../components/PopularBooks';

const Home = () => {
  return (
    <div>
      <section>
        <Banner></Banner>
      </section>
      <section>
        <PopularBooks></PopularBooks>
      </section>
      <section>
        <BookCategories></BookCategories>
      </section>
      <section className="py-10">
        <PopularBooks></PopularBooks>
      </section>
    </div>
  );
};

export default Home;
