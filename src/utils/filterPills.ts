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

export interface FilterAttribute {
  name: string; // e.g., 'category', 'tags', 'age'
  isArray?: boolean; // true for comma-separated values like tags
}

export interface FilterControlConfig {
  gridSelector: string;
  resultCountId: string;
  clearButtonId: string;
  searchInputId: string;
  pillsContainerId: string;
  filters: Array<{
    name: string;
    selector: string;
    attribute: FilterAttribute;
    color: string;
  }>;
}

/**
 * Creates a single pill element
 */
function createPillElement(value: string, filterName: string, bgColor: string): HTMLSpanElement {
  const pill = document.createElement('span');
  
  // Map color to class names
  let colorClass = 'filter-pill-blue'; // default
  if (bgColor.includes('emerald') || bgColor.includes('d1fae5') || bgColor.includes('81c784')) {
    colorClass = 'filter-pill-emerald';
  } else if (bgColor.includes('amber') || bgColor.includes('fef3c7') || bgColor.includes('ffe082')) {
    colorClass = 'filter-pill-amber';
  }
  
  pill.className = `filter-pill ${colorClass}`;
  
  pill.innerHTML = `
    <span>${value}</span>
    <button 
      class="pill-remove" 
      data-filter-name="${filterName}" 
      data-value="${value}"
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

/**
 * Comprehensive filter initialization for listing pages
 * Sets up all filtering logic, event listeners, and pill management
 */
export function initializeFilters(config: FilterControlConfig): void {
  const clearButton = document.getElementById(config.clearButtonId) as HTMLButtonElement;
  const filterSearchInput = document.getElementById(config.searchInputId) as HTMLInputElement;
  const grid = document.getElementById(config.gridSelector);
  const resultCount = document.getElementById(config.resultCountId);

  // Initialize arrow rotation
  initFilterDetailsArrow();

  function updateActivePills() {
    updateFilterPills({
      pillsContainerId: config.pillsContainerId,
      filters: config.filters.map(f => ({
        name: f.name,
        selector: f.selector,
        color: f.color
      })),
      onRemove: applyFilters
    });
  }

  function applyFilters() {
    // Build filter selections for each filter type
    const selections: Record<string, string[]> = {};
    
    config.filters.forEach(filter => {
      selections[filter.name] = Array.from(document.querySelectorAll(filter.selector))
        .map(cb => (cb as HTMLInputElement).value.toLowerCase());
    });
    
    const cards = grid?.querySelectorAll('[data-category], [data-tags], [data-age]');
    let visibleCount = 0;
    
    cards?.forEach(card => {
      let matches = true;
      
      // Check each filter type
      config.filters.forEach(filter => {
        const selectedValues = selections[filter.name];
        if (selectedValues.length === 0) return; // No filter = match all
        
        const attrName = `data-${filter.attribute.name}`;
        const cardValue = card.getAttribute(attrName)?.toLowerCase() || '';
        
        if (filter.attribute.isArray) {
          // For array attributes (like tags), split and check if any match
          const cardValues = cardValue.split(',').filter(v => v);
          const hasMatch = selectedValues.some(selected => cardValues.includes(selected));
          if (!hasMatch) matches = false;
        } else {
          // For single value attributes, check exact match
          if (!selectedValues.includes(cardValue)) matches = false;
        }
      });
      
      if (matches) {
        (card as HTMLElement).style.display = 'block';
        visibleCount++;
      } else {
        (card as HTMLElement).style.display = 'none';
      }
    });

    if (resultCount) {
      resultCount.textContent = visibleCount.toString();
    }
    
    updateActivePills();
  }

  function filterList() {
    const searchTerm = filterSearchInput.value.toLowerCase();
    const filterLabels = document.querySelectorAll('.filter-checkbox-label');
    
    filterLabels.forEach(label => {
      const filterText = label.getAttribute('data-filter-text') || '';
      if (filterText.includes(searchTerm)) {
        (label as HTMLElement).style.display = 'flex';
      } else {
        (label as HTMLElement).style.display = 'none';
      }
    });
  }

  function clearFilters() {
    // Uncheck all checkboxes
    document.querySelectorAll('.filter-checkbox').forEach(cb => {
      (cb as HTMLInputElement).checked = false;
    });
    // Clear search
    if (filterSearchInput) {
      filterSearchInput.value = '';
      filterList();
    }
    applyFilters();
  }

  // Event listeners for all checkboxes
  document.querySelectorAll('.filter-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', applyFilters);
  });

  // Event listener for filter search
  filterSearchInput?.addEventListener('input', filterList);

  clearButton?.addEventListener('click', clearFilters);

  // Initial count
  applyFilters();
}
