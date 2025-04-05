import { formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Author, Startup } from "@/sanity.types";

export type StartUpTypeCard = Omit<Startup, "author"> & { author?: Author };

const StartUpCard = ({post}:{post:StartUpTypeCard})=>{

    const {_createdAt, views, author, _id, description, image, category, title} = post

    return(
   <li className="startup-card group">
    <div className="flex justify-between items-center">
        <p className="startup-card_date">
            {formatDate( _createdAt)}
        </p>
        <div className="flex gap-1.5">
            <EyeIcon className="size-6 text-3xl">

            </EyeIcon>
            <span className="text-16-medium">
                {views}
            </span>
        </div>
    </div>

    <div className="flex mt-5 gap-5 justify-between items-center">
        <div className="flex-1">
            <Link href={`/user/${author?._id}`}>
            <p className="text-16-medium line-clamp-1">{author?.name}</p>
            </Link>

            <Link href={`/startup/${_id}`}>
            <p className="text-26-semibold">{title}</p>
            </Link>
            </div>
          
            <Link href={`/user/${author?._id}`}>
            <Image src="https://placehold.co/48x48" alt="placeholeder" width={48} height={48} className="rounded-full" >
            </Image>
            </Link>
    </div>

    
        <Link href={`startup/${_id}`}>
           <p className="startup-card_desk">
            {description}
            </p>
            <img src={image} alt="desc image" className="startup-card_img" />
        </Link>

        <div className="flex justify-between items-center  mt-5">
        <Link href={`/?query=${category?.toLowerCase()}`}>
          <p className="text-16-medium">{category}</p>
        </Link>
        <Button className="startup-card_btn" asChild>
          <Link href={`/startup/${_id}`}>Details</Link>
        </Button>
      </div>
   </li>
    )
}

export default StartUpCard;