import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MessageCircle,
  Heart,
  Share,
  Users,
  TrendingUp,
  Calendar,
  MapPin,
  Plus
} from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { useAuth } from '@/contexts/AuthContext';

interface CommunityPost {
  id: string;
  author: {
    name: string;
    avatar: string;
    location: string;
    expertise: string;
  };
  date: Date;
  title: string;
  content: string;
  image?: string;
  category: string;
  disease?: string;
  likes: number;
  comments: number;
  isLiked: boolean;
}

const mockPosts: CommunityPost[] = [
  {
    id: '1',
    author: {
      name: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=64',
      location: 'California, USA',
      expertise: 'Organic Farming Expert'
    },
    date: new Date('2024-01-15T10:30:00'),
    title: 'Successfully treated early blight in my tomato garden',
    content: 'After following the AI recommendations for early blight treatment, I\'m happy to report great results! The copper fungicide spray worked wonders, and I\'ve been removing affected leaves as suggested. Here\'s the progress after 2 weeks of treatment.',
    image: 'https://images.pexels.com/photos/1407305/pexels-photo-1407305.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Treatment Success',
    disease: 'Early Blight',
    likes: 23,
    comments: 7,
    isLiked: false
  },
  {
    id: '2',
    author: {
      name: 'Mike Rodriguez',
      avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=64',
      location: 'Texas, USA',
      expertise: 'Vegetable Gardener'
    },
    date: new Date('2024-01-14T15:45:00'),
    title: 'Question: Best prevention methods for bacterial spot?',
    content: 'I\'ve been dealing with recurring bacterial spot issues in my pepper plants. The AI detection helped identify it early, but I\'m looking for long-term prevention strategies. What has worked best for other growers?',
    category: 'Question',
    disease: 'Bacterial Spot',
    likes: 12,
    comments: 15,
    isLiked: true
  },
  {
    id: '3',
    author: {
      name: 'Emma Chen',
      avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=64',
      location: 'Ontario, Canada',
      expertise: 'Plant Pathologist'
    },
    date: new Date('2024-01-12T08:20:00'),
    title: 'Integrated Pest Management Tips for Home Gardeners',
    content: 'Sharing some IPM strategies that work well with AI disease detection. Early detection is key, but combining it with proper cultural practices, biological controls, and targeted treatments gives the best results.',
    category: 'Educational',
    likes: 45,
    comments: 12,
    isLiked: false
  }
];

export function Community() {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [posts, setPosts] = useState(mockPosts);

  const categories = ['all', 'treatment success', 'question', 'educational', 'discussion'];

  const filteredPosts = posts.filter(post => {
    if (selectedCategory === 'all') return true;
    return post.category.toLowerCase() === selectedCategory;
  });

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'treatment success': return 'bg-green-100 text-green-800';
      case 'question': return 'bg-blue-100 text-blue-800';
      case 'educational': return 'bg-purple-100 text-purple-800';
      case 'discussion': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Community Forum
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Connect with fellow farmers and gardeners. Share experiences, ask questions, and learn from the community.
        </p>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">1,247</p>
                <p className="text-sm text-gray-600">Active Members</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <MessageCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">3,856</p>
                <p className="text-sm text-gray-600">Discussions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold text-gray-900">89%</p>
                <p className="text-sm text-gray-600">Success Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create Post Button */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={user?.avatar} />
              <AvatarFallback className="bg-green-100 text-green-700">
                {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
              </AvatarFallback>
            </Avatar>
            <Button className="flex-1 justify-start bg-gray-100 text-gray-600 hover:bg-gray-200">
              Share your plant care experience...
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Post
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Category Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="capitalize"
              >
                {category}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Posts */}
      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <Avatar>
                    <AvatarImage src={post.author.avatar} />
                    <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-gray-900">{post.author.name}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>{post.author.expertise}</span>
                      <div className="w-1 h-1 bg-gray-400 rounded-full" />
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{post.author.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getCategoryColor(post.category)}>
                    {post.category}
                  </Badge>
                  {post.disease && (
                    <Badge variant="outline">{post.disease}</Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-2">{post.title}</h2>
                <p className="text-gray-700">{post.content}</p>
              </div>

              {post.image && (
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={post.image}
                    alt="Post image"
                    className="w-full h-64 object-cover"
                  />
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <Calendar className="h-3 w-3" />
                  <span>{formatDistanceToNow(post.date, { addSuffix: true })}</span>
                </div>

                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(post.id)}
                    className={post.isLiked ? "text-red-600" : "text-gray-600"}
                  >
                    <Heart className={`h-4 w-4 mr-1 ${post.isLiked ? 'fill-current' : ''}`} />
                    {post.likes}
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="text-gray-600">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    {post.comments}
                  </Button>
                  
                  <Button variant="ghost" size="sm" className="text-gray-600">
                    <Share className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
            <p className="text-gray-600">
              Try selecting a different category or check back later for new discussions.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}