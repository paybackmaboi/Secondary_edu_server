# 🎓 Tech Client - Frontend Implementation Guide

A comprehensive step-by-step guide for building a modern, professional frontend for the School Management System using **Next.js 14**, **Tailwind CSS**, and **Bootstrap 5**.

---

## 📋 Table of Contents

1. [Project Setup](#-project-setup)
2. [Project Structure](#-project-structure)
3. [Design System](#-design-system)
4. [Core Components](#-core-components)
5. [Authentication System](#-authentication-system)
6. [Landing Page](#-landing-page)
7. [Dashboard Layouts](#-dashboard-layouts)
8. [Feature Modules](#-feature-modules)
9. [API Integration](#-api-integration)

---

## 🚀 Project Setup

### Step 1: Create Next.js Project

```bash
npx create-next-app@latest tech_client --javascript --tailwind --eslint --app --src-dir
cd tech_client
```

### Step 2: Install Dependencies

```bash
npm install bootstrap react-bootstrap axios framer-motion react-icons react-hot-toast
```

### Step 3: Configure Environment Variables

Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### Step 4: Import Bootstrap CSS

In `src/app/layout.js`, add:
```javascript
import 'bootstrap/dist/css/bootstrap.min.css';
```

---

## 📁 Project Structure

```
tech_client/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   └── login/page.js
│   │   ├── (dashboard)/
│   │   │   ├── layout.js
│   │   │   ├── superadmin/
│   │   │   │   ├── page.js
│   │   │   │   └── accounts/page.js
│   │   │   ├── admin/
│   │   │   │   ├── page.js
│   │   │   │   ├── students/page.js
│   │   │   │   ├── grades/page.js
│   │   │   │   └── attendance/page.js
│   │   │   └── teacher/page.js
│   │   ├── globals.css
│   │   ├── layout.js
│   │   └── page.js (Landing Page)
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.js
│   │   │   ├── Card.js
│   │   │   ├── Input.js
│   │   │   ├── Modal.js
│   │   │   └── Table.js
│   │   ├── layout/
│   │   │   ├── Navbar.js
│   │   │   ├── Sidebar.js
│   │   │   └── Footer.js
│   │   └── sections/
│   │       ├── Hero.js
│   │       ├── Features.js
│   │       ├── Roles.js
│   │       ├── About.js
│   │       └── Contact.js
│   ├── contexts/
│   │   └── AuthContext.js
│   ├── services/
│   │   └── api.js
│   └── lib/
│       └── utils.js
```

---

## 🎨 Design System

### Color Palette (globals.css)

```css
:root {
  /* Primary Colors */
  --primary: #6366f1;
  --primary-dark: #4f46e5;
  --primary-light: #818cf8;
  
  /* Accent Colors */
  --accent: #06b6d4;
  --accent-dark: #0891b2;
  
  /* Neutral Colors */
  --dark: #0f172a;
  --dark-light: #1e293b;
  --gray: #64748b;
  --light: #f1f5f9;
  --white: #ffffff;
  
  /* Status Colors */
  --success: #10b981;
  --warning: #f59e0b;
  --danger: #ef4444;
  
  /* Gradients */
  --gradient-primary: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%);
  --gradient-dark: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
}

/* Glassmorphism Effect */
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Live Background Animation */
.live-bg {
  background: linear-gradient(-45deg, #0f172a, #1e293b, #312e81, #1e1b4b);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Floating Particles */
.particles {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
}

.particle {
  position: absolute;
  width: 10px;
  height: 10px;
  background: rgba(99, 102, 241, 0.3);
  border-radius: 50%;
  animation: float 20s infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(-100vh) rotate(720deg); opacity: 0; }
}
```

---

## 🧩 Core Components

### Button Component (`src/components/ui/Button.js`)

```javascript
'use client';
import { motion } from 'framer-motion';

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  ...props 
}) {
  const variants = {
    primary: 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700',
    secondary: 'bg-slate-700 text-white hover:bg-slate-600',
    outline: 'border-2 border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    success: 'bg-emerald-500 text-white hover:bg-emerald-600',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        ${variants[variant]} 
        ${sizes[size]} 
        rounded-xl font-semibold 
        transition-all duration-300 
        shadow-lg hover:shadow-xl
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.button>
  );
}
```

### Card Component (`src/components/ui/Card.js`)

```javascript
'use client';
import { motion } from 'framer-motion';

export default function Card({ 
  children, 
  className = '', 
  hover = true,
  glass = false 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hover ? { y: -5, scale: 1.01 } : {}}
      className={`
        ${glass 
          ? 'bg-white/10 backdrop-blur-lg border border-white/20' 
          : 'bg-slate-800 border border-slate-700'
        }
        rounded-2xl p-6 shadow-xl
        transition-all duration-300
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
```

### Table Component (`src/components/ui/Table.js`)

```javascript
'use client';
import { motion } from 'framer-motion';

export default function Table({ columns, data, onRowClick }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-700">
      <table className="w-full">
        <thead className="bg-slate-800">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-700">
          {data.map((row, rowIdx) => (
            <motion.tr
              key={rowIdx}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: rowIdx * 0.05 }}
              onClick={() => onRowClick?.(row)}
              className="bg-slate-900 hover:bg-slate-800 transition-colors cursor-pointer"
            >
              {columns.map((col, colIdx) => (
                <td key={colIdx} className="px-6 py-4 text-sm text-slate-300">
                  {col.render ? col.render(row) : row[col.accessor]}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

---

## 🔐 Authentication System

### Auth Context (`src/contexts/AuthContext.js`)

```javascript
'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      // For now, fetch user by username (implement proper auth on backend later)
      const response = await api.get('/accounts');
      const account = response.data.find(
        acc => acc.username === username && acc.isActive
      );
      
      if (account) {
        setUser(account);
        localStorage.setItem('user', JSON.stringify(account));
        
        // Redirect based on role
        switch (account.role) {
          case 'superadmin':
            router.push('/superadmin');
            break;
          case 'admin':
            router.push('/admin');
            break;
          case 'teacher':
            router.push('/teacher');
            break;
          default:
            router.push('/user');
        }
        return { success: true };
      }
      return { success: false, error: 'Invalid credentials' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    router.push('/login');
  };

  const hasRole = (roles) => {
    if (!user) return false;
    return roles.includes(user.role);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
```

### Login Page (`src/app/(auth)/login/page.js`)

```javascript
'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaLock, FaGraduationCap } from 'react-icons/fa';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/ui/Button';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const result = await login(username, password);
    if (!result.success) {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen live-bg flex items-center justify-center p-4">
      {/* Floating Particles */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="glass rounded-3xl p-8 shadow-2xl">
          {/* Logo */}
          <div className="text-center mb-8">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="inline-block p-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 mb-4"
            >
              <FaGraduationCap className="text-4xl text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
            <p className="text-slate-400 mt-2">Sign in to your account</p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-xl mb-6"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-slate-300 mb-2">Username</label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-slate-800/50 border border-slate-600 rounded-xl pl-12 pr-4 py-3 text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                  placeholder="Enter username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 mb-2">Password</label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-800/50 border border-slate-600 rounded-xl pl-12 pr-4 py-3 text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <p className="text-center text-slate-400 mt-6">
            Default: <code className="text-indigo-400">superadmin / SuperAdmin@123</code>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
```

---

## 🏠 Landing Page

### Main Page (`src/app/page.js`)

```javascript
'use client';
import Hero from '@/components/sections/Hero';
import Features from '@/components/sections/Features';
import Roles from '@/components/sections/Roles';
import About from '@/components/sections/About';
import Footer from '@/components/layout/Footer';

export default function LandingPage() {
  return (
    <main className="live-bg min-h-screen">
      <Hero />
      <Features />
      <Roles />
      <About />
      <Footer />
    </main>
  );
}
```

### Hero Section (`src/components/sections/Hero.js`)

```javascript
'use client';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Circles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10"
            style={{
              width: `${200 + i * 150}px`,
              height: `${200 + i * 150}px`,
              left: `${20 + i * 10}%`,
              top: `${10 + i * 15}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="inline-block mb-8"
          >
            <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-500 to-purple-600 shadow-2xl">
              <FaGraduationCap className="text-6xl text-white" />
            </div>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">
              School Management
            </span>
            <br />
            <span className="text-white">System</span>
          </h1>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            A comprehensive platform for managing students, grades, attendance, 
            and academic records with role-based access control.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg">
                Get Started <FaArrowRight className="inline ml-2" />
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

### Features Section (`src/components/sections/Features.js`)

```javascript
'use client';
import { motion } from 'framer-motion';
import { FaUserGraduate, FaChartBar, FaCalendarCheck, FaBook, FaAward, FaClipboardList } from 'react-icons/fa';
import Card from '@/components/ui/Card';

const features = [
  {
    icon: FaUserGraduate,
    title: 'Student Management',
    description: 'Complete student records with LRN, personal info, and education levels from K-12.',
  },
  {
    icon: FaChartBar,
    title: 'Grade Tracking',
    description: 'Quarterly grades, semester grades for Senior High, and automatic final rating computation.',
  },
  {
    icon: FaCalendarCheck,
    title: 'Attendance Records',
    description: 'Monthly attendance tracking with days present, absent, and tardiness records.',
  },
  {
    icon: FaBook,
    title: 'Subject Management',
    description: 'Manage subjects across all education levels with custom codes.',
  },
  {
    icon: FaAward,
    title: 'Observed Values',
    description: 'Track student behavior and core values aligned with DepEd standards.',
  },
  {
    icon: FaClipboardList,
    title: 'Report Cards',
    description: 'Generate comprehensive report cards with all academic data.',
  },
];

export default function Features() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Powerful Features
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Everything you need to manage your school's academic records efficiently.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card glass className="h-full">
                <div className="p-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 w-fit mb-4">
                  <feature.icon className="text-2xl text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-400">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### Roles Section (`src/components/sections/Roles.js`)

```javascript
'use client';
import { motion } from 'framer-motion';
import { FaUserShield, FaUserCog, FaChalkboardTeacher, FaUser } from 'react-icons/fa';
import Card from '@/components/ui/Card';

const roles = [
  {
    icon: FaUserShield,
    title: 'Super Admin',
    color: 'from-red-500 to-orange-500',
    permissions: [
      'Manage all user accounts',
      'Full system access',
      'View all reports',
      'System configuration',
    ],
  },
  {
    icon: FaUserCog,
    title: 'Admin',
    color: 'from-indigo-500 to-purple-500',
    permissions: [
      'Manage students & records',
      'Manage grades & attendance',
      'Generate reports',
      'View analytics',
    ],
  },
  {
    icon: FaChalkboardTeacher,
    title: 'Teacher',
    color: 'from-emerald-500 to-teal-500',
    permissions: [
      'View assigned students',
      'Enter grades',
      'Record attendance',
      'View class reports',
    ],
  },
  {
    icon: FaUser,
    title: 'User',
    color: 'from-cyan-500 to-blue-500',
    permissions: [
      'View own profile',
      'View assigned data',
      'Limited access',
    ],
  },
];

export default function Roles() {
  return (
    <section className="py-24 bg-slate-900/50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-white mb-4">
            Role-Based Access
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Secure access control with four distinct user roles.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.map((role, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="h-full text-center">
                <div className={`p-4 rounded-2xl bg-gradient-to-r ${role.color} w-fit mx-auto mb-4`}>
                  <role.icon className="text-3xl text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{role.title}</h3>
                <ul className="space-y-2">
                  {role.permissions.map((perm, i) => (
                    <li key={i} className="text-slate-400 text-sm">
                      ✓ {perm}
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

### Footer (`src/components/layout/Footer.js`)

```javascript
'use client';
import { FaGraduationCap, FaGithub, FaEnvelope } from 'react-icons/fa';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600">
                <FaGraduationCap className="text-xl text-white" />
              </div>
              <span className="text-xl font-bold text-white">EduManage</span>
            </div>
            <p className="text-slate-400">
              Complete school management solution for the Philippine K-12 curriculum.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/login" className="text-slate-400 hover:text-indigo-400 transition">Login</Link></li>
              <li><Link href="#features" className="text-slate-400 hover:text-indigo-400 transition">Features</Link></li>
              <li><Link href="#about" className="text-slate-400 hover:text-indigo-400 transition">About</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-indigo-400 transition">
                <FaGithub className="text-2xl" />
              </a>
              <a href="#" className="text-slate-400 hover:text-indigo-400 transition">
                <FaEnvelope className="text-2xl" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
          © {new Date().getFullYear()} EduManage. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
```

---

## 📊 Dashboard Layouts

### Dashboard Layout (`src/app/(dashboard)/layout.js`)

```javascript
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Sidebar from '@/components/layout/Sidebar';

export default function DashboardLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-900">
      <Sidebar />
      <main className="flex-1 p-8 ml-64">
        {children}
      </main>
    </div>
  );
}
```

### Sidebar (`src/components/layout/Sidebar.js`)

```javascript
'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import {
  FaHome, FaUsers, FaUserGraduate, FaChartBar,
  FaCalendarCheck, FaBook, FaClipboardList, FaSignOutAlt,
  FaGraduationCap
} from 'react-icons/fa';

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout, hasRole } = useAuth();

  const menuItems = [
    { icon: FaHome, label: 'Dashboard', href: `/${user?.role}`, roles: ['superadmin', 'admin', 'teacher', 'user'] },
    { icon: FaUsers, label: 'Accounts', href: '/superadmin/accounts', roles: ['superadmin'] },
    { icon: FaUserGraduate, label: 'Students', href: '/admin/students', roles: ['superadmin', 'admin', 'teacher'] },
    { icon: FaChartBar, label: 'Grades', href: '/admin/grades', roles: ['superadmin', 'admin', 'teacher'] },
    { icon: FaCalendarCheck, label: 'Attendance', href: '/admin/attendance', roles: ['superadmin', 'admin', 'teacher'] },
    { icon: FaBook, label: 'Subjects', href: '/admin/subjects', roles: ['superadmin', 'admin'] },
    { icon: FaClipboardList, label: 'Report Cards', href: '/admin/reports', roles: ['superadmin', 'admin', 'teacher'] },
  ];

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      className="fixed left-0 top-0 h-screen w-64 bg-slate-800 border-r border-slate-700 p-6 z-50"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 mb-10">
        <div className="p-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600">
          <FaGraduationCap className="text-xl text-white" />
        </div>
        <span className="text-xl font-bold text-white">EduManage</span>
      </div>

      {/* User Info */}
      <div className="mb-8 p-4 rounded-xl bg-slate-700/50">
        <p className="text-white font-semibold">{user?.username}</p>
        <p className="text-xs text-indigo-400 capitalize">{user?.role}</p>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {menuItems
          .filter(item => item.roles.includes(user?.role))
          .map((item, idx) => {
            const isActive = pathname === item.href;
            return (
              <Link key={idx} href={item.href}>
                <motion.div
                  whileHover={{ x: 5 }}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                    ${isActive 
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white' 
                      : 'text-slate-400 hover:bg-slate-700'
                    }
                  `}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </motion.div>
              </Link>
            );
          })}
      </nav>

      {/* Logout */}
      <button
        onClick={logout}
        className="absolute bottom-6 left-6 right-6 flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition"
      >
        <FaSignOutAlt />
        <span>Logout</span>
      </button>
    </motion.aside>
  );
}
```

---

## 🛠 Feature Modules

### Students Module (`src/app/(dashboard)/admin/students/page.js`)

```javascript
'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import api from '@/services/api';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Table from '@/components/ui/Table';

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await api.get('/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { header: 'LRN', accessor: 'lrn' },
    { header: 'Name', render: (row) => `${row.lastName}, ${row.firstName}` },
    { header: 'Grade Level', accessor: 'gradeLevel' },
    { header: 'Section', accessor: 'section' },
    { header: 'School Year', accessor: 'schoolYear' },
    {
      header: 'Actions',
      render: (row) => (
        <div className="flex gap-2">
          <button className="p-2 text-indigo-400 hover:bg-indigo-500/20 rounded-lg">
            <FaEye />
          </button>
          <button className="p-2 text-emerald-400 hover:bg-emerald-500/20 rounded-lg">
            <FaEdit />
          </button>
          <button className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg">
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Students</h1>
          <p className="text-slate-400">Manage student records</p>
        </div>
        <Button onClick={() => setShowModal(true)}>
          <FaPlus className="mr-2" /> Add Student
        </Button>
      </div>

      <Card>
        {loading ? (
          <div className="text-center py-10">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-indigo-500 border-t-transparent mx-auto"></div>
          </div>
        ) : (
          <Table columns={columns} data={students} />
        )}
      </Card>
    </div>
  );
}
```

---

## 🔌 API Integration

### API Service (`src/services/api.js`)

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      config.headers['x-user-id'] = userData.id;
      // Future: Add JWT token here
      // config.headers['Authorization'] = `Bearer ${userData.token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// ============================================
// STUDENTS API - All endpoints available ✅
// ============================================
export const studentsAPI = {
  getAll: () => api.get('/students'),
  getById: (id) => api.get(`/students/${id}`),
  create: (data) => api.post('/students', data),
  update: (id, data) => api.put(`/students/${id}`, data),           // ✅ NEW
  delete: (id) => api.delete(`/students/${id}`),                     // ✅ NEW
  getReportCard: (id) => api.get(`/students/${id}/report-card`),
};

// ============================================
// GRADES API - All endpoints available ✅
// ============================================
export const gradesAPI = {
  getByStudent: (studentId) => api.get(`/grades/student/${studentId}`),
  create: (data) => api.post('/grades', data),
  update: (id, data) => api.put(`/grades/${id}`, data),
  delete: (id) => api.delete(`/grades/${id}`),                       // ✅ NEW
};

// ============================================
// ATTENDANCE API - All endpoints available ✅
// ============================================
export const attendanceAPI = {
  getByStudent: (studentId) => api.get(`/attendance/student/${studentId}`),
  create: (data) => api.post('/attendance', data),
  update: (id, data) => api.put(`/attendance/${id}`, data),
  delete: (id) => api.delete(`/attendance/${id}`),                   // ✅ NEW
};

// ============================================
// OBSERVED VALUES API - All endpoints available ✅
// ============================================
export const observedValuesAPI = {
  getByStudent: (studentId) => api.get(`/observed-values/student/${studentId}`),
  create: (data) => api.post('/observed-values', data),
  update: (id, data) => api.put(`/observed-values/${id}`, data),
  delete: (id) => api.delete(`/observed-values/${id}`),              // ✅ NEW
};

// ============================================
// SUBJECTS API - All endpoints available ✅
// ============================================
export const subjectsAPI = {
  getAll: () => api.get('/subjects'),
  getById: (id) => api.get(`/subjects/${id}`),
  create: (data) => api.post('/subjects', data),
  update: (id, data) => api.put(`/subjects/${id}`, data),
  delete: (id) => api.delete(`/subjects/${id}`),
};

// ============================================
// ACCOUNTS API - All endpoints available ✅
// ============================================
export const accountsAPI = {
  getAll: () => api.get('/accounts'),
  getById: (id) => api.get(`/accounts/${id}`),
  create: (data) => api.post('/accounts', data),
  update: (id, data) => api.put(`/accounts/${id}`, data),
  delete: (id) => api.delete(`/accounts/${id}`),
};

// ============================================
// ANALYTICS API - For Super Admin Dashboard ✅ NEW
// ============================================
export const analyticsAPI = {
  getDashboardStats: () => api.get('/analytics/dashboard-stats'),
  getStudentDistribution: () => api.get('/analytics/student-distribution'),
  getGradePerformance: () => api.get('/analytics/grade-performance'),
  getAttendanceTrend: (year) => api.get(`/analytics/attendance-trend?year=${year || new Date().getFullYear()}`),
  getGradeDistribution: () => api.get('/analytics/grade-distribution'),
};

// ============================================
// REPORTS API - For Reports Module ✅ NEW
// ============================================
export const reportsAPI = {
  getClassSummary: (params) => api.get('/reports/class-summary', { params }),
  // params: { gradeLevel, section }
  
  getGradeAnalytics: (params) => api.get('/reports/grade-analytics', { params }),
  // params: { quarter, gradeLevel }
  
  getAttendanceSummary: (params) => api.get('/reports/attendance-summary', { params }),
  // params: { startDate, endDate }
};

// ============================================
// AUTHENTICATION API ✅ NEW
// ============================================
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  // body: { username, password }
  // response: { success, message, token, user }
  
  logout: () => api.post('/auth/logout'),
  
  getMe: () => api.get('/auth/me'),
  // requires x-user-id header or ?userId query param
};
```

---

## 🚀 Running the Application

### Development

```bash
# Terminal 1: Backend
cd tech_server
node src/server.js
# or: npm start

# Terminal 2: Frontend
cd tech_client
npm run dev
```

### URLs
- **Backend API**: http://localhost:3001
- **Frontend**: http://localhost:3000

---

## ✅ Backend API Reference (All Implemented)

All backend API endpoints are now fully implemented and ready for frontend integration.

### Core CRUD Endpoints

| Module | GET All | GET One | POST | PUT | DELETE |
|--------|---------|---------|------|-----|--------|
| **Students** | ✅ `/students` | ✅ `/students/:id` | ✅ `/students` | ✅ `/students/:id` | ✅ `/students/:id` |
| **Grades** | ✅ `/grades/student/:studentId` | - | ✅ `/grades` | ✅ `/grades/:id` | ✅ `/grades/:id` |
| **Attendance** | ✅ `/attendance/student/:studentId` | - | ✅ `/attendance` | ✅ `/attendance/:id` | ✅ `/attendance/:id` |
| **Observed Values** | ✅ `/observed-values/student/:studentId` | - | ✅ `/observed-values` | ✅ `/observed-values/:id` | ✅ `/observed-values/:id` |
| **Subjects** | ✅ `/subjects` | ✅ `/subjects/:id` | ✅ `/subjects` | ✅ `/subjects/:id` | ✅ `/subjects/:id` |
| **Accounts** | ✅ `/accounts` | ✅ `/accounts/:id` | ✅ `/accounts` | ✅ `/accounts/:id` | ✅ `/accounts/:id` |

### Analytics Endpoints (For Super Admin Dashboard)

| Endpoint | Purpose | Response |
|----------|---------|----------|
| `GET /analytics/dashboard-stats` | Aggregated statistics | `{ totalStudents, totalAccounts, totalSubjects, attendanceRate, averageGrades }` |
| `GET /analytics/student-distribution` | Students by grade level | `[{ gradeLevel, count }]` |
| `GET /analytics/grade-performance` | Average grades per subject | `[{ subject, average }]` |
| `GET /analytics/attendance-trend?year=2024` | Monthly attendance data | `[{ month, present, absent, tardy }]` |
| `GET /analytics/grade-distribution` | Grade bracket distribution | `[{ grade, count }]` |

### Reports Endpoints

| Endpoint | Query Params | Response |
|----------|--------------|----------|
| `GET /reports/class-summary` | `gradeLevel`, `section` | Class-wide performance with top performers & struggling students |
| `GET /reports/grade-analytics` | `quarter`, `gradeLevel` | Statistical analysis with subject averages & pass rates |
| `GET /reports/attendance-summary` | `startDate`, `endDate` | Monthly breakdown with perfect attendance students |

### Authentication Endpoints

| Endpoint | Method | Body/Response |
|----------|--------|---------------|
| `/auth/login` | POST | Body: `{ username, password }` → `{ token, user }` |
| `/auth/logout` | POST | `{ success, message }` |
| `/auth/me` | GET | Returns current user (requires `x-user-id` header) |

### Special Endpoints

| Endpoint | Purpose |
|----------|---------|
| `GET /students/:id/report-card` | Get complete report card with grades, attendance, observed values |

---

## 📝 Summary

| Feature | Frontend Status | Backend Status |
|---------|-----------------|----------------|
| Project Setup | ✅ Ready | ✅ Ready |
| Design System | ✅ Ready | N/A |
| Core UI Components | ✅ Ready | N/A |
| Authentication | ✅ Ready | ✅ Implemented |
| Role-Based Access | ✅ Ready | ✅ Implemented |
| Landing Page (5 Sections) | ✅ Ready | N/A |
| Dashboard Layout | ✅ Ready | N/A |
| Student Management | ✅ Ready | ✅ Full CRUD |
| Grades Management | 🔨 Needs Frontend | ✅ Full CRUD |
| Attendance Management | 🔨 Needs Frontend | ✅ Full CRUD |
| Observed Values | 🔨 Needs Frontend | ✅ Full CRUD |
| Analytics Dashboard | 🔨 Needs Frontend | ✅ 5 Endpoints |
| Reports Module | 🔨 Needs Frontend | ✅ 3 Endpoints |

**Frontend Implementation Checklist:**

1. ☐ Connect Delete buttons to `studentsAPI.delete()` 
2. ☐ Add Edit student modal using `studentsAPI.update()`
3. ☐ Implement Grade Management page with CRUD
4. ☐ Implement Attendance tracking page with CRUD
5. ☐ Implement Observed Values page with CRUD
6. ☐ Build Super Admin Analytics dashboard with ApexCharts
7. ☐ Implement Reports page with class summary, grade analytics, attendance summary
8. ☐ Update AuthContext to use `authAPI.login()` instead of fetching all accounts

---

*Last Updated: February 2026*

