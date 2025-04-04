# UI/UX Design and Style Guidelines

This document provides standards and best practices for designing consistent user interfaces within the project. It ensures visual uniformity, accessibility compliance, and a responsive, intuitive experience for users.

## Framework and Libraries

- **React**
- **shadcn/ui** component library
- **TailwindCSS** for utility-first styling

## Color Scheme

| Element          | Light Mode                          | Dark Mode                           |
|------------------|-------------------------------------|-------------------------------------|
| Background       | `oklch(1 0 0)`                      | `oklch(0.145 0 0)`                  |
| Foreground       | `oklch(0.145 0 0)`                  | `oklch(0.985 0 0)`                  |
| Primary          | `oklch(0.205 0 0)`                  | `oklch(0.922 0 0)`                  |
| Secondary        | `oklch(0.97 0 0)`                   | `oklch(0.269 0 0)`                  |
| Accent           | `oklch(0.97 0 0)`                   | `oklch(0.269 0 0)`                  |
| Border/Input     | `oklch(0.922 0 0)`                  | `oklch(1 0 0 / 10%)`                |
| Ring             | `oklch(0.708 0 0)`                  | `oklch(0.556 0 0)`                  |
| Destructive      | `oklch(0.577 0.245 27.325)`         | `oklch(0.704 0.191 22.216)`         |

## Typography

- **Default Font:** System default sans-serif font stack provided by Tailwind.
- **Headings:**
  - `text-xl` for section headings
  - `font-bold` for emphasis
- **Body Text:**
  - `text-sm` for helper/descriptive text
  - `text-muted-foreground` color for secondary text

## Spacing & Layout

- Default vertical spacing: `space-y-8` for form elements
- Section separators: Use `<Separator />` with margins (`my-4`)
- Consistent padding for inputs and buttons as defined by shadcn/ui defaults.

## Component Behavior & Interactivity

- **Inputs:**
  - Hover Effect: `hover:bg-gray-100` to indicate interactivity
  - Outline and ring color on focus: Tailwind default (`outline-ring/50`)

- **Buttons:**
  - Interaction Effect: `hover:scale-95` for responsive click-feedback animation
  - Cursor: `cursor-pointer`

## Accessibility

Accessibility is achieved by:

- Using semantic HTML elements (`<form>`, `<input>`, `<label>`) via shadcn components
- Ensuring labels (`FormLabel`) are always explicitly associated with inputs (`FormControl`)
- Providing sufficient color contrast through global CSS variables (`text-foreground` and `bg-background`)
- Clearly defined interactive states (hover, active, focus) using Tailwind classes (`hover:bg-gray-100`, `outline-ring/50`)

## Responsive Design

Responsiveness is maintained by:

- Utilizing TailwindCSS responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`) as needed
- Ensuring form fields and buttons adapt seamlessly across device sizes
- Regular testing on various screen dimensions to validate user experience
