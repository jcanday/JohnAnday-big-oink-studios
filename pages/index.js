import Image from 'next/image'
import { request } from '../lib/datocms'
import Link from "next/link"
import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";

const REVIEW_QUERY = `query {
  allReviews{
  reviewer
  reviewText
  featuredImage{url}
  }
}`;

const PORTFOLIO_QUERY = `query {
  allPortfolios(first:1){
    title,
    video{url},
    featuredImage{url},
    slug
  }
}`

export async function getServerSideProps() {
  const data = await request({
    query:REVIEW_QUERY,
  })
  const portfolio = await request({
    query:PORTFOLIO_QUERY,
  })
  return {
    props: {data,portfolio:portfolio}
  };
};

export default function Home(props) {
  const reviews = props.data.allReviews
  const portfolio = props.portfolio.allPortfolios[0]
  return (
    
    <div>
      <div className=" bg-cover bg-[#000000]/30 bg-[url('/cover-video.png')] bg-blend-multiply relative h-[550px] w-full flex justify-center items-center">
        <Image src={"/nom-logo.png"} width={437} height={149} alt="logo"/>
      </div>
      <div className="px-40">
        <div className='grid-cols-2 grid justify-items-stretch py-20 h-full'>
          <div className='pr-5'>
            <h2 className='text-5xl font-bold'>Working hard, playing hard, resting hard</h2>
            <p className='py-5 pr-10 text-xl'>At Noble Ocean, we make it our commitment to serve the customer first. This means whatever you need, we will do it. Need a video? Done. Need your room cleaned? We got you. Want your biggest competitor to accidentally wander into traffic? Say no more. </p>
            <a className='bg-[#368A99] text-base px-5 py-2' href="#contact">Contact Us</a>
          </div>
          <div className='flex justify-end'>
            <div className='bg-[#474747] w-[265px] flex flex-col justify-center items-center gap-1 py-11 px-9'>
              <p className="text-xl">SEE WHAT WE&apos;VE BEEN UP TO:</p>
              <Link href={`/portfolio/${portfolio.slug}`}><a><Image src={portfolio.featuredImage.url} alt="featured" width={191} height={122}/></a></Link>
              <p className='text-base'>{portfolio.title}</p>
            </div>
          </div>
        </div>
        <Carousel className="review" infiniteLoop
        centerMode>
          {reviews.map((review)=> (
            <div className='grid grid-cols-2 gap-4' key = {review.reviewer}>
              <div className='flex flex-col px-12 items-center justify-center bg-[#474747]'>
                <h2 className='text-2xl font-bold pb-2.5'>{review.reviewText}</h2>
                <p className='font-light'>-{review.reviewer}</p> 
              </div>
              <Image src={review.featuredImage.url} objectFit={'cover'} width={300} alt="review-featured" height={500}></Image>              
            </div>
          ))}
        </Carousel>
      </div>
      <div className="px-40 pt-16 pb-11 bg-[#474747]" id='contact'>
        <h2 className="font-bold text-3xl">We&apos;d love to hear from you!</h2>
        <form action="#" className='pl-24 pr-96'>
          <div className="form-group pt-8 grid grid-cols-2 gap-10">
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Name</label>
              <input className='bg-transparent border-2 border-[#74BFC4]' name='name' type="text" />
            </div>
            <div className='flex flex-col gap-1'>
              <label htmlFor="email">Email</label>
              <input className='bg-transparent border-2 border-[#74BFC4]' name='email' type="email" />
            </div>   
          </div>
          <div className="form-group py-8 flex flex-col gap-1">
            <label htmlFor="Message">Message</label>
            <textarea className='bg-transparent border-2 border-[#74BFC4]' name="Message" cols="30" rows="10"></textarea>
          </div>
          <button className="bg-[#368A99] text-base px-5 py-2" type='submit' > Send Message</button>
        </form>
      </div>
    </div>
  )
}
