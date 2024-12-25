import Banner from '../components/Banner';
import BookCategories from '../components/BookCategories';

const Home = () => {
  return (
    <div>
      <section>
        <Banner></Banner>
      </section>
      <section>
        <BookCategories></BookCategories>
      </section>
    </div>
  );
};

export default Home;
