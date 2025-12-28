import { APIResponse, Restaurant, SearchFilters, SearchPreferences } from '@/types/restaurant';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api/v1';

class ApiClient {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<APIResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error?.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  // Restaurant endpoints
  async getAllRestaurants(page = 1, limit = 20, sort = 'rating'): Promise<APIResponse<Restaurant[]>> {
    return this.request(`/restaurants?page=${page}&limit=${limit}&sort=${sort}`);
  }

  async getRestaurantById(id: string): Promise<APIResponse<Restaurant>> {
    return this.request(`/restaurants/${id}`);
  }

  async getRestaurantsByArea(area: string): Promise<APIResponse<Restaurant[]>> {
    return this.request(`/restaurants/area/${area}`);
  }

  async getRestaurantsByCuisine(cuisine: string): Promise<APIResponse<Restaurant[]>> {
    return this.request(`/restaurants/cuisine/${cuisine}`);
  }

  // Recommendation endpoints
  async getRecommendations(preferences: SearchPreferences): Promise<APIResponse<Restaurant[]>> {
    return this.request('/recommendations', {
      method: 'POST',
      body: JSON.stringify(preferences),
    });
  }

  async getPopularRecommendations(): Promise<APIResponse<Restaurant[]>> {
    return this.request('/recommendations/popular');
  }

  async getBudgetRecommendations(budget: number): Promise<APIResponse<Restaurant[]>> {
    return this.request(`/recommendations/budget/${budget}`);
  }

  async submitFeedback(feedback: {
    restaurantId: string;
    rating: number;
    helpful?: boolean;
    comment?: string;
  }): Promise<APIResponse<any>> {
    return this.request('/recommendations/feedback', {
      method: 'POST',
      body: JSON.stringify(feedback),
    });
  }

  // Search endpoints
  async searchRestaurants(filters: SearchFilters): Promise<APIResponse<Restaurant[]>> {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value.toString());
      }
    });

    return this.request(`/search?${params.toString()}`);
  }

  async getSearchSuggestions(query: string): Promise<APIResponse<string[]>> {
    return this.request(`/search/suggestions?q=${encodeURIComponent(query)}`);
  }

  async getFilterOptions(): Promise<APIResponse<any>> {
    return this.request('/search/filters');
  }

  // Area endpoints
  async getAllAreas(): Promise<APIResponse<any>> {
    return this.request('/areas');
  }

  async getAreaInfo(area: string): Promise<APIResponse<any>> {
    return this.request(`/areas/${area}`);
  }

  async getAreaRestaurants(area: string): Promise<APIResponse<Restaurant[]>> {
    return this.request(`/areas/${area}/restaurants`);
  }

  // Cuisine endpoints
  async getAllCuisines(): Promise<APIResponse<any>> {
    return this.request('/cuisines');
  }

  async getCuisineInfo(cuisine: string): Promise<APIResponse<any>> {
    return this.request(`/cuisines/${cuisine}`);
  }

  async getDietaryOptions(type: string): Promise<APIResponse<any>> {
    return this.request(`/cuisines/dietary/${type}`);
  }
}

// Create singleton instance
export const apiClient = new ApiClient();

// Convenience functions
export const restaurantApi = {
  getAll: (page?: number, limit?: number, sort?: string) => 
    apiClient.getAllRestaurants(page, limit, sort),
  getById: (id: string) => 
    apiClient.getRestaurantById(id),
  getByArea: (area: string) => 
    apiClient.getRestaurantsByArea(area),
  getByCuisine: (cuisine: string) => 
    apiClient.getRestaurantsByCuisine(cuisine),
};

export const recommendationApi = {
  get: (preferences: SearchPreferences) => 
    apiClient.getRecommendations(preferences),
  getPopular: () => 
    apiClient.getPopularRecommendations(),
  getByBudget: (budget: number) => 
    apiClient.getBudgetRecommendations(budget),
  submitFeedback: (feedback: any) => 
    apiClient.submitFeedback(feedback),
};

export const searchApi = {
  search: (filters: SearchFilters) => 
    apiClient.searchRestaurants(filters),
  getSuggestions: (query: string) => 
    apiClient.getSearchSuggestions(query),
  getFilters: () => 
    apiClient.getFilterOptions(),
};

export const areaApi = {
  getAll: () => 
    apiClient.getAllAreas(),
  getInfo: (area: string) => 
    apiClient.getAreaInfo(area),
  getRestaurants: (area: string) => 
    apiClient.getAreaRestaurants(area),
};

export const cuisineApi = {
  getAll: () => 
    apiClient.getAllCuisines(),
  getInfo: (cuisine: string) => 
    apiClient.getCuisineInfo(cuisine),
  getDietary: (type: string) => 
    apiClient.getDietaryOptions(type),
};

export default apiClient;