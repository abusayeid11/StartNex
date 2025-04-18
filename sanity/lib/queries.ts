import { defineQuery } from "next-sanity";


export const STARTUPS_QUERY=

defineQuery(`*[_type == "startup" && defined(slug.current) && !defined($search) || category match $search || author->name match $search || title match $search ] | order(_createdAt desc){
  _id, 
    title, 
    slug, 
    _createdAt,
    author->{
      _id, name, username, email, bio, image
    }, 
    description, 
    category, views, image
}
`)

export const STARTUPS_QUERY_BY_ID = 
defineQuery(`*[_type == "startup" && _id == $id][0]{
  _id, 
    title, 
    slug, 
    _createdAt,
    author->{
      _id, name, username, email, bio, image
    }, 
    description, 
    category, views, image, pitch
}`)

export const STARTUP_VIEW_QUERY = 
defineQuery(
    `
    *[_type =="startup" && _id == $id][0]
    {
    _id, views
    }
    `
)

export const AUTHOR_BY_GITHUB_ID_QUERY = defineQuery(`
  *[_type == "author" && id == $id][0]{
      _id,
      id,
      name,
      username,
      email,
      image,
      bio
  }
  `);
  