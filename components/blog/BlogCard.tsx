import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/utils";

export function BlogCard({ blog }: { blog: any }) {
  return (
    <Link
      href={`/blog/${blog.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md "
    >
      <div className="relative h-44 w-full bg-indigo-100 ">
        {blog.coverImage && (
          <Image src={blog.coverImage} alt={blog.title} fill className="object-cover" />
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <span className="text-xs font-semibold uppercase tracking-wide text-brass-600 ">
          {blog.category}
        </span>
        <h3 className="mt-1 font-display text-lg font-semibold leading-snug text-indigo-900 group-hover:text-brass-600">
          {blog.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm text-slate-600 ">{blog.excerpt}</p>
        {blog.publishedAt && (
          <p className="mt-3 text-xs text-slate-400">{formatDate(blog.publishedAt)}</p>
        )}
      </div>
    </Link>
  );
}
