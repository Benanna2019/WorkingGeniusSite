export default function SidebarNav({ html, state }) {
  const { attrs = {} } = state;
  const { isOpen = false } = attrs;

  // Navigation items - this could come from state/props
  const navigationItems = [
    {
      href: "/",
      label: "Home",
      icon: "home",
      isActive: true,
    },
    {
      href: "/writing",
      label: "Writing",
      icon: "writing",
      isActive: false,
    },
  ];

  return html`
    <style>
      :host {
        display: block;
      }

      .sidebar-transition {
        transition: transform 0.2s ease-in-out;
      }

      @media (min-width: 1024px) {
        .sidebar-nav {
          transform: translateX(0) !important;
          position: relative !important;
          z-index: auto !important;
        }
      }
    </style>

    <!-- Sidebar Navigation -->
    <nav
      class="sidebar-nav sidebar-transition z-30 flex h-full max-h-screen min-h-screen w-3/4 flex-none transform flex-col overflow-y-auto border-r border-gray-150 bg-white pb-10 dark:border-gray-800 dark:bg-gray-900 sm:w-1/2 sm:pb-0 md:w-1/3 lg:relative lg:z-auto lg:w-56 lg:translate-x-0 lg:bg-gray-50 lg:dark:bg-gray-900 2xl:w-72 3xl:w-80 ${isOpen
        ? "absolute inset-y-0 left-0 translate-x-0 shadow-lg"
        : "absolute -translate-x-full"}"
      data-sidebar-nav
    >
      <!-- Title Bar -->
      <div
        class="flex items-center justify-between px-4 py-4 border-b border-gray-150 dark:border-gray-800"
      >
        <h1 class="text-lg font-semibold text-gray-900 dark:text-white">
          Brian Lovin
        </h1>
        <!-- Mobile close button -->
        <button
          class="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800"
          data-sidebar-close
          aria-label="Close sidebar"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>

      <!-- Navigation Items -->
      <div class="flex-1 px-3 py-3 space-y-1">
        <ul class="space-y-1">
          ${navigationItems
            .map(
              (item) => html`
                <li class="flex items-stretch space-x-1">
                  <a
                    href="${item.href}"
                    class="flex flex-1 items-center space-x-3 rounded-md px-2 py-1.5 text-sm font-medium ${item.isActive
                      ? "bg-black text-white hover:bg-black hover:text-white dark:bg-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white"
                      : "text-gray-700 dark:text-gray-200 sm:hover:bg-gray-200 sm:hover:text-gray-900 sm:dark:hover:bg-gray-700 sm:dark:hover:text-gray-200"}"
                    data-sidebar-link
                  >
                    <span class="flex items-center justify-center w-4">
                      ${getIcon(item.icon)}
                    </span>
                    <span class="flex-1">${item.label}</span>
                  </a>
                </li>
              `
            )
            .join("")}
        </ul>
      </div>
    </nav>

    <!-- Mobile Overlay -->
    <div
      class="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden ${isOpen
        ? "block"
        : "hidden"}"
      data-sidebar-overlay
    ></div>

    <!-- Mobile Toggle Button (when sidebar is closed) -->
    <button
      class="fixed top-4 left-4 z-40 p-2 rounded-md bg-white shadow-md border border-gray-200 text-gray-700 hover:text-gray-900 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700 lg:hidden ${isOpen
        ? "hidden"
        : "block"}"
      data-sidebar-toggle
      aria-label="Open sidebar"
    >
      <svg
        class="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        ></path>
      </svg>
    </button>

    <script type="module">
      // Progressive enhancement for sidebar functionality
      class SidebarNav extends HTMLElement {
        constructor() {
          super();
          this.isOpen = false;
          this.init();
        }

        init() {
          // Get elements
          this.sidebar = this.querySelector("[data-sidebar-nav]");
          this.overlay = this.querySelector("[data-sidebar-overlay]");
          this.toggleBtn = this.querySelector("[data-sidebar-toggle]");
          this.closeBtn = this.querySelector("[data-sidebar-close]");
          this.links = this.querySelectorAll("[data-sidebar-link]");

          // Bind events
          this.toggleBtn?.addEventListener("click", () => this.toggle());
          this.closeBtn?.addEventListener("click", () => this.close());
          this.overlay?.addEventListener("click", () => this.close());

          // Close sidebar when clicking links on mobile
          this.links.forEach((link) => {
            link.addEventListener("click", () => {
              if (window.innerWidth < 1024) {
                this.close();
              }
            });
          });

          // Handle escape key
          document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && this.isOpen) {
              this.close();
            }
          });
        }

        toggle() {
          this.isOpen ? this.close() : this.open();
        }

        open() {
          this.isOpen = true;
          this.updateUI();
        }

        close() {
          this.isOpen = false;
          this.updateUI();
        }

        updateUI() {
          // Update sidebar classes
          if (this.isOpen) {
            this.sidebar?.classList.remove("-translate-x-full");
            this.sidebar?.classList.add("translate-x-0", "shadow-lg");
            this.overlay?.classList.remove("hidden");
            this.overlay?.classList.add("block");
            this.toggleBtn?.classList.remove("block");
            this.toggleBtn?.classList.add("hidden");
          } else {
            this.sidebar?.classList.add("-translate-x-full");
            this.sidebar?.classList.remove("translate-x-0", "shadow-lg");
            this.overlay?.classList.add("hidden");
            this.overlay?.classList.remove("block");
            this.toggleBtn?.classList.add("block");
            this.toggleBtn?.classList.remove("hidden");
          }
        }
      }

      // Register the custom element
      if (!customElements.get("sidebar-nav")) {
        customElements.define("sidebar-nav", SidebarNav);
      }
    </script>
  `;
}

function getIcon(iconName) {
  const icons = {
    home: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
    </svg>`,
    writing: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
    </svg>`,
  };
  return icons[iconName] || icons.home;
}
