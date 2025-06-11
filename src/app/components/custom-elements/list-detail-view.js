export default function ListDetailView({ html, state }) {
  const { attrs = {} } = state;
  const { hasDetail = false, listContent = "", detailContent = "" } = attrs;

  return html`
    <style>
      :host {
        display: block;
      }

      .bg-dots {
        background-image: radial-gradient(circle, #e5e7eb 1px, transparent 1px);
        background-size: 20px 20px;
      }

      @media (max-width: 1023px) {
        .list-panel.has-detail {
          display: none;
        }
      }
    </style>

    <div class="flex w-full">
      <!-- List Panel -->
      ${listContent
        ? html`
            <div
              id="list"
              class="bg-dots ${hasDetail
                ? "list-panel has-detail hidden lg:flex"
                : "min-h-screen w-full"}"
            >
              ${listContent}
            </div>
          `
        : ""}

      <!-- Detail Panel -->
      ${detailContent ? html` <div class="flex-1">${detailContent}</div> ` : ""}
    </div>
  `;
}
