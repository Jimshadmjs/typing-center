# Project Plan — Typing Center (Doha, Qatar)

## Vision
A professional, mobile-first single-page landing site for a typing center in Doha. 
Admins can manage services (title, description, optional image). Clients can view services, contact the center (email + recorded inquiry), and see location.

## Priority MVP (must-have before deployment)
1. Home / Landing page
   - Hero with logo (developer-provided)
   - Short tagline in Qatar English/Arabic (we'll add content later)
   - Quick links: Services, Contact, Location
2. Services section (public)
   - List services with title, short description, optional image
   - Click a service to view details (modal or detail section)
3. Admin interface (protected by Firebase Auth)
   - Admin login (Firebase email/password)
   - Add / Edit / Delete service:
     - Fields: title (string), category (string), price (optional number/string), description (string), optional imageUrl (string), createdAt (timestamp), ownerId (admin uid)
   - Image upload for admin: Cloudinary unsigned preset (temporary) OR signed via Firebase Function later
4. Contact / Inquiry
   - Public contact form (name, email, service selected, message)
   - On submit: write to Firestore `inquiries` collection and send a `mailto:` link fallback
5. Location
   - Embedded Google Map iframe or static map with center = Doha, Qatar

## Non-functional requirements
- Responsive (mobile-first), accessible (a11y basics)
- Qatar theme: primary color `#8A1538` (Qatar Red), white `#FFFFFF`
- Minimal dependencies, low hosting & DB cost (Firestore usage minimized)
- Services images stored on Cloudinary; metadata in Firestore
- Admin-only uploads — client uploads blocked

## Data model (Firestore)
- collection: `services`
  - id: string (doc id)
  - title: string
  - category: string
  - price?: string
  - description: string
  - imageUrl?: string
  - createdAt: serverTimestamp()
  - ownerId: uid
- collection: `inquiries`
  - name: string
  - email: string
  - serviceId?: string
  - message: string
  - createdAt: serverTimestamp()
  - resolved: boolean (default false)

## Cloudinary (short)
- Use an unsigned upload preset named `typingcenter_admin_preset` with folder `typingcenter/services`
- Restrict preset to image types, size limits, and transformations (set in Cloudinary console)
- Dev-time: images uploaded from admin UI; metadata saved to `services` doc

## Security plan (next sprint)
- Replace unsigned preset with signed uploads using Firebase Functions
- Firestore rules:
  - `services`: read = true; write = auth.uid == service.ownerId
  - `inquiries`: create allowed for public; delete/update only for admin
- Add App Check if needed

## Milestones (iteration)
- M1: Landing page + services read-only + routing (2 days)
- M2: Admin CRUD for services + admin auth + image upload (3 days)
- M3: Contact form -> store inquiries + email fallback (1 day)
- M4: Polish UI, responsive fixes, deploy (1 day)

## Notes / decisions
- Developer will provide `src/assets/logo.svg` and a default hero image.
- No client profile/upload features.
