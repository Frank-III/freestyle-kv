// @cloudstate decorator makes this class's data persistent.
// data can only be augmented and retrieved through the class's methods.
import { cloudstate, useCloudState } from "freestyle-sh";

// @cloudstate decorator makes this class's data persistent.
// data can only be augmented and retrieved through the class's methods.

export interface Comment {
  name: string,
  comment: string
}

@cloudstate
export class BlogStat {
  id: string 
  likes = 0;
  comments: Comment[] = []

  constructor(id: string) {
    this.id = id
  }

  like() {
    this.likes++;
    return this.likes
  }

  addComment(comment: Comment) {
    this.comments.push(comment)
    return comment 
  }

  getStats() {
    return {
      id: this.id,
      likes:this.likes,
      comments: this.comments
    }
  }
}

@cloudstate
export class Blogs {
  blogs: BlogStat[] = [];
  
  getBlogStats() {
    return this.blogs.map(post => post.getStats())
  }
  createOrGetStat(id: string) {
    const existingStat = this.blogs.find(blog => blog.id == id);
    if (existingStat) {
      return existingStat.getStats();
    }
    const stat = new BlogStat(id);
    this.blogs.push(stat);
    return stat.getStats();
  }
}

export const blogsManager = useCloudState(Blogs)