import { cn } from "@/lib/utils";
import Marquee from "../ui/marquee";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function CustomerTestimonials() {
  const reviews1 = [
    { text: "Amazing quality and fast delivery! Love the freshness.", author: "Jitendra Singh", username: "jitzzz" },
    { text: "Doormandi makes healthy eating so convenient.", author: "Ayushi Badika", username: "ayushi" },
    { text: "Great selection and very affordable prices!", author: "Karanveer Singh", username: "karan" },
    { text: "I love the variety of fruits and vegetables available.", author: "Rajesh Kumar", username: "rajesh" },
    { text: "The best place to get fresh fruits and vegetables.", author: "Ananya Sharma", username: "ananya" },
    { text: "I love the quality and the prices are unbeatable.", author: "Gautam Sharma", username: "gautam" },
  ];

  const reviews2 = [
    { text: "The vegetables are always fresh and delicious.", author: "Suman Verma", username: "suman" },
    { text: "I appreciate the organic options available.", author: "Ravi Patel", username: "ravi" },
    { text: "The delivery is quick and the produce is top-notch.", author: "Neha Gupta", username: "neha" },
    { text: "I love the variety of vegetables offered.", author: "Amit Sharma", username: "amit" },
    { text: "The prices are very reasonable for the quality.", author: "Priya Singh", username: "priya" },
    { text: "Customer service is excellent and very responsive.", author: "Vikram Joshi", username: "vikram" },
  ];

  const ReviewCard = ({ text, author, username }: { text: string; author: string; username: string }) => {
    return (
      <figure
        className={cn(
          "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
          // light styles
          "border-gray-950/[.1] bg-white hover:bg-gray-950/[.05]",
          // dark styles
          "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
        )}
      >
        <blockquote className="text-sm">{text}</blockquote>
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="/tomato.jpg" />
            <AvatarFallback>DM</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start">
            <figcaption className="text-sm font-medium dark:text-white">{author}</figcaption>
            <p className="text-xs font-medium dark:text-white/60">@{username}</p>
          </div>
        </div>
      </figure>
    );
  };

  return (
    <section id="testimonials" className="bg-gray-100/50 py-6 text-center space-y-4">
      <h1 className="text-3xl font-bold">Customer Reviews</h1>
      <Marquee pauseOnHover className="[--duration:20s]">
        {reviews1.map((review, index) => (
          <ReviewCard key={index} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {reviews2.map((review, index) => (
          <ReviewCard key={index} {...review} />
        ))}
      </Marquee>
    </section>
  );
}
