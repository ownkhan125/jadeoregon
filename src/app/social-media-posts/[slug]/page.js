import { notFound } from "next/navigation";
import { SocialPostDetail } from "@/components/social";
import {
  socialPosts,
  getSocialPost,
  getSocialPostNeighbors,
  site,
} from "@/data";

export function generateStaticParams() {
  return socialPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getSocialPost(slug);
  if (!post) return { title: `Social Library — ${site.name}` };
  return {
    title: `${post.title} — Social Library · ${site.name}`,
    description: post.description,
  };
}

export default async function SocialPostPage({ params }) {
  const { slug } = await params;
  const post = getSocialPost(slug);
  if (!post) return notFound();
  const { prev, next } = getSocialPostNeighbors(slug);
  return <SocialPostDetail post={post} prev={prev} next={next} />;
}
