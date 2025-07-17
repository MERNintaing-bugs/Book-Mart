import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BookListPage from './pages/BookListPage';
import BookDetailPage from './pages/BookDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ProfilePage from './pages/ProfilePage';
import AddBookPage from './pages/AddBookPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import WelcomePage from './pages/WelcomePage';
import ProtectedRoute from './components/ProtectedRoute';
import Dsahboard from './components/Dashboard'
import Deals from './components/Deals'
import './App.css';

function Layout({ children }) {
  const location = useLocation();
  // Hide Navbar and Footer on Welcome, Register, and Login pages
  const hideNavAndFooter = ["/", "/register", "/login"].includes(location.pathname);
  return (
    <>
      {!hideNavAndFooter && <Navbar />}
      <main className="main-content">{children}</main>
      {!hideNavAndFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<WelcomePage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
              <Route path="/books" element={<ProtectedRoute><BookListPage /></ProtectedRoute>} />
              <Route path="/book/:id" element={<ProtectedRoute><BookDetailPage /></ProtectedRoute>} />
              <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
              <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
              <Route path="/add-book" element={<ProtectedRoute><AddBookPage /></ProtectedRoute>} />
              <Route path="/orders" element={<ProtectedRoute><OrderHistoryPage /></ProtectedRoute>} />
              <Route path="/dashboard" element={<ProtectedRoute><Dsahboard /></ProtectedRoute>} />
              <Route path="/deals" element={<ProtectedRoute><Deals/></ProtectedRoute>}/>
            </Routes>
          </Layout>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;