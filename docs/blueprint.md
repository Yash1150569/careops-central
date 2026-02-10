# **App Name**: CareOps Central

## Core Features:

- Create Contact: Allows users to create new contacts in the system with name, email, and workspace association. Integrates with FastAPI backend to store contact details in PostgreSQL and trigger a welcome email using the 'contact_created' event.
- Create Booking: Enables users to create bookings, associating them with a booking type, contact, and scheduled time. Triggers a booking confirmation email to the contact upon creation using the 'booking_created' event handled by the FastAPI backend.
- Dashboard Overview: Provides a dashboard view displaying key metrics such as total bookings and recent alerts. Fetches data from the FastAPI backend, which queries the PostgreSQL database for bookings and alerts related to a specific workspace.
- Alert Management: Displays and manages alerts triggered by events such as low inventory. Alerts are fetched from the PostgreSQL database via the FastAPI backend and presented in the dashboard.
- Automated Responses Tool: Leverages AI to analyze booking details and draft personalized email responses. This tool decides whether to incorporate special instructions into the generated message, ensuring relevant information is included.

## Style Guidelines:

- Primary color: A calming light blue (#A0D2EB) to represent trust and reliability in healthcare operations.
- Background color: A very light off-white (#F5F5F5) to provide a clean and professional backdrop.
- Accent color: A gentle, desaturated green (#A0EBB7) to highlight key actions and elements.
- Body and headline font: 'PT Sans' for a modern and readable user interface.
- Use consistent and clean icons to represent different entities such as contacts, bookings and alerts.
- Maintain a clear and organized layout for the dashboard and forms to enhance usability and data presentation.
- Implement subtle transitions and animations to provide feedback and improve the overall user experience.