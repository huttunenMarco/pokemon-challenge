import Fuse, { IFuseOptions, FuseResult } from 'fuse.js';

const search = <T>(
  data: T[],
  searchQuery: string,
  options: IFuseOptions<T> = {
    keys: ['name'],
    includeScore: true,
    threshold: 0.2,
  },
): FuseResult<T>[] => {
  const fuse = new Fuse(data, options);

  return fuse.search(searchQuery);
};

export default { search };
