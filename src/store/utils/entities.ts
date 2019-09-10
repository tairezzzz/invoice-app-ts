export interface Entity {
  _id: string;
}

export function createEntities<T extends Entity>(
  items: T[],
  previousEntities: { [key: string]: T } = {},
): [{ [key: string]: T }, string[]] {
  const entities = items.reduce(
    (acc, item) => ({
      ...acc,
      [item._id]: item,
    }),
    previousEntities,
  );

  const ids = items.map((item) => item._id);

  return [entities, ids];
}