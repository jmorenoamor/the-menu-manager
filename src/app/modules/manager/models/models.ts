export interface Unit {
  id: number;
  name: string;
  description?: string;
  abbrev: string;
  equivalent_amount: number;
  equivalent_unit: string;
}

export interface Component {
  id: number;
  name: string;
  description: string;
}

export interface ProductComponent {
  id: number;
  component: Component;
  amount: number;
  unit: Unit;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  components: ProductComponent[];
}

export interface ProductProcess {
  id: number;
  name: string;
  description: string;
}

export interface Ingredient {
  id: number;
  amount: number;
  unit: Unit;
  process: ProductProcess;
  product: Product;
}

export interface Recipe {
  id: number;
  name: string;
  description: string;
  ingredients: Ingredient;
}

export interface MenuEntry {
  id: number;
  recipe: Recipe;
  slot: string;
  date: Date;
}

export interface Menu {
  id: number;
  name: string;
  description: string;
  entries: MenuEntry[];
}
