export class SearchSuggestions {
  private searchInput: HTMLInputElement;
  private suggestionsContainer: HTMLDivElement;
  private debounceTimeout: NodeJS.Timeout | null = null;

  constructor() {
    this.searchInput = document.querySelector(
      "#search-input"
    ) as HTMLInputElement;
    this.suggestionsContainer = document.querySelector(
      "#suggestions"
    ) as HTMLDivElement;
    this.init();
  }

  private init(): void {
    this.searchInput.addEventListener("input", () => this.handleInput());
  }

  private handleInput(): void {
    // Clear previous timeout
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }

    // Debounce the search
    this.debounceTimeout = setTimeout(async () => {
      const query = this.searchInput.value.trim();

      if (query.length === 0) {
        this.suggestionsContainer.innerHTML = "";
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:3000/api/search?q=${encodeURIComponent(query)}`
        );
        const data = await response.json();
        this.displaySuggestions(data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    }, 300); // 300ms debounce
  }

  private displaySuggestions(suggestions: any[]): void {
    this.suggestionsContainer.innerHTML = "";

    if (suggestions.length === 0) {
      this.suggestionsContainer.innerHTML =
        '<div class="no-results">No results found</div>';
      return;
    }

    const ul = document.createElement("ul");
    ul.className = "suggestions-list";

    suggestions.forEach((suggestion) => {
      const li = document.createElement("li");
      li.className = "suggestion-item";
      li.textContent = suggestion.name;
      li.addEventListener("click", () => {
        this.searchInput.value = suggestion.name;
        this.suggestionsContainer.innerHTML = "";
      });
      ul.appendChild(li);
    });

    this.suggestionsContainer.appendChild(ul);
  }
}

// Wait for DOM to be fully loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    new SearchSuggestions();
  });
} else {
  new SearchSuggestions();
}
