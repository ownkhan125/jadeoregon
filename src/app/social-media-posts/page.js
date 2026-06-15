import { PageHeader } from "@/components";
import { SocialGallery } from "@/components/social";
import { socialPosts, socialCategories, site } from "@/data";

export const metadata = {
  title: `Social Media Library — ${site.name} for Congress`,
  description:
    "Twenty agency-quality social creatives for the Jade Oregon campaign — ten feed posts and ten stories, each ready to share.",
};

export default function SocialMediaPostsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Social Library · Pack 04 / 2026"
        title="A campaign in"
        accent="twenty frames."
        lede="Twenty cinematic, export-ready social creatives — ten 1:1 feed posts and ten 9:16 stories. Browse, preview, and open any creative full-size."
      />
      <SocialGallery posts={socialPosts} categories={socialCategories} />
    </>
  );
}
