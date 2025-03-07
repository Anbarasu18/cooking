import React from 'react';
import { LogOut, Moon, Sun, User } from 'lucide-react';
import { useStore } from '../store/useStore';

interface UserMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick: () => void;
}

export function UserMenu({ isOpen, onClose, onLoginClick }: UserMenuProps) {
  const { isLoggedIn, username, isDarkMode, toggleDarkMode, logout } = useStore();

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-16 w-64 bg-gray-800 rounded-lg shadow-xl z-50">
      <div className="p-4">
        {isLoggedIn ? (
          <>
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-blue-500 rounded-full p-2">
                <User className="h-6 w-6" />
              </div>
              <div>
                <p className="text-white font-semibold">{username}</p>
                <p className="text-gray-400 text-sm">Premium Member</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="flex items-center space-x-2 text-gray-300 hover:text-white w-full p-2 rounded-lg hover:bg-gray-700"
            >
              <LogOut className="h-5 w-5" />
              <span>Sign Out</span>
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              onClose();
              onLoginClick();
            }}
            className="flex items-center space-x-2 text-gray-300 hover:text-white w-full p-2 rounded-lg hover:bg-gray-700"
          >
            <User className="h-5 w-5" />
            <span>Sign In</span>
          </button>
        )}
        <hr className="my-3 border-gray-700" />
        <button
          onClick={toggleDarkMode}
          className="flex items-center space-x-2 text-gray-300 hover:text-white w-full p-2 rounded-lg hover:bg-gray-700"
        >
          {isDarkMode ? (
            <>
              <Sun className="h-5 w-5" />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="h-5 w-5" />
              <span>Dark Mode</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}