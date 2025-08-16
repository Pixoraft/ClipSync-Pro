import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertBlogCommentSchema, type BlogComment } from "@shared/schema";
import { z } from "zod";

interface CommentsSectionProps {
  blogPostId: string;
}

const commentFormSchema = insertBlogCommentSchema.omit({ blogPostId: true });

export default function CommentsSection({ blogPostId }: CommentsSectionProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: comments, isLoading } = useQuery<BlogComment[]>({
    queryKey: ['/api/blog/posts', blogPostId, 'comments'],
    queryFn: async () => {
      const response = await fetch(`/api/blog/posts/${blogPostId}/comments`);
      return response.json();
    }
  });

  const form = useForm<z.infer<typeof commentFormSchema>>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      name: "",
      email: "",
      comment: "",
      rating: "5"
    }
  });

  const submitMutation = useMutation({
    mutationFn: (data: z.infer<typeof commentFormSchema>) => 
      apiRequest('POST', `/api/blog/posts/${blogPostId}/comments`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/blog/posts', blogPostId, 'comments'] });
      form.reset();
      toast({
        title: "Review Submitted!",
        description: "Thank you for your review. It will be published after moderation."
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit review",
        variant: "destructive"
      });
    }
  });

  const onSubmit = (data: z.infer<typeof commentFormSchema>) => {
    submitMutation.mutate(data);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderStars = (rating: string) => {
    const stars = [];
    const numRating = parseInt(rating);
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className={`fas fa-star ${i <= numRating ? 'text-yellow-400' : 'text-gray-400'}`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="mt-12 space-y-8">
      <div className="text-center">
        <h3 className="text-3xl font-bold text-white mb-4">
          Reviews & Comments
        </h3>
        <p className="text-gray-300 mb-8">
          Share your thoughts and help others learn from this post
        </p>
      </div>

      {/* Add Review Form */}
      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white text-xl">
            Leave a Review
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Name *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Your name"
                          className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                          data-testid="input-review-name"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Email *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="your@email.com"
                          className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                          data-testid="input-review-email"
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Rating *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                          <SelectValue placeholder="Select rating" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        <SelectItem value="5" className="text-white hover:bg-gray-700">
                          ⭐⭐⭐⭐⭐ Excellent (5/5)
                        </SelectItem>
                        <SelectItem value="4" className="text-white hover:bg-gray-700">
                          ⭐⭐⭐⭐ Good (4/5)
                        </SelectItem>
                        <SelectItem value="3" className="text-white hover:bg-gray-700">
                          ⭐⭐⭐ Average (3/5)
                        </SelectItem>
                        <SelectItem value="2" className="text-white hover:bg-gray-700">
                          ⭐⭐ Poor (2/5)
                        </SelectItem>
                        <SelectItem value="1" className="text-white hover:bg-gray-700">
                          ⭐ Terrible (1/5)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Your Review *</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Share your thoughts about this post..."
                        className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 min-h-[120px]"
                        data-testid="textarea-review-comment"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400" />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                disabled={submitMutation.isPending}
                className="bg-gradient-to-r from-electric to-cyber text-black font-bold hover:scale-105 transition-all duration-300"
                data-testid="button-submit-review"
              >
                {submitMutation.isPending ? "Submitting..." : "Submit Review"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Comments List */}
      <div className="space-y-6">
        {isLoading ? (
          <div className="text-center text-gray-400">
            Loading reviews...
          </div>
        ) : comments && comments.length > 0 ? (
          <>
            <h4 className="text-2xl font-bold text-white mb-6">
              Reviews ({comments.length})
            </h4>
            {comments.map((comment) => (
              <Card key={comment.id} className="bg-gray-900 border-gray-700">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h5 className="font-semibold text-white text-lg">
                        {comment.name}
                      </h5>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex gap-1">
                          {renderStars(comment.rating)}
                        </div>
                        <span className="text-gray-400 text-sm">
                          {formatDate(comment.createdAt.toString())}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    {comment.comment}
                  </p>
                </CardContent>
              </Card>
            ))}
          </>
        ) : (
          <div className="text-center text-gray-400">
            <i className="fas fa-comments text-4xl mb-4 text-gray-600"></i>
            <p>No reviews yet. Be the first to share your thoughts!</p>
          </div>
        )}
      </div>
    </div>
  );
}