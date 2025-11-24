import { createClient } from '@/lib/supabase/server';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

import { Database } from '@/lib/types/database.types';

type BlogPost = Database['public']['Tables']['blog_posts']['Row'];

export default async function BlogPage() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('created_at', { ascending: false });

    const posts = data as BlogPost[] | null;

    if (error) {
        console.error('Error fetching blog posts:', error);
    }

    return (
        <div className="min-h-screen bg-stone-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-amber-900 mb-4">
                        Noticias y Actualizaciones
                    </h1>
                    <p className="text-xl text-stone-600">
                        Mantente al día con todo lo que ocurre en nuestra asociación
                    </p>
                </div>

                <div className="space-y-8">
                    {posts && posts.length > 0 ? (
                        posts.map((post) => (
                            <Card key={post.id} className="overflow-hidden border-stone-200 shadow-sm hover:shadow-md transition-shadow">
                                <CardHeader className="bg-amber-50/30 border-b border-amber-100/50">
                                    <CardTitle className="text-2xl text-amber-900 leading-tight">
                                        {post.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6 sm:p-8">
                                    <div className="prose prose-stone max-w-none mb-6">
                                        <div className="whitespace-pre-wrap text-stone-700 leading-relaxed">
                                            {post.content}
                                        </div>
                                    </div>

                                    <div className="flex justify-end items-center text-sm text-stone-500 border-t border-stone-100 pt-4">
                                        <div className="flex items-center gap-2">
                                            <span className="font-medium text-amber-800">
                                                {post.author || 'Asociación'}
                                            </span>
                                            <span>•</span>
                                            <time dateTime={post.created_at} className="italic">
                                                {new Date(post.created_at).toLocaleDateString('es-ES', {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </time>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <div className="text-center py-16 bg-white rounded-lg border border-stone-200 shadow-sm">
                            <div className="text-4xl mb-4">📭</div>
                            <p className="text-stone-500 text-lg">No hay noticias publicadas todavía.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
