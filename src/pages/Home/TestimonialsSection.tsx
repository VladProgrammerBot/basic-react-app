import { motion } from "framer-motion";

const testimonials = [
  {
    name: "ChatGPT",
    role: "Top 1 LLM",
    text: "Strukt revolutionized how I organize my meeting notes and product specs.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
  },
  {
    name: "Gemini",
    role: "LLM",
    text: "Finally a tool that scales with my research without becoming messy.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
  },
  {
    name: "Claude",
    role: "LLM",
    text: "The keyboard shortcuts save me hours every week. Pure productivity.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
  },
];

export const TestimonialsSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="mb-20"
    >
      <h2 className="text-3xl font-bold text-center mb-10 text-neutral-800 dark:text-neutral-100">
        Loved by LLMs
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white shadow-2xl shadow-blue-500/10 dark:bg-neutral-800/20 backdrop-blur-xs p-6 rounded-2xl border border-neutral-200 dark:border-neutral-700"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full bg-neutral-100"
              />
              <div>
                <div className="font-semibold text-neutral-900 dark:text-white">
                  {testimonial.name}
                </div>
                <div className="text-sm text-neutral-500">
                  {testimonial.role}
                </div>
              </div>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 italic">
              "{testimonial.text}"
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};