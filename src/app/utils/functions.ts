export const createPagination = (length: number, currentPage: number) => {
  const array = [];
  for (let i = 0; i < length; i++) {
    if (
      i === 0 ||
      i === currentPage - 2 ||
      i === currentPage - 1 ||
      i === currentPage ||
      i === length - 2 ||
      i === length - 1
    ) {
      array.push(i + 1);
    } else if (i + 3 === currentPage || i + 2 === length - 1) {
      array.push('...');
    }
  }

  return array;
};
