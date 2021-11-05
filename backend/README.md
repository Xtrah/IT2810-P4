# 🛒 API

## pokemon

Get pokemon by id.

```

query($_id: String) {
  pokemon(_id: $_id) {
    _id
    name
    description
    types
    weight
    height
    imageUrl
  }
}

```

## pokemons

Get all pokemons or query according to parameters.

```
query ($name: String, $sortDescending: Boolean, $type: String, $offset: Int) {
    pokemons(name: $name, sortDescending: $sortDescending, type: $type, offset: $offset) {
        \_id
        name
        description
        types
        weight
        height
        imageUrl
        }
    }
```

Example variables:

```
{
    "name": "Squirtle",
    "sortDescending": true,
    "type": "water",
    "offset": 50
}
```

Example results:

```
{
  "data": {
    "pokemons": [
      {
        "_id": "61696225bb286c8ea6f6f114",
        "name": "Squirtle",
        "description": "Aquaaa",
        "types": ["water"],
        "weight": 50,
        "height": 60,
        "imageUrl": "www.randomimageurl123123123123.no"
      }
    ]
  }
}
```

## createPokemon

Add a pokemon to the database.

```
mutation($name: String!, $description: String!, $types: [String!] !, $weight: Int!, $height: Int!, $imageUrl: String!) {
  createPokemon(pokemonInput: {
    name: $name,
    description: $description,
    types: $types,
    weight: $weight,
    height: $height,
    imageUrl: $imageUrl
  }) {
    \
    _id
    name
    description
    types
    weight
    height
    imageUrl
  }
}
```

Example variables:

```
{
    "name": "Squirtle",
    "description": "Aqua",
    "types": ["water"],
    "weight": 50,
    "height": 60,
    "imageUrl": "www.randomimageurl123123123.no"
}
```

Example results:

```
{
    "data": {
        "createPokemon": {
            "\_id": "61697b2e11edf8bc35808c47",
            "name": "Squirtle",
            "description": "Aqua",
            "types": [
                "water"
            ],
            "weight": 50,
            "height": 60,
            "imageUrl": "www.randomimageurl123123123.no"
        }
    }
}
```
