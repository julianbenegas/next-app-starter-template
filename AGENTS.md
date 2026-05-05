# AGENTS.md

## Important

We use **pnpm**!!! Please start all new sessions by running `pnpm install`.

- Use `pnpm next typegen` to generate the types before running type-checking.
- Use `pnpm format`, `pnpm fix`, `pnpm test`, and `pnpm tsc --noEmit` before saying your code is done.
- **DO NOT GENERATE OR ATTEMPT MIGRATION**, I will take care of it.
- When you think everything is good, just run `pnpm build` to make sure the build passes. (it's slow, so only do it at the end please)

## Always Run Before Committing

```bash
pnpm format      # Format code with Biome
pnpm fix         # Fix linting issues with Biome
pnpm tsc --noEmit # Type check without emitting files
```

## Development Commands

```bash
pnpm dev         # Start development server
pnpm build       # Build for production
pnpm start       # Start production server
pnpm test        # Run all tests once
pnpm test:watch  # Run tests in watch mode
```

## Testing Philosophy

- **DO**: Write tests for business logic, utilities, and components we wrote in this codebase.
- **DON'T**: Write tests that just verify frameworks/libraries work.
- **DON'T**: Write tests that duplicate TypeScript's type checking guarantees.
- **DON'T**: Use `any` in test files.

## Code Guidelines

1. **Component Organization**: Extract complex inline JSX into named sub-components.
2. **File Structure**: Use `@/*` path alias for imports.
3. **TypeScript**: Always use strict mode, avoid `any` types.
4. **Route Context Types**: Use the `RouteContext` helper for all route parameters instead of inline types. The `RouteContext` helper is globally available after type generation and provides strongly typed params from route literals.

   ```typescript
   // ✅ Correct - Use RouteContext helper
   export async function GET(
     request: Request,
     ctx: RouteContext<'/api/video/[videoId]'>,
   ) {
     const { videoId } = await ctx.params;
   }

   // ❌ Avoid - Inline type annotations
   export async function GET(
     request: Request,
     { params }: { params: Promise<{ videoId: string }> },
   ) {
     const { videoId } = await params;
   }
   ```

5. **Security**: Validate all user inputs, sanitize data before rendering.
6. **Styling**: Use Tailwind CSS utility classes exclusively.

## Code Style

We are aiming for simplicity and readability.

- KISS
- Simple Responsibility Principle
- Dependency Injection (but don't over do it)
- Avoid Hasty Abstractions
- Good variable naming
- Code is first written to be read and incidentally for machines to execute
- If it can be guaranteed at the type level, we do it

### Testing

We care about testing important parts of the logic, not full coverage.
Our goals with tests is the following: if it's green we are confident things work.
We use all tools available — unit tests, component tests, e2e tests, and type-level guarantees.
(Currently we don't have e2e setup so just add comments with a `TODO_LATER` for the e2e testing strategies you have in mind.)

### Dumb components

> Component Extraction for Readability

This codebase prioritizes narrative readability over reuse-driven minimalism. JSX blocks may be extracted into private (ie. not exported), single-use "dumb" components when doing so clarifies the structure of a page or keeps the core logic easy to scan. Extraction is used as an editorial tool to surface the important parts of a component and push low-signal UI scaffolding out of the way. Reuse is not required. However, extracted components must remain simple: minimal props, no side effects, and no non-trivial logic. When a component accumulates real behavior or becomes reused, it should be promoted to a proper, exported component or refactored accordingly.

Testing Focus: We care about testing important parts of the logic, not full coverage. Our goal with tests is confidence that things work. We use all tools available: unit tests, component tests, e2e tests (not yet set up), and type-level guarantees.
