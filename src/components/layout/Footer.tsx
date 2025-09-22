function Footer() {
  return (
    <footer className="relative mt-auto border-t border-border/50 bg-gradient-to-r from-gray-50/80 via-white/60 to-gray-50/80 px-6 py-6 backdrop-blur-sm dark:from-gray-900/80 dark:via-gray-800/60 dark:to-gray-900/80">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,0.02)_50%,transparent_75%)] dark:bg-[linear-gradient(45deg,transparent_25%,rgba(59,130,246,0.03)_50%,transparent_75%)]" />

      <div className="relative mx-auto max-w-7xl text-center">
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
          {/* Copyright */}
          <p className="text-sm text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Tanstarter. All rights reserved.
          </p>

          {/* Powered by */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-500">Powered by</span>
            <a
              className="group flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-blue-600 transition-all duration-200 hover:bg-blue-50 hover:text-blue-700 dark:text-blue-400 dark:hover:bg-blue-950/50 dark:hover:text-blue-300"
              href="https://github.com/lixw1994/react-tanstarter"
              target="_blank"
              rel="noreferrer noopener"
            >
              <div className="h-5 w-5 rounded bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center text-xs">
                J
              </div>
              React Tanstarter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
