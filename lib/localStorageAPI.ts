
// Mock API using localStorage
export interface Design {
  _id: string;
  _creationTime: number;
  title: string;
  json: any;
  height: number;
  width: number;
  isPro: boolean;
  category: string;
  published: boolean;
  thumbnailUrl?: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  image?: string;
  isPro?: boolean;
}

class LocalStorageAPI {
  private getDesigns(): Design[] {
    const designs = localStorage.getItem('designs');
    return designs ? JSON.parse(designs) : [];
  }

  private saveDesigns(designs: Design[]): void {
    localStorage.setItem('designs', JSON.stringify(designs));
  }

  private getCurrentUser(): User | null {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  private saveCurrentUser(user: User | null): void {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  }

  // Design operations
  createDesign(design: Omit<Design, '_id' | '_creationTime'>): string {
    const newDesign: Design = {
      ...design,
      _id: Math.random().toString(36).substr(2, 9),
      _creationTime: Date.now(),
    };
    
    const designs = this.getDesigns();
    designs.push(newDesign);
    this.saveDesigns(designs);
    
    return newDesign._id;
  }

  getDesignById(id: string): Design | null {
    const designs = this.getDesigns();
    return designs.find(design => design._id === id) || null;
  }

  getAllDesigns(): Design[] {
    return this.getDesigns();
  }

  getPublishedDesigns(): Design[] {
    return this.getDesigns().filter(design => design.published);
  }

  updateDesign(id: string, updates: Partial<Design>): void {
    const designs = this.getDesigns();
    const index = designs.findIndex(design => design._id === id);
    
    if (index !== -1) {
      designs[index] = { ...designs[index], ...updates };
      this.saveDesigns(designs);
    }
  }

  publishDesign(id: string, published: boolean): void {
    this.updateDesign(id, { published });
  }

  deleteDesign(id: string): void {
    const designs = this.getDesigns();
    const filteredDesigns = designs.filter(design => design._id !== id);
    this.saveDesigns(filteredDesigns);
  }

  // User operations
  login(email: string, name: string): User {
    const user: User = {
      _id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      isPro: false,
    };
    this.saveCurrentUser(user);
    return user;
  }

  logout(): void {
    this.saveCurrentUser(null);
  }

  getCurrentUserData(): User | null {
    return this.getCurrentUser();
  }
}

export const localAPI = new LocalStorageAPI();
