# Poké Table Project

This is a Next.js project that displays a table of Pokémon with various functionalities like filtering, pagination, and detailed views.

## Features

- Fetch and display Pokémon from the PokéAPI
- Search Pokémon by name
- Filter Pokémon by type
- Paginate through the Pokémon list
- View detailed information about each Pokémon
- Responsive and visually appealing UI following the Pokémon theme

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (Latest LTS recommended)
- npm or yarn

### Installation

Clone the repository and install dependencies:

```bash
# Clone the repo
git clone https://github.com/your-repo/poke-table.git
cd poke-table

# Install dependencies
npm install

# or
yarn install
```

### Running the Development Server

```bash
npm run dev

# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the project in the browser.

## Project Structure

```
app/
├── layout.tsx        # Main layout component
├── page.tsx          # Home page displaying the Pokémon table
├── pokemon/
│   ├── [id]/
│   │   ├── page.tsx  # Dynamic route for Pokémon details
lib/
├── hooks.ts          # Redux hooks
├── store.ts          # Redux store setup
├── features/
│   ├── pokemonSlice.ts  # Redux slice for managing Pokémon state
components/
├── Pagination.tsx     # Pagination component
├── PokemonTable.tsx   # Table displaying Pokémon list
├── PokemonDetails.tsx # Component for showing Pokémon details
```

## API Usage

This project fetches data from the PokéAPI:

- `GET /pokemon?limit={limit}&offset={offset}` - Fetch all Pokémon with pagination
- `GET /pokemon/{id}` - Fetch detailed data of a specific Pokémon
- `GET /type/{type}` - Fetch Pokémon by type

## Testing

The project includes unit tests for Redux logic and components. Run tests using:

```bash
npm run test

# or
yarn test
```

## Deployment

To deploy the project, build it first:

```bash
npm run build

# or
yarn build
```

Then, start the production server:

```bash
npm run start

# or
yarn start
```

## Contributing

Feel free to fork the repository and submit pull requests with improvements or bug fixes.

## License

This project is licensed under the MIT License.
