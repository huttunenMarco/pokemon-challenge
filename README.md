# The Pokémon Coding Challenge.

This is my submission of The Pokémon Coding Challenge. I’ve spent about 6 hours on the challenge. I’ve made some assumptions on the requirements during the assignment that are documentet below.

## Assumptions and Choices

- Third-Party Libraries: Utilized various third-party libraries such as Prettier, EsLint, Mongoose, and Fuse.js for fuzzy search, despite not being explicitly mentioned in the challenge. This choice facilitated development efficiency and enhanced functionality.
- Fuzzy Search Approach: Opted for Fuse.js for fuzzy search, acknowledging that it requires fetching all Pokemons, which might be time-inefficient. However, given the manageable dataset size, prioritized accuracy over potential performance trade-offs. Considered alternatives like regex with case insensitivity but opted for a comprehensive fuzzy search solution.
- Evolution Retrieval Strategy: Invested significant time in understanding and implementing evolution retrieval. Decided to fetch next and previous evolutions separately, potentially missing some "siblings-level" evolutions. Adopted a data structure format of {pokemon: pokemon, nextEvolutions [pokemon], prevEvolutions: [pokemon]} for clarity and flexibility, despite other possible approaches like populating prev_evolutions in the original Pokemon field.
- Pokemon Addition Endpoint: Interpreted the endpoint for adding a Pokemon as requiring all data necessary for new Pokemon creation, including the option to specify an existing Pokemon for evolution chain linkage. Acknowledged that this approach may not be ideal but aligned with the perceived requirements.
- Search Endpoint Expectation: Recognized the requirement for the search endpoint to return an array of matching Pokemons, facilitating efficient querying and retrieval.

## Get started

#### Create a database connection

Register/Login to MongoDB. Create a database and copy the URI. The URI should look something like this: `mongodb+srv://userName:password@pokemon.xxx.mongodb.net/Pokemon`. The name of database or collection should not matter.

#### Clone the repository:

Clone the repository containing the project code to your local machine. `git clone {url}`

#### Update the .env configuration:

In the project directory, locate the .env file.
Update the DATABASE_URI variable with the URI you copied from MongoDB.

#### Install dependencies

Open a terminal or command prompt.
Navigate to the project directory.
Run `npm install` to install all the necessary dependencies.

#### Initialize the database:

Run `npm run initDataBase` in the terminal. This script will load all the data into the database.
Upon successful completion, you should see a message in the terminal indicating "Data inserted into database successfully".

You can run this command to reinitialise the database at any point.

#### Run the development server:

After initializing the database, run `npm run dev` in the terminal.

This command will start the development server on PORT 9000 (if not changed in the .env file).
You should be able to access the API endpoints and interact with the application.

Following these steps should set up your environment and allow you to start working with the project. Let me know if you need further assistance!

### API Documentation

#### [GET] /pokemon/

Retrieves all Pokemons

Example: `/pokemon/`
Will return the following strucure:

```
{
    pokemons: [IPokemon]
}
```

#### [POST] /pokemon/

Adds a new Pokemons to the database.
If evolutionType & existingPokemonId is passed the endpoint will also add the new pokemon as an previous or next evolution to the existingPokemonId.
The endpoint will return the newly added pokemon.

##### Request Body Parameters:

- pokemon (object): Details of the new Pokemon to be added.
- existingPokemonId (number): ID of the existing Pokemon to which the new Pokemon will be added to its evolution chain.
- evolutionType (string): Type of evolution. Accepted values: "prev_evolution", "next_evolution".

Example: `[POST] /pokemon/`
Will return the following strucure:

```
{
    pokemon: [IPokemon]
}
```

##### Query Parameters:

- name (string, required): Search query.

Example: `/pokemon/search?name=daras`
Will return the following strucure:

```
{
    pokemons: [IPokemon]
}
```

#### [GET] /search?name={name}

Retrieve a Pokemons based on a fuzzy search on name.

##### Query Parameters:

- name (string, required): Search query.

Example: `/pokemon/search?name=daras`
Will return the following strucure:

```
{
    pokemons: [IPokemon]
}
```

#### [GET] /filter/:filterType?query={query}&sort={sort}&order={order}

Retrieve Pokemons based on a filter

##### Query Parameters:

- query (string, optional): Search query.
- sort (string, optional): Attribute to sort the results by. Default: id. Acceptable values: id, name, weight, height, spawn_chance, avg_spawns, spawn_time.
- order (string, optional): Order of sorting. Default: asc. Acceptable values: asc, desc.

Example: `/pokemon/filter/type?query=ghost&sort=weight&order=desc`
Will return the following strucure:

```
{
    pokemons: [IPokemon]
}
```

#### [POST] /pokemon/suggest/:id

Retrieve a suggested Pokemon for the Pokemon passed in

Example: `/pokemon/suggest/1`
Will return the following strucure:

```
{
    pokemon: IPokemon
}
```

#### [POST] /pokemon/:id

Retrieve Pokemon and it's next and previous evolutions.

Example: `/pokemon/1`
Will return the following strucure:

```
{
    pokemon: IPokemon,
    nextEvolutions: [IPokemon],
    prevEvolutions:[IPokemon]
}
```
