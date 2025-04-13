
import React from 'react';
import { Book, Menu, Bell } from 'lucide-react';
import NavBar from '../components/NavBar';
import SearchBar from '../components/SearchBar';
import SectionTitle from '../components/SectionTitle';
import BookList from '../components/BookList';
import CategoryList from '../components/CategoryList';
import { getFeaturedBooks, getRecentlyAddedBooks, getCategories } from '../services/mockDataService';

const HomePage: React.FC = () => {
  const featuredBooks = getFeaturedBooks();
  const recentlyAddedBooks = getRecentlyAddedBooks();
  const categories = getCategories();

  return (
    <div className="flex flex-col min-h-screen bg-bookMingle-background pb-20">
      {/* App Bar */}
      <header className="bg-bookMingle-primary px-4 py-4 shadow-md">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Menu className="h-6 w-6 text-white mr-3" />
            <div className="flex items-center">
              <Book className="h-6 w-6 text-bookMingle-accent mr-2" />
              <h1 className="text-xl font-bold text-white">BookMingle</h1>
            </div>
          </div>
          <button className="p-1 rounded-full">
            <Bell className="h-6 w-6 text-white" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 pt-4 overflow-y-auto">
        {/* Search */}
        <SearchBar />

        {/* Featured Books */}
        <section className="mt-6">
          <SectionTitle 
            title="Featured Books" 
            onActionClick={() => console.log('View all featured')} 
          />
          <BookList books={featuredBooks} />
        </section>

        {/* Recently Added */}
        <section className="mt-8">
          <SectionTitle 
            title="Recently Added" 
            onActionClick={() => console.log('View all recent')} 
          />
          <BookList books={recentlyAddedBooks} compact />
        </section>

        {/* Categories */}
        <section className="mt-8 mb-8">
          <SectionTitle 
            title="Explore Categories" 
            onActionClick={() => console.log('View all categories')} 
          />
          <CategoryList categories={categories} />
        </section>
      </main>

      {/* Bottom Navigation */}
      <NavBar />
    </div>
  );
};

export default HomePage;
