import Image from "next/image";
import SearchForm from "../../components/seachform";
import { title } from "process";
import StartUpCard, { StartUpTypeCard } from "@/components/StartUpCard";
import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { space } from "postcss/lib/list";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";


export default async function Home({searchParams}:{
  searchParams: Promise<{query?:string}>
}) {

  const query = (await searchParams).query;
  const params = {search: query|| null}

  //const post = await client.fetch(STARTUPS_QUERY);

  const session = await auth();

  console.log(session?.id);

  const {data:post} = await sanityFetch({query:STARTUPS_QUERY, params});

  //console.log(JSON.stringify(post, null, 2));

  // const post = [
  //   {
  //     _createdAt: new Date(),
  //     views: 55,
  //     author: {_id:1, name:'groot'},
  //     _id:1,
  //     description:"this is a robo desc",
  //     image:"https://images.pexels.com/photos/39284/macbook-apple-imac-computer-39284.jpeg?auto=compress&cs=tinysrgb&w=600",
  //     category:"robots",
  //     title:"we robot"
  //   }
  // ];

  return (
   <>
   <section className="w-full bg-pink-600 min-h-[530px] pattern flex justify-center items-center flex-col py-10 px-6">
    <h1 className="uppercase bg-black px-6 py-3 font-work-sans font-extrabold text-white sm:text-[54px] sm:leading-[64px] text-[36px] leading-[46px] max-w-5xl text-center my-5 ">
      Pitch you startup <br></br>connect with entrepreneur
    </h1>
    <p className="font-medium text-[20px] text-white max-w-2xl text-center break-words">
     Submit ideas, vote pitches, crack virtual competitions
    </p>

    <SearchForm query={query}/>

   </section>

   <section className="section_container">
    <p className="text-30-semibold">
      {query?`Search result for ${query}`: `All startups`}
    </p>

    <ul className="px-7 card_grid">
     {
      post?.length > 0 ? (
        post.map((post:StartUpTypeCard, index: number)=>(
          <StartUpCard key={post?._id} post = {post}/>
        )
      )):
      (
        <p className="no-result">No startup found</p>
      )
     } 
    </ul>
   </section>

   <SanityLive></SanityLive>
   
   </>
  );
}
