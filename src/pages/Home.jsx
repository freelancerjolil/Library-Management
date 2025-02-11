import Banner from '../components/Banner';
import BookCategories from '../components/BookCategories';
import CallToAction from '../components/CallToAction';
import FeaturedBooks from '../components/FeaturedBooks';
import PopularBooks from '../components/PopularBooks';
import StatsCounter from '../components/StatsCounter';

const Home = () => {
  return (
    <div>
      <section className="w-full">
        <Banner></Banner>
      </section>
      <section>
        <PopularBooks></PopularBooks>
      </section>
      <section>
        <BookCategories></BookCategories>
      </section>
      <section className="py-10">
        <FeaturedBooks></FeaturedBooks>
      </section>
      <section>
        <StatsCounter></StatsCounter>
      </section>
      <section>
        <CallToAction></CallToAction>
      </section>
    </div>
  );
};

export default Home;
