import React, { useState } from 'react';
import { Search, Filter, X, Star, Clock, BookOpen, GraduationCap, ChevronLeft, ChevronRight } from 'lucide-react';
import { python1, python2, python3, python4, python5, python6 } from '../../assets/images';
import { NavLink } from 'react-router-dom';

const courses = [
  {
    id: 1,
    title: 'Python Basics',
    provider: 'HarvardX',
    type: 'Self-paced',
    subject: 'Computer Science',
    skill: 'Beginner',
    school: 'Harvard University',
    image: python1,
    rating: 4.8,
    students: '125k',
    duration: '6 weeks',
    price: 'Free',
    color: 'from-blue-500 to-indigo-600',
    accent: 'border-blue-500/30',
  },
  {
    id: 2,
    title: 'Advanced Python',
    provider: 'MITx',
    type: 'Instructor-led',
    subject: 'Computer Science',
    skill: 'Advanced',
    school: 'MIT',
    image: python2,
    rating: 4.9,
    students: '89k',
    duration: '10 weeks',
    price: '$199',
    color: 'from-purple-500 to-pink-500',
    accent: 'border-purple-500/30',
  },
  {
    id: 3,
    title: 'Python for Data Science',
    provider: 'IBM',
    type: 'Self-paced',
    subject: 'Data Science',
    skill: 'Intermediate',
    school: 'IBM',
    image: python3,
    rating: 4.7,
    students: '210k',
    duration: '8 weeks',
    price: '$149',
    color: 'from-teal-400 to-blue-500',
    accent: 'border-teal-400/30',
  },
  {
    id: 4,
    title: 'Django Web Development',
    provider: 'Microsoft',
    type: 'Instructor-led',
    subject: 'Web Development',
    skill: 'Intermediate',
    school: 'Microsoft',
    image: python4,
    rating: 4.6,
    students: '156k',
    duration: '12 weeks',
    price: '$299',
    color: 'from-yellow-400 to-orange-500',
    accent: 'border-yellow-400/30',
  },
  {
    id: 5,
    title: 'Python for AI',
    provider: 'StanfordX',
    type: 'Self-paced',
    subject: 'Artificial Intelligence',
    skill: 'Advanced',
    school: 'Stanford University',
    image: python5,
    rating: 4.9,
    students: '78k',
    duration: '14 weeks',
    price: '$399',
    color: 'from-green-400 to-emerald-600',
    accent: 'border-green-400/30',
  },
  {
    id: 6,
    title: 'Flask and APIs',
    provider: 'Google',
    type: 'Instructor-led',
    subject: 'Web Development',
    skill: 'Beginner',
    school: 'Google',
    image: python6,
    rating: 4.8,
    students: '198k',
    duration: '7 weeks',
    price: '$179',
    color: 'from-red-400 to-pink-600',
    accent: 'border-red-400/30',
  },
];

const subjects = [...new Set(courses.map(course => course.subject))];
const skills = [...new Set(courses.map(course => course.skill))];
const schools = [...new Set(courses.map(course => course.school))];

const CourseSearchPage = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    subjects: [],
    skills: [],
    schools: [],
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 6;

  const toggleFilter = (type, value) => {
    setSelectedFilters(prev => {
      const isSelected = prev[type].includes(value);
      return {
        ...prev,
        [type]: isSelected
          ? prev[type].filter(item => item !== value)
          : [...prev[type], value],
      };
    });
  };

  const clearAllFilters = () => {
    setSelectedFilters({ subjects: [], skills: [], schools: [] });
  };

  const filteredCourses = courses.filter(course => {
    const matchSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       course.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchSubject = selectedFilters.subjects.length === 0 || 
                        selectedFilters.subjects.includes(course.subject);
    const matchSkill = selectedFilters.skills.length === 0 || 
                      selectedFilters.skills.includes(course.skill);
    const matchSchool = selectedFilters.schools.length === 0 || 
                       selectedFilters.schools.includes(course.school);
    
    return matchSearch && matchSubject && matchSkill && matchSchool;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const startIndex = (currentPage - 1) * coursesPerPage;
  const endIndex = startIndex + coursesPerPage;
  const currentCourses = filteredCourses.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  const getActiveFilterCount = () => {
    return selectedFilters.subjects.length + selectedFilters.skills.length + selectedFilters.schools.length;
  };

  const FilterSection = ({ title, items, type, icon: Icon }) => (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Icon size={16} className="text-gray-400" />
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      <div className="space-y-3">
        {items.map(item => (
          <label key={item} className="flex items-center cursor-pointer group">
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only"
                checked={selectedFilters[type].includes(item)}
                onChange={() => toggleFilter(type, item)}
              />
              <div className={`w-5 h-5 border-2 rounded transition-all duration-200 ${
                selectedFilters[type].includes(item)
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 border-blue-500'
                  : 'border-gray-600 hover:border-gray-400'
              }`}>
                {selectedFilters[type].includes(item) && (
                  <svg className="w-3 h-3 text-white absolute top-0.5 left-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </div>
            <span className="ml-3 text-gray-300 group-hover:text-white transition-colors duration-200">
              {item}
            </span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
              Master Python
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Discover world-class Python courses from top universities and industry leaders
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
              <input
                type="text"
                placeholder="Search courses..."
                className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-3 bg-gray-900 border border-gray-700 rounded-xl hover:bg-gray-800 transition-all duration-200 relative"
            >
              <Filter size={20} />
              <span>Filters</span>
              {getActiveFilterCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                  {getActiveFilterCount()}
                </span>
              )}
            </button>
          </div>

          {/* Active Filters */}
          {getActiveFilterCount() > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {[...selectedFilters.subjects, ...selectedFilters.skills, ...selectedFilters.schools].map(filter => (
                <span
                  key={filter}
                  className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-sm"
                >
                  {filter}
                  <button
                    onClick={() => {
                      if (selectedFilters.subjects.includes(filter)) toggleFilter('subjects', filter);
                      if (selectedFilters.skills.includes(filter)) toggleFilter('skills', filter);
                      if (selectedFilters.schools.includes(filter)) toggleFilter('schools', filter);
                    }}
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
              <button
                onClick={clearAllFilters}
                className="text-sm text-gray-400 hover:text-white underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Filters</h2>
                {getActiveFilterCount() > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-blue-400 hover:text-blue-300"
                  >
                    Clear all
                  </button>
                )}
              </div>

              <FilterSection
                title="Subjects"
                items={subjects}
                type="subjects"
                icon={BookOpen}
              />

              <FilterSection
                title="Skill Levels"
                items={skills}
                type="skills"
                icon={GraduationCap}
              />

              <FilterSection
                title="Schools & Partners"
                items={schools}
                type="schools"
                icon={Star}
              />
            </div>
          </div>

          {/* Course Grid */}
          <div className="lg:w-3/4">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-400">
                {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} found
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {currentCourses.map(course => (
                <NavLink 
                  key={course.id}
                  to={`/coursedetailpage/${course.id}`}
                  className="block"
                >
                  <div
                    className={`group bg-gray-900/50 backdrop-blur-sm border ${course.accent} rounded-2xl overflow-hidden hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer`}
                  >
                    {/* Course Image */}
                    <div className={`h-48 bg-gradient-to-br ${course.color} relative overflow-hidden`}>
                      <img 
                        src={course.image} 
                        alt={course.title}
                        className="w-full h-full object-cover mix-blend-multiply opacity-80"
                      />
                      <div className="absolute inset-0 bg-black/20" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-black/30 backdrop-blur-sm rounded-full text-sm text-white">
                          {course.type}
                        </span>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-black/30 backdrop-blur-sm rounded-full text-sm font-semibold text-white">
                          {course.price}
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center justify-between">
                          <span className="text-white/80 text-sm">{course.school}</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-white text-sm font-medium">{course.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Course Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                        {course.title}
                      </h3>
                      <p className="text-gray-400 mb-4">{course.provider}</p>

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen size={14} />
                          <span>{course.students} students</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className={`px-3 py-1 bg-gradient-to-r ${course.color} rounded-full text-xs font-medium text-white`}>
                          {course.skill}
                        </span>
                        <span className="text-xs text-gray-500 uppercase tracking-wide">
                          {course.subject}
                        </span>
                      </div>
                    </div>
                  </div>
                </NavLink>
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-white mb-2">No courses found</h3>
                <p className="text-gray-400 mb-4">Try adjusting your search or filters</p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white font-medium hover:shadow-lg transition-all duration-200"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {filteredCourses.length > coursesPerPage && (
              <div className="flex justify-center items-center mt-12 space-x-2">
                <button
                  onClick={goToPrevious}
                  disabled={currentPage === 1}
                  className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 ${
                    currentPage === 1 
                      ? 'bg-gray-800 text-gray-600 cursor-not-allowed' 
                      : 'bg-gray-800 text-white hover:bg-gray-700 hover:scale-105'
                  }`}
                >
                  <ChevronLeft size={20} />
                </button>

                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  const isCurrentPage = pageNumber === currentPage;
                  
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => goToPage(pageNumber)}
                      className={`w-10 h-10 rounded-xl font-medium transition-all duration-200 ${
                        isCurrentPage
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}

                <button
                  onClick={goToNext}
                  disabled={currentPage === totalPages}
                  className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 ${
                    currentPage === totalPages 
                      ? 'bg-gray-800 text-gray-600 cursor-not-allowed' 
                      : 'bg-gray-800 text-white hover:bg-gray-700 hover:scale-105'
                  }`}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseSearchPage;