import {
  Github,
  Code,
  Package,
  Zap,
  Shield,
  Sparkles,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <section className="py-20 md:py-48">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-block rounded-full bg-gray-800/50 px-3 py-1 text-sm font-medium text-[#1D325C] mb-6">
            v1.0.0 Released
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#1D325C] to-purple-400 bg-clip-text text-transparent">
            React+Node TypeScript Starter Template
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-10">
            A modern, opinionated starter template for building scalable React
            applications with Node.js backend, TypeScript, and best practices
            included out of the box.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-20">
            <Link to="#get-started">
              <Button
                size="lg"
                className="w-full sm:w-auto gap-2 bg-[#1D325C] hover:bg-[#1D325C]/90 text-white"
              >
                <Download className="h-5 w-5" />
                Get Started
              </Button>
            </Link>
            <Link
              to="https://github.com/ankitarima/stater-template-nodejs-react"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto gap-2 text-accent-foreground"
              >
                <Github className="h-5 w-5" />
                View on GitHub
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto rounded-lg overflow-hidden border border-gray-800">
            <div className="bg-gray-900 px-4 py-2 flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <span className="text-gray-400 text-sm ml-2">App.tsx</span>
            </div>
            <pre className="bg-gray-950 p-4 overflow-x-auto text-sm">
              <code className="text-gray-300">
                {`import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "@/components/ui/toaster.tsx";
import { Router } from "@/Router";

// @tanstack/react-query
export const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} position="bottom" />
    </QueryClientProvider>
  );
}
`}
              </code>
            </pre>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Packed with Essential Features
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need to build modern React applications, without
              the configuration headaches
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-[#1D325C]" />
              </div>
              <h3 className="text-xl font-bold mb-2">TypeScript First</h3>
              <p className="text-gray-400">
                Built with TypeScript from the ground up for type safety and
                better developer experience.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Package className="h-6 w-6 text-[#1D325C]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Modern Stack</h3>
              <p className="text-gray-400">
                Includes React Router, Tailwind CSS, ESLint, and other essential
                tools pre-configured.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-[#1D325C]" />
              </div>
              <h3 className="text-xl font-bold mb-2">SEO Optimized</h3>
              <p className="text-gray-400">
                Built-in SEO components and server-side rendering support for
                better search engine visibility.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-[#1D325C]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Dark Mode Ready</h3>
              <p className="text-gray-400">
                Includes a theme context with dark/light mode toggle
                functionality out of the box.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Code className="h-6 w-6 text-[#1D325C]" />
              </div>
              <h3 className="text-xl font-bold mb-2">Best Practices</h3>
              <p className="text-gray-400">
                Follows React best practices with a well-organized folder
                structure and component patterns.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-gray-900/50 p-6 rounded-lg border border-gray-800">
              <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Github className="h-6 w-6 text-[#1D325C]" />
              </div>
              <h3 className="text-xl font-bold mb-2">CI/CD Ready</h3>
              <p className="text-gray-400">
                Includes GitHub Actions workflows for continuous integration and
                deployment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Use Section */}
      <section id="why-use" className="py-20 md:py-28 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Use This Starter Template?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Save time and avoid common pitfalls when starting a new React
              project
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="text-[#1D325C]">01.</span> Productivity Boost
              </h3>
              <p className="text-gray-400 mb-4">
                Skip the tedious setup process and jump straight into building
                your application. Our template handles all the boilerplate code
                so you can focus on what matters.
              </p>
              <ul className="space-y-2">
                {[
                  "Pre-configured build tools",
                  "Component library structure",
                  "Routing setup",
                  "State management patterns",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="mt-1 h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <div className="h-2 w-2 rounded-full bg-[#1D325C]"></div>
                    </div>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <span className="text-[#1D325C]">02.</span> Best Practices
                Built-in
              </h3>
              <p className="text-gray-400 mb-4">
                Avoid common mistakes and follow industry best practices from
                day one. Our template is built with performance, accessibility,
                and maintainability in mind.
              </p>
              <ul className="space-y-2">
                {[
                  "Strict TypeScript configuration",
                  "Accessibility guidelines",
                  "SEO optimization",
                  "Performance optimizations",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="mt-1 h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <div className="h-2 w-2 rounded-full bg-[#1D325C]"></div>
                    </div>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Open Source Section */}
      <section id="opensource" className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block rounded-full bg-gray-800/50 px-3 py-1 text-sm font-medium text-[#1D325C] mb-6">
              100% Open Source
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Free and Open Source
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              This template is completely free to use for both personal and
              commercial projects under the MIT license
            </p>
          </div>

          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-8 max-w-3xl mx-auto">
            <div className="flex items-start gap-6">
              <Github className="h-12 w-12 text-[#1D325C] flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold mb-2">Community Driven</h3>
                <p className="text-gray-400 mb-4">
                  Join our growing community of developers. Contribute to the
                  project, report issues, or suggest new features to make this
                  template even better.
                </p>
                <div className="flex flex-wrap gap-3 mb-6">
                  <div className="bg-gray-800/50 px-3 py-1 rounded-full text-sm">
                    MIT License
                  </div>
                  <div className="bg-gray-800/50 px-3 py-1 rounded-full text-sm">
                    Regular Updates
                  </div>
                  <div className="bg-gray-800/50 px-3 py-1 rounded-full text-sm">
                    Community Support
                  </div>
                </div>
                <Link
                  to="https://github.com/ankitarima/stater-template-nodejs-react"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    className="gap-2 text-accent-foreground"
                  >
                    <Github className="h-4 w-4" />
                    Star on GitHub
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Get Started Section */}
      <section id="get-started" className="py-20 md:py-28 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get Started in Seconds
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Clone the repository and start building your next React
              application right away
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-gray-950 border border-gray-800 rounded-lg overflow-hidden mb-8">
              <div className="bg-gray-900 px-4 py-2 flex items-center">
                <span className="text-gray-400 text-sm">
                  Clone the repository
                </span>
              </div>
              <div className="p-4 overflow-x-auto">
                <pre className="text-gray-300 text-sm">
                  <code>
                    git clone
                    https://github.com/ankitarima/stater-template-nodejs-react.git
                  </code>
                </pre>
              </div>
            </div>

            <div className="bg-gray-950 border border-gray-800 rounded-lg overflow-hidden mb-8">
              <div className="bg-gray-900 px-4 py-2 flex items-center">
                <span className="text-gray-400 text-sm">
                  Install dependencies
                </span>
              </div>
              <div className="p-4 overflow-x-auto">
                <pre className="text-gray-300 text-sm">
                  <code>cd my-app && npm install</code>
                </pre>
              </div>
            </div>

            <div className="bg-gray-950 border border-gray-800 rounded-lg overflow-hidden mb-8">
              <div className="bg-gray-900 px-4 py-2 flex items-center">
                <span className="text-gray-400 text-sm">
                  Start the development server
                </span>
              </div>
              <div className="p-4 overflow-x-auto">
                <pre className="text-gray-300 text-sm">
                  <code>npm run dev</code>
                </pre>
              </div>
            </div>

            <div className="text-center">
              <p className="text-gray-400 mb-6">
                Or download the template directly and extract it to your project
                folder
              </p>
              <Link
                to="https://github.com/ankitarima/stater-template-nodejs-react"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="gap-2">
                  <Download className="h-5 w-5" />
                  Download ZIP
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-primary/20 to-purple-900/20 border border-primary/20 rounded-lg p-8 md:p-12 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Start your next project with our React TypeScript starter template
              and focus on what matters - building great features.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="https://github.com/ankitarima/stater-template-nodejs-react"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="w-full sm:w-auto gap-2">
                  <Github className="h-5 w-5" />
                  View on GitHub
                </Button>
              </Link>
              <Link to="#get-started">
                <Button
                  size="lg"
                  className="w-full sm:w-auto gap-2 text-accent-foreground bg-[#1D325C] hover:bg-[#1D325C]/90 text-white "
                >
                  <Download className="h-5 w-5" />
                  Download Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
