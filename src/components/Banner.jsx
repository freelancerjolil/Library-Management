import { Typewriter } from 'react-simple-typewriter';
import 'swiper/css';
import 'swiper/css/pagination'; // Import the pagination styles
import { Autoplay, Pagination } from 'swiper/modules'; // Import the autoplay module
import { Swiper, SwiperSlide } from 'swiper/react';

const Banner = () => {
  const slides = [
    {
      id: 1,
      title: 'Discover New Books',
      description:
        'Explore a variety of genres to enhance your reading journey.',
      image: 'https://i.ibb.co.com/d2XMdpq/library-final.jpg',
    },
    {
      id: 2,
      title: 'Find Your Favorite Genre',
      description:
        'Browse through categories and find your next favorite book.',
      image: 'https://i.ibb.co.com/9N5jvP9/012.jpg',
    },
    {
      id: 3,
      title: 'Join the Library',
      description:
        'Sign up today and borrow books from a wide range of topics!',
      image: 'https://i.ibb.co.com/3f74jzK/pexels-photo-1285625.jpg',
    },
  ];

  return (
    <div className="bg-gray-50">
      <Swiper
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay]} // Add Autoplay module
        autoplay={{
          delay: 5000, // Delay in milliseconds between auto-swipes (e.g., 3000ms = 3 seconds)
          disableOnInteraction: false, // Continue autoplay even after user interaction
        }}
        className="h-[400px] md:h-[500px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="relative h-full flex items-center justify-center text-center"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="bg-black bg-opacity-50 text-white p-6 rounded-lg max-w-md">
                <h2 className="text-2xl md:text-4xl font-bold">
                  <Typewriter
                    words={[slide.title]}
                    loop={Infinity} // Loop once through the words
                    cursor
                    cursorStyle="_"
                    typeSpeed={100}
                    deleteSpeed={50}
                    delaySpeed={3000}
                  />
                </h2>
                <p className="mt-2 md:mt-4 text-sm md:text-lg">
                  {slide.description}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
