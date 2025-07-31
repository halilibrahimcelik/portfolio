
# My Portfolio Website 🚀

Welcome to my personal portfolio website! This project showcases my skills, experience, and projects as a Full Stack Developer. Built with modern web technologies, it features a responsive design, dark/light theme toggle, smooth animations, and an interactive user experience.

**🌐 Live Website:** [https://www.halilibrahim.dev/](https://www.halilibrahim.dev/)

---

## **✨ Features**

### **🎨 Design & UI**

- **Dark/Light Theme Toggle** - Seamless theme switching with user preference persistence
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Modern UI Components** - Built with shadcn/ui for consistent design
- **Smooth Animations** - Framer Motion integration for engaging user interactions
- **Interactive Elements** - Ballpit animation, click sparks, and hover effects

### **🧭 Navigation**

- **Fixed Header** - Bottom navigation for easy access
- **Sticky Social Links** - Left-side social media links on all pages except homepage
- **Smooth Page Transitions** - Enhanced user experience with animated route changes

### **📱 Pages**

- **Homepage** - Bio, experience, and tech stack showcase
- **Projects Page** - Portfolio projects with detailed descriptions and live demos
- **Contact Page** - Interactive contact form with social media links
- **Individual Project Pages** - Detailed project information with screenshots and tech details

### **⚡ Performance**

- **Optimized Images** - Next.js Image optimization for faster loading
- **Modern Font Loading** - Geist font family with automatic optimization
- **Server-Side Rendering** - Next.js App Router for improved performance

---

## **🛠️ Tech Stack**

### **Frontend**

- **Framework:** [Next.js 15](https://nextjs.org/) with App Router
- **Language:** TypeScript
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Library:** [shadcn/ui](https://ui.shadcn.com/)
- **Form Management:** [React Hook Form](https://react-hook-form.com/)
- **State Management:** React Context API
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** Custom React components

### **Backend & Data**

- **CMS:** [Contentful](https://www.contentful.com/) for content management
- **API:** GraphQL with Apollo Client
- **Email Service:** Integration for contact form submissions
- **Analytics:** PostHog for user analytics

### **Development Tools**

- **Package Manager:** pnpm
- **Linting:** ESLint with custom configuration
- **Code Formatting:** Prettier
- **Type Checking:** TypeScript

---

## **🚀 Getting Started**

### **Prerequisites**

- Node.js 18+
- pnpm (recommended) or npm/yarn

### **Installation**

1. **Clone the repository**

   ```bash
   git clone https://github.com/halilibrahimcelik/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Fill in your environment variables (Contentful API keys, email service, etc.)

4. **Run the development server**

   ```bash
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### **Available Scripts**

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm type-check   # Run TypeScript type checking
```

---

## **📁 Project Structure**

```
src/
├── app/                    # Next.js App Router
│   ├── (main)/            # Main layout group
│   │   ├── page.tsx       # Homepage
│   │   ├── projects/      # Projects pages
│   │   └── contact-me/    # Contact page
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # Reusable React components
│   ├── ui/               # shadcn/ui components
│   ├── AnimateComponent/ # Animation wrappers
│   ├── Contact/          # Contact form components
│   ├── Projects/         # Project-related components
│   └── theme/            # Theme configuration
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and configs
├── providers/            # Context providers
└── types/                # TypeScript type definitions
```

---

## **🎨 Customization**

### **Theme Configuration**

The theme system is built with CSS variables and can be customized in:

- `src/components/theme/colors.ts` - Color definitions
- `src/app/globals.css` - CSS custom properties
- `tailwind.config.ts` - Tailwind theme extension

### **Content Management**

Content is managed through Contentful CMS. Update your content models and fetch queries in:

- `src/lib/queries.ts` - GraphQL queries
- `src/lib/apolloClient.ts` - Apollo Client configuration

---

## **📊 Performance Features**

- **Image Optimization** - Next.js automatic image optimization
- **Font Optimization** - Geist font with automatic loading optimization
- **Code Splitting** - Automatic code splitting with Next.js
- **Server-Side Rendering** - Improved SEO and initial page load
- **Static Generation** - Pre-rendered pages where possible

---

## **🌟 Key Components**

- **`ThemeToggle`** - Dark/light mode switcher with persistence
- **`StickyHeader`** - Fixed navigation with smooth transitions
- **`ProjectItem`** - Interactive project cards with hover effects
- **`Contact`** - Form with validation and email integration
- **`Ballpit`** - Interactive animation component for engaging UX

---

## **🚀 Deployment**

This project is deployed on Vercel. For your own deployment:

1. **Connect to Vercel**

   ```bash
   vercel --prod
   ```

2. **Environment Variables**
   Add your environment variables in the Vercel dashboard

3. **Custom Domain** (Optional)
   Configure your custom domain in Vercel settings

---

## **📝 Future Enhancements**

- [ ] Blog section with MDX support
- [ ] Enhanced accessibility features
- [ ] Progressive Web App (PWA) capabilities
- [ ] Advanced animations and micro-interactions
- [ ] Performance monitoring and analytics
- [ ] Multi-language support

---

## **🤝 Contributing**

While this is a personal portfolio, suggestions and feedback are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## **📄 License**

This project is open source and available under the [MIT License](LICENSE).

---

## **📞 Contact**

- **Website:** [https://www.halilibrahim.dev/](https://www.halilibrahim.dev/)
- **GitHub:** [@halilibrahimcelik](https://github.com/halilibrahimcelik)
- **LinkedIn:** [Halil Ibrahim Celik](https://linkedin.com/in/halilibrahimcelik)

---
