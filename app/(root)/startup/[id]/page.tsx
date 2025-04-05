import { STARTUP_VIEW_QUERY, STARTUPS_QUERY_BY_ID } from "@/sanity/lib/queries"
import { client } from "@/sanity/lib/client"
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import markdownit from 'markdown-it'
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/view";

const md = markdownit()


export default async function up ({params}:{params:Promise<{id:string}>}){

 


    const id = (await params).id

    const post = await client.fetch(STARTUPS_QUERY_BY_ID, {id});

    if(!post) return notFound();

    const parsedContent = md.render(post?.pitch || '')


    return(
        <div>
            <section className="pink_container !min-h-[230px]">
                <div className="tag">{post?._createdAt}</div>
      <div className="heading text-white">
       {post.title}
      </div>

      <div>
        {post?.description}
      </div>

      </section>
      
      <section className="justify-center items-center flex">
        <img src={post?.image} alt="thumbnail" className="w-2/3 h-auto rounded-xl" />
      </section>

      <div className="space-y-5 mt-10 max-w-4xl mx-auto">
        <div className="flex justify-between items-center">
            <Link href={`/author/${post.author?._id}` } className="flex justify-center gap-2 items-center mb-3">
             <Image src={post.author?.image} alt="avatar" width={64} height={64} className="rounded-full drop-shadow-lg">

             </Image>

             <div>
                <p className="text-20-medium">{post.author.name}</p>
                <p className="text-16-medium">@{post.author.username}</p>
             </div>
            </Link>

            <p>{post.category}</p>
        </div>

        <h3 className="text-30-bold">Pitch Details</h3>
        {
            parsedContent?(
                <article dangerouslySetInnerHTML={{__html:parsedContent}}></article>
            ):
            <p>No details provided</p>
        }
      </div>

      <hr className="divider" />

      {/*To Do Selected Startups*/ }

      <Suspense fallback={<Skeleton className="view-skeleton"/>}>
       <View id={id}/>
      </Suspense>

      </div>
    )
}