export const transformPokemonData = (data) => {
    if (!data || !data.is_default) return null
    return {
        id: data.id,
        name: data.name,
        types: data.types.map((t) => t.type.name),
        sprite:
            data.sprites?.other?.['official-artwork']?.front_default ||
            data.sprites?.front_default,
    }
}
