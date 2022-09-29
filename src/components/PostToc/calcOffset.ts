interface IlistArray {
  offset: number;
  name: string;
}

const getNameOffsetList = (tag: 'h1' | 'h2' | 'h3') => {
  const elementArray: IlistArray[] = [];

  document.querySelectorAll(tag).forEach(element => {
    elementArray.push({
      offset: element.offsetTop,
      name: element.innerText,
    });
  });
  return elementArray;
};

export const getPostion = () => {
  const elementArray = [...getNameOffsetList('h1'), ...getNameOffsetList('h2'), ...getNameOffsetList('h3')];
  elementArray.sort((a, b) => a.offset - b.offset);

  return elementArray;
};
