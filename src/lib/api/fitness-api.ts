import { Program, Client, LoginCredentials, CreateProgramData, Exercise } from '@/lib/types';

const API_BASE_URL = 'https://swafe24fitness.azurewebsites.net/api';

export class FitnessAPI {
  private static getStoredToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('jwt');
    }
    return null;
  }

  static setToken(token: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('jwt', token);
    }
  }

  static clearToken() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('jwt');
    }
  }

  private static async fetch(endpoint: string, options: RequestInit = {}) {
    const token = this.getStoredToken();
    
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      if (response.status === 401) {
        this.clearToken(); // Clear invalid token
      }
      throw new Error(`API Error: ${response.statusText}`);
    }

    // Return null for 204 No Content
    if (response.status === 204) {
      return null;
    }

    return response.json();
  }

  // Auth
  static async login(credentials: LoginCredentials) {
    const response = await this.fetch('/Users/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    if (response.jwt) {
      this.setToken(response.jwt);
    }

    return response;
  }

  // Clients
  static async getClients(): Promise<Client[]> {
    return this.fetch('/Users/Clients');
  }

  // Programs
  static async getTrainerPrograms(): Promise<Program[]> {
    return this.fetch('/WorkoutPrograms/trainer');
  }

  static async createProgram(data: CreateProgramData): Promise<Program> {
    return this.fetch('/WorkoutPrograms', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  static async getProgramById(id: string): Promise<Program> {
    return this.fetch(`/WorkoutPrograms/${id}`);
  }

  // New function to get client programs
  static async getClientPrograms(): Promise<Program[]> {
    return this.fetch('/WorkoutPrograms');
  }

  static isAuthenticated(): boolean {
    return !!this.getStoredToken();
  }
  // Get exercises for a programId
  static async addExerciseToProgram(programId: string, exerciseData: Partial<Exercise>) {
    return this.fetch(`/Exercises/Program/${programId}`, {
      method: 'POST',
      body: JSON.stringify(exerciseData),
    });
  }

  // Get unassigned exercises
  static async getUnassignedExercises(): Promise<Exercise[]> {
    return this.fetch('/Exercises/unassigned');
  }

  static async getAllExercises(): Promise<Exercise[]> {
    return this.fetch('/Exercises');
  }


    static async removeExercise(exerciseId: number): Promise<void> {
    try {
        // Ensure we're passing a valid number
        const id = parseInt(exerciseId.toString(), 10);
        if (isNaN(id)) {
            throw new Error('Invalid exercise ID');
        }

        const response = await fetch(`${API_BASE_URL}/Exercises/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${this.getStoredToken()}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to delete exercise: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error in removeExercise:', error);
        throw error;
    }
}
}
