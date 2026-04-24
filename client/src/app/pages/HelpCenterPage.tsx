import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ChevronDown, ChevronUp, MessageCircle, Phone, Mail, Clock } from "lucide-react";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

export function HelpCenterPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const categories = [
    {
      title: "Orders & Shipping",
      icon: "📦",
      topics: ["Track my order", "Shipping options", "Delivery times", "Order status"],
    },
    {
      title: "Returns & Refunds",
      icon: "↩️",
      topics: ["Return policy", "Refund process", "Exchange items", "Return shipping"],
    },
    {
      title: "Payment & Pricing",
      icon: "💳",
      topics: ["Payment methods", "Pricing info", "Coupons & discounts", "Billing issues"],
    },
    {
      title: "Account & Security",
      icon: "🔐",
      topics: ["Reset password", "Account settings", "Security tips", "Privacy settings"],
    },
    {
      title: "Products",
      icon: "🛍️",
      topics: ["Product info", "Size guides", "Product care", "Availability"],
    },
    {
      title: "Technical Support",
      icon: "⚙️",
      topics: ["Website issues", "App support", "Browser compatibility", "Mobile app"],
    },
  ];

  const faqs = [
    {
      question: "How do I track my order?",
      answer: "You can track your order by logging into your account and visiting the 'My Orders' section. Click on any order to view detailed tracking information. You'll also receive tracking updates via email and SMS.",
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for most items. Products must be unused, in original packaging, and with all tags attached. Some items like personalized products, intimate apparel, and perishables are non-returnable. Check the product page for specific return eligibility.",
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping typically takes 5-7 business days. Express shipping takes 2-3 business days. Orders are processed within 24 hours on business days. Free shipping is available on orders over $50.",
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, Google Pay, and Shop Pay. All transactions are secured with SSL encryption.",
    },
    {
      question: "How do I apply a coupon code?",
      answer: "Enter your coupon code at checkout in the 'Promo Code' field and click 'Apply'. The discount will be reflected in your order total. Only one coupon code can be used per order. Check our Rewards & Coupons page for available offers.",
    },
    {
      question: "Can I change or cancel my order?",
      answer: "Orders can be modified or cancelled within 1 hour of placement. After that, orders enter processing and cannot be changed. Contact customer support immediately if you need to make changes.",
    },
    {
      question: "Do you ship internationally?",
      answer: "Currently, we ship within the United States and Canada. International shipping to select countries is coming soon. Sign up for our newsletter to be notified when international shipping becomes available.",
    },
    {
      question: "How do I reset my password?",
      answer: "Click 'Forgot Password' on the login page. Enter your email address, and we'll send you a password reset link. The link expires after 24 hours for security reasons.",
    },
  ];

  const contactOptions = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team",
      availability: "Mon-Fri, 9AM-6PM EST",
      action: "Start Chat",
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Call us at 1-800-N4ASHYOL",
      availability: "Mon-Fri, 9AM-8PM EST",
      action: "Call Now",
      color: "text-green-600 dark:text-green-400",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "support@n4ashyol.com",
      availability: "Response within 24 hours",
      action: "Send Email",
      color: "text-purple-600 dark:text-purple-400",
    },
  ];

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 pb-24 md:pb-0">
      {/* Hero Header with Glassmorphic Effect */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary-color)] to-orange-600 dark:from-orange-600 dark:to-orange-800"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptLTEyIDEyYzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02eiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIuMDUiLz48L2c+PC9zdmc+')] opacity-30"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-inverse drop-shadow-lg">How can we help you?</h1>
            <p className="text-base md:text-lg text-inverse/90 mb-8">
              Search our help center or browse categories below
            </p>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 h-14 text-lg bg-background dark:bg-card text-card-foreground border-0 text-foreground"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Browse by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-lg font-bold text-foreground mb-3">
                  {category.title}
                </h3>
                <ul className="space-y-2">
                  {category.topics.map((topic, topicIndex) => (
                    <li
                      key={topicIndex}
                      className="text-sm text-muted-foreground hover:text-[var(--primary-color)] dark:hover:text-[var(--primary-color)] transition-colors"
                    >
                      • {topic}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Frequently Asked Questions
          </h2>
          <Card className="divide-y dark:divide-gray-800">
            {filteredFaqs.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-muted-foreground">
                  No results found for "{searchQuery}"
                </p>
              </div>
            ) : (
              filteredFaqs.map((faq, index) => (
                <div key={index} className="p-6">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full flex items-center justify-between text-left"
                  >
                    <h3 className="text-lg font-semibold text-foreground pr-4">
                      {faq.question}
                    </h3>
                    {expandedFaq === index ? (
                      <ChevronUp className="size-5 text-muted-foreground flex-shrink-0" />
                    ) : (
                      <ChevronDown className="size-5 text-muted-foreground flex-shrink-0" />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  )}
                </div>
              ))
            )}
          </Card>
        </div>

        {/* Contact Options */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Still need help?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <Card key={index} className="p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="size-16 rounded-full bg-muted flex items-center justify-center">
                      <Icon className={`size-8 ${option.color}`} />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {option.title}
                  </h3>
                  <p className="text-muted-foreground mb-2">
                    {option.description}
                  </p>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Clock className="size-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {option.availability}
                    </span>
                  </div>
                  <Button className="w-full bg-[var(--primary-color)] hover:bg-orange-600">
                    {option.action}
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Additional Resources */}
        <Card className="mt-12 p-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 border-0">
          <div className="text-center max-w-2xl mx-auto">
            <Badge className="mb-4 bg-blue-600 hover:bg-blue-600 text-inverse">
              New
            </Badge>
            <h3 className="text-2xl font-bold text-foreground mb-3">
              Video Tutorials Available
            </h3>
            <p className="text-muted-foreground mb-6">
              Watch step-by-step video guides on how to use N4ASHYOL features,
              manage your account, and make the most of your shopping experience.
            </p>
            <Button variant="outline" className="bg-card">
              Watch Tutorials
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}


