import { FileText, Scale, ShoppingCart, Package, AlertCircle, Shield } from "lucide-react";
import { Card } from "../components/ui/card";
import { Separator } from "../components/ui/separator";

export function TermsConditionsPage() {
  const router = useRouter();
  const lastUpdated = "February 17, 2026";

  const sections = [
    {
      icon: Scale,
      title: "Acceptance of Terms",
      content:
        "By accessing and using the N4ASHYOL website and services, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services. We reserve the right to modify these terms at any time, and your continued use constitutes acceptance of any changes.",
    },
    {
      icon: ShoppingCart,
      title: "Use of Services",
      subsections: [
        {
          subtitle: "Account Creation",
          description:
            "You must be at least 18 years old to create an account and make purchases. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.",
        },
        {
          subtitle: "Prohibited Activities",
          description:
            "You agree not to use our services for any unlawful purpose, to transmit harmful code, to interfere with the operation of our website, or to collect user information without consent.",
        },
        {
          subtitle: "User Content",
          description:
            "You retain ownership of any content you submit (reviews, comments, etc.), but grant us a license to use, display, and distribute such content. You are responsible for ensuring your content does not violate any laws or third-party rights.",
        },
      ],
    },
    {
      icon: Package,
      title: "Products and Orders",
      subsections: [
        {
          subtitle: "Product Information",
          description:
            "We strive to provide accurate product descriptions, images, and pricing. However, we do not warrant that product descriptions or other content is accurate, complete, or error-free. Colors may vary slightly from images due to monitor settings.",
        },
        {
          subtitle: "Pricing",
          description:
            "All prices are in USD and subject to change without notice. We reserve the right to correct pricing errors and to refuse or cancel orders with incorrect pricing. Sales tax will be added where applicable.",
        },
        {
          subtitle: "Order Acceptance",
          description:
            "We reserve the right to refuse or cancel any order for any reason, including suspected fraud, unauthorized transactions, or product unavailability. You will receive an email confirmation when your order is accepted.",
        },
        {
          subtitle: "Payment",
          description:
            "Payment is due at the time of order. We accept major credit cards, PayPal, and other payment methods. By providing payment information, you represent that you are authorized to use the payment method.",
        },
      ],
    },
    {
      icon: Shield,
      title: "Intellectual Property",
      subsections: [
        {
          subtitle: "Our Content",
          description:
            "All content on the N4ASHYOL website, including text, graphics, logos, images, and software, is our property or that of our licensors and is protected by copyright, trademark, and other intellectual property laws.",
        },
        {
          subtitle: "License",
          description:
            "We grant you a limited, non-exclusive, non-transferable license to access and use our website for personal, non-commercial purposes. You may not copy, modify, distribute, or create derivative works from our content without permission.",
        },
        {
          subtitle: "Trademarks",
          description:
            "N4ASHYOL and our logo are trademarks. You may not use our trademarks without our prior written consent.",
        },
      ],
    },
    {
      icon: AlertCircle,
      title: "Disclaimers and Limitation of Liability",
      subsections: [
        {
          subtitle: "Service \"As Is\"",
          description:
            "Our services are provided \"as is\" without warranties of any kind, either express or implied. We do not guarantee that our services will be uninterrupted, error-free, or secure.",
        },
        {
          subtitle: "Product Warranties",
          description:
            "Products are subject to manufacturer warranties. We are not responsible for product defects beyond our control. Defective products should be returned in accordance with our return policy.",
        },
        {
          subtitle: "Limitation of Liability",
          description:
            "To the maximum extent permitted by law, N4ASHYOL shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services. Our total liability shall not exceed the amount you paid for the product or service in question.",
        },
        {
          subtitle: "Indemnification",
          description:
            "You agree to indemnify and hold harmless N4ASHYOL and its affiliates from any claims, damages, or expenses arising from your violation of these terms or your use of our services.",
        },
      ],
    },
  ];

  const additionalTerms = [
    {
      title: "Shipping and Delivery",
      description:
        "Shipping times are estimates and not guaranteed. We are not responsible for delays caused by carriers, customs, or weather. Risk of loss passes to you upon delivery to the carrier.",
    },
    {
      title: "Returns and Refunds",
      description:
        "Returns are subject to our Return Policy. Refunds will be issued to the original payment method. We reserve the right to refuse returns that do not meet our policy requirements.",
    },
    {
      title: "Third-Party Links",
      description:
        "Our website may contain links to third-party websites. We are not responsible for the content, privacy policies, or practices of third-party sites. Use of third-party sites is at your own risk.",
    },
    {
      title: "Governing Law",
      description:
        "These terms are governed by the laws of the State of New York, United States, without regard to conflict of law principles. Any disputes will be resolved in the courts of New York.",
    },
    {
      title: "Dispute Resolution",
      description:
        "Any disputes arising from these terms or your use of our services will first be attempted to be resolved through good faith negotiations. If negotiations fail, disputes will be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.",
    },
    {
      title: "Severability",
      description:
        "If any provision of these terms is found to be invalid or unenforceable, the remaining provisions will continue in full force and effect.",
    },
  ];

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <div className="bg-background border-b dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-12 bg-gradient-to-br from-[var(--primary-color)] to-orange-600 rounded-lg flex items-center justify-center">
              <FileText className="size-6 text-inverse" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">
              Terms & Conditions
            </h1>
          </div>
          <p className="text-lg text-muted-foreground mb-4">
            Please read these terms carefully before using N4ASHYOL's services. These
            terms govern your access to and use of our website and services.
          </p>
          <p className="text-sm text-muted-foreground">
            Last updated: {lastUpdated}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <Card className="p-8 mb-8 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
          <div className="flex items-start gap-4">
            <AlertCircle className="size-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-foreground mb-2">
                Important Notice
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                These Terms and Conditions constitute a legally binding agreement between
                you and N4ASHYOL. By using our website or services, you acknowledge that
                you have read, understood, and agree to be bound by these terms. If you do
                not agree, you must discontinue use of our services immediately.
              </p>
            </div>
          </div>
        </Card>

        {/* Main Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <Card key={index} className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Icon className="size-8 text-[var(--primary-color)]" />
                  <h2 className="text-2xl font-bold text-foreground">
                    {section.title}
                  </h2>
                </div>
                {section.content && (
                  <p className="text-muted-foreground leading-relaxed">
                    {section.content}
                  </p>
                )}
                {section.subsections && (
                  <div className="space-y-6">
                    {section.subsections.map((subsection, subIndex) => (
                      <div key={subIndex}>
                        <h3 className="font-bold text-foreground mb-2">
                          {subsection.subtitle}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {subsection.description}
                        </p>
                        {subIndex < section.subsections.length - 1 && (
                          <Separator className="mt-6" />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {/* Additional Terms */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Additional Terms
          </h2>
          <Card className="divide-y dark:divide-gray-800">
            {additionalTerms.map((term, index) => (
              <div key={index} className="p-6">
                <h3 className="font-bold text-foreground mb-2">
                  {term.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {term.description}
                </p>
              </div>
            ))}
          </Card>
        </div>

        {/* Contact Information */}
        <Card className="p-8 mt-8 bg-muted border-0">
          <h3 className="text-xl font-bold text-foreground mb-4">
            Questions About These Terms?
          </h3>
          <p className="text-muted-foreground mb-4 leading-relaxed">
            If you have any questions or concerns about these Terms and Conditions, please
            contact our legal team:
          </p>
          <div className="space-y-2 text-muted-foreground">
            <p>
              <strong className="text-foreground">Email:</strong>{" "}
              legal@n4ashyol.com
            </p>
            <p>
              <strong className="text-foreground">Phone:</strong>{" "}
              1-800-N4ASHYOL
            </p>
            <p>
              <strong className="text-foreground">Mail:</strong> N4ASHYOL
              Legal Department, 123 Commerce Street, Suite 100, New York, NY 10001
            </p>
          </div>
        </Card>

        {/* Agreement Acknowledgment */}
        <Card className="p-8 mt-8 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <h3 className="text-xl font-bold text-foreground mb-3">
            Your Agreement
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            By continuing to use N4ASHYOL's services, you acknowledge that you have read
            these Terms and Conditions, understand them, and agree to be bound by them.
            You also acknowledge that you have read and agree to our Privacy Policy. These
            terms supersede all prior agreements and understandings between you and
            N4ASHYOL.
          </p>
        </Card>
      </div>
    </div>
  );
}


