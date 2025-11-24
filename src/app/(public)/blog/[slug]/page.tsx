import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/Button';

interface BlogPostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const supabase = await createClient();

    const { data: post, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error || !post) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link href="/blog">
                    <Button variant="outline" className="mb-8">
                        ← Volver al Blog
                    </Button>
                </Link>

                <header className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        {post.title}
                    </h1>
                    <div className="flex items-center text-gray-600">
                        <span>Por {post.author}</span>
                        <span className="mx-2">•</span>
                        <time dateTime={post.created_at}>
                            {new Date(post.created_at).toLocaleDateString('es-ES', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}
                        </time>
                    </div>
                </header>

                <div className="bg-white rounded-xl shadow-md p-8">
                    <div className="prose prose-lg max-w-none">
                        {post.content?.split('\n').map((paragraph, index) => (
                            <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>
            </article>
        </div>
    );
}
