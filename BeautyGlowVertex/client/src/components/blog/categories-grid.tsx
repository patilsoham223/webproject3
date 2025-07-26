import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { staggerContainer, staggerItem, hoverScale } from "@/lib/animations";
import type { Category } from "@shared/schema";

const categoryImages = {
  makeup: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=300&fit=crop",
  skincare: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
  haircare: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop",
  fashion: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=300&fit=crop",
};

export default function CategoriesGrid() {
  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const { data: allPosts } = useQuery({
    queryKey: ["/api/posts"],
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-16"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-64 bg-gray-200 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const getPostCount = (categoryId: string) => {
    if (!allPosts || !Array.isArray(allPosts)) return 0;
    return allPosts.filter((post: any) => post.categoryId === categoryId).length;
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-charcoal mb-4">Explore Categories</h2>
          <p className="text-lg text-medium-gray">
            Dive deep into specific areas of beauty and wellness
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {categories?.map((category) => (
            <motion.div
              key={category.id}
              className="group cursor-pointer"
              variants={staggerItem}
              {...hoverScale}
            >
              <Link href={`/${category.slug}`}>
                <div className="relative overflow-hidden rounded-2xl shadow-lg">
                  <img
                    src={categoryImages[category.slug as keyof typeof categoryImages] || categoryImages.makeup}
                    alt={category.name}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                    <p className="text-gray-200 text-sm mb-3">
                      {category.description}
                    </p>
                    <span
                      className="font-medium"
                      style={{ color: category.color }}
                    >
                      {getPostCount(category.id)} Articles →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
