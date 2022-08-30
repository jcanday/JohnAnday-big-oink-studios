import { request } from '../../lib/datocms';
import Image from 'next/image';
import Link from 'next/link';

const PORTFOLIO_QUERY = `query {
    allPortfolios(first:4){
      slug
    }
  }`

export async function getStaticPaths () {
    const portfolios = await request({
        query: PORTFOLIO_QUERY,
    })

    const paths = portfolios.allPortfolios.map( portfolio => {
        return {
            params: { slug : portfolio.slug}
        }
    })

    return {
        paths,
        fallback:false
    }
}

export const getStaticProps = async(context) => {
    const slug = context.params.slug;
    const SINGLE_QUERY = `query {
        allPortfolios(filter:{slug:{ eq: "${slug}"}}){
            title
            featuredImage{url}
            excerpt
            categories{categoryTitle,categoryColor{hex}}
            content
            video{url}
        }
    }`

    const content = await request({
        query: SINGLE_QUERY
    })


    return {
        props: {content:content}
    };
 };
const Details = (props) => {
    const portfolio = props.content.allPortfolios[0]
    return (  
        <div className='py-9 px-80 flex flex-col gap-5'>
            <video height={523} controls>
                <source src={portfolio.video.url} type="video/mp4"/>
            </video>
            <ul className='flex gap-2'>
                {portfolio.categories.map((category) => (
                    <li className={`w-fit text-xs bg-[${category.categoryColor.hex}]`}  key={category.categoryTitle}>{category.categoryTitle}</li>
                ))}
            </ul>
            <h1 className='text-3xl text-bold'>{portfolio.title}</h1>
            <div className='columns-2 gap-16 justify-center'>
                <p className='pb-10'>
                    {portfolio.content}
                </p>
                <div className='flex justify-center'>
                    <Link href={'/#contact'}><a className='bg-[#368A99] text-base px-5 py-2 mx-auto'>Contact Us</a></Link>
                </div>   
            </div>
        </div>
    );
}
 
export default Details;