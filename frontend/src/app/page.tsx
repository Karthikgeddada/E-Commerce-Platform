"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { productService } from '@/services/api';
import Navbar from '@/components/Navbar';
import ProductGrid from '@/components/ProductGrid';
import Link from 'next/link';

function HomeContent() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';
  const initialSort = searchParams.get('sort') || 'Featured';

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [minRating, setMinRating] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState(initialSort);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params: any = {};
        if (search) params.search = search;
        if (category) params.category = category;
        if (minRating) params.minRating = minRating;
        if (sortBy !== 'Featured') params.sort = sortBy;

        const response = await productService.getAll(params);
        setProducts(response.data);
      } catch (err) {
        setError('Failed to load products. Please check if backend is running.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [search, category, minRating, sortBy]);

  return (
    <div className="min-h-screen bg-[#E3E6E6] flex flex-col">
      <Navbar />

      {/* Full-width Banner Carousel Section */}
      {!search && !category && (
        <div className="relative w-full h-[300px] md:h-[600px] overflow-hidden">
          <Link href="/?category=Electronics" className="block w-full h-full">
            <img
              src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=2000&q=80"
              alt="Banner"
              className="w-full h-full object-cover cursor-pointer hover:opacity-95 transition-opacity"
            />
          </Link>
          <div className="absolute inset-0 bg-gradient-to-t from-[#E3E6E6] via-transparent to-transparent pointer-events-none"></div>

          {/* Floating Info Box on Banner - Separated from image link to avoid nested links */}
          <div className="absolute top-[40px] md:top-[80px] left-[5%] max-w-[90%] md:max-w-[450px] bg-white p-6 md:p-8 shadow-2xl rounded-sm hidden sm:block border border-gray-100 z-20">
            <h2 className="text-xl md:text-3xl font-bold mb-2 md:mb-4 text-[#111]">Great Indian Festival</h2>
            <p className="text-gray-700 mb-4 md:mb-6 font-medium text-sm md:text-lg leading-relaxed">
              Up to <span className="text-[#CC0C39] font-black text-2xl md:text-4xl">70% OFF</span> on top electronics and gadgets.
            </p>
            <Link href="/offers">
              <button className="bg-[#ffa41c] hover:bg-[#fa8900] text-black px-6 md:px-10 py-2 md:py-3 rounded-full font-bold shadow-md transition-all border border-[#f59e0b] text-sm md:text-base cursor-pointer">
                Browse Offers
              </button>
            </Link>
          </div>
        </div>
      )}

      <main className={`flex-1 w-full pb-10 ${!search && !category ? '-mt-[100px] md:-mt-[350px]' : 'mt-6'} relative z-10 px-2 md:px-4`}>
        <div className="max-w-[1600px] mx-auto w-full">
          <div className={`relative z-10 ${(!search && !category) ? 'pt-[300px]' : 'pt-2'}`}>
            {!search && !category && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
                {[
                  {
                    title: 'Upgrade your home', items: [
                      { name: 'Appliances', img: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=300', cat: 'Appliances' },
                      { name: 'Home Decor', img: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=300', cat: 'Home & Kitchen' },
                      { name: 'Kitchen', img: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=300', cat: 'Home & Kitchen' },
                      { name: 'Outdoor', img: 'https://images.unsplash.com/photo-1598528738936-c50861cc75a9?w=300', cat: 'Garden & Outdoors' }
                    ]
                  },
                  {
                    title: 'Latest in Fashion', items: [
                      { name: 'Clothing', img: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=300', cat: 'Amazon Fashion' },
                      { name: 'Footwear', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300', cat: 'Shoes & Handbags' },
                      { name: 'Watches', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300', cat: 'Watches' },
                      { name: 'Accessories', img: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300', cat: 'Jewellery' }
                    ]
                  },
                  { title: 'Smart Tech', img: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=600', link: 'Electronics' },
                  { title: 'Great Books', img: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600', link: 'Books' },
                ].map((card, idx) => (
                  <div key={idx} className="bg-white p-5 shadow-sm flex flex-col h-full rounded-sm group overflow-hidden border border-gray-100 hover:shadow-md transition-shadow">
                    <h3 className="text-[21px] font-bold mb-3 text-[#111]">{card.title}</h3>
                    {card.items ? (
                      <div className="grid grid-cols-2 gap-4 flex-1 mb-4">
                        {card.items.map((item: any, i: number) => (
                          <Link key={i} href={`/?category=${encodeURIComponent(item.cat || item.name)}`} className="flex flex-col gap-1 group/item outline-none">
                            <div className="overflow-hidden h-[120px] bg-gray-50 flex items-center justify-center">
                              <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500" />
                            </div>
                            <span className="text-[12px] text-gray-800 font-medium truncate group-hover/item:text-[#c45500]">{item.name}</span>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <Link href={`/?category=${encodeURIComponent(card.link!)}`} className="flex-1 mb-4 overflow-hidden h-[300px] outline-none">
                        <img src={card.img} alt={card.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      </Link>
                    )}
                    <Link href={card.link ? `/?category=${encodeURIComponent(card.link)}` : '/'} className="text-[13px] text-[#007185] hover:text-[#c45500] hover:underline transition-colors font-medium mt-2">
                      Shop now
                    </Link>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-col md:flex-row gap-6 mt-4">
              {/* Sidebar Filters */}
              <div className="w-full md:w-[260px] flex-shrink-0">
                <div className="sticky top-[80px] space-y-8 bg-white p-5 rounded-sm shadow-sm border border-gray-100">
                  <div>
                    <h4 className="font-bold text-[14px] mb-3 text-gray-900 border-b pb-2 uppercase tracking-wide">Category</h4>
                    <ul className="space-y-2 text-[14px] text-gray-700">
                      <li><Link href="/" className={`hover:text-[#c45500] transition-colors ${!category ? 'font-bold text-black' : ''}`}>All Departments</Link></li>
                      {['Electronics', 'Amazon Fashion', 'Shoes & Handbags', 'Appliances', 'Home & Kitchen', 'Books', 'Beauty', 'Sports, Fitness & Outdoors', 'Grocery & Gourmet Foods'].map((cat) => (
                        <li key={cat}>
                          <Link href={`/?category=${encodeURIComponent(cat)}`} className={`hover:text-[#c45500] transition-colors ${category === cat ? 'font-bold text-black' : ''}`}>
                            {cat}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-[14px] mb-3 text-gray-900 border-b pb-2 uppercase tracking-wide">Customer Review</h4>
                    <div className="space-y-3 text-[14px] text-gray-700">
                      {[4, 3, 2, 1].map(s => (
                        <p
                          key={s}
                          onClick={() => setMinRating(minRating === s ? null : s)}
                          className={`hover:text-[#c45500] cursor-pointer flex items-center gap-1 transition-colors ${minRating === s ? 'text-[#c45500] font-bold' : ''}`}
                        >
                          <span className="text-[#febd69] text-lg">{'★'.repeat(s)}{'☆'.repeat(5 - s)}</span>
                          <span className="text-xs">& Up</span>
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="bg-[#FEBD69]/10 p-5 rounded-sm border border-[#febd69]/30">
                    <p className="text-sm font-bold text-[#111] mb-2">Prime Student</p>
                    <p className="text-xs text-gray-700 mb-3 leading-relaxed">Try Prime Student for 6 months at no cost.</p>
                    <button className="w-full bg-[#232f3e] text-white text-[12px] py-2 rounded-sm font-bold hover:bg-[#131921] transition-colors shadow-sm">Learn more</button>
                  </div>
                </div>
              </div>

              {/* Product Listing */}
              <div className="flex-1">
                <div className="mb-6 bg-white p-5 shadow-sm border border-gray-100 flex justify-between items-center rounded-sm">
                  <div>
                    <h1 className="text-xl font-bold text-gray-900 leading-tight">
                      {search ? `Results for "${search}"` : category ? `${category}` : 'Featured Products For You'}
                    </h1>
                    <p className="text-[13px] text-gray-500 mt-1">{products.length} products available</p>
                  </div>
                  <div className="hidden sm:block">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-gray-100 border border-gray-300 text-[13px] rounded-md px-4 py-2 outline-none focus:border-[#e67a00] shadow-sm cursor-pointer hover:bg-gray-200 transition-colors"
                    >
                      <option value="Featured">Sort by: Featured</option>
                      <option value="Price: Low to High">Price: Low to High</option>
                      <option value="Price: High to Low">Price: High to Low</option>
                      <option value="Avg. Customer Review">Avg. Customer Review</option>
                    </select>
                  </div>
                </div>

                {loading ? (
                  <div className="flex items-center justify-center p-20 bg-white shadow-sm rounded-sm border border-gray-100">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e67a00]"></div>
                  </div>
                ) : error ? (
                  <div className="bg-white p-10 shadow-sm rounded-sm text-center border border-gray-100">
                    <div className="bg-red-50 text-red-700 p-6 border border-red-100 rounded-sm italic">
                      {error}
                    </div>
                  </div>
                ) : (
                  <ProductGrid products={products} />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#232f3e] text-white mt-auto">
        <div className="bg-[#37475a] py-4 text-center text-[13px] font-bold hover:bg-[#485769] cursor-pointer transition-colors shadow-inner">
          Back to top
        </div>

        <div className="max-w-[1000px] mx-auto py-10 grid grid-cols-2 md:grid-cols-4 gap-12 px-6 text-[13px]">
          <div className="space-y-4">
            <h3 className="font-bold text-[16px]">Get to Know Us</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:underline cursor-pointer">About Us</li>
              <li className="hover:underline cursor-pointer">Careers</li>
              <li className="hover:underline cursor-pointer">Press Releases</li>
              <li className="hover:underline cursor-pointer">Amazon Science</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-bold text-[16px]">Connect with Us</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:underline cursor-pointer">Facebook</li>
              <li className="hover:underline cursor-pointer">Twitter</li>
              <li className="hover:underline cursor-pointer">Instagram</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-bold text-[16px]">Make Money</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:underline cursor-pointer">Sell on Amazon</li>
              <li className="hover:underline cursor-pointer">Become an Affiliate</li>
              <li className="hover:underline cursor-pointer">Advertise Your Products</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-bold text-[16px]">Let Us Help You</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:underline cursor-pointer">Your Account</li>
              <li className="hover:underline cursor-pointer">Returns Centre</li>
              <li className="hover:underline cursor-pointer">100% Purchase Protection</li>
              <li className="hover:underline cursor-pointer">Help</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#3a4553] py-10 flex flex-col items-center gap-6">
          <Link href="/" className="text-2xl font-bold tracking-tight">amazon<span className="text-[#febd69]">.in</span></Link>
          <div className="flex gap-4 text-[12px] text-gray-300">
            <span>Australia</span> <span>Brazil</span> <span>Canada</span> <span>China</span> <span>France</span> <span>Germany</span> <span>Italy</span> <span>Japan</span> <span>Mexico</span> <span>Netherlands</span> <span>Singapore</span> <span>Spain</span> <span>United Kingdom</span> <span>United States</span>
          </div>
        </div>
      </footer>
    </div >
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
