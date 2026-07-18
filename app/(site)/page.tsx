import Link from "next/link";
import { GraduationCap, Building2, Users, ShieldCheck } from "lucide-react";
import { connectDB } from "@/lib/db";
import College from "@/models/College";
import Blog from "@/models/Blog";
import { buildMetadata } from "@/lib/seo";
import { getSettings } from "@/lib/settings";
import { Button } from "@/components/ui/button";
import { CollegeCard } from "@/components/college/CollegeCard";
import { BlogCard } from "@/components/blog/BlogCard";
import { FAQSection } from "@/components/admin/FAQSection";
import { InlineCounsellingCard } from "@/components/forms/InlineCounsellingCard";


export const metadata = buildMetadata({
  path: "/",
});

export const revalidate = 3600; // ISR: refresh homepage hourly for SEO freshness

const trustStats = [
  { label: "Students Counselled", value: "5,000+", icon: Users },
  { label: "Partner Colleges", value: "50+", icon: Building2 },
  { label: "Course Categories", value: "6", icon: GraduationCap },
  { label: "Counselling Cost", value: "Free", icon: ShieldCheck },
];

export default async function HomePage() {
  await connectDB();
  const settings = await getSettings();

  const [featuredColleges, latestBlogs] = await Promise.all([
    College.find({ isPublished: true }).sort({ rank: 1 }).limit(6).lean(),
    Blog.find({ status: "published" }).sort({ publishedAt: -1 }).limit(3).lean(),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-200">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/hero-bg.webp')" }}
        />

        {/* Optional Overlay */}
        <div className="absolute inset-0 bg-indigo-950/60" />

        {/* Content */}
        <div className="relative container py-16 sm:py-20 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <h1 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
                Admission & eCounselling Services for Session 2026
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-200 md:text-lg">
                Guru Gobind Singh Indraprastha University (GGSIPU) is a leading
                university in Delhi NCR, India. We provide admission and
                counselling services for various courses offered by the
                university.
              </p>
            </div>

            {/* Right Content */}
            <div className="flex justify-center lg:justify-end">
              <InlineCounsellingCard />
            </div>
          </div>
        </div>
      </section>

      {/* Trust stats */}
      <section className="border-b border-slate-200 bg-white py-10 ">
        <div className="container grid grid-cols-2 gap-6 sm:grid-cols-4">
          {trustStats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="flex flex-col items-center gap-2 text-center">
              <Icon className="text-brass-500" size={24} />
              <p className="font-display text-2xl font-semibold text-indigo-900">{value}</p>
              <p className="text-xs text-slate-500 ">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured colleges */}
      <section className="container py-16">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="font-display text-2xl font-semibold text-indigo-900 ">
            Top Ranked Colleges
          </h2>
          <Link href="/colleges" className="text-sm font-medium text-brass-600 hover:underline">
            View all →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredColleges.map((college: any) => (
            <CollegeCard key={college._id} college={college} />
          ))}
          {featuredColleges.length === 0 && (
            <p className="text-slate-500 ">Colleges added by the admin will appear here.</p>
          )}
        </div>
      </section>

      {/* Inline counselling form — toggled from /admin/settings */}
      {settings.showCounsellingWidgetOnHome && (
        <section className="border-y border-slate-200 bg-indigo-50/40 py-16">
          <div className="container max-w-2xl">
            <InlineCounsellingCard
              title="Not sure where to start?"
              subtitle="Tell us what you're interested in — a counsellor will call you within 24 hours."
            />
          </div>
        </section>
      )}

      {/* Latest blogs */}
      <section className="py-16">
        <div className="container">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-display text-2xl font-semibold text-indigo-900  md:text-3xl">
              Latest From The Blog
            </h2>
            <Link href="/blog" className="text-sm font-medium text-brass-600 hover:underline">
              View all →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestBlogs.map((blog: any) => (
              <BlogCard key={blog._id} blog={blog} />
            ))}
            {latestBlogs.length === 0 && (
              <p className="text-slate-500 ">Published articles will appear here.</p>
            )}
          </div>
        </div>

        <FAQSection />
      </section>
    </>
  );
}
