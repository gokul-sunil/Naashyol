import { useState } from "react";

const pagesData = [
  { title: "About Us", slug: "/about", status: "published", author: "Admin", modified: "2026-02-15", content: "Welcome to N4ASHYOL, your premier global multi-vendor ecommerce marketplace. We connect customers with the world's best vendors, offering premium products across multiple categories." },
  { title: "Terms & Conditions", slug: "/terms", status: "published", author: "Admin", modified: "2026-02-10", content: "These terms and conditions outline the rules and regulations for the use of our website. By accessing this website, we assume you accept these terms and conditions in full." },
  { title: "Privacy Policy", slug: "/privacy", status: "published", author: "Admin", modified: "2026-02-08", content: "Your privacy is important to us. This privacy policy explains how we collect, use, and protect your personal information when you use our services." },
  { title: "Shipping Information", slug: "/shipping", status: "draft", author: "Admin", modified: "2026-02-17", content: "We offer worldwide shipping on all orders. Standard delivery takes 5-7 business days. Express delivery options are available at checkout for faster delivery." },
];

const bannersData = [
  { title: "Winter Sale 2026", category: "Home Hero", link: "/sale/winter", start: "2026-02-01", end: "2026-03-01", status: "active" },
  { title: "New Arrivals - Electronics", category: "Category Top", link: "/category/electronics", start: "2026-02-10", end: "2026-03-10", status: "active" },
  { title: "Free Shipping Over $50", category: "Sidebar", link: "/shipping-info", start: "2026-01-15", end: "2026-02-15", status: "inactive" },
];

const blogPosts = [
  { title: "Top 10 Tech Gadgets for 2026", status: "published", excerpt: "Discover the latest technology trends and must-have gadgets...", content: "Technology continues to evolve at an incredible pace. Here are the top 10 must-have gadgets for 2026 that are revolutionizing the way we live and work. From AI-powered devices to sustainable tech, these products represent the cutting edge of innovation.", author: "John Smith", date: "2026-02-15", category: "Technology", views: 1247 },
  { title: "Fashion Trends This Spring", status: "published", excerpt: "Explore the hottest fashion trends for the upcoming season...", content: "Spring 2026 brings a fresh wave of fashion trends that blend sustainability with bold style. Designers are embracing earthy tones, flowy silhouettes, and eco-friendly materials across their latest collections.", author: "Sarah Johnson", date: "2026-02-12", category: "Fashion", views: 892 },
  { title: "Ultimate Home Organization Guide", status: "draft", excerpt: "Transform your living space with these expert tips...", content: "A well-organized home can significantly reduce stress and improve productivity. This guide covers room-by-room strategies, storage solutions, and decluttering techniques to help you create a calm and functional living space.", author: "Mike Wilson", date: "2026-02-10", category: "Lifestyle", views: 0 },
];

const faqData = [
  { question: "How do I track my order?", category: "Orders", status: "active", answer: "You can track your order by logging into your account and visiting the Orders section. You'll find a tracking number for each shipped order." },
  { question: "What is your return policy?", category: "Returns", status: "active", answer: "We offer a 30-day return policy on most items. Products must be in original condition with tags attached. Please contact our support team to initiate a return." },
  { question: "Do you ship internationally?", category: "Shipping", status: "active", answer: "Yes, we ship to over 100 countries worldwide. Shipping costs and delivery times vary by destination. Check our shipping page for more details." },
  { question: "How can I contact customer support?", category: "Support", status: "active", answer: "You can reach our customer support team via email at support@n4ashyol.com or through the live chat feature on our website. We're available 24/7." },
];

const TABS = ["Pages", "Banners", "Blog", "FAQ"];

export default function ContentManagement() {
  const [activeTab, setActiveTab] = useState("Pages");
  const [pageSearch, setPageSearch] = useState("");
  const [viewPage, setViewPage] = useState(null);
  const [editPage, setEditPage] = useState(null);
  const [createPage, setCreatePage] = useState(false);
  const [editBanner, setEditBanner] = useState(null);
  const [createBanner, setCreateBanner] = useState(false);
  const [banners, setBanners] = useState(bannersData);

  const toggleBannerStatus = (index) => {
    setBanners(prev => prev.map((b, i) => i === index
      ? { ...b, status: b.status === "active" ? "inactive" : "active" }
      : b
    ));
  };
  const [createPost, setCreatePost] = useState(false);
  const [viewPost, setViewPost] = useState(null);
  const [addFaq, setAddFaq] = useState(false);
  const [viewFaq, setViewFaq] = useState(null);

  const filteredPages = pagesData.filter(p =>
    p.title.toLowerCase().includes(pageSearch.toLowerCase()) ||
    p.slug.toLowerCase().includes(pageSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 px-3 py-4 sm:px-6 sm:py-6 font-sans">

      {/* Create Page Modal */}
      {createPage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-5 sm:p-8 relative" style={{ maxHeight: "95vh", overflowY: "auto" }}>
            <button onClick={() => setCreatePage(false)} className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 text-xl font-bold">✕</button>
            <h2 className="text-3xl font-bold text-gray-900 mb-1">Create New Page</h2>
            <p className="text-sm text-gray-400 mb-5">Add a new static page to your website</p>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Page Title <span className="text-red-400">*</span></label>
              <input placeholder="Enter page title" className="w-full border-2 border-orange-400 rounded-lg px-4 py-2.5 text-base text-gray-800 bg-white focus:outline-none placeholder-gray-300" />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Slug <span className="text-red-400">*</span></label>
              <input placeholder="/page-slug" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-base text-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-orange-300 placeholder-gray-300" />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Content <span className="text-red-400">*</span></label>
              <textarea placeholder="Page content..." rows={4} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-base text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-orange-300 resize-none placeholder-gray-300" />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Status</label>
              <div className="relative">
                <select defaultValue="Draft" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-base text-gray-600 bg-white focus:outline-none appearance-none">
                  <option>Draft</option>
                  <option>Published</option>
                </select>
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button onClick={() => setCreatePage(false)} className="px-6 py-2.5 text-sm font-semibold text-gray-700 hover:text-gray-900">Cancel</button>
              <button onClick={() => setCreatePage(false)} className="px-6 py-2.5 text-sm font-semibold bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-colors">Create Page</button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewPage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-5 sm:p-8 relative" style={{ maxHeight: "95vh", overflowY: "auto" }}>
            <button onClick={() => setViewPage(null)} className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 text-xl font-bold">✕</button>
            <h2 className="text-3xl font-bold text-gray-900 mb-1">View Page</h2>
            <p className="text-sm text-gray-400 mb-5">View the details of the selected page</p>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Page Title</label>
              <input readOnly value={viewPage.title} className="w-full border-2 border-orange-400 rounded-lg px-4 py-2.5 text-base text-gray-800 bg-white focus:outline-none" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Slug</label>
              <input readOnly value={viewPage.slug} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-base text-gray-600 bg-white focus:outline-none" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Content</label>
              <textarea readOnly value={viewPage.content} rows={4} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-base text-gray-600 bg-white focus:outline-none resize-none" />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Status</label>
              <StatusDropdown status={viewPage.status} />
            </div>
            <div className="flex justify-end">
              <button onClick={() => setViewPage(null)} className="px-6 py-2.5 text-sm font-semibold text-gray-700 hover:text-gray-900">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editPage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-5 sm:p-8 relative" style={{ maxHeight: "95vh", overflowY: "auto" }}>
            <button onClick={() => setEditPage(null)} className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 text-xl font-bold">✕</button>
            <h2 className="text-3xl font-bold text-gray-900 mb-1">Edit Page</h2>
            <p className="text-sm text-gray-400 mb-5">Edit the details of the selected page</p>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Page Title</label>
              <input value={editPage.title} onChange={e => setEditPage({ ...editPage, title: e.target.value })} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-base text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-orange-300" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Slug</label>
              <input value={editPage.slug} onChange={e => setEditPage({ ...editPage, slug: e.target.value })} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-base text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-orange-300" />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Content</label>
              <textarea value={editPage.content} onChange={e => setEditPage({ ...editPage, content: e.target.value })} rows={4} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-base text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-orange-300 resize-none" />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Status</label>
              <StatusDropdown status={editPage.status} />
            </div>
            <div className="flex justify-end gap-3">
              <button onClick={() => setEditPage(null)} className="px-6 py-2.5 text-sm font-semibold text-gray-700 hover:text-gray-900">Cancel</button>
              <button onClick={() => setEditPage(null)} className="px-6 py-2.5 text-sm font-semibold bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-colors">Update Page</button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
        <div>
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900">Content Management</h1>
          <p className="text-sm sm:text-base text-gray-400 mt-1">Manage website content</p>
        </div>
        <button onClick={() => setCreatePage(true)} className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors self-start sm:self-auto">
          <span className="text-base font-bold">+</span>
          <span>Add Page</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="overflow-x-auto mb-6">
        <div className="inline-flex items-center bg-white border border-gray-200 rounded-full p-1 gap-1 min-w-max">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 sm:px-5 py-2 text-sm rounded-full transition-colors ${activeTab === tab ? "text-gray-900 font-bold" : "text-gray-500 hover:text-gray-700 font-normal"}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Pages Tab */}
      {activeTab === "Pages" && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 sm:px-6 py-5">
            <h2 className="text-xl font-semibold text-gray-800">Static Pages</h2>
            <div className="relative w-full sm:w-56">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search pages..."
                value={pageSearch}
                onChange={e => setPageSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full" style={{ minWidth: "750px" }}>
              <thead>
                <tr className="border-t border-b border-gray-100">
                  <th className="text-left px-4 py-4 text-sm font-medium text-gray-400">Page Title</th>
                  <th className="text-left px-4 py-4 text-sm font-medium text-gray-400">Slug</th>
                  <th className="text-left px-4 py-4 text-sm font-medium text-gray-400">Status</th>
                  <th className="text-left px-4 py-4 text-sm font-medium text-gray-400">Author</th>
                  <th className="text-left px-4 py-4 text-sm font-medium text-gray-400">Last Modified</th>
                  <th className="text-left px-4 py-4 text-sm font-medium text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPages.map((page, i) => (
                  <tr key={i} className="border-b border-gray-100 hover:bg-orange-50 transition-colors">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-base font-semibold text-gray-800">
                        <PageIcon />
                        {page.title}
                      </div>
                    </td>
                    <td className="px-4 py-4 font-mono text-base text-gray-500 whitespace-nowrap">{page.slug}</td>
                    <td className="px-4 py-4 whitespace-nowrap"><StatusBadge status={page.status} /></td>
                    <td className="px-4 py-4 text-base text-gray-700 whitespace-nowrap">{page.author}</td>
                    <td className="px-4 py-4 text-base text-gray-500 whitespace-nowrap">{page.modified}</td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <ActionBtn icon={<EyeIcon />} label="View" onClick={() => setViewPage(page)} />
                        <ActionBtn icon={<EditIcon />} label="Edit" onClick={() => setEditPage(page)} />
                        <button className="flex items-center border border-gray-200 hover:border-red-300 bg-white text-red-400 hover:text-red-600 transition-colors p-1.5 rounded-lg">
                          <TrashIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredPages.length === 0 && (
            <div className="py-16 text-center text-gray-400">
              <p className="text-4xl mb-3">📭</p>
              <p className="text-base">No pages found</p>
            </div>
          )}
        </div>
      )}

      {/* Create Post Modal */}
      {createPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-5 sm:p-8 relative" style={{ maxHeight: "95vh", overflowY: "auto" }}>
            <button onClick={() => setCreatePost(false)} className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 text-xl font-bold">✕</button>
            <h2 className="text-3xl font-bold text-gray-900 mb-1">Create New Blog Post</h2>
            <p className="text-sm text-gray-400 mb-5">Write and publish a new blog post</p>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Post Title <span className="text-red-400">*</span></label>
              <input placeholder="Enter post title" className="w-full border-2 border-orange-400 rounded-lg px-4 py-2.5 text-base text-gray-800 bg-white focus:outline-none placeholder-gray-300" />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Excerpt <span className="text-red-400">*</span></label>
              <textarea placeholder="Short description..." rows={3} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-base text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-orange-300 resize-none placeholder-gray-300" />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Content <span className="text-red-400">*</span></label>
              <textarea placeholder="Post content..." rows={4} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-base text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-orange-300 resize-none placeholder-gray-300" />
            </div>

            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Category</label>
                <div className="relative">
                  <select defaultValue="Technology" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-base text-gray-600 bg-white focus:outline-none appearance-none">
                    <option>Technology</option>
                    <option>Fashion</option>
                    <option>Lifestyle</option>
                    <option>Health</option>
                  </select>
                  <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Status</label>
                <div className="relative">
                  <select defaultValue="Draft" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-base text-gray-600 bg-white focus:outline-none appearance-none">
                    <option>Draft</option>
                    <option>Published</option>
                  </select>
                  <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button onClick={() => setCreatePost(false)} className="px-6 py-2.5 text-sm font-semibold text-gray-700 hover:text-gray-900">Cancel</button>
              <button onClick={() => setCreatePost(false)} className="px-6 py-2.5 text-sm font-semibold bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-colors">Create Post</button>
            </div>
          </div>
        </div>
      )}

      {/* View Post Modal */}
      {viewPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-5 sm:p-8 relative" style={{ maxHeight: "95vh", overflowY: "auto" }}>
            <button onClick={() => setViewPost(null)} className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 text-xl font-bold">✕</button>
            <h2 className="text-3xl font-bold text-gray-900 mb-1">View Blog Post</h2>
            <p className="text-sm text-gray-400 mb-5">View the details of the selected blog post</p>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Post Title</label>
              <input readOnly value={viewPost.title} className="w-full border-2 border-orange-400 rounded-lg px-4 py-2.5 text-base text-gray-800 bg-white focus:outline-none" />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Excerpt</label>
              <textarea readOnly value={viewPost.excerpt} rows={3} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-base text-gray-600 bg-white focus:outline-none resize-none" />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Content</label>
              <textarea readOnly value={viewPost.content} rows={4} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-base text-gray-600 bg-white focus:outline-none resize-none" />
            </div>

            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Category</label>
                <div className="relative">
                  <select defaultValue={viewPost.category} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-base text-gray-600 bg-white focus:outline-none appearance-none">
                    <option>Technology</option>
                    <option>Fashion</option>
                    <option>Lifestyle</option>
                    <option>Health</option>
                  </select>
                  <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Status</label>
                <div className="relative">
                  <select defaultValue={viewPost.status === "published" ? "Published" : "Draft"} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-base text-gray-600 bg-white focus:outline-none appearance-none">
                    <option>Draft</option>
                    <option>Published</option>
                  </select>
                  <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button onClick={() => setViewPost(null)} className="px-6 py-2.5 text-sm font-semibold text-gray-700 hover:text-gray-900">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Create Banner Modal */}
      {createBanner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-5 sm:p-8 relative" style={{ maxHeight: "95vh", overflowY: "auto" }}>
            <button onClick={() => setCreateBanner(false)} className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 text-xl font-bold">✕</button>
            <h2 className="text-3xl font-bold text-gray-900 mb-1">Create New Banner</h2>
            <p className="text-sm text-gray-400 mb-5">Add a promotional banner to your website</p>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Banner Title <span className="text-red-400">*</span></label>
              <input placeholder="Enter banner title"
                className="w-full border-2 border-orange-400 rounded-lg px-4 py-2.5 text-base text-gray-800 bg-white focus:outline-none placeholder-gray-300" />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Banner Image <span className="text-red-400">*</span></label>
              <div className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-base text-gray-400 bg-white flex items-center gap-2 cursor-pointer hover:border-gray-300">
                <span>Choose File</span>
                <span className="text-gray-300">|</span>
                <span>No file chosen</span>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Link URL <span className="text-red-400">*</span></label>
              <input placeholder="/sale/winter"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-base text-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-orange-300 placeholder-gray-300" />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Position</label>
              <div className="relative">
                <select defaultValue="Home Hero" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-base text-gray-600 bg-white focus:outline-none appearance-none">
                  <option>Home Hero</option>
                  <option>Category Top</option>
                  <option>Sidebar</option>
                </select>
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Start Date <span className="text-red-400">*</span></label>
                <input type="date" placeholder="mm/dd/yyyy"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-base text-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-orange-300" />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">End Date <span className="text-red-400">*</span></label>
                <input type="date" placeholder="mm/dd/yyyy"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-base text-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-orange-300" />
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <label className="text-base font-semibold text-gray-700">Active</label>
              <div className="relative w-12 h-6 rounded-full bg-orange-500 cursor-pointer">
                <span className="absolute top-0.5 right-0.5 w-5 h-5 bg-white rounded-full shadow" />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button onClick={() => setCreateBanner(false)} className="px-6 py-2.5 text-sm font-semibold text-gray-700 hover:text-gray-900">Cancel</button>
              <button onClick={() => setCreateBanner(false)} className="px-6 py-2.5 text-sm font-semibold bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-colors">Create Banner</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Banner Modal */}
      {editBanner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-5 sm:p-8 relative" style={{ maxHeight: "95vh", overflowY: "auto" }}>
            <button onClick={() => setEditBanner(null)} className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 text-xl font-bold">✕</button>
            <h2 className="text-3xl font-bold text-gray-900 mb-1">Edit Banner</h2>
            <p className="text-sm text-gray-400 mb-5">Edit the details of the selected banner</p>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Banner Title</label>
              <input value={editBanner.title} onChange={e => setEditBanner({ ...editBanner, title: e.target.value })}
                className="w-full border-2 border-orange-400 rounded-lg px-4 py-2.5 text-base text-gray-800 bg-white focus:outline-none" />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Banner Image</label>
              <div className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-base text-gray-400 bg-white flex items-center gap-2">
                <span>Choose File</span>
                <span className="text-gray-300">|</span>
                <span>No file chosen</span>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Link URL</label>
              <input value={editBanner.link} onChange={e => setEditBanner({ ...editBanner, link: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-base text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-orange-300" />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Position</label>
              <div className="relative">
                <select className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-base text-gray-600 bg-white focus:outline-none appearance-none">
                  <option value="">Select position</option>
                  <option>Home Hero</option>
                  <option>Category Top</option>
                  <option>Sidebar</option>
                </select>
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Start Date</label>
                <div className="relative">
                  <input type="date" defaultValue={editBanner.start}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-base text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-orange-300" />
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">End Date</label>
                <div className="relative">
                  <input type="date" defaultValue={editBanner.end}
                    className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-base text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-orange-300" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <label className="text-base font-semibold text-gray-700">Active</label>
              <button
                onClick={() => setEditBanner({ ...editBanner, status: editBanner.status === "active" ? "inactive" : "active" })}
                className={`relative w-12 h-6 rounded-full transition-colors ${editBanner.status === "active" ? "bg-orange-500" : "bg-gray-200"}`}
              >
                <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${editBanner.status === "active" ? "translate-x-6" : "translate-x-0.5"}`} />
              </button>
            </div>

            <div className="flex justify-end gap-3">
              <button onClick={() => setEditBanner(null)} className="px-6 py-2.5 text-sm font-semibold text-gray-700 hover:text-gray-900">Cancel</button>
              <button onClick={() => setEditBanner(null)} className="px-6 py-2.5 text-sm font-semibold bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-colors">Update Banner</button>
            </div>
          </div>
        </div>
      )}

      {/* Banners Tab */}
      {activeTab === "Banners" && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Promotional Banners</h2>
            <button onClick={() => setCreateBanner(true)} className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors self-start sm:self-auto">
              <span className="text-base font-bold">+</span>
              <span>Add Banner</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {banners.map((banner, i) => (
              <BannerCard key={i} banner={banner} onEdit={() => setEditBanner(banner)} onToggle={() => toggleBannerStatus(i)} />
            ))}
          </div>
        </div>
      )}

      {/* Blog Tab */}
      {activeTab === "Blog" && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Blog Posts</h2>
            <button onClick={() => setCreatePost(true)} className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors self-start sm:self-auto">
              <span className="text-base font-bold">+</span>
              <span>New Post</span>
            </button>
          </div>
          <div className="divide-y divide-gray-100">
            {blogPosts.map((post, i) => (
              <div key={i} className="py-5 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="text-base font-bold text-gray-900">{post.title}</h3>
                    <span className={`inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full ${post.status === "published" ? "bg-green-500 text-white" : "bg-orange-400 text-white"}`}>
                      {post.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">{post.excerpt}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
                    <span>By {post.author}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-0.5 rounded-full">{post.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      {post.views} views
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <ActionBtn icon={<EditIcon />} label="Edit" onClick={() => setViewPost(post)} />
                  <button className="flex items-center border border-gray-200 hover:border-red-300 bg-white text-red-400 hover:text-red-600 transition-colors p-1.5 rounded-lg">
                    <TrashIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* View FAQ Modal */}
      {viewFaq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-5 sm:p-8 relative" style={{ maxHeight: "95vh", overflowY: "auto" }}>
            <button onClick={() => setViewFaq(null)} className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 text-xl font-bold">✕</button>
            <h2 className="text-3xl font-bold text-gray-900 mb-1">View FAQ</h2>
            <p className="text-sm text-gray-400 mb-5">View the details of the selected FAQ</p>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Question</label>
              <input readOnly value={viewFaq.question} className="w-full border-2 border-orange-400 rounded-lg px-4 py-2.5 text-base text-gray-800 bg-white focus:outline-none" />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Answer</label>
              <textarea readOnly value={viewFaq.answer} rows={4} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-base text-gray-600 bg-white focus:outline-none resize-none" />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Category</label>
              <div className="relative">
                <select defaultValue={viewFaq.category} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-base text-gray-600 bg-white focus:outline-none appearance-none">
                  <option>Orders</option>
                  <option>Returns</option>
                  <option>Shipping</option>
                  <option>Support</option>
                  <option>Payments</option>
                </select>
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <label className="text-base font-semibold text-gray-700">Active</label>
              <div className="relative w-12 h-6 rounded-full bg-orange-500 cursor-pointer">
                <span className="absolute top-0.5 right-0.5 w-5 h-5 bg-white rounded-full shadow" />
              </div>
            </div>

            <div className="flex justify-end">
              <button onClick={() => setViewFaq(null)} className="px-6 py-2.5 text-sm font-semibold text-gray-700 hover:text-gray-900">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Add FAQ Modal */}
      {addFaq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-5 sm:p-8 relative" style={{ maxHeight: "95vh", overflowY: "auto" }}>
            <button onClick={() => setAddFaq(false)} className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 text-xl font-bold">✕</button>
            <h2 className="text-3xl font-bold text-gray-900 mb-1">Add New FAQ</h2>
            <p className="text-sm text-gray-400 mb-5">Create a frequently asked question</p>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Question <span className="text-red-400">*</span></label>
              <input placeholder="Enter question" className="w-full border-2 border-orange-400 rounded-lg px-4 py-2.5 text-base text-gray-800 bg-white focus:outline-none placeholder-gray-300" />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Answer <span className="text-red-400">*</span></label>
              <textarea placeholder="Enter answer..." rows={4} className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-base text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-orange-300 resize-none placeholder-gray-300" />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Category</label>
              <div className="relative">
                <select defaultValue="Orders" className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-base text-gray-600 bg-white focus:outline-none appearance-none">
                  <option>Orders</option>
                  <option>Returns</option>
                  <option>Shipping</option>
                  <option>Support</option>
                  <option>Payments</option>
                </select>
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <label className="text-base font-semibold text-gray-700">Active</label>
              <div className="relative w-12 h-6 rounded-full bg-orange-500 cursor-pointer">
                <span className="absolute top-0.5 right-0.5 w-5 h-5 bg-white rounded-full shadow" />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button onClick={() => setAddFaq(false)} className="px-6 py-2.5 text-sm font-semibold text-gray-700 hover:text-gray-900">Cancel</button>
              <button onClick={() => setAddFaq(false)} className="px-6 py-2.5 text-sm font-semibold bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-colors">Add FAQ</button>
            </div>
          </div>
        </div>
      )}

      {/* FAQ Tab */}
      {activeTab === "FAQ" && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Frequently Asked Questions</h2>
            <button onClick={() => setAddFaq(true)} className="flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors self-start sm:self-auto">
              <span className="text-base font-bold">+</span>
              <span>Add FAQ</span>
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {faqData.map((faq, i) => (
              <div key={i} className="border border-gray-100 rounded-xl p-4 flex items-start gap-3">
                <div className="shrink-0 w-9 h-9 rounded-full bg-orange-50 flex items-center justify-center mt-0.5">
                  <svg className="w-5 h-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="text-sm sm:text-base font-bold text-gray-900">{faq.question}</h3>
                        <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-0.5 rounded-md">{faq.category}</span>
                        <span className="bg-green-500 text-white text-xs font-semibold px-2.5 py-0.5 rounded-full">Active</span>
                      </div>
                      <p className="text-sm text-gray-500 leading-relaxed">{faq.answer}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button onClick={() => setViewFaq(faq)} className="flex items-center border border-gray-200 hover:border-orange-300 bg-white text-gray-500 hover:text-orange-600 transition-colors p-1.5 rounded-lg">
                        <EditIcon />
                      </button>
                      <button className="flex items-center border border-gray-200 hover:border-red-300 bg-white text-red-400 hover:text-red-600 transition-colors p-1.5 rounded-lg">
                        <TrashIcon />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

function StatusDropdown({ status }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(status === "published" ? "Published" : "Draft");
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-base text-gray-700 bg-white flex items-center justify-between hover:border-gray-300 transition-colors"
      >
        <span>{selected}</span>
        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden">
          {["Draft", "Published"].map(option => (
            <button
              key={option}
              onClick={() => { setSelected(option); setOpen(false); }}
              className={`w-full flex items-center justify-between px-4 py-3 text-base transition-colors ${selected === option ? "bg-orange-50 text-orange-500 font-semibold" : "text-gray-700 hover:bg-gray-50"}`}
            >
              <span>{option}</span>
              {selected === option && (
                <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }) {
  return status === "published" ? (
    <span className="inline-flex items-center gap-2 bg-green-500 text-white text-sm font-semibold px-3 py-1.5 rounded-full">
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="7" stroke="white" strokeWidth="1.5" />
        <path d="M5 8l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      published
    </span>
  ) : (
    <span className="inline-flex items-center gap-2 bg-orange-400 text-white text-sm font-semibold px-3 py-1.5 rounded-full">
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="7" stroke="white" strokeWidth="1.5" />
        <path d="M8 4.5V8l2.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      draft
    </span>
  );
}

function ActionBtn({ icon, label, onClick }) {
  return (
    <button onClick={onClick} className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-orange-600 border border-gray-200 hover:border-orange-300 bg-white px-3 py-1.5 rounded-lg transition-colors font-medium">
      {icon}
      <span>{label}</span>
    </button>
  );
}

function BannerCard({ banner, onEdit, onToggle }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-visible relative">
      <div className="relative bg-orange-400 h-44 flex items-center justify-center rounded-t-xl overflow-hidden">
        <svg className="w-14 h-14 text-orange-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className={`absolute top-3 right-3 text-white text-xs font-semibold px-3 py-1 rounded-full ${banner.status === "active" ? "bg-green-500" : "bg-red-400"}`}>
          {banner.status === "active" ? "Active" : "Inactive"}
        </span>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2 relative">
          <h3 className="text-base font-bold text-gray-900">{banner.title}</h3>
          <div className="relative">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-400 hover:text-gray-600 p-1">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="19" r="1.5" />
              </svg>
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded-xl shadow-lg z-20 overflow-hidden">
                <button onClick={() => { setMenuOpen(false); onEdit(); }}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </button>
                <button onClick={() => { setMenuOpen(false); onToggle(); }}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                  {banner.status === "active" ? "Deactivate" : "Activate"}
                </button>
                <button onClick={() => setMenuOpen(false)}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
        <span className="inline-block bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-1 rounded-md mb-3">{banner.category}</span>
        <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-1.5">
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          <span className="font-mono">{banner.link}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{banner.start}</span>
          <span>→</span>
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{banner.end}</span>
        </div>
      </div>
    </div>
  );
}

function PageIcon() {
  return (
    <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  );
}