/** get and remove metadata */
export const getMetadata = (decoratorType: string | symbol, controller: any): any => {
  const metadata = Reflect.getMetadata(decoratorType, controller);
  Reflect.deleteMetadata(decoratorType, controller);

  return metadata;
};
