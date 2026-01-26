const base = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

// Fonction utilitaire pour obtenir le token
function getAuthToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

// Fonction utilitaire pour créer les headers
function createHeaders(includeAuth: boolean = true): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  
  if (includeAuth && typeof window !== 'undefined') {
    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  
  return headers;
}

async function get<T>(path: string): Promise<T> {
  try {
    const url = `${base}${path}`;
    console.log('GET Request:', url);
    
    const response = await fetch(url, { 
      method: 'GET',
      headers: createHeaders(),
      cache: 'no-store',
    });
    
    console.log('GET Response:', response.status, response.statusText);
    
    if (!response.ok) {
      let errorMessage = `Erreur ${response.status}`;
      try {
        const errorData = await response.text();
        errorMessage = errorData || errorMessage;
      } catch (e) {
        // Ignore parsing errors
      }
      throw new ApiError(response.status, errorMessage);
    }
    
    const data = await response.json();
    console.log('GET Success:', data);
    return data;
  } catch (error) {
    console.error('GET Error:', error);
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Erreur de réseau
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new ApiError(0, 'Impossible de se connecter au serveur. Vérifiez que le backend est démarré sur http://localhost:3001');
    }
    
    throw new ApiError(0, 'Erreur de connexion au serveur');
  }
}

async function post<T>(path: string, data: any): Promise<T> {
  try {
    const url = `${base}${path}`;
    console.log('POST Request:', url, data);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: createHeaders(),
      body: JSON.stringify(data),
    });
    
    console.log('POST Response:', response.status, response.statusText);
    
    if (!response.ok) {
      let errorMessage = `Erreur ${response.status}`;
      try {
        const errorData = await response.text();
        errorMessage = errorData || errorMessage;
      } catch (e) {
        // Ignore parsing errors
      }
      throw new ApiError(response.status, errorMessage);
    }
    
    const result = await response.json();
    console.log('POST Success:', result);
    return result;
  } catch (error) {
    console.error('POST Error:', error);
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Erreur de réseau
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new ApiError(0, 'Impossible de se connecter au serveur. Vérifiez que le backend est démarré sur http://localhost:3001');
    }
    
    throw new ApiError(0, 'Erreur de connexion au serveur');
  }
}

// Types
export interface Module {
  id: number;
  title: string;
  description?: string;
}

export interface Course {
  id: number;
  title: string;
  content: string;
  moduleId: number;
  module?: Module;
}

export interface Quiz {
  id: number;
  title: string;
  courseId: number;
  questions: Question[];
}

export interface Question {
  id: number;
  text: string;
  options: Option[];
}

export interface Option {
  id: number;
  text: string;
  isCorrect?: boolean;
}

export interface QuizResult {
  score: number;
  total: number;
  percentage: number;
}

export const api = {
  modules: {
    list: (): Promise<Module[]> => get('/modules'),
  },
  courses: {
    list: (): Promise<Course[]> => get('/courses'),
    byModule: (moduleId: number): Promise<Course[]> => 
      get(`/courses/module/${moduleId}`),
    one: (id: number): Promise<Course> => 
      get(`/courses/${id}`),
  },
  quiz: {
    byCourse: (courseId: number): Promise<Quiz[]> => 
      get(`/quiz/course/${courseId}`),
    one: (id: number): Promise<Quiz> => 
      get(`/quiz/${id}`),
    submit: (quizId: number, data: { userId: number; answers: { questionId: number; optionId: number }[] }): Promise<QuizResult> =>
      post(`/quiz/${quizId}/submit`, data),
  },
};
