# Pattern di Sviluppo

> Pattern, convenzioni e best practices usati nei progetti Studio Immens.

## 1. Compound Component Pattern

Usato estensivamente in Capsule e Azzero per creare componenti flessibili:

```tsx
<Select>
  <Select.Label>Categoria</Select.Label>
  <Select.Trigger>
    <Select.Value placeholder="Scegli..." />
  </Select.Trigger>
  <Select.Options>
    <Select.Option value="tech">Tecnologia</Select.Option>
    <Select.Option value="design">Design</Select.Option>
  </Select.Options>
</Select>
```

### Implementazione

```typescript
// Select.tsx
import { createContext, useContext } from 'react';

interface SelectContext {
  value: string;
  onChange: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SelectContext = createContext<SelectContext | null>(null);

export function useSelectContext() {
  const ctx = useContext(SelectContext);
  if (!ctx) throw new Error('Select components must be used within <Select>');
  return ctx;
}

export function Select({ children, value, onChange }: SelectProps) {
  // ...
}
```

## 2. Polymorphic Component Pattern (as prop)

Permette di cambiare il tag HTML di rendering:

```typescript
type PolymorphicProps<
  T extends React.ElementType = 'button',
  P = {}
> = {
  as?: T;
  children?: React.ReactNode;
} & P & Omit<React.ComponentPropsWithoutRef<T>, keyof P>;

function Button<T extends React.ElementType = 'button'>({
  as,
  children,
  ...props
}: PolymorphicProps<T>) {
  const Component = as || 'button';
  return <Component {...props}>{children}</Component>;
}
```

## 3. Custom Hook per Business Logic

Separazione netta tra logica e presentazione:

```typescript
// hooks/useToast.ts
export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = crypto.randomUUID();
    setToasts(prev => [...prev, { ...toast, id }]);
    setTimeout(() => removeToast(id), toast.duration ?? 3000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return { toasts, addToast, removeToast };
}
```

## 4. Accessible by Default

Ogni componente deve passare i test di accessibilità prima del rilascio:

```typescript
import { test } from 'vitest';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('Button should have no accessibility violations', async () => {
  const { container } = render(<Button>Click me</Button>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## 5. Colocation

Files mantenuti vicini al loro contesto di utilizzo:

```
components/
├── Button/
│   ├── Button.tsx
│   ├── Button.test.tsx
│   ├── Button.stories.tsx
│   ├── Button.module.css
│   └── index.ts
├── Dialog/
│   └── ...
└── index.ts          # Re-export barrel
```

## 6. Error Boundary Pattern

Ogni componente "autonomo" (dialog, toast, form section) ha il proprio error boundary:

```tsx
import { ErrorBoundary } from 'react-error-boundary';

function SafeComponent({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary
      fallback={<div>Qualcosa è andato storto. Ricarica la pagina.</div>}
      onError={(error) => console.error('Component error:', error)}
    >
      {children}
    </ErrorBoundary>
  );
}
```

## Link utili

- [React Patterns](https://reactpatterns.com/)
- [Compound Components in React](https://kentcdodds.com/blog/compound-components)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
