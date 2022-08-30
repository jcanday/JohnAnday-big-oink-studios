import { request } from '../../lib/datocms'
import Image from 'next/image';
import Link from "next/link"

const PORTFOLIO_QUERY = `query {
    allPortfolios(first:4){
      title
      slug
      excerpt
      categories{categoryTitle,categoryColor{hex}}
      featuredImage{url}
    }
  }`

export async function getServerSideProps() {
    const portfolios = await request({
      query:PORTFOLIO_QUERY,
    })
    console.log(portfolios)
    return {
      props: {portfolios:portfolios}
    };
  };
const Portfolio = (props) => {
    const portfolios = props.portfolios.allPortfolios;

    return (
        <div className='px-40 py-16'>
            {
                portfolios.map(function(portfolio,index){
                    if (index % 2 == 0){
                        return (
                            <div className='grid grid-cols-2' key={portfolio.slug}>
                                <Link href={`/portfolio/${portfolio.slug}`}>
                                    <Image src={portfolio.featuredImage.url} objectFit={'cover'} width={560} height={360}/>
                                </Link>
                                <div className='flex flex-col gap-3 pl-12 justify-center pr-60'>
                                    <Link href={`/portfolio/${portfolio.slug}`}>
                                        <a><h2 className='text-3xl text-bold'>{portfolio.title}</h2></a>
                                    </Link>   
                                    <p className='text-base'>{portfolio.excerpt}</p>
                                    <ul className='flex gap-2'>
                                        {portfolio.categories.map((category) => (
                                            <li className={`w-fit text-xs bg-[${category.categoryColor.hex}]`}  key={category.categoryTitle}>{category.categoryTitle}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )           
                    } else {
                        return (
                            <div className='grid grid-cols-2' key={portfolio.slug}>
                                <div className='flex flex-col gap-3 pr-12 justify-center text-right pl-60'>
                                    <Link href={`/portfolio/${portfolio.slug}`}>
                                        <a><h2 className='text-3xl text-bold'>{portfolio.title}</h2></a>
                                    </Link>   
                                    <p className='text-base'>{portfolio.excerpt}</p>
                                    <ul className='flex gap-2 justify-end'>
                                        {console.log(portfolio.categories)}
                                        {portfolio.categories.map((category) => (
                                            <li className={`w-fit text-xs bg-[${category.categoryColor.hex}]`} key={category.categoryTitle}>{category.categoryTitle}</li>
                                        ))}
                                    </ul>
                                </div>
                                <Link href={`/portfolio/${portfolio.slug}`}>
                                    <Image src={portfolio.featuredImage.url} objectFit={'cover'} width={560} height={360}/>
                                </Link>
                                
                            </div>
                        )
                    }
                })
            }
        </div>
      );
}
 
export default Portfolio;