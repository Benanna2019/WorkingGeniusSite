export default function SiteLayout({ html, state }) {
  const { attrs = {} } = state;
  const { children = "" } = attrs;

  return html`
    <style>
      :host {
        display: block;
      }
    </style>

    <div class="relative flex h-full min-h-screen w-full">
      <!-- Sidebar will be injected here -->
      <sidebar-nav></sidebar-nav>

      <!-- Main content area -->
      <div class="flex flex-1">${children}</div>
    </div>
  `;
}
