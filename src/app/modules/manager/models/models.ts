export interface Unit {
  _id?: string;
  id?: number;
  name: string;
  description?: string;
  abbrev: string;
  equivalent_amount: number;
  equivalent_unit: string;
}

export interface Component {
  _id?: string;
  id?: number;
  name: string;
  description: string;
}

export interface ProductComponent {
  _id?: string;
  id?: number;
  component: Component;
  amount: number;
  unit: Unit;
}

export interface Product {
  _id?: string;
  id?: number;
  name: string;
  description: string;
  components: ProductComponent[];
}

export interface ProductProcess {
  _id?: string;
  id?: number;
  name: string;
  description: string;
}

export interface Ingredient {
  _id?: string;
  id?: number;
  amount: number;
  unit: Unit;
  process: ProductProcess;
  product: Product;
}

export interface Recipe {
  _id?: string;
  id?: number;
  name: string;
  description: string;
  ingredients: Ingredient[];
}

export interface MenuEntry {
  _id?: string;
  id?: number;
  menu: number;
  recipe: Recipe;
  slot: string;
  date: string;
}

export interface Menu {
  _id?: string;
  id?: number;
  name: string;
  description: string;
  entries: MenuEntry[];
}
