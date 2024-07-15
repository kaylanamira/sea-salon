import Hero from "@/components/Hero";
import HomeReview from "@/components/HomeReview";
import ServiceCard from "@/components/ServiceCard";

export default function Home() {
    return (
      <>
         <Hero/>
         <HomeReview/>
         <section>
            <div className='text-center font-semibold text-3xl'>
              <h3>Our Services</h3>
            </div>
            <div className='mt-6 mb-6 px-4 gap-4 grid grid-cols-1 sm:grid-cols-3  '>
              <ServiceCard name="Haircuts and Styling" source="/styling.jpeg"/>
              <ServiceCard name="Manicure and Pedicure" source="/manicure.jpeg"/>
              <ServiceCard name="Facial Treatments" source="/facials.jpeg"/>
            </div>
         </section>
      </>
    );
  }
  