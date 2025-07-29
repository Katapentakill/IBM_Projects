// src/lib/api.ts
type Dealer = {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  website?: string;
  reviews: Review[];
};

type Review = {
  id: string;
  rating: number;
  comment: string;
  sentiment?: number; // 0-1 (0: negativo, 1: positivo)
  userEmail: string;
  createdAt: string;
};

// Base de datos ficticia de dealers
const mockDealers: Dealer[] = [
  {
    id: "1",
    name: "Kansas City Autos Premium",
    address: "123 Main Street",
    city: "Kansas City",
    state: "KS",
    phone: "(816) 555-1001",
    website: "https://kansascityautos.com",
    reviews: [
      {
        id: "101",
        rating: 5,
        comment: "Excelente servicio y atención personalizada. Compré mi último 3 autos aquí!",
        sentiment: 0.95,
        userEmail: "juan.perez@example.com",
        createdAt: "2023-10-15",
      },
      {
        id: "102",
        rating: 4,
        comment: "Buen inventario pero los precios podrían ser más competitivos",
        sentiment: 0.75,
        userEmail: "maria.gonzalez@example.com",
        createdAt: "2023-09-22",
      },
    ],
  },
  {
    id: "2",
    name: "Midwest Motors",
    address: "456 Oak Avenue",
    city: "Overland Park",
    state: "KS",
    phone: "(913) 555-2002",
    reviews: [
      {
        id: "201",
        rating: 3,
        comment: "El proceso de financiamiento fue muy lento",
        sentiment: 0.45,
        userEmail: "robert.smith@example.com",
        createdAt: "2023-11-05",
      },
      {
        id: "202",
        rating: 5,
        comment: "Vendedor muy profesional, encontré exactamente lo que buscaba",
        sentiment: 0.92,
        userEmail: "lisa.johnson@example.com",
        createdAt: "2023-08-17",
      },
    ],
  },
  {
    id: "3",
    name: "Sunflower State Cars",
    address: "789 Sunflower Blvd",
    city: "Wichita",
    state: "KS",
    phone: "(316) 555-3003",
    website: "https://sunflowercars.com",
    reviews: [
      {
        id: "301",
        rating: 2,
        comment: "El auto que compré tuvo problemas a la semana. No me ayudaron con la garantía",
        sentiment: 0.15,
        userEmail: "david.wilson@example.com",
        createdAt: "2023-07-30",
      },
    ],
  },
  {
    id: "4",
    name: "Show Me Auto Group",
    address: "321 Broadway",
    city: "St. Louis",
    state: "MO",
    phone: "(314) 555-4004",
    reviews: [
      {
        id: "401",
        rating: 5,
        comment: "La mejor experiencia de compra que he tenido!",
        sentiment: 0.98,
        userEmail: "sarah.miller@example.com",
        createdAt: "2023-10-28",
      },
      {
        id: "402",
        rating: 4,
        comment: "Buen servicio post-venta",
        sentiment: 0.8,
        userEmail: "michael.brown@example.com",
        createdAt: "2023-09-10",
      },
      {
        id: "403",
        rating: 3,
        comment: "El inventario de usados es limitado",
        sentiment: 0.5,
        userEmail: "emily.davis@example.com",
        createdAt: "2023-08-03",
      },
    ],
  },
  {
    id: "5",
    name: "Golden State Motors",
    address: "555 Pacific Coast Hwy",
    city: "Los Angeles",
    state: "CA",
    phone: "(310) 555-5005",
    website: "https://goldenstatemotors.com",
    reviews: [
      {
        id: "501",
        rating: 5,
        comment: "Increíble selección de vehículos de lujo",
        sentiment: 0.97,
        userEmail: "james.wilson@example.com",
        createdAt: "2023-11-12",
      },
      {
        id: "502",
        rating: 1,
        comment: "Presión de ventas muy agresiva. No recomiendo",
        sentiment: 0.1,
        userEmail: "jennifer.martinez@example.com",
        createdAt: "2023-10-05",
      },
      {
        id: "503",
        rating: 4,
        comment: "El showroom es impresionante, pero los precios son altos",
        sentiment: 0.7,
        userEmail: "william.taylor@example.com",
        createdAt: "2023-09-18",
      },
    ],
  },
];


export const fetchDealers = async (state?: string): Promise<Dealer[]> => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simular delay
  return state 
    ? mockDealers.filter(d => d.state === state) 
    : mockDealers;
};

export const fetchDealerDetails = async (id: string): Promise<Dealer> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  const dealer = mockDealers.find(d => d.id === id);
  if (!dealer) throw new Error("Dealer not found");
  return dealer;
};

export const submitReview = async (dealerId: string, review: {
  rating: number;
  comment: string;
}): Promise<Review> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const newReview = {
    id: `rev-${Math.random().toString(36).substring(2, 9)}`,
    ...review,
    userEmail: "current-user@example.com",
    createdAt: new Date().toISOString(),
  };
  
  const dealer = mockDealers.find(d => d.id === dealerId);
  if (dealer) dealer.reviews.push(newReview);
  
  return newReview;
};

export const analyzeSentiment = async (text: string): Promise<{ score: number }> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  // Simular análisis de sentimiento (0-1)
  return { score: Math.min(0.95, Math.max(0.05, 0.5 + (Math.random() - 0.5) * 0.3)) };
};


// src/lib/api.ts
type User = {
  id: string;
  email: string;
  password: string; // En un caso real, esto sería un hash
  name?: string;
};

// Base de datos ficticia
const mockUsers: User[] = [
  {
    id: "1",
    email: "user@example.com",
    password: "password123", // ¡En producción usaríamos bcrypt!
    name: "Test User"
  }
];

let currentUser: User | null = null;

export const registerUser = async (userData: {
  email: string;
  password: string;
  name?: string;
}): Promise<{ user: Omit<User, 'password'>; token: string }> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Validar si el usuario ya existe
  if (mockUsers.some(u => u.email === userData.email)) {
    throw new Error('User already exists');
  }

  const newUser = {
    id: `user-${Math.random().toString(36).substring(2, 9)}`,
    ...userData
  };

  mockUsers.push(newUser);
  
  // Simular token JWT
  const token = `mock-jwt-token-${newUser.id}`;
  
  return {
    user: {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name
    },
    token
  };
};

export const loginUser = async (credentials: {
  email: string;
  password: string;
}): Promise<{ user: Omit<User, 'password'>; token: string }> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const user = mockUsers.find(
    u => u.email === credentials.email && u.password === credentials.password
  );

  if (!user) {
    throw new Error('Invalid credentials');
  }

  // Simular token JWT
  const token = `mock-jwt-token-${user.id}`;
  currentUser = user;
  
  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name
    },
    token
  };
};

export const logoutUser = async (): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  currentUser = null;
};

export const getCurrentUser = async (): Promise<Omit<User, 'password'> | null> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  return currentUser ? {
    id: currentUser.id,
    email: currentUser.email,
    name: currentUser.name
  } : null;
};


// src/lib/api.ts
type CarMake = {
  id: string;
  name: string;
  country: string;
  founded: number;
};

type CarModel = {
  id: string;
  makeId: string;
  name: string;
  year: number;
  type: 'Sedan' | 'SUV' | 'Truck' | 'Hatchback' | 'Sports';
};

// Base de datos ficticia de marcas y modelos
const mockCarMakes: CarMake[] = [
  {
    id: "1",
    name: "Toyota",
    country: "Japan",
    founded: 1937
  },
  {
    id: "2",
    name: "Ford",
    country: "USA",
    founded: 1903
  },
  {
    id: "3",
    name: "BMW",
    country: "Germany",
    founded: 1916
  },
  {
    id: "4",
    name: "Tesla",
    country: "USA",
    founded: 2003
  },
  {
    id: "5",
    name: "Honda",
    country: "Japan",
    founded: 1948
  }
];

const mockCarModels: CarModel[] = [
  { id: "1", makeId: "1", name: "Camry", year: 2023, type: "Sedan" },
  { id: "2", makeId: "1", name: "RAV4", year: 2023, type: "SUV" },
  { id: "3", makeId: "2", name: "F-150", year: 2023, type: "Truck" },
  { id: "4", makeId: "2", name: "Mustang", year: 2023, type: "Sports" },
  { id: "5", makeId: "3", name: "X5", year: 2023, type: "SUV" },
  { id: "6", makeId: "4", name: "Model 3", year: 2023, type: "Sedan" },
  { id: "7", makeId: "5", name: "Civic", year: 2023, type: "Sedan" }
];

export const fetchCarMakes = async (): Promise<CarMake[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockCarMakes;
};

export const fetchCarModels = async (makeId: string): Promise<CarModel[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockCarModels.filter(model => model.makeId === makeId);
};