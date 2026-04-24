"use client";


import { Shield, Lock, Eye, Database, Cookie, Mail, UserCheck } from "lucide-react";
import { Card } from "../components/ui/card";
import { Separator } from "../components/ui/separator";

export function PrivacyPolicyPage() {
  const lastUpdated = "February 17, 2026";

  const sections = [
    {
      icon: Database,
      title: "Information We Collect",
      content: [
        {
          subtitle: "Personal Information",
          description:
            "When you create an account or make a purchase, we collect information such as your name, email address, phone number, shipping address, billing address, and payment information.",
        },
        {
          subtitle: "Usage Information",
          description:
            "We automatically collect information about how you interact with our website, including pages viewed, products browsed, search queries, and the date and time of your visits.",
        },
        {
          subtitle: "Device Information",
          description:
            "We collect information about the device you use to access our services, including IP address, browser type, operating system, and device identifiers.",
        },
      ],
    },
    {
      icon: Eye,
      title: "How We Use Your Information",
      content: [
        {
          subtitle: "Order Processing",
          description:
            "We use your information to process and fulfill your orders, send order confirmations, provide customer support, and communicate about your purchases.",
        },
        {
          subtitle: "Service Improvement",
          description:
            "Your data helps us improve our website, personalize your shopping experience, and develop new features and services.",
        },
        {
          subtitle: "Marketing Communications",
          description:
            "With your consent, we send promotional emails about new products, special offers, and other updates. You can opt out at any time.",
        },
        {
          subtitle: "Security and Fraud Prevention",
          description:
            "We use your information to detect and prevent fraud, protect our systems, and ensure the security of your account.",
        },
      ],
    },
    {
      icon: UserCheck,
      title: "Information Sharing",
      content: [
        {
          subtitle: "Service Providers",
          description:
            "We share information with trusted third-party service providers who help us operate our business, such as payment processors, shipping carriers, and email service providers.",
        },
        {
          subtitle: "Legal Requirements",
          description:
            "We may disclose your information when required by law, to respond to legal processes, or to protect our rights and the safety of our users.",
        },
        {
          subtitle: "Business Transfers",
          description:
            "In the event of a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity.",
        },
        {
          subtitle: "Your Consent",
          description:
            "We will not sell your personal information to third parties. We only share information with your explicit consent or as described in this policy.",
        },
      ],
    },
    {
      icon: Cookie,
      title: "Cookies and Tracking",
      content: [
        {
          subtitle: "Essential Cookies",
          description:
            "We use essential cookies that are necessary for the website to function properly, such as shopping cart functionality and secure login.",
        },
        {
          subtitle: "Analytics Cookies",
          description:
            "We use analytics tools to understand how visitors use our website, helping us improve user experience and optimize our services.",
        },
        {
          subtitle: "Marketing Cookies",
          description:
            "With your permission, we use cookies to show you relevant advertisements and measure the effectiveness of our marketing campaigns.",
        },
        {
          subtitle: "Managing Cookies",
          description:
            "You can control cookies through your browser settings. However, disabling cookies may affect your ability to use certain features of our website.",
        },
      ],
    },
    {
      icon: Lock,
      title: "Data Security",
      content: [
        {
          subtitle: "Security Measures",
          description:
            "We implement industry-standard security measures to protect your personal information, including SSL encryption for data transmission and secure storage systems.",
        },
        {
          subtitle: "Payment Security",
          description:
            "We use PCI-compliant payment processors and do not store complete credit card information on our servers.",
        },
        {
          subtitle: "Account Protection",
          description:
            "We recommend using strong passwords and enabling two-factor authentication to protect your account. Never share your password with anyone.",
        },
        {
          subtitle: "Data Retention",
          description:
            "We retain your personal information only as long as necessary to fulfill the purposes outlined in this policy or as required by law.",
        },
      ],
    },
    {
      icon: Shield,
      title: "Your Rights and Choices",
      content: [
        {
          subtitle: "Access and Correction",
          description:
            "You have the right to access and update your personal information at any time through your account settings.",
        },
        {
          subtitle: "Data Deletion",
          description:
            "You can request deletion of your account and personal information. Some information may be retained as required by law or for legitimate business purposes.",
        },
        {
          subtitle: "Marketing Opt-Out",
          description:
            "You can unsubscribe from marketing emails by clicking the unsubscribe link in any promotional email or updating your preferences in your account.",
        },
        {
          subtitle: "Do Not Track",
          description:
            "We respect Do Not Track signals and will not track, plant cookies, or use advertising when a DNT browser mechanism is in place.",
        },
        {
          subtitle: "California Privacy Rights",
          description:
            "California residents have additional rights under CCPA, including the right to know what personal information is collected and the right to opt out of the sale of personal information.",
        },
      ],
    },
  ];

  const childrenPolicy = {
    title: "Children's Privacy",
    description:
      "Our services are not directed to children under 13. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.",
  };

  const internationalUsers = {
    title: "International Users",
    description:
      "If you are accessing our services from outside the United States, please note that your information may be transferred to, stored, and processed in the United States where our servers are located. By using our services, you consent to this transfer.",
  };

  return (
    <div className="min-h-screen bg-muted">
      {/* Header */}
      <div className="bg-background border-b dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-12 bg-gradient-to-br from-[var(--primary-color)] to-orange-600 rounded-lg flex items-center justify-center">
              <Shield className="size-6 text-inverse" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">
              Privacy Policy
            </h1>
          </div>
          <p className="text-lg text-muted-foreground mb-4">
            At N4ASHYOL, we take your privacy seriously. This policy explains how we
            collect, use, and protect your personal information.
          </p>
          <p className="text-sm text-muted-foreground">
            Last updated: {lastUpdated}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Introduction */}
        <Card className="p-8 mb-8 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <p className="text-muted-foreground leading-relaxed">
            This Privacy Policy describes how N4ASHYOL ("we," "us," or "our") collects,
            uses, and shares your personal information when you visit or make a purchase
            from our website. By using our services, you agree to the collection and use
            of information in accordance with this policy.
          </p>
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
                <div className="space-y-6">
                  {section.content.map((item, itemIndex) => (
                    <div key={itemIndex}>
                      <h3 className="font-bold text-foreground mb-2">
                        {item.subtitle}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                      {itemIndex < section.content.length - 1 && (
                        <Separator className="mt-6" />
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Additional Policies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card className="p-6">
            <h3 className="text-xl font-bold text-foreground mb-3">
              {childrenPolicy.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {childrenPolicy.description}
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-bold text-foreground mb-3">
              {internationalUsers.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {internationalUsers.description}
            </p>
          </Card>
        </div>

        {/* Changes to Policy */}
        <Card className="p-8 mt-8">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Changes to This Policy
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We may update this Privacy Policy from time to time to reflect changes in our
            practices or legal requirements. We will notify you of any material changes by
            posting the new policy on this page and updating the "Last Updated" date.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            We encourage you to review this policy periodically to stay informed about how
            we protect your information. Your continued use of our services after changes
            are posted constitutes your acceptance of the updated policy.
          </p>
        </Card>

        {/* Contact Information */}
        <Card className="p-8 mt-8 bg-muted border-0">
          <div className="flex items-start gap-4">
            <Mail className="size-8 text-[var(--primary-color)] flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Contact Us About Privacy
              </h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                If you have any questions, concerns, or requests regarding this Privacy
                Policy or our data practices, please contact us:
              </p>
              <div className="space-y-2 text-muted-foreground">
                <p>
                  <strong className="text-foreground">Email:</strong>{" "}
                  privacy@n4ashyol.com
                </p>
                <p>
                  <strong className="text-foreground">Phone:</strong>{" "}
                  1-800-N4ASHYOL
                </p>
                <p>
                  <strong className="text-foreground">Mail:</strong>{" "}
                  N4ASHYOL Privacy Team, 123 Commerce Street, Suite 100, New York, NY
                  10001
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Trust Badges */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            We are committed to protecting your privacy and security
          </p>
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <Shield className="size-5 text-green-600 dark:text-green-400" />
              <span className="text-sm font-medium text-muted-foreground">
                SSL Secured
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="size-5 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-muted-foreground">
                PCI Compliant
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Database className="size-5 text-purple-600 dark:text-purple-400" />
              <span className="text-sm font-medium text-muted-foreground">
                GDPR Ready
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


