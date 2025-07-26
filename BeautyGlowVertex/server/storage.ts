import { type User, type InsertUser, type Category, type InsertCategory, type Post, type InsertPost, type Comment, type InsertComment, type Newsletter, type InsertNewsletter, type Contact, type InsertContact, type PostWithAuthorAndCategory } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Categories
  getCategories(): Promise<Category[]>;
  getCategory(id: string): Promise<Category | undefined>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;

  // Posts
  getPosts(options?: { categoryId?: string; featured?: boolean; limit?: number; offset?: number }): Promise<PostWithAuthorAndCategory[]>;
  getPost(id: string): Promise<PostWithAuthorAndCategory | undefined>;
  getPostBySlug(slug: string): Promise<PostWithAuthorAndCategory | undefined>;
  createPost(post: InsertPost): Promise<Post>;
  updatePost(id: string, post: Partial<InsertPost>): Promise<Post | undefined>;
  incrementViewCount(id: string): Promise<void>;
  searchPosts(query: string): Promise<PostWithAuthorAndCategory[]>;

  // Comments
  getCommentsByPost(postId: string): Promise<Comment[]>;
  createComment(comment: InsertComment): Promise<Comment>;

  // Newsletter
  subscribeNewsletter(newsletter: InsertNewsletter): Promise<Newsletter>;
  getNewsletterSubscription(email: string): Promise<Newsletter | undefined>;

  // Contacts
  createContact(contact: InsertContact): Promise<Contact>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private categories: Map<string, Category>;
  private posts: Map<string, Post>;
  private comments: Map<string, Comment>;
  private newsletters: Map<string, Newsletter>;
  private contacts: Map<string, Contact>;

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.posts = new Map();
    this.comments = new Map();
    this.newsletters = new Map();
    this.contacts = new Map();
    
    this.seedData();
  }

  private seedData() {
    // Create default author
    const author: User = {
      id: "author-1",
      username: "sarah_johnson",
      password: "password",
      email: "sarah@vertexglow.com",
      name: "Sarah Johnson",
      bio: "Professional Makeup Artist & Beauty Blogger with over 8 years of experience in the beauty industry.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      role: "author",
      createdAt: new Date(),
    };
    this.users.set(author.id, author);

    // Create categories
    const categories: Category[] = [
      {
        id: "cat-1",
        name: "Makeup",
        slug: "makeup",
        description: "Tutorials, reviews, and trending looks",
        color: "#E8B4B8",
        createdAt: new Date(),
      },
      {
        id: "cat-2",
        name: "Skincare",
        slug: "skincare",
        description: "Routines, ingredients, and expert advice",
        color: "#2D5A87",
        createdAt: new Date(),
      },
      {
        id: "cat-3",
        name: "Hair Care",
        slug: "haircare",
        description: "Styling, treatments, and healthy hair",
        color: "#F4C2C2",
        createdAt: new Date(),
      },
      {
        id: "cat-4",
        name: "Fashion",
        slug: "fashion",
        description: "Trends, styling tips, and accessories",
        color: "#E8B4B8",
        createdAt: new Date(),
      },
    ];

    categories.forEach(cat => this.categories.set(cat.id, cat));

    // Create sample posts
    const posts: Post[] = [
      {
        id: "post-1",
        title: "Master the Art of Evening Glamour: 10 Steps to Red Carpet Ready",
        slug: "master-evening-glamour-red-carpet-ready",
        excerpt: "Learn professional techniques to create stunning evening looks that turn heads at any event.",
        content: `# Mastering Eyeshadow: From Basic to Bold in 7 Steps

Eyeshadow can transform your entire look, but mastering the art of application takes practice and the right techniques. Whether you're aiming for a natural daytime look or a bold evening statement, this comprehensive guide will walk you through every step of creating stunning eye looks.

## What You'll Need

- Eyeshadow palette with complementary colors
- Flat shader brush for packing on color
- Fluffy blending brush
- Small detail brush for precision
- Eyeshadow primer
- Setting spray

## Step-by-Step Tutorial

The key to beautiful eyeshadow is understanding color theory and how different shades work together. Start with neutral tones and gradually experiment with bolder colors as you build confidence.

### Step 1: Prime Your Lids
Always start with an eyeshadow primer to ensure your colors pop and last all day. This simple step makes a world of difference in the final result.

### Step 2: Set Your Base
Apply a neutral shade close to your skin tone across the entire lid to create a smooth base for blending.

### Step 3: Define the Crease
Use a slightly deeper shade to define your crease, blending upward and outward.

### Step 4: Add Depth
Apply your darkest shade to the outer V of your eye, blending carefully to avoid harsh lines.

### Step 5: Highlight
Add a light, shimmery shade to your inner corners and brow bone to brighten your eyes.

### Step 6: Blend, Blend, Blend
Take your time to blend all colors seamlessly together for a professional finish.

### Step 7: Finish with Mascara
Complete your look with 2-3 coats of mascara to define your lashes.

## Pro Tips

- Build colors gradually - it's easier to add more than to take away
- Use tape as a guide for sharp, clean lines
- Don't forget to blend downward into your lower lash line
- Practice makes perfect - try different color combinations

Remember, makeup is about having fun and expressing yourself. Don't be afraid to experiment with different colors and techniques until you find what works best for you!`,
        featuredImage: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=400&fit=crop",
        authorId: "author-1",
        categoryId: "cat-1",
        tags: ["makeup", "tutorial", "eyeshadow", "evening", "glamour"],
        published: true,
        featured: true,
        viewCount: 2400,
        readingTime: 8,
        seoTitle: "Master Evening Glamour Makeup: Red Carpet Ready in 10 Steps",
        seoDescription: "Learn professional makeup techniques for stunning evening looks. Step-by-step tutorial for red carpet ready glamour makeup.",
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
      {
        id: "post-2",
        title: "The Ultimate Winter Skincare Routine",
        slug: "ultimate-winter-skincare-routine",
        excerpt: "Protect your skin from harsh winter weather with this comprehensive skincare routine.",
        content: `# The Ultimate Winter Skincare Routine

Winter weather can be harsh on your skin, causing dryness, irritation, and sensitivity. Here's how to adapt your skincare routine for the colder months.

## Morning Routine

1. **Gentle Cleanser** - Use a cream-based cleanser to avoid stripping natural oils
2. **Hydrating Toner** - Look for ingredients like hyaluronic acid
3. **Vitamin C Serum** - Protect against environmental damage
4. **Moisturizer** - Choose a richer formula than your summer moisturizer
5. **SPF** - Never skip sunscreen, even in winter

## Evening Routine

1. **Double Cleanse** - Remove makeup and daily buildup
2. **Exfoliate** - 2-3 times per week with gentle acids
3. **Treatment Serums** - Retinol or peptides for overnight repair
4. **Night Moisturizer** - Rich, nourishing formula
5. **Face Oil** - Seal in moisture overnight

## Key Ingredients for Winter

- **Ceramides** - Restore the skin barrier
- **Hyaluronic Acid** - Intense hydration
- **Niacinamide** - Reduce inflammation
- **Squalane** - Lightweight moisture
- **Shea Butter** - Rich, protective barrier

Remember to introduce new products gradually and always patch test first!`,
        featuredImage: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&h=400&fit=crop",
        authorId: "author-1",
        categoryId: "cat-2",
        tags: ["skincare", "winter", "routine", "hydration", "dry-skin"],
        published: true,
        featured: false,
        viewCount: 1800,
        readingTime: 5,
        seoTitle: "Ultimate Winter Skincare Routine for Dry Weather Protection",
        seoDescription: "Complete winter skincare guide with morning and evening routines. Protect your skin from harsh weather with expert tips.",
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      },
      {
        id: "post-3",
        title: "Curly Hair Care: Products That Actually Work",
        slug: "curly-hair-care-products-that-work",
        excerpt: "Discover the best products and techniques for managing and styling curly hair.",
        content: `# Curly Hair Care: Products That Actually Work

Caring for curly hair requires understanding your curl pattern and using the right products. Here's everything you need to know.

## Understanding Your Curl Type

- **Type 2** - Wavy hair (2A, 2B, 2C)
- **Type 3** - Curly hair (3A, 3B, 3C)
- **Type 4** - Coily hair (4A, 4B, 4C)

## Essential Products

### Cleansing
- **Co-wash** - Gentle cleansing without sulfates
- **Clarifying Shampoo** - Use weekly to remove buildup
- **Deep Cleansing** - Monthly reset for your scalp

### Conditioning
- **Leave-in Conditioner** - Daily moisture and protection
- **Deep Conditioner** - Weekly intensive treatment
- **Protein Treatments** - Monthly strength building

### Styling
- **Curl Cream** - Definition and frizz control
- **Gel** - Hold and structure
- **Mousse** - Volume and light hold
- **Oil** - Seal in moisture and add shine

## The Curly Girl Method

1. **No sulfates** - Avoid harsh cleansing agents
2. **No silicones** - Prevent buildup and dryness
3. **No heat** - Preserve curl pattern
4. **Plopping** - Gentle drying technique
5. **Scrunching** - Enhance natural curl formation

## Application Techniques

- Apply products to soaking wet hair
- Use the "praying hands" method
- Scrunch out excess water with a microfiber towel
- Air dry or use a diffuser on low heat

Remember, what works for one person may not work for another. Experiment to find your perfect routine!`,
        featuredImage: "https://images.unsplash.com/photo-1559599101-f09722fb4948?w=800&h=400&fit=crop",
        authorId: "author-1",
        categoryId: "cat-3",
        tags: ["hair-care", "curly-hair", "natural-hair", "products", "routine"],
        published: true,
        featured: false,
        viewCount: 3200,
        readingTime: 7,
        seoTitle: "Best Curly Hair Care Products and Techniques That Work",
        seoDescription: "Complete guide to curly hair care with product recommendations and styling techniques for all curl types.",
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
      {
        id: "post-4",
        title: "Spring Accessories That Complete Any Look",
        slug: "spring-accessories-complete-any-look",
        excerpt: "Discover the must-have accessories to elevate your spring wardrobe.",
        content: `# Spring Accessories That Complete Any Look

Accessories are the finishing touches that can transform any outfit from ordinary to extraordinary. Here are the spring essentials you need.

## Statement Jewelry

### Layered Necklaces
- Mix metals for a modern look
- Vary chain lengths for visual interest
- Add pendants for personality

### Bold Earrings
- Geometric shapes are trending
- Colorful stones brighten your face
- Mix studs and hoops for asymmetry

## Bags for Every Occasion

### Structured Totes
- Perfect for work and travel
- Look for unique hardware details
- Neutral colors offer versatility

### Mini Bags
- Fun and flirty for evenings
- Bright colors make a statement
- Choose quality over quantity

## Hair Accessories

### Silk Scarves
- Wear as headbands or hair wraps
- Tie around ponytails for elegance
- Choose prints that complement your style

### Hair Clips
- Tortoiseshell is always chic
- Gold details add luxury
- Layer multiple clips for impact

## Seasonal Must-Haves

- **Light scarves** - Perfect for cool spring evenings
- **Cat-eye sunglasses** - Classic and flattering
- **Delicate watches** - Timeless elegance
- **Colorful belts** - Define your waist and add color

## Styling Tips

1. **Less is more** - Choose 2-3 key pieces per outfit
2. **Mix textures** - Combine smooth and textured elements
3. **Consider proportions** - Balance bold pieces with simpler ones
4. **Color coordinate** - Ensure accessories complement your outfit

The right accessories can make you feel confident and put-together. Invest in quality pieces that reflect your personal style!`,
        featuredImage: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=400&fit=crop",
        authorId: "author-1",
        categoryId: "cat-4",
        tags: ["fashion", "accessories", "spring", "jewelry", "style"],
        published: true,
        featured: false,
        viewCount: 1500,
        readingTime: 4,
        seoTitle: "Essential Spring Accessories to Complete Your Look",
        seoDescription: "Discover must-have spring accessories including jewelry, bags, and hair accessories to elevate any outfit.",
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      }
    ];

    posts.forEach(post => this.posts.set(post.id, post));

    // Create sample comments
    const comments: Comment[] = [
      {
        id: "comment-1",
        postId: "post-1",
        name: "Amanda Miller",
        email: "amanda@example.com",
        content: "This tutorial is amazing! I finally understand how to blend eyeshadow properly. The step-by-step photos really helped. Thank you Sarah! 💕",
        approved: true,
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      },
      {
        id: "comment-2",
        postId: "post-1",
        name: "Lisa Kim",
        email: "lisa@example.com",
        content: "The product recommendations are spot on! I bought the Urban Decay palette and it's perfect for beginners. More tutorials please!",
        approved: true,
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
      }
    ];

    comments.forEach(comment => this.comments.set(comment.id, comment));
  }

  // Users
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: new Date(),
      role: insertUser.role || 'user',
      bio: insertUser.bio || null,
      avatar: insertUser.avatar || null
    };
    this.users.set(id, user);
    return user;
  }

  // Categories
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategory(id: string): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(cat => cat.slug === slug);
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = randomUUID();
    const category: Category = { 
      ...insertCategory, 
      id, 
      createdAt: new Date(),
      color: insertCategory.color || '#f59e0b',
      description: insertCategory.description || null
    };
    this.categories.set(id, category);
    return category;
  }

  // Posts
  async getPosts(options: { categoryId?: string; featured?: boolean; limit?: number; offset?: number } = {}): Promise<PostWithAuthorAndCategory[]> {
    let posts = Array.from(this.posts.values())
      .filter(post => post.published)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    if (options.categoryId) {
      posts = posts.filter(post => post.categoryId === options.categoryId);
    }

    if (options.featured !== undefined) {
      posts = posts.filter(post => post.featured === options.featured);
    }

    if (options.offset) {
      posts = posts.slice(options.offset);
    }

    if (options.limit) {
      posts = posts.slice(0, options.limit);
    }

    return posts.map(post => this.enrichPost(post));
  }

  async getPost(id: string): Promise<PostWithAuthorAndCategory | undefined> {
    const post = this.posts.get(id);
    if (!post) return undefined;
    return this.enrichPost(post);
  }

  async getPostBySlug(slug: string): Promise<PostWithAuthorAndCategory | undefined> {
    const post = Array.from(this.posts.values()).find(p => p.slug === slug);
    if (!post) return undefined;
    return this.enrichPost(post);
  }

  async createPost(insertPost: InsertPost): Promise<Post> {
    const id = randomUUID();
    const now = new Date();
    const post: Post = { 
      ...insertPost, 
      id, 
      createdAt: now, 
      updatedAt: now,
      viewCount: 0 
    };
    this.posts.set(id, post);
    return post;
  }

  async updatePost(id: string, updateData: Partial<InsertPost>): Promise<Post | undefined> {
    const post = this.posts.get(id);
    if (!post) return undefined;
    
    const updatedPost: Post = {
      ...post,
      ...updateData,
      updatedAt: new Date(),
    };
    
    this.posts.set(id, updatedPost);
    return updatedPost;
  }

  async incrementViewCount(id: string): Promise<void> {
    const post = this.posts.get(id);
    if (post) {
      post.viewCount = (post.viewCount || 0) + 1;
      this.posts.set(id, post);
    }
  }

  async searchPosts(query: string): Promise<PostWithAuthorAndCategory[]> {
    const searchTerm = query.toLowerCase();
    const posts = Array.from(this.posts.values())
      .filter(post => 
        post.published && (
          post.title.toLowerCase().includes(searchTerm) ||
          post.excerpt.toLowerCase().includes(searchTerm) ||
          post.content.toLowerCase().includes(searchTerm) ||
          post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        )
      )
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    return posts.map(post => this.enrichPost(post));
  }

  private enrichPost(post: Post): PostWithAuthorAndCategory {
    const author = this.users.get(post.authorId)!;
    const category = this.categories.get(post.categoryId)!;
    const commentsCount = Array.from(this.comments.values())
      .filter(comment => comment.postId === post.id && comment.approved).length;

    return {
      ...post,
      author,
      category,
      commentsCount,
    };
  }

  // Comments
  async getCommentsByPost(postId: string): Promise<Comment[]> {
    return Array.from(this.comments.values())
      .filter(comment => comment.postId === postId && comment.approved)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createComment(insertComment: InsertComment): Promise<Comment> {
    const id = randomUUID();
    const comment: Comment = { 
      ...insertComment, 
      id, 
      approved: true, // Auto-approve for demo
      createdAt: new Date() 
    };
    this.comments.set(id, comment);
    return comment;
  }

  // Newsletter
  async subscribeNewsletter(insertNewsletter: InsertNewsletter): Promise<Newsletter> {
    const existing = this.getNewsletterSubscription(insertNewsletter.email);
    if (await existing) {
      throw new Error("Email already subscribed");
    }
    
    const id = randomUUID();
    const newsletter: Newsletter = { 
      ...insertNewsletter, 
      id, 
      subscribed: true,
      createdAt: new Date() 
    };
    this.newsletters.set(id, newsletter);
    return newsletter;
  }

  async getNewsletterSubscription(email: string): Promise<Newsletter | undefined> {
    return Array.from(this.newsletters.values()).find(n => n.email === email);
  }

  // Contacts
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const contact: Contact = { 
      ...insertContact, 
      id, 
      createdAt: new Date() 
    };
    this.contacts.set(id, contact);
    return contact;
  }
}

export const storage = new MemStorage();
