// src/components/layout/Header.tsx
'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const pathname = usePathname();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Función para determinar si una ruta está activa
  const isActive = (path: string) => pathname === path;

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = async () => {
    await logout();
    setShowLogoutModal(false);
  };

  return (
    <>
      <header className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Logo y enlace a Home */}
            <Link 
              href="/" 
              className="text-2xl font-bold hover:text-blue-200 transition-colors"
            >
              CarDealer
            </Link>
            
            {/* Navegación principal */}
            <nav className="flex flex-wrap justify-center gap-4 md:gap-6">
              <Link 
                href="/about" 
                className={`hover:text-blue-200 transition-colors ${isActive('/about') ? 'font-bold underline' : ''}`}
              >
                About
              </Link>
              
              <Link 
                href="/contact" 
                className={`hover:text-blue-200 transition-colors ${isActive('/contact') ? 'font-bold underline' : ''}`}
              >
                Contact
              </Link>
              
              <Link 
                href="/dealers" 
                className={`hover:text-blue-200 transition-colors ${isActive('/dealers') ? 'font-bold underline' : ''}`}
              >
                Dealers
              </Link>

              {/* Mostrar Register solo si no está autenticado */}
              {!isAuthenticated && (
                <Link 
                  href="/register" 
                  className={`hover:text-blue-200 transition-colors ${isActive('/register') ? 'font-bold underline' : ''}`}
                >
                  Register
                </Link>
              )}

              {/* Estado de autenticación */}
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm hidden md:inline">Welcome, {user?.email}</span>
                  <button 
                    onClick={handleLogoutClick}
                    className="hover:text-blue-200 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link 
                  href="/login" 
                  className={`hover:text-blue-200 transition-colors ${isActive('/login') ? 'font-bold underline' : ''}`}
                >
                  Login
                </Link>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Modal de confirmación de Logout */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Confirm Logout</h3>
            <p className="mb-6">Are you sure you want to log out?</p>
            
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}