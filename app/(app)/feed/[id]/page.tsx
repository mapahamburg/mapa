import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PostDetail } from "./PostDetail";
import { getPostWithComments } from "@/lib/feed";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const { post } = await getPostWithComments(id);
  return {
    title: post ? `${post.title} · mapa` : "Beitrag · mapa",
  };
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { post, comments, userHasReacted, isOwner } = await getPostWithComments(id);

  if (!post) notFound();

  return <PostDetail post={post} comments={comments} userHasReacted={userHasReacted} isOwner={isOwner} />;
}
