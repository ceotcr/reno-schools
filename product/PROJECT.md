## Summary
You will be designing mini-project using any Javascript framework(React or Next.js Recommended)
and MySQL consisting of two pages: one page to input and store the data of schools, the other page
to fetch and display the data of the schools.

## Frontend Requirements - Next.js
1. Create a form to input school data (name, address, city, state, contact, image, email_id) using React Hook Form.
2. Display a list of all schools with their details.
3. Implement validation for the input fields - Zod.
4. Use a responsive design for the layout - Tailwind CSS, ShadCN.

## Backend Requirements - Next.js API Routes
1. Create API routes to handle CRUD operations for schools.
2. Implement validation for the API routes.
3. Connect to the database using Prisma.

## Schema
Schools:
- id - int AUTO_INCREMENT
- name - text
- address - text
- city - text
- state - text
- contact - number
- image - text
- email_id - text