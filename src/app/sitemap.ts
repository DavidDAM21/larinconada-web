import { MetadataRoute } from 'next';
import { createClient } from '@/lib/supabase/server';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://larinconada-web.vercel.app';
    const supabase = await createClient();

    // Get all blog posts
    const { data: posts } = await supabase
        .from('blog_posts')
        .select('slug, created_at');

    // Explicitly type the posts to avoid 'never' type inference error
    const typedPosts = (posts as { slug: string; created_at: string }[]) || [];

    const blogEntries: MetadataRoute.Sitemap = typedPosts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.created_at),
        changeFrequency: 'weekly',
        priority: 0.7,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/login`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.5,
        },
        ...blogEntries,
    ];
}
