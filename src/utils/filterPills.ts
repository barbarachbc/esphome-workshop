/**
 * Shared utility for creating and managing filter pills across listing pages
 */

export interface FilterPillConfig {
  name: string;
  selector: string;
  color: string;
}

export interface PillsConfig {
  pillsContainerId: string;
  filters: FilterPillConfig[];
  onRemove: () => void;
}

/**
 * Creates a single pill element
 */
function createPillElement(value: string, filterName: string, bgColor: string): HTMLSpanElement {
  const pill = document.createElement('span');
  pill.className = 'inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all';
  pill.style.cssText = `background: ${bgColor}; color: var(--text-primary);`;
  
  pill.innerHTML = `
    <span>${value}</span>
    <button 
      class="pill-remove hover:opacity-70 transition-opacity" 
      data-filter-name="${filterName}" 
      data-value="${value}"
      style="background: none; border: none; padding: 0; cursor: pointer; display: flex; align-items: center;"
      aria-label="Remove ${value} filter"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>
  `;
  
  return pill;
}

/**
 * Updates active filter pills display
 */
export function updateFilterPills(config: PillsConfig): void {
  const container = document.getElementById(config.pillsContainerId) as HTMLDivElement;
  if (!container) return;
  
  // Clear existing pills
  container.innerHTML = '';
  
  let totalChecked = 0;
  
  // Process each filter type
  config.filters.forEach(filter => {
    const checkedBoxes = document.querySelectorAll(filter.selector) as NodeListOf<HTMLInputElement>;
    
    checkedBoxes.forEach(checkbox => {
      const pill = createPillElement(checkbox.value, filter.name, filter.color);
      container.appendChild(pill);
      totalChecked++;
    });
  });
  
  // Show/hide container based on whether there are pills
  container.style.display = totalChecked > 0 ? 'flex' : 'none';
  
  // Attach remove handlers
  attachRemoveHandlers(config.filters, config.onRemove);
}

/**
 * Attaches click handlers to pill remove buttons
 */
function attachRemoveHandlers(filters: FilterPillConfig[], onRemove: () => void): void {
  document.querySelectorAll('.pill-remove').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const button = e.currentTarget as HTMLButtonElement;
      const filterName = button.getAttribute('data-filter-name');
      const value = button.getAttribute('data-value');
      
      // Find the corresponding filter config
      const filterConfig = filters.find(f => f.name === filterName);
      if (!filterConfig) return;
      
      // Find and uncheck the corresponding checkbox
      const checkbox = document.querySelector(
        `${filterConfig.selector}[value="${value}"]`
      ) as HTMLInputElement;
      
      if (checkbox) {
        checkbox.checked = false;
        onRemove();
      }
    });
  });
}

/**
 * Initializes the collapsible filter panel arrow rotation
 */
export function initFilterDetailsArrow(detailsSelector: string = 'details'): void {
  const filterDetails = document.querySelector(detailsSelector) as HTMLDetailsElement;
  
  filterDetails?.addEventListener('toggle', () => {
    const arrow = filterDetails.querySelector('svg');
    if (arrow) {
      arrow.style.transform = filterDetails.open ? 'rotate(0deg)' : 'rotate(-90deg)';
    }
  });
}
