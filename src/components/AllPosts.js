import React , {useEffect , useState } from 'react'
import { Link }  from 'react-router-dom'
import sanityClient from '../client'

const AllPosts = () => {
    const [allPostsData , setAllPosts ] = useState(null);

    useEffect(() => {
        sanityClient.fetch(
            `*[_type == 'post']{
                title,
                slug,
                mainImage{
                    asset->{
                        _id,
                        url
                    }
                }
            }`
        )
        .then((data) => setAllPosts(data))
        .catch(console.error);
    }, [])


    return (
            <div className= "min-h-screen p-12">
                <div className="container mx-auto" >
                    <h2 className= " pt-6 pb-24 text-base leading-6 font-bold sm:text-8xl sm:leading-7 flex justify-center">BW</h2>
                    <div className="flex justify-center">
                        {allPostsData &&
                        allPostsData.map((post , index) => (
                            <Link to={'/' + post.slug.current} key={post.slug.current}>
                                <span key ={index}>
                                    <img className="pl-3" src={post.mainImage.asset.url} alt='main'></img>
                                    <span>
                                        <h2 className="pl-3 pt-1 pb-12 sm:text-xl">{post.title}</h2>
                                    </span>
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        
    )
}

export default AllPosts
